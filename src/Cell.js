import React, { Component } from 'react';
import PropTypes from 'prop-types';

const colors = {
  flat: '#00a000',
  angle: '#008000',
  angleRight: '#008000',
  angleLeft: '#008000',
};

const pointString = (points) => (
  points.map(p => [p[0], p[1]].join(',')).join(' ')
);

const normalizeHeights = (heights) => {
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
    // TODO
    grid: PropTypes.object.isRequired,
    mapCoordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    const { grid, mapCoordinates } = this.props;

    const mapX = mapCoordinates.x;
    const mapY = mapCoordinates.y;
    const points = grid.points;

    const corners = [
      points[mapX][mapY],
      points[mapX + 1][mapY],
      points[mapX + 1][mapY + 1],
      points[mapX][mapY + 1]
    ];
    const key = normalizeHeights(corners.map(x => x[2]));

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
