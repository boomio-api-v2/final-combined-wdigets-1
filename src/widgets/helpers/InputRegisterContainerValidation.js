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
    const messages = {
      LT: 'El. pašte yra neteisingų simbolių',
      LV: 'E-pastā ir nederīgas rakstzīmes',
      RU: 'В адресе электронной почты есть недопустимые символы.',
      ET: 'E-posti aadressis on vigaseid sümboleid.',
      EN: '"There are invalid characters in the email address.',
      ES: 'Hay caracteres no válidos en la dirección de correo electrónico.',
      FI: 'Sähköpostiosoitteessa on virheellisiä merkkejä.',
    };
    return messages[this.language] || messages.EN;
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
   * Gets localized error message for checkbox consent
   * @returns {string} - Error message in appropriate language
   */
  getCheckboxErrorMessage() {
    // Customer-specific messages
    if (this.customer === 'Daumantu') {
      return 'Registruojantis, privaloma sutikti gauti "Daumantų" naujienas, kad atiduotume  laimėtą prizą, o pasibaigus Žaidimui siųsime naujienas.';
    }

    if (this.customer === 'Zemaitijos Pienas') {
      return 'Norint tęsti, privaloma sutikti su „Žemaitijos pienas" privatumo politika.';
    }

    if (this.customer === 'Akropolis' && this.language === 'LV') {
      return 'Spēlētājam ir jāpiekrīt spēles noteikumiem un datu apstrādei, lai turpinātu.';
    }

    if (this.customer.includes('Gamtos Ateitis')) {
      return 'Norint tęsti, privaloma sutikti su Gamintojų ir importuotojų asociacijos „Gamtos ateitis"  privatumo politika.';
    }

    if (this.customer === 'Apranga') {
      return 'Norėdami tęsti, privalote sutikti su asmens duomenų tvarkymu tiesioginės rinkodaros tikslu';
    }

    if (this.customer === 'Pigu.lt') {
      const piguMessages = {
        LV: 'Lai turpinātu, ir obligāti jāpiekrīt uzņēmuma privātuma politikai.',
        RU: 'Чтобы продолжить, необходимо согласиться с политикой конфиденциальности компании.',
        ET: 'Jätkamiseks nõustu ettevõtte privaatsuspoliitikaga.',
        FI: 'Jatkaaksesi sinun on hyväksyttävä yrityksen tietosuojakäytäntö.',
      };
      if (piguMessages[this.language]) {
        return piguMessages[this.language];
      }
    }

    // Language-based default messages
    const messages = {
      LV: 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.',
      RU: 'Игрок должен согласиться на обработку данных, чтобы продолжить.',
      ES: 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.',
      FI: 'Jatkaaksesi sinun on hyväksyttävä yrityksen tietosuojakäytäntö.',
      LT: 'Norint tęsti, privaloma sutikti su privatumo politika.',
      ET: 'Et jätkata, peate nõustuma privaatsuspoliitikaga.',
      EN: 'Player must agree to data processing to continue.',
    };

    return messages[this.language] || messages.EN;
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
        errorMessage: this.getCheckboxErrorMessage(),
      };
    }

    // Other customers require at least the first checkbox
    if (!checkboxChange) {
      return {
        isValid: false,
        errorMessage: this.getCheckboxErrorMessage(),
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
    if (Elements.isVisible(Elements.checkbox)) {
      if (!checkboxChange || (this.customer === 'Toni' && !checkboxChange2)) {
        this.toggleValidationError(Elements.competitionCheckboxError, true, this.getCheckboxErrorMessage());
      } else {
        this.toggleValidationError(Elements.competitionCheckboxError, false);
      }
    }

    if (Elements.isVisible(Elements.checkbox2)) {
      this.toggleValidationError(Elements.competitionCheckboxError2, false);
    }

    if (Elements.isVisible(Elements.checkbox3)) {
      this.toggleValidationError(Elements.competitionCheckboxError3, false);
    }

    // Validate name
    if (Elements.isVisible(nameInput)) {
      if (Elements.isInputEmpty(nameInput)) {
        this.toggleValidationError(Elements.nameError, true, this.getEmptyFieldErrorMessage());
      } else {
        this.toggleValidationError(Elements.nameError, false);
      }
    }

    console.log('Validating email and phone inputs...');
    console.log('Customer:', this.customer);
    console.log('Language:', this.language);
    console.log('Email Input Value:', emailInput ? emailInput.value : 'N/A');
    console.log('Phone Input Value:', phoneInput ? phoneInput.value : 'N/A');

    // Validate email
    if (Elements.isVisible(emailInput)) {
      const emailValue = Elements.getEmailValue();
      if (Elements.isInputEmpty(emailInput)) {
        this.toggleValidationError(Elements.emailError, true, this.getEmptyFieldErrorMessage());
      } else if (this.customer === 'Toni' && emailValue?.length < 10) {
        const errorMessage = this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.';
        this.toggleValidationError(Elements.emailError, true, errorMessage);
      } else if (this.customer !== 'Toni' && !this.isValidEmail(emailValue)) {
        this.toggleValidationError(Elements.emailError, true, this.getInvalidEmailMessage());
      } else if (this.containsCyrillic(emailValue)) {
        this.toggleValidationError(Elements.emailError, true, this.getCyrillicEmailMessage());
      } else {
        this.toggleValidationError(Elements.emailError, false);
      }
    }

    // Validate phone
    if (Elements.isVisible(phoneInput)) {
      if (Elements.isInputEmpty(phoneInput)) {
        this.toggleValidationError(Elements.phoneError, true, this.getEmptyFieldErrorMessage());
      } else if (this.customer === 'Toni' && phoneInput?.value?.length < 10) {
        const errorMessage = this.language === 'ES' ? 'Debes ingresar 10 dígitos.' : 'Required to continue.';
        this.toggleValidationError(Elements.phoneError, true, errorMessage);
      } else {
        this.toggleValidationError(Elements.phoneError, false);
      }
    }

    if (
      Elements.hasVisibleText(Elements.nameError) ||
      Elements.hasVisibleText(Elements.emailError) ||
      Elements.hasVisibleText(Elements.phoneError) ||
      Elements.hasVisibleText(Elements.competitionCheckboxError) ||
      Elements.hasVisibleText(Elements.competitionCheckboxError2) ||
      Elements.hasVisibleText(Elements.competitionCheckboxError3)
    ) {
      return false;
    }

    return true;
  }
}

export const InputValidator = new InputRegisterContainerValidation();
