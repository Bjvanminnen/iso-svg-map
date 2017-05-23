import React, { Component } from 'react';

const styles = {
  pre: {
    border: '1px solid black',
    backgroundColor: 'lavender'
  }
};

export default class DebugInfo extends Component {
  constructor(props) {
    super(props);

    this.toggleCollapsed = this.toggleCollapsed.bind(this);

    this.state = {
      collapsed: false
    };
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { data } = this.props;
    const contents = this.state.collapsed ? 'DebugInfo...' : data;
    return (
      <pre style={styles.pre} onClick={this.toggleCollapsed}>
        {contents}
      </pre>
    );
  }
}