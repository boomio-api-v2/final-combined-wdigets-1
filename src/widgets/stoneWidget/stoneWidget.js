import './styles.css';
import { AnimationService, assignStyleOnElement } from '@/services';

const hammerImage = 'https://github.com/kbnvch/bla/blob/main/hammer01.png?raw=true';

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

  onBlockClick = (e) => {
    e.target.remove();
    this.activeBlocks--;
  };

  createContainer() {
    const stoneContainer = document.createElement('div');
    stoneContainer.setAttribute('id', 'stone-container');
    blocks.forEach(({ img, ...styles }) => {
      const blockElem = document.createElement('img');
      blockElem.setAttribute('src', img);
      blockElem.classList.add('block');
      assignStyleOnElement(blockElem.style, { ...styles });
      stoneContainer.appendChild(blockElem);
      blockElem.onclick = this.onBlockClick;
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
    chest.onclick = () => {
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
      hammer.style.left = `${clientX - posx}px`;
      hammer.style.top = `${clientY - posy}px`;
    };
  };
}

export const startStoneWidget = () => {
  new StoneWidget();
};
