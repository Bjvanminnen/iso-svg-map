export const pathFrom = (...args) => args.join(' ');

export const moveTo = (x, y) => `M${x} ${y}`;
export const lineTo = (x, y) => `L${x} ${y}`;
export const closePath = () => 'Z';

const TILE_HEIGHT_HALF = 32;
const TILE_WIDTH_HALF = TILE_HEIGHT_HALF * 2;
const HEIGHT_DELTA = 20;

export const isoPoint = (mapX, mapY, height) => {
  return ([
    (mapX - mapY) * TILE_WIDTH_HALF,
    (mapX + mapY) * TILE_HEIGHT_HALF - HEIGHT_DELTA * height,
    height
  ]);
}
