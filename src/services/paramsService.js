/**
 * paramService.js
 *
 * A utility for safely handling URL query parameters.
 * Provides methods to retrieve single parameters with optional defaults
 * and to fetch all parameters as an object.
 *
 * Example:
 *   const campaignUrl = paramService.getParam("campaign_url", "https://default.com");
 *   const language = paramService.getParam("language", "en");
 *   const userId = paramService.getParam("user_id", "guest");
 *
 *   const allParams = paramService.getAllParams();
 */
export const paramService = {
  /**
   * Get a single parameter safely
   * @param {string} key - The parameter name
   * @param {any} defaultValue - Value to return if param is missing or invalid
   * @returns {string|null|any}
   */
  getParam(key, defaultValue = null) {
    const urlParams = new URL(window.location.href).searchParams;
    const value = urlParams.get(key);

    // Handle null, undefined, empty string
    if (value === null || value === undefined || value.trim() === '') {
      return defaultValue;
    }

    return value;
  },

  /**
   * Get all parameters as an object
   * Filters out null/undefined/empty string unless keepEmpty = true
   * @param {boolean} keepEmpty - If true, keeps empty values
   * @returns {object}
   */
  getAllParams(keepEmpty = false) {
    const urlParams = new URL(window.location.href).searchParams;
    const params = {};

    for (const [key, value] of urlParams.entries()) {
      if (keepEmpty || (value !== null && value !== undefined && value.trim() !== '')) {
        params[key] = value;
      }
    }

    return params;
  },
};
