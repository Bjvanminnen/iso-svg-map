export const pathFrom = (...args) => args.join(' ');

export const moveTo = (x, y) => `M${x} ${y}`;
export const lineTo = (x, y) => `L${x} ${y}`;
export const closePath = () => 'Z';

const TILE_WIDTH_HALF = 64;
const TILE_HEIGHT_HALF = 32;

export const isoPoint = (mapX, mapY, height) => {
  return ([
    (mapX - mapY) * TILE_WIDTH_HALF,
    (mapX + mapY) * TILE_HEIGHT_HALF - 20 * height,
  ]);
}

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
  // pathFrom(
  //   moveTo(...isoPoint(mapX, mapY)),
  //   lineTo(...isoPoint(mapX + 1, mapY)),
  //   lineTo(...isoPoint(mapX + 1, mapY + 1)),
  //   lineTo(...isoPoint(mapX, mapY + 1)),
  //   closePath()
  // )
}
