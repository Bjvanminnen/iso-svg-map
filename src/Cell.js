import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './grid';

const colors = {
  flat: '#00a000',
  angle: '#008000',
  angleRight: '#008000',
  angleLeft: '#008000',
};

const pointString = (points) => (
  points.map(p => [p.x, p.y].join(',')).join(' ')
);

const heightsKey = (corners) => {
  const heights = corners.map(item => item.height);
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
  '0001': genPoly([leftPoints, rightPoints], [colors.angle, colors.flat]),
  '0010': genPoly([topPoints, bottomPoints], [colors.flat, colors.angle]),
  '0100': genPoly([leftPoints, rightPoints], [colors.flat, colors.angle]),
  '0110': genPoly([allPoints], [colors.angle]),
  '0111': genPoly([topPoints, bottomPoints], [colors.angle, colors.flat]),
  '1000': genPoly([topPoints, bottomPoints], [colors.angle, colors.flat]),
  '1001': genPoly([allPoints], [colors.angleRight]),
  '1011': genPoly([leftPoints, rightPoints], [colors.flat, colors.angle]),
  '1100': genPoly([allPoints], [colors.angleLeft]),
  '1101': genPoly([topPoints, bottomPoints], [colors.flat, colors.angle]),
  '1110': genPoly([leftPoints, rightPoints], [colors.angle, colors.flat])
};

export default class Cell extends Component {
  static propTypes = {
    grid: PropTypes.instanceOf(Grid).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    const { grid, x, y } = this.props;

    const corners = grid.getCorners(x, y);
    const key = heightsKey(corners);

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
            stroke: 'black',
            fill: 'none'
          }}
        />
      </g>
    );
  }
}
