import { getRandomArbitrary } from '@/utlis';

describe('utils', () => {
  test('getRandomArbitrary test 1', () => {
    const example = getRandomArbitrary(1, 2);
    expect(example).toBeLessThan(2);
    expect(example).toBeGreaterThan(1);
  });
});
