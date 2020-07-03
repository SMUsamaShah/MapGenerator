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
      res[i][j] = random() * 100;
    }
  }
  return res;
}
