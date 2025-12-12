/**
 * Helper function to check if customer uses life-based gameplay
 * @param {string} customer - The customer/business name
 * @returns {boolean} True if customer uses life-based gameplay
 */
export const isLifeCustomer = (customer) => {
  return customer === 'Pigu.lt' || customer === 'Gamtos Ateitis' || customer === 'Orlen' || customer === 'Novaturas' || customer === 'Toni' || customer === 'Boomio' || customer === 'KakeMake';
};

/**
 * Helper function to get brand color based on customer
 * @param {string} customer - The customer/business name
 * @returns {string} Hex color code for the brand
 */
export const getBrandColor = (customer) => {
  if (customer === 'Barbora') return '#CC0001';
  if (customer === 'Ikea') return '#0058A3';
  if (customer === 'Unisend') return '#376728';
  if (customer === 'Pigu.lt') return '#DF503E';
  if (customer === 'Gamtos Ateitis') return '#3F7543';
  if (customer === 'Orlen') return '#EF1C1D';
  if (customer === 'Novaturas') return '#32A1DA';
  if (customer === 'Toni') return '#5E2B17';
  if (customer === 'Boomio') return '#5E2B17';
  if (customer === 'KakeMake') return '#8B3A8B';
  return '#FFE92D'; // Default
};
