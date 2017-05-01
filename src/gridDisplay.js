import { pointKey } from './utils';

export const TILE_HEIGHT_HALF = 32;
export const TILE_WIDTH_HALF = 64;
export const HEIGHT_DELTA = 24;
export const GROUND_HEIGHT = 50;

const pointFromHeight = (height, x, y) => ({
  x: (x - y) * TILE_WIDTH_HALF,
  y: (x + y) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
});

export const pointScreenPosHeightless = (x, y) => pointFromHeight(0, x, y);

const getHeight = (heights, x, y) => (heights.get(pointKey(x, y)) || 0);

export const pointScreenPos = (heights, x, y) => (
  pointFromHeight(getHeight(heights, x, y), x, y)
);

export const getCorners = (heights, x, y) => ([
  pointScreenPos(heights, x, y),
  pointScreenPos(heights, x + 1, y),
  pointScreenPos(heights, x + 1, y + 1),
  pointScreenPos(heights, x, y + 1)
]);

export const getCornerHeights = (heights, x, y) => ([
  getHeight(heights, x, y),
  getHeight(heights, x + 1, y),
  getHeight(heights, x + 1, y + 1),
  getHeight(heights, x, y + 1),
]);
