import './styles.css';

import {
  closeDidYouKnow,
  facebook,
  messenger,
  instagram,
  tiktok,
  copy,
  whatsapp,
} from './constants';
import { localStorageService } from '@/services';

export class ShareContainer {
  constructor(prop) {
    this.couponCodeNew = 'boomio';

    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    this.dynamicData = this.config.dynamicData ? this.config.dynamicData : null;

    const currentPageUrl = window.location.href;
    this.isSmallMobile = window.innerWidth <= 380;

    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    this.isMobileWidthSmall = window.innerWidth <= 400;

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    this.user_id = urlParams.get('user_id');

    this.prop = prop;
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null;
    this.render();
  }

  updateProps(prop, score) {
    this.prop = prop;
    this.isMobileWidthSmall = window.innerWidth <= 400;
    this.isSmallMobile = window.innerWidth <= 380;
    this.config = localStorageService.getDefaultConfig();
    this.dynamicData = this.config.dynamicData ? this.config.dynamicData : null;

    this.updateVisuals();
  }

  updateVisuals() {
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    if (!this.containerDiv) return;

    let scoreboardText = `
      <div class="bomio-first-line" style="width:calc(100% - 20px);margin-left:10px; top: 250px; line-height:24px; position: absolute; font-weight: 700; text-align: center; color: white; font-size: 20px; font-family: Montserrat; word-wrap: break-word;">
         ${
           this.prop === 'Perlas GO'
             ? 'Tik naujiems vartotojams – panaudok kodą ir gauk 5 € sąskaitoms apmokėti Perlas Go! '
             : this.prop === 'Akropolis'
             ? 'Už pakviestus draugus gausi +1000 taškų prie savo žaidimo rezultato!<br>Pasidalink žaidimo nuoroda dabar ir gauk papildomą staigmeną!'
             : this.language === 'EN'
             ? 'For inviting friends you will receive +100 points to your game score!<br>Share the game link now and get an additional surprise!'
             : this.language === 'LT'
             ? 'Už pakviestus draugus gausi +100 taškų prie savo žaidimo rezultato!<br>Pasidalink žaidimo nuoroda dabar ir gauk papildomą staigmeną!'
             : this.language === 'LV'
             ? 'Par draugu uzaicināšanu saņemsi +100 punktus savam spēles rezultātam!<br>Dalies ar spēles saiti tūlīt un saņem papildu pārsteigumu!'
             : this.language === 'ET'
             ? 'Kui kutsud sõbrad mängima, saad +100 punkti oma kontole!<br>Jaga kohe mängulinki ja saad lisaboonuse! '
             : this.language === 'FI'
             ? 'Ystävien kutsumisesta saat +100 pistettä pelitulokseesi!<br>Jaa pelin linkki nyt ja saat yllätyksen!'
             : this.language === 'RU' &&
               'За приглашение друзей Ты получешь +100 очков к своему игровому счёту!<br>Поделись ссылкой на игру прямо сейчас и получи дополнительный сюрприз!'
         }
      </div>

      ${
        this.prop === 'Perlas GO'
          ? `<div style="box-sizing: border-box;width: 100%; padding-left: 12px; padding-right: 12px; padding-top: 7px; padding-bottom: 7px; background:${'#FFB151'}; border-radius: 32px; border: 0.50px  rgba(255, 255, 255, .6) solid; justify-content: space-between; align-items: center; display: inline-flex;width:260px;position:absolute;top:340px;left:calc(50% - 130px);">
      <div style="height: 17px; color: white; font-size: 16px; font-family: Montserrat; font-weight: 600; line-height: 16px; word-wrap: break-word" id="p_code_text3">
       ${'boomio'}
          </div>
          <svg width="22" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="boomio-copy-modal-btn3" style="cursor:pointer">
          <path d="M18.5625 3.42188H7.5625C7.42575 3.42188 7.2946 3.4762 7.1979 3.5729C7.1012 3.6696 7.04688 3.80075 7.04688 3.9375V7.54688H3.4375C3.30075 7.54688 3.1696 7.6012 3.0729 7.6979C2.9762 7.7946 2.92188 7.92575 2.92188 8.0625V19.0625C2.92188 19.1993 2.9762 19.3304 3.0729 19.4271C3.1696 19.5238 3.30075 19.5781 3.4375 19.5781H14.4375C14.5743 19.5781 14.7054 19.5238 14.8021 19.4271C14.8988 19.3304 14.9531 19.1993 14.9531 19.0625V15.4531H18.5625C18.6993 15.4531 18.8304 15.3988 18.9271 15.3021C19.0238 15.2054 19.0781 15.0743 19.0781 14.9375V3.9375C19.0781 3.80075 19.0238 3.6696 18.9271 3.5729C18.8304 3.4762 18.6993 3.42188 18.5625 3.42188ZM13.9219 18.5469H3.95312V8.57812H13.9219V18.5469ZM18.0469 14.4219H14.9531V8.0625C14.9531 7.92575 14.8988 7.7946 14.8021 7.6979C14.7054 7.6012 14.5743 7.54688 14.4375 7.54688H8.07812V4.45312H18.0469V14.4219Z" fill="white"/>
          </svg>
      </div> 
      `
          : ''
      }
      <div class="share-buttons" style="width: 100%; top: 540px; position: absolute; text-align: center;">

               <div id="default-share-button" style="cursor:pointer;width: calc(100% - 40px);margin-left:20px;margin-right:20px;position:absolute; height: 38px; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex;">
    <div style="text-align: center; color: rgba(207, 10, 10, 1); font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;">
    ${
      this.prop === 'Perlas GO'
        ? 'PANAUDOK KODĄ'
        : this.language === 'EN'
        ? 'SHARE'
        : this.language === 'LT'
        ? 'DALINTIS '
        : this.language === 'LV'
        ? 'DALĪTIES'
        : this.language === 'ET'
        ? 'JAGA'
        : this.language === 'FI'
        ? 'JAA'
        : this.language === 'RU' && 'ПОДЕЛИТЬСЯ'
    }
    </div>
    </div>
      </div>
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    if (this.prop === 'Perlas GO') {
      document.getElementById('boomio-copy-modal-btn3').onclick = () => {
        const textToCopy = this.couponCodeNew;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const copyButton = document.getElementById('p_code_text3');
        copyButton.textContent = this.language === 'EN' ? 'Copied!' : 'Nukopijuota!';

        setTimeout(() => {
          copyButton.textContent = this.couponCodeNew;
        }, 2000);
      };
    }

    window.copyURL = function () {
      const shareURL = this.campaignUrlProp;
      navigator.clipboard.writeText(shareURL);
    }.bind(this);

    const shareButton = document.getElementById('default-share-button');
    if (shareButton) {
      shareButton.onclick = () => this.defaultShare();
    }
  }

  async defaultShare() {
    const shareData = {
      title: 'Išbandyk šį žaidimą!',
      text: 'Pasinerk į smagų žaidimą ir laimėk puikių prizų!',
      url: this.campaignUrlProp,
    };

    document.dispatchEvent(
      new CustomEvent('shareClicked', {
        detail: { url: this.campaignUrlProp },
      }),
    );

    const copiedMsg =
      this.language === 'EN'
        ? 'Link copied!'
        : this.language === 'LT'
        ? 'Nuoroda nukopijuota!'
        : this.language === 'LV'
        ? 'Saite nokopēta!'
        : this.language === 'ET'
        ? 'Link kopeeritud!'
        : this.language === 'FI'
        ? 'Linkki kopioitu!'
        : this.language === 'RU'
        ? 'Ссылка скопирована!'
        : 'Link copied!';

    try {
      // 1) Native share if available (Chrome/standalone PWA, not WebView)
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      // 2) Modern clipboard (many in-app browsers block this)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(this.campaignUrlProp);
        alert(copiedMsg);
        return;
      }
      // 3) Legacy clipboard via textarea
      const ta = document.createElement('textarea');
      ta.value = this.campaignUrlProp;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert(copiedMsg);
    } catch (err) {
      console.error('Share/copy failed:', err);
      // 4) Absolute fallback: open a chooser-friendly intent-style page
      // or show per-network share links (see section C below).
      alert(
        this.language === 'EN'
          ? 'Could not open share sheet. Copy the link manually.'
          : 'Nepavyko atidaryti dalinimosi lango. Nukopijuok nuorodą rankiniu būdu.',
      );
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('share-container');
    containerDiv.setAttribute('id', 'share-container');
    containerDiv.style.background = 'none';

    containerDiv.style.width =
      document.documentElement.clientWidth < 426
        ? document.documentElement.clientWidth < 321
          ? '375px'
          : document.documentElement.clientWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative;">
      <div style="width:calc(100% - 20px);margin-left:10px;top: ${
        this.prop === 'Nykstukas' ? '150px' : '72px'
      };; position: absolute; text-align: center;line-height:42px; color: ${'white'}; font-size: ${
      this.isMobileWidthSmall ? '26px' : '30px'
    }; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${
      this.prop === 'Perlas GO'
        ? 'Tavo NUOLAIDOS KODAS'
        : this.language === 'EN'
        ? 'MORE FRIENDS, MORE POINTS'
        : this.language === 'LT'
        ? 'DAUGIAU DRAUGŲ, DAUGIAU TAŠKŲ'
        : this.language === 'LV'
        ? 'VAIRĀK DRAUGU, VAIRĀK PUNKTU'
        : this.language === 'ET'
        ? 'ROHKEM SÕPRU, ROHKEM PUNKTE'
        : this.language === 'FI'
        ? 'Enemmän ystäviä, enemmän pisteitä'
        : this.language === 'RU' && 'БОЛЬШЕ ДРУЗЕЙ, БОЛЬШЕ ОЧКОВ'
    }</div>
      <div class="boomio-scoreboard-text"></div>
    </div>`;

    this.containerDiv = containerDiv;

    containerDiv.innerHTML += `
    </div></div>
    <div id="boomio-close-share" style="cursor:pointer;width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:595px;position:absolute; height: 38px; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex;">
    <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;">
    ${
      this.language === 'EN'
        ? 'NEXT'
        : this.language === 'LT'
        ? 'TOLIAU'
        : this.language === 'LV'
        ? 'NĀKAMAIS'
        : this.language === 'ET'
        ? 'EDASI'
        : this.language === 'FI'
        ? 'SEURAAVA'
        : this.language === 'RU' && 'ДАЛЕЕ'
    }
    </div>
    </div>
    </div>`;

    const existingContainer = document.getElementById('share-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
