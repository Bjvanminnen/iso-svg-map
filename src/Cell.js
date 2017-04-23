import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  pathFrom,
  moveTo,
  lineTo,
  closePath,
} from './pathGen';

export const isoCell = (points, mapX, mapY) => {
  const top = points[mapX][mapY];
  const right = points[mapX + 1][mapY];
  const bottom = points[mapX + 1][mapY + 1];
  const left = points[mapX][mapY + 1];

  return pathFrom(
    moveTo(...top),
    lineTo(...right),
    lineTo(...bottom),
    lineTo(...left),
    closePath()
  );
}

export default class Cell extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    mapX: PropTypes.number.isRequired,
    mapY: PropTypes.number.isRequired,
  };

  render() {
    const { points, mapX, mapY } = this.props;
    return (
      <g>
        <path
          d={isoCell(points, mapX, mapY)}
          fill="#008000"
          stroke="black"
          fillOpacity={0.8}
        />
      </g>
    );
  }
}
