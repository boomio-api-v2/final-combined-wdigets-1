import {
  boomioService,
  localStorageService,
  DragElement,
  AnimationService,
  QrCodeModal,
  widgetHtmlService,
} from '@/services';
import { closeImage, frameSvg, puzzleIconsList } from '@/сonstants/icons';
import { isMobileDevice } from '@/config';
import { getRandomArbitrary, assignStyleOnElement, createCloseMoveButtons } from '@/utlis';
import {
  puzzlesCoordinateForDesktop,
  puzzlesCoordinateForMobile,
  puzzlesCoordinate,
  puzzleWidgetSize,
} from './constants';

export class Puzzle {
  constructor() {
    this.mainContainer = widgetHtmlService.container;
    this.animationEl = null;
    this.isPreviewDisplayed = false;
    this.coordinates = isMobileDevice ? puzzlesCoordinateForMobile : puzzlesCoordinateForDesktop;
  }

  addImageToPuzzleWidget = () => {
    if (this.puzzleWidget) {
      this.puzzleWidget.style.backgroundImage = `url(${frameSvg})`;
    }
  };

  createPuzzleWidget = (position) => {
    const puzzleWidget = document.createElement('div');
    puzzleWidget.setAttribute('id', 'puzzle-widget');
    assignStyleOnElement(puzzleWidget.style, {
      position: position,
      backgroundImage: `url(${frameSvg})`,
    });
    this.puzzleWidget = puzzleWidget;
    this.drawPuzzlesByCollectedCount(puzzlesCoordinateForDesktop);
  };

  disableWidgetAndRemoveAllElements() {
    boomioService.signal('PUZZLE_CLOSED');
    this.puzzleWidget.remove();
    this.animationEl.remove();
  }

  showPuzzleWidgetWindowDraggable = (isAnimation = false) => {
    const { x_position, y_position } = localStorageService.config;
    const puzzleWidget = document.createElement('div');
    const widgetSmallPreview = document.createElement('div');
    puzzleWidget.setAttribute('id', 'puzzle-widget');
    puzzleWidget.appendChild(widgetSmallPreview);
    puzzleWidget.style.backgroundImage = ` url(${frameSvg})`;
    const isMobile = window.innerWidth <= 768;

    const deleteElement = document.getElementById('boomio-widget-content');
    createCloseMoveButtons(puzzleWidget, deleteElement, isMobile ? [-170, -170] : [-220, -270]);

    if (isAnimation) {
      puzzleWidget.classList.add('animation-widget');
    }

    puzzleWidget.addEventListener(isMobileDevice ? 'click' : 'dblclick', () => {
      puzzleWidget.remove();
      this?.animationEl?.remove();
      this.isPreviewDisplayed = true;
      this.showModalWidgetPreview(false);
    });

    const { clientWidth, clientHeight } = document.documentElement;

    const left =
      (!localStorage.getItem('testing_Widgets') && x_position) ||
      clientWidth - 40 - puzzleWidgetSize;
    const top =
      (!localStorage.getItem('testing_Widgets') && y_position) ||
      clientHeight - 40 - puzzleWidgetSize;
    const size = `${puzzleWidgetSize}px`;
    assignStyleOnElement(puzzleWidget.style, {
      width: size,
      height: size,
      left: `${left}px`,
      top: `${top}px`,
    });

    this.mainContainer.appendChild(puzzleWidget);
    this.puzzleWidget = puzzleWidget;
    new DragElement(this.puzzleWidget);
    this.drawPuzzlesByCollectedCount();
  };

  drawPuzzlesByCollectedCount = (coordinate = puzzlesCoordinate) => {
    for (let i = 0; i < localStorageService.config.puzzle.puzzles_collected; i++) {
      const backgroundImage = `url(${puzzleIconsList[i]})`;
      const { top, left, width, height } = coordinate[i];
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
    const modalBackground = document.createElement('div');
    modalBackground.setAttribute('id', 'modalBackground');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'widgetModal');
    assignStyleOnElement(modal.style, {
      width: `${width}px`,
      height: `${height}px`,
      transform: 'scale(1)',
    });
    modalBackground.appendChild(modal);
    this.mainContainer.appendChild(modalBackground);
    this.modal = modal;
    this.modalBackground = modalBackground;
  };

  getCloseModalBtn = (closeCallback) => {
    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.classList.add('boomio-close-modal-btn-wrapper');
    const closeBtn = document.createElement('img');
    closeBtn.src = closeImage;
    closeBtn.classList.add('boomio-close-modal-btn');
    closeBtn.onclick = closeCallback;
    closeBtnWrapper.appendChild(closeBtn);
    return closeBtnWrapper;
  };

  closeAnimation = (callback) => () => {
    assignStyleOnElement(this.modal.style, {
      transformOrigin: '100% 100%',
      transform: 'scale(0)',
    });

    this.modal.addEventListener('transitionend', () => {
      this.puzzleWidget.remove();
      this.modalBackground.remove();
      if (callback) {
        callback();
      }
    });
  };

  showModalWidgetPreview(showAnimation = false) {
    const { w_top_text, w_button_text, w_hint_static_text } = localStorageService.config;
    const { puzzles_collected, hint } = localStorageService.config.puzzle;
    const isLastPuzzle = puzzles_collected === 4;
    this?.puzzleWidget?.remove();
    this.createPuzzleWidget('relative');
    this.createModalWindow();

    const showWidget = () => {
      this.showPuzzleWidgetWindowDraggable(true);
    };

    const animationFunc = this.closeAnimation(showWidget);

    if (!isLastPuzzle) {
      const closeBtn = this.getCloseModalBtn(animationFunc);
      this.modal.appendChild(closeBtn);
    }

    const topText = document.createElement('div');
    topText.classList.add('topText');
    topText.innerHTML = w_top_text;
    this.modal.appendChild(topText);

    if (isLastPuzzle) {
      assignStyleOnElement(this.modal.style, {
        height: 'max-content',
        padding: '54px 24px',
      });
      this.puzzleWidget.style.marginTop = '24px';
    }

    if (!isLastPuzzle) {
      const bottomText = document.createElement('div');
      bottomText.classList.add('bottomText');
      bottomText.innerHTML = `${hint}`;
      this.modal.appendChild(bottomText);
    }

    this.modal.appendChild(this.puzzleWidget);

    if (!isLastPuzzle) {
      const goBtn = document.createElement('button');
      goBtn.setAttribute('id', 'goModalButton');
      goBtn.innerHTML = w_button_text;
      goBtn.onclick = animationFunc;
      this.modal.appendChild(goBtn);
    }

    if (showAnimation) {
      boomioService.signal(`PUZZLE_CLICKED`);
      setTimeout(this.addPuzzleToWidget, 1000);
    }
  }

  addPuzzleToWidget = () => {
    let { puzzles_collected, puzzles_needed } = localStorageService.config.puzzle;
    this.startAnimation(
      puzzlesCoordinateForDesktop,
      {
        zIndex: 9999,
        position: 'absolute',
      },
      this.puzzleWidget,
      false,
      true,
    );

    if (puzzles_collected !== 4) return;

    setTimeout(() => {
      if (localStorage.getItem('testing_Widgets')) {
        this.mainContainer = widgetHtmlService.container;
        this.animationEl = null;
        this.isPreviewDisplayed = false;
        this.coordinates = isMobileDevice
          ? puzzlesCoordinateForMobile
          : puzzlesCoordinateForDesktop;
        localStorageService.config.puzzle.puzzles_collected = 0;

        const element = document.getElementById('puzzle-widget');
        if (element) {
          element.remove();
        }
      }

      this.closeModal();
      new QrCodeModal();
    }, 1000);
  };

  onPuzzleClick = (e) => {
    const puzzle = e.target;
    puzzle.remove();
    this.isPreviewDisplayed = false;
    this.showModalWidgetPreview(true);
  };

  startAnimation = (...args) => {
    const [coordinates, styles = {}, parent = this.mainContainer, isClickable = true, modal] = args;
    const { app_url, puzzles_collected } = localStorageService.config.puzzle;
    const position = modal ? puzzles_collected - 1 : puzzles_collected;
    const defaultCoordinates = this.coordinates[position];
    const currentCoordinates = coordinates?.[position];
    const customPosX = currentCoordinates?.left;
    const customPosY = currentCoordinates?.top;
    const width = currentCoordinates?.width ?? defaultCoordinates?.width;
    const height = currentCoordinates?.height ?? defaultCoordinates?.height;
    const puzzleSize = 100;

    const dash = '-';
    const pos = `${app_url}`.indexOf(dash);

    if (pos !== -1) {
      localStorageService.config.app_url = app_url.substring(0, pos);
    }

    const { clientWidth, clientHeight } = document.documentElement;
    const startCoordinate = puzzleWidgetSize + 25;
    const limitX = clientWidth - puzzleSize - 10;
    const limitY = clientHeight - puzzleSize - 10;

    const posx = customPosX ?? getRandomArbitrary(startCoordinate, limitX);
    const posy = customPosY ?? getRandomArbitrary(startCoordinate, limitY);
    const animStyles = {
      width,
      height,
      backgroundSize: 'container',
      backgroundImage: `url(${puzzleIconsList[position]})`,
      ...styles,
    };

    const { animationEl } = new AnimationService({
      posx,
      posy,
      size: puzzleWidgetSize,
      parent,
      styles: animStyles,
    });

    animationEl.classList.remove('boomio--qr');

    if (isClickable) {
      animationEl.classList.add('boomio--animation__hover');
      animationEl.addEventListener('click', this.onPuzzleClick, {
        once: true,
      });
    }
    this.animationEl = animationEl;
  };

  closeModal = () => {
    this.modalBackground.remove();
  };
}

export default () => {
  const puzzle = new Puzzle();
  const { puzzles_collected } = localStorageService.config.puzzle;
  const { widget_subtype } = localStorageService.config;

  if (puzzles_collected !== 0 || localStorage.getItem('testing_Widgets')) {
    puzzle.showPuzzleWidgetWindowDraggable();
  }
  if (
    (widget_subtype !== 'static' && puzzles_collected > 1) ||
    localStorage.getItem('testing_Widgets')
  ) {
    puzzle.addImageToPuzzleWidget();
  }
  if (widget_subtype !== 'static' || localStorage.getItem('testing_Widgets')) {
    puzzle.startAnimation();
  }
};
