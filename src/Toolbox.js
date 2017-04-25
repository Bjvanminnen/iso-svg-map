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
  }

  onRaise() {
    const { selectedPoint, raisePoint } = this.props;
    raisePoint(selectedPoint.x, selectedPoint.y);
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
      </div>
    );
  }
}

export default connect(state => ({
  selectedPoint: state.selectedPoint
}), {raisePoint})(Toolbox);
