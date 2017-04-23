import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  pathFrom,
  moveTo,
  lineTo,
  closePath,
} from './pathGen';

const colors = {
  flat: '#008000',
  angle: '#228000'
};

export default class Cell extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    mapX: PropTypes.number.isRequired,
    mapY: PropTypes.number.isRequired,
  };

  render() {
    const { points, mapX, mapY } = this.props;

    const top = points[mapX][mapY];
    const right = points[mapX + 1][mapY];
    const bottom = points[mapX + 1][mapY + 1];
    const left = points[mapX][mapY + 1];

    const mainPath = pathFrom(
      moveTo(...top),
      lineTo(...right),
      lineTo(...bottom),
      lineTo(...left),
      closePath()
    );

    let anglePath;
    if (top[2] !== bottom[2] && left[2] === right[2]) {
      anglePath = pathFrom(
        moveTo(...(top[2] === left[2] ? bottom : top)),
        lineTo(...right),
        lineTo(...left),
        closePath()
      );
    }

    return (
      <g>
        <path
          d={mainPath}
          fill={colors.flat}
          stroke="black"
          fillOpacity={0.8}
        />
        {anglePath && <path
          d={anglePath}
          fill={colors.angle}
        />
        }
      </g>
    );
  }
}
