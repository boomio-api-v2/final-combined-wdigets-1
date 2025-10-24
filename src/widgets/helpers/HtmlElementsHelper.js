import { localStorageService } from '@/services';

class HtmlElementsHelper {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name;
  }

  get nameInput() {
    return document.getElementById('boomio-competition-name-input-field');
  }

  get nameError() {
    return document.getElementById('competition-name-error');
  }

  get emailInput() {
    return document.getElementById('boomio-competition-email-input-field');
  }

  get emailError() {
    return document.getElementById('competition-email-error');
  }

  get phoneInput() {
    return document.getElementById('boomio-competition-phone-input-field');
  }

  get phoneError() {
    return document.getElementById('competition-phone-error');
  }

  get citySelect() {
    return document.getElementById('city-select');
  }

  get schoolSelect() {
    return document.getElementById('school-select');
  }

  get shareContainer() {
    return document.getElementById('share-container');
  }

  get shareCloseButton() {
    return document.getElementById('boomio-close-share');
  }

  get didYouKnowContainer() {
    return document.getElementById('did-you-know-container');
  }

  get didYouKnowCloseButton() {
    return document.getElementById('boomio-close-did-you-know');
  }

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
  }

  /**
   * Get email value with proper case handling
   * @returns {string} - Email value (lowercase unless customer is 'Pigu.lt')
   */
  getEmailValue() {
    const email = this.emailInput?.value;
    if (!email) return email;

    // Keep case sensitive for Pigu.lt customer, otherwise convert to lowercase
    return this.customer === 'Pigu.lt' ? email : email.toLowerCase();
  }
}

export const Elements = new HtmlElementsHelper();
