import {
  addStylesToHtml,
  assignStyleOnElement,
  localStorageService,
} from './index';

const defaultProps = {
  posx: 0,
  posy: 0,
  size: 100,
  parent: document.body,
  styles: {},
};

export default class AnimationService {
  constructor({
    posx = 0,
    posy = 0,
    size = 100,
    parent = document.body,
    elem = document.createElement('div'),
    styles = {},
  } = defaultProps) {
    this.config = localStorageService.getDefaultConfig();

    this.clearPrev();
    const { animation } = this.config;
    const animFunc = this.getAnimateFunction(animation);

    elem.classList.add('boomio--animation__wrapper');
    elem.classList.add('boomio--animation__wrapper--initial');
    parent.appendChild(elem);

    const duration = '1000ms';
    const easing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

    assignStyleOnElement(elem.style, styles);

    const initialPosition = {
      x: elem.clientWidth + parseInt(posy, 10),
      nx: -1 * (elem.clientWidth + parseInt(posy, 10)),
      y: elem.clientHeight + parseInt(posx, 10),
      ny: -1 * (elem.clientHeight + parseInt(posx, 10)),
    };

    const css = `
		.boomio--animation__wrapper {
			text-align: center;
			position: fixed;
			z-index: 999999999999;
			left: ${posx}px;
			top: ${posy}px;
			visibility: visible;
			background-size: cover;
			opacity: 1;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
		}
 
		.boomio--animation__wrapper--initial {
			width: ${size}px;
			cursor: pointer;
			transition: transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
			animation-duration: ${duration};
			animation-timing-function: ${easing};
			animation-iteration-count: 1;
		}

		@keyframes boomio-animate--lightSpeedInLeft {
			from {
				transform: translate3d(${initialPosition.nx}px, 0, 0) skewX(30deg);
				opacity: 0;
			}
		
			60% {
				transform: skewX(-20deg);
				opacity: 1;
			}
		
			80% {
				transform: skewX(5deg);
			}
		
			to {
				transform: translate3d(0, 0, 0);
			}
		}
	

		@keyframes boomio-animate--moveRight {
			0% {
				transform: translateX(${initialPosition.nx}px);
			}
			100% {
				transform: translateX(0);
			}
		}

		@keyframes boomio-animate--moveLeft {
			0% {
				transform: translateX(${initialPosition.x}px);
			}
			100% {
				transform: translateX(0);
			}
		}

		@keyframes boomio-animate--moveDown {
			0% {
				transform: translateY(${initialPosition.ny}px);
			}
			100% {
				transform: translateY(0);
			}
		}
		
		@keyframes boomio-animate--moveUp {
			0% {
				transform: translateY(${initialPosition.y}px);
			}
			100% {
				transform: translateY(0);
			}
		}


		
		@keyframes boomio-animate--moveDiagonalDown {
			0% {
				transform: translate(${initialPosition.nx}px, ${initialPosition.ny}px);
			}
			100% {
				transform: translate(0, 0);
			}
		}
		
		@keyframes boomio-animate--moveDiagonalUp {
			0% {
				transform: translate(${initialPosition.nx}px, ${initialPosition.y}px);
			}
			100% {
				transform: translate(0, 0);
			}
		}
		`;

    addStylesToHtml(css);
    animFunc(elem);
    return elem;
  }

  clearPrev() {
    document.getElementById('boomio--stylesheet')?.remove();
  }

  getAnimateFunction = (nr) => {
    const animate = (animation) => (el) => {
      el.classList.add(`boomio--animation--${animation}`);
    };
    const animArr = [
      animate('moveRight'),
      animate('moveLeft'),
      animate('moveDown'),
      animate('moveUp'),
      animate('fadeIn'),
      animate('moveDiagonalDown'),
      animate('rotateRight'),
      animate('zoomIn'),
      animate('skewLeft'),
      animate('moveDiagonalUp'),
      animate('tada'),
      animate('lightSpeedInLeft'),
      animate('rollIn'),
    ];

    return animArr[nr - 1];
  };
}
