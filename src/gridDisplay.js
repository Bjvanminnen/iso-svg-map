import { pointKey } from './utils';

export const TILE_HEIGHT_HALF = 32;
export const TILE_WIDTH_HALF = 64;
export const HEIGHT_DELTA = 24;
export const GROUND_HEIGHT = 50;

const pointFromHeight = (height, x, y) => ({
  x: (2 * x - y) * TILE_WIDTH_HALF,
  y: y * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
});

const adjusts = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 0, y: 1 }
];
export const adjustPoint = (x, y, direction) => {
  return {
    x: x + adjusts[direction].x,
    y: y + adjusts[direction].y
  };
}

export const pointScreenPosHeightless = (x, y) => pointFromHeight(0, x, y);

const getHeight = (heights, x, y) => (heights.get(pointKey(x, y)) || 0);

export const pointScreenPos = (heights, x, y) => (
  pointFromHeight(getHeight(heights, x, y), x, y)
);

export const getCorners = (heights, x, y) => ([
  pointScreenPos(heights, x + adjusts[0].x, y + adjusts[0].y),
  pointScreenPos(heights, x + adjusts[1].x, y + adjusts[1].y),
  pointScreenPos(heights, x + adjusts[2].x, y + adjusts[2].y),
  pointScreenPos(heights, x + adjusts[3].x, y + adjusts[3].y),
]);

export const getCornerHeights = (heights, x, y) => ([
  getHeight(heights, x + adjusts[0].x, y + adjusts[0].y),
  getHeight(heights, x + adjusts[1].x, y + adjusts[1].y),
  getHeight(heights, x + adjusts[2].x, y + adjusts[2].y),
  getHeight(heights, x + adjusts[3].x, y + adjusts[3].y),
]);
