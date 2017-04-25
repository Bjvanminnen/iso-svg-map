import React, { Component } from 'react';
import { connect } from 'react-redux';
import getStore from './redux/getStore';
import { raisePoint } from './redux/grid';
import { hydrate } from './redux/utils';

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
    this.onSave = this.onSave.bind(this);
    this.onRestore = this.onRestore.bind(this);
  }

  onRaise() {
    const { selectedPoint, raisePoint } = this.props;
    raisePoint(selectedPoint.x, selectedPoint.y);
  }

  onSave() {
    const store = getStore();
    localStorage.setItem('savedStore', JSON.stringify(store.getState()));
  }

  onRestore() {
    const nextState = localStorage.getItem('savedStore');
    if (nextState) {
      this.props.hydrate(nextState);
    }
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
          <button onClick={this.onSave}>
            Save
          </button>
        </div>
        <div>
          <button onClick={this.onRestore}>
            Restore
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  selectedPoint: state.selectedPoint
}), {hydrate, raisePoint})(Toolbox);
