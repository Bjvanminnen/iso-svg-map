import Immutable from 'immutable';

let reducers = {};

const initialState = {
  rows: 0,
  cols: 0,
  heights: Immutable.Map(),
  cells: []
};

// Primary reducer
export default function(state = initialState, action) {
  const reducer = reducers[action.type];
  if (!reducer) {
    return action;
  }
  return reducer(state, action);
}

// CREATE_GRID
const CREATE_GRID = 'grid/CREATE_GRID';
export const createGrid = (rows, cols) => ({
  type: CREATE_GRID,
  rows,
  cols
});

reducers[CREATE_GRID] = (state, action) => {
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

  heights = heights.set(pointKey(3, 3), 1);  

  return {
    ...state,
    rows,
    cols,
    heights,
    cells
  };
}

// RAISE_POINT
// const RAISE_POINT = 'grid/RAISE_POINT';
// export const raisePoint = (x, y) => ({
//   type: RAISE_POINT,
//   x,
//   y
// });
// reducers[RAISE_POINT] = (state, x, y) => {
//
// };

// Helpers
const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = TILE_HEIGHT_HALF * 2;
const HEIGHT_DELTA = 20;

function pointKey(x, y) {
  return `${x}_${y}`;
}

const pointScreenPos = (state, x, y) => {
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
