import { Elements } from './HtmlElementsHelper';

/**
 * Validation class for InputRegisterContainer
 * Handles all validation logic for email, phone, and other input fields
 */
class InputRegisterContainerValidation {
  constructor(customer, language) {
    this.customer = customer;
    this.language = language;
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
   * Gets localized error message for email already exists
   * @returns {string} - Error message in appropriate language
   */
  getEmailExistsErrorMessage() {
    const messages = {
      ES: 'Este número ya está en uso. Use el mismo número del registro inicial o uno nuevo.',
      LV: 'Šī e-pasta adrese jau eksistē. Izmantojiet citu.',
      RU: 'Этот e-мейл адрес уже существует. Используйте другой.',
      ET: 'See e-posti aadress on juba olemas. Kasutage teist.',
      LT: 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.',
      EN: 'This email is already in use. Use your original or a new email.',
    };
    return messages[this.language] || messages.EN;
  }

  /**
   * Gets localized error message for nickname already exists
   * @returns {string} - Error message in appropriate language
   */
  getNicknameExistsErrorMessage() {
    const messages = {
      ES: 'Este nickname ya está en uso. Use otro nombre.',
      LV: 'Šis segvārds jau pastāv. Izmantojiet citu.',
      RU: 'Этот псевдоним уже существует. Используйте другой.',
      ET: 'See hüüdnimi on juba olemas. Kasutage teist.',
      LT: 'Šis slapyvardis jau egzistuoja. Naudokite kitą.',
      EN: 'This nickname already exists. Please use another one.',
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
    if (this.customer === 'Apranga') {
      return 'Norint tęsti, privaloma sutikti su įmonės privatumo politika.';
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
      EN: 'To continue, you must agree to the privacy policy.',
    };

    return messages[this.language] || messages.EN;
  }

  /**
   * Gets localized error message for checkbox2 consent
   * @returns {string} - Error message in appropriate language
   */
  getCheckboxError2Message() {
    if (this.customer === 'Apranga') {
      return 'Norėdami tęsti, privalote sutikti su žaidimo taisyklėmis.';
    }

    if (this.customer === 'Pigu.lt') {
      const piguMessages = {
        LT: 'Norint tęsti privaloma sutikti su žaidimo taisyklėmis.',
        LV: 'Lai turpinātu, ir obligāti jāpiekrīt spēles noteikumiem.',
        RU: 'Чтобы продолжить, необходимо согласиться с правилами игры.',
        ET: 'Jätkamiseks nõustu mängureeglitega.',
        FI: 'Jatkaaksesi sinun on hyväksyttävä pelisäännöt.',
      };
      if (piguMessages[this.language]) {
        return piguMessages[this.language];
      }
    }

    // Language-based default messages
    const messages = {
      LT: 'Norint tęsti, privaloma sutikti gauti naujienlaiškius.',
      LV: 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.',
      RU: 'Игрок должен согласиться на обработку данных, чтобы продолжить.',
      ET: 'Et jätkata, peate nõustuma uudiskirjade saamisega.',
      FI: 'Jatkaaksesi sinun on hyväksyttävä uutiskirjeiden vastaanottaminen.',
      ES: 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.',
      EN: 'To continue, you must agree to receive newsletters.',
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

    // Check checkbox states using the helper method (checks CSS display property instead of src)
    const checkboxChange = Elements.isCheckboxChecked(Elements.checkbox);
    const checkboxChange2 = Elements.isCheckboxChecked(Elements.checkbox2);
    // checkboxChange3 validation not implemented yet, but keep for future use
    const _checkboxChange3 = Elements.isCheckboxChecked(Elements.checkbox3);

    // Validate checkboxes
    if (Elements.isVisible(Elements.checkbox)) {
      if (!checkboxChange || (this.customer === 'Toni' && !checkboxChange2)) {
        this.toggleValidationError(Elements.competitionCheckboxError, true, this.getCheckboxErrorMessage());
      } else {
        this.toggleValidationError(Elements.competitionCheckboxError, false);
      }
    }

    // Error shows in the same place, so don't show both errors simultaneously
    if (Elements.isVisible(Elements.checkbox2)) {
      if (!checkboxChange2 && !Elements.isVisible(Elements.competitionCheckboxError) && (this.customer === 'Apranga' || this.customer === 'Pigu.lt')) {
        this.toggleValidationError(Elements.competitionCheckboxError2, true, this.getCheckboxError2Message());
      } else {
        this.toggleValidationError(Elements.competitionCheckboxError2, false);
      }
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

    const hasNameError = Elements.hasVisibleText(Elements.nameError);
    const hasEmailError = Elements.hasVisibleText(Elements.emailError);
    const hasPhoneError = Elements.hasVisibleText(Elements.phoneError);
    const hasCheckboxError = Elements.hasVisibleText(Elements.competitionCheckboxError);
    const hasCheckboxError2 = Elements.hasVisibleText(Elements.competitionCheckboxError2);
    const hasCheckboxError3 = Elements.hasVisibleText(Elements.competitionCheckboxError3);

    if (hasNameError || hasEmailError || hasPhoneError || hasCheckboxError || hasCheckboxError2 || hasCheckboxError3) {
      return false;
    }
    return true;
  }
}

export { InputRegisterContainerValidation };
