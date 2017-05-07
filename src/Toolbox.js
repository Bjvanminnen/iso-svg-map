import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { raisePoints, scaleHeights } from './redux/grid';
import { clearSelection } from './redux/selectedPoints';
import { undo } from './redux/combineReducersUndoable';

const styles = {
  main: {
    position: 'absolute',
    left: 10,
    top: 10
  },
  pre: {
    border: '1px solid black',
    backgroundColor: 'lavender'
  }
};

class Toolbox extends Component {
  constructor(props) {
    super(props);

    this.onRaise = this.onRaise.bind(this);
    this.onClear = this.onClear.bind(this);
    this.raiseRandom = this.raiseRandom.bind(this);
  }

  raiseRandom() {
    const { cells, raisePoints } = this.props;
    window.stopRaising = false;
    const interval = setInterval(() => {
      if (window.stopRaising) {
        clearInterval(interval);
        return;
      }
      const cell = _.sample(cells);
      raisePoints([cell]);
    }, 50);
  }

  onRaise() {
    const { selectedPoints, raisePoints } = this.props;
    raisePoints(selectedPoints);
  }

  onClear() {
    localStorage.removeItem('savedStore');
    window.location.reload();
  }

  render() {
    const { selectedPoints, debugInfo } = this.props;
    return (
      <div style={styles.main}>
        <div>
          <button
            onClick={this.onRaise}
            disabled={selectedPoints.length === 0}
          >
            Raise
          </button>
        </div>
        <div>
          <button
            onClick={this.onClear}
          >
            Clear
          </button>
        </div>
        <div>
          <button
            onClick={this.props.clearSelection}
          >
            Clear Selection
          </button>
        </div>
        <div>
          <button
            onClick={this.raiseRandom}
          >
            RaiseRandom
          </button>
        </div>
        <div>
          <button
            onClick={this.props.undo}
          >
            Undo
          </button>
        </div>
        <pre style={styles.pre}>
          {debugInfo}
        </pre>
      </div>
    );
  }
}

export default connect(state => ({
  cells: state.grid.cells,
  selectedPoints: state.selectedPoints,
  debugInfo: state.debugInfo.text
}), {
  raisePoints,
  clearSelection,
  scaleHeights,
  undo
})(Toolbox);
