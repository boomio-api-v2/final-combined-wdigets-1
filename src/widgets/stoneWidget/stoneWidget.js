import './styles.css';
import { AnimationService, assignStyleOnElement } from '@/services';

const hammerImage = 'https://github.com/kbnvch/bla/blob/main/hammer01.png?raw=true';

const mainExplosionImage = 'https://github.com/kbnvch/boomio/blob/main/expl1.png?raw=true';

const closedChestImage = 'https://github.com/kbnvch/boomio/blob/main/chest1.png?raw=true';
const openedChestImage = 'https://github.com/kbnvch/boomio/blob/main/chest3.png?raw=true';

const blocks = [
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick1.png?raw=true',
    left: '10px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick2.png?raw=true',
    left: '70px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick3.png?raw=true',
    left: '130px',
    bottom: '10px',
  },
  {
    img: 'https://github.com/kbnvch/boomio/blob/main/brick4.png?raw=true',
    left: '190px',
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
];

class StoneWidget {
  constructor() {
    this.activeBlocks = 0;
    this.createContainer();
    this.createClosedChestImage();
  }

  showExplosionAnimation = ({ clientX, clientY }) => {
    const { posx, posy } = this.animation;
    const animation = document.createElement('img');
    animation.setAttribute('src', mainExplosionImage);
    animation.classList.add('explosion-animation');
    assignStyleOnElement(animation.style, {
      left: `${clientX - posx - 100}px`,
      top: `${clientY - posy - 100}px`,
    });
    this.stoneContainer.appendChild(animation);
    animation.animate({ transform: 'scale(0)' }, { duration: 400, fill: 'forwards' });
  };

  onBlockClick = (e) => {
    const elem = e.target;
    if (!elem.classList.contains('block')) return;
    this.showExplosionAnimation(e);
    elem.remove();
    this.activeBlocks--;
  };

  createContainer() {
    const stoneContainer = document.createElement('div');
    stoneContainer.setAttribute('id', 'stone-container');
    stoneContainer.addEventListener('click', this.onBlockClick);
    blocks.forEach(({ img, ...styles }) => {
      const blockElem = document.createElement('img');
      blockElem.setAttribute('src', img);
      blockElem.classList.add('block');
      assignStyleOnElement(blockElem.style, { ...styles });
      stoneContainer.appendChild(blockElem);
      this.activeBlocks++;
    });
    this.animation = new AnimationService({
      elem: stoneContainer,
    });
    this.stoneContainer = stoneContainer;
    this.addHammerToCursor();
  }

  createClosedChestImage = () => {
    const chest = document.createElement('img');
    chest.classList.add('chest');
    chest.setAttribute('src', closedChestImage);
    this.stoneContainer.appendChild(chest);
    chest.onclick = (e) => {
      this.showExplosionAnimation(e);
      if (this.activeBlocks === 0) {
        chest.setAttribute('src', openedChestImage);
      }
    };
    this.chest = chest;
  };

  addHammerToCursor = () => {
    const { posx, posy } = this.animation;
    const hammer = document.createElement('img');
    hammer.setAttribute('id', 'hammer');
    hammer.setAttribute('src', hammerImage);
    this.stoneContainer.appendChild(hammer);
    this.stoneContainer.onmousemove = ({ clientX, clientY }) => {
      hammer.style.left = `${clientX - posx + 5}px`;
      hammer.style.top = `${clientY - posy + 5}px`;
    };
  };
}

export const startStoneWidget = () => {
  new StoneWidget();
};
