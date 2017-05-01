import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { GROUND_HEIGHT, getCorners, pointScreenPosHeightless } from './gridDisplay';
import { pointString } from './utils';

const GroundColumn = ({heights, rows, x}) => {
  const corners = getCorners(heights, x, rows - x - 1);

  const rightTop = corners[1];
  const leftTop = corners[3];

  let middleBottom = pointScreenPosHeightless(x + 1, rows - x);
  middleBottom.y += GROUND_HEIGHT;

  const middleTop = {
    x: middleBottom.x,
    y: Math.min(leftTop.y, rightTop.y)
  };

  let leftBottom = pointScreenPosHeightless(x, rows - x);
  leftBottom.y += GROUND_HEIGHT;

  let rightBottom = pointScreenPosHeightless(x + 1, rows - x - 1);
  rightBottom.y += GROUND_HEIGHT;

  const points = [
    leftTop,
    leftBottom,
    middleBottom,
    middleTop,
  ];

  const points2 = [
    middleTop,
    middleBottom,
    rightBottom,
    rightTop,
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
};

// TODO - rename classes
// TODO - extend ground on right side?
class GroundBox extends Component {
  render() {
    const { heights, rows, cols } = this.props;
    return (
      <g>
        {_.range(cols).map(x => (
          <GroundColumn
            key={x}
            heights={heights}
            rows={rows}
            x={x}
          />
        ))}
      </g>
    );
  }
}

export default connect(state => {
  const { rows, cols, heights } = state.grid;
  return {
    rows,
    cols,
    heights
  };
})(GroundBox);
