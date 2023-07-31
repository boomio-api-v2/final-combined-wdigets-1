import { widgetHtmlService, QrCodeModal, localStorageService } from '@/services';
import './styles.css';
import { testHammer } from '@/сonstants';
import { cloudImage } from '@/сonstants/icons';
import { loadImageBeforeUsing } from '@/utlis';
import { WhackMole01 } from '@/сonstants/icons';

loadImageBeforeUsing([cloudImage]);

class WhackWidget {
  constructor() {
    this.startWhack();
    this.score = 0;
  }

  startWhack() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();
    this.whack = document.getElementById('whack-container');
    this.addCardEventListeners();
  }

  createContainer() {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'whack-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');

    myCanvas.innerHTML = `
    <div class="game-container">
    <div class="mole">
      <div class="score"><span id="score-value"></span></div>
      <img class="mole-image" src=${WhackMole01} alt="Mole">
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

    const startMoleAnimation = (mole) => {
      if (!this.score || this.score < 4) {
        function hideMole() {
          mole.classList.add('appear');
          createHammer();
          showNextMole();
          console.log('4');

          mole.classList.remove('appear');
        }

        function showNextMole() {
          var nextMoleIndex = Math.floor(Math.random() * moleCount);
          var nextMole = moles[nextMoleIndex];
          randomPosition(nextMole);
          nextMole.style.display = 'block';
          setTimeout(function () {
            console.log('3');

            mole.classList.remove('appear');
            mole.classList.add('disappear');
            setTimeout(function () {
              console.log('2');

              mole.classList.remove('disappear');
              mole.style.display = 'none';
            }, 300);

            setTimeout(function () {
              console.log('1');
              startMoleAnimation(nextMole);
            }, 400);
          }, 4000);
        }

        hideMole();
      }
    };

    const createHammer = () => {
      const mole = document.querySelector('.mole'); // Select the mole element using a CSS selector
      const existingHammer = mole.querySelector('.hammer');

      // Only create the hammer if it doesn't already exist
      if (!existingHammer) {
        const hammer = document.createElement('img');
        hammer.classList.add('hammer');
        hammer.src = testHammer;
        mole.appendChild(hammer);
        hammer.classList.remove('disappear');
        hammer.classList.remove('appear');
        hammer.style.opacity = '0';
        // Show the hammer initially
        hammer.style.display = 'none';

        // Add event listeners for mouseover and mouseout events
        mole.addEventListener('mouseover', () => {
          hammer.style.opacity = '1';
          hammer.style.display = 'block';
        });

        let hideHammerTimeout; // Timeout variable to store the reference

        mole.addEventListener('mouseout', () => {
          hammer.style.opacity = '1';
          // Delay hiding the hammer for 500ms
          hideHammerTimeout = setTimeout(() => {
            hammer.style.opacity = '0';
            setTimeout(() => {
              hammer.style.display = 'none';
            }, 300); // Adjust the transition duration to match the CSS transition duration
          }, 800);
        });

        // Cancel the hide timeout when mouseover occurs again
        mole.addEventListener('mouseover', () => {
          clearTimeout(hideHammerTimeout);
        });
      }
    };

    const animateBlock =
      (e) =>
      ({ img, animation, isCloud = false, time = 400 }) => {
        const image = new Image();
        const blockElement = document.createElement('img');
        const mole = document.querySelector('.mole');
        image.onload = function () {
          blockElement.setAttribute('src', this.src);
          blockElement.classList.add(animation);
          if (!isCloud) {
            blockElement.animate({ transform: 'scale(0)' }, { duration: time, fill: 'forwards' });
          }
          mole.appendChild(blockElement);
          setTimeout(() => {
            blockElement.remove();
          }, time);
        };
        image.src = img;
      };

    const showHammerAnimation = () => {
      const mole = document.querySelector('.mole'); // Select the mole element using a CSS selector
      const hammer = mole.querySelector('.hammer');

      assignStyleOnElement(hammer.style, {
        right: 0,
        transform: 'rotate(-80deg)',
      });

      setTimeout(() => {
        assignStyleOnElement(hammer.style, {
          right: '-80px',
          top: '-10px',
          transform: 'rotate(50deg)',
        });
      }, 500);
    };

    const assignStyleOnElement = (elementStyle, styles) => {
      Object.assign(elementStyle, styles);
    };

    const whackMole = (event) => {
      const mole = document.querySelector('.mole');
      if (
        event.target.classList.contains('mole-image') &&
        !mole.classList.contains('mole-hit') &&
        !mole.classList.contains('disappear')
      ) {
        const animationFunc = animateBlock(event);
        animationFunc({
          img: cloudImage,
          animation: 'cloud',
          isCloud: true,
          time: 800,
        });

        mole.classList.remove('appear');
        mole.classList.remove('disappear');
        this.score++;
        document.getElementById('score-value').textContent = `${this.score}/4`; // Update the score element
        document.getElementById('score-value').style.display = 'block';
        mole.classList.add('mole-hit');
        showHammerAnimation();
        setTimeout(function () {
          mole.classList.remove('mole-hit');
          mole.classList.add('disappear');
          setTimeout(function () {
            const scoreStyle = document.getElementById('score-value');
            if (scoreStyle) {
              scoreStyle.style.display = 'none';
            }
            mole.style.display = 'none';
          }, 200);
        }, 800);

        if (this.score === 4) {
          endGame();
        }
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

    gameContainer.addEventListener('click', whackMole);
  }
}

export default () => {
  new WhackWidget();
};
