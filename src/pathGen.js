export const pathFrom = (...args) => args.join(' ');

export const moveTo = (x, y) => `M${x} ${y}`;
export const lineTo = (x, y) => `L${x} ${y}`;
export const closePath = () => 'Z';

const TILE_WIDTH_HALF = 64;
const TILE_HEIGHT_HALF = 32;

export const isoPoint = (mapX, mapY) => ([
  (mapX - mapY) * TILE_WIDTH_HALF,
  (mapX + mapY) * TILE_HEIGHT_HALF,
]);

export const isoCell = (mapX, mapY) => (
  pathFrom(
    moveTo(...isoPoint(mapX, mapY)),
    lineTo(...isoPoint(mapX + 1, mapY)),
    lineTo(...isoPoint(mapX + 1, mapY + 1)),
    lineTo(...isoPoint(mapX, mapY + 1)),
    closePath()
  )
);
