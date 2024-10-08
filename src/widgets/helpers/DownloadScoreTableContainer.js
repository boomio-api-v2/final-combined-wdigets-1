import './styles.css';

import { boomioLogo } from './constants';
import { BarboraAppleStore, BarboraGoogleStore } from '../driveWidget/js/constants';
export class DownloadScoreTableContainer {
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
    const appleStore = document.getElementById('boomio-barbora-apple-store');
    const googleStore = document.getElementById('boomio-barbora-google-store');
    function clickHandler(event) {
      event.preventDefault(); // Prevent any default behavior

      const url = event.currentTarget.getAttribute('href');
      window.location.href = url; // Redirect to the URL
    }
    appleStore.addEventListener('click', clickHandler);
    googleStore.addEventListener('click', clickHandler);
  }

  updateVisuals() {
    console.log(this.currentScore);
    if (!this.containerDiv) return;
    const userPercentageDiscount = parseInt(this?.scoreTable?.best_discount) || 0;
    const userDiscountCode = this?.scoreTable?.coupon_code || '';

    let tableHTML = '';

    tableHTML += '<div>';

    tableHTML += `

    <div style="margin-top:20px;filter: drop-shadow(5px 8px 18.6px rgba(255, 255, 255, 0.25));width:calc(100% - 18px); display:flex; padding:10px;justify-content:center;flex-direction:column;align-items:center;border-radius:20px;background:linear-gradient(161deg, #C54040 21.3%, #CC0001 49.66%, #990A0B 86.97%);filter;box-sizing:content-box !important;">
            <div id='boomio-your-score' style="margin-bottom:10px;width:100%;margin-top:-120px;top:30px;position:absolute; text-align: center; color: white; font-size: 16px; font-family: Montserrat; font-weight:400; text-transform: uppercase; word-wrap: break-word"> 
    TAVO REZULTATAS:  ${this.currentScore ?? 0} </div>

    <div style="width:100%;margin-top:20px; text-align: center; color: white; font-size: 12px; font-family: Montserrat; font-weight:400; text-transform: uppercase; word-wrap: break-word"> 
    NUOLAIDA APSIPIRKIMUI </div>
    <div style="width:100%;margin-bottom:10px;text-align: center;color: white; font-size: 14px; font-family: Montserrat; font-weight:700; text-transform: uppercase; word-wrap: break-word"> 
    „BARBORA“ PROGRAMĖLĖJE </div>
    <div style="width:100%;text-align: center; color: white; font-size: 42px; font-family: Montserrat; font-weight:800; text-transform: uppercase; word-wrap: break-word"> 
    ${userPercentageDiscount ?? 0}% </div>
       <div style="box-sizing: border-box;width: 100%; padding-left: 12px; padding-right: 12px; padding-top: 7px; padding-bottom: 7px; background: linear-gradient(90deg, rgba(254, 227, 233, 0.60) 0%, rgba(255, 214.63, 231.75, 0.60) 22%, rgba(243, 219, 240, 0.60) 42%, rgba(234, 223, 247, 0.60) 62%, rgba(234, 223, 247, 0.60) 82%, rgba(238.45, 215.69, 255, 0.60) 100%); border-radius: 32px; border: 0.50px  rgba(255, 255, 255, .6) solid; justify-content: space-between; align-items: center; display: inline-flex;width:250px;margin-top:20px;">
<div style="height: 17px; color: white; font-size: 16px; font-family: Montserrat; font-weight: 600; line-height: 16px; word-wrap: break-word" id="p_code_text">
 ${userDiscountCode ?? 'CODE'}
    </div>
    <svg width="22" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="boomio-copy-modal-btn" style="cursor:pointer">
    <path d="M18.5625 3.42188H7.5625C7.42575 3.42188 7.2946 3.4762 7.1979 3.5729C7.1012 3.6696 7.04688 3.80075 7.04688 3.9375V7.54688H3.4375C3.30075 7.54688 3.1696 7.6012 3.0729 7.6979C2.9762 7.7946 2.92188 7.92575 2.92188 8.0625V19.0625C2.92188 19.1993 2.9762 19.3304 3.0729 19.4271C3.1696 19.5238 3.30075 19.5781 3.4375 19.5781H14.4375C14.5743 19.5781 14.7054 19.5238 14.8021 19.4271C14.8988 19.3304 14.9531 19.1993 14.9531 19.0625V15.4531H18.5625C18.6993 15.4531 18.8304 15.3988 18.9271 15.3021C19.0238 15.2054 19.0781 15.0743 19.0781 14.9375V3.9375C19.0781 3.80075 19.0238 3.6696 18.9271 3.5729C18.8304 3.4762 18.6993 3.42188 18.5625 3.42188ZM13.9219 18.5469H3.95312V8.57812H13.9219V18.5469ZM18.0469 14.4219H14.9531V8.0625C14.9531 7.92575 14.8988 7.7946 14.8021 7.6979C14.7054 7.6012 14.5743 7.54688 14.4375 7.54688H8.07812V4.45312H18.0469V14.4219Z" fill="white"/>
    </svg>
</div> 
    <div style="letter-spacing: -0.3px;line-height: 150%;margin-bottom:15px;width:100%;margin-top:20px; text-align: center; color: white; font-size: 11px; font-family: Montserrat; font-weight:400; word-wrap: break-word;"> 
    Atsisiųk „Barbora“ programėlę, panaudok nuolaidos kodą ir laimėk 50 eurų Makaliaus dovanų kuponą.</div>
</div>
        `;

    tableHTML += '</div>';

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    let fontSize =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonGym'
        ? '14px'
        : '10px';
    let fontWeight =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonGym'
        ? '900'
        : '700';
    let scoreboardText = `
     <div style="width:100%; top: 410px;margin-top:10px; position: absolute; text-align: center; color: white; font-size: 16px; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">ATSISIŲSK PROGRAMĖLĘ</div>
             </div>
                          <div style="width:100%; top: 480px;margin-top:10px; position: absolute; text-align: center; color: white; font-size: 12px; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">
                          <img src=${BarboraAppleStore} href="https://apps.apple.com/lt/app/barbora-lt/id903888629" id='boomio-barbora-apple-store' alt="Image Description" style="cursor:pointer;margin-right:10px;width: 147px; height: 49px;">
                          <img src=${BarboraGoogleStore} href="https://play.google.com/store/apps/details?id=lt.barbora&hl=lt&gl=US&pli=1" id='boomio-barbora-google-store'alt="Image Description" style="cursor:pointer;margin-left:10px;width: 147px; height: 49px;"></div>

             </div>
       
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

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

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';
    // containerDiv.style.border = this.prop === 'Penki Sezonai' && '2px solid #A6CE39';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: 85px; position: absolute; text-align: center; color: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; font-size: 40px; font-family: Montserrat; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${
      this.prop === 'Fpro' ? 'Congrats!' : 'LAIMĖJAI'
    }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
              <div  style="width: calc(100% - 40px); height: ${'280px'}; left: 20px; top: 124px; position: absolute;border-right:none; backdrop-filter: blur(4px)">
              <div >
            <div class="boomio-tbody">
    `;

    containerDiv.innerHTML += `
            </div>
        </div>
      </div>
      <div style="width: calc(100% - 40px);font-weight:700;font-size:16px;margin-left:20px;margin-right:20px;top:575px;position:absolute; height: 46px; text-decoration: underline;color: #FFF;overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-game-play-again">
   ŽAISTI DAR
      </div>

      <div style="left:calc(50% - 40px);width:78px;top:625px;position:absolute;margin-top:5px;height: 22px; background: url(${boomioLogo}); justify-content: center; align-items: center; display: flex;background-size: contain; " >
      </div>
    </div>`;
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
