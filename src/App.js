import React, { Component } from 'react';
import {
  isoPoint,
} from './pathGen';
import Cell from './Cell';

class App extends Component {
  render() {
    const heights = {
      '1_2': 1,
      '1_3': 1,
      '1_4': 1,
      '2_1': 1,
      '2_2': 1,
      '2_3': 1,
      '2_4': 1,
      '3_2': 1,
      '3_3': 1,
    };

    const points = [];
    for (let x = 0; x < 6; x++) {
      points[x] = [];
      for (let y = 0; y < 6; y++) {
        points[x][y] = isoPoint(x, y, heights[`${x}_${y}`] || 0);
      }
    }

    const cells = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        cells.push({x, y});
      }
    }

    return (
      <svg height="500" width="800">
        <g transform="translate(400, 50)">
          {cells.map(cell => (
            <Cell
              key={[cell.x,cell.y].join('.')}
              points={points}
              mapX={cell.x}
              mapY={cell.y}
            />
          ))}
        </g>
      </svg>
    );
  }
}

export default App;
