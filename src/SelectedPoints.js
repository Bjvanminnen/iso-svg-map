import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pointScreenPos } from './gridDisplay';

class SelectedPoints extends Component {
  render() {
    const { selectedPoints, grid } = this.props;

    const screenPoints = selectedPoints.map(point =>
      pointScreenPos(grid.heights, point.x, point.y));
    return (
      <g>
        {screenPoints.map(({x, y}) => (
          <circle
            key={`${x}_${y}`}
            cx={x}
            cy={y}
            r="5"
            fill="white"
          />
        ))}
      </g>
    );

  }
}

export default connect(state => ({
  grid: state.grid,
  selectedPoints: state.selectedPoints,
}))(SelectedPoints);
