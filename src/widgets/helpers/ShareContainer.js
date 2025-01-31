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

  updateProps(prop) {
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
      <div class="bomio-first-line" style="width:100%; top: 170px; line-height:24px; position: absolute; font-weight: 700; text-align: center; color: white; font-size: 20px; font-family: Montserrat; word-wrap: break-word;">
        Už pakviestus draugus gausi +1000<br> taškų prie savo žaidimo rezultato!
      </div>
      <div class="bomio-second-line" style="width:100%; top: 240px; line-height:24px; position: absolute; text-align: center; color: white; font-size: 20px; font-family: Montserrat; font-weight: 400; word-wrap: break-word;">
        Pasidalink žaidimo nuoroda dabar ir <br> tapk žaidimo lyderiu!
      </div>

      <div class="share-buttons" style="width: 100%; top: 540px; position: absolute; text-align: center;">

               <div id="default-share-button" style="cursor:pointer;width: calc(100% - 40px);margin-left:20px;margin-right:20px;position:absolute; height: 38px; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-close-did-you-know">
    <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;">
    ${'DALINKIS'}
    </div>
    </div>


      </div>
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    window.copyURL = function () {
      const shareURL = this.campaignUrlProp;
      navigator.clipboard.writeText(shareURL);
    }.bind(this);

    // Add event listener for the default share button
    const shareButton = document.getElementById('default-share-button');
    if (shareButton) {
      shareButton.addEventListener('click', () => this.defaultShare());
    }
  }

  defaultShare() {
    const shareData = {
      title: 'Check out this game!',
      text: 'Play this amazing game and compete with your friends!',
      url: this.campaignUrlProp,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error('Error sharing content:', error));
    } else {
      navigator.clipboard
        .writeText(this.campaignUrlProp)
        .catch((error) => console.error('Error copying link:', error));
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('share-container');
    containerDiv.setAttribute('id', 'share-container');
    containerDiv.style.background = 'none';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative;">
      <div style="width:calc(100% - 20px);margin-left:10px;top: 42px; position: absolute; text-align: center;line-height:42px; color: ${'white'}; font-size: ${
      this.isMobileWidthSmall ? '26px' : '30px'
    }; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${'daugiau draugų, </br> daugiau taškų!'}</div>
      <div class="boomio-scoreboard-text"></div>
    </div>`;

    this.containerDiv = containerDiv;

    containerDiv.innerHTML += `
    </div></div>
    <div style="cursor:pointer;width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:595px;position:absolute; height: 38px; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-close-did-you-know">
    <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;">
    ${'TOLIAU'}
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
