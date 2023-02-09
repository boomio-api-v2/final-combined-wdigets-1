import './styles.css';
import { AnimationService, assignStyleOnElement, DragElement, QrCodeModal } from '@/services';
import { loadImageBeforeUsing } from '@/сonstants';
import {
  hammerImage,
  expolosionOneImage,
  expolosionTwoImage,
  expolosionThreeImage,
  closedChestImage,
  openedChestImage,
} from '@/сonstants/icons';

loadImageBeforeUsing([expolosionOneImage, expolosionTwoImage, expolosionThreeImage]);

const blocks = [
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick1.png?raw=true',
    left: '30px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick2.png?raw=true',
    left: '90px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick3.png?raw=true',
    left: '150px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick5.png?raw=true',
    left: '10px',
    bottom: '80px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick6.png?raw=true',
    left: '70px',
    bottom: '80px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick7.png?raw=true',
    left: '130px',
    bottom: '80px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick8.png?raw=true',
    left: '190px',
    bottom: '80px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick8.png?raw=true',
    left: '10px',
    bottom: '150px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick6.png?raw=true',
    left: '70px',
    bottom: '150px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick3.png?raw=true',
    left: '130px',
    bottom: '150px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick5.png?raw=true',
    left: '190px',
    bottom: '150px',
  },
];

class StoneWidget {
  constructor() {
    this.activeBlocks = 0;
    this.createContainer();
    this.createClosedChestImage();
  }

  animateBlock =
    (e) =>
    ({ img, animation, styles = {}, margin = 100 }) => {
      const { x_position, y_position } = this.draggeble;
      const blockElement = document.createElement('img');
      blockElement.setAttribute('src', img);
      blockElement.classList.add(animation);

      const left = e.clientX - x_position - margin;
      const top = e.clientY - y_position - margin;

      assignStyleOnElement(blockElement.style, {
        left: `${left}px`,
        top: `${top}px`,
        ...styles,
      });
      blockElement.animate({ transform: 'scale(0)' }, { duration: 500, fill: 'forwards' });
      this.stoneContainer.appendChild(blockElement);
    };

  onBlockClick = (e) => {
    const elem = e.target;
    if (!elem.classList.contains('block')) return;
    const animationFunc = this.animateBlock(e);
    animationFunc({
      img: expolosionOneImage,
      animation: 'explosion-one',
      margin: 60,
    });
    animationFunc({
      img: expolosionTwoImage,
      animation: 'explosion-two',
      margin: 85,
    });
    animationFunc({
      img: expolosionThreeImage,
      animation: 'explosion-three',
      margin: 100,
    });
    elem.remove();
    this.activeBlocks--;
  };

  createContainer() {
    const stoneContainer = document.createElement('div');
    stoneContainer.setAttribute('id', 'stone-container');

    const blocksElem = document.createElement('div');
    blocksElem.addEventListener('click', this.onBlockClick);
    blocks.forEach(({ img, ...styles }) => {
      const blockElem = document.createElement('img');
      blockElem.setAttribute('src', img);
      blockElem.classList.add('block');
      assignStyleOnElement(blockElem.style, { ...styles });
      blocksElem.appendChild(blockElem);
      this.activeBlocks++;
    });
    stoneContainer.appendChild(blocksElem);
    this.animation = new AnimationService({
      elem: stoneContainer,
    });
    this.draggeble = new DragElement(stoneContainer);
    this.stoneContainer = stoneContainer;
    this.addHammerToCursor();
  }

  createClosedChestImage = () => {
    const chest = document.createElement('img');
    chest.classList.add('chest');
    chest.setAttribute('src', closedChestImage);
    this.stoneContainer.appendChild(chest);
    chest.onclick = (e) => {
      this.animateBlock(e)({
        img: expolosionOneImage,
        animation: 'explosion-one',
        margin: 60,
      });
      if (this.activeBlocks === 0 && !this.isQrCodeVisible) {
        this.isQrCodeVisible = true;
        chest.setAttribute('src', openedChestImage);
        setTimeout(() => {
          new QrCodeModal();
        }, 600);
      }
    };
    this.chest = chest;
  };

  addHammerToCursor = () => {
    const hammer = document.createElement('img');
    hammer.setAttribute('id', 'hammer');
    hammer.setAttribute('src', hammerImage);
    this.stoneContainer.appendChild(hammer);
    this.stoneContainer.onmousemove = ({ clientX, clientY }) => {
      const { x_position, y_position } = this.draggeble;
      const left = clientX - (x_position ?? this.animation.posx) + 5;
      const top = clientY - (y_position ?? this.animation.posy) + 5;
      hammer.style.left = `${left}px`;
      hammer.style.top = `${top}px`;
    };
  };
}

export const startStoneWidget = () => {
  new StoneWidget();
};
