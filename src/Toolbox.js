import React, { Component } from 'react';
import { connect } from 'react-redux';
import { raisePoints } from './redux/grid';
import { clearSelection } from './redux/selectedPoints';

const styles = {
  main: {
    position: 'absolute',
    left: 10,
    top: 10
  }
};

class Toolbox extends Component {
  constructor(props) {
    super(props);

    this.onRaise = this.onRaise.bind(this);
    this.onClear = this.onClear.bind(this);
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
    const { selectedPoints } = this.props;
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
      </div>
    );
  }
}

export default connect(state => ({
  selectedPoints: state.selectedPoints
}), {raisePoints, clearSelection})(Toolbox);
