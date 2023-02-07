import {
  boomioService,
  localStorageService,
  DragElement,
  AnimationService,
  assignStyleOnElement,
  QrCodeModal,
} from '../../services';
import {
  isMobileDevice,
} from '../../config';

const frameSvg = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/DK/development/new-puzzle-widget-ui/images/puzzle/frame.png?raw=true';

/// ///// Services ////////
/// //////////////////////
const puzzlesCoordinateForMobile = [{
  top: 0,
  left: 0,
  width: '49.84px',
  height: '61.33px',
},
{
  top: 0,
  left: 37,
  width: '60.3px',
  height: '50.86px',
},
{
  top: 49,
  left: 0,
  width: '61.3px',
  height: '47.86px',
},
{
  top: 44,
  left: 62,
  width: '50.84px',
  height: '63.3px',
},
];

const puzzlesCoordinateForDesktop = [{
  top: 0,
  left: 0,
  width: '89.84px',
  height: '112.33px',
},

{
  top: 0,
  left: 67,
  width: '112.3px',
  height: '89.86px',
},
{
  top: 87,
  left: 0,
  width: '112.3px',
  height: '89.86px',
},
{
  top: 64,
  left: 89,
  width: '89.84px',
  height: '112.33px',
},
];

const puzzlesCoordinate = isMobileDevice
  ? puzzlesCoordinateForMobile
  : puzzlesCoordinateForDesktop;
const puzzleImagesList = [
  'https://github.com/boomio-api-v2/puzzle-widget-styles/blob/main/img/puzzle-1.png?raw=true',
  'https://github.com/boomio-api-v2/puzzle-widget-styles/blob/main/img/puzzle-2.png?raw=true',
  'https://github.com/boomio-api-v2/puzzle-widget-styles/blob/main/img/puzzle-3.png?raw=true',
  'https://github.com/boomio-api-v2/puzzle-widget-styles/blob/main/img/puzzle-4.png?raw=true',
];

const puzzleWidgetSize = isMobileDevice ? 100 : 185;

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

/// /////Puzzle Class ////////////
class Puzzle {
  constructor() {
    this.animationEl = null;
    this.isPrewiewDisplayed = false;
    this.coordinates = isMobileDevice
      ? puzzlesCoordinateForMobile
      : puzzlesCoordinateForDesktop;
  }

  addImageTPuzzleWidget = () => {
    this.puzzleWidget.style.backgroundImage = `url(${frameSvg})`;
  };

  createPuzzleWidget = () => {
    const puzzleWidget = document.createElement('div');
    puzzleWidget.setAttribute('id', 'puzzle-widget');
    assignStyleOnElement(puzzleWidget.style, {
      position: 'relative',
      backgroundImage: ` url(${frameSvg})`,
    });
    this.puzzleWidget = puzzleWidget;

    this.drawPuzzlesByCollectedCount(puzzlesCoordinateForDesktop);
  };

  // This method for creating widget in window
  showPuzzleWidgetWindowDraggable = (isAnimation = false) => {
    const {
      x_position,
      y_position,
    } = localStorageService.config;
    const puzzleWidget = document.createElement('div');
    const widgetSmallPreview = document.createElement('div');
    puzzleWidget.setAttribute('id', 'puzzle-widget');
    puzzleWidget.appendChild(widgetSmallPreview);
    puzzleWidget.style.backgroundImage = ` url(${frameSvg})`;

    if (isAnimation) {
      puzzleWidget.classList.add('animation-widget');
    }

    puzzleWidget.addEventListener(isMobileDevice ? 'click' : 'dblclick', () => {
      puzzleWidget.remove();
      this?.animationEl?.remove();
      this.isPrewiewDisplayed = true;
      this.showModalWidgetPreview(false);
    });

    const { clientWidth, clientHeight } = document.documentElement;

    const left = x_position || (clientWidth - 40 - puzzleWidgetSize);
    const top = y_position || (clientHeight - 40 - puzzleWidgetSize);
    const size = `${puzzleWidgetSize}px`;
    assignStyleOnElement(puzzleWidget.style, {
      width: size,
      height: size,
      left: `${left}px`,
      top: `${top}px`,
    });

    document.body.appendChild(puzzleWidget);
    this.puzzleWidget = puzzleWidget;
    if (localStorageService.config.puzzles_collected > 0) {
      this.addCloseIconToElement(puzzleWidget);
    }
    new DragElement(this.puzzleWidget);
    this.drawPuzzlesByCollectedCount();
  };

  drawPuzzlesByCollectedCount = (coordinate = puzzlesCoordinate) => {
    for (let i = 0; i < localStorageService.config.puzzles_collected; i++) {
      const backgroundImage = `url(${puzzleImagesList[i]})`;
      const {
        top,
        left,
        width,
        height,
      } = coordinate[i];
      const animationEl = document.createElement('div');
      animationEl.classList.add('boomio--animation__wrapper');
      assignStyleOnElement(animationEl.style, {
        top: `${top}px`,
        left: `${left}px`,
        width,
        height,
        backgroundImage,
        position: 'absolute',
      });

      this.puzzleWidget.appendChild(animationEl);
    }
  };

  createModalWindow = (width = 300, height = 442) => {
    /// /Add modal Background //////
    const modalBackground = document.createElement('div');
    modalBackground.setAttribute('id', 'modalBackground');
    /// //////////////////////

    /// /////Add modal ///////
    const modal = document.createElement('div');
    modal.setAttribute('id', 'widgetModal');
    assignStyleOnElement(modal.style, {
      width: `${width}px`,
      height: `${height}px`,
      transform: 'scale(1)',
    });
    modalBackground.appendChild(modal);
    document.body.appendChild(modalBackground);
    this.modal = modal;
    this.modalBackground = modalBackground;
    /// /////////////////////////
  };

  getCloseModalBtn = (closeCallback) => {
    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.classList.add('close-modal-btn-wrapper');
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&#x2715; ';
    closeBtn.classList.add('close-modal-btn');
    closeBtn.onclick = closeCallback;
    closeBtnWrapper.appendChild(closeBtn);
    return closeBtnWrapper;
  };

  closeAnimation = (callback) => () => {
    this.modal.style.transformOrigin = '100% 100%';
    this.modal.style.transform = 'scale(0)';
    this.modal.addEventListener('transitionend', () => {
      this.puzzleWidget.remove();
      this.modalBackground.remove();
      if (callback) {
        callback();
      }
    });
  };

  showModalWidgetPreview = (showAnimation = false) => {
    const {
      appearing_puzzle_nr,
      w_top_text,
      w_button_text,
      w_hint_static_text,
      w_hint_text,
    } = localStorageService.config;
    const isLastPuzzle = appearing_puzzle_nr === 4 && showAnimation;
    this?.puzzleWidget?.remove();
    this.createPuzzleWidget();
    this.createModalWindow();

    const showWidget = () => {
      this.showPuzzleWidgetWindowDraggable(true);
    };
    /// // Add close button //////

    const animationFunc = this.closeAnimation(showWidget);

    if (!isLastPuzzle) {
      const closeBtn = this.getCloseModalBtn(animationFunc);
      this.modal.appendChild(closeBtn);
    }
    /// ///////////////

    /// /////Add text top/////////
    const topText = document.createElement('div');
    topText.classList.add('topText');
    topText.innerHTML = isLastPuzzle
      ? 'CONGRATULATIONS!ENJOY YOUR A REWARD'
      : w_top_text;
    this.modal.appendChild(topText);
    /// ///////////////

    if (isLastPuzzle) {
      assignStyleOnElement(
        this.modal.style,
        {
          height: 'max-content',
          padding: '54px 24px',
        },
      );
      this.puzzleWidget.style.marginTop = '24px';
    }

    /// /////Add text bottom/////////
    if (!isLastPuzzle) {
      const bottomText = document.createElement('div');
      bottomText.classList.add('bottomText');
      bottomText.innerHTML = `${w_hint_static_text}\n${w_hint_text}`;
      this.modal.appendChild(bottomText);
    }
    /// ///////////////
    this.modal.appendChild(this.puzzleWidget);

    /// //Add go button ////
    if (!isLastPuzzle) {
      const goBtn = document.createElement('button');
      goBtn.setAttribute('id', 'goModalButton');
      goBtn.innerHTML = w_button_text;
      goBtn.onclick = animationFunc;
      this.modal.appendChild(goBtn);
    }
    /// ///////////////

    if (showAnimation) {
      boomioService.signal(`PUZZLE${appearing_puzzle_nr}_CLICK`);
      setTimeout(this.addPuzzleToWidget, 1000);
    }
  };

  addPuzzleToWidget = () => {
    let {
      puzzles_collected,
    } = localStorageService.config;

    this.startAnimation(
      puzzlesCoordinateForDesktop,
      {
        zIndex: 100000000000000,
        position: 'absolute',
      },
      this.puzzleWidget,
      false,
    );
    if (!this.isPrewiewDisplayed) {
      localStorageService.updateConfig({
        puzzles_collected: (puzzles_collected += 1),
      });
    }
    if (puzzles_collected < 4) return;

    this.showWinningAnimation();

    setTimeout(() => {
      this.closeModal();
      new QrCodeModal()
    }, 2000);
  };

  showWinningAnimation = () => {
    const winningAnimation = document.createElement('iframe');
    winningAnimation.classList.add('winningAnimation');
    winningAnimation.setAttribute(
      'src',
      'https://embed.lottiefiles.com/animation/35875',
    );
    document.body.appendChild(winningAnimation);
    setTimeout(() => {
      winningAnimation.remove();
    }, 3000);
  };

  onPuzzleClick = (e) => {
    const puzzle = e.target;
    puzzle.remove();
    this.isPrewiewDisplayed = false;
    this.showModalWidgetPreview(true);
  };

  startAnimation = (...args) => {
    const [
      coordinates,
      styles = {},
      parent = document.body,
      isClickable = true,
    ] = args;
    const {
      qrcode,
      puzzles_collected,
    } = localStorageService.config;
    const defaultCoordinates = this.coordinates[puzzles_collected];

    const currentCoordinates = coordinates?.[puzzles_collected];
    const customPosX = currentCoordinates?.left;
    const customPosY = currentCoordinates?.top;
    const width = currentCoordinates?.width ?? defaultCoordinates.width;
    const height = currentCoordinates?.height ?? defaultCoordinates.height;

    // if ((render_count % appearing_puzzle_nr) !== 0) return;
    const puzzleSize = 100;

    const dash = '-';
    const pos = `${qrcode}`.indexOf(dash);
    if (pos !== -1) {
      localStorageService.config.qrcode = qrcode.substring(0, pos);
    }

    const {
      clientWidth,
      clientHeight,
    } = document.documentElement;

    const posx = customPosX
            ?? getRandomArbitrary(
              puzzleWidgetSize + 25,
              clientWidth - puzzleSize - 10,
            ).toFixed();
    const posy = customPosY
            ?? getRandomArbitrary(
              puzzleWidgetSize + 25,
              clientHeight - puzzleSize - 10,
            ).toFixed();

    const animStyles = {
      width,
      height,
      backgroundImage: `url(${puzzleImagesList[puzzles_collected]})`,
      ...styles,
    };

    this.animationEl = new AnimationService({
      posx,
      posy,
      size: puzzleWidgetSize,
      parent,
      styles: animStyles,
    });

    this.animationEl.classList.remove('boomio--qr');

    if (isClickable) {
      this.animationEl.classList.add('boomio--animation__hover');
      this.animationEl.addEventListener('click', this.onPuzzleClick, {
        once: true,
      });
    }
  };

  closeModal = () => {
    this.modalBackground.remove();
  };

  addCloseIconToElement = (element) => {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('custom-close-icon');
    closeBtn.innerHTML = '&#x2715; ';
    closeBtn.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.disableWidgetAndRemoveAllElements();
      },
      {
        once: true,
      },
    );
    element.appendChild(closeBtn);
  };

  disableWidgetAndRemoveAllElements = () => {
    boomioService.signal('PUZZLE_CLOSED');
    this.puzzleWidget.remove();
    this.animationEl.remove();
  };

}
/// /////////////////////////

export const startPuzzleWidget = () => {
  const puzzle = new Puzzle();

  const {
    success,
    puzzles_collected,
    appearing_puzzle_nr,
  } = localStorageService.config;

  if (!success) {
    return;
  }

  if (puzzles_collected > 0) {
    puzzle.showPuzzleWidgetWindowDraggable();
  }

  if (appearing_puzzle_nr > 1) {
    puzzle.addImageTPuzzleWidget();
  }

  if (appearing_puzzle_nr) {
    puzzle.startAnimation();
  }
};
