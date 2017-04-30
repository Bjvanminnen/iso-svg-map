import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCorners, pointScreenPosHeightless } from './gridDisplay';
import { pointString } from './utils';

class GroundBox extends Component {
  render() {
    const { leftCorner, rightCorner, rows, cols } = this.props;

    let leftLower = pointScreenPosHeightless(0, rows);
    leftLower.y += 100;

    let bottomLower = pointScreenPosHeightless(cols, rows);
    bottomLower.y += 100;

    const bottomHigher = {
      x: bottomLower.x,
      y: Math.min(leftCorner.y, rightCorner.y)
    };

    let rightLower = pointScreenPosHeightless(cols, 0);
    rightLower.y += 100;

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
  const leftCorner = getCorners(grid.heights, 0, rows - 1)[3];
  const rightCorner = getCorners(grid.heights, cols - 1, 0)[1];
  return {
    leftCorner,
    rightCorner,
    rows,
    cols
  };
})(GroundBox);
