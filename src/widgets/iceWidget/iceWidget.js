import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { imagesList, hammerImage, iceBlockImage } from './constants';
import './styles.css';

class IceWidget {
  constructor() {
    this.showCoupon = false;
    this.imagesList = [];
    this.diplayedIcePieces = 0;
    this.start();
  }

  showQrModal() {
    const length = this.imagesList.length;
    if (length) return;
    this.showCoupon = true;
    setTimeout(() => {
      this.widget.remove();
      new QrCodeModal();
    }, 1000);
  }

  showHammerAnimation = () => {
    assignStyleOnElement(this.hammer.style, {
      right: 0,
      transform: 'rotate(-40deg)',
      top: '20px',
    });

    setTimeout(() => {
      assignStyleOnElement(this.hammer.style, {
        top: '-60px',
        right: '-140px',
        transform: 'rotate(40deg)',
      });
    }, 400);
  };

  crashIce = () => {
    if (this.showCoupon) return;
    const currentImage = this.imagesList.pop();
    this.showQrModal();
    this.showHammerAnimation();

    assignStyleOnElement(currentImage.style, {
      top: '200px',
      opacity: '0',
      transform: 'rotate(-30deg)',
    });

    setTimeout(() => {
      currentImage.remove();
    }, 1200);
  };

  createHammer = () => {
    const hammer = document.createElement('img');
    hammer.classList.add('hammer');
    hammer.src = hammerImage;
    this.widget.appendChild(hammer);
    this.hammer = hammer;
  };

  checkAreAllIcePiecesLoaded = () => {
    if (this.diplayedIcePieces === 5) {
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
      image.addEventListener('load', this.checkAreAllIcePiecesLoaded);
      image.classList.add('piece-of-ice');
      this.imagesList.push(image);
      this.widget.appendChild(image);
    });
  };

  start = () => {
    const widget = document.createElement('div');
    const coupon = document.createElement('div');

    const iceBlock = document.createElement('img');
    iceBlock.src = iceBlockImage;
    iceBlock.classList.add('ice-block');
    this.iceBlock = iceBlock;
    iceBlock.onclick = this.createPiecesOfIces;

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
