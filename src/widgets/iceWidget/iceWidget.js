import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import {
  icePieceCount,
  icePieceImages,
  iceBlockImage,
  icePieceShadowImages,
  shadowTopCoordinatesForDesktop,
  shadowTopCoordinatesForMobile,
  bangImage,
} from './constants';
import boomio from '@/services/boomio';
import { isMobileDevice } from '@/config';
import './styles.css';
import { iceHammerImage } from '@/сonstants';

import { createCloseMoveButtons } from '@/utlis';

class IceWidget {
  constructor() {
    this.showCoupon = false;
    this.icePieces = [];
    this.diplayedIcePieces = 0;
    this.start();
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

  showBangAnimation = () => {
    const bang = document.createElement('img');
    bang.classList.add('boomio-bang');
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
    hammer.classList.add('boomio-hammer');
    hammer.src = iceHammerImage;
    this.widget.appendChild(hammer);
    this.hammer = hammer;
    hammer.addEventListener('load', () => {
      this.createCoupon();
    });
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
    boomio.signal('hammer_click', 'signal', {
      widget_type: 'ice',
    });
    this.showHammerAnimation();
    icePieceImages.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.addEventListener('load', this.onIcePieceLoaded, { once: true });
      image.classList.add('boomio-piece-of-ice');
      this.icePieces.push(image);
      this.widget.appendChild(image);
    });
  };

  createCoupon = () => {
    const coupon = document.createElement('div');
    coupon.classList.add('boomio-coupon-wrapper');
    this.widget.appendChild(coupon);
    coupon.innerHTML = QrCodeModal.getGreyCoupon();
  };

  start = () => {
    const widget = document.createElement('div');
    widget.setAttribute('id', 'ice-widget');

    const iceBlock = document.createElement('img');
    iceBlock.src = iceBlockImage;
    iceBlock.classList.add('boomio-ice-block');
    iceBlock.onclick = this.createPiecesOfIces;
    this.iceBlock = iceBlock;

    widget.appendChild(iceBlock);

    new AnimationService({
      elem: widget,
    });
    new DragElement(widget);

    this.widget = widget;
    iceBlock.addEventListener('load', () => {
      this.createHammer();
    });
    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

    createCloseMoveButtons(widget, widget, isMobile ? [-170, -330] : [-220, -380], true);
  };
}

export default () => {
  const { success } = localStorageService.config;

  if (success || localStorage.getItem('testing_Widgets')) new IceWidget();
  return;
};
