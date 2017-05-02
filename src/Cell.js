import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCorners, getCornerHeights } from './gridDisplay';
import { selectPoint, addPoint } from './redux/selectedPoints';
import { pointString, pointKey } from './utils';
import createCachedSelector from 're-reselect';

const colors = {
  flat: '#98BC60',
  angleNorth: '#B5DA7A',
  angleNorthEast: '#B5DA7A',
  angleEast: '#B5DA7A',
  angleSouthEast: '#B5DA7A',
  angleSouth: '#79A337',
  angleSouthWest: '#79A337',
  angleWest: '#79A337',
  angleNorthWest: '#79A337',
  stroke: '#99b74f'
};

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
  '0001': genPoly(leftRight, [colors.angleEast, colors.flat]),
  '0101': genPoly(leftRight, [colors.angleEast, colors.angleWest]),
  '0010': genPoly(topBottom, [colors.flat, colors.angleSouthEast]),
  '0011': genPoly(all, [colors.angleNorthEast]),
  '0100': genPoly(leftRight, [colors.flat, colors.angleWest]),
  '0110': genPoly(all, [colors.angleNorthWest]),
  '0111': genPoly(topBottom, [colors.angleSouthWest, colors.flat]),
  '1000': genPoly(topBottom, [colors.angleSouth, colors.flat]),
  '1001': genPoly(all, [colors.angleSouthEast]),
  '1010': genPoly(topBottom, [colors.angleSouth, colors.angleNorth]),
  '1011': genPoly(leftRight, [colors.flat, colors.angleSouthEast]),
  '1100': genPoly(all, [colors.angleSouthWest]),
  '1101': genPoly(topBottom, [colors.flat, colors.angleSouth]),
  '1110': genPoly(leftRight, [colors.angleSouthWest, colors.flat])
};

/**
 * Convert a point from client space to svg space, based on any transforms on
 * the provided svg element
 */
const clientPointToSvgPoint = (element, x, y) => {
  const svg = document.getElementsByTagName('svg')[0];
  const matrix = element.getCTM();
  let point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  const nextPoint = point.matrixTransform(matrix.inverse());
  return nextPoint;
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

  onClick(event) {
    const { selectPoint, addPoint, corners, x, y } = this.props;
    const adjusts = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ];

    // TODO - seems like there might be some bugs in lower right quadrant cells
    // TODO - could have us select a plane rather than the entire cell?
    const svgClick = clientPointToSvgPoint(event.target, event.clientX, event.clientY);

    const singlePoint = event.ctrlKey;

    let pointsToAdd = [];
    if (singlePoint) {
      // find the closest corner
      let minIndex = -1;
      let minDist = Infinity;
      corners.forEach(({x, y}, index) => {
        const deltaX = x - svgClick.x;
        const deltaY = y - svgClick.y;
        const dist = deltaX * deltaX + deltaY * deltaY;
        if (dist < minDist) {
          minDist = dist;
          minIndex = index;
        }
      });
      pointsToAdd.push({
        x: x + adjusts[minIndex].x,
        y: y + adjusts[minIndex].y
      });
    } else {
      pointsToAdd = adjusts.map(adjustment => ({
        x: x + adjustment.x,
        y: y + adjustment.y
      }));
    }

    pointsToAdd.forEach(({x, y}, index) => {
      if (event.shiftKey || index > 0) {
        addPoint(x, y);
      } else {
        selectPoint(x, y);
      }
    });
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
              stroke: '#c6e398',
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
          onClick={this.onClick}
        />
      </g>
    );
  }
}

const getCornerSelector = createCachedSelector(
  state => state.grid.heights,
  (state, props) => props.x,
  (state, props) => props.y,
  getCorners
)(
  (state, props) => pointKey(props.x, props.y)
);

const getCornerHeightsSelector = createCachedSelector(
  state => state.grid.heights,
  (state, props) => props.x,
  (state, props) => props.y,
  getCornerHeights
)(
  (state, props) => pointKey(props.x, props.y)
);

export default connect((state, otherProps) => ({
  corners: getCornerSelector(state, otherProps),
  cornerHeights: getCornerHeightsSelector(state, otherProps)
}), ({
  selectPoint, addPoint
}))(Cell);
