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
    this.score = 0;
    this.currentMoleId = null;
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
  addCloseIconToElement = (element, deleteElement) => {
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.flexDirection = 'column';
    btnContainer.style.justifyContent = 'center';
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('round-close-icon');
    closeBtn.innerHTML =
      '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/131cda78a7d6d48ddfcd6475ccd5a61a66c2f2af/images/wheelOfFortuneWidget/round-close.svg" style="width: 20px;"></img>'; // Add style width: 20px to the image
    closeBtn.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        deleteElement.remove(); // Remove the specified deleteElement
      },
      { once: true },
    );
    btnContainer.appendChild(closeBtn);
    element.appendChild(btnContainer);
  };

  createContainer() {
    const myCanvas = document.createElement('div');
    const moleId = `mole-${Date.now()}`;
    myCanvas.setAttribute('id', 'whack-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');

    myCanvas.innerHTML = `
    <div class="game-container">
    <div class="mole" id="${moleId}">
    <img class="mole-image mole-image1" src=${WhackMole01} alt="Mole">
    <img class="mole-image mole-image2" src=${WhackMole01Reversed} alt="Mole" style="display: none;">
    <img class="mole-image mole-image3" src=${WhackMoleHit} alt="Mole" style="display: none;">
    <div class="score"><span id="score-value"></span></div>
    </div>
  </div>
    `;

    widgetHtmlService.container.appendChild(myCanvas);
    this.addCloseIconToElement(
      myCanvas.querySelector('.mole'),
      document.getElementById('whack-container'),
    );
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
      mole.classList.remove('mole-hit-once');

      mole.classList.add('appear');
      const src = WhackMole01;

      imageElement.classList.add('hide');
      imageElement.src = src;

      // To ensure smooth transition, we use setTimeout to toggle classes after a small delay
      setTimeout(() => {
        imageElement.classList.remove('hide');
        imageElement.classList.add('show');
      }, 50);

      setTimeout(() => {
        mole.classList.remove('appear');
      }, 1300);
      createHammer();
    };

    const reverseGIF = (imageElement, whacked) => {
      const mole = document.querySelector('.mole');
      console.log('reverse', mole.classList.contains('mole-hit-once'));
      if (!mole.classList.contains('mole-hit-once')) {
        mole.classList.add('disappear');
        const src = WhackMole01Reversed;
        if (whacked) {
          mole.classList.add('mole-hit-once');
        }
        imageElement.classList.add('hide');
        imageElement.src = src;

        // To ensure smooth transition, we use setTimeout to toggle classes after a small delay
        setTimeout(() => {
          imageElement.classList.remove('hide');
          imageElement.classList.add('show');
        }, 50);

        setTimeout(() => {
          mole.classList.remove('disappear');
          if (whacked) {
            mole.style.display = 'none';
          }
        }, 1300);
      }
    };

    const startMoleAnimation = (mole) => {
      if (!this.score || this.score < 4) {
        const moleImage = mole.querySelector('.mole-image');

        function hideMole() {
          resetGIF(moleImage);
          showNextMole();
        }

        const showNextMole = () => {
          var nextMoleIndex = Math.floor(Math.random() * moleCount);
          var nextMole = moles[nextMoleIndex];
          randomPosition(nextMole);
          nextMole.style.display = 'block';
          const moleId = `mole-${Date.now()}-${Math.random()}`;
          nextMole.setAttribute('id', moleId);
          this.currentMoleId = moleId;

          setTimeout(() => {
            const mole = document.querySelector('.mole');
            if (mole) {
              const moleImage = mole.querySelector('.mole-image');
              if (!mole.classList.contains('mole-hit')) {
                reverseGIF(moleImage);
              }

              setTimeout(() => {
                mole.style.display = 'none';
                setTimeout(() => {
                  mole.classList.remove('disappear');
                }, 200);
                setTimeout(() => {
                  startMoleAnimation(nextMole);
                }, 1300);
              }, 1300);
            }
          }, 5000);
        };
        hideMole();
      }
    };

    const createHammer = () => {
      const mole = document.querySelector('.mole');
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
        console.log('mole hit');
        const mole = document.querySelector('.mole');
        mole.classList.add('mole-hit');
        const src = WhackMoleHit;
        imageElement.classList.add('hide');
        imageElement.src = src;
        setTimeout(() => {
          imageElement.classList.remove('hide');
          imageElement.classList.add('show');
        }, 50);
        setTimeout(() => {
          mole.classList.remove('mole-hit');
          reverseGIF(imageElement, true); // Apply the reverseGIF animation to hide the mole
        }, 1000);
      }
      const mole = document.querySelector('.mole');
      if (
        event.target.classList.contains('mole-image') &&
        !mole.classList.contains('mole-hit') &&
        !mole.classList.contains('disappear') &&
        !mole.classList.contains('appear') &&
        this.currentMoleId === mole.id &&
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

        if (this.score === 4) {
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
        if (element) {
          element.remove();
          new QrCodeModal();
        }
      }, 1000);
    };

    document.addEventListener('click', (event) => {
      const mole = event.target.closest('.mole');
      if (
        mole &&
        mole.classList.contains('mole') &&
        !mole.classList.contains('appear') &&
        !mole.classList.contains('disappear') &&
        this.currentMoleId === mole.id &&
        !this.whackedMoles[mole.id]
      ) {
        const hammer = mole.querySelector('.hammer');
        hammer.style.display = 'none';
        setTimeout(() => {
          const newMole = event.target.closest('.mole');
          console.log(newMole);

          if (this.whackedMoles[newMole.id]) {
            hammer.style.display = 'block';
          }
        }, 2200);
        whackMole(event);
      }
    });
  }
}

export default () => {
  new WhackWidget();
};
