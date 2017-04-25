import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';
import SelectedPoint from './SelectedPoint';

class App extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired,
    selectedPoint: PropTypes.object
  };

  render() {
    return (
      <svg height="800" width="1200">
        <g transform="translate(600, 50)">
          {this.props.cells.map((cell, index) => (
            <Cell
              key={index}
              x={cell.x}
              y={cell.y}
            />
          ))}
          {this.props.selectedPoint && (
            <SelectedPoint/>
          )}
        </g>
      </svg>
    );
  }
}

export default connect(state => ({
  cells: state.grid.cells,
  selectedPoint: state.selectedPoint
}))(App);
