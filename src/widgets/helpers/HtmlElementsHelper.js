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

  get checkbox() {
    return document.getElementById('boomio-privacyCheckbox');
  }

  get checkbox2() {
    return document.getElementById('boomio-privacyCheckbox2');
  }

  get checkbox3() {
    return document.getElementById('boomio-privacyCheckbox3');
  }

  get competitionCheckboxError() {
    return document.getElementById('competition-checkbox-error');
  }

  get competitionCheckboxError2() {
    return document.getElementById('competition-checkbox-error2');
  }

  get competitionCheckboxError3() {
    return document.getElementById('competition-checkbox-error3');
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

  get lifeInputContainer() {
    return document.querySelector('.boomio-life-input-container');
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

  isInputEmpty(input) {
    return !input?.value?.trim();
  }

  /**
   * Check if error element is visible AND has error text
   * @param {HTMLElement} errorElement - The error element to check
   * @returns {boolean} - True if element is visible and has non-empty text content
   */
  hasVisibleText(errorElement) {
    if (!this.isVisible(errorElement)) {
      return false;
    }

    const errorText = errorElement?.innerText?.trim() || errorElement?.textContent?.trim();
    return !!errorText;
  }

  /**
   * Toggle element visibility using display property
   * @param {HTMLElement} element - The element to toggle
   * @param {boolean} show - If true, show element (display: block), if false, hide (display: none)
   */
  toggleElement(element, show) {
    if (!element) return;
    element.style.display = show ? 'block' : 'none';
  }

  /**
   * Show element by setting display to block
   * @param {HTMLElement} element - The element to show
   */
  showElement(element) {
    this.toggleElement(element, true);
  }

  /**
   * Hide element by setting display to none
   * @param {HTMLElement} element - The element to hide
   */
  hideElement(element) {
    this.toggleElement(element, false);
  }

  /**
   * Toggle checkbox checked state by showing/hiding the appropriate image
   * This avoids reloading images by toggling CSS display property instead of changing src
   * @param {HTMLElement} checkboxContainer - The checkbox container element
   * @param {boolean} isChecked - If true, show checked image, if false, show unchecked image
   */
  toggleCheckbox(checkboxContainer, isChecked) {
    if (!checkboxContainer) return;

    const checkedImg = checkboxContainer.querySelector('.checkbox-checked');
    const uncheckedImg = checkboxContainer.querySelector('.checkbox-unchecked');

    if (checkedImg && uncheckedImg) {
      checkedImg.style.display = isChecked ? 'block' : 'none';
      uncheckedImg.style.display = isChecked ? 'none' : 'block';
    }
  }

  /**
   * Get checkbox checked state by checking if checked image is visible
   * @param {HTMLElement} checkboxContainer - The checkbox container element
   * @returns {boolean} - True if checkbox is checked (checked image is visible)
   */
  isCheckboxChecked(checkboxContainer) {
    if (!checkboxContainer) return false;
    const checkedImg = checkboxContainer.querySelector('.checkbox-checked');
    return checkedImg?.style.display !== 'none';
  }
}

export const Elements = new HtmlElementsHelper();
