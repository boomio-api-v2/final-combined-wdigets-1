import { AnimationService, DragElement, localStorageService } from '@/services';
import './styles.css';
import { assignStyleOnElement } from '@/utlis';
const framesList = [
  '/images/iceWidget/step7.png',
  '/images/iceWidget/step6.png',
  '/images/iceWidget/step5.png',
  '/images/iceWidget/step4.png',
  '/images/iceWidget/step3.png',
  '/images/iceWidget/step2.png',
  '/images/iceWidget/step1.png',
];

class IceWidget {
  constructor() {
    this.imagesList = [];
    this.start();
  }

  crashIce = () => {
    const currentImage = this.imagesList.pop();
    assignStyleOnElement(currentImage.style, {
      top: '200px',
      opacity: 0,
    });
    assignStyleOnElement(this.hammer.style, {
      right: 0,
      transform: 'rotate(-40deg)',
      top: '20px',
    });
    setTimeout(() => {
      assignStyleOnElement(this.hammer.style, {
        top: '-60px',
        right: '-150px',
        transform: 'rotate(0deg)',
      });
      currentImage.remove();
    }, 500);
  };

  createHammer() {
    const hammer = document.createElement('img');
    hammer.classList.add('hammer');
    hammer.src = '/images/iceWidget/hammer.png';
    this.container.appendChild(hammer);
    this.hammer = hammer;
  }

  getCoupon() {
    const { p_coupon_text, p_code_text } = localStorageService.config;
    return `
    <div class="product-design-bg-2 p-0 Preview-select box-show qr-div" >
      <div class="coupon__preview__body coupon_discount_modal">   
        <div class="coupon_preview_card_info ">
          <div class="coupon__preview__card coupon_div" id="coupon_div" >
              <div class="coupon_info">
                  <h3>${p_coupon_text}</h3>
                  <p style="text-align: center; margin-top: 8px">${p_code_text} </p>
              </div>
              <div class="coupon__preview__card__after"></div>
              <div class="coupon__preview__card__befor"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  }

  start() {
    const container = document.createElement('div');
    const coupon = document.createElement('div');

    container.setAttribute('id', 'ice-widget');
    coupon.innerHTML = this.getCoupon();
    coupon.classList.add('coupon');

    new AnimationService({
      elem: container,
    });
    new DragElement(container);

    container.onclick = this.crashIce;

    framesList.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.classList.add('frame');
      this.imagesList.push(image);
      container.appendChild(image);
    });
    container.appendChild(coupon);
    this.container = container;
    this.createHammer();
  }
}

export default () => {
  new IceWidget();
};
