import { AnimationService } from '@/services';

describe('animation', () => {
  test('getAnimateFunction', () => {
    const result = new AnimationService();
    const exaple = result.getAnimateFunction(2);

    expect(typeof exaple).toBe('function');
  });
});
