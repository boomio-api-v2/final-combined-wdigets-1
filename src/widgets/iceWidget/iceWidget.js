import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import {
  icePieceCount,
  icePieceImages,
  hammerImage,
  iceBlockImage,
  icePieceShadowImages,
  shadowTopCoordinatesForDesktop,
  shadowTopCoordinatesForMobile,
  bangImage,
  couponImage,
} from './constants';
import boomio from '@/services/boomio';
import { isMobileDevice } from '@/config';
import './styles.css';

class IceWidget {
  constructor() {
    this.showCoupon = false;
    this.icePieces = [];
    this.diplayedIcePieces = 0;
    this.start();
  }

  showQrModal() {
    const length = this.icePieces.length;
    if (length) return;
    this.showCoupon = true;
    setTimeout(() => {
      this.widget.remove();
      new QrCodeModal();
    }, 1000);
  }

  showBangAnimation = () => {
    const bang = document.createElement('img');
    bang.classList.add('bang');
    bang.src = bangImage;
    this.widget.appendChild(bang);
    setTimeout(() => {
      bang.remove();
    }, 200);
  };

  showHammerAnimation = () => {
    assignStyleOnElement(this.hammer.style, {
      right: 0,
      transform: 'rotate(-50deg)',
      top: `${isMobileDevice ? 10 : -20}px`,
    });

    setTimeout(() => {
      this.showBangAnimation();
      assignStyleOnElement(this.hammer.style, {
        top: `${isMobileDevice ? -30 : -60}px`,
        right: `${isMobileDevice ? -60 : -140}px`,
        transform: 'rotate(40deg)',
      });
    }, 400);
  };

  crashIce = () => {
    if (this.showCoupon) return;
    const currentImage = this.icePieces.pop();

    const shadowIndex = icePieceCount - this.icePieces.length;
    currentImage.src = icePieceShadowImages[shadowIndex];

    if (shadowIndex !== 0) {
      this.showHammerAnimation();
    }

    currentImage.addEventListener(
      'load',
      () => {
        this.showQrModal();
        const coordinates = isMobileDevice
          ? shadowTopCoordinatesForMobile
          : shadowTopCoordinatesForDesktop;
        const top = coordinates[shadowIndex];

        assignStyleOnElement(currentImage.style, {
          top: `${top}px`,
          opacity: '0',
          transform: 'rotate(-30deg)',
        });

        setTimeout(() => {
          currentImage.remove();
        }, 4000);
      },
      { once: true },
    );
  };

  createHammer = () => {
    const hammer = document.createElement('img');
    hammer.classList.add('hammer');
    hammer.src = hammerImage;
    this.widget.appendChild(hammer);
    this.hammer = hammer;
  };

  onIcePieceLoaded = () => {
    if (this.diplayedIcePieces === icePieceCount) {
      this.iceBlock.remove();
      this.crashIce();
      this.widget.onclick = this.crashIce;
      return;
    }

    this.diplayedIcePieces++;
  };

  createPiecesOfIces = () => {
    boomio.signal('hammer_click');
    this.showHammerAnimation();
    icePieceImages.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.addEventListener('load', this.onIcePieceLoaded, { once: true });
      image.classList.add('piece-of-ice');
      this.icePieces.push(image);
      this.widget.appendChild(image);
    });
  };

  createCoupon = () => {
    const { p_coupon_text, p_code_text } = localStorageService.config;
    const coupon = document.createElement('div');
    coupon.style.backgroundImage = `url(${couponImage})`;
    coupon.classList.add('coupon');
    this.widget.appendChild(coupon);
    coupon.innerHTML = `
      <div class="coupon_info">
          <h3>${p_coupon_text}</h3>
          <p style="text-align: center; margin-top: 8px">${p_code_text} </p>
      </div>`;
  };

  start = () => {
    const widget = document.createElement('div');
    widget.setAttribute('id', 'ice-widget');

    const iceBlock = document.createElement('img');
    iceBlock.src = iceBlockImage;
    iceBlock.classList.add('ice-block');
    iceBlock.onclick = this.createPiecesOfIces;
    this.iceBlock = iceBlock;

    widget.appendChild(iceBlock);

    new AnimationService({
      elem: widget,
    });
    new DragElement(widget);

    this.widget = widget;
    this.createCoupon();
    this.createHammer();
  };
}

export default () => {
  const { success } = localStorageService.config;
  if (!success) return;
  new IceWidget();
};
