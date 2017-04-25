import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCorners, getCornerHeights } from './redux/grid';
import { selectPoint } from './redux/selectedPoint';

const colors = {
  flat: '#98BC60',
  angleFront: '#79A337',
  angleBack: '#B5DA7A',
  angleRight: '#B5DA7A',
  angleLeft: '#79A337',
  stroke: '#99b74f'
};

const pointString = (points) => (
  points.map(p => [p.x, p.y].join(',')).join(' ')
);

const heightsKey = (heights) => {
  const min = Math.min(...heights);
  return heights.map(x => x === min ? '0' : '1').join('');
};

const allPoints = [0,1,2,3];
const topPoints = [0,1,3];
const bottomPoints = [1,2,3];
const rightPoints = [0,1,2];
const leftPoints = [0,2,3];

const genPoly = (points, colors) => {
  if (points.length !== colors.length) {
    throw new Error('Different number of points and colors');
  }

  return points.map((p, index) => ({
    points: p,
    color: colors[index]
  }));
};

const all = [allPoints];
const topBottom = [topPoints, bottomPoints];
const leftRight = [leftPoints, rightPoints];

const polygons = {
  '0000': genPoly(all, [colors.flat]),
  '0001': genPoly(leftRight, [colors.angleRight, colors.flat]),
  '0010': genPoly(topBottom, [colors.flat, colors.angleRight]),
  '0011': genPoly(all, [colors.angleRight]),
  '0100': genPoly(leftRight, [colors.flat, colors.angleLeft]),
  '0110': genPoly(all, [colors.angleLeft]),
  '0111': genPoly(topBottom, [colors.angleLeft, colors.flat]),
  '1000': genPoly(topBottom, [colors.angleFront, colors.flat]),
  '1001': genPoly(all, [colors.angleRight]),
  '1010': genPoly(topBottom, [colors.angleFront, colors.angleBack]),
  // '1011': genPoly(leftRight, [colors.flat, colors.angle]),
  '1100': genPoly(all, [colors.angleLeft]),
  '1101': genPoly(topBottom, [colors.flat, colors.angleFront]),
  '1110': genPoly(leftRight, [colors.angleLeft, colors.flat])
};

class Cell extends Component {
  static propTypes = {
    corners: PropTypes.array.isRequired,
    cornerHeights: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    selectPoint: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { selectPoint, x, y } = this.props;
    // TODO - probably want to find closest point instead of top point
    selectPoint(x, y);
  }

  render() {
    const { corners, cornerHeights } = this.props;

    const key = heightsKey(cornerHeights);

    let polies = polygons[key] || [];

    return (
      <g>
        {polies.map((poly, key) => (
          <polygon
            key={key}
            points={pointString(poly.points.map(index => corners[index]))}
            style={{
              stroke: poly.color,
              fill: poly.color
            }}
            onClick={this.onClick}
          />
        ))}
        <polygon
          key={-1}
          points={pointString(corners)}
          style={{
            stroke: colors.stroke,
            fill: 'none'
          }}
        />
      </g>
    );
  }
}

export default connect((state, otherProps) => ({
  corners: getCorners(state.grid, otherProps.x, otherProps.y),
  cornerHeights: getCornerHeights(state.grid, otherProps.x, otherProps.y),
}), ({
  selectPoint
}))(Cell);
