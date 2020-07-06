import { init, applyNoise } from './noise';
import { WIDTH, HEIGHT } from './consts';
import { draw2DArray, rnd, draw2DArray3D } from './utils';

// Setup canvas
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.width = '30%';
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');

// TODO(abdullah) always use an existing array rather then returning a new array
const heightmap = init(WIDTH, HEIGHT, ()=>0);
// applyNoise(heightmap, 32, 200);
applyNoise(heightmap, 16, 100);
applyNoise(heightmap, 8, 90);
applyNoise(heightmap, 4, 70);
applyNoise(heightmap, 2, 30);
applyNoise(heightmap, 1, 20);

// draw2DArray(canvasCtx, heightmap);
draw2DArray3D(canvasCtx, heightmap);
