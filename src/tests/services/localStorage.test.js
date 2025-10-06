import localStorageService from '../../services/localStorage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

// Mock crypto for UUID generation
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: jest.fn(() => new Uint8Array([1, 2, 3, 4])),
  },
});

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

describe('localStorageService', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('getDefaultConfig returns proper structure', () => {
    const result = localStorageService.getDefaultConfig();
    expect(typeof result).toBe('object');
    expect(typeof result.success).toBe('boolean');
    expect(typeof result.qrcode).toBe('string');
    expect(typeof result.animation).toBe('number');
    expect(typeof result.app_url).toBe('string');
    expect(typeof result.custom_text).toBe('string');
    expect(typeof result.puzzle.puzzles_collected).toBe('number');
    expect(result.puzzle.puzzles_needed).toBeUndefined();
    expect(typeof result.puzzle.hint).toBe('string');

    expect(typeof result.x_position === 'number' || result.x_position === null).toBe(true);
    expect(typeof result.y_position === 'number' || result.y_position === null).toBe(true);
    expect(typeof result.img === 'string' || result.img === null).toBe(true);
    expect(typeof result.w_button_text).toBe('string');
    expect(typeof result.w_hint_static_text).toBe('string');
    expect(typeof result.w_top_text).toBe('string');
    expect(typeof result.p_coupon_text).toBe('object');
    expect(typeof result.p_code_text).toBe('string');
    expect(typeof result.p_bottom_text === 'string' || result.p_bottom_text === null).toBe(true);
    expect(typeof result.p_button_text === 'string' || result.p_button_text === null).toBe(true);
  });
});
