import { pointKey } from './utils';

export const TILE_HEIGHT_HALF = 32;
export const TILE_WIDTH_HALF = 64;
export const HEIGHT_DELTA = 24;

export const pointScreenPos = (heights, x, y) => {
  const height = heights.get(pointKey(x, y));
  return {
    x: (x - y) * TILE_WIDTH_HALF,
    y: (x + y) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
  };
};

export const getCorners = (heights, x, y) => ([
  pointScreenPos(heights, x, y),
  pointScreenPos(heights, x + 1, y),
  pointScreenPos(heights, x + 1, y + 1),
  pointScreenPos(heights, x, y + 1)
]);

export const getCornerHeights = (heights, x, y) => ([
  heights.get(pointKey(x, y)),
  heights.get(pointKey(x + 1, y)),
  heights.get(pointKey(x + 1, y + 1)),
  heights.get(pointKey(x, y + 1)),
]);
