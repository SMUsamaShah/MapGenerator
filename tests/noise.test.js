import { tvnoise } from '../src/noise';
import { rnd } from '../src/utils';

describe('Noise generation test', () => {
  it('Same seed should generate same data', () => {
    const seed = 'test';
    const a = tvnoise(300, 300, rnd(seed));
    const b = tvnoise(300, 300, rnd(seed));
    expect(a).toEqual(b);
  });

  it('Diffrent seed should generate diffrent data', () => {
    const a = tvnoise(300, 300, rnd('seed1'));
    const b = tvnoise(300, 300, rnd('seed2'));
    expect(a).not.toEqual(b);
  });
});
