import AnimationService from '../../services/animation';

describe('animation', () => {
  test('getAnimateFunction', () => {
    const result = new AnimationService();
    const example = result.getAnimateFunction(2);

    expect(typeof example).toBe('function');
  });
});
