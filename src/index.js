import { init, applyNoise } from './noise';
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
const terrainData = init(WIDTH, HEIGHT, ()=>0);
applyNoise(terrainData, 1);
draw2DArray(canvasCtx, terrainData);
