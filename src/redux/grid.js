import Immutable from 'immutable';
import { HYDRATE } from './hydration';
import { pointKey } from '../utils';

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

const SCALE_HEIGHTS = 'grid/SCALE_HEIGHTS';
export const scaleHeights = (scaleFactor) => ({ type: SCALE_HEIGHTS, scaleFactor });

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
        heights = heights.set(pointKey(x, y - x), 0);
        // dont create cells for outer layer
        if (x < cols && y < rows) {
          cells.push({x, y: y - x});
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
    // TODO - part of action?
    const maxDelta = 2;

    let currentHeights = state.heights;
    let targetHeights = points.map(({x, y}) => currentHeights.get(pointKey(x, y)) + 1);
    points.forEach(({x,y}, index) => {
      const height = currentHeights.get(pointKey(x, y));
      if (height < targetHeights[index]) {
        currentHeights = raisePointRecursively(currentHeights, x, y, maxDelta);
      }
    });

    return {
      ...state,
      heights: currentHeights
    };
  }

  if (action.type === SCALE_HEIGHTS) {
    const scaleFactor = action.scaleFactor;
    return {
      ...state,
      heights: state.heights.map(x => x * scaleFactor)
    };
  }

  return state;
}

function raisePointRecursively(heights, x, y, maxDelta) {
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
    if (updatedHeight - thisHeight > maxDelta) {
      heights = raisePointRecursively(heights, otherX, otherY, maxDelta);
    }
  });

  return heights;
};
