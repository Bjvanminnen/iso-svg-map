import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cell from './Cell';

class App extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired
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
        </g>
      </svg>
    );
  }
}

export default connect(state => ({
  cells: state.grid.cells
}))(App);
