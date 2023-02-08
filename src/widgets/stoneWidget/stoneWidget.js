import './styles.css';
import { AnimationService, assignStyleOnElement, DragElement } from '@/services';

const hammerImage = 'https://github.com/kbnvch/bla/blob/main/hammer01.png?raw=true';

const mainExplosionImage = 'https://github.com/kbnvch/boomio/blob/main/expl1.png?raw=true';
const сrashBlockAnimation = 'https://github.com/kbnvch/boomio/blob/main/expl2.png?raw=true';
const cloudAnimationImage = 'https://github.com/kbnvch/boomio/blob/main/expl5.png?raw=true';

const closedChestImage = 'https://github.com/kbnvch/boomio/blob/main/chest1.png?raw=true';
const openedChestImage = 'https://github.com/kbnvch/boomio/blob/main/chest3.png?raw=true';

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

  showExplosionAnimation = ({ clientX, clientY }) => {
    const { x_position, y_position } = this.draggeble;
    const animation = document.createElement('img');
    animation.setAttribute('src', mainExplosionImage);
    animation.classList.add('explosion-animation');
    assignStyleOnElement(animation.style, {
      left: `${clientX - x_position - 100}px`,
      top: `${clientY - y_position - 100}px`,
    });
    this.stoneContainer.appendChild(animation);
    animation.animate({ transform: 'scale(0)' }, { duration: 400, fill: 'forwards' });
  };

  showCloudAnimation = (e) => () => {
    const { x_position, y_position } = this.draggeble;
    const cloudAnimation = document.createElement('img');
    cloudAnimation.setAttribute('src', cloudAnimationImage);
    cloudAnimation.classList.add('cloud-animation');
    assignStyleOnElement(cloudAnimation.style, {
      left: `${e.clientX - x_position - 65}px`,
      top: `${e.clientY - y_position - 65}px`,
    });

    this.stoneContainer.appendChild(cloudAnimation);
    setTimeout(() => {
      cloudAnimation.remove();
    }, 1200);
  };

  showCrashBlockAnimation = (e) => {
    const { x_position, y_position } = this.draggeble;
    const animation = document.createElement('img');
    animation.setAttribute('src', сrashBlockAnimation);
    animation.classList.add('crash-block-animation');
    assignStyleOnElement(animation.style, {
      left: `${e.clientX - x_position - 65}px`,
      top: `${e.clientY - y_position - 65}px`,
    });
    this.stoneContainer.appendChild(animation);
    animation.animate({ transform: 'scale(0)' }, { duration: 500, fill: 'forwards' });
    setTimeout(this.showCloudAnimation(e), 500);
  };

  onBlockClick = (e) => {
    const elem = e.target;
    if (!elem.classList.contains('block')) return;
    this.showExplosionAnimation(e);
    this.showCrashBlockAnimation(e);
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
      this.showExplosionAnimation(e);
      if (this.activeBlocks === 0) {
        chest.setAttribute('src', openedChestImage);
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
