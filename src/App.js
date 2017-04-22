import React, { Component } from 'react';
import {
  isoCell
} from './pathGen';

class App extends Component {
  render() {
    const coordinates = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        coordinates.push([x, y]);
      }
    }

    return (
      <svg height="500" width="800">
        <g transform="translate(400, 50)">
          {coordinates.map(coords => (
            <path
              d={isoCell(...coords)}
              fill="none"
              stroke="black"
            />
          ))}
        </g>
      </svg>
    );
  }
}

export default App;
