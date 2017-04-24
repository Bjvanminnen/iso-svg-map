import React, { Component } from 'react';
import Cell from './Cell';
import { getGrid } from './grid';

class App extends Component {
  render() {
    const grid = getGrid();

    return (
      <svg height="500" width="800">
        <g transform="translate(400, 50)">
          {grid.cells.map((cell, index) => (
            <Cell
              key={index}
              grid={grid}
              mapCoordinates={cell}
            />
          ))}
        </g>
      </svg>
    );
  }
}

export default App;
