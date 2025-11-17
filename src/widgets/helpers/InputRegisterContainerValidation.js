import { localStorageService } from '@/services';
import { Elements } from './HtmlElementsHelper';

/**
 * Validation class for InputRegisterContainer
 * Handles all validation logic for email, phone, and other input fields
 */
class InputRegisterContainerValidation {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name;
    this.language = this.config.language;
  }

  /**
   * Validates email format with enhanced rules
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if valid email format
   */
  isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }

    // Improved email regex: balanced between correctness and performance
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,62}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

    // Prevent consecutive dots anywhere
    if (email.includes('..')) {
      return false;
    }

    return emailRegex.test(email);
  }

  /**
   * Checks if input contains Cyrillic characters
   * @param {string} input - Text to check
   * @returns {boolean} - True if contains Cyrillic
   */
  containsCyrillic(input) {
    if (!input || typeof input !== 'string') {
      return false;
    }
    const cyrillicRegex = /[\u0400-\u04FF]/;
    return cyrillicRegex.test(input);
  }

  /**
   * Validates phone number format
   * @param {string} phone - Phone number to validate
   * @param {number} minLength - Minimum length (default 8)
   * @param {number} maxLength - Maximum length (default 15)
   * @returns {boolean} - True if valid phone format
   */
  isValidPhone(phone, minLength = 8, maxLength = 15) {
    if (!phone || typeof phone !== 'string') {
      return false;
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^[+]?[0-9]+$/;

    return phoneRegex.test(cleanPhone) && cleanPhone.length >= minLength && cleanPhone.length <= maxLength;
  }

  /**
   * Gets localized error message for invalid email format
   * @returns {string} - Error message in appropriate language
   */
  getInvalidEmailMessage() {
    const messages = {
      LT: 'Neteisingas el. pašto formatas.',
      LV: 'Nederīgs e-pasta formāts.',
      RU: 'Неверный формат электронной почты.',
      ET: 'Vale e-posti vorming.',
      EN: 'Invalid email format.',
      ES: 'Formato de correo electrónico no válido.',
      FI: 'Virheellinen sähköpostin muoto.',
    };

    return messages[this.language] || messages.EN;
  }

  /**
   * Gets localized error message for Cyrillic characters in email
   * @returns {string} - Error message in appropriate language
   */
  getCyrillicEmailMessage() {
    if (this.language === 'LV') {
      return 'E-pastā ir nederīgas rakstzīmes';
    }
    return 'El. pašte yra neteisingų simbolių';
  }

  /**
   * Gets localized error message for missing required field
   * @returns {string} - Error message in appropriate language
   */
  getRequiredFieldMessage() {
    const messages = {
      LT: 'Norint tęsti privaloma užpildyti.',
      LV: 'Lai turpinātu, ir jāaizpilda.',
      RU: 'Для продолжения необходимо заполнить.',
      ET: 'Jätkamiseks tuleb täita.',
      EN: 'Required to continue.',
      ES: 'Requerido para continuar.',
      FI: 'Pakollinen jatkaa.',
    };

    return messages[this.language] || messages.EN;
  }

  /**
   * Gets localized error message for checkbox consent
   * @returns {string} - Error message in appropriate language
   */
  getCheckboxErrorMessage() {
    const messages = {
      LT: 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.',
      LV: 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.',
      RU: 'Игрок должен согласиться на обработку данных для продолжения.',
      ET: 'Mängija peab nõustuma andmete töötlemisega, et jätkata.',
      EN: 'Player must agree to data processing to continue.',
      ES: 'El jugador debe aceptar el procesamiento de datos para continuar.',
      FI: 'Pelaajan on hyväksyttävä tietojen käsittely jatkaakseen.',
    };

    return messages[this.language] || messages.EN;
  }

  /**
   * Clears error display for a specific field
   * @param {string} errorElementId - ID of the error element to clear
   */
  clearError(errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.innerText = '';
      errorElement.style.backgroundColor = 'transparent';
    }
  }

  /**
   * Shows error for a specific field
   * @param {string} errorElementId - ID of the error element
   * @param {string} message - Error message to display
   */
  showError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.innerText = message;
      errorElement.style.backgroundColor = '#FFBABA';
    }
  }

  /**
   * Helper function to show or hide validation errors
   * @param {HTMLElement} errorElement - The error element to show/hide
   * @param {boolean} showError - If true, show error with message, if false, hide error
   * @param {string} errorMessage - The error message to display (only used when showError is true)
   */
  toggleValidationError(errorElement, showError, errorMessage = '') {
    if (showError) {
      errorElement.innerText = errorMessage;
      errorElement.style.backgroundColor = '#FFBABA';
      errorElement.style.display = 'block';
    } else {
      errorElement.innerText = '';
      errorElement.style.backgroundColor = 'transparent';
      errorElement.style.display = 'none';
    }
  }

  /**
   * Get localized error message for empty/required fields
   * @returns {string} Localized error message based on current language
   */
  getEmptyFieldErrorMessage() {
    const messages = {
      LV: 'Lai turpinātu, obligāti jāaizpilda.',
      LT: 'Norint tęsti, privaloma užpildyti.',
      ET: 'Jätkamiseks kinnita kõik väljad.',
      FI: 'Vaatitaan jatkamiseen.',
      RU: 'Чтобы продолжить, необходимо заполнить.',
      ES: 'Requerido para continuar.',
      EN: 'Required to continue.',
    };

    return messages[this.language] || messages.EN;
  }

  /**
   * Get customer-specific checkbox error message
   * @param {boolean} checkboxChange2 - State of second checkbox if applicable
   * @returns {string} Customer and language-specific error message
   */
  getCustomerCheckboxErrorMessage(checkboxChange2 = false) {
    // Handle specific customer checkbox requirements
    if (this.customer === 'Gamtos Ateitis') {
      return 'Norint tęsti, privaloma sutikti su Gamintojų ir importuotojų asociacijos „Gamtos ateitis" privatumo politika.';
    }

    if (this.customer === 'Novaturas') {
      const messages = {
        LT: 'Norint tęsti privaloma sutikti su įmonės privatumo politika.',
        LV: 'Lai turpinātu, ir jāpiekrīt uzņēmuma privātuma politikai.',
        RU: 'Чтобы продолжить, необходимо согласиться с политикой конфиденциальности компании.',
        EN: 'To continue, you must agree to the companys privacy policy.',
        ET: 'Jätkamiseks nõustu ettevõtte privaatsuspoliitikaga.',
      };
      return messages[this.language] || messages.EN;
    }

    if (this.customer === 'Toni' && !checkboxChange2) {
      return this.language === 'ES' ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.' : 'Required to continue.';
    }

    return 'Norint tęsti, privaloma sutikti su naujienomis.';
  }

  /**
   * Validates checkbox field
   * @param {boolean} checkboxChange - First checkbox state
   * @param {boolean} checkboxChange2 - Second checkbox state (optional)
   * @returns {Object} { isValid: boolean, errorMessage: string }
   */
  validateCheckbox(checkboxChange, checkboxChange2 = true) {
    // Toni requires both checkboxes
    if (this.customer === 'Toni' && (!checkboxChange || !checkboxChange2)) {
      return {
        isValid: false,
        errorMessage: this.getCustomerCheckboxErrorMessage(checkboxChange2),
      };
    }

    // Other customers require at least the first checkbox
    if (!checkboxChange) {
      return {
        isValid: false,
        errorMessage: this.getCustomerCheckboxErrorMessage(checkboxChange2),
      };
    }

    return { isValid: true, errorMessage: '' };
  }

  /**
   * Validates name field (if visible)
   * @param {HTMLElement} nameInput - Name input element
   * @param {boolean} isVisible - Whether the field is visible
   * @returns {Object} { isValid: boolean, errorMessage: string }
   */
  validateNameField(nameInput, isVisible = true) {
    if (!isVisible || !nameInput) {
      return { isValid: true, errorMessage: '' };
    }

    const value = nameInput.value?.trim();
    if (!value || value === '') {
      return {
        isValid: false,
        errorMessage: this.getEmptyFieldErrorMessage(),
      };
    }

    return { isValid: true, errorMessage: '' };
  }

  /**
   * Validates email field (if visible)
   * @param {HTMLElement} emailInput - Email input element
   * @param {boolean} isVisible - Whether the field is visible
   * @returns {Object} { isValid: boolean, errorMessage: string }
   */
  validateEmailField(emailInput, isVisible = true) {
    if (!isVisible || !emailInput) {
      return { isValid: true, errorMessage: '' };
    }

    const value = emailInput.value?.trim();

    // Empty check
    if (!value || value === '') {
      return {
        isValid: false,
        errorMessage: this.getEmptyFieldErrorMessage(),
      };
    }

    // Toni-specific length validation
    if (this.customer === 'Toni' && value.length < 10) {
      return {
        isValid: false,
        errorMessage: this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.',
      };
    }

    // Email format validation (skip for Toni as it uses phone numbers)
    if (this.customer !== 'Toni' && !this.isValidEmail(value)) {
      return {
        isValid: false,
        errorMessage: this.getInvalidEmailMessage(),
      };
    }

    return { isValid: true, errorMessage: '' };
  }

  /**
   * Validates phone field (if visible)
   * @param {HTMLElement} phoneInput - Phone input element
   * @param {boolean} isVisible - Whether the field is visible
   * @returns {Object} { isValid: boolean, errorMessage: string }
   */
  validatePhoneField(phoneInput, isVisible = true) {
    if (!isVisible || !phoneInput) {
      return { isValid: true, errorMessage: '' };
    }

    const value = phoneInput.value?.trim();

    // Empty check
    if (!value || value === '') {
      return {
        isValid: false,
        errorMessage: this.getEmptyFieldErrorMessage(),
      };
    }

    // Toni-specific length validation
    if (this.customer === 'Toni' && value.length < 10) {
      return {
        isValid: false,
        errorMessage: this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.',
      };
    }

    return { isValid: true, errorMessage: '' };
  }

  /**
   * Validates all registration input fields and manages error display
   * @returns {boolean} - True if all validations pass
   */
  validateRegistrationInputs() {
    const emailInput = Elements.emailInput;
    const nameInput = Elements.nameInput;
    const phoneInput = Elements.phoneInput;

    const checkboxImgChange = document.getElementById('privacyCheckboxImg');
    const checkboxImgChange2 = document.getElementById('privacyCheckboxImg2');
    const checkboxImgChange3 = document.getElementById('privacyCheckboxImg3');

    const checkboxImgSrc = checkboxImgChange.src; // Get the 'src' attribute of the image
    const checkboxImgSrc2 = checkboxImgChange2.src; // Get the 'src' attribute of the image
    const checkboxImgSrc3 = checkboxImgChange3.src; // Get the 'src' attribute of the image

    const checkboxChange = checkboxImgSrc.includes('Uncheck') ? false : true;
    const checkboxChange2 = checkboxImgSrc2.includes('Uncheck') ? false : true;
    const checkboxChange3 = checkboxImgSrc3.includes('Uncheck') ? false : true;

    // Validate checkboxes
    if (!checkboxChange || (this.customer === 'Toni' && !checkboxChange2)) {
      const errorMessage =
        this.customer === 'Gamtos Ateitis'
          ? 'Norint tęsti, privaloma sutikti su Gamintojų ir importuotojų asociacijos „Gamtos ateitis“  privatumo politika.'
          : this.customer === 'Novaturas' && this.language === 'LT'
            ? 'Norint tęsti privaloma sutikti su įmonės privatumo politika.'
            : this.customer === 'Novaturas' && this.language === 'LV'
              ? 'Lai turpinātu, ir jāpiekrīt uzņēmuma privātuma politikai.'
              : this.customer === 'Novaturas' && this.language === 'RU'
                ? 'Чтобы продолжить, необходимо согласиться с политикой конфиденциальности компании.'
                : this.customer === 'Novaturas' && this.language === 'EN'
                  ? 'To continue, you must agree to the companys privacy policy.'
                  : this.customer === 'Novaturas' && this.language === 'ET'
                    ? 'Jätkamiseks nõustu ettevõtte privaatsuspoliitikaga.'
                    : this.language === 'ES'
                      ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.'
                      : 'Norint tęsti, privaloma sutikti su naujienomis.';
      this.toggleValidationError(Elements.competitionCheckboxError, true, errorMessage);
    } else {
      this.toggleValidationError(Elements.competitionCheckboxError, false);
    }

    // Validate name
    if (Elements.isVisible(nameInput) && Elements.isInputEmpty(nameInput)) {
      this.toggleValidationError(Elements.competitionNameError, true, this.getEmptyFieldErrorMessage());
    } else {
      this.toggleValidationError(Elements.competitionNameError, false);
    }

    // Validate email
    if (Elements.isVisible(emailInput) && Elements.isInputEmpty(emailInput)) {
      this.toggleValidationError(Elements.competitionEmailError, true, this.getEmptyFieldErrorMessage());
    } else if (this.customer === 'Toni' && emailInput?.value?.length < 10) {
      const errorMessage = this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.';
      this.toggleValidationError(Elements.competitionEmailError, true, errorMessage);
    } else {
      this.toggleValidationError(Elements.competitionEmailError, false);
    }

    // Validate phone
    if (Elements.isVisible(phoneInput) && Elements.isInputEmpty(phoneInput)) {
      this.toggleValidationError(Elements.competitionPhoneError, true, this.getEmptyFieldErrorMessage());
    } else if (this.customer === 'Toni' && emailInput?.value?.length < 10) {
      const errorMessage = this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.';
      this.toggleValidationError(Elements.competitionPhoneError, true, errorMessage);
    } else {
      this.toggleValidationError(Elements.competitionPhoneError, false);
    }

    if (
      Elements.isVisible(Elements.competitionCheckboxError) ||
      Elements.isVisible(Elements.competitionNameError) ||
      Elements.isVisible(Elements.competitionEmailError) ||
      Elements.isVisible(Elements.competitionPhoneError)
    ) {
      return false;
    }

    return true;
  }
}

export const InputValidator = new InputRegisterContainerValidation();
