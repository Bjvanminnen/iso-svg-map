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
    const { selectedPoint, raisePoint } = this.props;
    raisePoint(selectedPoint.x, selectedPoint.y);
  }

  onClear() {
    localStorage.removeItem('savedStore');
    window.location.reload();
  }

  render() {
    const { selectedPoint } = this.props;
    return (
      <div style={styles.main}>
        <div>
          <button
            onClick={this.onRaise}
            disabled={!selectedPoint}
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
  selectedPoint: state.selectedPoint
}), {raisePoint})(Toolbox);
