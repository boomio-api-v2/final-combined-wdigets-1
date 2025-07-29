import {
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
  tutorial,
  close,
} from './constants';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';

import './styles.css';

class PopGame {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Toni';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.campaignUrl = this.config.campaignUrl ? this.config.campaignUrl : '';
    this.gameCount = 0;
    this.language = this.config.language ? this.config.language : 'LV';

    this.currentScore = 0;
    this.isAnimating = false; // Add this flag
    this.timer = 120; // Add timer property
    this.timerInterval = null; // Add timer interval property
    this.tutorial = true;

    this.startLoading();
  }

  startLoading() {
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
          inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
          inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '170px'})`;
          inputContainer.style.opacity = 1;
        }, 100);
      }, 300);
    }
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
          if (this.customer === 'Nevezis') {
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
        ${`
      <div class="close-game-container" id="close-game-container" style="display:block;width:32px;height:32px;">
      <img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
      </div>`}
           
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
    <div>${this.language == 'ES' ? 'DESLIZA' : 'BRŪKŠT'}</div>
    <div>${this.language == 'ES' ? 'DESLIZA' : 'BRŪKŠT'}</div>
  </div><img src=${tutorial} alt="Image Description" style="margin-left:50px;width: 74px; height: 137.5px;">`}
</div>





<div class="boomio-time-input-container" style="top:calc(50% - 290px);box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer === 'Toni' ? '#262B8C' : '#E1251B'
    };border-radius:35px">
<div style="width: 1208px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${stopwatch} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

<div style="text-align: center; color: white; font-size: 20px; font-family:${
      this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
    } ;font-weight: 900; word-wrap: break-word;position:absolute;left:28px;top:17px;z-index:3;line-height:30px;" id="currentTime"></div>
</div>
</div>

    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer === 'Toni' ? '#262B8C' : '#E1251B'
    };border-radius:35px">
    <div style="width: 1208px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:18px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${'Georama'}; font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>

<img src="${this.customer === 'Toni' ? backgroundToni : backgroundNevezis}" 
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
              ? 'Para continuar, debe aceptar recibir los boletines informativos de la empresa.'
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
              ? 'Debes aceptar recibir comunicaciones de marketing para continuar.'
              : 'Norint tęsti, privaloma sutikti gauti naujienlaiškius.';
          document.getElementById('competition-checkbox-error2').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-checkbox-error2').style.display = 'block';
          document.getElementById('competition-checkbox-error2').style.height = '14px';

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
          document.getElementById('competition-phone-error').innerText =
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
              : 'Neteisingas el. pašto formatas.'; // Incorrect email format in Lithuanian
          document.getElementById('competition-email-error').zIndex = 1;
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';

          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor =
            'transparent';

          return;
        }

        if (this.showCompetitiveRegistration && this.checkboxChange) {
          boomioService
            .signal('', 'user_info', {
              emails_consent: this.checkboxChange2,
              user_email: emailInput?.value,
              user_name:
                this.customer === 'Toni'
                  ? playerNameInput?.value + phoneInput?.value
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
                      : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-email-error').style.backgroundColor =
                    this.customer === 'Akropolis' && this.language !== 'LV' && '#FFBABA';
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
                      : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-phone-error').innerText = '';

                  document.getElementById('competition-phone-error').style.backgroundColor =
                    'transparent';
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
      }, 300);
    }
  };

  clickEventHandlerDidYouKnow = () => {
    const didYouKnowTableContainer = document.querySelector('.did-you-know-container');

    didYouKnowTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      didYouKnowTableContainer.style.height = '10px';
      didYouKnowTableContainer.style.top = 'calc(50% + 330px)';
      didYouKnowTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      didYouKnowTableContainer.style.display = 'none';
    }, 1000);
    const competitionTableContainer = document.querySelector('.competition-table-container');
    document.getElementById('background_blur').style.display = 'block';
    competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    competitionTableContainer.style.display = 'block';

    setTimeout(() => {
      competitionTableContainer.style.height = '680px';
      competitionTableContainer.style.top = 'calc(50%)';
      competitionTableContainer.style.opacity = 1;
    }, 100);
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

    if (this.showCompetitiveRegistration && this.customer !== 'Pigu.lt') {
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
    if (this.customer !== 'Pigu.lt' && !this.campaignUrl) {
      document.getElementById('close-game-container').addEventListener('click', this.closeGame);
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
    this.currentScore = 0;
    document.getElementById('currentScore').innerText = '0';
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
            this.selectedTile = null;

            const canvas = document.getElementById('boomio-crush-canvas');
            if (canvas) {
              canvas.style.display = 'block';
            }
            this.startTimer();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, 400);
  };

  startGameLoop() {
    setTimeout(() => {
      document.getElementById('background_blur').style.display = 'none';
      this.gamePlaying = true;
    }, 400);
    document.getElementById('game-content').style.display = 'block';

    const gameLoop = () => {
      if (this.timer > 0) {
        requestAnimationFrame(gameLoop);
      }
    };

    requestAnimationFrame(gameLoop);
  }
}

export default () => {
  new PopGame();
};
