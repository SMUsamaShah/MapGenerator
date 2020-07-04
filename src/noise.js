import random from 'seedrandom';

// caches for quick lookup
const noiseCache = {};
const smoothNoiseCache = {};

/**
 * @param  {number} w
 * @param  {number} h
 * @param  {()=>number} random
 */
export function tvnoise(w, h, random) {
  const res = [];
  for (let i = 0; i < h; i++) {
    res[i] = [];
    for (let j = 0; j < w; j++) {
      res[i][j] = 0; // random() * 100;
    }
  }
  return res;
}

/**
 * TODO(usama): fix smooth noise not working for size > 1
 * apply noise over existing one. 
 * @param  {number} size size of noise blocks
 * @param  {number} terrain map 2d array 
 * @param  {()=>number} random random function
 * @param  {number} range 
 */
export function applyNoise(size = 1, terrain, random, range = 100) {
  let val;
  let h = terrain.length;
  let w = terrain[0].length;

  for (let x = 0; x < w; x += size) {
    for (let y = 0; y < h; y += size) {

      // // inner loop is for scaled noise, fill chunks of 2d array one after another
      val = smoothNoise(x, y) * range;

      for (let _x = x; _x < (x + size) && _x < w; ++_x) {
        for (let _y = y; _y < (y + size) && _y < h; ++_y) {
          let ax = Math.abs(_x - x - size / 2),
            ay = Math.abs(_y - y - size / 2);

          terrain[_x][_y] = (terrain[_x][_y] + val) / 2;
        }
      }
      // end inner loop

      // terrain[x][y] = PerlinNoise_2D(x, y, 128, 2);

    }
  }
}

/**
 * generate a number based on given x y values from previously set seed. 
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
  const n = random(seed)();

  noiseCache[`${x},${y}`] = n;
  return n;
}


/**
 * smooth noise
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
 * Return an interpolated number between a and b based on given position x
 * e.g. a=2 b=4 x=0.5 will return 3
 * @param {number} a start
 * @param {number} b end
 * @param {number} x 0-1
 */
export function interpolate(a, b, x) {
  return a * (1 - x) + b * x;
}

function interpolatedNoise(x = 1.0, y = 1.0) {
  const integer_X = Math.floor(x);
  const fractional_X = x - integer_X;

  const integer_Y = Math.floor(y);
  const fractional_Y = y - integer_Y;

  const v1 = smoothNoise(integer_X,     integer_Y);
  const v2 = smoothNoise(integer_X + 1, integer_Y);
  const v3 = smoothNoise(integer_X,     integer_Y + 1);
  const v4 = smoothNoise(integer_X + 1, integer_Y + 1);

  const i1 = interpolate(v1, v2, fractional_X);
  const i2 = interpolate(v3, v4, fractional_X);

  return interpolate(i1, i2, fractional_Y);
}


function PerlinNoise_2D(x, y, persistence, Number_Of_Octaves) {
  let total = 0, frequency, amplitude;
  const p = persistence;
  const n = Number_Of_Octaves - 1;

  for (let i = 0; i<=n; i++) {
    frequency = 2*i;
    amplitude = p*i;

    total = total + interpolatedNoise(x * frequency, y * frequency) * amplitude;
  }

  return total;
}