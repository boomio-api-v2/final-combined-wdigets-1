import {
  newRecordEE,
  newRecordFI,
  newRecordRU,
  newRecordLV,
  newRecordEn,
  newRecord,
  checkIcon,
  uncheckIcon,
  star,
  stopwatch,
  crushElement1Nevezis,
  crushElement2Nevezis,
  crushElement3Nevezis,
  crushElement4Nevezis,
  crushElement5Nevezis,
  crushElement6Nevezis,
  crushElement7Nevezis,
  crushElement1NevezisSpecial,
  crushElement2NevezisSpecial,
  crushElement3NevezisSpecial,
  crushElement4NevezisSpecial,
  crushElement5NevezisSpecial,
  crushElement6NevezisSpecial,
  crushElement7NevezisSpecial,
  backgroundNevezis,
  crushElement1Toni,
  crushElement2Toni,
  crushElement3Toni,
  crushElement4Toni,
  crushElement5Toni,
  crushElement6Toni,
  crushElement7Toni,
  crushElement1ToniSpecial,
  crushElement2ToniSpecial,
  crushElement3ToniSpecial,
  crushElement4ToniSpecial,
  crushElement5ToniSpecial,
  crushElement6ToniSpecial,
  crushElement7ToniSpecial,
  backgroundToni,
  crushElement1Pigu,
  crushElement2Pigu,
  crushElement3Pigu,
  crushElement4Pigu,
  crushElement5Pigu,
  crushElement6Pigu,
  crushElement1PiguSpecial,
  crushElement2PiguSpecial,
  crushElement3PiguSpecial,
  crushElement4PiguSpecial,
  crushElement5PiguSpecial,
  crushElement6PiguSpecial,
  backgroundPigu,
  tutorial,
  close,
  crushElement1ZemaitijosPienas,
  crushElement2ZemaitijosPienas,
  crushElement3ZemaitijosPienas,
  crushElement4ZemaitijosPienas,
  crushElement5ZemaitijosPienas,
  crushElement6ZemaitijosPienas,
  crushElement7ZemaitijosPienas,
  crushElement1ZemaitijosPienasSpecial,
  crushElement2ZemaitijosPienasSpecial,
  crushElement3ZemaitijosPienasSpecial,
  crushElement4ZemaitijosPienasSpecial,
  crushElement5ZemaitijosPienasSpecial,
  crushElement6ZemaitijosPienasSpecial,
  crushElement7ZemaitijosPienasSpecial,
  backgroundZemaitijosPienas,
  backgroundGamtosAteitisGlass,
  backgroundGamtosAteitisPaper,
  backgroundGamtosAteitisPlastic,
  crushElement1GamtosAteitisGlass,
  crushElement2GamtosAteitisGlass,
  crushElement3GamtosAteitisGlass,
  crushElement4GamtosAteitisGlass,
  crushElement5GamtosAteitisGlass,
  crushElement6GamtosAteitisGlass,
  crushElement7GamtosAteitisGlass,
  crushElement1GamtosAteitisGlassSpecial,
  crushElement2GamtosAteitisGlassSpecial,
  crushElement3GamtosAteitisGlassSpecial,
  crushElement4GamtosAteitisGlassSpecial,
  crushElement5GamtosAteitisGlassSpecial,
  crushElement6GamtosAteitisGlassSpecial,
  crushElement7GamtosAteitisGlassSpecial,
  crushElement1GamtosAteitisPaper,
  crushElement2GamtosAteitisPaper,
  crushElement3GamtosAteitisPaper,
  crushElement4GamtosAteitisPaper,
  crushElement5GamtosAteitisPaper,
  crushElement6GamtosAteitisPaper,
  crushElement7GamtosAteitisPaper,
  crushElement1GamtosAteitisPaperSpecial,
  crushElement2GamtosAteitisPaperSpecial,
  crushElement3GamtosAteitisPaperSpecial,
  crushElement4GamtosAteitisPaperSpecial,
  crushElement5GamtosAteitisPaperSpecial,
  crushElement6GamtosAteitisPaperSpecial,
  crushElement7GamtosAteitisPaperSpecial,
  crushElement1GamtosAteitisPlastic,
  crushElement2GamtosAteitisPlastic,
  crushElement3GamtosAteitisPlastic,
  crushElement4GamtosAteitisPlastic,
  crushElement5GamtosAteitisPlastic,
  crushElement6GamtosAteitisPlastic,
  crushElement7GamtosAteitisPlastic,
  crushElement1GamtosAteitisPlasticSpecial,
  crushElement2GamtosAteitisPlasticSpecial,
  crushElement3GamtosAteitisPlasticSpecial,
  crushElement4GamtosAteitisPlasticSpecial,
  crushElement5GamtosAteitisPlasticSpecial,
  crushElement6GamtosAteitisPlasticSpecial,
  crushElement7GamtosAteitisPlasticSpecial,
} from './constants';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { ShareContainer } from '../helpers/ShareContainer';

import './styles.css';

class CrushGame {
  constructor() {
    const currentPageUrl = window.location.href;
    this.urlParams = new URL(currentPageUrl).searchParams;
    this.user_id = this.urlParams.get('user_id');

    this.shareClicked = false;

    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Gamtos Ateitis Random';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.campaignUrl = this.config.campaignUrl ? this.config.campaignUrl : '';
    this.gameCount = 0;
    this.language = this.config.language ? this.config.language : 'LT';

    this.currentScoreTable = {};
    this.gridCols = 5;
    this.gridRows = 8;
    this.tileSize = 68;
    this.colors =
      this.customer === 'Pigu.lt'
        ? {
            crushElement1Pigu,
            crushElement2Pigu,
            crushElement3Pigu,
            crushElement4Pigu,
            crushElement5Pigu,
            crushElement6Pigu,
          }
        : this.customer === 'Zemaitijos Pienas'
        ? {
            crushElement1ZemaitijosPienas,
            crushElement2ZemaitijosPienas,
            crushElement3ZemaitijosPienas,
            crushElement4ZemaitijosPienas,
            crushElement5ZemaitijosPienas,
            crushElement6ZemaitijosPienas,
            crushElement7ZemaitijosPienas,
          }
        : this.customer === 'Toni'
        ? {
            crushElement1Toni,
            crushElement2Toni,
            crushElement3Toni,
            crushElement4Toni,
            crushElement5Toni,
            crushElement6Toni,
            crushElement7Toni,
          }
        : this.customer?.includes('Glass')
        ? {
            crushElement1GamtosAteitisGlass,
            crushElement2GamtosAteitisGlass,
            crushElement3GamtosAteitisGlass,
            crushElement4GamtosAteitisGlass,
            crushElement5GamtosAteitisGlass,
            crushElement6GamtosAteitisGlass,
            crushElement7GamtosAteitisGlass,
          }
        : this.customer?.includes('Paper')
        ? {
            crushElement1GamtosAteitisPaper,
            crushElement2GamtosAteitisPaper,
            crushElement3GamtosAteitisPaper,
            crushElement4GamtosAteitisPaper,
            crushElement5GamtosAteitisPaper,
            crushElement6GamtosAteitisPaper,
            crushElement7GamtosAteitisPaper,
          }
        : this.customer?.includes('Plastic')
        ? {
            crushElement1GamtosAteitisPlastic,
            crushElement2GamtosAteitisPlastic,
            crushElement3GamtosAteitisPlastic,
            crushElement4GamtosAteitisPlastic,
            crushElement5GamtosAteitisPlastic,
            crushElement6GamtosAteitisPlastic,
            crushElement7GamtosAteitisPlastic,
          }
        : {
            crushElement1Nevezis,
            crushElement2Nevezis,
            crushElement3Nevezis,
            crushElement4Nevezis,
            crushElement5Nevezis,
            crushElement6Nevezis,
            crushElement7Nevezis,
          };
    this.grid = [];
    this.selectedTile = null;
    this.images = {};
    this.currentScore = 0;
    this.multiplier = 2;
    this.isAnimating = false; // Add this flag
    this.timer = 120; // Add timer property
    this.timerInterval = null; // Add timer interval property
    this.tutorial = true;

    this.startLoading();
  }

  isUserIdSet() {
    const v = this.user_id;
    if (v == null) return false; // null or undefined
    const s = String(v).trim().toLowerCase();
    return s.length > 0 && s !== 'null' && s !== 'undefined';
  }

  startLoading() {
    this.preloadImages(() => {
      this.createContainer();

      this.setupCanvas();
      this.generateValidGrid();
      this.addEventListeners();
      setTimeout(() => {
        if (this.gameCount === 0) {
          document.getElementById('background_blur').style.display = 'block';
          document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
        }
        this.showRulesOrRegistration();
      }, 50); //intro speed
    });
  }

  showRulesOrRegistration = () => {
    if (this.customer === 'Pigu.lt' && this.userBestScore <= 0) {
      const checkboxImg3 = document.querySelector('.boomio-rules-privacyCheckbox');
      checkboxImg3.addEventListener('click', () => {
        this.checkboxChange3 = !this.checkboxChange3;
        const checkboxImgChange3 = document.getElementById('boomio-rules-privacyCheckbox-img');
        checkboxImgChange3.src = this.checkboxChange3 ? checkIcon : uncheckIcon;
      });
    }
    if (this.showCompetitiveRegistration && !this.isUserIdSet()) {
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
      emailInput.addEventListener('input', () => {});

      setTimeout(() => {
        document.getElementById('background_blur').style.opacity =
          this.language === 'LV' ? 0.4 : 0.2;
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
    } else if (this.isUserIdSet()) {
      const canvas = document.getElementById('boomio-crush-canvas');
      canvas.style.transition = 'filter 0.6s ease';
      canvas.style.filter = 'blur(0px)';
      boomioService
        .signal('', 'user_info', {
          emails_consent: true,
          user_email: this.user_id,
          user_name: this.user_id,
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
    } else if (this.customer === 'Perlas GO' && !this.isUserIdSet()) {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: this.user_id,
          user_name: this.user_id,
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
        document.getElementById('background_blur').style.opacity =
          this.language === 'LV' ? 0.4 : 0.2;
        const inputContainer = document.querySelector('.input-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inputContainer.style.display = 'block';
        setTimeout(() => {
          inputContainer.style.height = '332px';
          inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '170px'})`;
          inputContainer.style.opacity = 1;
        }, 100);
      }, 300);
    }
  };

  showRulesPigu = () => {
    this.config = localStorageService.getDefaultConfig();
    this.userBestScore = this?.config?.userBestScore ? this?.config?.userBestScore : 0;

    // if (this.customer === 'Pigu.lt') {
    //   if (this.userBestScore > 0) {
    //     document.getElementById('boomio-rules-privacyCheckbox').style.display = 'none';
    //   }
    //   const competitionTableContainer = document.querySelector('.competition-table-container-pigu');

    //   competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    //   setTimeout(() => {
    //     competitionTableContainer.style.height = '10px';
    //     competitionTableContainer.style.top = 'calc(50% + 330px)';
    //     competitionTableContainer.style.opacity = 0;
    //   }, 100);
    //   setTimeout(() => {
    //     competitionTableContainer.style.display = 'none';
    //   }, 1000);
    // }
    setTimeout(() => {
      document.getElementById('background_blur').style.opacity = this.language === 'LV' ? 0.4 : 0.2;
      const inputContainer = document.querySelector('.input-container');
      document.getElementById('control-button').style.transition = 'opacity 2s ease';
      document.getElementById('control-button').style.opacity = 1;
      inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      inputContainer.style.display = 'block';
      setTimeout(() => {
        inputContainer.style.height = '332px';
        inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '170px'})`;
        inputContainer.style.opacity = 1;
      }, 100);
    }, 300);
  };

  startTimer() {
    const currectScoreDiv = document.getElementsByClassName('boomio-time-input-container')[0];
    currectScoreDiv.style.transition = 'opacity 0.8s ease';
    currectScoreDiv.style.display = 'block';
    currectScoreDiv.style.opacity = 1;

    const timerElement = document.getElementById('currentTime');
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timer = 120;
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerElement.innerText = `${this.timer}`;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.isAnimating = true;
    this.showFinishMenu();
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

  showFinishMenu = () => {
    let currectTimeDiv = document.getElementsByClassName('boomio-time-input-container')[0];

    currectTimeDiv.style.opacity = 0;
    setTimeout(() => {
      currectTimeDiv.style.display = 'none';
    }, 300);
    const canvas = document.getElementById('boomio-crush-canvas');
    if (canvas) {
      canvas.style.display = 'none';
    }
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
        if (this.customer !== 'Pigu.lt') {
          if (this.showCompetitiveRegistration) {
            boomioService
              .signal('ROUND_FINISHED', 'signal', {
                score: this.currentScore,
                shared_somewhere: this.shareClicked,
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
        }
        if (this.showCompetitiveRegistration) {
          let competitionTableContainer = '';

          if (this.customer === 'Pigu.lt') {
            competitionTableContainer = document.querySelector('.share-container');
          } else if (this.customer === 'Nevezis') {
            competitionTableContainer = document.querySelector('.did-you-know-container');
          } else {
            competitionTableContainer = document.querySelector('.competition-table-container');
          }

          document.getElementById('background_blur').style.display = 'block';
          document.getElementById('background_blur').style.opacity =
            this.language === 'LV' ? 0.4 : 0.2;
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

          document.getElementById('background_blur').style.display = 'block';
          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          inputContainer.style.display = 'block';
          setTimeout(() => {
            inputContainer.style.height = '332px';
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
          nRow < this.gridRows &&
          nCol >= 0 &&
          nCol < this.gridCols &&
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

  preloadImages(callback) {
    const normalColorKeys = Object.keys(this.colors);
    const specialSources =
      this.customer === 'Pigu.lt'
        ? {
            crushElement1PiguSpecial,
            crushElement2PiguSpecial,
            crushElement3PiguSpecial,
            crushElement4PiguSpecial,
            crushElement5PiguSpecial,
            crushElement6PiguSpecial,
          }
        : this.customer === 'Toni'
        ? {
            crushElement1ToniSpecial,
            crushElement2ToniSpecial,
            crushElement3ToniSpecial,
            crushElement4ToniSpecial,
            crushElement5ToniSpecial,
            crushElement6ToniSpecial,
            crushElement7ToniSpecial,
          }
        : this.customer === 'Zemaitijos Pienas'
        ? {
            crushElement1ZemaitijosPienasSpecial,
            crushElement2ZemaitijosPienasSpecial,
            crushElement3ZemaitijosPienasSpecial,
            crushElement4ZemaitijosPienasSpecial,
            crushElement5ZemaitijosPienasSpecial,
            crushElement6ZemaitijosPienasSpecial,
            crushElement7ZemaitijosPienasSpecial,
          }
        : this.customer?.includes('Glass')
        ? {
            crushElement1GamtosAteitisGlassSpecial,
            crushElement2GamtosAteitisGlassSpecial,
            crushElement3GamtosAteitisGlassSpecial,
            crushElement4GamtosAteitisGlassSpecial,
            crushElement5GamtosAteitisGlassSpecial,
            crushElement6GamtosAteitisGlassSpecial,
            crushElement7GamtosAteitisGlassSpecial,
          }
        : this.customer?.includes('Paper')
        ? {
            crushElement1GamtosAteitisPaperSpecial,
            crushElement2GamtosAteitisPaperSpecial,
            crushElement3GamtosAteitisPaperSpecial,
            crushElement4GamtosAteitisPaperSpecial,
            crushElement5GamtosAteitisPaperSpecial,
            crushElement6GamtosAteitisPaperSpecial,
            crushElement7GamtosAteitisPaperSpecial,
          }
        : this.customer?.includes('Plastic')
        ? {
            crushElement1GamtosAteitisPlasticSpecial,
            crushElement2GamtosAteitisPlasticSpecial,
            crushElement3GamtosAteitisPlasticSpecial,
            crushElement4GamtosAteitisPlasticSpecial,
            crushElement5GamtosAteitisPlasticSpecial,
            crushElement6GamtosAteitisPlasticSpecial,
            crushElement7GamtosAteitisPlasticSpecial,
          }
        : {
            crushElement1NevezisSpecial,
            crushElement2NevezisSpecial,
            crushElement3NevezisSpecial,
            crushElement4NevezisSpecial,
            crushElement5NevezisSpecial,
            crushElement6NevezisSpecial,
            crushElement7NevezisSpecial,
          };
    const specialKeys = Object.keys(specialSources);

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
      img.onerror = () => {
        console.error('❌ Failed to load normal image:', img.src);
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      };
    });

    // Load special candy images.
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
      img.onerror = () => {
        console.error('❌ Failed to load special image:', img.src);
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

      <div id="close-game-container" class="close-game-container" style="display:${
        this.customer === 'Pigu.lt' ? 'none' : 'block'
      };width:32px;height:32px;z-index:10000; pointer-events:auto; cursor:pointer;">
        <img src=${close} alt="Close" style="width:100%;height:100%;pointer-events:none;"></img>
      </div>
           
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
                : this.language === 'ET' || this.language === 'ET'
                ? newRecordEE
                : this.language === 'FI'
                ? newRecordFI
                : this.language === 'RU'
                ? newRecordRU
                : newRecord
            } alt="Image Description" style="width: 100%; height: 100%;">
            </div>
        
        
            ${new InputContainer(this.customer, 'crush').createInputContainerDiv('crush').outerHTML}


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


<div style="position: absolute;z-index:999;pointer-events:none" class="tutorial" id="tutorial">
${`<div style="${
  this.customer === 'Fpro' ? 'gap:50px' : 'gap:20px'
};display:flex;color: #FFF;text-shadow: 4px 4px 120px rgba(255, 255, 255, 0.41);font-family: Georama;font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: uppercase;">
    <div>${
      this.language == 'LV'
        ? 'PAVELC'
        : this.language == 'ET'
        ? 'LEHITSE'
        : this.language == 'FI'
        ? 'Pyyhkäise'
        : this.language == 'RU'
        ? 'ПОТЯНИ'
        : this.language == 'ES'
        ? 'DESLIZA'
        : 'BRŪKŠT'
    }</div>
    <div>${
      this.language == 'LV'
        ? 'PAVELC'
        : this.language == 'ET'
        ? 'LEHITSE'
        : this.language == 'FI'
        ? 'Pyyhkäise'
        : this.language == 'RU'
        ? 'ПОТЯНИ'
        : this.language == 'ES'
        ? 'DESLIZA'
        : 'BRŪKŠT'
    }</div>
  </div><img src=${tutorial} alt="Image Description" style="margin-left:50px;width: 74px; height: 137.5px;">`}
</div>





<div class="boomio-time-input-container" style="top:calc(50% - 290px);box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;
background:${
      this.customer === 'Toni'
        ? '#262B8C'
        : this.customer?.includes('Glass')
        ? '#18904A'
        : this.customer?.includes('Plastic')
        ? '#FBCA00'
        : this.customer?.includes('Paper')
        ? '#488DB0'
        : '#E1251B'
    };border-radius:35px">
<div style="width: 1208px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${stopwatch} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

<div style="text-align: center; color: white; font-size: 20px; font-family:${
      this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
    } ;font-weight: 900; word-wrap: break-word;position:absolute;left:28px;top:17px;z-index:3;line-height:30px;" id="currentTime"></div>
</div>
</div>

    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer === 'Toni'
        ? '#262B8C'
        : this.customer?.includes('Glass')
        ? '#18904A'
        : this.customer?.includes('Plastic')
        ? '#FBCA00'
        : this.customer?.includes('Paper')
        ? '#488DB0'
        : '#E1251B'
    };border-radius:35px">
    <div style="width: 1208px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:18px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${'Georama'}; font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>

<img src="${
      this.customer === 'Pigu.lt'
        ? backgroundPigu
        : this.customer === 'Zemaitijos Pienas'
        ? backgroundZemaitijosPienas
        : this.customer === 'Toni'
        ? backgroundToni
        : this.customer?.includes('Paper')
        ? backgroundGamtosAteitisPaper
        : this.customer?.includes('Plastic')
        ? backgroundGamtosAteitisPlastic
        : this.customer?.includes('Glass')
        ? backgroundGamtosAteitisGlass
        : backgroundNevezis
    }" 
     alt="Game Background"
     id="background_nevezis"
     style="z-index:0;
            width: ${
              document.documentElement.clientWidth < 418
                ? document.documentElement.clientWidth + 'px'
                : '418px'
            };
            height: 668px;
            position: absolute;
            pointer-events: none;
            object-fit: cover;
            display: block;">



             <div alt="Image Description" style="z-index:1;width: ${
               document.documentElement.clientWidth < 418
                 ? document.documentElement.clientWidth + 'px'
                 : '418px'
             }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;background-color:${'black'}" id="background_blur"></div>

        <!-- Game content container hidden initially -->
        <div id="game-content" style="display: none;">

        
          <div id="crush-game-background"></div>
          <canvas id="boomio-crush-canvas" class="boomio-crush-canvas" style="margin-top:50px;" width="${
            this.gridCols * this.tileSize
          }" height="${this.gridRows * this.tileSize}"></canvas>
        </div>
 
      </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
    const gameContainer = document.querySelector('.game-container');

    this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
      this.customer,
      this.currentScoreTable,
      this.currentScore,
    );
    gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);

    if (this.customer === 'Nevezis') {
      const gameContainer = document.querySelector('.game-container');

      const didYouKnowContainer = new DidYouKnowContainer(this.customer);
      gameContainer.appendChild(didYouKnowContainer.containerDiv);
    }

    document.addEventListener('shareClicked', (event) => {
      if (this.shareClicked === false) {
        console.log('shareClicked');
        this.shareClicked = true;
        this.currentScore = this.currentScore + 100;
      }
    });
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');

      this.shareContainer = new ShareContainer(this.customer);
      gameContainer.appendChild(this.shareContainer.containerDiv);
    }
  }

  setupCanvas() {
    this.canvas = document.getElementById('boomio-crush-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / this.tileSize);
      const row = Math.floor(y / this.tileSize);

      if (
        row >= 0 &&
        row < this.gridRows &&
        col >= 0 &&
        col < this.gridCols &&
        this.grid[row][col] !== null
      ) {
        this.canvas.style.cursor = 'pointer';
      } else {
        this.canvas.style.cursor = 'default';
      }
    });
  }

  generateValidGrid() {
    do {
      this.generateGrid();
    } while (this.hasInitialMatches() || !this.findFirstPossibleMove());
  }

  generateGrid() {
    for (let row = 0; row < this.gridRows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridCols; col++) {
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

    // Only add 3Points if baseColor is allowed and not already special
    const threePointColors =
      this.customer === 'Pigu.lt'
        ? [
            'crushElement1Pigu',
            'crushElement2Pigu',
            'crushElement3Pigu',
            'crushElement4Pigu',
            'crushElement5Pigu',
            'crushElement6Pigu',
          ]
        : this.customer === 'Zemaitijos Pienas'
        ? [
            'crushElement1ZemaitijosPienas',
            'crushElement2ZemaitijosPienas',
            'crushElement3ZemaitijosPienas',
            'crushElement4ZemaitijosPienas',
            'crushElement5ZemaitijosPienas',
            'crushElement6ZemaitijosPienas',
            'crushElement7ZemaitijosPienas',
          ]
        : this.customer?.includes('Glass')
        ? [
            'crushElement1GamtosAteitisGlass',
            'crushElement2GamtosAteitisGlass',
            'crushElement3GamtosAteitisGlass',
            'crushElement4GamtosAteitisGlass',
            'crushElement5GamtosAteitisGlass',
            'crushElement6GamtosAteitisGlass',
            'crushElement7GamtosAteitisGlass',
          ]
        : this.customer?.includes('Paper')
        ? [
            'crushElement1GamtosAteitisPaper',
            'crushElement2GamtosAteitisPaper',
            'crushElement3GamtosAteitisPaper',
            'crushElement4GamtosAteitisPaper',
            'crushElement5GamtosAteitisPaper',
            'crushElement6GamtosAteitisPaper',
            'crushElement7GamtosAteitisPaper',
          ]
        : this.customer?.includes('Plastic')
        ? [
            'crushElement1GamtosAteitisPlastic',
            'crushElement2GamtosAteitisPlastic',
            'crushElement3GamtosAteitisPlastic',
            'crushElement4GamtosAteitisPlastic',
            'crushElement5GamtosAteitisPlastic',
            'crushElement6GamtosAteitisPlastic',
            'crushElement7GamtosAteitisPlastic',
          ]
        : this.customer === 'Toni'
        ? [
            'crushElement1Toni',
            'crushElement2Toni',
            'crushElement3Toni',
            'crushElement4Toni',
            'crushElement5Toni',
            'crushElement6Toni',
            'crushElement7Toni',
          ]
        : [
            'crushElement1Nevezis',
            'crushElement2Nevezis',
            'crushElement3Nevezis',
            'crushElement4Nevezis',
            'crushElement5Nevezis',
            'crushElement6Nevezis',
            'crushElement7Nevezis',
          ];

    if (Math.random() < 0.1 && threePointColors.includes(baseColor)) {
      return baseColor + '3Points';
    }

    return baseColor;
  }

  hasInitialMatches() {
    return this.findMatches().length > 0;
  }

  findMatches() {
    let matches = new Set();

    // Horizontal check
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols - 2; col++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row][col + 1]);
        const c3 = this.getBaseColor(this.grid[row][col + 2]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row}-${col + 1}`);
          matches.add(`${row}-${col + 2}`);
        }
      }
    }

    // Vertical check
    for (let col = 0; col < this.gridCols; col++) {
      for (let row = 0; row < this.gridRows - 2; row++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row + 1][col]);
        const c3 = this.getBaseColor(this.grid[row + 2][col]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row + 1}-${col}`);
          matches.add(`${row + 2}-${col}`);
        }
      }
    }

    let matchArray = [...matches].map((pos) => {
      const [row, col] = pos.split('-').map(Number);
      return { row, col };
    });

    return matchArray;
  }

  getBaseColor(color) {
    if (typeof color !== 'string') return color;
    return color.replace('Special', '').replace('Multiplier', '').replace('3Points', '');
  }

  applyGravity(callback) {
    let existingFalling = [];
    let newFalling = [];
    let newTilesMap = {}; // will store new colors for each column

    // Process each column for downward gravity.
    for (let col = 0; col < this.gridCols; col++) {
      let emptySpaces = 0;
      // Iterate from bottom to top.
      for (let row = this.gridRows - 1; row >= 0; row--) {
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
        if (!newColor.includes('3Points') && Math.random() < 0.1) {
          newColor =
            newColor === 'yellow'
              ? this.customer === 'Toni'
                ? 'crushElement1ToniSpecial'
                : this.customer === 'Zemaitijos Pienas'
                ? 'crushElement1ZemaitijosPienasSpecial'
                : this.customer === 'Pigu.lt'
                ? 'crushElement1PiguSpecial'
                : this.customer?.includes('Paper')
                ? 'crushElement1GamtosAteitisPaperSpecial'
                : this.customer?.includes('Plastic')
                ? 'crushElement1GamtosAteitisPlasticSpecial'
                : this.customer?.includes('Glass')
                ? 'crushElement1GamtosAteitisGlassSpecial'
                : 'crushElement1NevezisSpecial'
              : newColor + 'Special';
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
        for (let col = 0; col < this.gridCols; col++) {
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
    const targetRow = this.gridRows - 1;
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
      for (let row = 0; row < this.gridRows; row++) {
        for (let col = 0; col < this.gridCols; col++) {
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
      this.ctx.fillStyle = 'transparent';
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
      const base = color.replace('3Points', '');
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
        console.log('base color not found:', base);
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
      const offsetY = 4; // how much lower you want to move

      const text = '+3';
      const fontSize = 16;
      this.ctx.font = `${fontSize}px Arial`;

      const textMetrics = this.ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      const padding = 4;
      const radius = 6;

      const x = col * this.tileSize + xOffset + this.tileSize - textWidth - padding - 6;
      const y = row * this.tileSize + yOffset + textHeight - 4 + offsetY;
      const boxX = x - padding;
      const boxY = y - textHeight - 2 + offsetY;
      const boxWidth = textWidth + padding * 2;
      const boxHeight = textHeight;

      // Draw rounded background
      this.ctx.beginPath();
      this.ctx.moveTo(boxX + radius, boxY);
      this.ctx.lineTo(boxX + boxWidth - radius, boxY);
      this.ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
      this.ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
      this.ctx.quadraticCurveTo(
        boxX + boxWidth,
        boxY + boxHeight,
        boxX + boxWidth - radius,
        boxY + boxHeight,
      );
      this.ctx.lineTo(boxX + radius, boxY + boxHeight);
      this.ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
      this.ctx.lineTo(boxX, boxY + radius);
      this.ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
      this.ctx.closePath();
      this.ctx.fillStyle = 'red';
      this.ctx.fill();

      // Draw the white text
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(text, x, y);
      return; // done drawing
    }
    if (typeof color === 'string' && color.endsWith('Multiplier')) {
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
        const phoneInput = document.querySelector('.boomio-competition-phone-input-field');
        const phone = document.querySelector('.boomio-competition-phone-input-field');
        const phoneValue = phone?.value?.trim();

        const cyrillicRegex = /[\u0400-\u04FF]/;
        const containsCyrillic = (input) => cyrillicRegex.test(input.value);
        const isValidEmail = (email) => {
          // Enhanced regex for email validation with TLD enforcement
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          // Additional check to prevent consecutive dots
          if (email.includes('..')) {
            return false;
          }

          return emailRegex.test(email);
        };
        if (containsCyrillic(emailInput)) {
          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
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

        if (!this.checkboxChange) {
          document.getElementById('competition-checkbox-error').innerText =
            this.language === 'LV'
              ? 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.'
              : this.language === 'ES'
              ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.'
              : this.customer === 'Perlas GO'
              ? 'Norint tęsti, privaloma sutikti su Perlas Go privatumo politika.'
              : this.customer === 'Vilvi'
              ? 'Registruojantis, privaloma sutikti gauti VILVI naujienas - tokiu būdu, laimėjimo atvieju,  susieksime su Jumis bei įteiksime laimėtą prizą, o pasibaigus Žaidimui siųsime naujienas.'
              : 'Norint tęsti, privaloma sutikti su įmonės privatumo politika. ';
          document.getElementById('competition-checkbox-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-checkbox-error').style.display = 'block';
          document.getElementById('competition-checkbox-error').style.height = '18px';

          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-phone-error').innerText = '';

          document.getElementById('competition-phone-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          return;
        }

        if (!this.checkboxChange2 && this.customer === 'Toni') {
          document.getElementById('competition-checkbox-error2').innerText =
            this.customer === 'Toni'
              ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.'
              : 'Norint tęsti, privaloma sutikti gauti naujienlaiškius.';
          document.getElementById('competition-checkbox-error2').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-checkbox-error2').style.display = 'block';
          document.getElementById('competition-checkbox-error2').style.height = '18px';

          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-phone-error').innerText = '';

          document.getElementById('competition-phone-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').zIndex = 0;
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';

          document.getElementById('competition-checkbox-error3').innerText = '';
          document.getElementById('competition-checkbox-error3').style.backgroundColor =
            'transparent';
          return;
        }

        if (emailInput?.value === '' || emailInput?.value === null) {
          document.getElementById('competition-email-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : this.language === 'ES'
              ? 'Requerido para continuar.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-name-error').innerText = '';
          document.getElementById('competition-phone-error').innerText = '';

          document.getElementById('competition-phone-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';
          return;
        }

        if ((phoneInput?.value === '' || phoneInput?.value === null) && this.customer === 'Toni') {
          document.getElementById('competition-phone-error').innerText =
            this.language === 'LV'
              ? 'Obligāti aizpildāmie lauki.'
              : this.language === 'ES'
              ? 'Requerido para continuar.'
              : 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-phone-error').zIndex = 1;
          document.getElementById('competition-phone-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';
          document.getElementById('competition-checkbox-error2').innerText = '';
          document.getElementById('competition-checkbox-error2').style.backgroundColor =
            'transparent';

          document.getElementById('competition-checkbox-error3').innerText = '';
          document.getElementById('competition-checkbox-error3').style.backgroundColor =
            'transparent';
          return;
        }

        if (
          (playerNameInput?.value === '' || playerNameInput?.value === null) &&
          this.customer === 'Toni'
        ) {
          document.getElementById('competition-name-error').innerText =
            'El campo de nombre debe completarse.';
          document.getElementById('competition-name-error').zIndex = 1;
          document.getElementById('competition-name-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-phone-error').innerText = '';

          document.getElementById('competition-phone-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';
          document.getElementById('competition-checkbox-error2').innerText = '';
          document.getElementById('competition-checkbox-error2').style.backgroundColor =
            'transparent';

          document.getElementById('competition-checkbox-error3').innerText = '';
          document.getElementById('competition-checkbox-error3').style.backgroundColor =
            'transparent';
          return;
        }

        if (!isValidEmail(emailInput?.value) && this.customer !== 'Toni') {
          document.getElementById('competition-email-error').innerText =
            this.language === 'ES'
              ? 'Formato de correo electrónico no válido'
              : this.language === 'EN'
              ? 'Invalid email format'
              : this.language === 'RU'
              ? 'Неверный формат электронной почты'
              : this.language === 'LV'
              ? 'Nederīgs e-pasta formāts'
              : this.language === 'ET'
              ? 'Vigane e-posti vorming'
              : this.language === 'FI'
              ? 'Virheellinen sähköpostiosoite'
              : this.language === 'PL'
              ? 'Nieprawidłowy format adresu e-mail'
              : 'Neteisingas el. pašto formatas.';
          document.getElementById('competition-email-error').zIndex = 1;
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';

          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';

          return;
        }
        if (emailInput?.value?.length < 10 && this.customer === 'Toni') {
          document.getElementById('competition-email-error').innerText =
            'Debes ingresar 10 dígitos.';
          document.getElementById('competition-email-error').zIndex = 1;
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-email-error').style.height = '20px';

          document.getElementById('competition-phone-error').innerText = '';
          document.getElementById('competition-phone-error').style.backgroundColor = 'transparent';

          document.getElementById('competition-phone-error').style.height = '37px';

          return;
        }
        if (phoneInput?.value?.length < 10 && this.customer === 'Toni') {
          document.getElementById('competition-phone-error').innerText =
            'Debes ingresar 10 dígitos.';
          document.getElementById('competition-phone-error').style.height = '20px';

          document.getElementById('competition-phone-error').zIndex = 1;
          document.getElementById('competition-phone-error').style.backgroundColor = '#FFBABA';

          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-email-error').style.height = '37px';

          return;
        }

        if (this.showCompetitiveRegistration && this.checkboxChange) {
          boomioService
            .signal('', 'user_info', {
              emails_consent: this.checkboxChange2,
              user_email: emailInput?.value,
              user_name:
                this.customer === 'Toni'
                  ? playerNameInput?.value.trimEnd() + phoneInput?.value
                  : emailInput?.value,
              ...(phoneValue ? { phone: phoneInput?.value } : {}),

              via_mobile: this.campaignUrl ? true : false,
            })
            .then((response) => {
              if (response.success === false) {
                if (response.res_code === 'EMAIL_EXIST') {
                  document.getElementById('competition-email-error').innerText =
                    this.language === 'LV'
                      ? 'Šis e-pasts jau pastāv. Izmantojiet citu.'
                      : this.language === 'ES'
                      ? 'Este número ya está en uso. Use el mismo número del registro inicial o uno nuevo.'
                      : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-email-error').style.backgroundColor =
                    '#FFBABA';
                  document.getElementById('competition-name-error').innerText = '';
                  document.getElementById('competition-phone-error').innerText = '';

                  document.getElementById('competition-phone-error').style.backgroundColor =
                    'transparent';
                  document.getElementById('competition-name-error').style.backgroundColor =
                    'transparent';
                  document.getElementById('competition-checkbox-error').innerText = '';
                  document.getElementById('competition-checkbox-error').style.backgroundColor =
                    'transparent';
                } else if (response.res_code === 'NICKNAME_EXIST') {
                  document.getElementById('competition-name-error').innerText =
                    this.language === 'LV'
                      ? 'Šis segvārds jau pastāv. Izmantojiet citu.'
                      : this.language === 'ES'
                      ? 'Este nombre ya está en uso. Use el mismo nombre del registro inicial o uno nuevo.'
                      : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-phone-error').innerText = '';
                  document.getElementById('competition-name-error').style.backgroundColor =
                    '#FFBABA';
                  document.getElementById('competition-phone-error').style.backgroundColor =
                    'transparent';
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
                    this.language === 'LV' ? 0.4 : 0.2;
                  canvas.style.transition = 'filter 0.6s ease';
                  canvas.style.filter = 'blur(0px)';
                  const inputContainer = document.querySelector('.input-container');
                  document.getElementById('control-button').style.transition = 'opacity 2s ease';
                  document.getElementById('control-button').style.opacity = 1;
                  document.getElementById('control-button').style.display = 'flex';
                  inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
                  inputContainer.style.display = 'block';
                  setTimeout(() => {
                    inputContainer.style.height = '332px';
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
      }, 300);
    }
  };

  clickEventHandlerDidYouKnow = (closeShare) => {
    let didYouKnowTableContainer = '';
    const shareContainer = document.querySelector('.share-container');

    if (this.customer === 'Pigu.lt') {
      didYouKnowTableContainer = document.querySelector('.share-container');
    } else {
      didYouKnowTableContainer = document.querySelector('.did-you-know-container');
    }

    didYouKnowTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      didYouKnowTableContainer.style.height = '10px';
      didYouKnowTableContainer.style.top = 'calc(50% + 330px)';
      didYouKnowTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      didYouKnowTableContainer.style.display = 'none';
    }, 1000);

    if (shareContainer && !closeShare) {
      shareContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      shareContainer.style.display = 'block';

      setTimeout(() => {
        shareContainer.style.height = '680px';
        const isNarrowScreen = window.innerWidth <= 920;
        shareContainer.style.top = 'calc(50%)';
        shareContainer.style.opacity = 1;
      }, 100);
    } else {
      if (this.customer === 'Pigu.lt') {
        boomioService
          .signal('ROUND_FINISHED', 'signal', {
            score: this.currentScore,
            shared_somewhere: this.shareClicked,
          })
          .then((response) => {
            this.userBestPlace = response.user_best_place;
            if (this.showCompetitiveRegistration === 'points') {
              this.scoreTable = response;
              this.scoreTableContainerInstance.updateProps(
                this.customer,
                this.scoreTable,
                this.currentScore,
              );
            }
            if (this.showCompetitiveRegistration === 'competition') {
              this.scoreTable = response;
              this.scoreTableContainerInstance.updateProps(this.customer, this.scoreTable);
            }

            if (this.showCompetitiveRegistration === 'collectable') {
              this.collection = response?.collection ? response?.collection : this.collection;
              this.just_won = response?.just_won ? response?.just_won : this.just_won;
              this.scoreTableContainerInstance.updateProps(
                this.customer,
                this.collectables,
                this.collection,
                this.just_won,
              );
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      const competitionTableContainer = document.querySelector('.competition-table-container');
      competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      competitionTableContainer.style.display = 'block';

      setTimeout(() => {
        competitionTableContainer.style.height = '680px';
        const isNarrowScreen = window.innerWidth <= 920;

        competitionTableContainer.style.top = 'calc(50%)';

        competitionTableContainer.style.opacity = 1;
      }, 100);
    }
  };

  addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.handleTileSelection(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleTileSwap(e));

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault(); // prevent scrolling
      this.handleTileSelection(e.touches[0]);
    });
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.handleTileSwap(e.changedTouches[0]);
    });

    if (this.showCompetitiveRegistration) {
      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', this.clickEventHandlerShowRules);
    }

    const restart = document.getElementById('boomio-game-play-again');
    restart.addEventListener('click', this.restartGame);

    const start = document.getElementById('control-button');
    start.addEventListener('click', this.initGame);

    if (this.customer === 'Nevezis') {
      const competitionDidYouKnow = document.getElementById('boomio-close-did-you-know');
      competitionDidYouKnow.addEventListener('click', this.clickEventHandlerDidYouKnow);
    }
    if (this.customer === 'Pigu.lt') {
      const competitionDidYouKnow = document.getElementById('boomio-close-share');
      competitionDidYouKnow.addEventListener('click', this.clickEventHandlerDidYouKnow);
    }

    const closeEl = document.getElementById('close-game-container');
    if (closeEl) {
      const onClose = (e) => {
        e.preventDefault();
        e.stopPropagation(); // don't let #game-container's tutorial handler eat it
        this.closeGame();
      };
      // Use multiple input types (Android WebView friendly)
      ['click', 'touchend', 'pointerup'].forEach((evt) =>
        closeEl.addEventListener(evt, onClose, { passive: false }),
      );
    }
  }
  closeGame = () => {
    const element = document.getElementById('boomio-crush-container');
    if (element && element.parentNode) {
      this.gameClosed = true;
      element.parentNode.removeChild(element);
    }
  };
  removeRules = () => {
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
  };

  initGame = () => {
    this.removeRules();
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
  };

  showtutorial = () => {
    if (this.tutorial) {
      document.getElementById('tutorial').style.transition = 'opacity 1s ease';
      document.getElementById('tutorial').style.opacity = 1;
      document.getElementById('tutorial').style.display = 'block';
      this.tutorial = false;
      setTimeout(() => {
        const canvas = document.getElementById('game-container');

        canvas.addEventListener('click', this.removetutorial);
      }, 100);
    }
  };

  removetutorial = () => {
    const canvas = document.getElementById('game-container');
    canvas.removeEventListener('click', this.removetutorial);

    document.getElementById('tutorial').style.transition = 'opacity 1s ease';
    document.getElementById('tutorial').style.opacity = 0;
    document.getElementById('tutorial').style.display = 'none';
    setTimeout(() => {
      this.initGame();
    }, 100);
  };

  restartGame = () => {
    this.isAnimating = false; // 👈 ADD THIS LINE!

    this.currentScore = 0;
    document.getElementById('currentScore').innerText = '0';
    this.index = 0;
    this.selectedTile = null;

    const competitionTableContainer = document.querySelector('.competition-table-container');
    competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      competitionTableContainer.style.height = '10px';
      competitionTableContainer.style.top = 'calc(50% + 330px)';
      competitionTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      competitionTableContainer.style.display = 'none';
    }, 1000);

    setTimeout(() => {
      if (this.showCompetitiveRegistration) {
        boomioService
          .signal('ROUND_STARTED', 'signal')
          .then((response) => {
            document.getElementById('background_blur').style.display = 'none';
            this.gamePlaying = true;

            // 🛠 FIX: generate grid BEFORE starting loop
            this.generateValidGrid();
            this.selectedTile = null;
            this.drawGrid();

            const canvas = document.getElementById('boomio-crush-canvas');
            if (canvas) {
              canvas.style.display = 'block';
            }

            // ✅ now start game
            this.startGameLoop();
            this.startTimer();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, 400);
  };

  handleTileSelection(event) {
    if (this.isAnimating) return;
    const { row, col } = this.getTilePosition(event);
    this.selectedTile = { row, col };
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  getTilePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { col: Math.floor(x / this.tileSize), row: Math.floor(y / this.tileSize) };
  }

  handleTileSwap(event) {
    if (this.isAnimating || !this.selectedTile) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    let direction = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx > 0 ? 'right' : 'left';
    } else {
      direction = dy > 0 ? 'down' : 'up';
    }

    const { row, col } = this.selectedTile;
    let target = { row, col };

    if (direction === 'up' && row > 0) target.row -= 1;
    else if (direction === 'down' && row < this.gridRows - 1) target.row += 1;
    else if (direction === 'left' && col > 0) target.col -= 1;
    else if (direction === 'right' && col < this.gridCols - 1) target.col += 1;
    else return; // Invalid move

    this.isAnimating = true;
    this.animateTileSwap(this.selectedTile, target, () => {
      const matches = this.findMatches();
      if (matches.length > 0) {
        this.selectedTile = null;
        this.processMatches();
      } else {
        this.animateTileSwap(target, this.selectedTile, () => {
          this.selectedTile = null;
          this.drawGrid();
          setTimeout(() => {
            this.isAnimating = false;
          }, 500);
        });
      }
    });
  }

  animateTileSwap(tile1, tile2, callback) {
    const duration = 200; // duration of the animation in milliseconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let row = 0; row < this.gridRows; row++) {
        for (let col = 0; col < this.gridCols; col++) {
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
    const matches = this.findMatches();
    const hasMatches = matches.length > 0;

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
    for (let i = col + 1; i < this.gridRows && this.grid[row][i] === color; i++) {
      horizontalMatch++;
    }
    for (let i = row - 1; i >= 0 && this.grid[i][col] === color; i--) {
      verticalMatch++;
    }
    for (let i = row + 1; i < this.gridCols && this.grid[i][col] === color; i++) {
      verticalMatch++;
    }
    const hasMatch = horizontalMatch >= 3 || verticalMatch >= 3;

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
    this.lastSuccessfulMoveTime = Date.now();

    this.hintTiles = null;
    // Prevent infinite loops / handle large chain reactions
    if (chain > 10) {
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

      matchArray.forEach(({ row, col }) => {
        const tileVal = this.grid[row][col];

        // If the tile is a special bomb/explosive
        if (typeof tileVal === 'string' && tileVal.endsWith('Special')) {
          specialFound = { row, col };
        }

        // Tally points:
        if (typeof tileVal === 'string' && tileVal.endsWith('3Points')) {
          // This tile is worth 3 points
          totalBasePoints += 9;
        } else {
          // Normal tile is worth 1 point
          totalBasePoints += 3;
        }
      });

      // If a special tile is found, explode it and exit this function
      if (specialFound) {
        this.explodeTile(specialFound);
        return; // Once we trigger explodeTile, we let that flow handle gravity, etc.
      }

      // Otherwise, just add the calculated points (use multiplier if you have one)
      // e.g. this.currentScore += totalBasePoints * this.multiplier;
      // If you don't have a multiplier, just do:
      this.currentScore += totalBasePoints;

      if (this.currentScore > 0 && this.isAnimating) {
        const currectScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
        currectScoreDiv.style.transition = 'opacity 0.8s ease';
        currectScoreDiv.style.display = 'block';
        currectScoreDiv.style.opacity = 1;
      }

      // Update score display
      document.getElementById('currentScore').innerText = `${this.currentScore}`;

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
    if (!this.findFirstPossibleMove()) {
      console.warn('No more moves left! Regenerating board...');
      setTimeout(() => {
        this.generateValidGrid();
        this.drawGrid();
      }, 500); // give time for final animation if any
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
        if (r >= 0 && r < this.gridRows && c >= 0 && c < this.gridCols) {
          explosionArea.push({ row: r, col: c });
        }
      }
    }

    // Award points for each tile in the explosion area.
    // (You could adjust the points logic as needed.)
    this.currentScore += explosionArea.length * this.multiplier;
    document.getElementById('currentScore').innerText = `${this.currentScore}`;

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

    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        this.drawTile(row, col, this.grid[row][col]);
      }
    }

    // Draw hint if available
    if (this.hintTiles) {
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 4;
      this.hintTiles.forEach(({ row, col }) => {
        this.ctx.strokeRect(
          col * this.tileSize + 2,
          row * this.tileSize + 2,
          this.tileSize - 4,
          this.tileSize - 4,
        );
      });
    }
  }

  startGameLoop() {
    this.lastSuccessfulMoveTime = Date.now(); // 👈 Add this line to initialize the timer

    setTimeout(() => {
      document.getElementById('background_blur').style.display = 'none';
      this.gamePlaying = true;
    }, 400);
    document.getElementById('game-content').style.display = 'block';

    const gameLoop = () => {
      const now = Date.now();

      if (!this.isAnimating && now - this.lastSuccessfulMoveTime > 10000 && !this.hintTiles) {
        const hint = this.findFirstPossibleMove();
        if (hint) this.highlightHint(hint);
      }

      this.update();
      this.drawGrid();

      if (this.timer > 0) {
        requestAnimationFrame(gameLoop);
      }
    };

    requestAnimationFrame(gameLoop);
  }

  findFirstPossibleMove() {
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        const directions = [
          { dr: 0, dc: 1 },
          { dr: 1, dc: 0 },
        ];
        for (let dir of directions) {
          const r2 = row + dir.dr;
          const c2 = col + dir.dc;
          if (r2 >= this.gridRows || c2 >= this.gridCols) continue;

          // Swap
          this.swapTiles({ row, col }, { row: r2, col: c2 });
          const hasMatch = this.hasMatchesAfterSwap({ row, col }, { row: r2, col: c2 });
          this.swapTiles({ row, col }, { row: r2, col: c2 }); // revert
          if (hasMatch) return { tile1: { row, col }, tile2: { row: r2, col: c2 } };
        }
      }
    }
    return null;
  }

  highlightHint({ tile1, tile2 }) {
    this.hintTiles = [tile1, tile2];

    // Clear the hint after 1 second
    setTimeout(() => {
      this.hintTiles = null;
    }, 3000);
  }

  update() {
    // Update game state here
  }
}

export default () => {
  new CrushGame();
};
