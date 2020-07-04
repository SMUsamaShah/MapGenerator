import { tvnoise, applyNoise } from './noise';
import { WIDTH, HEIGHT } from './consts';
import { draw2DArray, rnd } from './utils';

// Setup canvas
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.width = '50%';
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');

// TODO(abdullah) always use an existing array rather then returning a new array
const terrainData = tvnoise(WIDTH, HEIGHT, rnd('Test'));
applyNoise(1, terrainData, rnd('Test'));
// applynoise(2, terrainData, rnd('Test'));
// for (let i=4; i<64; i*=2) {
//   applynoise(Math.floor(i), terrainData, rnd('Test'), 50);
// }
draw2DArray(canvasCtx, terrainData);
