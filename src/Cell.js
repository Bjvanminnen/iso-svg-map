import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCorners, getCornerHeights } from './redux/grid';

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

const polygons = {
  '0000': genPoly([allPoints], [colors.flat]),
  '0001': genPoly([leftPoints, rightPoints], [colors.angleRight, colors.flat]),
  '0010': genPoly([topPoints, bottomPoints], [colors.flat, colors.angleRight]),
  '0011': genPoly([allPoints], [colors.angleRight]),
  '0100': genPoly([leftPoints, rightPoints], [colors.flat, colors.angleLeft]),
  '0110': genPoly([allPoints], [colors.angleLeft]),
  '0111': genPoly([topPoints, bottomPoints], [colors.angleLeft, colors.flat]),
  '1000': genPoly([topPoints, bottomPoints], [colors.angleFront, colors.flat]),
  '1001': genPoly([allPoints], [colors.angleRight]),
  // '1011': genPoly([leftPoints, rightPoints], [colors.flat, colors.angle]),
  '1100': genPoly([allPoints], [colors.angleLeft]),
  '1101': genPoly([topPoints, bottomPoints], [colors.flat, colors.angleFront]),
  // '1110': genPoly([leftPoints, rightPoints], [colors.angle, colors.flat])
};

class Cell extends Component {
  static propTypes = {
    corners: PropTypes.array.isRequired,
    cornerHeights: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

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
}))(Cell);
