import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroundBox from './GroundBox';
import Cell from './Cell';
import SelectedPoints from './SelectedPoints';
import Toolbox from './Toolbox';

class App extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <svg height="800" width="1200">
          <g transform="translate(600, 50) scale(0.4)">
            <g>
              <GroundBox/>
              {this.props.cells.map((cell, index) => (
                <Cell
                  key={index}
                  x={cell.x}
                  y={cell.y}
                />
              ))}
              <SelectedPoints/>
            </g>
          </g>
        </svg>
        <Toolbox/>
      </div>
    );
  }
}

export default connect(state => ({
  cells: state.grid.cells
}))(App);
