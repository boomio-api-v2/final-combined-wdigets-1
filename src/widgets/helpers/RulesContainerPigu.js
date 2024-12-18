import './styles.css';

import { boomioLogo, close } from './constants';
export class RulesContainerPigu {
  constructor(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.isMobile = window.innerWidth <= 1280;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;
    this.containerDiv = null; // Store container reference
    this.render();
  }

  updateProps(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    const userPercentageDiscount = parseInt(this?.scoreTable?.best_discount) || 0;
    const userDiscountCode = this?.scoreTable?.coupon_code || '';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    this.language = urlParams.get('language');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    const content =
      this.language === 'ET' &&
      (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
        ? `*Sooduskood ILU1224 kehtib ainult 19.12.2024 kuni kl 23:59. registreeritud kasutajatele, kes ostavad spetsiaalselt märgistatud müüja Kaup24.ee tooteid. Kood ei kehti kinkekaartide ostmisel, koos teiste sooduskoodide ja Kaup24-eurodega. Ühe ostu puhul saab kasutada ainult ühte sooduskoodi. `
        : this.language === 'RU' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? `*Скидочный код ILU1224 в силе только 19.12.2024 до 23:59  для зарегистрированных пользователей, при покупке особо отмеченных товаров продавца Kaup24.ee Скидочный код не действует при покупке подарочных карт и вместе с деньгами Kaup24.ee. Для одной покупки можно использовать только один скидочный код.`
        : this.language === 'EN' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? `*Sooduskood ILU1224 kehtib ainult 19.12.2024 kuni kl 23:59. registreeritud kasutajatele, kes ostavad spetsiaalselt märgistatud müüja Kaup24.ee tooteid. Kood ei kehti kinkekaartide ostmisel, koos teiste sooduskoodide ja Kaup24-eurodega. Ühe ostu puhul saab kasutada ainult ühte sooduskoodi. `
        : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
        ? `*Nuolaidos kodas GROZIS1224 galioja 2024 12 19 iki 24 val. registruotiems vartotojams, perkantiems spec. ženklu pažymėtas pardavėjo Pigu.lt prekes. Nuolaidos kodas negalioja dovanų kuponams ir negalioja kartu su PiguEurais. Vieno pirkimo metu galima panaudoti tik vieną nuolaidos kodą.`
        : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
        ? `*Скидочный код GROZIS1224 в силе только 19.12.2024 до 23:59 для зарегистрированных пользователей, при покупке особо отмеченных товаров продавца Pigu.lt. Скидочный код не действует при покупке подарочных карт и вместе с деньгами Pigu.lt или другими скидочными кодами. Скидочный код, который должен быть использован, указан около товара. Для одной покупки можно использовать только один скидочный код.`
        : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? `*Alekoodi KAUNEUS1224 on voimassa 19.12.2024 klo 23.59 asti, valikoiduista ja merkityistä myyjän Hobbyhall.fi-tuotteista. Voimassa vain rekisteröityneille asiakkaille. Ei voi yhdistää muihin alekoodeihin, Hobby Hall rahaan tai lahjakorttia ostaessa.`
        : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
        ? `*Atlaižu kods SKAISTUMAM1224 ir spēkā tikai 19.12.2024. līdz plkst. 23:59 reģistrētiem lietotājiem, kuri iegādāsies īpaši marķētas pārdevēja 220.lv preces. Atlaižu kods nav derīgs, iegādājoties dāvanu kartes un kopā ar 220.lv naudu. Vienam pirkumam var izmantot tikai vienu atlaižu kodu.`
        : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
        ? `*Скидочный код SKAISTUMAM1224 в силе только 19.12.2024 до 23:59 для зарегистрированных пользователей, при покупке особо отмеченных товаров продавца 220.lv. Скидочный код не действует при покупке подарочных карт и вместе с деньгами 220.lv или другими скидочными кодами. Скидочный код, который должен быть использован, указан около товара. Для одной покупки можно использовать только один скидочный код.`
        : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
        ? `*Nuolaidos kodas GROZIS1224 galioja 2024 12 19 iki 24 val. registruotiems vartotojams, perkantiems spec. ženklu pažymėtas pardavėjo Pigu.lt prekes. Nuolaidos kodas negalioja dovanų kuponams ir negalioja kartu su PiguEurais. Vieno pirkimo metu galima panaudoti tik vieną nuolaidos kodą.`
        : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? `*Alekoodi KAUNEUS1224 on voimassa 17.12.2024 klo 23.59 asti, valikoiduista ja merkityistä myyjän Hobbyhall.fi-tuotteista. Voimassa vain rekisteröityneille asiakkaille. Ei voi yhdistää muihin alekoodeihin, Hobby Hall rahaan tai lahjakorttia ostaessa.`
        : this.language === 'EN' &&
          this.campaignUrlProp === 'https://220.lv' &&
          `*Atlaižu kods SKAISTUMAM1224 ir spēkā tikai 17.12.2024. līdz plkst. 23:59 reģistrētiem lietotājiem, kuri iegādāsies īpaši marķētas pārdevēja 220.lv preces. Atlaižu kods nav derīgs, iegādājoties dāvanu kartes un kopā ar 220.lv naudu. Vienam pirkumam var izmantot tikai vienu atlaižu kodu.`;

    const containerDiv = document.querySelector('.rules-table-container-pigu');
    containerDiv.innerHTML += `
              </div>
              <div id="close-rules-container-pigu" style="display:block;width: 100%; display:flex;justify-content:end;align-items:end;margin-top:10px">
<img src=${close} alt="Image Description" style="width:32px;height:32px;margin-right:10px;"></img>
</div>
<div class="boomio-custom-scrollbar-rules" style="overflow-x:hidden;overflow-y: scroll;height: calc(100% - 20px);text-align:left;padding-left:10px;font-size:10px;line-height:14px;min-width:310px;width:calc(100% - 20px)">
  ${content}
</div>
              </div>
    `;

    this.containerDiv = containerDiv;
    const closeBtn = document.getElementById('close-rules-container-pigu');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const rulesTableContainer = document.getElementById('rules-table-container-pigu');

        rulesTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        setTimeout(() => {
          rulesTableContainer.style.height = '10px';
          rulesTableContainer.style.top = 'calc(50% + 330px)';
          rulesTableContainer.style.opacity = 0;
        }, 100);
        setTimeout(() => {
          rulesTableContainer.style.display = 'none';
        }, 1000);
      });
    }
    if (document.getElementById('boomio-copy-modal-btn')) {
      document.getElementById('boomio-copy-modal-btn').onclick = () => {
        const textToCopy = userDiscountCode;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);
      };
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('rules-table-container-pigu');
    containerDiv.setAttribute('id', 'rules-table-container-pigu');
    containerDiv.style.background = '#DDDDDD';
    containerDiv.style.borderRadius = '10px';
    containerDiv.style.paddingBottom = '20px';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '315px'
          : document.body.offsetWidth - 60 + 'px'
        : '366px';
    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('collection-table-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
