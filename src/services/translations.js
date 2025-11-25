/**
 * Translation service for multi-language support.
 *
 * IMPORTANT: Always keep language codes sorted alphabetically (EN, ES, ET, FI, LT, LV, RU, etc.)
 * within each translation key to maintain consistency and readability.
 *
 * @param {string} key - Translation key to look up
 * @param {string} lang - Language code (default: 'EN')
 * @returns {string} Translated text or key name as fallback
 */
export function t(key, lang = 'EN') {
  const dict = translations[key];
  if (!dict) return key; // fallback to key name
  //Fallback to English (or first available) if language not found.
  return dict[lang] || dict.EN || Object.values(dict)[0];
}

const translations = {
  copiedMsg: {
    EN: 'Link copied!',
    ET: 'Link kopeeritud!',
    FI: 'Linkki kopioitu!',
    LT: 'Nuoroda nukopijuota!',
    LV: 'Saite nokopēta!',
    RU: 'Ссылка скопирована!',
  },
  close: {
    EN: 'Close',
    ET: 'Sulge',
    FI: 'Sulje',
    LT: 'Uždaryti',
    LV: 'Aizvērt',
    RU: 'Закрыть',
  },
  copy: {
    EN: 'Copy link',
    ET: 'Kopeeri link',
    FI: 'Kopioi linkki',
    LT: 'Kopijuoti nuorodą',
    LV: 'Kopēt saiti',
    RU: 'Скопировать ссылку',
  },
  shareTitle: {
    EN: 'Try this game!',
    ET: 'Proovi seda mängu!',
    FI: 'Kokeile tätä peliä!',
    LT: 'Išbandyk šį žaidimą!',
    LV: 'Izmēģini šo spēli!',
    RU: 'Попробуй эту игру!',
  },
  shareText: {
    EN: 'Dive into a fun game and win great prizes!',
    ET: 'Sukeldu lõbusasse mängu ja võida vahvaid auhindu!',
    FI: 'Sukella hauskaan peliin ja voita mahtavia palkintoja!',
    LT: 'Pasinerk į smagų žaidimą ir laimėk puikių prizų!',
    LV: 'Ienirsti jautrā spēlē un laimē lieliskas balvas!',
    RU: 'Погрузись в увлекательную игру и выиграй классные призы!',
  },
  controlLeftCatch: {
    EN: 'CLICK',
    ES: 'CLIC',
    LT: 'SPUST',
    LV: 'PA KREISI',
    RU: 'НАЛЕВО',
  },
  controlRightCatch: {
    EN: 'CLICK',
    ES: 'CLIC',
    LT: 'SPUST',
    LV: 'PA LABI',
    RU: 'НАПРАВО',
  },
  controlTapDoodle: {
    EN: 'TAP',
    ES: 'CLIC',
    ET: 'TÄPI',
    FI: 'Napautua',
    LT: 'KLIK',
    LV: 'SPIED',
    RU: 'ТЫКАЙ',
  },
  controlDriveSwipeLeft: {
    EN: 'swipe',
    ES: 'DESLIZA',
    ET: 'LIBISTA',
    FI: 'PYYHKÄISE',
    LT: 'Brūkšt',
    LV: 'Pakustini,',
    RU: 'ПРОВЕДИ ',
  },
  controlDriveSwipeRight: {
    EN: 'swipe',
    ES: 'DESLIZA',
    ET: 'LIBISTA',
    FI: 'PYYHKÄISE',
    LT: 'Brūkšt',
    LV: 'lai sāktu',
    RU: 'ПРОВЕДИ ',
  },
};

t.keys = Object.freeze(Object.fromEntries(Object.keys(translations).map((k) => [k, translations[k]])));
