import { AnimationService, DragElement, QrCodeModal } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { imagesList, hammerImage, cracksImage } from './constants';
import './styles.css';

class IceWidget {
  constructor() {
    this.isCracksDisplayed = false;
    this.imagesList = [];
    this.start();
  }

  displayCracks = () => {
    if (this.isCracksDisplayed) return;
    const cracksIcon = document.createElement('img');
    cracksIcon.src = cracksImage;
    cracksIcon.classList.add('frame');
    this.widget.appendChild(cracksIcon);
    this.isCracksDisplayed = true;
  };

  crashIce = () => {
    const currentImage = this.imagesList.pop();
    const length = this.imagesList.length;
    if (!length) {
      setTimeout(() => {
        this.widget.remove();
        new QrCodeModal();
      }, 1000);
    }

    assignStyleOnElement(currentImage.style, {
      top: '200px',
      opacity: 0,
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
        right: '-150px',
        transform: 'rotate(40deg)',
      });
      currentImage.remove();
    }, 500);
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
      image.classList.add('frame');
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
  new IceWidget();
};
