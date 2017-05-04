import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCorners, getCornerHeights, adjustPoint } from './gridDisplay';
import { selectPoint, addPoint } from './redux/selectedPoints';
import { setDebugObj } from './redux/debugInfo';
import { pointString, pointKey } from './utils';
import createCachedSelector from 're-reselect';

const colors = {
  flat: '#98BC60',
  north: '#B5DA7A',
  northEast: '#B5DA7A',
  east: '#B5DA7A',
  southEast: '#B5DA7A',
  south: '#79A337',
  southWest: '#79A337',
  west: '#79A337',
  northWest: '#79A337',
  stroke: '#99b74f'
};

const heightsKey = (heights) => {
  const min = Math.min(...heights);
  const max = Math.max(...heights);
  return heights.map(x => x === min ? '0' : (
    x === max ? '2' : '1')).join('');
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

// NOTE: Those with mix of 2s and 1s might not have the exact right direction
const polygons = {
  '0000': genPoly(all, [colors.flat]),
  '0002': genPoly(leftRight, [colors.east, colors.flat]),
  '0012': genPoly(all, [colors.northEast]),
  '0020': genPoly(topBottom, [colors.flat, colors.southEast]),
  '0021': genPoly(all, [colors.north]),
  '0022': genPoly(all, [colors.northEast]),
  '0102': genPoly(leftRight, [colors.northEast, colors.northWest]),
  '0112': genPoly(leftRight, [colors.northEast, colors.northWest]),
  '0120': genPoly(all, [colors.northWest]),
  '0121': genPoly(all, [colors.north]),
  '0122': genPoly(all, [colors.northEast]),
  '0200': genPoly(leftRight, [colors.flat, colors.west]),
  '0201': genPoly(leftRight, [colors.east, colors.west]),
  '0202': genPoly(leftRight, [colors.east, colors.west]),
  '0210': genPoly(all, [colors.northWest]),
  '0211': genPoly(leftRight, [colors.east, colors.west]),
  '0212': genPoly(leftRight, [colors.east, colors.west]),
  '0220': genPoly(all, [colors.northWest]),
  '0221': genPoly(all, [colors.northWest]),
  '0222': genPoly(topBottom, [colors.north, colors.flat]),
  '1002': genPoly(all, [colors.southEast]),
  '1012': genPoly(all, [colors.southEast]),
  '1020': genPoly(leftRight, [colors.northWest, colors.northEast]),
  '1021': genPoly(all, [colors.northEast]),
  '1022': genPoly(all, [colors.northEast]),
  '1102': genPoly(all, [colors.southEast]),
  '1120': genPoly(leftRight, [colors.northWest, colors.northEast]),
  '1200': genPoly(all, [colors.southWest]),
  '1201': genPoly(leftRight, [colors.east, colors.west]),
  '1210': genPoly(all, [colors.northWest]),
  '1220': genPoly(all, [colors.northWest]),
  '2000': genPoly(topBottom, [colors.south, colors.flat]),
  '2001': genPoly(all, [colors.southEast]),
  '2002': genPoly(all, [colors.southEast]),
  '2010': genPoly(topBottom, [colors.south, colors.north]),
  '2011': genPoly(topBottom, [colors.south, colors.southEast]),
  '2012': genPoly(all, [colors.southEast]),
  '2020': genPoly(topBottom, [colors.south, colors.north]),
  '2021': genPoly(topBottom, [colors.north, colors.south]),
  '2022': genPoly(leftRight, [colors.flat, colors.southEast]),
  '2100': genPoly(all, [colors.southWest]),
  '2101': genPoly(all, [colors.south]),
  '2102': genPoly(all, [colors.southEast]),
  '2110': genPoly(leftRight, [colors.southWest, colors.southEast]),
  '2120': genPoly(topBottom, [colors.south, colors.north]),
  '2200': genPoly(all, [colors.southWest]),
  '2201': genPoly(all, [colors.southWest]),
  '2202': genPoly(topBottom, [colors.flat, colors.south]),
  '2210': genPoly(all, [colors.southWest]),
  '2220': genPoly(leftRight, [colors.southWest, colors.flat]),
  default: genPoly(all, ['yellow']),
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
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    const { cornerHeights, x, y, setDebugObj } = this.props;

    const key = heightsKey(cornerHeights);

    setDebugObj({
      x,
      y,
      heights: cornerHeights,
      k: key,
    });
  }

  onClick(event) {
    const { selectPoint, addPoint, corners, x, y } = this.props;

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
      pointsToAdd.push(adjustPoint(x, y, minIndex));
    } else {
      pointsToAdd = [0,1,2,3].map(direction => adjustPoint(x, y, direction));
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

    let polies = polygons[key] || polygons.default;

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
            onMouseOver={this.onMouseOver}
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
          onMouseOver={this.onMouseOver}
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
  selectPoint, addPoint, setDebugObj
}))(Cell);
