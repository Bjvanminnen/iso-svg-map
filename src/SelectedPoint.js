import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pointScreenPos } from './redux/grid';

class SelectedPoint extends Component {
  render() {
    const { selectedPoint, grid } = this.props;
    const { x, y } = pointScreenPos(grid, selectedPoint.x, selectedPoint.y);


    return (
      <circle cx={x} cy={y} r="5" fill="white"/>
    );
  }
}

export default connect(state => ({
  grid: state.grid,
  selectedPoint: state.selectedPoint,
}))(SelectedPoint);
