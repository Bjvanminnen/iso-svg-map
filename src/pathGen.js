export const path = (...args) => args.join(' ');

export const moveTo = (x, y) => `M ${x} ${y}`;
export const lineTo = (x, y) => `L ${x} ${y}`;
export const closePath = () => 'Z';
