import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import {
  icePieceCount,
  imagesList,
  hammerImage,
  iceBlockImage,
  shadowImages,
  shadowTopCoordinates,
  bangImage,
} from './constants';
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
      top: '-20px',
    });

    setTimeout(() => {
      this.showBangAnimation();
      assignStyleOnElement(this.hammer.style, {
        top: '-60px',
        right: '-140px',
        transform: 'rotate(40deg)',
      });
    }, 400);
  };

  crashIce = () => {
    if (this.showCoupon) return;
    const currentImage = this.icePieces.pop();

    const shadowIndex = icePieceCount - this.icePieces.length;
    currentImage.src = shadowImages[shadowIndex];

    if (shadowIndex !== 0) {
      this.showHammerAnimation();
    }

    currentImage.addEventListener(
      'load',
      () => {
        this.showQrModal();
        const top = shadowTopCoordinates[shadowIndex];

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

  checkAreAllIcePiecesLoaded = () => {
    if (this.diplayedIcePieces === icePieceCount) {
      this.iceBlock.remove();
      this.crashIce();
      this.widget.onclick = this.crashIce;
      return;
    }

    this.diplayedIcePieces++;
  };

  createPiecesOfIces = () => {
    this.showHammerAnimation();
    imagesList.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.addEventListener('load', this.checkAreAllIcePiecesLoaded, { once: true });
      image.classList.add('piece-of-ice');
      this.icePieces.push(image);
      this.widget.appendChild(image);
    });
  };

  start = () => {
    const widget = document.createElement('div');
    const coupon = document.createElement('div');

    const iceBlock = document.createElement('img');
    iceBlock.src = iceBlockImage;
    iceBlock.classList.add('ice-block');
    iceBlock.onclick = this.createPiecesOfIces;
    this.iceBlock = iceBlock;

    widget.appendChild(iceBlock);
    widget.appendChild(coupon);
    widget.setAttribute('id', 'ice-widget');

    coupon.innerHTML = QrCodeModal.getCoupon();
    coupon.classList.add('coupon');

    new AnimationService({
      elem: widget,
    });
    new DragElement(widget);

    this.widget = widget;
    this.createHammer();
  };
}

export default () => {
  const { success } = localStorageService.config;
  if (!success) return;
  new IceWidget();
};
