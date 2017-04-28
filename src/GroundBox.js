import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCorners } from './redux/grid';

// TODO - duplicated
const pointString = (points) => (
  points.map(p => [p.x, p.y].join(',')).join(' ')
);
const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = 64;

class GroundBox extends Component {
  render() {
    const { leftCorner, rightCorner, rows, cols } = this.props;

    const leftLower = {
      x: -cols * TILE_WIDTH_HALF,
      y: rows * TILE_HEIGHT_HALF + 100,
    };
    const bottomHigher = {
      x: 0,
      y: Math.min(leftCorner.y, rightCorner.y)
    };
    const bottomLower = {
      x: 0,
      y: rows * TILE_HEIGHT_HALF * 2 + 100
    };
    const rightLower = {
      x: cols * TILE_WIDTH_HALF,
      y: rows * TILE_HEIGHT_HALF + 100
    };

    const points = [
      leftCorner,
      leftLower,
      bottomLower,
      bottomHigher,
    ];

    const points2 = [
      bottomHigher,
      bottomLower,
      rightLower,
      rightCorner,
    ];
    return (
      <g>
        <polygon
          points={pointString(points)}
          style={{
            fill: "#65532d"
          }}
        />
        <polygon
          points={pointString(points2)}
          style={{
            fill: "#8d7e47"
          }}
        />
      </g>
    );
  }
}

export default connect(state => {
  const grid = state.grid;
  const { rows, cols } = grid;
  const leftCorner = getCorners(grid, 0, rows - 1)[3];
  const rightCorner = getCorners(grid, cols - 1, 0)[1];
  return {
    leftCorner,
    rightCorner,
    rows,
    cols
  };
})(GroundBox);
