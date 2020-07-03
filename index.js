import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());

// Write Javascript code!
let xScale = 1;
let yScale = 1;

const WIDTH = 300;
const HEIGHT = 300;

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.width = "100%";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// ctx.translate(20,20);
// ctx.transform(1,0,0,1,10,10);

// ***************** random generation *****************
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

// Output one 32-bit hash to provide the seed for mulberry32.
function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}
// ****************************** end random functions *********************

// perlin noise tutorial https://web.archive.org/web/20160530124230/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm

/** 
 * 1. Value Noise
 * 2. Perline Noise
 * 3. Simplex Noise (upgraded version of perlin noise)
 * 
 * we need Simplex or perlin
 */


function circle(ctx,x,y,size,color){
  ctx.beginPath();
  ctx.arc(x,y,size,0,7);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function rectangle(ctx,x,y,w,h,color){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x,y,w,h);
  ctx.closePath();
}

// create map and init with 0
const terrain = []
for(let i=0; i<WIDTH; ++i) {terrain[i] = []; for(let j=0; j<HEIGHT; ++j) terrain[i][j] = 0;}

// draw map
function drawTerrain() {
  for(let y=0; y<WIDTH; ++y) {
    for(let x=0; x<HEIGHT; ++x) {
      let v = terrain[x][y];
      ctx.fillStyle = hsla(0,0,v,1);
      ctx.fillRect(x,y,1,1);
    }
  }
}

// fill map with random data
function tvnoise(ctx,size,x,y,w,h){
  let v;
  for (let _x=0; _x<w; _x+=size) {
    for (let _y=0; _y<h; _y+=size) {

      // inner loop is for scaling, to fill chunks of 2d array one after another
      v = random()*100;
      for (let xx=_x; xx<(xx+size) && xx<w; ++xx){
        for (let yy=_y; yy<(yy+size) && yy<h; ++yy){
          terrain[xx][yy] = (v + terrain[xx][yy])/1.7;
        }
      }
      // end inner loop
      
    }
  }
}

// randomly spread dots
function papernoise(ctx,x,y,w,h,max_size,birghtness,count){
  for (let i=0; i<count; i++) {
    ctx.beginPath();
    circle(ctx,random()*(w-x),random()*(h-y), random()*max_size, hsl(random()*birghtness));
    ctx.fill();
    ctx.closePath();
  }
}

// create random color in hsl space
function hsl(alpha){
  let hue = 0;
  let sat = 0;
  let lum = random()*100;
  return `hsla(${hue},${sat}%,${lum}%,${alpha || 0.3})`;
}

function hsla(hue, saturation, luminance, alpha){
  return `hsla(${hue||0},${saturation||0}%,${luminance||0}%,${alpha||1})`
}

let seed = xmur3("fgdd");
let random = sfc32(seed(), seed(), seed(), seed());


tvnoise(ctx,25,0,0,WIDTH,HEIGHT);
tvnoise(ctx,50,0,0,WIDTH,HEIGHT);
drawTerrain();
// tvnoise(ctx,3.6,0,0,WIDTH,HEIGHT);
// tvnoise(ctx,10.5,0,0,WIDTH,HEIGHT);

//papernoise(ctx,0,0,300,300, 1.5, 0.03, 1000);
//papernoise(ctx,0,0,300,300, .5, 0.29, 50);