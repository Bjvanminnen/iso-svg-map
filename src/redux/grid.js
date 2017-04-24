const CREATE_GRID = 'grid/CREATE_GRID';
export const createGrid = (rows, cols) => ({
  type: CREATE_GRID,
  rows,
  cols
});

const initialState = {
  rows: 0,
  cols: 0,
  heights: [],
  cells: []
};

export default function(state = initialState, action) {
  if (action.type === CREATE_GRID) {
    const { rows, cols } = action;
    let heights = [];
    let cells = [];
    for (let x = 0; x < cols + 1; x++) {
      heights[x] = [];
      for (let y = 0; y < rows + 1; y++) {
        heights[x][y] = 0;
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
  return action;
}
