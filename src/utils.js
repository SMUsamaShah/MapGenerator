import random from 'seedrandom';
import { lerp } from './math';

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
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
export function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
}

/**
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {number} x
 * @param  {number} y
 * @param  {number} w
 * @param  {number} h
 * @param  {string|number} color
 */
export function drawRectangle(ctx, x, y, w, h, color) {
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
 * Map a number which lies within min1-max1 to the new range min2-max2
 * @param {number} n
 * @param {number} min1
 * @param {number} max1
 * @param {number} min2
 * @param {number} max2
 */
export function rescale(n, min1, max1, min2, max2) {
  const length1 = max1 - min1;
  const length2 = max2 - min2;
  return min2 + ((n - min1) / length1) * length2;
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
      const n = vals[i][j];
      ctx.fillStyle = colorMap(n, 0, 100); // hsla(0, 0, n, 1);
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

// psuedo simple isometric 3d
export function draw2DArray3D(ctx, vals) {
  for (let x = 0; x < ctx.canvas.width; x++) {
    for (let y = 0; y < ctx.canvas.height; y++) {
      const v = vals[x][y];
      ctx.fillStyle = colorMap(v, 0, 100);
      const z = 100 + y / 2 - (v * 1.2);
      ctx.fillRect(x, z, 1, 1);
    }
  }
}

export function colorMap(n, min, max, name = 'magma') {
  const h = rescale(n, min, max, 0, 360);

  // return colors[Math.floor(n)%colors.length];

  switch (name) {
    default:
    case 'magma':
      return hsla(h * 0.5 + 250, 50, h / 360 * 100, 1);
    case 'land':
      return hsla(lerp(220, 105, n / 100), 70, 40, 1);
    case 'land2':
      return hsla(320 - h * 0.9, 80, n / 2, 1);
    case 'contour':
      return n % 2 ? 'black' : 'white';
    case 'island':
      if (n >= 90) return 'white';
      if (n >= 60) return 'forestgreen';
      if (n >= 45) return 'deepskyblue';
      if (n >= 20) return 'blue';
      if (n >= 0) return 'darkblue';
  }
}

/**
 * @param  {string} seed
 * @returns  {()=>number}
 */
export const rnd = (seed) => random(seed);
