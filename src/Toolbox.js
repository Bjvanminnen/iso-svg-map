import React, { Component } from 'react';
import { connect } from 'react-redux';
import { raisePoint } from './redux/grid';

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
    const { selectedPoints, raisePoint } = this.props;
    raisePoint(selectedPoints[0].x, selectedPoints[0].y);
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
      </div>
    );
  }
}

export default connect(state => ({
  selectedPoints: state.selectedPoints
}), {raisePoint})(Toolbox);
