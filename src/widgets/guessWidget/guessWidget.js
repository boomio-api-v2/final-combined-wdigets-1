import {
  widgetHtmlService,
  AnimationService,
  localStorageService,
  DragElement,
  QrCodeModal,
} from '@/services';
import './styles.css';
import { createCloseMoveButtons } from '@/utlis';
import boomio from '@/services/boomio';

class GuessWidget {
  constructor() {
    this.startGuess();
  }

  startGuess() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();

    this.guess = document.getElementById('boomio-guess-container');
    this.animation = new AnimationService({
      elem: this.guess,
      posx: window.matchMedia('(min-width: 450px)').matches ? 50 : -50,
      posy: 1,
    });

    if (window.matchMedia('(min-width: 600px)').matches) {
      this.draggeble = new DragElement(this.guess);
      new DragElement(this.guess);
    }
    setTimeout(() => {
      this.shuffleCard();
    }, 200);
    setTimeout(() => {
      this.addCardEventListeners();
    }, 3200);
  }

  createContainer = () => {
    const queIcon =
      'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/1c01bd6fb616cfea26f25c6287d2d860d987ae63/src/widgets/guessWidget/que_icon.svg';
    const img1 =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/quessWidget-new-design/src/widgets/guessWidget/img-1.png?raw=true';
    const img7 =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/guess3/src/widgets/guessWidget/img-7.png?raw=true';
    const center =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/guess3/src/widgets/guessWidget/center.png?raw=true';
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-guess-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );
    myCanvas.innerHTML = `
    <div class="boomio-wrapper">
      <ul class="boomio-guess-cards">
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card disabled boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${center} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${center} alt="boomio-icon">
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>
        <li class="boomio-guess-card boomio-invisible">
          <div class="boomio-view boomio-front-view">
          <img src=${queIcon} alt="boomio-icon">
          </div>
          <div class="boomio-view boomio-back-view">
            <img src=${img1}>
          </div>
        </li>    
      </ul>
    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
    createCloseMoveButtons(
      myCanvas.querySelector('.boomio-wrapper'),
      document.getElementById('boomio-guess-container'),
      [-30, 0],
      true,
    );
  };

  shuffleCard() {
    const cards = Array.from(document.querySelectorAll('.boomio-guess-card'));

    let arr = [1, 2, 3, 4, 1, 2, 3, 4];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) => {
      card.classList.remove('flip');
      let imgTag = card.querySelector('.boomio-back-view img');

      imgTag.src = `https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/quessWidget-new-design/src/widgets/guessWidget/img-${
        i < 4 ? arr[i] : i > 4 ? arr[i - 1] : ''
      }.png?raw=true`;
    });

    setTimeout(() => {
      for (let i = 1; i < 4; i++) {
        cards[i - 1].classList.add(`boomio-flytop${i}`);
        cards[i + 2].classList.add(`boomio-flymid${i}`);
        cards[i + 5].classList.add(`boomio-flybottom${i}`);
      }
      cards.forEach((card) => {
        card.classList.remove('boomio-invisible');
      });
    }, 400);

    setTimeout(() => {
      cards.forEach((card, i) => {
        if (i != 4) card.classList.add('boomio-card-flip');
      });
    }, 2000);

    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove('boomio-card-flip');
      });
      for (let i = 1; i < 4; i++) {
        cards[i - 1].classList.remove(`boomio-flytop${i}`);
        cards[i + 2].classList.remove(`boomio-flymid${i}`);
        cards[i + 5].classList.remove(`boomio-flybottom${i}`);
      }
    }, 3000);
  }
  addCardEventListeners() {
    const cards = Array.from(document.querySelectorAll('.boomio-guess-card'));
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;

    function flipCard({ target: clickedCard }) {
      boomio.signal('hammer_click', 'signal', {
        widget_type: 'guess',
      });

      if (clickedCard.classList.contains('disabled')) return;
      if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('boomio-card-flip');
        if (!cardOne) {
          return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.boomio-back-view img').src,
          cardTwoImg = cardTwo.querySelector('.boomio-back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
      }
    }

    function matchCards(img1, img2) {
      if (img1 === img2) {
        matched++;
        cardOne.classList.add('boomio-card-jump');
        cardTwo.classList.add('boomio-card-jump');
        if (matched == 4) {
          setTimeout(() => {
            const guessContainer = document.getElementById('boomio-guess-container');
            if (guessContainer && guessContainer.parentNode) {
              guessContainer.parentNode.removeChild(guessContainer);
              new QrCodeModal();
            }
          }, 3000);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return (disableDeck = false);
      }
      setTimeout(() => {
        cardOne.classList.add('boomio-card-shake');
        cardTwo.classList.add('boomio-card-shake');
      }, 400);

      setTimeout(() => {
        cardOne.classList.remove('boomio-card-shake', 'boomio-card-flip');
        cardTwo.classList.remove('boomio-card-shake', 'boomio-card-flip');
        cardOne = cardTwo = '';
        disableDeck = false;
      }, 1200);
    }

    cards.forEach((card) => {
      card.addEventListener('click', flipCard);
    });
  }
}

export default () => {
  new GuessWidget();
};
