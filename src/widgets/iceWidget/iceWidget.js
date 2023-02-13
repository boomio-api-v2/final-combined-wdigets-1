import { AnimationService, DragElement, localStorageService, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { imagesList, hammerImage, cracksImage } from './constants';
import './styles.css';

class IceWidget {
  constructor() {
    this.isCracksDisplayed = false;
    this.showCoupon = false;
    this.imagesList = [];
    this.start();
  }

  displayCracks = () => {
    if (this.isCracksDisplayed) return;
    const cracksIcon = document.createElement('img');
    cracksIcon.src = cracksImage;
    cracksIcon.classList.add('piece-of-ice');
    this.widget.appendChild(cracksIcon);
    this.isCracksDisplayed = true;
  };

  showQrModal() {
    const length = this.imagesList.length;
    if (length) return;
    this.showCoupon = true;
    setTimeout(() => {
      this.widget.remove();
      new QrCodeModal();
    }, 1000);
  }

  crashIce = () => {
    if (this.showCoupon) return;
    const currentImage = this.imagesList.pop();
    this.showQrModal();

    assignStyleOnElement(currentImage.style, {
      top: '200px',
      opacity: '0',
      transform: 'rotate(-30deg)',
    });
    assignStyleOnElement(this.hammer.style, {
      right: 0,
      transform: 'rotate(-40deg)',
      top: '20px',
    });

    this.displayCracks();

    setTimeout(() => {
      assignStyleOnElement(this.hammer.style, {
        top: '-60px',
        right: '-140px',
        transform: 'rotate(40deg)',
      });
    }, 400);
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

  start = () => {
    const widget = document.createElement('div');
    const coupon = document.createElement('div');

    imagesList.forEach((img) => {
      const image = document.createElement('img');
      image.src = img;
      image.classList.add('piece-of-ice');
      this.imagesList.push(image);
      widget.appendChild(image);
    });

    widget.appendChild(coupon);
    widget.setAttribute('id', 'ice-widget');
    widget.onclick = this.crashIce;

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
