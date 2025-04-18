import {
  blue,
  green,
  orange,
  purple,
  red,
  yellow,
  blueSpecial,
  greenSpecial,
  orangeSpecial,
  purpleSpecial,
  redSpecial,
  intro,
  newRecordEE,
  newRecordFI,
  newRecordRU,
  newRecordLV,
  newRecordEn,
  newRecord,
  checkIcon,
  uncheckIcon,
  star,
} from './constants';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import './styles.css';

class CrushGame {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Akropolis';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.campaignUrl = this.config.campaignUrl ? this.config.campaignUrl : '';
    this.gameCount = 0;
    this.language = this.config.language ? this.config.language : 'LV';

    this.currentScoreTable = {};
    this.gridSize = 8;
    this.tileSize = 50;
    this.colors = { red, blue, green, yellow, purple, orange };
    this.grid = [];
    this.selectedTile = null;
    this.images = {};
    this.currentScore = 0;
    this.multiplier = 1;
    this.isAnimating = false; // Add this flag
    this.timer = 5; // Add timer property
    this.timerInterval = null; // Add timer interval property
    this.startLoading();
  }

  startLoading() {
    this.preloadImages(() => {
      this.createContainer();

      document.getElementById('boomio-crush-canvas').style.background = true
        ? 'gray'
        : `url(${redSpecial}) center`;
      this.setupCanvas();
      this.generateValidGrid();
      this.addEventListeners();
      setTimeout(() => {
        document.getElementById('background_intro').style.transition = 'opacity 1s ease';
        document.getElementById('background_intro').style.opacity = 0;
        if (this.gameCount === 0) {
          document.getElementById('background_blur').style.display = 'block';
          document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
        }
        this.showRulesOrRegistration();

        setTimeout(() => {
          document.getElementById('background_intro').style.display = 'none';
        }, 1);
      }, 1); //intro speed
    });
  }

  showRulesOrRegistration = () => {
    const currentPageUrl = window.location.href;
    this.urlParams = new URL(currentPageUrl).searchParams;
    const user_id = this.urlParams.get('user_id');
    if (this.customer === 'Pigu.lt' && this.userBestScore <= 0) {
      const checkboxImg3 = document.querySelector('.boomio-rules-privacyCheckbox');
      checkboxImg3.addEventListener('click', () => {
        this.checkboxChange3 = !this.checkboxChange3;
        const checkboxImgChange3 = document.getElementById('boomio-rules-privacyCheckbox-img');
        checkboxImgChange3.src = this.checkboxChange3 ? checkIcon : uncheckIcon;
      });
    }
    if (this.showCompetitiveRegistration && this.customer !== 'Pigu.lt' && user_id === null) {
      const checkboxImg = document.querySelector('.boomio-privacyCheckbox');
      checkboxImg.addEventListener('click', () => {
        this.checkboxChange = !this.checkboxChange;
        const checkboxImgChange = document.getElementById('privacyCheckboxImg');
        checkboxImgChange.src = this.checkboxChange ? checkIcon : uncheckIcon;
      });

      const checkboxImg2 = document.querySelector('.boomio-privacyCheckbox2');
      checkboxImg2.addEventListener('click', () => {
        this.checkboxChange2 = !this.checkboxChange2;
        const checkboxImgChange2 = document.getElementById('privacyCheckboxImg2');
        checkboxImgChange2.src = this.checkboxChange2 ? checkIcon : uncheckIcon;
      });

      const emailInput = document.querySelector('.boomio-competition-email-input-field');
      const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
      emailInput.addEventListener('input', () => {});
      playerNameInput.addEventListener('input', () => {});

      setTimeout(() => {
        const canvas = document.getElementById('boomio-crush-canvas');
        document.getElementById('background_blur').style.opacity =
          this.language === 'LV' ? 0.4 : 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'blur(2px)';
        const inpuRegisterContainer = document.querySelector('.input-register-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inpuRegisterContainer.style.display = 'block';
        setTimeout(() => {
          inpuRegisterContainer.style.height = '528px';
          inpuRegisterContainer.style.top = 'calc(50% + 74px)';
          inpuRegisterContainer.style.opacity = 1;
        }, 100);
      }, 300);
    } else if ((this.customer === 'Perlas GO' || this.customer === 'Pigu.lt') && user_id !== '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: this.customer === 'Perlas GO' ? true : false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          this.bestScore = response.user_best_score;
          if (this.customer === 'Pigu.lt' && false) {
            this.competitionCodeScoreTableContainerPigu.updateProps(this.customer, this.scoreTable);
            const competitionTableContainer = document.querySelector(
              '.competition-table-container-pigu',
            );
            competitionTableContainer.style.transition =
              'height 1s ease, top 1s ease, opacity 1s ease';
            competitionTableContainer.style.display = 'block';
            setTimeout(() => {
              competitionTableContainer.style.height = '680px';
              competitionTableContainer.style.top = 'calc(50%)';
              competitionTableContainer.style.opacity = 1;
            }, 100);
          } else {
            this.userBestScore = response.user_best_score;

            this.showRulesPigu();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if ((this.customer === 'Perlas GO' || this.customer === 'Pigu.lt') && user_id === '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          this.userBestScore = response.user_best_score;

          this.showRulesPigu();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setTimeout(() => {
        const canvas = document.getElementById('boomio-crush-canvas');
        document.getElementById('background_blur').style.opacity =
          this.language === 'LV' ? 0.4 : 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'blur(2px)';
        const inputContainer = document.querySelector('.input-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inputContainer.style.display = 'block';
        setTimeout(() => {
          inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
          inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '170px'})`;
          inputContainer.style.opacity = 1;
        }, 100);
      }, 300);
    }
  };

  showRulesPigu = () => {
    this.config = localStorageService.getDefaultConfig();
    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;

    if (this.customer === 'Pigu.lt') {
      if (this.userBestScore > 0) {
        document.getElementById('boomio-rules-privacyCheckbox').style.display = 'none';
      }
      const competitionTableContainer = document.querySelector('.competition-table-container-pigu');

      competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      setTimeout(() => {
        competitionTableContainer.style.height = '10px';
        competitionTableContainer.style.top = 'calc(50% + 330px)';
        competitionTableContainer.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        competitionTableContainer.style.display = 'none';
      }, 1000);
    }
    setTimeout(() => {
      const canvas = document.getElementById('boomio-crush-canvas');
      document.getElementById('background_blur').style.opacity =
        this.language === 'LV' ? 0.4 : 0.37;
      canvas.style.transition = 'filter 0.6s ease';
      canvas.style.filter = 'blur(2px)';
      const inputContainer = document.querySelector('.input-container');
      document.getElementById('control-button').style.transition = 'opacity 2s ease';
      document.getElementById('control-button').style.opacity = 1;
      inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      inputContainer.style.display = 'block';
      setTimeout(() => {
        inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
        inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '170px'})`;
        inputContainer.style.opacity = 1;
      }, 100);
    }, 300);
  };

  startTimer() {
    const timerElement = document.getElementById('timer');
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timer = 5;
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerElement.innerText = `Time: ${this.timer}s`;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.isAnimating = true;
    this.showGoMenu();
  }

  hideScore = () => {
    const new_highscore = document.querySelector('.new_highscore');
    const new_highscore_stars = document.querySelector('.new_highscore_stars');
    const numbers = document.querySelector('.numbers');

    numbers.style.transition = 'opacity 0.5s ease';
    numbers.style.opacity = 0;
    new_highscore.style.transition = 'opacity 0.5s ease';
    new_highscore.style.opacity = 0;
    new_highscore_stars.style.transition = 'opacity 0.5s ease';
    new_highscore_stars.style.opacity = 0;

    setTimeout(() => {
      new_highscore.style.display = 'none';
      new_highscore_stars.style.display = 'none';
      numbers.style.display = 'none';
    }, 500);
  };

  showGoMenu = () => {
    if (this.newHighScoreReached) {
      const numbers = document.querySelector('.numbers');
      const new_highscore = document.querySelector('.new_highscore');
      const new_highscore_stars = document.querySelector('.new_highscore_stars');
      new_highscore_stars.style.display = 'block';

      new_highscore.style.display = 'block';
      numbers.style.display = 'block';

      setTimeout(() => {
        new_highscore.style.opacity = 1;
        new_highscore_stars.style.opacity = 1;

        numbers.style.opacity = 1;
      }, 200);

      const scoreDigits = document.querySelectorAll('.numbers__window__digit');

      const scoreString = this.currentScore.toString();

      const initialMargin = 200;
      const scoreLength = this.currentScore.toString().length;

      const newMarginLeft = initialMargin - 30 * scoreLength;
      numbers.style.marginLeft = `${newMarginLeft}px`;
      // Determine the number of leading zeros to hide
      let leadingZeros = 0;
      while (leadingZeros < scoreString.length && scoreString[leadingZeros] === '0') {
        leadingZeros++;
      }

      // Hide all digits initially
      scoreDigits.forEach((digit) => {
        digit.style.display = 'none';
      });

      // Display each digit individually, starting from the first non-zero digit
      for (let i = leadingZeros; i < scoreString.length; i++) {
        scoreDigits[i - leadingZeros].textContent = scoreString[i];
        scoreDigits[i - leadingZeros].style.display = 'block';
        scoreDigits[i - leadingZeros].classList.add('boomio-counting-animation');
      }

      // Remove the counting class after a short delay
      setTimeout(() => {
        setTimeout(() => {
          this.newHighScoreReached = false;
        }, 2000);
        scoreDigits.forEach((digit) => {
          digit.classList.remove('boomio-counting-animation');
        });
      }, 1000);
    }

    setTimeout(
      () => {
        if (this.showCompetitiveRegistration) {
          boomioService
            .signal('ROUND_FINISHED', 'signal', {
              score: this.currentScore,
            })
            .then((response) => {
              if (this.customer === 'Perlas GO' && window.innerWidth <= 1280) {
                document.getElementById('crush-mobile-controls').style.display = 'none';
              }
              if (this.customer === 'Pigu.lt') {
                if (window.Boomio) {
                  window.Boomio.logEvent('game_finished', JSON.stringify(response));
                } else if (
                  window.webkit &&
                  window.webkit.messageHandlers &&
                  window.webkit.messageHandlers.Boomio
                ) {
                  var message = {
                    command: 'logEvent',
                    name: 'game_finished',
                    parameters: { response },
                  };
                  window.webkit.messageHandlers.Boomio.postMessage(message);
                } else {
                  console.log('No native APIs found.');
                }
              }
              this.userBestPlace = response.user_best_place;

              this.scoreTable = response;

              this.scoreTableContainerInstance.updateProps(
                this.customer,
                this.scoreTable,
                this.currentScore,
              );
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        if (this.showCompetitiveRegistration) {
          let competitionTableContainer = '';
          if (this.customer === 'Pigu.lt') {
            competitionTableContainer = document.querySelector('.did-you-know-container');
          } else {
            competitionTableContainer = document.querySelector('.competition-table-container');
          }
          const canvas = document.getElementById('boomio-crush-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'blur(2px)';
          document.getElementById('background_blur').style.display = 'block';
          document.getElementById('background_blur').style.opacity =
            this.language === 'LV' ? 0.4 : 0.37;
          competitionTableContainer.style.transition =
            'height 1s ease, top 1s ease, opacity 1s ease';
          competitionTableContainer.style.display = 'block';
          setTimeout(() => {
            competitionTableContainer.style.height = '680px';
            competitionTableContainer.style.top = 'calc(50%)';
            competitionTableContainer.style.opacity = 1;
          }, 100);
        } else {
          const inputContainer = document.querySelector('.input-container1');
          const canvas = document.getElementById('boomio-crush-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'blur(2px)';
          document.getElementById('background_blur').style.display = 'block';
          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          inputContainer.style.display = 'block';
          setTimeout(() => {
            inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
            inputContainer.style.top = `calc(50% + ${
              this.isMobileHeightSmall ? '110px' : '170px'
            })`;
            inputContainer.style.opacity = 1;
          }, 100);
        }
        const currectScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
        this.hideScore();
        currectScoreDiv.style.opacity = 0;
        setTimeout(() => {
          currectScoreDiv.style.display = 'none';
        }, 300);
      },

      this.newHighScoreReached ? 2500 : 100,
    );
  };

  getConnectedCells(row, col, color) {
    const stack = [{ row, col }];
    const connected = new Set();
    while (stack.length) {
      const cell = stack.pop();
      const key = `${cell.row}-${cell.col}`;
      if (connected.has(key)) continue;
      connected.add(key);
      // Check only 4 cardinal directions.
      const neighbors = [
        { row: cell.row - 1, col: cell.col }, // Up
        { row: cell.row + 1, col: cell.col }, // Down
        { row: cell.row, col: cell.col - 1 }, // Left
        { row: cell.row, col: cell.col + 1 }, // Right
      ];
      neighbors.forEach(({ row: nRow, col: nCol }) => {
        if (
          nRow >= 0 &&
          nRow < this.gridSize &&
          nCol >= 0 &&
          nCol < this.gridSize &&
          this.getBaseColor(this.grid[nRow][nCol]) === color
        ) {
          stack.push({ row: nRow, col: nCol });
        }
      });
    }
    return [...connected].map((key) => {
      const [r, c] = key.split('-').map(Number);
      return { row: r, col: c };
    });
  }

  // Preload both normal and special images.
  preloadImages(callback) {
    const normalColorKeys = Object.keys(this.colors);
    const specialKeys = [
      'blueSpecial',
      'greenSpecial',
      'orangeSpecial',
      'purpleSpecial',
      'redSpecial',
    ];
    let loadedImages = 0;
    const totalImages = normalColorKeys.length + specialKeys.length;

    // Load normal candy images.
    normalColorKeys.forEach((color) => {
      const img = new Image();
      img.src = this.colors[color];
      img.onload = () => {
        this.images[color] = img;
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      };
    });

    // Load special candy images.
    const specialSources = {
      blueSpecial,
      greenSpecial,
      orangeSpecial,
      purpleSpecial,
      redSpecial,
    };
    specialKeys.forEach((key) => {
      const img = new Image();
      img.src = specialSources[key];
      img.onload = () => {
        this.images[key] = img;
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      };
    });
  }

  createContainer() {
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';

    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-crush-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );
    myCanvas.innerHTML = `
      <div class="game-container" id="game-container">
        ${new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML}
          <img class="new_highscore_stars" src=${
            newHighscoreStarsImage.src
          } alt="Image Description" style="overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
            </img>
            <div class="new_highscore"><img src=${
              this.language === 'EN'
                ? newRecordEn
                : this.language === 'LV'
                ? newRecordLV
                : this.language === 'ET' || this.language === 'EE'
                ? newRecordEE
                : this.language === 'FI'
                ? newRecordFI
                : this.language === 'RU'
                ? newRecordRU
                : newRecord
            } alt="Image Description" style="width: 100%; height: 100%;">
            </div>
        
        
            ${new InputContainer(this.customer, 'crush').createInputContainerDiv().outerHTML}


                <div class="numbers">
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--1" data-fake="8642519073" id="bestScore1"></span>
  </span>
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--2" data-fake="5207186394" id="bestScore2"></span>
  </span>
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--3" data-fake="8395216407" id="bestScore3"></span>
  </span>
  <span class="numbers__window">
  <span class="numbers__window__digit numbers__window__digit--4" data-fake="8395216407" id="bestScore4"></span>
</span>
<span class="numbers__window">
<span class="numbers__window__digit numbers__window__digit--5" data-fake="8395216407" id="bestScore5"></span>
</span>
<span class="numbers__window">

<span class="numbers__window__digit numbers__window__digit--6" data-fake="8395216407" id="bestScore6"></span>
</span>
</div>

    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer === 'Vilvi'
        ? '#45A2BF'
        : this.customer === 'Pigu.lt'
        ? '#FD61FE'
        : this.customer === 'Perlas GO'
        ? '#19AA82'
        : this.language === 'LV'
        ? '#F40027'
        : '#045222'
    };border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:18px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${'Georama'}; font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>


        <img src="${intro}"
             alt="Image Description" 
             style="z-index:4; height: ${
               this.isMobileHeightSmall ? '100%' : '674px'
             };position:absolute;pointer-events: none; display:block;" 
             id="background_intro">
             <div alt="Image Description" style="z-index:1;width: ${
               document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
             }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;background-color:${'#FE0000'}" id="background_blur"></div>

        <!-- Game content container hidden initially -->
        <div id="game-content" style="display: none;">
          <div id="crush-game-background"></div>
          <canvas id="boomio-crush-canvas" class="boomio-crush-canvas" width="${
            this.gridSize * this.tileSize
          }" height="${this.gridSize * this.tileSize}"></canvas>
          <div id="score">Score: 0</div>
          <div id="timer">Time: 5s</div>
        </div>
        <!-- Restart button (initially hidden) -->
        <button id="restart-button" class="hidden">Restart Game</button>
      </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
    const gameContainer = document.querySelector('.game-container');

    this.currentScoreTableContainerInstance = new CompetitionScoreTableContainer(
      this.customer,
      this.currentScoreTable,
      this.currentScore,
    );

    gameContainer.appendChild(this.currentScoreTableContainerInstance.containerDiv);
  }

  setupCanvas() {
    this.canvas = document.getElementById('boomio-crush-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  generateValidGrid() {
    do {
      this.generateGrid();
    } while (this.hasInitialMatches());
  }

  generateGrid() {
    for (let row = 0; row < this.gridSize; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        let color;
        do {
          color = this.getRandomColor();
        } while (
          (col > 1 && this.grid[row][col - 1] === color && this.grid[row][col - 2] === color) ||
          (row > 1 && this.grid[row - 1][col] === color && this.grid[row - 2][col] === color)
        );
        this.grid[row][col] = color;
      }
    }
  }

  getRandomColor() {
    const colorKeys = Object.keys(this.colors);
    const baseColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];

    // Let's say 10% chance to create a "3Points" tile:
    const threePointColors = ['blue', 'green', 'orange', 'purple', 'red'];
    if (Math.random() < 0.1 && threePointColors.includes(baseColor)) {
      return baseColor + '3Points';
    }

    // Otherwise return a normal color
    return baseColor;
  }

  hasInitialMatches() {
    return this.findMatches().length > 0;
  }

  findMatches() {
    console.log('🔍 Checking matches in updated grid:', JSON.parse(JSON.stringify(this.grid)));
    let matches = new Set();

    // Horizontal check
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row][col + 1]);
        const c3 = this.getBaseColor(this.grid[row][col + 2]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row}-${col + 1}`);
          matches.add(`${row}-${col + 2}`);
          console.log(`✅ Horizontal match at (${row}, ${col})`);
        }
      }
    }

    // Vertical check
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row + 1][col]);
        const c3 = this.getBaseColor(this.grid[row + 2][col]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row + 1}-${col}`);
          matches.add(`${row + 2}-${col}`);
          console.log(`✅ Vertical match at (${row}, ${col})`);
        }
      }
    }

    let matchArray = [...matches].map((pos) => {
      const [row, col] = pos.split('-').map(Number);
      return { row, col };
    });

    console.log('🎯 Matches Found:', matchArray);
    return matchArray;
  }

  getBaseColor(color) {
    if (typeof color !== 'string') return color;
    return color.replace('Special', '').replace('Multiplier', '').replace('3Points', ''); // <-- This ensures "red3Points" => "red"
  }

  applyGravity(callback) {
    let existingFalling = [];
    let newFalling = [];
    let newTilesMap = {}; // will store new colors for each column

    // Process each column for downward gravity.
    for (let col = 0; col < this.gridSize; col++) {
      let emptySpaces = 0;
      // Iterate from bottom to top.
      for (let row = this.gridSize - 1; row >= 0; row--) {
        if (!this.grid[row][col]) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          // Schedule this candy to fall down by emptySpaces rows.
          existingFalling.push({ fromRow: row, toRow: row + emptySpaces, col });
          // Update the grid: move the candy down.
          this.grid[row + emptySpaces][col] = this.grid[row][col];
          this.grid[row][col] = null;
        }
      }
      // For each empty space at the top, create a new candy falling in.
      newTilesMap[col] = [];
      for (let i = 0; i < emptySpaces; i++) {
        // Get a random color.
        let newColor = this.getRandomColor();
        // With a 10% chance, convert it to its special variant.
        if (Math.random() < 0.1) {
          // If the color is yellow and you don't have yellowSpecial, use redSpecial as default.
          newColor = newColor === 'yellow' ? 'redSpecial' : newColor + 'Special';
        }
        newTilesMap[col].push(newColor);
        newFalling.push({
          fromRow: -emptySpaces + i, // start above the grid (e.g. -emptySpaces, ... -1)
          toRow: i, // target row is i (0, 1, 2, etc.)
          col,
          isNew: true,
          color: newColor,
        });
        // Note: DO NOT update this.grid[i][col] here—leave it null so nothing shows.
      }
    }

    // Animate existing candies falling first.
    this.animateFallingTiles(existingFalling, () => {
      // Then animate new candies falling in.
      this.animateFallingTiles(newFalling, () => {
        // Now that the animation is complete, update the grid with new candies.
        for (let col = 0; col < this.gridSize; col++) {
          if (newTilesMap[col]) {
            for (let i = 0; i < newTilesMap[col].length; i++) {
              this.grid[i][col] = newTilesMap[col][i];
            }
          }
        }
        this.drawGrid();
        callback();
      });
    });
  }

  animateFallingExplosion(specialTile, callback) {
    // Determine the target row (for example, the bottom of the grid).
    const targetRow = this.gridSize - 1;
    // Create a falling tile object for the special tile.
    const fallingTile = [
      {
        fromRow: specialTile.row,
        toRow: targetRow,
        col: specialTile.col,
        isNew: false,
        color: this.grid[specialTile.row][specialTile.col],
      },
    ];
    // Animate this falling tile.
    this.animateFallingTiles(fallingTile, () => {
      // Remove the special tile from its original location.
      this.grid[specialTile.row][specialTile.col] = null;
      // Place it at the target location.
      this.grid[targetRow][specialTile.col] = fallingTile[0].color;
      // Call the callback, passing the landing row.
      callback(targetRow);
    });
  }
  animateFallingTiles(fallingTiles, callback) {
    const duration = 500; // Duration of the animation in milliseconds.
    const startTime = performance.now();
    this.isAnimating = true; // Set flag to true at the start of animation

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Loop over each cell in the grid.
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          const fallingTile = fallingTiles.find((tile) => tile.toRow === row && tile.col === col);
          if (fallingTile) {
            const startY = fallingTile.fromRow * this.tileSize;
            const targetY = fallingTile.toRow * this.tileSize;
            const currentY = startY + (targetY - startY) * progress;
            const yOffset = currentY - targetY;
            const tileColor = fallingTile.isNew ? fallingTile.color : this.grid[row][col];
            this.drawTile(row, col, tileColor, yOffset);
          } else {
            if (this.grid[row][col]) {
              this.drawTile(row, col, this.grid[row][col]);
            }
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();
        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };

    requestAnimationFrame(animate);
  }

  animateMatchEffect(matches, callback) {
    const particles = [];
    const duration = 500;
    const startTime = performance.now();

    matches.forEach((match) => {
      const centerX = match.col * this.tileSize + this.tileSize / 2;
      const centerY = match.row * this.tileSize + this.tileSize / 2;
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 1,
        });
      }
    });

    const animateParticles = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - progress;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        this.ctx.fill();
      });

      if (elapsed < duration) {
        requestAnimationFrame(animateParticles);
      } else {
        callback();
      }
    };

    requestAnimationFrame(animateParticles);
  }

  // In drawTile, check if the tile key ends with "Special" to draw it with a red background.
  drawTile(row, col, color, yOffset = 0, xOffset = 0) {
    if (typeof color === 'string' && color.endsWith('Special')) {
      // Draw red background.
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(
        col * this.tileSize + xOffset,
        row * this.tileSize + yOffset,
        this.tileSize,
        this.tileSize,
      );
      const specialImg = this.images[color];
      if (specialImg) {
        this.ctx.drawImage(
          specialImg,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }
      return;
    }
    if (typeof color === 'string' && color.endsWith('3Points')) {
      // 1) Draw the base color’s normal image, if you have it
      const base = color.replace('3Points', ''); // e.g. "blue3Points" => "blue"
      const img = this.images[base];
      if (img) {
        this.ctx.drawImage(
          img,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      } else {
        // fallback fill if no image
        this.ctx.fillStyle = base;
        this.ctx.fillRect(
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }

      // 2) Overlay “+3”
      this.ctx.fillStyle = 'white';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(
        '+3',
        col * this.tileSize + xOffset + this.tileSize * 0.25,
        row * this.tileSize + yOffset + this.tileSize * 0.6,
      );
      return; // done drawing
    }
    if (typeof color === 'string' && color.endsWith('Multiplier')) {
      // Get the base color from the name, e.g. "blueMultiplier" -> "blue"
      const base = color.replace('Multiplier', '');

      // If you have an image for the base color, draw that image:
      const img = this.images[base];
      if (img) {
        this.ctx.drawImage(
          img,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      } else {
        // Otherwise fill with your base color
        this.ctx.fillStyle = base;
        this.ctx.fillRect(
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }

      // Draw "x2" text to indicate multiplier
      this.ctx.fillStyle = 'white';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(
        'x2',
        col * this.tileSize + xOffset + this.tileSize * 0.3,
        row * this.tileSize + yOffset + this.tileSize * 0.6,
      );
      return;
    }
    // Normal tile drawing.
    const img = this.images[color];
    if (img) {
      this.ctx.drawImage(
        img,
        col * this.tileSize + xOffset,
        row * this.tileSize + yOffset,
        this.tileSize,
        this.tileSize,
      );
    }
  }

  clickEventHandlerShowRules = () => {
    if (this.gameCount === 0) {
      setTimeout(() => {
        const emailInput = document.querySelector('.boomio-competition-email-input-field');
        const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
        const cyrillicRegex = /[\u0400-\u04FF]/;
        const containsCyrillic = (input) => cyrillicRegex.test(input.value);

        if (containsCyrillic(emailInput)) {
          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
        }

        if (containsCyrillic(playerNameInput)) {
          document.getElementById('competition-name-error').innerText = '';
          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
        }

        if (containsCyrillic(emailInput)) {
          document.getElementById('competition-email-error').innerText =
            this.language === 'LV'
              ? 'E-pastā ir nederīgas rakstzīmes'
              : 'El. pašte yra neteisingų simbolių';
          document.getElementById('competition-email-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
          return;
        }

        if (containsCyrillic(playerNameInput)) {
          document.getElementById('competition-name-error').innerText =
            this.language === 'LV'
              ? 'Lietotāja varde yra neteisingi simbolių'
              : 'Vartotojo varde yra neteisingų simbolių';
          document.getElementById('competition-name-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
          return;
        }
        if (!this.checkboxChange) {
          document.getElementById('competition-checkbox-error').innerText =
            this.language === 'LV'
              ? 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.'
              : this.customer === 'Perlas GO'
              ? 'Norint tęsti, privaloma sutikti su Perlas Go privatumo politika.'
              : this.customer === 'Vilvi'
              ? 'Registruojantis, privaloma sutikti gauti VILVI naujienas - tokiu būdu, laimėjimo atvieju,  susieksime su Jumis bei įteiksime laimėtą prizą, o pasibaigus Žaidimui siųsime naujienas.'
              : 'Registruojantis, privaloma sutikti gauti PPC AKROPOLIS naujienas - tokiu būdu susieksime su Jumis bei įteiksime laimėtą prizą, o pasibaigus Žaidimui siųsime naujienas.';

          document.getElementById('competition-checkbox-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV'
              ? '#FFBABA'
              : this.customer === 'Perlas GO' && 'white';

          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';

          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
        }
        if (emailInput?.value === '' || emailInput?.value === null) {
          document.getElementById('competition-email-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-email-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';
        }
        if (
          this.customer !== 'Perlas GO' &&
          (playerNameInput?.value === '' || playerNameInput?.value === null)
        ) {
          document.getElementById('competition-name-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-name-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';

          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';
        }
        if (this.customer === 'Perlas GO') {
          if (!isValidEmail(emailInput?.value)) {
            document.getElementById('competition-email-error').innerText =
              'Neteisingas el. pašto formatas.'; // Incorrect email format in Lithuanian
            document.getElementById('competition-email-error').zIndex = 1;
            document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';

            return;
          }
        }

        if (
          this.customer !== 'Perlas GO' &&
          (playerNameInput?.value === '' || playerNameInput?.value === null) &&
          (playerNameInput?.value === '' || playerNameInput?.value === null)
        ) {
          document.getElementById('competition-name-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-name-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
          document.getElementById('competition-email-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-email-error').style.backgroundColor =
            this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
        } else {
          if (this.showCompetitiveRegistration && this.checkboxChange) {
            boomioService
              .signal('', 'user_info', {
                emails_consent: this.checkboxChange2,
                user_email: emailInput?.value,
                user_name:
                  this.customer === 'Perlas GO' ? emailInput?.value : playerNameInput?.value,
                via_mobile: this.campaignUrl ? true : false,
              })
              .then((response) => {
                if (response.success === false) {
                  if (response.res_code === 'EMAIL_EXIST') {
                    document.getElementById('competition-email-error').innerText =
                      this.language === 'LV'
                        ? 'Šis e-pasts jau pastāv. Izmantojiet citu.'
                        : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                    document.getElementById('competition-email-error').style.backgroundColor =
                      this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
                    document.getElementById('competition-name-error').innerText = '';

                    document.getElementById('competition-name-error').style.backgroundColor =
                      'transparent';
                    document.getElementById('competition-checkbox-error').innerText = '';
                    document.getElementById('competition-checkbox-error').style.backgroundColor =
                      'transparent';
                  } else if (response.res_code === 'NICKNAME_EXIST') {
                    document.getElementById('competition-name-error').innerText =
                      this.language === 'LV'
                        ? 'Šis segvārds jau pastāv. Izmantojiet citu.'
                        : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                    document.getElementById('competition-name-error').style.backgroundColor =
                      this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';

                    document.getElementById('competition-email-error').innerText = '';
                    document.getElementById('competition-email-error').style.backgroundColor =
                      'transparent';
                    document.getElementById('competition-checkbox-error').innerText = '';
                    document.getElementById('competition-checkbox-error').style.backgroundColor =
                      'transparent';
                  }
                } else {
                  this.bestScore = response.user_best_score ?? 0;
                  const inpuRegisterContainer = document.querySelector('.input-register-container');
                  inpuRegisterContainer.style.transition =
                    'height 1s ease, top 1s ease, opacity 1s ease';
                  setTimeout(() => {
                    inpuRegisterContainer.style.height = '10px';
                    inpuRegisterContainer.style.top = 'calc(50% + 330px)';
                    inpuRegisterContainer.style.opacity = 0;
                  }, 100);
                  setTimeout(() => {
                    inpuRegisterContainer.style.display = 'none';
                  }, 1000);
                  setTimeout(() => {
                    const canvas = document.getElementById('boomio-crush-canvas');
                    document.getElementById('background_blur').style.opacity =
                      this.language === 'LV' ? 0.4 : 0.37;
                    canvas.style.transition = 'filter 0.6s ease';
                    canvas.style.filter = 'blur(2px)';
                    const inputContainer = document.querySelector('.input-container');
                    document.getElementById('control-button').style.transition = 'opacity 2s ease';
                    document.getElementById('control-button').style.opacity = 1;
                    document.getElementById('control-button').style.display = 'flex';
                    inputContainer.style.transition =
                      'height 1s ease, top 1s ease, opacity 1s ease';
                    inputContainer.style.display = 'block';
                    setTimeout(() => {
                      inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
                      inputContainer.style.top = `calc(50% + ${
                        this.isMobileHeightSmall ? '110px' : '170px'
                      })`;
                      inputContainer.style.opacity = 1;
                    }, 100);
                  }, 300);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
      }, 300);
    }
  };

  addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.handleTileSelection(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleTileSwap(e));
    if (this.showCompetitiveRegistration && this.customer !== 'Pigu.lt') {
      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', this.clickEventHandlerShowRules);
    }
    const restart = document.getElementById('boomio-game-play-again');
    restart.addEventListener('click', this.restartGame);
    const start = document.getElementById('control-button');
    start.addEventListener('click', this.initGame);
  }

  removeRules = () => {
    if (!this.checkboxChange3 && this.customer === 'Pigu.lt' && this.userBestScore <= 0) {
      document.getElementById('boomio-rules-checkbox-error').innerText =
        this.customer === 'Pigu.lt' && this.language === 'EN'
          ? 'To continue, it is mandatory to agree to receive news and information about prizes.'
          : this.customer === 'Pigu.lt' && this.language === 'LV'
          ? 'Lai turpinātu, ir obligāti jāpiekrīt saņemt jaunumus un informāciju par balvām.'
          : this.customer === 'Pigu.lt' && this.language === 'ET'
          ? 'Jätkamiseks on vajalik nõustuda mängu uudiste ja auhindade teavituste saamisega.'
          : this.customer === 'Pigu.lt' && this.language === 'FI'
          ? 'Jatkaaksesi sinun tulee hyväksyä pelin tietojen ja palkintotietojen vastaanottaminen.'
          : this.customer === 'Pigu.lt' && this.language === 'RU'
          ? 'Чтобы продолжить, необходимо согласиться на получение новостей и информации о призах.'
          : '';
      document.getElementById('boomio-rules-checkbox-error').style.display = 'block';

      document.getElementById('boomio-rules-checkbox-error').style.backgroundColor = '#FFBABA';
    }

    if (this.customer !== 'Pigu.lt' || this.checkboxChange3 || this.userBestScore > 0) {
      const inputContainer = document.querySelector('.input-container');
      const controlButton = document.querySelector('.control-button');

      inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      controlButton.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        inputContainer.style.height = '10px';
        inputContainer.style.top = 'calc(50% + 330px)';
        inputContainer.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        inputContainer.style.display = 'none';
      }, 1000);

      if (this.gameCount === 0) {
        const controlButton = document.querySelector('.control-button');
        controlButton.style.display = 'none';
        this.index = 0;
      }
    }
  };

  initGame = () => {
    this.removeRules();
    if (this.customer !== 'Pigu.lt' || this.checkboxChange3 || this.userBestScore > 0) {
      if (!this.tutorial) {
        setTimeout(() => {
          if (this.showCompetitiveRegistration) {
            boomioService
              .signal('ROUND_STARTED', 'signal')
              .then((response) => {
                if (this.customer === 'Pigu.lt') {
                  if (window.Boomio) {
                    window.Boomio.logEvent('game_started', JSON.stringify(response));
                  } else if (
                    window.webkit &&
                    window.webkit.messageHandlers &&
                    window.webkit.messageHandlers.Boomio
                  ) {
                    var message = {
                      command: 'logEvent',
                      name: 'game_started',
                      parameters: { response },
                    };
                    window.webkit.messageHandlers.Boomio.postMessage(message);
                  } else {
                    console.log('No native APIs found.');
                  }
                }
              })

              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }, 50);

        this.startGameLoop();
        this.startTimer();
      } else {
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({ event: 'Game_Start' });
        }

        this.showtutorial();
      }
    }
  };

  restartGame() {
    this.currentScore = 0;
    document.getElementById('score').innerText = 'Score: 0';
    this.startTimer();
    this.generateValidGrid();
    this.selectedTile = null;
    this.drawGrid();
  }

  handleTileSelection(event) {
    if (this.isAnimating) return; // Prevent tile selection during animations
    const { row, col } = this.getTilePosition(event);
    this.selectedTile = { row, col };
  }

  getTilePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { col: Math.floor(x / this.tileSize), row: Math.floor(y / this.tileSize) };
  }

  handleTileSwap(event) {
    if (this.isAnimating) return; // Prevent tile swap during animations
    if (!this.selectedTile) return;
    const { row, col } = this.getTilePosition(event);
    if (
      (Math.abs(row - this.selectedTile.row) === 1 && col === this.selectedTile.col) ||
      (Math.abs(col - this.selectedTile.col) === 1 && row === this.selectedTile.row)
    ) {
      const tile1 = this.selectedTile;
      const tile2 = { row, col };
      console.log(`🔄 Swapping (${tile1.row}, ${tile1.col}) with (${tile2.row}, ${tile2.col})`);
      this.isAnimating = true; // Set flag to true at the start of animation
      this.animateTileSwap(tile1, tile2, () => {
        console.log('🔎 Checking for matches after swap...');
        const matches = this.findMatches();
        if (matches.length > 0) {
          console.log('✅ Matches found, processing...');
          this.selectedTile = null;
          this.processMatches();
        } else {
          console.log('❌ No matches found, swapping back.');
          this.animateTileSwap(tile2, tile1, () => {
            this.selectedTile = null;
            this.drawGrid();

            setTimeout(() => {
              this.isAnimating = false;
            }, 500);
          });
        }
      });
    }
  }
  animateTileSwap(tile1, tile2, callback) {
    const duration = 200; // duration of the animation in milliseconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          let xOffset = 0;
          let yOffset = 0;
          if (row === tile1.row && col === tile1.col) {
            xOffset = (tile2.col - tile1.col) * this.tileSize * progress;
            yOffset = (tile2.row - tile1.row) * this.tileSize * progress;
          } else if (row === tile2.row && col === tile2.col) {
            xOffset = (tile1.col - tile2.col) * this.tileSize * progress;
            yOffset = (tile1.row - tile2.row) * this.tileSize * progress;
          }
          this.drawTile(row, col, this.grid[row][col], yOffset, xOffset);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.swapTiles(tile1, tile2); // Ensure tiles are swapped before checking for matches
        this.drawGrid();
        callback();
        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };

    requestAnimationFrame(animate);
  }
  swapTiles(tile1, tile2) {
    const temp = this.grid[tile1.row][tile1.col];
    this.grid[tile1.row][tile1.col] = this.grid[tile2.row][tile2.col];
    this.grid[tile2.row][tile2.col] = temp;
  }

  hasMatchesAfterSwap(tile1, tile2) {
    console.log(
      `Checking matches after swapping (${tile1.row}, ${tile1.col}) and (${tile2.row}, ${tile2.col})`,
    );
    const matches = this.findMatches();
    const hasMatches = matches.length > 0;
    if (!hasMatches) {
      console.log('No matches found after swap, reverting swap.');
    } else {
      console.log('Matches found after swap.');
    }
    return hasMatches;
  }

  checkForMatches(tile) {
    const { row, col } = tile;
    const color = this.grid[row][col];
    let horizontalMatch = 1;
    let verticalMatch = 1;
    for (let i = col - 1; i >= 0 && this.grid[row][i] === color; i--) {
      horizontalMatch++;
    }
    for (let i = col + 1; i < this.gridSize && this.grid[row][i] === color; i++) {
      horizontalMatch++;
    }
    for (let i = row - 1; i >= 0 && this.grid[i][col] === color; i--) {
      verticalMatch++;
    }
    for (let i = row + 1; i < this.gridSize && this.grid[i][col] === color; i++) {
      verticalMatch++;
    }
    const hasMatch = horizontalMatch >= 3 || verticalMatch >= 3;
    if (hasMatch) {
      console.log(`Match found at (${row}, ${col}) with color ${color}`);
    } else {
      console.log(`No match found at (${row}, ${col}) with color ${color}`);
    }
    console.log(`Horizontal match length: ${horizontalMatch}`);
    console.log(`Vertical match length: ${verticalMatch}`);
    return hasMatch;
  }

  activateMultiplier() {
    this.multiplier = 2;

    // OPTIONAL: If you have an on-screen element to show multiplier status
    const multEl = document.getElementById('multiplier-indicator');
    if (multEl) {
      multEl.innerText = 'x2 MULTIPLIER (10s)';
    }

    setTimeout(() => {
      this.multiplier = 1;
      if (multEl) {
        multEl.innerText = '';
      }
    }, 10000);
  }

  processMatches(chain = 0) {
    // Prevent infinite loops / handle large chain reactions
    if (chain > 10) {
      console.log('Chain reaction limit reached. Stopping further processing.');
      return;
    }

    // Find initial matches in the grid
    const initialMatches = this.findMatches();
    if (initialMatches.length > 0) {
      // Expand matches to include all connected cells of the same base color
      let extendedMatches = new Set();
      initialMatches.forEach(({ row, col }) => {
        extendedMatches.add(`${row}-${col}`);
        const baseColor = this.getBaseColor(this.grid[row][col]);
        const connected = this.getConnectedCells(row, col, baseColor);
        connected.forEach((cell) => {
          extendedMatches.add(`${cell.row}-${cell.col}`);
        });
      });

      // Convert the Set into an array of {row, col} objects
      const matchArray = [...extendedMatches].map((pos) => {
        const [r, c] = pos.split('-').map(Number);
        return { row: r, col: c };
      });

      // Prepare to handle special tiles or extra point tiles
      let specialFound = null;
      let totalBasePoints = 0;

      // Loop through matched tiles to find:
      // 1) Special tiles (e.g., "redSpecial") to explode
      // 2) 3-Point tiles (ends with "3Points") to add 3 points
      //    otherwise each tile is worth 1 point
      matchArray.forEach(({ row, col }) => {
        const tileVal = this.grid[row][col];

        // If the tile is a special bomb/explosive
        if (typeof tileVal === 'string' && tileVal.endsWith('Special')) {
          specialFound = { row, col };
        }

        // Tally points:
        if (typeof tileVal === 'string' && tileVal.endsWith('3Points')) {
          // This tile is worth 3 points
          totalBasePoints += 3;
        } else {
          // Normal tile is worth 1 point
          totalBasePoints += 1;
        }
      });

      // If a special tile is found, explode it and exit this function
      if (specialFound) {
        console.log('Special tile triggered! Exploding matched group and adjacent area.');
        this.explodeTile(specialFound);
        return; // Once we trigger explodeTile, we let that flow handle gravity, etc.
      }

      // Otherwise, just add the calculated points (use multiplier if you have one)
      // e.g. this.currentScore += totalBasePoints * this.multiplier;
      // If you don't have a multiplier, just do:
      this.currentScore += totalBasePoints;

      // Update score display
      document.getElementById('score').innerText = `Score: ${this.currentScore}`;

      // Animate the match effect, then clear matched tiles, apply gravity, and check for new matches
      this.animateMatchEffect(matchArray, () => {
        matchArray.forEach(({ row, col }) => {
          // Clear matched tiles, unless it's some other special logic you want to skip
          this.grid[row][col] = null;
        });

        // Gravity will drop new tiles in; then we recursively call processMatches to check for combos
        this.applyGravity(() => {
          this.processMatches(chain + 1);
        });
      });
    }
  }

  explodeTile(centerTile, callback) {
    const specialKey = this.grid[centerTile.row][centerTile.col];
    const targetRow = centerTile.row;
    const targetCol = centerTile.col;

    // Remove the special tile from the grid immediately.
    this.grid[targetRow][targetCol] = null;

    // Define the explosion area as a 3×3 block around the special tile's position.
    let explosionArea = [];
    const radius = 1;
    for (let r = targetRow - radius; r <= targetRow + radius; r++) {
      for (let c = targetCol - radius; c <= targetCol + radius; c++) {
        if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
          explosionArea.push({ row: r, col: c });
        }
      }
    }

    // Award points for each tile in the explosion area.
    // (You could adjust the points logic as needed.)
    this.currentScore += explosionArea.length * this.multiplier;
    document.getElementById('score').innerText = `Score: ${this.currentScore}`;

    // Animate the explosion over that area.
    this.animateExplosion(explosionArea, () => {
      // Before clearing the area, collect any special cells in it.
      let additionalSpecials = [];
      explosionArea.forEach(({ row, col }) => {
        const tileVal = this.grid[row][col];
        if (typeof tileVal === 'string' && tileVal.endsWith('Special')) {
          additionalSpecials.push({ row, col });
        }
      });

      // Clear all cells in the explosion area.
      explosionArea.forEach(({ row, col }) => {
        this.grid[row][col] = null;
      });

      // Process additional special explosions sequentially.
      const processAdditionalExplosions = (specials, done) => {
        if (specials.length === 0) {
          done();
          return;
        }
        // Explode the first special cell.
        const next = specials.shift();
        this.explodeTile(next, () => {
          // After that explosion, process the remaining specials.
          processAdditionalExplosions(specials, done);
        });
      };

      processAdditionalExplosions(additionalSpecials, () => {
        // After processing all additional explosions, if a callback was provided, call it.
        if (callback) {
          callback();
        } else {
          // Otherwise, apply gravity and process further matches.
          this.applyGravity(() => {
            this.processMatches();
          });
        }
      });
    });
  }

  animateExplosion(tiles, callback) {
    const duration = 300;
    const startTime = performance.now();
    this.isAnimating = true; // Set flag to true at the start of animation

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      tiles.forEach(({ row, col }) => {
        const centerX = col * this.tileSize + this.tileSize / 2;
        const centerY = row * this.tileSize + this.tileSize / 2;
        const maxRadius = this.tileSize;
        const currentRadius = maxRadius * progress;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(255, 0, 0, ${1 - progress})`;
        this.ctx.fill();
      });
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();

        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };
    requestAnimationFrame(animate);
  }
  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.drawTile(row, col, this.grid[row][col]);
      }
    }
  }

  startGameLoop() {
    setTimeout(() => {
      document.getElementById('background_blur').style.display = 'none';
      const canvas = document.getElementById('boomio-crush-canvas');
      canvas.style.transition = 'filter 1s ease';
      canvas.style.filter = 'none';
      this.gamePlaying = true;
    }, 400);
    document.getElementById('game-content').style.display = 'block';
    const gameLoop = () => {
      this.update();
      this.drawGrid();
      if (this.timer > 0) {
        requestAnimationFrame(gameLoop);
      }
    };
    requestAnimationFrame(gameLoop);
  }

  update() {
    // Update game state here
  }
}

export default () => {
  new CrushGame();
};
