import random from 'seedrandom';

/**
 * @param  {number} hue
 * @param  {number} saturation
 * @param  {number} luminance
 * @param  {number} alpha
 */
export function hsla(hue, saturation, luminance, alpha) {
  return `hsla(${hue || 0},${saturation || 0}%,${luminance || 0}%,${alpha || 1})`;
}

/**
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {number} x
 * @param  {number} y
 * @param  {number} w
 * @param  {number} h
 * @param  {string|number} color
 */
export function drawReactangle(ctx, x, y, w, h, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.closePath();
}
/**
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {number} x
 * @param  {number} y
 * @param  {number} radius
 * @param  {string|number} color
 */
export function drawCircle(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 7);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/**
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {number[]} terrain
 */
export function draw2DArray(ctx, vals) {
  // TODO(abdullah) check array bounds i.e. make sure the array size is equal to canvas size
  // TODO(abdullah) add x and y support
  for (let i = 0; i < ctx.canvas.height; i++) {
    for (let j = 0; j < ctx.canvas.width; j++) {
      const v = vals[i][j];
      ctx.fillStyle = hsla(0, 0, v, 1);
      ctx.fillRect(i, j, 1, 1);
    }
  }
}
/**
 * @param  {string} seed
 * @returns  {()=>number}
 */
export const rnd = (seed) => random(seed);
