import random from 'seedrandom';

// caches for quick lookup
const noiseCache = {};
const smoothNoiseCache = {};

/**
 * Return a 2d array filled using given function
 * @param  {number} w
 * @param  {number} h
 * @param  {()=>number} fn
 */
export function init(w, h, fn) {
  const res = [];
  for (let i = 0; i < h; i++) {
    res[i] = [];
    for (let j = 0; j < w; j++) {
      res[i][j] = fn() * 100;
    }
  }
  return res;
}

/**
 * TODO(usama): fix smooth noise not working for size > 1
 * apply noise over existing one. 
 * @param  {number} terrain map 2d array
 * @param  {number} size size of noise blocks
 * @param  {number} range 
 */
export function applyNoise(terrain, size = 1, range = 100) {
  let val;
  let h = terrain.length;
  let w = terrain[0].length;

  let max = 0, min = Infinity;

  for (let x = 0; x < w; ++x) {
    for (let y = 0; y < h; ++y) {

      // this is value noise or fractal noise. Perlin noise interpolate gradients/slopes instead of positive numbers

      val = interpolatedNoise(x/size, y/size);
      val *= range;
      if (terrain[x][y] == 0)
        terrain[x][y] = val;
      else 
        terrain[x][y] = lerp(terrain[x][y], val, 0.12);

      max = max < terrain[x][y] ? terrain[x][y] : max;
      min = min > terrain[x][y] ? terrain[x][y] : min;
    }
  }

  console.log(min, max);
}

/**
 * Generate a number based on given x y values from previously set seed. 
 * Always generates same number from same x y
 * @param {number} x 
 * @param {number} y 
 * @returns {number} random number based on input
 */
export function noise(x, y) {
  if (noiseCache[`${x},${y}`]) {
    return noiseCache[`${x},${y}`];
  }

  const seed = ((x << 16) + (y << 8)) / 91; // try to generate different number for given x y with some nonsense bitshifting
  const n = random(seed+3)();

  noiseCache[`${x},${y}`] = n;
  return n;
}

/**
 * @returns a random gradient value in range [-1, +1]
 */
function gradient_1D(x) {
  const seed = (x << 16) / 91; // try to generate different number for given x y with some nonsense bitshifting
  const n = -1 + random(seed)()*2; // scale it between -1, +1

  return n;
}


/**
 * Takes average of current point with all 8 points around it to make it smooth
 * @param {number} x 
 * @param {number} y 
 * @returns {number} smooth noise value
 */
export function smoothNoise(x = 0, y = 0) {
  if (smoothNoiseCache[`${x},${y}`]) {
    return smoothNoiseCache[`${x},${y}`];
  }

  const corners = (noise(x - 1, y - 1) + noise(x + 1, y - 1) + noise(x - 1, y + 1) + noise(x + 1, y + 1)) / 16
  const sides   = (noise(x - 1, y)     + noise(x + 1, y)     + noise(x,     y - 1) + noise(x,     y + 1)) / 8
  const center  = noise(x, y) / 4
  const n = corners + sides + center;

  smoothNoiseCache[`${x},${y}`] = n;
  return n;
}

/**
 * Lerp is short for Linear interpolation. Returns an interpolated number between a and b based on given position t
 * It's simplest interpolation and results in a straight path between two points
 * e.g. a=2 b=4 then t=0.5 will return 3
 * @param {number} a start
 * @param {number} b end
 * @param {number} t 0-1
 */
export function lerp(a, b, t) {
  //return a * (1 - t) + b * t;
  return a + t*(b - a);
}

//TODO(usama): replace with something i actually understand and can create myself :p
function interpolatedNoise(x = 1.0, y = 1.0) {
  const integer_X = Math.floor(x);
  const fractional_X = x - integer_X;

  const integer_Y = Math.floor(y);
  const fractional_Y = y - integer_Y;

  const v1 = smoothNoise(integer_X,     integer_Y);
  const v2 = smoothNoise(integer_X + 1, integer_Y);
  const v3 = smoothNoise(integer_X,     integer_Y + 1);
  const v4 = smoothNoise(integer_X + 1, integer_Y + 1);

  const i1 = lerp(v1, v2, fractional_X);
  const i2 = lerp(v3, v4, fractional_X);

  return lerp(i1, i2, fractional_Y);
}


function FractalNoise_2D(x, y, persistence, Number_Of_Octaves) {
  let total = 0, frequency, amplitude;
  const p = persistence;
  const n = Number_Of_Octaves - 1;

  for (let i = 0; i<n; i++) {
    frequency = 2*i;
    amplitude = p*i;

    total = total + interpolatedNoise(x * frequency, y * frequency) * amplitude;
  }

  return total;
}