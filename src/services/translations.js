export function t(key, lang = 'EN') {
  const dict = translations[key];
  if (!dict) return key; // fallback to key name
  //Fallback to English (or first available) if language not found.
  return dict[lang] || dict.EN || Object.values(dict)[0];
}

const translations = {
  copiedMsg: {
    EN: 'Link copied!',
    LT: 'Nuoroda nukopijuota!',
    LV: 'Saite nokopēta!',
    ET: 'Link kopeeritud!',
    FI: 'Linkki kopioitu!',
    RU: 'Ссылка скопирована!',
  },
  close: {
    EN: 'Close',
    LT: 'Uždaryti',
    LV: 'Aizvērt',
    ET: 'Sulge',
    FI: 'Sulje',
    RU: 'Закрыть',
  },
  copy: {
    EN: 'Copy link',
    LT: 'Kopijuoti nuorodą',
    LV: 'Kopēt saiti',
    ET: 'Kopeeri link',
    FI: 'Kopioi linkki',
    RU: 'Скопировать ссылку',
  },
  shareTitle: {
    EN: 'Try this game!',
    LT: 'Išbandyk šį žaidimą!',
    LV: 'Izmēģini šo spēli!',
    ET: 'Proovi seda mängu!',
    FI: 'Kokeile tätä peliä!',
    RU: 'Попробуй эту игру!',
  },
  shareText: {
    EN: 'Dive into a fun game and win great prizes!',
    LT: 'Pasinerk į smagų žaidimą ir laimėk puikių prizų!',
    LV: 'Ienirsti jautrā spēlē un laimē lieliskas balvas!',
    ET: 'Sukeldu lõbusasse mängu ja võida vahvaid auhindu!',
    FI: 'Sukella hauskaan peliin ja voita mahtavia palkintoja!',
    RU: 'Погрузись в увлекательную игру и выиграй классные призы!',
  },
  controlLeftCatch: {
    EN: 'CLICK',
    LT: 'SPUST',
    LV: 'PA KREISI',
    RU: 'НАЛЕВО',
    ES: 'CLIC',
  },
  controlRightCatch: {
    EN: 'CLICK',
    LT: 'SPUST',
    LV: 'PA LABI',
    RU: 'НАПРАВО',
    ES: 'CLIC',
  },
};

t.keys = Object.freeze(Object.fromEntries(Object.keys(translations).map((k) => [k, translations[k]])));
