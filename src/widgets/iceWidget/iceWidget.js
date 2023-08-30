import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';

import { assignStyleOnElement, createCloseMoveButtons } from '@/utlis';

import {
  icePieceCount,
  icePieceImages,
  iceBlockImage,
  icePieceShadowImages,
  shadowTopCoordinatesForDesktop,
  shadowTopCoordinatesForMobile,
  bangImage,
} from './constants';

import { iceHammerImage } from '@/сonstants';

import boomio from '@/services/boomio';
import { isMobileDevice } from '@/config';

import './styles.css';

class IceWidget {
  constructor() {
    this.showCoupon = false;
    this.icePieces = [];
    this.displayedIcePieces = 0;
    this.createWidget();
  }

  createWidget() {
    this.widget = document.createElement('div');
    this.widget.setAttribute('id', 'boomio-ice-widget');

    this.createIceBlock();
    this.initializeAnimations();

    console.log('asdasd');

    document.body.appendChild(this.widget);
  }

  createIceBlock() {
    this.iceBlock = document.createElement('img');
    this.iceBlock.src = iceBlockImage;
    this.iceBlock.classList.add('boomio-ice-block');
    this.iceBlock.addEventListener('load', () => {
      this.createHammer();
    });
    this.iceBlock.onclick = () => {
      this.createPiecesOfIce();
    };
    this.widget.appendChild(this.iceBlock);
  }

  initializeAnimations() {
    new AnimationService({
      elem: this.widget,
    });
    new DragElement(this.widget);
  }

  createHammer() {
    this.hammer = document.createElement('img');
    this.hammer.classList.add('boomio-hammer');
    this.hammer.src = iceHammerImage;
    this.createCoupon();
    this.widget.appendChild(this.hammer);
  }

  createPiecesOfIce() {
    boomio.signal('hammer_click');
    this.showHammerAnimation();
    icePieceImages.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.addEventListener(
        'load',
        () => {
          this.onIcePieceLoaded(image);
        },
        { once: true },
      );
      image.classList.add('boomio-piece-of-ice');
      this.icePieces.push(image);
      this.widget.appendChild(image);
    });
  }

  onIcePieceLoaded(image) {
    this.displayedIcePieces++;

    if (this.displayedIcePieces === icePieceCount) {
      this.iceBlock.remove();
      this.crashIce();
      this.widget.onclick = () => {
        this.crashIce();
      };
    }
  }

  showHammerAnimation() {
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
  }

  showBangAnimation() {
    const bang = document.createElement('img');
    bang.classList.add('boomio-bang');
    bang.src = bangImage;
    this.widget.appendChild(bang);
    setTimeout(() => {
      bang.remove();
    }, 200);
  }

  crashIce() {
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
  }

  showQrModal() {
    const length = this.icePieces.length;
    if (length || this.showCoupon) return;
    this.showCoupon = true;
    setTimeout(() => {
      this.widget.remove();
      new QrCodeModal();
    }, 1000);
  }

  createCoupon() {
    const coupon = document.createElement('div');
    coupon.classList.add('boomio-coupon-wrapper');
    this.widget.appendChild(coupon);
    coupon.innerHTML = QrCodeModal.getGreyCoupon();
    createCloseMoveButtons(this.widget);
  }
}

export default () => {
  const { success } = localStorageService.config;

  if (success || localStorage.getItem('testing_Widgets')) {
    new IceWidget();
  }
};
