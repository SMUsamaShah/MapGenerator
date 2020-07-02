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

const WIDTH = 250;
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

// each pixel is given random value
function tvnoise(ctx,x,y,w,h){
  for(let _x=x; _x<w; ++_x){
    for(let _y=x; _y<h; ++_y){
      ctx.fillStyle = hsl(1);
      ctx.fillRect(_x,_y,1,1);
      // ctx.fillRect(random()*WIDTH,random()*HEIGHT,1,1);
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

let seed = xmur3(Date.now()+"");
let random = sfc32(seed(), seed(), seed(), seed());
tvnoise(ctx,0,0,WIDTH,HEIGHT);
//papernoise(ctx,0,0,300,300, 1.5, 0.03, 1000);
//papernoise(ctx,0,0,300,300, .5, 0.29, 50);