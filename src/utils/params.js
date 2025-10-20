/**
 * params.js
 *
 * Utility functions for safely handling URL query parameters.
 * Provides methods to retrieve single parameters with optional defaults
 * and to fetch all parameters as an object.
 *
 * Example:
 *   import { getParam, getAllParams } from '@/utils';
 *
 *   const campaignUrl = getParam("campaign_url", "https://default.com");
 *   const language = getParam("language", "en");
 *   const userId = getParam("user_id", "guest");
 *
 *   const allParams = getAllParams();
 */

/**
 * Get a single parameter safely
 * @param {string} key - The parameter name
 * @param {any} defaultValue - Value to return if param is missing or invalid
 * @returns {string|null|any}
 */
export function getParam(key, defaultValue = null) {
  const urlParams = new URL(window.location.href).searchParams;
  const value = urlParams.get(key);

  // Handle null, undefined, empty string
  if (value === null || value === undefined || value.trim() === '') {
    return defaultValue;
  }

  return value;
}

/**
 * Get all parameters as an object
 * Filters out null/undefined/empty string unless keepEmpty = true
 * @param {boolean} keepEmpty - If true, keeps empty values
 * @returns {object}
 */
export function getAllParams(keepEmpty = false) {
  const urlParams = new URL(window.location.href).searchParams;
  const params = {};

  for (const [key, value] of urlParams.entries()) {
    if (keepEmpty || (value !== null && value !== undefined && value.trim() !== '')) {
      params[key] = value;
    }
  }

  return params;
}
