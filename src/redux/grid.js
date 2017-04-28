import Immutable from 'immutable';
import { HYDRATE } from './hydration';

// TODO - maybe make a grid display class?
const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = 64;
const HEIGHT_DELTA = 24;

export const CREATE_GRID = 'grid/CREATE_GRID';
export const createGrid = (rows, cols) => ({
  type: CREATE_GRID,
  rows,
  cols
});

// TODO - also need lower point
const RAISE_POINTS = 'grid/RAISE_POINTS';
export const raisePoints = (points) => ({
  type: RAISE_POINTS,
  points
});

const initialState = {
  rows: 0,
  cols: 0,
  heights: Immutable.Map(),
  cells: []
};

// Primary reducer
export default function grid(state = initialState, action) {
  if (action.type === HYDRATE) {
    const hydratedState = action.state.grid;
    return {
      ...hydratedState,
      heights: Immutable.fromJS(hydratedState.heights)
    }
  }

  if (action.type === CREATE_GRID) {
    const { rows, cols } = action;
    let heights = Immutable.Map();
    let cells = [];
    for (let x = 0; x < cols + 1; x++) {
      for (let y = 0; y < rows + 1; y++) {
        heights = heights.set(pointKey(x, y), 0);
        if (x < cols && y < rows) {
          cells.push({x, y});
        }
      }
    }

    return {
      ...state,
      rows,
      cols,
      heights,
      cells
    };
  }

  // TODO write test?
  if (action.type === RAISE_POINTS) {
    const { points } = action;

    let currentHeights = state.heights;
    let targetHeights = points.map(({x, y}) => currentHeights.get(pointKey(x, y)) + 1);
    points.forEach(({x,y}, index) => {
      const height = currentHeights.get(pointKey(x, y));
      if (height < targetHeights[index]) {
        currentHeights = raisePointRecursively(currentHeights, x, y);
      }
    });

    return {
      ...state,
      heights: currentHeights
    };
  }

  return state;
}

function raisePointRecursively(heights, x, y) {
  const updatedHeight = heights.get(pointKey(x, y)) + 1;
  heights = heights.set(pointKey(x, y), updatedHeight);
  [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x + 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
  ].forEach(([otherX, otherY]) => {
    if (heights.get(pointKey(x, y)) === undefined) {
      return;
    }
    const thisHeight = heights.get(pointKey(otherX, otherY));
    if (updatedHeight - thisHeight > 1) {
      heights = raisePointRecursively(heights, otherX, otherY);
    }
  });

  return heights;
};


// Helpers
function pointKey(x, y) {
  return `${x}_${y}`;
}

export const pointScreenPos = (state, x, y) => {
  const height = state.heights.get(pointKey(x, y));
  return {
    x: (x - y) * TILE_WIDTH_HALF,
    y: (x + y) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
  };
};

export const getCorners = (state, x, y) => ([
  pointScreenPos(state, x, y),
  pointScreenPos(state, x + 1, y),
  pointScreenPos(state, x + 1, y + 1),
  pointScreenPos(state, x, y + 1)
]);

export const getCornerHeights = (state, x, y) => ([
  state.heights.get(pointKey(x, y)),
  state.heights.get(pointKey(x + 1, y)),
  state.heights.get(pointKey(x + 1, y + 1)),
  state.heights.get(pointKey(x, y + 1)),
]);
