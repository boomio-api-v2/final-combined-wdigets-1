import './styles.css';
import { boomioLogo } from './constants';
import { localStorageService } from '@/services';

const translations = {
  copied: {
    EN: 'Copied!',
    LT: 'Nukopijuota!',
    RU: 'Скопировано!',
    LV: 'Nokopēts!',
    ET: 'Kopeeritud!',
    FI: 'Kopioitu!',
    ES: '¡Copiado!',
  },
  useCode: {
    EN: 'USE THE DISCOUNT',
    LT: 'PANAUDOK KODĄ',
    RU: 'ИСПОЛЬЗОВАТЬ КОД',
    LV: 'IZMANTOT ATLAIŽU KODU',
    ET: 'KASUTA SOODUSKOODI',
    FI: 'KÄYTÄ KOODIA',
    ES: 'USA EL DESCUENTO',
  },
};

//Should be used everywhere (really everywhere)
export class CompetitionScoreTableContainer {
  constructor(customer, scoreTable) {
    this.customer = customer;
    this.scoreTable = scoreTable;
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null; // Store container reference
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language;
    this.render();
  }

  getBrandColor(customer) {
    return customer === 'Toni' ? '#10069F' : 'rgba(61, 73, 40, 1)';
  }

  getBonus(score) {
    if (score >= 6000) return 25;
    if (score >= 4000) return 20;
    if (score >= 2000) return 15;
    if (score >= 500) return 10;
    return 0;
  }

  getDiscountCode(score) {
    if (score >= 6000) return '25GAME1225';
    if (score >= 4000) return '20GAME1225';
    if (score >= 2000) return '15GAME1225';
    if (score >= 500) return '10GAME1225';
    return '';
  }

  getPrizeUrl(customer, language, score) {
    if (customer !== 'Pigu.lt') return '';
    let page = null;
    if (score >= 6000) page = '25game';
    else if (score >= 4000) page = '20game';
    else if (score >= 2000) page = '15game';
    else if (score >= 500) page = '10game';
    if (!page) return '';
    const urls = {
      LT: `https://pigu.lt/lt/puslapis/${page}`,
      LV: `https://220.lv/lv/lapaspuse/${page}`,
      ET: `https://kaup24.ee/et/lehekulg/${page}`,
      FI: `https://hobbyhall.fi/fi/sivu/${page}`,
      EN: `https://pigu.lt/lt/puslapis/${page}`,
      RU: `https://pigu.lt/lt/puslapis/${page}`,
    };
    return urls[language] || urls.LT;
  }

  updatePrizeLink(score, language) {
    const prizeAnchor = this.containerDiv?.querySelector('#boomio-prize-link');
    const prizeContainer = this.containerDiv?.querySelector('#boomio-prize-link-container');
    if (!prizeAnchor || !prizeContainer) return;
    const url = this.getPrizeUrl(this.customer, language, score);
    if (url) {
      prizeAnchor.setAttribute('href', url);
      prizeAnchor.setAttribute('target', '_blank');
      prizeAnchor.setAttribute('rel', 'noopener noreferrer');
      prizeAnchor.style.pointerEvents = 'auto';
      prizeAnchor.style.opacity = '1';
      prizeContainer.style.display = 'flex';
    } else {
      prizeAnchor.removeAttribute('href');
      prizeAnchor.removeAttribute('target');
      prizeAnchor.removeAttribute('rel');
      prizeAnchor.style.pointerEvents = 'none';
      prizeAnchor.style.opacity = '0.6';
      prizeContainer.style.display = 'none';
    }
  }

  updateProps(customer, scoreTable) {
    this.customer = customer;
    this.scoreTable = scoreTable;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    const scoreboard = this.customer.includes('Gamtos Ateitis') || this.customer === 'Nykstukas' ? this.scoreTable?.teams_scoreboard : this.scoreTable?.scoreboard || [];
    const userBestPlace = Number(this.customer.includes('Gamtos Ateitis') || this.customer === 'Nykstukas' ? this.scoreTable.team_best_place : this.scoreTable?.user_best_place) || 0;
    const userBestScore = Number(this.scoreTable?.user_best_score) || 0;
    this.userParticipationDays = this.scoreTable?.participation_days ?? 0; // nullish-coalescing

    const userId = this.config.userId;
    this.couponCodeNew = this.customer.includes('demo') ? 'discountcode' : 'boomio';
    const perlasGoTable = [
      'PERLIUKAS',
      'TAUPUOLIS',
      'ENERGINGAS',
      'GO LAIMA',
      'SKAITLIUKAS',
      'PILKASIS ŠEŠĖLIS',
      'PERLO MEDŽIOTOJAS',
      'ABRIKOSAS',
      'PERLASGOSTA',
      'UGIS',
      'ŽAIDĖJA',
      'ZORO',
      'PERLŲ DAMA',
      'EMILIUX',
      'VĖJO DRUMSTĖJAS',
      'RORO',
      'HARIS POTERIS',
      'VAIVORYKŠTĖ',
      'VALDELIS',
      'PERLAS PATS SAU',
      'LAIMĖTOJAS',
      'VALDOVAS',
      'AUKSO PERLAS',
      'NEWYORKE',
      'LAIMĖS BROLIS',
      'MISTY',
      'SĖKMĖS VILNIETIS',
      'GO VALDOVAS',
      'KLIK KLIK GO',
    ];

    const hiddenNicknames = [
      'Linksmuoliai',
      'Šypsenėlės',
      'Mėnulio Spinduliai',
      'Draugų Duetas',
      'Žaidimo Žvaigždės',
      'Saulės Vaikai',
      'Smagumėliai',
      'Žiežirbos',
      'Vafliniai',
      'Žaidimų Broliai',
      'Spalvoti Žingsniai',
      'Du Smalsučiai',
      'Švelnieji',
      'Lobių Medžiotojai',
      'Saulėti Draugai',
      'Gudručiai',
      'Keksiukų Komanda',
      'Braškių Duetas',
      'Spalvų Pora',
      'Vėjo Skrajūnai',
      'Linksmos Kojytės',
      'Mielieji',
      'Obuoliukai',
      'Dūzgiantys Bitukai',
      'Mažieji Tyrinėtojai',
      'Varlyčių Būrys',
      'Šokliukai',
      'Spalvoti Lašiukai',
      'Šviesos Kibirkštys',
      'Saldainiukai',
      'Kukurūzų Duetas',
      'Pupuliukai',
      'Draugiški Žingsniai',
      'Snaigių Porėlė',
      'Burbuliniai',
      'Mėlyni Draugai',
      'Laimės Žingsneliai',
      'Sūrio Ratukai',
      'Džiaugsmo Gaudytojai',
      'Vandenyno Žvaigždės',
      'Skambūs Lašeliai',
      'Gėlių Porėlė',
      'Švelnūs Pūkučiai',
      'Džiaugsmo Lašeliai',
      'Mėnulio Linksmuoliai',
      'Žaidimų Kibirkštys',
      'Linksmučiai',
      'Vaivorykštės Žingsniai',
      'Skrajūnai',
      'Mielieji Duetas',
      'Draugiškieji',
      'Žemuoginiai',
      'Spalvų Spindesys',
      'Meškiukų Komanda',
      'Mandarininiai',
      'Skruzdėlyčių Draugija',
      'Maži Stebuklai',
      'Riešutukai',
      'Saulės Kibirkštėlės',
      'Džiaugsmo Tandemas',
      'Draugystės Džiaugsmas',
      'Debesėlių Komanda',
      'Nuotykių Porininkai',
      'Burbuliukai',
      'Nykštukų Klubas',
      'Kakavos Pora',
      'Keliaujantys Šypsenukai',
      'Skanuoliai',
      'Draugystės Tiltas',
      'Vasaros Džiaugsmai',
      'Skraidantys Obuoliukai',
      'Purienų Pora',
      'Balandėlių Būrelis',
      'Linksmieji Spalviukai',
      'Saldi Draugystė',
      'Draugiški Nuotykiai',
      'Kukuliukai',
      'Žvaigždžių Pėdutės',
      'Minkštučių Duetas',
      'Mėnulio Meškučiai',
      'Braškių Komanda',
      'Spalvų Komanda',
      'Džiaugsmo Žaidėjai',
      'Draugiški Laimėtojai',
      'Žaismingi Linksmuoliai',
      'Debesėlių Porininkai',
      'Vaivorykštės Nuotaika',
      'Ledinukai',
      'Šypsenų Kolekcionieriai',
      'Žaidimų Draugystė',
      'Kakaviniai Draugai',
      'Mažieji Skrajūnai',
      'Linksmučiai Draugai',
      'Žaidimų Laimės Pora',
      'Pūkų Komanda',
      'Riešutėlių Porininkai',
      'Žvaigždutės Kelyje',
      'Pasakų Pora',
      'Mėlyni Spinduliai',
      'Žaidimų Bičiuliai',
      'Kakaviniai',
      'Velykiniai Varpeliai',
      'Vaikystės Komanda',
      'Spalvų Pasaka',
      'Gėlių Duetas',
      'Mūsų Draugystė',
      'Spalvoti Šypsniukai',
      'Pavasario Lašeliai',
      'Obuoliukų Džiaugsmas',
      'Draugiški Dvyniai',
    ];

    const ltNicknames = [
      'MAGIŠKAS',
      'ŽAIDĖJAS',
      'GRETAA',
      'BLASH',
      'BULKIN',
      'PILKASIS ŠEŠĖLIS',
      'GIEDRIUZAS',
      'ABRIKOSAS',
      'SKANUTĖ',
      'UGIS',
      'MIS LIETUVA',
      'ZORO',
      'SŪRELIS',
      'EMILIUX',
      'VĖJO DRUMSTĖJAS',
      'RORO',
      'HARIS POTERIS',
      'VAIVORYKŠTĖ',
      'VALDELIS',
      'ŠOKLIUKĖ',
      'FANTAZUOTOJAS',
      'VALDOVAS',
      'PEMPĖ',
      'NEWYORKE',
      'VORIUKAS',
      'MISTY',
      'PIENIŠKAS',
      'BLAZING BILL',
    ];

    const enNicknames = [
      'James',
      'Bubbles',
      'Blaze',
      'Tofu',
      'Vex',
      'Peaches',
      'Emma',
      'Snug Bug',
      'Michael',
      'Mochi',
      'Nova',
      'Kiwi Pop',
      'Jinx',
      'Niblet',
      'Olivia',
      'Cookie',
      'William',
      'Waffles',
      'Echo',
      'Zoomie',
      'Rogue',
      'Apex',
      'Sophia',
      'Ava',
      'Benjamin',
      'Vanta',
      'Luna',
      'Glitch',
      'Chill',
      'Ghost',
      'Frost',
      'Titan',
      'Mia',
      'Storm',
      'Daniel',
      'Saber',
      'David',
      'Mute',
      'Isabella',
      'Vibe',
      'Charlotte',
      'Zane',
      'Matthew',
      'Drift',
      'Amelia',
      'Pixel',
      'Jacob',
      'Fang',
      'Nox',
      'Emily',
      'Grace',
      'Ethan',
    ];

    const esNicknames = [
      'Mateo',
      'Luna',
      'Coco',
      'Leo',
      'Nube',
      'Sombra',
      'Sofi',
      'Pelusa',
      'Carlos',
      'Chispa',
      'Nova',
      'Kiwi',
      'Zorro',
      'Tito',
      'Olivia',
      'Galleta',
      'Andrés',
      'Waffles',
      'Eco',
      'Trueno',
      'Fénix',
      'Aitana',
      'Vega',
      'Benjamín',
      'Luz',
      'Estrella',
      'Glitch',
      'Frío',
      'Fantasma',
      'Lobo',
      'Valentina',
      'Tormenta',
      'Diego',
      'Sable',
      'David',
      'Silencio',
      'Isabela',
      'Ritmo',
      'Clara',
      'Axel',
      'Martín',
      'Deriva',
      'Amelia',
      'Píxel',
      'Hugo',
      'Colmillo',
      'Nox',
      'Lucía',
      'Paz',
      'Thiago',
    ];

    const lvNicknames = [
      'Jānis',
      'Anna',
      'Artūrs',
      'Kristīne',
      'Elīna',
      'Rihards',
      'Edgars',
      'Laura',
      'Kārlis',
      'Alise',
      'Kristaps',
      'Līga',
      'Roberts',
      'Dāvis',
      'Marta',
      'Ieva',
      'Linda',
      'Anete',
      'Andris',
      'Sanita',
      'Toms',
      'Dārta',
      'Mārtiņš',
      'Madara',
      'Reinis',
      'Emīls',
      'Agnese',
      'Ralfs',
      'Inese',
      'Sandis',
    ];

    const eeNicknames = [
      'VÕLUR',
      'MÄNGUMEES',
      'KATIKE',
      'TORMILIND',
      'PÄKAPIKK',
      'KARVANE KARU',
      'NUNNUKAS',
      'ÕUNAPUU',
      'VÄLE JÄNES',
      'HUNT KRIIMSILM',
      'LUMEKUNINGANNA',
      'RÕÕMUKILD',
      'SALASEPPA',
      'UNISTAJA',
      'TULEPOISS',
      'SIILIKE',
      'VIKERKAAR',
      'ULLIKE',
      'MÕMMIK',
      'TUULELAPS',
      'RAKETIPOISS',
      'KIISUMIISU',
      'KUKUKE',
      'KÄGU',
      'KASSIKE',
      'TRIKIMEES',
      'PIIMAVUNT',
      'TONTLIK TIMO',
      'LENDUR LAURI',
      'KOHVIHUNT',
      'MAGUS MARI',
      'KULDNE KÄSI',
      'LUSTIPALL',
      'SALAJANE SASS',
      'ÖÖLIBLIKAS',
      'NAERUPALL',
      'METSAHUNT',
      'VÄIKE VAPPER',
      'KONNATIBU',
      'ŠOKOLAADIPOISS',
      'SEIKLEJA',
      'SÄDELEV SASSU',
      'HAMBURGER',
      'KRÕPS',
      'SÜGAV MÕTE',
      'KALAMEES',
      'ÄIKESEPILV',
      'TEADLASEKE',
      'TANTSULÕVI',
      'TARKUR',
    ];

    let tableHTML = '';
    scoreboard?.forEach((item, index) => {
      const background = index + 1 === userBestPlace ? 'rgba(255, 255, 255, 1)' : 'none';

      const color = index + 1 === userBestPlace ? this.getBrandColor(this.customer) : 'white';
      const boxShadow = index + 1 === userBestPlace ? '2px 4px 3.4px 0px rgba(0, 0, 0, 0.10) inset' : 'none';

      tableHTML += `
            <tr style="background: ${background};box-shadow:${boxShadow};margin: 0;height:44px ">
            <td style="padding-left:8px;text-align:start;width: 25px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
              item.place
            }</td>
      <td style="padding-left:6px;text-align:start;width: 100px; color: ${color}; border: none;font-size: 16px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word;">
      ${
        !this.customer.includes('Gamtos Ateitis')
          ? userBestPlace === index + 1
            ? this.customer === 'Elesen'
              ? scoreboard[index].user_nickname
              : this.getYourScoreText()
            : this.customer === 'Perlas GO'
              ? perlasGoTable[index]
              : this.customer === 'Nykstukas'
                ? hiddenNicknames[index]
                : this.customer === 'Elesen'
                  ? scoreboard[index].user_nickname
                  : this.language === 'LV'
                    ? lvNicknames[index]
                    : this.language === 'ET'
                      ? eeNicknames[index]
                      : this.language === 'ES'
                        ? esNicknames[index]
                        : this.language === 'LT'
                          ? ltNicknames[index]
                          : enNicknames[index]
          : this.customer.includes('Gamtos Ateitis')
            ? 'MOKYKLA ' + (index + 1)
            : scoreboard[index].team
      }
    </td>
              <td style="width: 48px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;padding-right:10px;">${
                item.score
              }</td>
            </tr>`;
    });

    if (userBestPlace > (this.customer.includes('Gamtos Ateitis') || this.customer === 'Nykstukas' ? 100 : 20)) {
      tableHTML += `
            <tr style="background: rgba(255, 255, 255, 1);box-shadow:none;margin: 0;height:44px ">
            <td style="padding-left:8px;text-align:start;width: 25px; color: ${this.getBrandColor(this.customer)}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${userBestPlace}</td>

              <td style="padding-left:6px;text-align:start;width: 100px; color: ${this.getBrandColor(this.customer)}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
                !this.customer.includes('Gamtos Ateitis')
                  ? this.customer === 'Nykstukas'
                    ? 'Tavo komandos rezultatas'
                    : this.language === 'EN'
                      ? 'Your score'
                      : this.language === 'LV'
                        ? 'Tavs rezultāts'
                        : this.language === 'ET'
                          ? 'Sinu tulemus'
                          : this.language === 'ES'
                            ? 'Tu resultado'
                            : 'Tavo rezultatas'
                  : scoreboard[userBestPlace].team
              }</td>
              <td style="width: 48px; color: ${this.getBrandColor(this.customer)}; border: none;font-size: 16px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;padding-right:10px;">${userBestScore}</td>
            </tr>`;
    }

    let textColor = 'white';
    let fontSize = '14px';
    let fontWeight = this.customer.includes('Gamtos Ateitis') || this.customer === 'Pieno Žvaigždės' ? '900' : '700';
    let scoreboardText = `
      ${
        (this.customer === 'Fantazijos' && this.scoreTable.user_best_score > 500) ||
        (this.customer === 'Makalius' && this.scoreTable?.user_best_place < 500) ||
        (this.customer === 'Pieno Žvaigždės' && this.scoreTable?.user_best_place < 25) ||
        (this.customer === 'Akropolis' && this.scoreTable?.user_best_place < 2025) ||
        (this.customer === 'Vilvi' && this.scoreTable?.user_best_place <= 10) ||
        (this.customer === 'Perlas GO' && !userId) ||
        (this.customer.includes('Gamtos Ateitis') && this.scoreTable?.team_best_place < 10) ||
        (this.customer === 'Zemaitijos Pienas' && this.scoreTable?.user_best_place <= 3) ||
        (this.customer === 'Nevezis' && this.scoreTable?.user_best_place <= 10) ||
        (this.customer === 'Daumantu' && this.scoreTable?.user_best_place <= 50) ||
        (this.customer === 'Magija' && this.scoreTable?.user_best_place <= 3) ||
        (this.customer === 'Nykstukas' && this.scoreTable.user_best_score > 200) ||
        (this.customer === 'Orlen' && this.scoreTable.user_best_place > 1000) ||
        (this.customer === 'Novaturas' && this.scoreTable.user_best_place > 30) ||
        (this.customer === 'Pigu.lt' && this.scoreTable.user_best_score >= 500) ||
        (this.customer === 'Apranga' && this.scoreTable.user_best_place <= 100) ||
        (this.customer === 'Elesen' && this.scoreTable.user_best_place <= 10) ||
        (this.customer === 'Boomio' && this.scoreTable.user_best_score >= 0) ||
        (this.customer === 'KakeMake' && this.scoreTable.user_best_score >= 0) ||
        (this.language === 'EN' && this.customer.includes('demo'))
          ? `<div id="boomio-title-win" style="width:100%; top: ${
              this.customer === 'Pigu.lt' ? '410px' : this.customer === 'Akropolis' ? '400px' : '420px'
            }; position: absolute; text-align: center; color: ${textColor}; font-size: ${
              this.customer === 'Barbora' || this.customer === 'Pigu.lt' ? '16px' : fontSize
            }; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: ${this.customer === 'Nykstukas' ? 'none' : 'uppercase'}; word-wrap: break-word">${
              this.customer === 'Pigu.lt' && this.language === 'RU'
                ? 'ПОЗДРАВЛЯЕМ!'
                : this.customer === 'Pigu.lt' && this.language === 'FI'
                  ? 'ONNITTELUT!'
                  : this.customer === 'Pigu.lt' && this.language === 'LV'
                    ? 'APSVEICAM!'
                    : this.customer === 'Pigu.lt' && this.language === 'LT'
                      ? 'SVEIKINAME!'
                      : this.customer === 'Pigu.lt' && this.language === 'EN'
                        ? 'CONGRATULATIONS!'
                        : this.customer === 'Pigu.lt' && this.language === 'ET'
                          ? 'PALJU ÕNNE!'
                          : this.customer === 'Barbora'
                            ? 'DOVANA tau!'
                            : this.customer === 'Unisend' && this.language === 'LV'
                              ? 'TEV VEICAS LIELISKI!'
                              : this.customer === 'Akropolis' && this.language === 'LV'
                                ? 'TEV VEICĀS LIELISKI!'
                                : this.customer === 'Akropolis' && this.language === 'RU'
                                  ? 'ТЫ СПРАВИЛСЯ ОТЛИЧНО!'
                                  : this.customer === 'Elesen' && this.language === 'LT'
                                    ? 'NUOSTABU, JUMS PUIKIAI SEKASI!'
                                    : this.customer === 'Elesen' && this.language === 'LV'
                                      ? 'APSVEICU, JUMS KLĀJAS LIELISKI!'
                                      : this.customer === 'Elesen' && this.language === 'ET'
                                        ? 'PALJU ÕNNE, SA TEGED VÄGA HÄSTI!'
                                        : this.customer === 'Eurovaistine'
                                          ? 'TEV VEICAS LIELISKI!'
                                          : this.language === 'LV'
                                            ? 'Atzīmējiet karstāko vasaru'
                                            : this.language === 'RU'
                                              ? 'Отпразднуйте самый жаркий месяц лета'
                                              : this.customer === 'Unisend' && this.language === 'ET'
                                                ? 'SUL LÄHEB HÄSTI!'
                                                : this.language === 'ET'
                                                  ? 'Tähistage suve kuumimat kuud ja võitke'
                                                  : this.customer === 'Fantazijos'
                                                    ? '2024.06.09 ŠVENČIANT NACIONALINĘ 69 DIENĄ'
                                                    : this.language === 'EN'
                                                      ? 'CONGRATULATIONS!'
                                                      : this.customer === 'Nykstukas'
                                                        ? 'SVEIKINAME! Pretenduoji laimėti šios savaitės prizą'
                                                        : this.customer === 'Novaturas' && this.language === 'LT'
                                                          ? 'VALIO, TAU PUIKIAI SEKASI!'
                                                          : this.customer === 'Novaturas' && this.language === 'LV'
                                                            ? 'APSVEICAM, TEV LIELISKI IZDODAS!'
                                                            : this.customer === 'Novaturas' && this.language === 'ET'
                                                              ? 'PALJU ÕNNE, SUL LÄHEB HÄSTI!'
                                                              : this.customer === 'Novaturas' && this.language === 'EN'
                                                                ? 'CONGRATULATIONS, YOU RE DOING GREAT!'
                                                                : this.customer === 'Novaturas' && this.language === 'RU'
                                                                  ? 'ПОЗДРАВЛЯЕМ, У ВАС ОТЛИЧНО ПОЛУЧАЕТСЯ!'
                                                                  : this.customer === 'Apranga'
                                                                    ? 'NUOSTABU, JUMS PUIKIAI SEKASI!'
                                                                    : this.language === 'LT'
                                                                      ? 'Valio, tau puikiai sekasi!'
                                                                      : 'Hooray, you’re doing great!'
            }</div>

      ${
        this.customer === 'Nykstukas'
          ? `<div style="font-family: Montserrat;padding-left:4px;padding-right:4px;position:absolute;top:463px;width:calc(100% - 10px);margin-left:5px;background-color:#45A9D7;color:white;font-size: ${fontSize};font-weight: ${fontWeight}; ">10 Eur Wolt kuponus.</div>`
          : ''
      }
            <div id="boomio-text-win" style="width:calc(100% - 20px);margin-left:10px; top: ${
              this.customer === 'Nykstukas' ? '490px' : '440px'
            };line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size:${
              this.customer === 'Nykstukas' || this.customer === 'Pigu.lt' ? '14px' : '10px'
            } ; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${
              this.customer === 'Pigu.lt' && this.language === 'RU'
                ? `Дополнительно -${this.getBonus(this.scoreTable?.user_best_score)}% на выбранные товары в приложении с кодом`
                : this.customer === 'Pigu.lt' && this.language === 'FI'
                  ? `${this.getBonus(this.scoreTable?.user_best_score)}% alennus valikoiduista tuotteista sovelluksessa koodilla*`
                  : this.customer === 'Pigu.lt' && this.language === 'LV'
                    ? `Papildu -${this.getBonus(this.scoreTable?.user_best_score)}% izvēlētām precēm lietotnē ar kodu*`
                    : this.customer === 'Pigu.lt' && this.language === 'LT'
                      ? `Papildomai -${this.getBonus(this.scoreTable?.user_best_score)}% atrinktoms prekėms programėlėje su kodu`
                      : this.customer === 'Pigu.lt' && this.language === 'EN'
                        ? `-${this.getBonus(this.scoreTable?.user_best_score)}% off selected items when purchasing on app* with code`
                        : this.customer === 'Pigu.lt' && this.language === 'ET'
                          ? `-${this.getBonus(this.scoreTable?.user_best_score)}% lisaale valitud toodetelt äpis koodiga*`
                          : this.customer === 'Barbora'
                            ? 'Pirk <a style="color:white" target="_blank" href="https://www.barbora.lt/">Barbora.lt</a>, nuolaidos kodo laukelyje vesk <b style="font-weight:900;font-size:18px;background-color:#FFC727;"> &apos;GIMTADIENIS&apos;</b> ir gauk dovanų!'
                            : this.customer === 'Pieno Žvaigždės'
                              ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį</br> fondą sudaro Forum Cinemas bilietai <u style="text-transform:lowercase">IR </br>pagrindiniai <u style="text-transform:uppercase">MIAU PRIZAI  </u></u>- Su Miau gyvent linksmiau!'
                              : this.customer === 'Unisend' && this.language === 'LV'
                                ? '100 spēlētāji ar visvairāk punktiem saņems balvas. Izloze 31. </br> oktobris! Uzvarētāji tiks informēti e-pastā.'
                                : this.language === 'LV' && this.customer === 'Fantazijos'
                                  ? 'Un laimējiet līdz 30 balvām!</br> Par laimestu informēsim e-pastā.'
                                  : this.language === 'RU' && this.customer === 'Fantazijos'
                                    ? 'и выиграйте до 30 призов! Уведомление о выигрыше </br>придет на вашу электронную почту.'
                                    : this.customer === 'Akropolis' && this.language === 'LT'
                                      ? 'Žaisk ir kasdien laimėk vieną CAIF CAFE kavos puodelį, o</br>atsiėmęs prizą turėk galimybę laimėti 100 EUR AKROPOLIO </br>dovanų kortelę!'
                                      : this.customer === 'Akropolis' && this.language === 'LV'
                                        ? 'Ja saglabāsi savu pozīciju 2000 rezultatīvāko spēlētāju sarakstā, tu saņemsi balvu no Narvesen, un pēc balvas izņemšanas - automātiski piedalīsies dienas izlozē par AKROPOLE dāvanu karti 100 EUR vērtībā. Tev ir iespēja uzlabot savu rezultātu, spēlējot vēlreiz!'
                                        : this.customer === 'Akropolis' && this.language === 'RU'
                                          ? 'Если вы сохраните своё место в списке 2000 лучших игроков, вы получите приз от Narvesen, а после получения приза автоматически примете участие в ежедневном розыгрыше подарочной карты AKROPOLE на 100 евро. У вас есть возможность улучшить свой результат, сыграв снова!'
                                          : this.customer === 'Daumantu'
                                            ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei.</br> Prizinį fondą sudaro 50 Daumantų prizų!'
                                            : this.customer.includes('Gamtos Ateitis')
                                              ? 'Geriausius rezultatus pasiekusios mokyklos pateks į kitą etapą ir varžysis dėl koncerto savo mokykloje! Kas savaitę iškrenta dvi mažiausiai taškų surinkusios mokyklos. Jei tavo mokykla pateks į kitą etapą, pranešime el. paštu, kurį nurodei.'
                                              : this.customer === 'Unisend' && this.language === 'ET'
                                                ? 'Koguni 100 enim punkte kogunud mängijat </br> võidavad 31. oktoober auhindu!'
                                                : this.language === 'ET' && this.customer === 'Fantazijos'
                                                  ? 'kuni 30 auhinda oma sensuaalseteks naudinguteks.</br> Võitjaid teavitatakse nendemääratud e-posti teel.'
                                                  : this.customer === 'Fantazijos'
                                                    ? 'net 69 geriausi žaidėjai laimės prizus! </br>Apie laimėjimą sužinosi savo nurodytu el. paštu.'
                                                    : this.customer === 'LemonFeel'
                                                      ? `Uzlabo savu rezultātu un cīnies par balvu, ko iegūs labākais spēlētājs LEMON FEEL noslēguma pasākumā – 28. augustā!</br> ${
                                                          this.userParticipationDays >= 3
                                                            ? `${this.userParticipationDays} DIENAS SUPER!`
                                                            : this.userParticipationDays === 1
                                                              ? `${this.userParticipationDays} DIENA`
                                                              : `${this.userParticipationDays} DIENAS`
                                                        } `
                                                      : this.customer === 'Makalius'
                                                        ? 'Apie laimėjimą sužinosi savo nurodytu el. paštu liepos 1 d. </br> Prizinį fondą sudaro net 500 kuponų po 20 €, 50 €'
                                                        : this.customer === 'Vilvi'
                                                          ? 'Net 10 geriausių žaidėjų xx dieną laimės VILVI prizus! </br> Jei laimėsi informuosime tavo nurodytu el. paštu.'
                                                          : this.customer === 'Perlas GO'
                                                            ? `Kiekvieną savaitę 20 geriausių „Perlas Go“ žaidėjų, užsiregistravusių </br> programėlėje ar savitarnos svetainėje laimi po 10 € „Wolt“ kuponą!</br> Jei laimėsi, informuosime tave registracijos metu nurodytu el. paštu.`
                                                            : this.customer === 'Zemaitijos Pienas' && this.language === 'LT'
                                                              ? 'Pagerink rezultatą, nes geriausi 5 žaidėjai laimės sportinio rankšluosčio</br> ir gertuvės rinkinį, arba dėžutę PROTEIN M varškės sūrelių'
                                                              : this.customer === 'Zemaitijos Pienas' && this.language === 'LV'
                                                                ? 'Uzlabojiet savu rezultātu, jo labākie 5 spēlētāji laimēs sporta dvieli</br> un ūdens pudeles komplektu, vai PROTEIN M biezpiena sieriņu kastīti'
                                                                : this.customer === 'Zemaitijos Pienas' && this.language === 'ET'
                                                                  ? 'Paranda oma tulemust, sest parimad 5 mängijat võidavad sporditooted</br> ja joogipudeli komplekti või PROTEIN M kohupiima juustu karbi'
                                                                  : this.customer === 'Nykstukas'
                                                                    ? 'Geriausi žaidėjai gali laimėti bilietus į Post Malone koncertą! Laimėtojus informuosime el. paštu. Prizus dovanoja Nykštukas!'
                                                                    : this.customer === 'Nevezis'
                                                                      ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį </br>fondą sudaro „oho!” prizai!'
                                                                      : this.customer === 'Magija'
                                                                        ? 'Kas savaitę 3 daugiausia taškų surinkę žaidėjai laimės „Magija“  prizus! Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. '
                                                                        : this.customer === 'Orlen'
                                                                          ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį fondą sudaro net 1 000 ledų kas savaitę! Dydisis prizas - skrydis oro balionu!'
                                                                          : this.customer === 'Novaturas' && this.language === 'LT'
                                                                            ? 'Pagerink savo rezultatą – rugsėjo pabaigoje net 30 geriausių žaidėjų laimės po 100 € vertės „Novaturas“ kuponą! Jei būsi tarp laimėtojų, apie tai pranešime Tavo nurodytu el. paštu.'
                                                                            : this.customer === 'Novaturas' && this.language === 'LV'
                                                                              ? 'Tev ir iespēja uzlabot savu rezultātu, jo 30 labākie rezultātu saņēmēji laimēs 100 EUR Novatours atlaižu kuponu. Ja laimēsi balvu, mēs Tevi informēsim pa e-pastu, kuru norādīji.'
                                                                              : this.customer === 'Novaturas' && this.language === 'ET'
                                                                                ? 'Sul on võimalus oma tulemust parandada! 30 parimat mängijat võidavad 100 eurose Novatoursi sooduskupongi. Kui oled nende seas, teavitame Sind e-maili teel.'
                                                                                : this.customer === 'Novaturas' && this.language === 'EN'
                                                                                  ? ' Improve your score, because at the end of the month, 30 players with the best results will win a 100 EUR Novaturas voucher. If you have won a prize, we will inform you via the email address you provided.'
                                                                                  : this.customer === 'Novaturas' && this.language === 'RU'
                                                                                    ? 'Улучши свой результат, ведь в конце месяца 30 лучших игроков получат подарочную карту Novatours на 100€. Если выиграешь приз, мы сообщим об этом на указанный тобой адрес электронной почты.'
                                                                                    : this.customer === 'Apranga'
                                                                                      ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                      : this.customer === 'Elesen' && this.language === 'LT'
                                                                                        ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                        : this.customer === 'Elesen' && this.language === 'LV'
                                                                                          ? 'Ja laimēsi balvu, mēs Tevi informēsim uz e-pastu, kuru norādīji.'
                                                                                          : this.customer === 'Elesen' && this.language === 'ET'
                                                                                            ? 'Kui võidad mõne auhinna, anname sellest teada sinu esitatud e-posti aadressile.'
                                                                                            : this.language === 'LT'
                                                                                              ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                              : 'If you win a prize, we will inform you by the email address you provided.'
            }</div>
              <div style="width:100%; top: ${
                this.customer === 'Perlas GO' ? '455px' : this.customer.includes('demo') ? '465px' : '505px'
              };line-height:14px; position: absolute; text-align: center; color: ${textColor}; font-size:${
                this.customer === 'Perlas GO' ? '10px' : '10px'
              } ; font-family: Montserrat; font-weight: 700; text-transform:${this.customer === 'Perlas GO' ? 'none' : 'uppercase'} ; word-wrap: break-word">${
                this.customer === 'Unisend' && this.language === 'ET'
                  ? 'Võitjatega võetakse ühendust e-posti teel.'
                  : this.language === 'LV' && this.customer === 'Fantazijos'
                    ? 'IEPĒRCIETIES AR <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV </a> ATLAIŽU KODU: <div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                    : this.language === 'RU' && this.customer === 'Fantazijos'
                      ? 'ДЕЛАЙТЕ ПОКУПКИ С ПРОМОКОДОМ <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV: </a><div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                      : this.language === 'ET' && this.customer === 'Fantazijos'
                        ? 'Ostes YESYES.EE-st SOODUSKOODIGA<div ><a style="background-color:#FD7A77; font-size:14px">suvi</a></div>'
                        : this.customer === 'Fantazijos'
                          ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div><a style="background-color:#FD7A77;font-size:14px">69diena</a></div>`
                          : this.customer === 'Makalius' && this.language === 'LT'
                            ? 'arba 100 € MAKALIAUS paslaugoms įsigyti!'
                            : this.customer.includes('demo') || this.language === 'EN'
                              ? 'Congrats! Here’s your discount code – just for you!'
                              : ''
              }</div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.customer === 'Barbora'
                ? '(Galioja pristatymams iki 04 14 d.)'
                : this.customer === 'Eurovaistine'
                  ? 'Uzvarētāji tiks informēti e-pastā.'
                  : this.customer === 'Fantazijos'
                    ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                    : ''
            } </div> `
          : `<div id="boomio-title-lose" style="width:calc(100% - 20px);margin-left:10px; top: 410px; position: absolute; text-align: center; color: ${textColor}; font-size: ${fontSize}; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
              this.customer === 'Barbora'
                ? 'Pagerink rezultatą ir laimėk </br>Barbora gimtadienio dovaną iškart!'
                : this.language === 'ES'
                  ? '¡FELICIDADES YA ESTÁS PARTICIPANDO POR INCREÍBLES PREMIOS!'
                  : this.customer === 'Eurovaistine'
                    ? 'TEV VEICAS LIELISKI!'
                    : this.customer === 'Akropolis' && this.language === 'LV'
                      ? 'Mēģini vēlreiz, tev izdosies!'
                      : this.customer === 'Akropolis' && this.language === 'RU'
                        ? 'Попробуй снова, у тебя получится!'
                        : this.customer === 'Unisend' && this.language === 'LV'
                          ? 'TEV VEICAS LIELISKI!'
                          : this.customer === 'Elesen' && this.language === 'LT'
                            ? 'JŪS GALITE GERIAU!'
                            : this.customer === 'Elesen' && this.language === 'LV'
                              ? 'JŪS VARAT LABĀK!'
                              : this.customer === 'Elesen' && this.language === 'ET'
                                ? 'SA VÕID PAREMINI!'
                                : this.language === 'LV'
                                  ? 'TU VARI LABĀK!'
                                  : this.language === 'RU'
                                    ? 'ТЫ МОЖЕШЬ ЛУЧШЕ!'
                                    : this.customer === 'Unisend' && this.language === 'ET'
                                      ? 'SUL LÄHEB HÄSTI!'
                                      : this.language === 'ET'
                                        ? 'SA SAAD SUUREPÄRASELT HAKKAMA!'
                                        : this.language === 'FI'
                                          ? 'PYSTYT PAREMPAAN!'
                                          : this.language === 'EN'
                                            ? 'YOU CAN DO BETTER!'
                                            : this.customer === 'Nykstukas'
                                              ? ''
                                              : this.customer === 'Apranga'
                                                ? 'JŪS GALITE!'
                                                : this.language === 'LT'
                                                  ? 'Tu gali!'
                                                  : 'YOU CAN DO BETTER!'
            }</div>
            <div id="boomio-text-lose" style="width:calc(100% - 20px);margin-left:10px; top: ${
              this.customer === 'Perlas GO' ? '390px' : '455px'
            };line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size: ${this.customer === 'Pigu.lt' ? 12 : 10}px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${
              this.customer === 'Barbora'
                ? ''
                : this.customer === 'Eurovaistine'
                  ? '50 spēlētāji, kuri iegūs vislielāko punktu skaitu, saņems </br>E-EUROAPTIEKA dāvanu, kuponus: 100€, 50€, 25€, 15€,'
                  : this.customer === 'Pieno Žvaigždės'
                    ? 'Pagerink rezultatą, nes kas savaitę geriausi žaidėjai laimės</br> prizus! Prizinį fondą sudaro Forum Cinemas bilietai <u style="text-transform:lowercase">IR </br>pagrindiniai <u style="text-transform:uppercase">MIAU PRIZAI  </u></u> - Su Miau gyvent linksmiau!'
                    : this.customer === 'LemonFeel'
                      ? `Uzlabo savu rezultātu un cīnies par balvu, ko iegūs labākais spēlētājs LEMON FEEL noslēguma pasākumā – 28. augustā!</br> ${
                          this.userParticipationDays >= 3
                            ? `${this.userParticipationDays} DIENAS SUPER!`
                            : this.userParticipationDays === 1
                              ? `${this.userParticipationDays} DIENA`
                              : `${this.userParticipationDays} DIENAS`
                        } `
                      : this.customer === 'Penki Sezonai'
                        ? 'Pagerink rezultatą nes balandžio 1d.'
                        : this.customer === 'Akropolis' && this.language === 'LT'
                          ? 'Pagerink rezultatą ir kasdien laimėk vieną CAIF CAFE kavos </br>puodelį, o atsiėmęs prizą turėk galimybę laimėti 100 EUR</br>AKROPOLIO dovanų kortelę!'
                          : this.customer === 'Akropolis' && this.language === 'LV'
                            ? 'Ja būsi viens no 2000 dienas rezultatīvākajiem spēlētājiem, tu saņemsi balvu no Narvesen, un pēc balvas izņemšanas – automātiski piedalīsies dienas izlozē par AKROPOLE dāvanu karti 100 EUR vērtībā. Tevi ir iespēja uzlabot savu rezultātu, spēlējot vēlreiz!'
                            : this.customer === 'Akropolis' && this.language === 'RU'
                              ? 'Если вы сохраните своё место в списке 2000 лучших игроков, вы получите приз от Narvesen, а после получения приза автоматически примете участие в ежедневном розыгрыше подарочной карты AKROPOLE на 100 евро. У вас есть возможность улучшить свой результат, сыграв снова!'
                              : this.customer === 'Daumantu'
                                ? 'Pagerink rezultatą, nes kas savaitę </br> geriausi žaidėjai laimės prizus! '
                                : this.customer.includes('Gamtos Ateitis')
                                  ? 'Geriausius rezultatus pasiekusios mokyklos pateks į kitą etapą ir varžysis dėl koncerto savo mokykloje! Kas savaitę iškrenta dvi mažiausiai taškų surinkusios mokyklos. Jei tavo mokykla pateks į kitą etapą, pranešime el. paštu, kurį nurodei.'
                                  : this.customer === 'Makalius'
                                    ? 'Pagerink rezultatą, nes liepos 1 dieną geriausi žaidėjai laimės </br>prizus! Prizinį fondą sudaro net 500 kuponų po 20 €, 50 € '
                                    : this.customer === 'Unisend' && this.language === 'LV'
                                      ? '100 spēlētāji ar visvairāk punktiem saņems balvas. Izloze 31. </br> oktobris! Uzvarētāji tiks informēti e-pastā.'
                                      : this.language === 'LV' && this.customer === 'Fantazijos'
                                        ? 'Un laimējiet līdz 30 balvām!</br> Par laimestu informēsim e-pastā.'
                                        : this.language === 'RU' && this.customer === 'Fantazijos'
                                          ? 'и выиграйте до 30 призов! Уведомление о выигрыше </br>придет на вашу электронную почту.'
                                          : this.customer === 'Unisend' && this.language === 'ET'
                                            ? 'Koguni 100 enim punkte kogunud mängijat </br> võidavad 31. oktoober auhindu!'
                                            : this.language === 'ET' && this.customer === 'Fantazijos'
                                              ? 'kuni 30 auhinda oma sensuaalseteks naudinguteks.</br> Võitjaid teavitatakse nendemääratud e-posti teel.'
                                              : this.customer === 'Vilvi'
                                                ? 'Pagerink rezultatą, nes net 10 geriausių žaidėjų xx dieną </br> laimės VILVI prizus!'
                                                : this.customer === 'Perlas GO'
                                                  ? 'Kiekvieną savaitę 20 geriausių „Perlas Go“ žaidėjų, užsiregistravusių </br> programėlėje ar savitarnos svetainėje laimi po 10 € „Wolt“ kuponą!</br> Laimėjusius informuosime el. paštu.'
                                                  : this.customer === 'Zemaitijos Pienas' && this.language === 'LT'
                                                    ? 'Pagerink rezultatą, nes geriausi 5 žaidėjai laimės sportinio rankšluosčio</br> ir gertuvės rinkinį, arba dėžutę PROTEIN M varškės sūrelių'
                                                    : this.customer === 'Zemaitijos Pienas' && this.language === 'LV'
                                                      ? 'Uzlabojiet rezultātu, jo labākie 5 spēlētāji laimēs sporta dvieli</br> un ūdens pudeles komplektu vai PROTEIN M biezpiena siera kastīti'
                                                      : this.customer === 'Zemaitijos Pienas' && this.language === 'ET'
                                                        ? 'Paranda oma tulemust, sest parimad 5 mängijat võidavad sporditooted</br> ja veepudeli komplekti või PROTEIN M kohupiima juustu kasti'
                                                        : this.customer === 'Nykstukas'
                                                          ? 'Geriausi žaidėjai gali laimėti bilietus į Post Malone koncertą! Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį fondą įsteigė Nykštukas! '
                                                          : this.customer === 'Nevezis'
                                                            ? 'Pagerink rezultatą, nes kas savaitę geriausi žaidėjai laimės</br> „oho!” prizus!'
                                                            : this.customer === 'Magija'
                                                              ? 'Pagerink rezultatą, nes kas savaitę 3 daugiausia taškų surinkę žaidėjai laimės „Dobilas“  prizus!'
                                                              : this.customer === 'Orlen'
                                                                ? 'Pagerink rezultatą, nes prizinį fondą sudaro net 1 000 ledų kas savaitę! O dydisis prizas - skrydis oro balionu!'
                                                                : this.customer === 'Novaturas' && this.language === 'LT'
                                                                  ? 'Pagerink savo rezultatą – rugsėjo pabaigoje net 30 geriausių žaidėjų laimės po 100 € vertės „Novaturas“ kuponą! Jei būsi tarp laimėtojų, apie tai pranešime Tavo nurodytu el. paštu.'
                                                                  : this.customer === 'Novaturas' && this.language === 'LV'
                                                                    ? 'Tev ir iespēja uzlabot savu rezultātu, jo 30 labākie rezultātu saņēmēji laimēs 100 EUR Novatours atlaižu kuponu. Ja laimēsi balvu, mēs Tevi informēsim pa e-pastu, kuru norādīji.'
                                                                    : this.customer === 'Novaturas' && this.language === 'ET'
                                                                      ? 'Sul on võimalus oma tulemust parandada! 30 parimat mängijat võidavad 100 eurose Novatoursi sooduskupongi. Kui oled nende seas, teavitame Sind e-maili teel.'
                                                                      : this.customer === 'Novaturas' && this.language === 'EN'
                                                                        ? ' Improve your score, because at the end of the month, 30 players with the best results will win a 100 EUR Novaturas voucher. If you have won a prize, we will inform you via the email address you provided.'
                                                                        : this.customer === 'Novaturas' && this.language === 'RU'
                                                                          ? 'Улучши свой результат, ведь в конце месяца 30 лучших игроков получат подарочную карту Novatours на 100€. Если выиграешь приз, мы сообщим об этом на указанный тобой адрес электронной почты.'
                                                                          : this.customer === 'Toni'
                                                                            ? 'Inténtalo de nuevo y suma más oportunidades de ganar.'
                                                                            : this.customer === 'Pigu.lt' && this.language === 'RU'
                                                                              ? 'Накопи 500 очков или более и выиграй:</br>Скидочный код на выбранные популярные товары.'
                                                                              : this.customer === 'Pigu.lt' && this.language === 'FI'
                                                                                ? '500 pistettä enemmän ja voit voittaa</br>Alekoodi valikoiduille suosituille tuotteille'
                                                                                : this.customer === 'Pigu.lt' && this.language === 'LV'
                                                                                  ? 'Sakrāj 500 punktus vai vairāk un laimē:</br>Atlaižu kodu izvēlētām precēm.'
                                                                                  : this.customer === 'Pigu.lt' && this.language === 'LT'
                                                                                    ? 'Surink 500 ar daugiau taškų ir laimėk:</br>Nuolaidos kodą atrinktoms populiarioms prekėms.'
                                                                                    : this.customer === 'Pigu.lt' && this.language === 'EN'
                                                                                      ? 'Get 500 points or more and win:</br>A discount code for selected popular products.'
                                                                                      : this.customer === 'Pigu.lt' && this.language === 'ET'
                                                                                        ? 'Kogu 500 punkti või rohkem ja võida:</br>Sooduskood valikule populaarsetele toodetele!'
                                                                                        : this.customer === 'Apranga'
                                                                                          ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                          : this.customer === 'Elesen' && this.language === 'LT'
                                                                                            ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                            : this.customer === 'Elesen' && this.language === 'LV'
                                                                                              ? 'Ja laimēsi balvu, mēs Tevi informēsim uz e-pastu, kuru norādīji.'
                                                                                              : this.customer === 'Elesen' && this.language === 'ET'
                                                                                                ? 'Kui võidad mõne auhinna, anname sellest teada sinu esitatud e-posti aadressile.'
                                                                                                : this.language === 'LT'
                                                                                                  ? 'Jei laimėsite prizą, apie tai jus informuosime el. paštu, kurį nurodėte.'
                                                                                                  : 'If you win a prize, we will inform you by the email address you provided.'
            }</div>
              <div style="width:100%; top: ${'505px'};line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size:${
                this.customer ? '10px' : '10px'
              } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.customer === 'Unisend' && this.language === 'ET'
                  ? 'Võitjatega võetakse ühendust e-posti teel.'
                  : this.customer === 'Eurovaistine'
                    ? '10€, 5€ vērtība.'
                    : this.language === 'LV' && this.customer === 'Fantazijos'
                      ? 'IEPĒRCIETIES AR <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV </a> ATLAIŽU KODU: <div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                      : this.language === 'RU' && this.customer === 'Fantazijos'
                        ? 'ДЕЛАЙТЕ ПОКУПКИ С ПРОМОКОДОМ <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV: </a><div ><a style="background-color:#FD7A77; font-size:14px">vasara </a></div>'
                        : this.language === 'ET' && this.customer === 'Fantazijos'
                          ? 'Ostes YESYES.EE-st SOODUSKOODIGA<div ><a style="background-color:#FD7A77; font-size:14px">suvi</a></div>'
                          : this.customer === 'Fantazijos'
                            ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div ><a style="background-color:#FD7A77; font-size:14px">69diena</a></div>`
                            : this.customer === 'Makalius' && this.language === 'LT'
                              ? 'arba 100 € MAKALIAUS paslaugoms įsigyti!'
                              : ''
              }</div>
              <div style="width:100%; top: ${
                this.customer === 'Pigu.lt' ? '536px' : '546px'
              }; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${
                this.customer === 'Barbora'
                  ? '(Galioja pristatymams iki 04 14 d.)'
                  : this.customer === 'Eurovaistine'
                    ? 'Uzvarētāji tiks informēti e-pastā.'
                    : this.language === 'LV' && this.customer === 'Fantazijos'
                      ? 'UN SAŅEMIET 20% ATLAIDI VISAM!'
                      : this.language === 'RU' && this.customer === 'Fantazijos'
                        ? 'И ПОЛУЧИТЕ СКИДКУ 20% НА ВСЕ!'
                        : this.language === 'ET' && this.customer === 'Fantazijos'
                          ? 'SAATE 20% ALLAHINDLUST KÕIGELE!'
                          : this.customer === 'Fantazijos'
                            ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                            : // : this.prop === 'Pigu.lt' && this.language === 'RU'
                              // ? 'Если Ты уже выиграл, мы отправим информацию на адрес электронной почты, указанный при регистрации.'
                              // : this.prop === 'Pigu.lt' && this.language === 'FI'
                              // ? 'Jos olet jo voittanut, lähetämme tiedot sähköpostiin, jolla olet rekisteröitynyt'
                              // : this.prop === 'Pigu.lt' && this.language === 'LV'
                              // ? 'Ja esi jau laimējis, mēs nosūtīsim informāciju uz reģistrēšanās laikā norādīto e-pasta adresi.'
                              // : this.prop === 'Pigu.lt' && this.language === 'LT'
                              // ? 'Jei jau laimėjai, informaciją atsiųsime registracijos metu nurodytu el. paštu.'
                              // : this.prop === 'Pigu.lt' && this.language === 'EN'
                              // ? 'If you have already won, we will send the information to the email address you ve provided during registration.'
                              // : this.prop === 'Pigu.lt' && this.language === 'ET'
                              // ? 'Kui oled juba võitnud, saadame võiduinfo sinu registreerimisel sisestatud e-posti aadressile.'
                              ''
              } </div>
        `
      }
      ${`<div style="box-sizing: border-box;width: 100%; padding-left: 12px; padding-right: 12px; padding-top: 7px; padding-bottom: 7px; background:${'#000000ff'}; border-radius: 32px; border: 0.50px  rgba(255, 255, 255, .6) solid; justify-content: space-between; align-items: center; 
      display: 
      ${this.customer === 'Pigu.lt' && this.getBonus(this.scoreTable?.user_best_score) > 0 ? 'inline-flex' : 'none'};width:260px;position:absolute;top:495px;left:calc(50% - 130px);">
      <div style="height: 17px; color: white; font-size: 16px; font-family: Montserrat; font-weight: 600; line-height: 16px; word-wrap: break-word" id="p_code_text2">
       ${this.getDiscountCode(this.scoreTable?.user_best_score)}
          </div>
          <svg width="22" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="boomio-copy-modal-btn2" style="cursor:pointer">
          <path d="M18.5625 3.42188H7.5625C7.42575 3.42188 7.2946 3.4762 7.1979 3.5729C7.1012 3.6696 7.04688 3.80075 7.04688 3.9375V7.54688H3.4375C3.30075 7.54688 3.1696 7.6012 3.0729 7.6979C2.9762 7.7946 2.92188 7.92575 2.92188 8.0625V19.0625C2.92188 19.1993 2.9762 19.3304 3.0729 19.4271C3.1696 19.5238 3.30075 19.5781 3.4375 19.5781H14.4375C14.5743 19.5781 14.7054 19.5238 14.8021 19.4271C14.8988 19.3304 14.9531 19.1993 14.9531 19.0625V15.4531H18.5625C18.6993 15.4531 18.8304 15.3988 18.9271 15.3021C19.0238 15.2054 19.0781 15.0743 19.0781 14.9375V3.9375C19.0781 3.80075 19.0238 3.6696 18.9271 3.5729C18.8304 3.4762 18.6993 3.42188 18.5625 3.42188ZM13.9219 18.5469H3.95312V8.57812H13.9219V18.5469ZM18.0469 14.4219H14.9531V8.0625C14.9531 7.92575 14.8988 7.7946 14.8021 7.6979C14.7054 7.6012 14.5743 7.54688 14.4375 7.54688H8.07812V4.45312H18.0469V14.4219Z" fill="white"/>
          </svg>
      </div> 
      `}
    `;
    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    if (this.customer === 'Pigu.lt') {
      this.updatePrizeLink(this.scoreTable?.user_best_score, this.language);
      document.getElementById('boomio-copy-modal-btn2').onclick = () => {
        const textToCopy = this.getDiscountCode(this.scoreTable?.user_best_score);
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const copyButton = document.getElementById('p_code_text2');
        copyButton.textContent = translations.copied[this.language] || translations.copied.EN;

        setTimeout(() => {
          copyButton.textContent = textToCopy;
        }, 2000);
      };
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';

    const userId = this.config.userId;
    containerDiv.style.width = document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: ${
        this.customer === 'Toni' ? '95px' : '72px'
      }; position: absolute; text-align: center; color: ${'white'}; font-size: 40px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-competition-scoreboard-name">${
        this.language === 'LV'
          ? 'REZULTĀTI'
          : this.language === 'RU'
            ? 'РЕЗУЛЬТАТЫ'
            : this.language === 'ET'
              ? 'TULEMUSED'
              : this.language === 'ES'
                ? 'RESULTADOS'
                : this.language === 'FI'
                  ? 'TULOKSET'
                  : this.language === 'LT'
                    ? 'REZULTATAI'
                    : 'RESULTS'
      }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
              


      <div  style="width: calc(100% - 32px); height: ${'260px'}; left: 16px; top: ${
        this.customer === 'Toni' ? '134px' : '124px'
      }; position: absolute; background: rgba(255, 255, 255, 0.20); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius:20px;border-right:none; backdrop-filter: blur(4px)">
        <div style="overflow-x:hidden;overflow-y: scroll; height: calc(100% - 60px);margin-right:5px; margin-top:20px;" class="boomio-custom-scrollbar">
          <table style="margin-left:2px;width: 100%;padding-top:20px;padding-bottom:20px;border-collapse: collapse;" >
            <tbody class="boomio-tbody" style="background-color:transparent">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div id="boomio-prize-link-container" style="
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
  top: 535px;
  position: absolute;
  height: 36px;
  background: white;
  box-shadow: -4px -4px 8px #DFE6F5 inset;
  border-radius: 35px;
  display:${(this.customer === 'Perlas GO' && !userId) || this.customer === 'Pigu.lt' ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  pointer-events: auto; /* Ensure the container receives taps */
">
  <a id="boomio-prize-link"
    href="#"
    rel="noopener noreferrer"
    style="
      text-align: center;
      color: ${this.getBrandColor(this.customer)};
      font-size: 22px;
      font-family: 'Georama';
      font-weight: 700;
      line-height: 24px;
      word-wrap: break-word;
      cursor:pointer;
      text-decoration:none;
    "    
  >    
    ${translations.useCode[this.language] || translations.useCode.EN}
  </a>
</div>

      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:580px;position:absolute; height: 36px; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-game-play-again">
        <div style="text-align: center; color: ${this.getBrandColor(this.customer)} ; font-size: 22px; font-family: ${
          this.customer === 'Perlas GO' ? 'Basis Grotesque Pro, sans-serif' : 'Georama'
        }; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">${
          this.customer === 'Akropolis' && this.language === 'LV'
            ? 'SPĒLĒT VĒLREIZ'
            : this.customer === 'Akropolis' && this.language === 'RU'
              ? 'ИГРАТЬ СНОВА'
              : this.language === 'LV'
                ? 'UZLABOT REZULTĀTU'
                : this.language === 'RU'
                  ? 'УЛУЧШИТЬ РЕЗУЛЬТАТ'
                  : this.language === 'ET'
                    ? 'PROOVI UUESTI'
                    : this.language === 'ES'
                      ? '¡MEJORA TUS RESULTADOS!'
                      : this.language === 'EN'
                        ? 'IMPROVE YOUR SCORE'
                        : this.language === 'FI'
                          ? 'PARANNA TULOSTA'
                          : this.language === 'ES'
                            ? 'MEJORA TU PUNTAJE'
                            : this.language === 'LT'
                              ? 'PAGERINK REZULTATĄ'
                              : 'IMPROVE SCORE'
        }</div>
      </div>

      <a href="https://boomio.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; cursor: pointer;">
        <div id="boomio-logo" style="left:calc(50% - 40px);width:78px;top:625px;position:absolute;margin-top:5px;height: 22px; background: url(${boomioLogo}); justify-content: center; align-items: center; display: flex;background-size: contain;background-repeat:no-repeat;">
        </div>
      </a>
    </div>`;
    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('competition-table-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }

  getYourScoreText() {
    const messages = {
      LT: 'Tavo rezultatas',
      LV: 'Tavs rezultāts',
      ET: 'Sinu tulemus',
      ES: 'Tu resultado',
      FI: 'SINUN TULOKSESI',
      RU: 'ВАШ РЕЗУЛЬТАТ',
      EN: 'Your score',
    };

    return messages[this.language] || messages.EN;
  }
}
