import { localStorageService } from '@/services';
import { boomioLogo } from './constants';

const translations = {
  score: {
    EN: 'YOUR SCORE:',
    LT: 'TAVO REZULTATAS:',
    RU: 'ТВО СЧЕТ:',
    LV: 'TAVS REZULTĀTS:',
    ET: 'SINU TULEMUS:',
  },
  congratulations: {
    EN: 'CONGRATULATIONS!',
    LT: 'SVEIKINAME!',
    RU: 'ПОЗДРАВЛЯЕМ!',
    LV: 'APSVEICAM!',
    ET: 'ÕNNITLEME!',
  },
  won: {
    EN: 'YOU WON 10% DISCOUNT',
    LT: 'LAIMĖJAI 10% NUOLAIDĄ',
    RU: 'ВЫ ВЫИГРАЛИ СКИДКУ 10%',
    LV: 'LAIMĒJI 10% ATLAIDI',
    ET: 'VÕITSID 10% ALLAHINDLUST',
  },
  description: {
    EN: 'SCAN QR CODE OR VISIT A PARTNER STORE, SHOW YOUR DISCOUNT CODE AND ENJOY 10% OFF ON SELECTED PRODUCT CATEGORIES',
    LT: 'NUSKENUOK, ARBA PATEIK DARBUOTOJUI, nuolaidos kodą pirkimo metu ir nuolaida bus pritaikyta visoms lietuviškų daržovių kategorijos prekėms.',
    RU: 'СКАНИРУЙТЕ QR-КОД ИЛИ ПОСЕТИТЕ ПАРТНЕРСКИЙ МАГАЗИН, ПОКАЖИТЕ СВОЙ СКИДОЧНЫЙ КОД И НАСЛАЖДАЙТЕСЬ СКИДКОЙ 10% НА ИЗБРАННЫЕ КАТЕГОРИИ',
    LV: 'SKENĒ QR KODU VAI APMEKLĒ PARTNERA VEIKALU, UZRĀDI SAVU ATLAIDES KODU UN BAUDI 10% ATLAIDI UZ IZVĒLĒTAJĀM PRODUKTU KATEGORIJĀM',
    ET: 'SKANEERI QR KOODI VÕI KÜLASTA PARTNERKAUPLUST, NÄITA OMA ALLAHINDLUSE KOODI JA NAUDI 10% ALLAHINDLUST VALITUD TOOTEKATEGOORIATELE',
  },
  improveScore: {
    EN: 'IMPROVE SCORE',
    LT: 'PAGERINK REZULTATĄ',
    RU: 'УЛУЧШИТЬ СЧЕТ',
    LV: 'UZLABOT REZULTĀTU',
    ET: 'PARANDA TULEMUST',
  },
};

export class QRDiscountScoreTableContainer {
  constructor(customer, scoreTable, language) {
    this.customer = customer;
    this.scoreTable = scoreTable;
    this.config = localStorageService.getDefaultConfig();
    this.language = language || this.config.language || 'LT';
    this.containerDiv = null;
    this.render();
  }

  updateProps(customer, scoreTable, currentScore) {
    this.customer = customer;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;

    const scoreElement = this.containerDiv.querySelector('.qr-discount-score');
    // Use currentScore if available, fallback to scoreTable.user_score
    const displayScore = this.currentScore !== undefined ? this.currentScore : this.scoreTable.user_score !== undefined ? this.scoreTable.user_score : 0;
    if (scoreElement) {
      scoreElement.textContent = `${translations.score[this.language]} ${displayScore}`;
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';

    containerDiv.style.width = document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px';

    // Sample QR code placeholder - simple visible QR pattern
    const placeholderQR = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DISCOUNT10';

    containerDiv.innerHTML = `
      <div style="width: 100%; height: 100%; position: relative;">
        <!-- Score Display -->
        <div class="qr-discount-score" style="
          width: 100%;
          top: 60px;
          position: absolute;
          text-align: center;
          color: white;
          font-size: 20px;
          font-family: Georama;
          font-weight: 700;
          text-transform: uppercase;
        ">
          ${translations.score[this.language]} ${this.scoreTable.user_score !== undefined ? this.scoreTable.user_score : 0}
        </div>

        <!-- Congratulations -->
        <div style="
          width: 100%;
          top: 90px;
          position: absolute;
          text-align: center;
          color: white;
          font-size: 32px;
          font-family: Georama;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        ">
          ${translations.congratulations[this.language]}
        </div>

        <!-- Purple Discount Card -->
        <div style="
          width: calc(100% - 32px);
          left: 16px;
          top: 140px;
          position: absolute;
          background: linear-gradient(135deg, #8B3A8B 0%, #6B2C6B 100%);
          border-radius: 20px;
          padding: 30px 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
        ">
          <!-- Won Text -->
          <div style="
            font-size: 22px;
            font-weight: bold;
            color: white;
            text-align: center;
            font-family: Georama;
            text-transform: uppercase;
            margin-bottom: 20px;
          ">
            ${translations.won[this.language]}
          </div>

          <!-- QR Code -->
          <div style="
            background: white;
            padding: 15px;
            border-radius: 10px;
            width: 150px;
            height: 150px;
            margin: 0 auto 20px auto;
            box-sizing: border-box;
          ">
            <img src="${placeholderQR}" alt="QR Code" style="
              width: 100%;
              height: 100%;
              display: block;
              object-fit: contain;
            ">
          </div>

          <!-- Description Text -->
          <div style="
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.95);
            text-align: center;
            font-family: Georama;
          ">
            ${translations.description[this.language]}
          </div>
        </div>

        <!-- Improve Score Button -->
        <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:535px;position:absolute; height: 36px; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-game-play-again">
          <div style="text-align: center; color: rgba(61, 73, 40, 1); font-size: 22px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">
            ${translations.improveScore[this.language]}
          </div>
        </div>

        <!-- Boomio Logo -->
        <a href="https://boomio.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; cursor: pointer;">
          <div id="boomio-logo" style="
            left: calc(50% - 40px);
            width: 78px;
            top: 625px;
            position: absolute;
            height: 22px;
            background: url(${boomioLogo});
            background-size: contain;
            background-repeat: no-repeat;
          ">
          </div>
        </a>
      </div>
    `;

    this.containerDiv = containerDiv;
    document.body.appendChild(containerDiv);

    return containerDiv;
  }
}
