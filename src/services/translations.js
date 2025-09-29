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
};
