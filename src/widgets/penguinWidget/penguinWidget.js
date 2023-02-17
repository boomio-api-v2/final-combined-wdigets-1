import { AnimationService, DragElement } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { iceBackgroundImage, penguinParams, iceBlocksParams, iceExplosionImage } from './constants';
import { hammerImage } from '@/сonstants';
import './styles.css';

class PenguinWidget {
  constructor() {
    this.start();
  }

  start() {
    const widget = document.createElement('div');
    widget.setAttribute('id', 'penguin-widget');

    const iceBackground = document.createElement('div');
    iceBackground.classList.add('ice-background');
    iceBackground.style.backgroundImage = `url(${iceBackgroundImage})`;

    widget.appendChild(iceBackground);

    const animation = new AnimationService({
      elem: widget,
    });
    const { posx, posy } = animation;

    this.draggeble = new DragElement(widget, { x_position: posx, y_position: posy });
    this.iceBackground = iceBackground;
    this.widget = widget;
    this.addHammerToCursor();
    this.renderBlocksFromArray(penguinParams, 'penguin');
    this.renderBlocksFromArray(iceBlocksParams, 'ice-block', this.onIceBlockClick);
    widget.onclick = this.onIceBlockClick;
  }

  onIceBlockClick = (idx) => (e) => {
    const elem = e.target;
    if (!elem.classList.contains('ice-block')) return;
    elem.src = iceExplosionImage;
    const { fruitImg, moveX, moveY } = iceBlocksParams[idx];

    setTimeout(() => {
      elem.src = fruitImg;
      assignStyleOnElement(elem.style, {
        width: '40px',
        height: '40px',
      });

      setTimeout(() => {
        assignStyleOnElement(
          elem.style,
          {
            left: `${moveX}px`,
            top: `${moveY}px`,
          },
          100,
        );
      });
    }, 500);
  };

  addHammerToCursor = () => {
    const hammer = document.createElement('img');
    hammer.setAttribute('id', 'hammer');
    hammer.setAttribute('src', hammerImage);
    this.widget.appendChild(hammer);
    this.widget.onmousemove = ({ clientX, clientY }) => {
      const { x_position, y_position } = this.draggeble;
      assignStyleOnElement(hammer.style, {
        left: `${clientX - x_position + 5}px`,
        top: `${clientY - y_position + 5}px`,
      });
    };
  };

  renderBlocksFromArray = (array, className, onClick) => {
    array.forEach(({ img, size, x, y }, idx) => {
      const block = document.createElement('img');
      block.classList.add(className);
      block.src = img;
      if (onClick) {
        block.onclick = onClick(idx);
      }
      assignStyleOnElement(block.style, {
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      });
      this.iceBackground.appendChild(block);
    });
  };
}

export default () => {
  new PenguinWidget();
};
