/**
 * Lerp is short for Linear interpolation.
 * Returns an interpolated number between a and b based on given position t
 * It's simplest interpolation and results in a straight path between two points
 * e.g. a=2 b=4 then t=0.5 will return 3
 * @param {number} a start
 * @param {number} b end
 * @param {number} t 0-1
 */
export function lerp(a, b, t) {
  // return a * (1 - t) + b * t;
  return a + t * (b - a);
}
