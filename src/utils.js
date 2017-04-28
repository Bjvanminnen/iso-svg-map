export const  pointKey = (x, y) => `${x}_${y}`;

export const pointString = (points) => (
  points.map(p => [p.x, p.y].join(',')).join(' ')
);
