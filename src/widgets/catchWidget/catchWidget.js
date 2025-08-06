import {
  close,
  catch1,
  catch2,
  catch3,
  catch4,
  catch5,
  player,
  background,
  newRecord,
  intro,
  tapImageBarbora,
  star,
  life,
  checkIcon,
  uncheckIcon,
  backgroundMobile,
  controllLeft,
  controllRight,
  Controlls,
  introGamtosAteitis,
  backgroundGamtosAteitis,
  playerGamtosAteitis,
  introGamtosAteitisPaper,
  backgroundGamtosAteitisPaper,
  playerGamtosAteitisPaper,
  introGamtosAteitisGlass,
  backgroundGamtosAteitisGlass,
  playerGamtosAteitisGlass,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12,
  item13,
  item14,
  item15,
  item16,
  item17,
  item18,
  item19,
  item20,
  item21,
  item22,
  item23,
  item1Paper,
  item2Paper,
  item3Paper,
  item4Paper,
  item5Paper,
  item6Paper,
  item7Paper,
  item8Paper,
  item9Paper,
  item10Paper,
  item11Paper,
  item12Paper,
  item13Paper,
  item14Paper,
  item15Paper,
  item16Paper,
  item17Paper,
  item18Paper,
  item19Paper,
  item20Paper,
  item21Paper,
  item22Paper,
  item23Paper,
  item1Glass,
  item2Glass,
  item3Glass,
  item4Glass,
  item5Glass,
  item6Glass,
  item7Glass,
  item8Glass,
  item9Glass,
  item10Glass,
  item11Glass,
  item12Glass,
  item13Glass,
  item14Glass,
  item15Glass,
  item16Glass,
  item17Glass,
  item18Glass,
  item19Glass,
  item20Glass,
  item21Glass,
  item22Glass,
  item23Glass,
  introPienoZvaigzdes,
  backgroundPienoZvaigzdes,
  playerPienoZvaigzdes,
  item1PienoZvaigzdes,
  item2PienoZvaigzdes,
  item3PienoZvaigzdes,
  item4PienoZvaigzdes,
  item5PienoZvaigzdes,
  item6PienoZvaigzdes,
  item7PienoZvaigzdes,
  item8PienoZvaigzdes,
  item9PienoZvaigzdes,
  item10PienoZvaigzdes,
  item11PienoZvaigzdes,
  item12PienoZvaigzdes,
  item13PienoZvaigzdes,
  item14PienoZvaigzdes,
  introPegasas,
  backgroundPegasas,
  playerPegasas,
  item1Pegasas,
  item2Pegasas,
  item3Pegasas,
  item4Pegasas,
  item5Pegasas,
  item6Pegasas,
  item7Pegasas,
  item8Pegasas,
  item9Pegasas,
  item10Pegasas,
  introAkropolis,
  backgroundAkropolis,
  playerAkropolis,
  item1Akropolis,
  item2Akropolis,
  item3Akropolis,
  item4Akropolis,
  item5Akropolis,
  item6Akropolis,
  item7Akropolis,
  item8Akropolis,
  item9Akropolis,
  item10Akropolis,
  introDaumantu,
  backgroundDaumantu,
  playerDaumantu,
  item1Daumantu,
  item2Daumantu,
  item3Daumantu,
  item4Daumantu,
  item5Daumantu,
  item6Daumantu,
  item7Daumantu,
  item8Daumantu,
  item9Daumantu,
  item10Daumantu,
  item11Daumantu,
  item12Daumantu,
  item13Daumantu,
  introDobilo,
  backgroundDobilo,
  playerDobilo,
  item1Dobilo,
  item2Dobilo,
  item3Dobilo,
  item4Dobilo,
  item5Dobilo,
  item6Dobilo,
  item7Dobilo,
  item8Dobilo,
  item9Dobilo,
  item10Dobilo,
  item11Dobilo,
  item12Dobilo,
  item13Dobilo,
  backgroundToni,
  playerToni,
  item1Toni,
  item2Toni,
  item3Toni,
  item4Toni,
  item5Toni,
  item6Toni,
  item7Toni,
  item8Toni,
  item9Toni,
  item10Toni,
  backgroundOrlen,
  playerOrlen,
  item1Orlen,
  item2Orlen,
  item3Orlen,
  item4Orlen,
  item5Orlen,
  item6Orlen,
  item7Orlen,
  item8Orlen,
  item9Orlen,
  item10Orlen,
} from './constants';
import './styles.css';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { CompetitionCodeScoreTableContainer } from '../helpers/CompetitionCodeScoreTableContainer';

import { PointScoreTableContainer } from '../helpers/PointScoreTableContainer';
import { DownloadScoreTableContainer } from '../helpers/DownloadScoreTableContainer';
import { IkeaScoreTableContainer } from '../helpers/IkeaScoreTableContainer';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { ShareContainer } from '../helpers/ShareContainer';

class CatchGame {
  constructor() {
    this.shareClicked = false;
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Orlen';
    this.teams = this.config.teams;

    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.language = this.config.language ? this.config.language : '';
    this.gameCount = 0;
    this.didYouKnow = true;
    this.checkboxChange = false;
    this.checkboxChange2 = false;
    this.checkboxChange3 = false;
    this.effectTimeout;
    this.effectInProgress = false;
    this.effectStartTime = 0; // Track when the effect started

    this.gameStarted = false;
    this.currentScore = 0;
    this.movement = { left: false, right: false }; // To track current movement state
    this.touchMoveActive = false; // To track touch hold state for mobile
    this.scoreTable = {};
    this.scoreTableContainerInstance;
    this.createContainer();
    document.querySelector('.game-container').style.backgroundColor =
      window.innerWidth <= 768 ? 'black' : 'none';
    this.loading = false;
    this.canvas = document.getElementById('boomio-catch-canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.style.background = `url(${
      this.customer.includes('Paper')
        ? backgroundGamtosAteitisPaper
        : this.customer.includes('Plastic')
        ? backgroundGamtosAteitis
        : this.customer.includes('Glass')
        ? backgroundGamtosAteitisGlass
        : this.customer === 'Pieno Žvaigždės'
        ? backgroundPienoZvaigzdes
        : this.customer === 'Pegasas'
        ? backgroundPegasas
        : this.customer === 'Akropolis'
        ? backgroundAkropolis
        : this.customer === 'Daumantu'
        ? backgroundDaumantu
        : this.customer === 'Zemaitijos Pienas'
        ? backgroundDobilo
        : this.customer === 'Toni'
        ? backgroundToni
        : this.customer === 'Orlen'
        ? backgroundOrlen
        : background
    }) center`;

    this.timer = null;
    this.highscore = 0;
    this.fruits = [];
    this.numberOfFruits = 8;
    this.smashCounter = 0;
    this.catchSoundCounter = 0;
    this.animationFrame = null;
    this.defaultscore =
      this.customer === 'Eurovaistine' ||
      this.customer === 'Pegasas' ||
      this.customer === 'Akropolis' ||
      this.customer === 'Daumantu' ||
      this.customer === 'Toni' ||
      this.customer === 'Zemaitijos Pienas'
        ? 3
        : 5;
    this.startCatch();
    document.addEventListener('shareClicked', (event) => {
      if (this.shareClicked === false) {
        this.shareClicked = true;
        this.currentScore = this.currentScore + 1000;
      }
    });
  }

  startCatch = () => {
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

    setTimeout(() => {
      document.getElementById('boomio-catch-canvas').style.transition = 'opacity 1s ease';
      document.getElementById('boomio-catch-canvas').style.opacity = 1;

      if (this.gameCount === 0) {
        if (
          this.showCompetitiveRegistration === 'competition' ||
          this.showCompetitiveRegistration === 'points' ||
          this.showCompetitiveRegistration === 'collectable'
        ) {
          const citySelect = document.getElementById('city-select');
          const schoolSelect = document.getElementById('school-select');
          if (citySelect && schoolSelect) {
            citySelect.addEventListener('change', () => {
              const selectedCity = citySelect.value;
              // Clear previous options
              schoolSelect.innerHTML = '';

              if (!selectedCity || selectedCity === 'Miestas ar rajonas') {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Pirmiau pasirink miestą ar rajoną';
                schoolSelect.appendChild(defaultOption);
                return;
              }
              console.log('Selected city:', selectedCity);
              const schools = (this.teams[selectedCity] || []).sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase()),
              );
              if (schools.length === 0) {
                const noSchoolOpt = document.createElement('option');
                noSchoolOpt.value = '';
                noSchoolOpt.textContent = 'Mokyklu saraše nėra';
                schoolSelect.appendChild(noSchoolOpt);
              } else {
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Tavo atstovaujama mokykla';
                schoolSelect.appendChild(defaultOption);
                schools.forEach((school) => {
                  const opt = document.createElement('option');
                  opt.value = school;
                  opt.textContent = school;
                  schoolSelect.appendChild(opt);
                });
              }
            });
          }

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
          const checkboxImg3 = document.querySelector('.boomio-privacyCheckbox3');
          checkboxImg3.addEventListener('click', () => {
            this.checkboxChange3 = !this.checkboxChange3;
            const checkboxImgChange3 = document.getElementById('privacyCheckboxImg3');
            checkboxImgChange3.src = this.checkboxChange3 ? checkIcon : uncheckIcon;
          });
          const phoneInputField =
            this.customer === 'Toni'
              ? document.getElementById('boomio-competition-email-input-field')
              : document.getElementById('boomio-competition-phone-input-field');
          const emailInput = document.querySelector('.boomio-competition-email-input-field');

          if (this.customer === 'Orlen' && emailInput) {
            emailInput.value = '+370';

            emailInput.addEventListener('input', () => {
              if (!emailInput.value.startsWith('+370')) {
                emailInput.value = '+370' + emailInput.value.replace(/\D/g, '').slice(0, 8);
              } else {
                emailInput.value =
                  '+370' + emailInput.value.slice(4).replace(/\D/g, '').slice(0, 8);
              }
            });

            emailInput.addEventListener('keydown', (e) => {
              // Prevent deleting or navigating into the +370 part
              if (
                emailInput.selectionStart <= 4 &&
                (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft')
              ) {
                e.preventDefault();
              }
            });

            emailInput.addEventListener('paste', (e) => {
              e.preventDefault(); // Block pasting
            });
          } else {
            emailInput.addEventListener('input', () => {});
          }

          if (phoneInputField) {
            phoneInputField.addEventListener('input', (event) => {
              event.target.value = event.target.value.replace(/(?!^\+)[^0-9]/g, '');
            });
          } else {
            console.error('');
          }

          setTimeout(() => {
            const canvas = document.getElementById('boomio-catch-canvas');
            document.getElementById('background_blur').style.opacity =
              this.customer === 'Pegasas' ? 0.8 : 0.37;

            const inpuRegisterContainer = document.querySelector('.input-register-container');
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
            const canvas = document.getElementById('boomio-catch-canvas');
            document.getElementById('background_blur').style.opacity =
              this.customer === 'Pegasas' ? 0.8 : 0.37;
            const inputContainer = document.querySelector('.input-container');
            document.getElementById('control-button').style.transition = 'opacity 2s ease';
            document.getElementById('control-button').style.opacity = 1;
            document.getElementById('control-button').style.display = 'flex';

            inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
            inputContainer.style.display = 'block';
            setTimeout(() => {
              inputContainer.style.height = '332px';
              inputContainer.style.top = 'calc(50% + 170px)';
              inputContainer.style.opacity = 1;
            }, 100);
          }, 300);
        }
      }

      document.getElementById('background_intro').style.transition = 'opacity 1s ease';
      document.getElementById('background_intro').style.opacity = 0;
      if (this.gameCount === 0) {
        document.getElementById('background_blur').style.display = 'block';
        document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
      }
      if (this.gameCount === 0) {
        setTimeout(() => {
          const canvas = document.getElementById('boomio-catch-canvas');

          document.getElementById('background_blur').style.opacity =
            this.customer === 'Pegasas' ? 0.8 : 0.37;
        }, 1000);
      }
      setTimeout(() => {
        const background = document.getElementById('background_intro');

        if (background) {
          background.style.display = 'none';
        }
      }, 0);
    }, 0);
    //gifas
  };

  createContainer() {
    const blurImage = new Image();
    blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';
    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';
    // Create and configure the game container
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'boomio-catch-container');
    gameContainer.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );
    gameContainer.innerHTML = `
      <div class="game-container game-container-catch">
          <img class="new_highscore_stars" src=${
            newHighscoreStarsImage.src
          } alt="Image Description" style="overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
    </img>
    <div class="new_highscore"><img src=${newRecord}  alt="Image Description" style="width: 100%; height: 100%;">
    </div>
    <div class="numbers" style="z-index:10">
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
  </div>


    <div style="position: absolute;z-index:999;pointer-events:none" class="tutorial">
    ${`<div style="gap:20px;display:flex;color: #FFF;text-shadow: 4px 4px 14px rgba(255, 255, 255, 0.41);font-family:${'Georama'};font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: ${'uppercase'};">
        <div>${this.language == 'ES' ? 'CLIC' : this.language == 'LT' ? 'SPUST' : 'KLIK'}</div>
        <div>${this.language == 'ES' ? 'CLIC' : this.language == 'LT' ? 'SPUST' : 'KLIK'}</div>
      </div><img src=${Controlls} alt="Image Description" style="display:inline;width: 110px; height: 50px;">`}
      </div>
       ${
         window.innerWidth <= 768
           ? `
           
<div id="controllLeft"
     style="background-image: url(${controllLeft});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 50px;
            top: calc(50% + 150px);
            position: absolute;
            left: calc(50% - 150px);">
</div>

<div id="controllRight"
     style="background-image: url(${controllRight});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 50px;
            top: calc(50% + 150px);
            position: absolute;
            left: calc(50% + 120px);">
</div> `
           : ''
       }
    <div class="boomio-score-input-container-catch" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer.includes('Gamtos Ateitis')
        ? this.customer.includes('Glass')
          ? '#18904A'
          : this.customer.includes('Plastic')
          ? '#FBCA00'
          : this.customer.includes('Paper')
          ? '#488DB0'
          : '#18904A'
        : this.customer === 'Pieno Žvaigždės'
        ? '#ED1846'
        : this.customer === 'Pegasas'
        ? '#A40033'
        : this.customer === 'Akropolis'
        ? '#F40000'
        : this.customer === 'Daumantu'
        ? '#DD2326'
        : this.customer === 'Zemaitijos Pienas'
        ? '#004C22'
        : this.customer === 'Toni'
        ? '#262B8C'
        : '#18904A'
    };border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:18px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${'Georama'}; font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>



<div class="boomio-life-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer.includes('Gamtos Ateitis')
        ? this.customer.includes('Glass')
          ? '#18904A'
          : this.customer.includes('Plastic')
          ? '#FBCA00'
          : this.customer.includes('Paper')
          ? '#488DB0'
          : '#18904A'
        : this.customer === 'Pieno Žvaigždės'
        ? '#ED1846'
        : this.customer === 'Pegasas'
        ? '#A40033'
        : this.customer === 'Akropolis'
        ? '#F40000'
        : this.customer === 'Daumantu'
        ? '#DD2326'
        : this.customer === 'Zemaitijos Pienas'
        ? '#004C22'
        : this.customer === 'Toni'
        ? '#262B8C'
        : '#18904A'
    };border-radius:35px">
<div style="width: 148px;top:-15px;height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${life} alt="Image Description" style="margin-left:-10px;width: 50px; height: 50px;margin-top:15px"></img>

<div style="text-align: center; color: white; font-size: 16px; font-family:${'Georama'} ;font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:17px;z-index:3;line-height:30px;" id="currentLife"></div>
</div>
</div>



    <img src=${
      this.customer.includes('Paper')
        ? introGamtosAteitisPaper
        : this.customer.includes('Plastic')
        ? introGamtosAteitis
        : this.customer.includes('Glass')
        ? introGamtosAteitisGlass
        : this.customer === 'Pieno Žvaigždės'
        ? introPienoZvaigzdes
        : this.customer === 'Pegasas'
        ? introPegasas
        : this.customer === 'Akropolis'
        ? introAkropolis
        : this.customer === 'Daumantu'
        ? introDaumantu
        : this.customer === 'Zemaitijos Pienas' && introDobilo
    } alt="Image Description" style="z-index:4;width:${
      document.documentElement.clientWidth < 418
        ? document.documentElement.clientWidth + 'px'
        : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:block;object-fit: cover;" id="background_intro">

        <img src=${'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/whack-testing/images/doodleWidget/jumpEffect.gif?raw=true'} alt="Image Description" style="z-index:2;width:${
      document.documentElement.clientWidth < 418
        ? document.documentElement.clientWidth + 'px'
        : '418px'
    }; height: 674px;position:absolute;pointer-events: none;clip-path: inset(0 0 50% 0); display:none;opacity:0;transition:opacity 0.6s ease;" id="background_effect">
    ${
      this.customer === 'Pegasas' || this.customer === 'Zemaitijos Pienas'
        ? `<div alt="Image Description" style="z-index:1;width: ${
            document.documentElement.clientWidth < 418
              ? document.documentElement.clientWidth + 'px'
              : '418px'
          }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;background-color:${
            this.customer === 'Zemaitijos Pienas' ? '#004C22' : '#8E1735'
          }" id="background_blur"></div>`
        : `    <img src=${blurImage.src} alt="Image Description" style="z-index:3;width: ${
            document.documentElement.clientWidth < 418
              ? document.documentElement.clientWidth + 'px'
              : '418px'
          }; height: 668px;position:absolute;opacity:${
            this.customer === 'Pegasas' ? 0.8 : 0.5
          };pointer-events: none; display:block;" id="background_blur">`
    }

    ${
      this.showCompetitiveRegistration
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    }

    <div class="close-game-container" id="close-game-container" style="top:calc(50% - 290px);display:block;width:25px;height:25px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>
    ${new InputContainer(this.customer, 'drive').createInputContainerDiv('catch').outerHTML}

        <canvas id="boomio-catch-canvas" width=${
          document.documentElement.clientWidth < 418
            ? document.documentElement.clientWidth + 'px'
            : '418px'
        }; height="668px"></canvas>
      </div>
    `;
    widgetHtmlService.container.appendChild(gameContainer);
    if (this.showCompetitiveRegistration === 'competition') {
      const gameContainer = document.querySelector('.game-container');

      if (this.customer === 'Pegasas') {
        this.scoreTableContainerInstance = new CompetitionCodeScoreTableContainer(
          this.customer,
          this.scoreTable,
        );
      } else {
        this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
          this.customer,
          this.scoreTable,
        );
      }

      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }
    if (this.showCompetitiveRegistration === 'points') {
      if (this.customer === 'Ikea') {
        const gameContainer = document.querySelector('.game-container');

        this.scoreTableContainerInstance = new IkeaScoreTableContainer(
          this.customer,
          this.scoreTable,
          this.currentScore,
        );
        gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
      } else {
        const gameContainer = document.querySelector('.game-container');

        this.scoreTableContainerInstance = new PointScoreTableContainer(
          this.customer,
          this.scoreTable,
          this.currentScore,
        );
        gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
      }
    }

    if (this.showCompetitiveRegistration === 'collectable') {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new DownloadScoreTableContainer(
        this.customer,
        this.scoreTable,
        this.currentScore,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }
    if (
      this.customer.includes('Gamtos Ateitis') ||
      this.customer === 'Pieno Žvaigždės' ||
      this.customer === 'Pegasas' ||
      this.customer === 'Zemaitijos Pienas'
    ) {
      const gameContainer = document.querySelector('.game-container');

      const didYouKnowContainer = new DidYouKnowContainer(this.customer);
      gameContainer.appendChild(didYouKnowContainer.containerDiv);
    }
    if (this.customer.includes('Akropolis')) {
      const gameContainer = document.querySelector('.game-container');

      this.shareContainer = new ShareContainer(this.customer);
      gameContainer.appendChild(this.shareContainer.containerDiv);
    }

    if (
      this.showCompetitiveRegistration === 'competition' ||
      this.showCompetitiveRegistration === 'points' ||
      this.showCompetitiveRegistration === 'collectable'
    ) {
      const isValidEmail = (email) => {
        // Enhanced regex for email validation with TLD enforcement
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Additional check to prevent consecutive dots
        if (email.includes('..')) {
          return false;
        }

        return emailRegex.test(email);
      };

      const clickEventHandlerShowRules = () => {
        const competitionConfirmFieldBody = document.getElementById(
          'boomio-competition-confirm-field',
        );
        if (this.gameCount === 0) {
          setTimeout(() => {
            const emailInput = document.querySelector('.boomio-competition-email-input-field');
            const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
            const phoneInput = document.querySelector('.boomio-competition-phone-input-field');

            const phone = document.querySelector('.boomio-competition-phone-input-field');
            const schoolInput = document.querySelector('.boomio-competition-school-select');

            const checkboxChange = this.checkboxChange;
            const checkboxChange2 = this.checkboxChange2;
            const checkboxChange3 = this.checkboxChange3;
            if (!checkboxChange) {
              document.getElementById('competition-checkbox-error').innerText =
                this.customer === 'Daumantu'
                  ? 'Registruojantis, privaloma sutikti gauti "Daumantų” naujienas, kad atiduotume  laimėtą prizą, o pasibaigus Žaidimui siųsime naujienas.'
                  : this.customer === 'Zemaitijos Pienas'
                  ? 'Norint tęsti, privaloma sutikti su „Žemaitijos pienas“ privatumo politika.'
                  : this.language === 'LV'
                  ? 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.'
                  : this.language === 'ES'
                  ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.'
                  : this.customer.includes('Gamtos Ateitis')
                  ? 'Norint tęsti, privaloma sutikti su Gamintojų ir importuotojų asociacijos „Gamtos ateitis“  privatumo politika.'
                  : '';
              document.getElementById('competition-checkbox-error').style.backgroundColor =
                '#FFBABA';
              document.getElementById('competition-checkbox-error').style.display = 'block';
              document.getElementById('competition-checkbox-error').style.height = '18px';

              document.getElementById('competition-name-error').innerText = '';

              document.getElementById('competition-name-error').style.backgroundColor =
                'transparent';

              document.getElementById('competition-phone-error').innerText = '';

              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';

              document.getElementById('competition-email-error').innerText = '';
              document.getElementById('competition-email-error').zIndex = 0;
              document.getElementById('competition-email-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-checkbox-error2').innerText = '';
              document.getElementById('competition-checkbox-error2').style.backgroundColor =
                'transparent';

              document.getElementById('competition-checkbox-error3').innerText = '';
              document.getElementById('competition-checkbox-error3').style.backgroundColor =
                'transparent';
              return;
            }

            if (!checkboxChange3 && this.customer === 'Pegasas' && phone?.value?.trim() !== '') {
              document.getElementById('competition-checkbox-error3').innerText =
                'Tai norint tęsti,  privaloma sutikti gauti naujienas SMS žinute.';
              document.getElementById('competition-checkbox-error3').style.backgroundColor =
                '#FFBABA';
              document.getElementById('competition-checkbox-error3').style.display = 'block';
              document.getElementById('competition-checkbox-error3').style.height = '14px';

              document.getElementById('competition-name-error').innerText = '';

              document.getElementById('competition-name-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-phone-error').innerText = '';

              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-email-error').innerText = '';
              document.getElementById('competition-email-error').zIndex = 0;
              document.getElementById('competition-email-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-checkbox-error').innerText = '';
              document.getElementById('competition-checkbox-error').style.backgroundColor =
                'transparent';

              document.getElementById('competition-checkbox-error2').innerText = '';
              document.getElementById('competition-checkbox-error2').style.backgroundColor =
                'transparent';
            }

            if (!checkboxChange2 && (this.customer === 'Pegasas' || this.customer === 'Toni')) {
              document.getElementById('competition-checkbox-error2').innerText =
                this.customer === 'Toni'
                  ? 'Para continuar, debe declarar que es mayor a 13 años y aceptar los términos y condiciones.'
                  : 'Norint tęsti, privaloma sutikti gauti naujienlaiškius.';
              document.getElementById('competition-checkbox-error2').style.backgroundColor =
                '#FFBABA';
              document.getElementById('competition-checkbox-error2').style.display = 'block';
              document.getElementById('competition-checkbox-error2').style.height = '18px';

              document.getElementById('competition-name-error').innerText = '';

              document.getElementById('competition-name-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-phone-error').innerText = '';

              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-email-error').innerText = '';
              document.getElementById('competition-email-error').zIndex = 0;
              document.getElementById('competition-email-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-checkbox-error').innerText = '';
              document.getElementById('competition-checkbox-error').style.backgroundColor =
                'transparent';

              document.getElementById('competition-checkbox-error3').innerText = '';
              document.getElementById('competition-checkbox-error3').style.backgroundColor =
                'transparent';
              return;
            }
            if (
              emailInput?.value === '' ||
              emailInput?.value === null ||
              (emailInput?.value?.length < 12 && this.customer === 'Orlen')
            ) {
              document.getElementById('competition-email-error').innerText =
                this.language === 'LV'
                  ? 'Obligāti aizpildāmie lauki.'
                  : this.language === 'ES'
                  ? 'Requerido para continuar.'
                  : 'Norint tęsti privaloma užpildyti.';
              document.getElementById('competition-email-error').zIndex = 1;
              document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
              document.getElementById('competition-name-error').innerText = '';
              document.getElementById('competition-phone-error').innerText = '';

              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-name-error').style.backgroundColor =
                'transparent';
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
              (phoneInput?.value === '' || phoneInput?.value === null) &&
              this.customer === 'Toni'
            ) {
              document.getElementById('competition-phone-error').innerText =
                this.language === 'LV'
                  ? 'Obligāti aizpildāmie lauki.'
                  : this.language === 'ES'
                  ? 'Requerido para continuar.'
                  : 'Norint tęsti privaloma užpildyti.';
              document.getElementById('competition-phone-error').zIndex = 1;
              document.getElementById('competition-phone-error').style.backgroundColor = '#FFBABA';
              document.getElementById('competition-name-error').innerText = '';

              document.getElementById('competition-name-error').style.backgroundColor =
                'transparent';
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

              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-email-error').style.backgroundColor =
                'transparent';
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
              !isValidEmail(emailInput?.value) &&
              this.customer !== 'Toni' &&
              this.customer !== 'Orlen'
            ) {
              document.getElementById('competition-email-error').innerText =
                this.language === 'ES'
                  ? 'Formato de correo electrónico incorrecto.'
                  : 'Neteisingas el. pašto formatas.'; // Incorrect email format in Lithuanian
              document.getElementById('competition-email-error').zIndex = 1;
              document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';

              return;
            }

            if (emailInput?.value?.length < 10 && this.customer === 'Toni') {
              document.getElementById('competition-email-error').innerText =
                'Debes ingresar 10 dígitos.';
              document.getElementById('competition-email-error').zIndex = 1;
              document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
              document.getElementById('competition-email-error').style.height = '20px';

              document.getElementById('competition-phone-error').innerText = '';
              document.getElementById('competition-phone-error').style.backgroundColor =
                'transparent';

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
              document.getElementById('competition-email-error').style.backgroundColor =
                'transparent';
              document.getElementById('competition-email-error').style.height = '37px';

              return;
            }

            if (
              (this.showCompetitiveRegistration === 'competition' ||
                this.showCompetitiveRegistration === 'points' ||
                this.showCompetitiveRegistration === 'collectable') &&
              checkboxChange &&
              this.loading === false &&
              (this.customer !== 'Pegasas' || checkboxChange2) &&
              (this.customer !== 'Pegasas' || phone?.value?.trim() === '' || checkboxChange3)
            ) {
              const phoneValue = phone?.value?.trim();
              this.loading = true;

              const boomioCatchSpinner = document.createElement('div');
              boomioCatchSpinner.classList.add('boomioCatchSpinner'); // Apply class

              // Apply inline styles for the button layout
              boomioCatchSpinner.style.border = '4px solid #f3f3f3';
              boomioCatchSpinner.style.borderTop = '4px solid #3D4928';
              boomioCatchSpinner.style.borderRadius = '50%';
              boomioCatchSpinner.style.width = '20px';
              boomioCatchSpinner.style.height = '20px';

              // Append the boomioCatchSpinner to the button
              competitionConfirmFieldBody.appendChild(boomioCatchSpinner);

              // Append styles if not present
              if (!document.getElementById('boomioCatchSpinner-styles')) {
                const style = document.createElement('style');
                style.id = 'boomioCatchSpinner-styles';
                style.textContent = `
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    .boomioCatchSpinner {
                      animation: spin 1s linear infinite;
                    }
                  `;
                document.head.appendChild(style);
              }
              boomioService
                .signal('', 'user_info', {
                  emails_consent:
                    this.customer === 'Akropolis' ? this.checkboxChange : this.checkboxChange2,
                  user_email: emailInput?.value,
                  ...(this.customer.includes('Gamtos Ateitis') && {
                    team: schoolInput.value,
                  }),
                  user_name: this.customer.includes('Gamtos Ateitis')
                    ? emailInput?.value
                    : this.customer === 'Toni'
                    ? playerNameInput?.value + phoneInput?.value
                    : playerNameInput?.value,
                  game_code: this.game_code,
                  ...(phoneValue ? { phone: phoneInput?.value } : {}),
                })
                .then((response) => {
                  boomioCatchSpinner.remove();
                  if (response.success === false) {
                    this.loading = false;

                    if (response.res_code === 'EMAIL_EXIST') {
                      document.getElementById('competition-email-error').innerText =
                        this.customer === 'Fpro'
                          ? 'This email address already exists. Please use another one.'
                          : this.customer === 'Toni'
                          ? 'Este número ya está en uso. Use el mismo número del registro inicial o uno nuevo.'
                          : this.language === 'ES'
                          ? 'Este email ya está en uso. Use otro email.'
                          : this.language === 'LV'
                          ? 'Šī e-pasta adrese jau eksistē. Izmantojiet citu.'
                          : this.language === 'RU'
                          ? 'Этот e-мейл адрес уже существует. Используйте другой.'
                          : this.language === 'ET'
                          ? 'See e-posti aadress on juba olemas. Kasutage teist.'
                          : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-email-error').style.backgroundColor =
                        '#FFBABA';

                      document.getElementById('competition-name-error').innerText = '';
                      document.getElementById('competition-phone-error').innerText = '';

                      document.getElementById('competition-phone-error').style.backgroundColor =
                        'transparent';
                      document.getElementById('competition-name-error').style.backgroundColor =
                        'transparent';
                    } else if (response.res_code === 'NICKNAME_EXIST') {
                      document.getElementById('competition-name-error').innerText =
                        this.customer === 'Fpro'
                          ? 'This nickname already exists. Please use another one.'
                          : this.language === 'ES'
                          ? 'Este nombre ya está en uso. Use el mismo nombre del registro inicial o uno nuevo.'
                          : this.language === 'LV'
                          ? 'Šis segvārds jau pastāv. Izmantojiet citu.'
                          : this.language === 'RU'
                          ? 'Этот псевдоним уже существует. Используйте другой.'
                          : this.language === 'ET'
                          ? 'See hüüdnimi on juba olemas. Kasutage teist.'
                          : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-name-error').style.backgroundColor =
                        '#FFBABA';
                      document.getElementById('competition-phone-error').innerText = '';

                      document.getElementById('competition-phone-error').style.backgroundColor =
                        'transparent';
                      document.getElementById('competition-email-error').innerText = '';
                      document.getElementById('competition-email-error').zIndex = 0;
                      document.getElementById('competition-email-error').style.backgroundColor =
                        'transparent';
                      document.getElementById('competition-phone-error').innerText = '';

                      document.getElementById('competition-phone-error').style.backgroundColor =
                        'transparent';
                    }
                  } else {
                    this.bestScore = response.user_best_score;
                    const inpuRegisterContainer = document.querySelector(
                      '.input-register-container',
                    );
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
                      const canvas = document.getElementById('boomio-catch-canvas');
                      document.getElementById('background_blur').style.opacity =
                        this.customer === 'Pegasas' ? 0.8 : 0.37;
                      const inputContainer = document.querySelector('.input-container');
                      document.getElementById('control-button').style.transition =
                        'opacity 2s ease';
                      document.getElementById('control-button').style.opacity = 1;
                      document.getElementById('control-button').style.display = 'flex';
                      inputContainer.style.transition =
                        'height 1s ease, top 1s ease, opacity 1s ease';
                      inputContainer.style.display = 'block';
                      setTimeout(() => {
                        inputContainer.style.height = '332px';
                        inputContainer.style.top = 'calc(50% + 170px)';
                        inputContainer.style.opacity = 1;
                      }, 100);
                    }, 300);
                  }
                })
                .catch((error) => {
                  this.loading = false;
                  boomioCatchSpinner.remove();
                  console.error('Error:', error);
                });
            }
          }, 300);
        }
      };

      const clickEventHandlerResetGame = () => {
        this.resetGame();
        this.menuShown = false;
        const competitionRestart = document.getElementById('boomio-game-play-again');
        competitionRestart.removeEventListener('click', clickEventHandlerResetGame);

        setTimeout(() => {
          competitionRestart.addEventListener('click', clickEventHandlerResetGame);
        }, 2000);

        this.index = 0;
        this.currentScore = 0;

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
          if (
            this.showCompetitiveRegistration === 'competition' ||
            this.showCompetitiveRegistration === 'points' ||
            this.showCompetitiveRegistration === 'collectable'
          ) {
            boomioService
              .signal('ROUND_STARTED', 'signal')
              .then((response) => {
                document.getElementById('background_blur').style.display = 'none';
                const canvas = document.getElementById('boomio-catch-canvas');
                canvas.style.transition = 'filter 1s ease';
                canvas.style.filter = 'none';
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }, 400);
      };
      const clickEventHandlerDidYouKnow = () => {
        if (this.customer === 'Akropolis') {
          this.hideScore();
          boomioService
            .signal('ROUND_FINISHED', 'signal', {
              score: this.currentScore,
              shared_somewhere: this.shareClicked,
            })
            .then((response) => {
              this.hideScore();
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

        let tabContainer;
        if (this.customer === 'Akropolis') {
          tabContainer = document.querySelector('.share-container');
        } else {
          tabContainer = document.querySelector('.did-you-know-container');
        }

        tabContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        setTimeout(() => {
          tabContainer.style.height = '10px';
          tabContainer.style.top = 'calc(50% + 330px)';
          tabContainer.style.opacity = 0;
        }, 100);
        setTimeout(() => {
          tabContainer.style.display = 'none';
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

      document.getElementById('startButtonClick').addEventListener('click', () => {
        if (!this.gameStarted) {
          let canvas = document.getElementById('boomio-catch-canvas');

          const inputContainer = document.querySelector('.input-container');
          const controlButton = document.querySelector('.control-button');

          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          controlButton.style.transition = 'opacity 0.6s ease';
          setTimeout(() => {
            inputContainer.style.height = '10px';
            inputContainer.style.top = 'calc(50% + 330px)';
            inputContainer.style.opacity = 0;
            if (this.gameCount === 0) {
              const tutorial = document.querySelector('.tutorial');
              tutorial.style.display = 'block';
            }
          }, 100);
          setTimeout(() => {
            inputContainer.style.display = 'none';
          }, 1000);

          if (this.gameCount === 0) {
            const controlButton = document.querySelector('.control-button');
            controlButton.style.display = 'none';
            this.index = 0;

            this.clickEventHandler = () => {
              const tutorial = document.querySelector('.tutorial');

              tutorial.style.display = 'none';
              const numbers = document.querySelector('.numbers');
              const new_highscore = document.querySelector('.new_highscore');

              new_highscore.style.display = 'none';

              const new_highscore_stars = document.querySelector('.new_highscore_stars');

              new_highscore_stars.style.display = 'none';

              numbers.style.display = 'none';

              if (this.gameStarted === false) {
                if (
                  this.showCompetitiveRegistration === 'competition' ||
                  this.showCompetitiveRegistration === 'points' ||
                  this.showCompetitiveRegistration === 'collectable'
                ) {
                  boomioService
                    .signal('ROUND_STARTED', 'signal')
                    .then((response) => {
                      this.gameStarted = true;
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                }
              }
              if (this.gameCount === 0) {
                this.init();

                this.gameCount++;

                document.getElementById('background_blur').style.display = 'none';
                const canvas = document.getElementById('boomio-catch-canvas');
                canvas.style.transition = 'filter 1s ease';
                canvas.style.filter = 'none';

                controlButton.style.opacity = 0;
              }
            };
            canvas.addEventListener('click', this.clickEventHandler);
          }

          this.clickEventHandlerButton = () => {
            const inputContainer = document.querySelector('.input-container1');
            this.index = 0;
            this.currentScore = 0;
            inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
            setTimeout(() => {
              inputContainer.style.height = '10px';
              inputContainer.style.top = 'calc(50% + 330px)';
              inputContainer.style.opacity = 0;
              if (this.gameCount === 0) {
                const tutorial = document.querySelector('.tutorial');
                tutorial.style.display = 'block';
              }
            }, 100);
            setTimeout(() => {
              inputContainer.style.display = 'none';
            }, 1000);

            setTimeout(() => {
              document.getElementById('background_blur').style.display = 'none';
              const canvas = document.getElementById('boomio-catch-canvas');
              canvas.style.transition = 'filter 1s ease';
              canvas.style.filter = 'none';
            }, 400);
            controlButton.style.display = 'none';
            controlButton.style.opacity = 0;
            setTimeout(() => {
              canvas.onclick = () => {
                this.gameStarted = true;
              };
            }, 50);
          };
        }
      });

      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);

      const competitionRestart = document.getElementById('boomio-game-play-again');
      competitionRestart.addEventListener('click', clickEventHandlerResetGame);

      const competitionDidYouKnow = document.getElementById('boomio-close-did-you-know');
      if (competitionDidYouKnow) {
        competitionDidYouKnow.addEventListener('click', clickEventHandlerDidYouKnow);
      }
    }

    const closeGame = () => {
      const element = document.getElementById('boomio-widget-content');
      if (element && element.parentNode) {
        this.gameClosed = true;
        element.parentNode.removeChild(element);
      }
    };

    document.getElementById('close-game-container').addEventListener('click', () => {
      closeGame();
    });
  }

  init() {
    this.setLife();
    this.createPlayer();
    this.createFruits();
    this.addEventListeners();
    this.startGame();
  }

  setLife() {
    const currectLifeDiv = document.getElementsByClassName('boomio-life-input-container')[0];
    const currectScoreDiv = document.getElementsByClassName(
      'boomio-score-input-container-catch',
    )[0];
    currectScoreDiv.style.display = 'block';
    document.getElementById('currentScore').innerHTML = `0`;

    currectLifeDiv.style.transition = 'opacity 0.8s ease';
    currectLifeDiv.style.display = 'block';
    document.getElementById('currentLife').innerHTML =
      this.customer === 'Eurovaistine'
        ? `${this.defaultscore}/${this.defaultscore}`
        : `${this.defaultscore}/${this.defaultscore}`;
    currectLifeDiv.style.opacity = 1;
  }

  createPlayer() {
    this.player = new Player(this.customer, this.canvas, this.context, this.defaultscore);
  }

  createFruits() {
    this.fruits = [];
    if (
      this.customer.includes('Gamtos Ateitis') ||
      this.customer === 'Pieno Žvaigždės' ||
      this.customer === 'Akropolis' ||
      this.customer === 'Daumantu' ||
      this.customer === 'Zemaitijos Pienas' ||
      this.customer === 'Toni'
    ) {
      for (let i = 0; i < this.numberOfFruits - 2; i++) {
        const fruit = new Fruit(this.customer, this.canvas, this.context, this.player, this);
        fruit.chooseFruit();
        this.fruits.push(fruit);
      }
      for (let i = 0; i < 1; i++) {
        const fruit = new Fruit(this.customer, this.canvas, this.context, this.player, this, 'bad');
        fruit.chooseFruit();
        this.fruits.push(fruit);
      }
    } else {
      for (let i = 0; i < this.numberOfFruits; i++) {
        const fruit = new Fruit(this.customer, this.canvas, this.context, this.player, this);
        fruit.chooseFruit();
        this.fruits.push(fruit);
      }
    }
  }

  addEventListeners() {
    // Remove old listeners to avoid duplicates
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);

    // Add new listeners for keyboard
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    // Add new listeners for mobile touch
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleTouchEnd);
  }

  handleKeyDown = (e) => {
    if (!this.player.gameOver) {
      e.preventDefault();
      if (e.keyCode === 37) {
        // Left arrow key
        this.movement.left = true;
      } else if (e.keyCode === 39) {
        // Right arrow key
        this.movement.right = true;
      }
    }
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 37) {
      // Left arrow key
      this.movement.left = false;
    } else if (e.keyCode === 39) {
      // Right arrow key
      this.movement.right = false;
    }
  };

  // Handle touch start event for mobile
  handleTouchStart = (e) => {
    if (!this.player.gameOver) {
      const touchX = e.touches[0].clientX;
      const canvasMiddle = window.innerWidth / 2;

      if (touchX < canvasMiddle) {
        this.movement.left = true;
      } else {
        this.movement.right = true;
      }

      this.touchMoveActive = true; // Indicate that touch is active
    }
  };

  handleTouchEnd = () => {
    // Stop movement when the touch ends
    this.movement.left = false;
    this.movement.right = false;
    this.touchMoveActive = false; // Indicate that touch is no longer active
  };

  updatePlayerMovement() {
    if (this.movement.left) {
      this.player.moveLeft();
    }
    if (this.movement.right) {
      this.player.moveRight();
    }
  }

  startGame() {
    this.updateGame();

    window.requestAnimationFrame(() => this.drawGame());
  }
  updateGame() {
    if (!this.player.gameOver) {
      const count = this.customer.includes('Gamtos Ateitis')
        ? 5
        : this.customer === 'Pieno Žvaigždės'
        ? 5
        : 3;
      if (this.player.fruitsMissed >= count) {
        this.player.gameOver = true;
      }

      this.fruits.forEach((fruit) => fruit.fall(fruit));
      if (
        this.customer.includes('Gamtos Ateitis') ||
        this.customer === 'Pieno Žvaigždės' ||
        this.customer === 'Akropolis' ||
        this.customer === 'Daumantu' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Toni'
      ) {
        const newNumberOfFruits = 4 + Math.floor(this.currentScore / 500);
        if (this.fruits.length < newNumberOfFruits) {
          // Create additional fruits to reach the new number
          for (let i = this.fruits.length; i < newNumberOfFruits; i++) {
            const fruit = new Fruit(this.customer, this.canvas, this.context, this.player, this);
            fruit.chooseFruit();
            this.fruits.push(fruit);
          }
        }

        if (this.fruits.length < newNumberOfFruits + 2) {
          // Create additional fruits to reach the new number
          for (let i = this.fruits.length; i < newNumberOfFruits; i++) {
            const fruit = new Fruit(
              this.customer,
              this.canvas,
              this.context,
              this.player,
              this,
              'bad',
            );
            fruit.chooseFruit();
            this.fruits.push(fruit);
          }
        }
      } else {
        const newNumberOfFruits = 8 + Math.floor(this.currentScore / 500);
        if (this.fruits.length < newNumberOfFruits) {
          // Create additional fruits to reach the new number
          for (let i = this.fruits.length; i < newNumberOfFruits; i++) {
            const fruit = new Fruit(this.customer, this.canvas, this.context, this.player, this);
            fruit.chooseFruit();
            this.fruits.push(fruit);
          }
        }
      }

      this.timer = window.setTimeout(() => this.updateGame(), 30);
    }
  }

  drawGame() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.player.gameOver) {
      // Game is running
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Render fruits first (so they appear behind the player)
      this.fruits.forEach((fruit) => fruit.render());

      // Render player on top of the fruits
      this.player.render();

      // Continue the game loop
      this.updatePlayerMovement(); // Continuously update player movement

      this.animationFrame = window.requestAnimationFrame(() => this.drawGame());
    } else {
      // Trigger the menu UI (only once)
      if (!this.menuShown) {
        this.fruits.length = 0;
        this.menuShown = true; // Set a flag to ensure the menu is only shown once

        setTimeout(
          () => {
            if (
              (this.showCompetitiveRegistration === 'competition' ||
                this.showCompetitiveRegistration === 'points' ||
                this.showCompetitiveRegistration === 'collectable') &&
              this.customer !== 'Akropolis'
            ) {
              this.hideScore();
              boomioService
                .signal('ROUND_FINISHED', 'signal', {
                  score: this.currentScore,
                })
                .then((response) => {
                  this.hideScore();
                  this.userBestPlace = response.user_best_place;
                  if (this.showCompetitiveRegistration === 'points') {
                    this.scoreTable = response;
                    this.scoreTableContainerInstance.updateProps(
                      this.customer,
                      this.scoreTable,
                      this.currentScore,
                    );
                  }
                  if (this.customer === 'Akropolis') {
                    this.scoreTable = response;
                    this.shareContainer.updateProps(this.customer, this.currentScore);
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
            // Displaying the competition table container
            const canvas = document.getElementById('boomio-catch-canvas');

            let competitionTableContainer = '';
            if (
              this.customer.includes('Gamtos Ateitis') ||
              this.customer === 'Pieno Žvaigždės' ||
              this.customer === 'Pegasas' ||
              this.customer === 'Zemaitijos Pienas'
            ) {
              competitionTableContainer = document.querySelector('.did-you-know-container');
            } else if (this.customer === 'Akropolis') {
              competitionTableContainer = document.querySelector('.share-container');
            } else {
              competitionTableContainer = document.querySelector('.competition-table-container');
            }

            document.getElementById('background_blur').style.display = 'block';
            competitionTableContainer.style.transition =
              'height 1s ease, top 1s ease, opacity 1s ease';
            competitionTableContainer.style.display = 'block';

            setTimeout(() => {
              competitionTableContainer.style.height = '680px';
              competitionTableContainer.style.top = 'calc(50%)';
              competitionTableContainer.style.opacity = 1;
            }, 100);

            const currectScoreDiv = document.getElementsByClassName(
              'boomio-score-input-container-catch',
            )[0];
            const currectTimeDiv = document.getElementsByClassName(
              'boomio-life-input-container',
            )[0];
            currectTimeDiv.style.opacity = 0;

            currectScoreDiv.style.opacity = 0;
            setTimeout(() => {
              currectTimeDiv.style.display = 'block';

              currectScoreDiv.style.display = 'block';
            }, 300);
          },
          this.newHighScoreReached ? 2500 : 100,
        );
      }
    }
  }

  resetGame() {
    const currectScoreDiv = document.getElementsByClassName(
      'boomio-score-input-container-catch',
    )[0];
    this.hideScore();
    currectScoreDiv.style.opacity = 1;
    setTimeout(() => {
      currectScoreDiv.style.display = 'block';
    }, 300);

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    // Reset player and game state
    this.player.gameOver = false;
    this.currentScore = 0;
    this.player.fruitsCollected = 0;
    this.player.fruitsMissed = 0;
    this.fruits = [];
    this.gameCount++;

    // Reinitialize the game
    this.init();
  }

  hideScore() {
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
  }
}

class Player {
  constructor(customer, canvas, context, defaultscore) {
    this.canvas = canvas;
    this.context = context;
    this.gameOver = false;
    this.score = 0;
    this.fruitsCollected = 0;
    this.fruitsMissed = 0;
    this.playerWidth = this.customer === 'Toni' ? 110 : customer === 'Akropolis' ? 88 : 110;
    this.playerHeight = this.customer === 'Toni' ? 80 : customer === 'Akropolis' ? 64 : 80;
    this.playerSpeed = 4;
    this.x = this.canvas.width / 2 - this.playerWidth / 2;
    this.y = this.canvas.height - this.playerHeight - 18;
    if (customer === 'Daumantu') {
      this.y -= 20; // Move the player 20px higher if the customer is 'Daumantu'
    }

    this.playerImage = new Image();
    this.playerImage.src = customer.includes('Paper')
      ? playerGamtosAteitisPaper
      : customer.includes('Plastic')
      ? playerGamtosAteitis
      : customer.includes('Glass')
      ? playerGamtosAteitisGlass
      : customer === 'Pieno Žvaigždės'
      ? playerPienoZvaigzdes
      : customer === 'Pegasas'
      ? playerPegasas
      : customer === 'Akropolis'
      ? playerAkropolis
      : customer === 'Daumantu'
      ? playerDaumantu
      : customer === 'Zemaitijos Pienas'
      ? playerDobilo
      : customer === 'Toni'
      ? playerToni
      : customer === 'Orlen'
      ? playerOrlen
      : player;
    this.defaultscore = defaultscore;
  }

  render() {
    if (!this.gameOver) {
      this.context.drawImage(this.playerImage, this.x, this.y, this.playerWidth, this.playerHeight);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.playerSpeed;
    }
  }

  moveRight() {
    if (this.x < this.canvas.width - this.playerWidth) {
      this.x += this.playerSpeed;
    }
  }
}

class Fruit {
  constructor(customer, canvas, context, player, game, type) {
    this.canvas = canvas;
    this.context = context;
    this.player = player;
    this.game = game;
    this.type = type;
    this.customer = customer;
    if (this.customer.includes('Gamtos Ateitis')) {
      if (type === 'bad') {
        this.fruitNumber = Math.floor(Math.random() * 13);
      } else {
        this.fruitNumber = Math.floor(Math.random() * 10 + 13);
      }
    } else if (this.customer === 'Pieno Žvaigždės') {
      if (type === 'bad') {
        this.fruitNumber = Math.floor(Math.random() * 6 + 8);
      } else {
        this.fruitNumber = Math.floor(Math.random() * 8);
      }
    } else if (this.customer === 'Akropolis') {
      if (type === 'bad') {
        this.fruitNumber = Math.floor(Math.random() * 5 + 5);
      } else {
        this.fruitNumber = Math.floor(Math.random() * 5);
      }
    } else if (this.customer === 'Daumantu' || this.customer === 'Zemaitijos Pienas') {
      if (type === 'bad') {
        this.fruitNumber = Math.floor(Math.random() * 8 + 5);
      } else {
        this.fruitNumber = Math.floor(Math.random() * 8);
      }
    } else if (this.customer === 'Toni') {
      if (type === 'bad') {
        this.fruitNumber = Math.floor(Math.random() * 6 + 2);
      } else {
        this.fruitNumber = Math.floor(Math.random() * 6);
      }
    } else {
      this.fruitNumber = Math.floor(Math.random() * 10);
    }

    this.fruitType = '';
    this.fruitScore = 0;
    this.fruitWidth =
      this.customer === 'Pegasas'
        ? 60
        : this.customer === 'Pieno Žvaigždės'
        ? 50
        : this.customer === 'Akropolis'
        ? type === 'bad'
          ? 45
          : 55
        : 55;
    this.fruitHeight =
      this.customer === 'Pegasas'
        ? 60
        : this.customer === 'Pieno Žvaigždės'
        ? 50
        : this.customer === 'Akropolis'
        ? type === 'bad'
          ? 45
          : 55
        : 55;
    this.fruitWidthArray = [40, 40, 40, 40, 30];
    this.fruitHeightArray = [40, 40, 40, 40, 30];
    this.fruitImage = new Image();
    this.fruitSpeed = Math.floor(
      Math.random() * 3 +
        (this.customer === 'Pieno Žvaigždės' ||
        this.customer === 'Akropolis' ||
        this.customer === 'Daumantu' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Toni'
          ? 3
          : 1),
    );

    this.x = Math.random() * (this.canvas.width - this.fruitWidth);
    this.y = Math.random() * -this.canvas.height - this.fruitHeight;

    // Fruit images
    if (this.customer && this.customer.includes('Plastic')) {
      // Handle Gamtos Ateitis images
      this.images = [
        item1,
        item4,
        item5,
        item6,
        item7,
        item8,
        item10,
        item12,
        item14,
        item16,
        item19,
        item20,
        item23,
        item2,
        item3,
        item9,
        item11,
        item13,
        item15,
        item17,
        item18,
        item21,
        item22,
      ];
    } else if (this.customer && this.customer.includes('Paper')) {
      // Handle Paper images
      this.images = [
        item1Paper,
        item4Paper,
        item5Paper,
        item6Paper,
        item7Paper,
        item8Paper,
        item10Paper,
        item12Paper,
        item14Paper,
        item16Paper,
        item19Paper,
        item20Paper,
        item23Paper,
        item2Paper,
        item3Paper,
        item9Paper,
        item11Paper,
        item13Paper,
        item15Paper,
        item17Paper,
        item18Paper,
        item21Paper,
        item22Paper,
      ];
    } else if (this.customer && this.customer.includes('Glass')) {
      // Handle Glass images
      this.images = [
        item1Glass,
        item4Glass,
        item5Glass,
        item6Glass,
        item7Glass,
        item8Glass,
        item10Glass,
        item12Glass,
        item14Glass,
        item16Glass,
        item19Glass,
        item20Glass,
        item23Glass,
        item2Glass,
        item3Glass,
        item9Glass,
        item11Glass,
        item13Glass,
        item15Glass,
        item17Glass,
        item18Glass,
        item21Glass,
        item22Glass,
      ];
    } else if (this.customer && this.customer === 'Pieno Žvaigždės') {
      this.images = [
        item1PienoZvaigzdes,
        item2PienoZvaigzdes,
        item3PienoZvaigzdes,
        item4PienoZvaigzdes,
        item5PienoZvaigzdes,
        item6PienoZvaigzdes,
        item7PienoZvaigzdes,
        item8PienoZvaigzdes,
        item9PienoZvaigzdes,
        item10PienoZvaigzdes,
        item11PienoZvaigzdes,
        item12PienoZvaigzdes,
        item13PienoZvaigzdes,
        item14PienoZvaigzdes,
      ];
    } else if (this.customer && this.customer === 'Akropolis') {
      this.images = [
        item1Akropolis,
        item2Akropolis,
        item3Akropolis,
        item4Akropolis,
        item5Akropolis,
        item6Akropolis,
        item7Akropolis,
        item8Akropolis,
        item9Akropolis,
        item10Akropolis,
      ];
    } else if (this.customer && this.customer === 'Daumantu') {
      this.images = [
        item1Daumantu,
        item2Daumantu,
        item3Daumantu,
        item4Daumantu,
        item5Daumantu,
        item6Daumantu,
        item7Daumantu,
        item8Daumantu,
        item9Daumantu,
        item10Daumantu,
        item11Daumantu,
        item12Daumantu,
        item13Daumantu,
      ];
    } else if (this.customer && this.customer === 'Zemaitijos Pienas') {
      this.images = [
        item1Dobilo,
        item2Dobilo,
        item3Dobilo,
        item4Dobilo,
        item5Dobilo,
        item6Dobilo,
        item7Dobilo,
        item8Dobilo,
        item9Dobilo,
        item10Dobilo,
        item11Dobilo,
        item12Dobilo,
        item13Dobilo,
      ];
    } else if (this.customer && this.customer === 'Toni') {
      this.images = [
        item1Toni,
        item2Toni,
        item3Toni,
        item4Toni,
        item5Toni,
        item6Toni,
        item7Toni,
        item8Toni,
        item9Toni,
        item10Toni,
      ];
    } else {
      // Default catch images if none of the above conditions are met
      this.images = [
        item1Pegasas,
        item2Pegasas,
        item3Pegasas,
        item4Pegasas,
        item5Pegasas,
        item6Pegasas,
        item7Pegasas,
        item8Pegasas,
        item9Pegasas,
        item10Pegasas,
      ];
    }
  }

  chooseFruit() {
    if (this.customer && this.customer.includes('Plastic')) {
      // Handle Gamtos Ateitis fruit types
      this.fruitType = [
        'item1',
        'item4',
        'item5',
        'item6',
        'item7',
        'item8',
        'item10',
        'item12',
        'item14',
        'item16',
        'item19',
        'item20',
        'item23',
        'item2',
        'item3',
        'item9',
        'item11',
        'item13',
        'item15',
        'item17',
        'item18',
        'item21',
        'item22',
      ][this.fruitNumber];
    } else if (this.customer && this.customer.includes('Paper')) {
      // Handle Paper fruit types
      this.fruitType = [
        'item1Paper',
        'item4Paper',
        'item5Paper',
        'item6Paper',
        'item7Paper',
        'item8Paper',
        'item10Paper',
        'item12Paper',
        'item14Paper',
        'item16Paper',
        'item19Paper',
        'item20Paper',
        'item23Paper',
        'item2Paper',
        'item3Paper',
        'item9Paper',
        'item11Paper',
        'item13Paper',
        'item15Paper',
        'item17Paper',
        'item18Paper',
        'item21Paper',
        'item22Paper',
      ][this.fruitNumber];
    } else if (this.customer && this.customer.includes('Glass')) {
      // Handle Glass fruit types
      this.fruitType = [
        'item1Glass',
        'item4Glass',
        'item5Glass',
        'item6Glass',
        'item7Glass',
        'item8Glass',
        'item10Glass',
        'item12Glass',
        'item14Glass',
        'item16Glass',
        'item19Glass',
        'item20Glass',
        'item23Glass',
        'item2Glass',
        'item3Glass',
        'item9Glass',
        'item11Glass',
        'item13Glass',
        'item15Glass',
        'item17Glass',
        'item18Glass',
        'item21Glass',
        'item22Glass',
      ][this.fruitNumber];
    } else if (this.customer === 'Pieno Žvaigždės') {
      this.fruitType = [
        'item1PienoZvaigzdes',
        'item2PienoZvaigzdes',
        'item3PienoZvaigzdes',
        'item4PienoZvaigzdes',
        'item5PienoZvaigzdes',
        'item6PienoZvaigzdes',
        'item7PienoZvaigzdes',
        'item8PienoZvaigzdes',
        'item9PienoZvaigzdes',
        'item10PienoZvaigzdes',
        'item11PienoZvaigzdes',
        'item12PienoZvaigzdes',
        'item13PienoZvaigzdes',
        'item14PienoZvaigzdes',
      ][this.fruitNumber];
    } else if (this.customer === 'Akropolis') {
      this.fruitType = [
        'item1Akropolis',
        'item2Akropolis',
        'item3Akropolis',
        'item4Akropolis',
        'item5Akropolis',
        'item6Akropolis',
        'item7Akropolis',
        'item8Akropolis',
        'item9Akropolis',
        'item10Akropolis',
      ][this.fruitNumber];
    } else if (this.customer === 'Daumantu') {
      this.fruitType = [
        'item1Daumantu',
        'item2Daumantu',
        'item3Daumantu',
        'item4Daumantu',
        'item5Daumantu',
        'item6Daumantu',
        'item7Daumantu',
        'item8Daumantu',
        'item9Daumantu',
        'item10Daumantu',
        'item11Daumantu',
        'item12Daumantu',
        'item13Daumantu',
      ][this.fruitNumber];
    } else if (this.customer === 'Zemaitijos Pienas') {
      this.fruitType = [
        'item1Dobilo',
        'item2Dobilo',
        'item3Dobilo',
        'item4Dobilo',
        'item5Dobilo',
        'item6Dobilo',
        'item7Dobilo',
        'item8Dobilo',
        'item9Dobilo',
        'item10Dobilo',
        'item11Dobilo',
        'item12Dobilo',
        'item13Dobilo',
      ][this.fruitNumber];
    } else if (this.customer === 'Toni') {
      this.fruitType = [
        'item1Toni',
        'item2Toni',
        'item3Toni',
        'item4Toni',
        'item5Toni',
        'item6Toni',
        'item7Toni',
        'item8Toni',
        'item9Toni',
        'item10Toni',
      ][this.fruitNumber];
    } else {
      // Default catch fruit types if none of the above conditions are met
      this.fruitType = [
        'item1Pegasas',
        'item2Pegasas',
        'item3Pegasas',
        'item4Pegasas',
        'item5Pegasas',
        'item6Pegasas',
        'item7Pegasas',
        'item8Pegasas',
        'item9Pegasas',
        'item10Pegasas',
      ][this.fruitNumber];
    }

    if (this.customer.includes('Gamtos Ateitis')) {
      this.fruitScore = [
        -50, -50, -50, -50, -50, -50, -50, -50, -50, -50, -50, -50, -50, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100,
      ][this.fruitNumber];
    } else if (this.customer === 'Pieno Žvaigždės') {
      this.fruitScore = [100, 100, 100, 100, 100, 100, 100, 100, -50, -50, -50, -50, -50, -50][
        this.fruitNumber
      ];
    } else if (this.customer === 'Akropolis') {
      this.fruitScore = [100, 100, 100, 100, 100, -50, -50, -50, -50, -50][this.fruitNumber];
    } else if (this.customer === 'Daumantu' || this.customer === 'Zemaitijos Pienas') {
      this.fruitScore = [100, 100, 100, 100, 100, 100, 100, 100, -50, -50, -50, -50, -50][
        this.fruitNumber
      ];
    } else if (this.customer === 'Toni') {
      this.fruitScore = [100, 100, 100, 100, 100, 100, -50, -50, -50, -50][this.fruitNumber];
    } else {
      this.fruitScore = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100][this.fruitNumber];
    }
    this.fruitImage.src = this.images[this.fruitNumber];
  }

  fall(fruit) {
    if (this.y < this.canvas.height - this.fruitHeight) {
      this.y += this.fruitSpeed;
    } else {
      if (
        this.customer.includes('Gamtos Ateitis') ||
        this.customer === 'Pieno Žvaigždės' ||
        this.customer === 'Akropolis' ||
        this.customer === 'Daumantu' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Toni'
      ) {
        if (fruit.fruitScore > 0 && this.game.currentScore > 0) {
          this.game.currentScore += -50;
          document.getElementById('currentScore').innerHTML = `${this.game.currentScore}`;
          this.showScoreEffect('-50');
        }
      } else {
        if (fruit.fruitScore > 0) {
          this.player.fruitsMissed++;
          document.getElementById('currentLife').innerHTML = `${Math.max(
            0,
            this.player.defaultscore - this.player.fruitsMissed,
          )}/${this.player.defaultscore}`;
          if (this.customer === 'Pegasas') {
            this.showScoreEffect('-1', true);
          }
        }
        this.changeState();
      }

      this.changeState();
    }

    this.checkIfCaught();
  }

  checkIfCaught() {
    if (this.y >= this.player.y - 40 && this.y <= this.player.y - 30) {
      if (
        (this.x > this.player.x && this.x < this.player.x + this.player.playerWidth) ||
        (this.x + this.fruitWidth > this.player.x &&
          this.x + this.fruitWidth < this.player.x + this.player.playerWidth)
      ) {
        this.player.fruitsCollected++;
        this.updateScore();
        this.changeState();
      }
    }
  }

  showScoreEffect(score, showLife) {
    const x = this.canvas.width / 2 - this.playerWidth / 2;
    const y = this.canvas.height - this.playerHeight - 200;

    const gameContainer = document.querySelector('.game-container');

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('float-score');
    scoreContainer.style.left = `${x}px`;
    scoreContainer.style.top = `${y}px`;
    scoreContainer.style.position = 'absolute';
    scoreContainer.style.display = 'flex';

    if (showLife) {
      const scoreText = document.createElement('div');
      scoreText.innerHTML = `-`;
      scoreText.style.color = '#fff';
      scoreText.style.fontSize = '24px';
      scoreText.style.fontWeight = 'bold';
      scoreText.style.marginRight = '10px';
      scoreText.style.marginTop = '25px';

      const lifeImg = document.createElement('img');
      lifeImg.src = life;
      lifeImg.alt = 'Image Description';
      lifeImg.style.width = '70px';
      lifeImg.style.height = '50px';
      lifeImg.style.marginTop = '15px';
      lifeImg.style.marginLeft = '-20px';
      scoreContainer.appendChild(scoreText);
      scoreContainer.appendChild(lifeImg);
    } else {
      const scoreText = document.createElement('div');
      scoreText.innerHTML = `${score}`;
      scoreText.style.color = '#fff';
      scoreText.style.fontSize = '24px';
      scoreText.style.fontWeight = 'bold';
      scoreText.style.marginRight = '10px'; // Add space between text and image
      scoreContainer.appendChild(scoreText);
    }
    gameContainer.appendChild(scoreContainer);

    setTimeout(() => {
      scoreContainer.remove();
    }, 1000);
  }

  updateScore() {
    if (this.fruitScore > 0) {
      // Update the current score
      console.log(`Fruit caught: ${this.fruitType}, Score: ${this.fruitScore}`);

      if (this.fruitType === 'item2Toni') {
        this.game.currentScore += this.fruitScore * 2;
      } else {
        this.game.currentScore += this.fruitScore;
      }
      document.getElementById('currentScore').innerHTML = `${this.game.currentScore}`;

      if (this.fruitType === 'item2Toni') {
        this.showScoreEffect('+200');
      } else {
        this.showScoreEffect('+100');
      }

      const effectElement = document.getElementById('background_effect');
      effectElement.style.display = 'block';
      effectElement.style.opacity = 1;

      // Start or extend the effect
      if (!this.effectInProgress) {
        // First time the effect is triggered
        this.effectInProgress = true;
        this.effectStartTime = Date.now(); // Track start time of the effect

        // Set the timeout to fade out the effect after 1 second
        this.effectTimeout = setTimeout(() => {
          effectElement.style.opacity = 0;

          // Delay hiding the element until after the opacity transition is complete
          setTimeout(() => {
            effectElement.style.display = 'none';
            this.effectInProgress = false; // Reset flag once the effect is hidden
          }, 200); // Match this duration to the CSS transition duration
        }, 1000); // Initial timeout duration of 1 second
      } else {
        // Effect is already in progress, extend the duration
        const elapsedTime = Date.now() - this.effectStartTime; // How long the effect has been active
        const remainingTime = 1000 - elapsedTime; // Calculate how much time is left in the original effect

        // Clear the previous timeout to extend the effect
        clearTimeout(this.effectTimeout);

        // Set a new timeout with the remaining time to keep the effect visible
        this.effectTimeout = setTimeout(() => {
          effectElement.style.opacity = 0;

          // Delay hiding the element until after the opacity transition is complete
          setTimeout(() => {
            effectElement.style.display = 'none';
            this.effectInProgress = false; // Reset flag once the effect is hidden
          }, 200); // Match this duration to the CSS transition duration
        }, remainingTime); // Extend the timeout with the remaining time
      }
    } else {
      const container = document.querySelector('.boomio-life-input-container');

      // To trigger the shake effect

      container.classList.add('shake-life');

      // Remove the class after the animation ends (reset the animation)
      setTimeout(() => {
        container.classList.remove('shake-life');
      }, 500);

      this.player.fruitsMissed++;
      document.getElementById('currentLife').innerHTML = `${Math.max(
        0,
        this.player.defaultscore - this.player.fruitsMissed,
      )}/${this.player.defaultscore}`;
      this.showScoreEffect('-1', true);
    }

    if (this.game.currentScore > 1) {
      const currectScoreDiv = document.getElementsByClassName(
        'boomio-score-input-container-catch',
      )[0];
      currectScoreDiv.style.transition = 'opacity 0.8s ease';
      currectScoreDiv.style.display = 'block';
      currectScoreDiv.style.opacity = 1;
    }
    if (this.game.bestScore < this.game.currentScore) {
      this.game.newHighScoreReached = true;
    }

    // check if it's the best score
    this.game.bestScore = Math.max(this.game.bestScore, this.game.currentScore);
  }

  changeState() {
    this.fruitNumber = Math.floor(
      Math.random() *
        (this.customer.includes('Gamtos Ateitis')
          ? 23
          : this.customer === 'Pieno Žvaigždės'
          ? 14
          : this.customer === 'Akropolis'
          ? 10
          : this.customer === 'Daumantu' || this.customer === 'Zemaitijos Pienas'
          ? 13
          : this.customer === 'Toni'
          ? 10
          : 5),
    );

    this.fruitSpeed = Math.floor(
      (Math.random() * 2 +
        (this.customer === 'Pieno Žvaigždės' ||
        this.customer === 'Akropolis' ||
        this.customer === 'Daumantu' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Toni'
          ? 2.5
          : 1)) *
        (1 + Math.floor(this.game.currentScore / 500) * 0.1),
    );

    this.x = Math.random() * (this.canvas.width - this.fruitWidth);
    this.y = Math.random() * -this.canvas.height - this.fruitHeight;
    this.chooseFruit();
  }

  render() {
    this.context.drawImage(this.fruitImage, this.x, this.y, this.fruitWidth, this.fruitHeight);
  }
}

export default () => {
  new CatchGame();
};
