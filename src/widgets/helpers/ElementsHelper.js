export const Elements = {
  get emailInput() {
    return document.getElementById('boomio-competition-email-input-field');
  },
  get nameInput() {
    return document.getElementById('boomio-competition-name-input-field');
  },
  get citySelect() {
    return document.getElementById('city-select');
  },
  get schoolSelect() {
    return document.getElementById('school-select');
  },

  isVisible(el) {
    if (!el) return false;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }

    const rect = el.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};
