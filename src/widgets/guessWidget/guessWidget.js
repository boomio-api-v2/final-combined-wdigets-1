import {
  widgetHtmlService,
  AnimationService,
  localStorageService,
  DragElement,
  QrCodeModal,
} from '@/services';
import './styles.css';

class GuessWidget {
  constructor() {
    this.startGuess();
  }

  startGuess() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();
    this.guess = document.getElementById('guess-container');
    this.animation = new AnimationService({
      elem: this.guess,
    });
    this.draggeble = new DragElement(this.guess);
    new DragElement(this.guess);
    this.shuffleCard();
    this.addCardEventListeners();
  }

  createContainer = () => {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'guess-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial', 'box');
    myCanvas.innerHTML = `
    <div class="wrapper">
      <ul class="cards">
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-1.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-6.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-3.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-2.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-1.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-5.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-2.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-6.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-3.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-5.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/que_icon.svg" alt="icon">
          </div>
          <div class="view back-view">
            <img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-4.png" alt="card-img">
          </div>
        </li>
      </ul>
    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
  };

  shuffleCard() {
    const cards = Array.from(document.querySelectorAll('.card'));
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) => {
      card.classList.remove('flip');
      let imgTag = card.querySelector('.back-view img');
      imgTag.src = `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/guess-card-widget/src/widgets/guessWidget/img-${arr[i]}.png`;
    });
  }

  addCardEventListeners() {
    const cards = Array.from(document.querySelectorAll('.card'));
    let matched = 0;
    let cardOne, cardTwo;
    let disableDeck = false;

    function flipCard({ target: clickedCard }) {
      if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
          return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src,
          cardTwoImg = cardTwo.querySelector('.back-view img').src;
        matchCards(cardOneImg, cardTwoImg);
      }
    }

    function matchCards(img1, img2) {
      if (img1 === img2) {
        matched++;
        if (matched == 8) {
          setTimeout(() => {
            const guessContainer = document.getElementById('guess-container');
            if (guessContainer && guessContainer.parentNode) {
              guessContainer.parentNode.removeChild(guessContainer);
              new QrCodeModal();
            }
          }, 1000);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return (disableDeck = false);
      }
      setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
      }, 400);

      setTimeout(() => {
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
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