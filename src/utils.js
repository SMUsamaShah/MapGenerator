import random from 'seedrandom';
import {lerp} from './noise';

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
  ctx.fillStyle = color;
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
 * maps a number between a new range
 * @param {number} n 
 * @param {number} min 
 * @param {number} max 
 * @param {number} min_s 
 * @param {number} max_s 
 */
export function rescale(n, min, max, min_s, max_s) {
  const length = max - min;
  const length_s = max_s - min_s;
  return min_s + ((n - min) / length) * length_s;
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
      ctx.fillStyle = colorMap(v, 0, 100) //hsla(0, 0, v, 1);
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
      const z = 100 + y/2 - (v * 1.2);
      ctx.fillRect(x, z, 1, 1);
    }
  }
}

let colors = [
  'black',
  'gray',
  'gray',
  'gray',
  // 'darkblue',
  // 'blue',
  // 'darkgreen',
  // 'white',
];

export function colorMap(n, min, max, name = "magma") {

  const h = rescale(n, min, max, 0, 360);

  // magma
  const color_map = {
    "magma": hsla(h * 0.5 + 250, 50, h / 360 * 100, 1),
    "land": hsla(320 - h * 0.9, 80, n / 2, 1),
    "land3": hsla(
                  lerp(220, 105, n/100), 
                  70, 
                  40, 
                  1)
  }

  //return colors[Math.floor(n)%colors.length];

  return color_map.land;
}
/**
 * @param  {string} seed
 * @returns  {()=>number}
 */
export const rnd = (seed) => random(seed);
