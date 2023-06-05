import { localStorageService } from '@/services';

describe('localStorageService', () => {
  test('getDefaultConfig', () => {
    const result = localStorageService.getDefaultConfig();
    expect(typeof result).toBe('object');
    expect(typeof result.success).toMatch('boolean');
    expect(typeof result.qrcode).toMatch('string');
    expect(typeof result.animation).toMatch('number');
    expect(typeof result.app_url).toMatch('string');
    expect(typeof result.custom_text).toMatch('string');
    expect(typeof result.puzzle.puzzles_collected).toMatch('number');
    expect(typeof result.puzzle.puzzles_needed).toMatch('number');
    expect(typeof result.puzzle.hint).toMatch('string');

    expect(
      typeof result.appearing_puzzle_nr === 'number' || result.appearing_puzzle_nr === null,
    ).toBe(true);
    expect(typeof result.x_position === 'number' || result.x_position === null).toBe(true);
    expect(typeof result.y_position === 'number' || result.y_position === null).toBe(true);
    expect(typeof result.img === 'string' || result.img === null).toBe(true);
    expect(typeof result.w_button_text).toMatch('string');
    expect(typeof result.w_hint_static_text).toMatch('string');
    expect(typeof result.w_top_text).toMatch('string');
    expect(typeof result.p_coupon_text).toMatch('string');
    expect(typeof result.p_code_text).toMatch('string');
    expect(typeof result.p_bottom_text === 'string' || result.p_bottom_text === null).toBe(true);
    expect(typeof result.p_button_text === 'string' || result.p_button_text === null).toBe(true);
  });
});
