import { QRCode } from 'exports-loader?type=commonjs&exports=QRCode!../../qrcode.min.js';
import { boomioService, localStorageService, widgetHtmlService } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { closeImage, dotImage, oldCouponImage, winningAnimationGif } from '@/сonstants/icons';
import { exitBtnHtml } from '@/сonstants/htmlTemplates';
import './styles.css';

const likeBtnImage =
  'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/985a91f0065a9dbca7375cdbac92c24d88508c2b/images/like.svg';
const disLikeBtnImage =
  'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/985a91f0065a9dbca7375cdbac92c24d88508c2b/images/dislike.svg';

export default class {
  constructor() {
    this.mainContainer = widgetHtmlService.container;
    this.updateConfigData();
    this.showQrCode();
    this.showWinningAnimation();
  }

  showQrCode = () => {
    this.showQRDesktop();
    this.showSpinner();
    this.loadQrCodeData();
  };

  showSpinner = () => {
    const qrcodeShowDiv = document.querySelector('#qrcodeShow');
    qrcodeShowDiv.style.display = 'none';
    const spinnerDiv = document.querySelector('#qr_loader_spinner .spinner');
    if (spinnerDiv) {
      spinnerDiv.classList.add('show');
    }
  };

  hideSpinner = () => {
    const qrcodeShowDiv = document.querySelector('#qrcodeShow');
    qrcodeShowDiv.style.display = 'block';
    const element = document.getElementById('qr_loader_spinner');
    if (element) {
      element.remove();
    }
  };

  updateConfigData = () => {
    this.config = localStorageService.config;
  };

  async loadQrCodeData() {
    try {
      this.loading = true;
      this.updateConfigData();
      await boomioService.signal('PUZZLE_CODE_REVEALED', 'signal');
      this.showFinalData(); // Show the final data after the request is finished
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  }

  showFinalData() {
    this.hideSpinner();

    this.loading = false;
    this.updateConfigData();

    const p_coupon_text_line1 = document.getElementById('p_coupon_text_line1');
    const p_coupon_text_line2 = document.getElementById('p_coupon_text_line2');
    const p_code_text = document.getElementById('p_code_text');
    const p_bottom_text_start_pc = document.getElementById('p_bottom_text_start_pc');
    const p_top_text = document.getElementById('p_top_text');
    const p_bottom_text_start_m = document.getElementById('p_bottom_text_start_m');
    const p_button_text_line1 = document.getElementById('p_button_text_line1');
    const p_button_text_line2 = document.getElementById('p_button_text_line2');
    var p_bottom_text_end_pc = document.getElementById('p_bottom_text_end_pc');
    var p_bottom_text_end_m = document.getElementById('p_bottom_text_end_m');
    // Check if p_coupon_text_line1 element exists and is not null
    if (p_coupon_text_line1) {
      p_coupon_text_line1.textContent = this.config?.p_coupon_text_line1;
    }

    // Check if p_coupon_text_line2 element exists and is not null
    if (p_coupon_text_line2) {
      p_coupon_text_line2.textContent = this.config?.p_coupon_text_line2;
    }

    // Check if p_code_text element exists and is not null
    if (p_code_text) {
      p_code_text.textContent = this.config?.p_code_text;
    }

    // Check if p_bottom_text_start_pc element exists and is not null
    if (p_bottom_text_start_pc) {
      p_bottom_text_start_pc.textContent = this.config?.p_bottom_text_start_pc;
    }

    // Check if p_top_text element exists and is not null
    if (p_top_text) {
      p_top_text.textContent = this.config?.p_top_text;
    }

    // Check if p_bottom_text_start_m element exists and is not null
    if (p_bottom_text_start_m) {
      p_bottom_text_start_m.textContent = this.config?.p_bottom_text_start_m;
    }

    // Check if p_button_text_line1 element exists and is not null
    if (p_button_text_line1) {
      p_button_text_line1.textContent = this.config?.p_button_text_line1;
    }

    // Check if p_button_text_line2 element exists and is not null
    if (p_button_text_line2) {
      p_button_text_line2.textContent = this.config.p_button_text_line2;
    }

    // Check if p_bottom_text_end_pc element exists and is not null
    if (p_bottom_text_end_pc) {
      p_bottom_text_end_pc.innerHTML = this.config.p_bottom_text_end_pc;
    }

    // Check if p_bottom_text_end_m element exists and is not null
    if (p_bottom_text_end_m) {
      p_bottom_text_end_m.innerHTML = this.config.p_bottom_text_end_m;
    }
  }

  closeAnimation = (callback) => () => {
    assignStyleOnElement(this.modal.style, {
      transformOrigin: '100% 100%',
      transform: 'scale(0)',
    });
    this.modal.addEventListener('transitionend', () => {
      this.modalBackground.remove();
      if (callback) {
        callback();
      }
    });
  };

  showWinningAnimation = () => {
    setTimeout(() => {
      const winningAnimation = document.createElement('img');
      winningAnimation.classList.add('winningAnimation');
      winningAnimation.setAttribute('src', winningAnimationGif);
      this.mainContainer.appendChild(winningAnimation);
      winningAnimation.addEventListener('load', () => {
        setTimeout(() => {
          winningAnimation.remove();
        }, 3000);
      });
    }, 100);
  };

  closeModal = () => {
    this.modalBackground.remove();
  };

  showRatingModal = () => {
    this.createModalWindow(296, 154);
    const textTitle = document.createElement('p');
    textTitle.classList.add('exist-or-saving-modal-title');
    textTitle.innerHTML = 'Are you sure you want to exit without saving the reward?';
    this.modal.appendChild(textTitle);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal-buttons');

    const likeBtn = document.createElement('img');
    likeBtn.setAttribute('src', likeBtnImage);

    const yesBtn = document.createElement('button');
    yesBtn.onclick = this.onModalClickBtnWithCommand('well_yes');
    yesBtn.classList.add('yes-button');
    yesBtn.innerHTML = 'Yes!';
    yesBtn.appendChild(likeBtn);

    const dislikeBtn = document.createElement('img');
    dislikeBtn.setAttribute('src', disLikeBtnImage);

    const noBtn = document.createElement('button');
    noBtn.onclick = this.onModalClickBtnWithCommand('well_no');
    noBtn.classList.add('no-button');
    noBtn.innerHTML = 'No!';
    noBtn.appendChild(dislikeBtn);

    buttonContainer.appendChild(yesBtn);
    buttonContainer.appendChild(noBtn);

    this.modal.appendChild(buttonContainer);
  };

  showSavingOrExitModal = () => {
    this.createModalWindow(296, 154);

    const textTitle = document.createElement('p');
    textTitle.classList.add('exist-or-saving-modal-title');
    textTitle.innerHTML = 'Are you sure you want to exit without saving the reward?';

    const saveBtn = document.createElement('button');
    saveBtn.onclick = () => {
      boomioService.signal('exit_yes');
      this.closeModal();
      this.showQrCode();
    };
    saveBtn.classList.add('save');
    saveBtn.innerHTML = 'Save';

    const exitBtn = document.createElement('div');
    exitBtn.onclick = () => {
      boomioService.signal('exit_cancel');
      this.closeModal();
      // this.showRatingModal();
    };
    exitBtn.style.cursor = 'pointer';
    exitBtn.innerHTML = exitBtnHtml;
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal-buttons');
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(exitBtn);

    this.modal.appendChild(textTitle);
    this.modal.appendChild(buttonContainer);
  };

  getCloseModalBtn = (closeCallback) => {
    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.classList.add('close-modal-btn-wrapper');
    const closeBtn = document.createElement('img');
    closeBtn.src = closeImage;
    closeBtn.classList.add('close-modal-btn');
    closeBtn.onclick = closeCallback;
    closeBtnWrapper.appendChild(closeBtn);
    return closeBtnWrapper;
  };

  onModalClickBtnWithCommand = (command) => () => {
    boomioService.signal(command);
    this.closeModal();
  };

  static getGreyCoupon = () => {
    this.config = localStorageService.config;
    return `
        <div class="coupon-grey-shadow-wrapper" id="coupon_div">
          <div class="coupon-grey" style="background-image: url(${oldCouponImage})">
            <div class="coupon_info">
                <h3 >${this.config.p_coupon_text_line1}</h3>
                <h4 >${this.config.p_coupon_text_line2}</h1>
              <p >${this.config.p_code_text} </p>
            </div>
          </div>
        </div>
        `;
  };

  getCouponHtml = () => {
    if (this.config.widget_Type === 'ice') {
      return QrCodeModal.getGreyCoupon();
    }
    return `
       <div class="coupon__preview__card coupon_div" id="coupon_div" >
          <div class="coupon_info"> 
                <h3 id="p_coupon_text_line1">${this.config.p_coupon_text_line1}</h3>
                <h4 id="p_coupon_text_line2">${this.config.p_coupon_text_line2}</h4>
              <p id="p_code_text" style="text-align: center; margin-top: 8px; font-weight: 600; font-size: 12px">${this.config.p_code_text} </p>
          </div>
          <div class="coupon__preview__card__after"></div>
          <div class="coupon__preview__card__befor"></div>
      </div>`;
  };

  showQRDesktop = () => {
    this.createModalWindow(272, 520);

    this.modal.classList.add('desktop-qr-modal');
    this.modal.innerHTML = `
    <div class="close-modal-btn-wrapper">
      <img src="${closeImage}" id="close-modal-btn" class="close-modal-btn"/>
    </div>
    <div class="coupon__preview__card__header text-center d-block">
        <h1 id='p_top_text'>${this.config.p_top_text} </h1>
    </div>
    ${this.getCouponHtml()}
    <div style='font-size:14px;'>
    <p style="line-height:14px !important;color: black; font-weight: 400; display: inline;font-size: 14px;" id="p_bottom_text_start_pc">${
      this.config.p_bottom_text_start_pc
    }
    <p style="line-height:14px !important;color: black; font-weight: 600; display: inline; font-size: 14px;" >${
      this.config.p_bottom_text_end_pc
    }</p></p></div>
    <div id='qrcodeShow'>
        <a class="qrcodeShowHtml" id="qrcodeShowHtml"> </a>
    </div>
    <div id='qr_loader_spinner'>
    <div class="spinner"></div>
  </div>
    `;
    new QRCode('qrcodeShowHtml', {
      text: this.config.qrcode,
      width: 100,
      height: 100,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });

    document.getElementById('close-modal-btn').onclick = () => {
      this.modalBackground.remove();
      this.showSavingOrExitModal();
    };
  };

  showQRCodeMobile = () => {
    this.createModalWindow(272, 442);
    const { qrcode } = localStorageService.config;
    const qrEl = document.createElement('div');

    qrEl.setAttribute('id', 'boomio--qr');

    qrEl.innerHTML = this.qrCodeInnerHtml();

    const closeAnimation = this.closeAnimation(this.showSavingOrExitModal);

    const closeModalBtn = this.getCloseModalBtn(closeAnimation);

    this.modal.appendChild(closeModalBtn);
    this.modal.append(qrEl);

    new QRCode('qrcodeShowHtml', {
      text: qrcode,
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
    const coupon = document.getElementById('coupon_div');
    const qrcodeShow = document.getElementById('qrcodeShow');
    qrcodeShow.style.display = 'block';
    coupon.style.display = 'none';

    qrcodeShow.onclick = () => {
      coupon.style.display = 'block';
      qrcodeShow.style.display = 'none';
    };
    coupon.onclick = () => {
      qrcodeShow.style.display = 'block';
      coupon.style.display = 'none';
    };
  };

  createModalWindow = (width = 300, height = 442) => {
    /// /Add modal Background //////
    const modalBackground = document.createElement('div');
    modalBackground.setAttribute('id', 'modalBackground');
    /// //////////////////////

    /// /////Add modal ///////
    const modal = document.createElement('div');
    modal.setAttribute('id', 'widgetModal');
    assignStyleOnElement(modal.style, {
      width: `${width}px`,
      height: `${height}px`,
      transform: 'scale(1)',
    });
    modalBackground.appendChild(modal);
    this.mainContainer.appendChild(modalBackground);
    this.modal = modal;
    this.modalBackground = modalBackground;
    /// /////////////////////////
  };

  qrCodeInnerHtml = () => {
    return `<div class="product-design-bg-2 p-0 Preview-select box-show qr-div" >
    
        <div class="coupon__preview__body coupon_discount_modal">
    
            <div class="coupon__preview__card__header text-center d-block">
                <h1 id='p_top_text'>${this.config.p_top_text}</h1>
            </div>
    
            <div class="coupon_preview_card_info ">
                <div id='qrcodeShow' style="display:none">
                    <a class="qrcodeShowHtml" id="qrcodeShowHtml"> </a>
                </div>
                ${this.getCouponHtml()}
            </div>
            <div style='font-size:14px;'>
                <p class="coupon-text" id='p_bottom_text_start_m' style='line-height:14px !important;'>  
                  ${this.config.p_bottom_text_start_m}
                  <p style="line-height:14px !important;color: black; font-weight: 600; display: inline; font-size: 14px;"  id='p_bottom_text_end_m'>${
                    this.config.p_bottom_text_end_m
                  }</p>
                </p></div>
                            <div class="coupon_preview_card_footer">
    
                <a href=${this.config.app_url}>
                <div class="btn-content d-flex align-items-center justify-content-center" style="height: 46px;">
                    <img src="${dotImage}" alt="img not find">               
                      <div class="text-wrapper" >                   
                        <p style="font-size: 10px; line-height: initial;" id='p_button_text_line1'>${
                          this.config.p_button_text_line1
                        }</p>
                        <p style="font-size: 14px; line-height: initial;" id='p_button_text_line2'>${
                          this.config.p_button_text_line2
                        }</p>
                      </div>
                </div>
                </a>
        
            </div>
        </div>
    </div>`;
  };
}
