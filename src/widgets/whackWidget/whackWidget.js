import { widgetHtmlService, QrCodeModal, localStorageService } from '@/services';
import './styles.css';
import {
  WhackHammer,
  WhackMole01,
  cloudImage,
  WhackMole01Reversed,
  WhackMoleHit,
} from '@/сonstants';

class WhackWidget {
  constructor() {
    this.isAnimationRunning = true;
    this.score = 0;
    this.whackedMoles = {};
    this.preloadImages()
      .then(() => {
        this.startWhack();
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  }

  preloadImages() {
    const imageUrlsToPreload = [
      WhackHammer,
      WhackMole01,
      cloudImage,
      WhackMole01Reversed,
      WhackMoleHit,
    ];

    const loadImageBeforeUsing = (images) => {
      const promises = images.map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = img;
        });
      });
      return Promise.all(promises);
    };

    return loadImageBeforeUsing(imageUrlsToPreload);
  }
  startWhack() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();
    this.whack = document.getElementById('whack-container');
    this.addCardEventListeners();
  }

  createContainer() {
    const myCanvas = document.createElement('div');
    const moleId = `mole-${Date.now()}`;
    myCanvas.setAttribute('id', 'whack-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');

    myCanvas.innerHTML = `
    <div class="game-container">
    <div class="mole" id="${moleId}">
      <img class="mole-image" src=${WhackMole01} alt="Mole">
      <div class="score"><span id="score-value"></span></div>
    </div>
  </div>
    `;

    widgetHtmlService.container.appendChild(myCanvas);
  }

  addCardEventListeners() {
    var gameContainer = document.querySelector('.game-container');
    var moles = gameContainer.querySelectorAll('.mole');
    var moleCount = moles.length;

    const randomPosition = (mole) => {
      var gameContainer = mole.parentElement;
      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight - 140;
      var moleWidth = mole.clientWidth;
      var moleHeight = mole.clientHeight;
      var maxY = containerHeight - moleHeight;

      var randomX;
      if (Math.random() < 0.5) {
        randomX = Math.floor(Math.random() * (containerWidth / 4 - moleWidth)) + 100;
      } else {
        randomX =
          Math.floor(
            Math.random() * (containerWidth / 4 - moleWidth) +
              containerWidth / 2 +
              containerWidth / 4,
          ) - 100;
      }

      var randomY = Math.floor(Math.random() * maxY);
      gameContainer.style.left = randomX + 'px';
      gameContainer.style.top = randomY + 'px';
    };

    const resetGIF = (imageElement) => {
      console.log('appear');
      const mole = document.querySelector('.mole');
      // Select the mole element using a CSS selector
      mole.classList.add('appear');
      const src = WhackMole01;
      imageElement.src = '';
      imageElement.src = src;
      setTimeout(function () {
        mole.classList.remove('appear');
      }, 1000);
      createHammer();
    };
    const reverseGIF = (imageElement) => {
      console.log('reverse');
      const mole = document.querySelector('.mole'); // Select the mole element using a CSS selector
      mole.classList.add('disappear');
      const src = WhackMole01Reversed;
      imageElement.src = '';
      imageElement.src = src;
    };
    const startMoleAnimation = (mole) => {
      if (!this.score || this.score < 14) {
        function hideMole() {
          const moleImage = mole.querySelector('.mole-image');
          resetGIF(moleImage);
          showNextMole();
        }

        function showNextMole() {
          var nextMoleIndex = Math.floor(Math.random() * moleCount);
          var nextMole = moles[nextMoleIndex];
          randomPosition(nextMole);
          nextMole.style.display = 'block';
          setTimeout(function () {
            const mole = document.querySelector('.mole'); // Select the mole element using a CSS selector
            const moleImage = mole.querySelector('.mole-image');
            reverseGIF(moleImage);
            setTimeout(function () {
              mole.style.display = 'none';
              setTimeout(function () {
                mole.classList.remove('disappear');
              }, 200);
              setTimeout(function () {
                startMoleAnimation(nextMole);
              }, 1000);
            }, 1000);
          }, 5000);
        }
        hideMole();
      }
    };

    const createHammer = () => {
      const mole = document.querySelector('.mole'); // Select the mole element using a CSS selector
      const existingHammer = mole.querySelector('.hammer');

      if (!existingHammer) {
        const hammer = document.createElement('img');
        hammer.classList.add('hammer');
        hammer.src = WhackHammer;
        mole.appendChild(hammer);
        hammer.classList.remove('disappear');
        hammer.classList.remove('appear');
        hammer.style.opacity = '0';

        // Add event listeners for mouseover and mouseout events
        mole.addEventListener('mouseover', () => {
          console.log('mouseover');
          hammer.style.opacity = '1';
        });

        let hideHammerTimeout; // Timeout variable to store the reference

        mole.addEventListener('mouseout', () => {
          hammer.style.opacity = '1';
          hideHammerTimeout = setTimeout(() => {
            hammer.style.opacity = '0';
            // Adjust the transition duration to match the CSS transition duration
          }, 400);
        });

        // Cancel the hide timeout when mouseover occurs again
        mole.addEventListener('mouseover', () => {
          clearTimeout(hideHammerTimeout);
        });
      }
    };

    const whackMole = (event) => {
      function moleHit(imageElement) {
        mole.classList.remove('mole-hit');
        const src = WhackMoleHit;
        imageElement.src = '';
        imageElement.src = src;
      }
      const mole = document.querySelector('.mole');
      console.log(mole.id);
      if (
        event.target.classList.contains('mole-image') &&
        !mole.classList.contains('mole-hit') &&
        !mole.classList.contains('disappear') &&
        !mole.classList.contains('appear') &&
        !this.whackedMoles[mole.id]
      ) {
        this.score++;
        document.getElementById('score-value').textContent = `${this.score}/4`; // Update the score element
        document.getElementById('score-value').style.display = 'block';
        const moleImage = mole.querySelector('.mole-image');
        moleHit(moleImage);

        setTimeout(function () {
          setTimeout(function () {
            const scoreStyle = document.getElementById('score-value');
            if (scoreStyle) {
              scoreStyle.style.display = 'none';
            }
          }, 800);
        }, 1000);

        if (this.score === 14) {
          endGame();
        }
        this.whackedMoles[mole.id] = true; // Mark the mole as whacked
      }
    };

    moles.forEach(function (mole) {
      randomPosition(mole);
      startMoleAnimation(mole);
    });

    const endGame = () => {
      setTimeout(() => {
        const element = document.getElementById('whack-container');
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
          new QrCodeModal();
        }
      }, 1000);
    };

    gameContainer.addEventListener('click', (event) => {
      const mole = event.target.closest('.mole');
      console.log('mole', mole.classList);
      if (
        mole &&
        mole.classList.contains('mole') &&
        !mole.classList.contains('appear') &&
        !mole.classList.contains('disappear')
      ) {
        const hammer = mole.querySelector('.hammer');
        this.isAnimationRunning = false;
        hammer.style.display = 'none';
        setTimeout(() => {
          this.isAnimationRunning = true;
          hammer.style.display = 'block';
        }, 2200);
        whackMole(event);
      }
    });
  }
}

export default () => {
  new WhackWidget();
};
