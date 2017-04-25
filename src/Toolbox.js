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

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { selectedPoint, raisePoint } = this.props;
    raisePoint(selectedPoint.x, selectedPoint.y);
  }

  render() {
    const { selectedPoint } = this.props;
    if (!selectedPoint) {
      return null;
    }
    return (
      <div style={styles.main}>
        <button onClick={this.onClick}>
          Raise
        </button>
      </div>
    );
  }
}

export default connect(state => ({
  selectedPoint: state.selectedPoint
}), {raisePoint})(Toolbox);
