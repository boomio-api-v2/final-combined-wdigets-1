// utils/logger.js
export const logger = {
  log: process.env.NODE_ENV === 'development' ? console.log : () => {},
  error: console.error, // Keep errors
  warn: console.warn,
};
