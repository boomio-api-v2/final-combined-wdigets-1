import {
  widgetHtmlService,
  AnimationService,
  QrCodeModal,
  localStorageService,
  boomioService,
} from '@/services';
import './styles.css';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { PointScoreTableContainer } from '../helpers/PointScoreTableContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CollectionScoreTableContainer } from '../helpers/CollectionScoreTableContainer';
import { PointCopyTableContainer } from '../helpers/PointCopyTableContainer';

import {
  close,
  introGif,
  scoreImage,
  tapImageBarbora,
  checkIcon,
  uncheckIcon,
  mainBarbora,
  mainPenki,
  introGifPenki,
  scoreImageGreen,
  mainFantazijos,
  scoreImageFantazijos,
  introGifFantazijos,
  newRecord,
  newRecordRU,
  newRecordEE,
  newRecordLV,
  snowFantazijos,
  FproFlappyScore,
  FproFlappyIntro,
  FproFlappyBackground,
  MakaliusFlappyScore,
  MakaliusFlappyIntro,
  MakaliusFlappyBackground,
  introGifFantazijosLV,
  introGifFantazijosEE,
  introGifFantazijosRU,
  CorepetitusFlappyIntro,
  CorepetitusFlappyBackground,
  CorepetituslappyScore,
  newRecordEn,
} from './constants';
class FlappyBird {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.gameClosed = false;
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'points';
    this.userBestPlace = 0;
    this.scoreTable = {};
    this.isJumping = false;
    this.customer = this.config.business_name ? this.config.business_name : 'Corepetitus';
    this.language = this.config.language ? this.config.language : 'EN';

    this.collectables = this.config.collectables ? this.config.collectables : [];
    this.collection = this.config.collection ? this.config.collection : [];
    this.just_won = this.config.just_won ? this.config.just_won : null;

    if (this.customer === 'Fpro') {
      setTimeout(() => {
        this.startFlappy();
      }, 8000);
    } else {
      this.startFlappy();
    }

    this.gameStarted = false;
    this.bestScore = 0;
    this.discount = '0%';
    this.gameCount = 0;
    this.gameEnded = false;
    this.isMobile = window.innerWidth <= 768;
    this.newHighScoreReached = false;
    this.scoreTableContainerInstance;
    const params = new URLSearchParams(window.location.search);

    this.game_code = params.get('game_code');
  }

  startFlappy() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();

    this.checkboxChange = false;

    this.flappy = document.getElementById('boomio-flappy-container');

    document.querySelector('.game-container').style.backgroundColor =
      window.innerWidth <= 768 ? 'black' : 'none';

    const screenWidth = window.innerWidth;

    const initialPosx =
      screenWidth / 2 - (window.matchMedia('(min-width: 450px)').matches ? 25 : -25);

    this.animation = new AnimationService({
      elem: this.flappy,
      posx: 0,
      posy: 0,
    });

    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src =
      this.customer === 'Barbora'
        ? mainBarbora
        : this.customer === 'Fantazijos'
        ? mainFantazijos
        : this.customer === 'Fpro'
        ? FproFlappyBackground
        : this.customer === 'Makalius'
        ? MakaliusFlappyBackground
        : this.customer === 'Corepetitus'
        ? CorepetitusFlappyBackground
        : mainPenki;

    // img.src = 'https://i.ibb.co/MP91zG9/Spring-2.png';

    const img2 = new Image();
    img2.src = 'https://i.ibb.co/SrtXMFx/Boomio-demo-penguin.png';

    const img3 = new Image();
    img3.src = 'https://i.ibb.co/xq7Yf83/Boomio-demo-3-1.png';

    const snowImg = new Image();
    snowImg.src = snowFantazijos;

    let snowOffset = 0; // Initial offset for snow GIF animation
    let snowSpeed = 0.4; // Adjust the this.speed of the falling snow
    this.speed = 4;
    this.gamePlaying = false;
    this.index = 0;

    this.gravity = 0.12;

    const size = [70, 70];
    this.jump = -3;
    const cTenth = canvas.width / 10;
    this.flight = 0;
    this.currentScore = 0;
    let flyHeight = 0,
      pipes;

    const pipeWidth = 78;
    let pipeGap = 250;
    const pipeLoc = () =>
      Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) + pipeWidth;

    const setup = () => {
      snowSpeed = 0.4;
      pipeGap = 250;
      this.speed = 4;
      this.jump = -6;
      this.gravity = 0.3;
      this.flight = this.jump / 2;

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
        document.getElementById('flappy-canvas').style.transition = 'opacity 1s ease';
        document.getElementById('flappy-canvas').style.opacity = 1;

        if (this.gameCount === 0) {
          if (
            this.showCompetitiveRegistration === 'competition' ||
            this.showCompetitiveRegistration === 'points' ||
            this.showCompetitiveRegistration === 'collectable'
          ) {
            const checkboxImg = document.querySelector('.boomio-privacyCheckbox');
            checkboxImg.addEventListener('click', () => {
              this.checkboxChange = !this.checkboxChange;
              const checkboxImgChange = document.getElementById('privacyCheckboxImg');
              checkboxImgChange.src = this.checkboxChange ? checkIcon : uncheckIcon;
            });
            setTimeout(() => {
              const canvas = document.getElementById('flappy-canvas');
              document.getElementById('background_blur').style.opacity = 0.37;
              canvas.style.transition = 'filter 0.6s ease';
              canvas.style.filter = 'blur(2px)';

              const inpuRegisterContainer = document.querySelector('.input-register-container');
              inpuRegisterContainer.style.transition =
                'height 1s ease, top 1s ease, opacity 1s ease';
              inpuRegisterContainer.style.display = 'block';
              setTimeout(() => {
                inpuRegisterContainer.style.height = '528px';
                inpuRegisterContainer.style.top = 'calc(50% + 74px)';
                inpuRegisterContainer.style.opacity = 1;
              }, 100);
            }, 300);
          } else {
            setTimeout(() => {
              const canvas = document.getElementById('flappy-canvas');
              document.getElementById('background_blur').style.opacity = 0.37;
              canvas.style.transition = 'filter 0.6s ease';
              canvas.style.filter = 'blur(2px)';
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
            document.getElementById('background_blur').style.opacity = 0.37;

            canvas.style.transition = 'filter 0.6s ease';
            canvas.style.filter = 'blur(2px)';
          }, 1000);
        }
        setTimeout(() => {
          const background = document.getElementById('background_intro');

          if (background) {
            background.style.display = 'none';
          }
        }, 2000);
      }, 3000);
      //gifas
      // flyHeight = canvas.height / 2 - size[1] / 2;
      pipes = [[canvas.width, pipeLoc()]];
      for (let i = 1; i < 3; i++) {
        pipes.push([pipes[i - 1][0] + pipeGap + pipeWidth, pipeLoc()]);
      }
    };

    let lastUpdateTime = Date.now();
    let elapsedTime = 0;

    createContainer = () => {
      const starImg = new Image();
      starImg.src = 'https://i.ibb.co/mBmxsKP/Group-1000001725.png';

      const clickImg = new Image();
      clickImg.src = 'https://i.ibb.co/LvmQXcC/BOOMIO-TAP-ELEMENT.gif';

      const btnImg = new Image();
      btnImg.src = 'https://i.ibb.co/d74HGX8/Button-Yellow-2.png';

      const gameOver = new Image();
      gameOver.src = 'https://i.ibb.co/kGkXBHq/Game-over-2.png';

      const playAgain = new Image();
      playAgain.src = 'https://i.ibb.co/0Bqvttk/PLAY-AGAIN.png';

      const okImage = new Image();
      okImage.src = 'https://i.ibb.co/nL70YWF/OK.png';

      const rulesImage = new Image();
      rulesImage.src = 'https://i.ibb.co/sK74MHP/Rules-1.png';

      const rulesImage2 = new Image();
      rulesImage2.src = 'https://gcdnb.pbrd.co/images/1bsvDYHu5MDP.png';

      const blurImage = new Image();
      blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';

      const useCuponImage = new Image();
      useCuponImage.src = 'https://i.ibb.co/dGnFRp1/Button-use-it.png';

      const newHighscoreStarsImage = new Image();
      newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';

      const endingBackground = new Image();
      endingBackground.src = 'https://i.ibb.co/5rS0VM9/COUPON-5.png';

      const snowImgEnd = new Image();
      snowImgEnd.src = 'https://i.giphy.com/media/ggK4TpfK2cfuZcokhj/giphy.webp';

      const myCanvas = document.createElement('div');
      myCanvas.setAttribute('id', 'boomio-flappy-container');
      myCanvas.classList.add(
        'boomio--animation__wrapper',
        'boomio--animation__wrapper--initial',
        'box',
      );

      myCanvas.innerHTML = `    
    <div class="game-container game-container-flappy">

    ${
      this.showCompetitiveRegistration === 'competition' ||
      this.showCompetitiveRegistration === 'points' ||
      this.showCompetitiveRegistration === 'collectable'
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    } 

    <img src=${
      endingBackground.src
    } alt="Image Description" style="z-index:1;width: 418px; height: 668px;position:absolute;opacity:0; pointer-events: none; display:none;" id="ending_background">
    </img>
    <img src=${blurImage.src} alt="Image Description" style="z-index:1;width: ${
        document.body.offsetWidth < 418
          ? document.body.offsetWidth < 321
            ? '375px'
            : document.body.offsetWidth + 'px'
          : '418px'
      };
       height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;" id="background_blur">
    </img>
          <img  style="z-index:1;width: ${
            document.body.offsetWidth < 418
              ? document.body.offsetWidth < 321
                ? '375px'
                : document.body.offsetWidth + 'px'
              : '418px'
          }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;" id="snow_background_qr">
    </img>
    <img src=${
      this.customer === 'Barbora'
        ? introGif
        : this.customer === 'Fantazijos'
        ? this.language === 'LV'
          ? introGifFantazijosLV
          : this.language === 'RU'
          ? introGifFantazijosRU
          : this.language === 'EE'
          ? introGifFantazijosEE
          : introGifFantazijos
        : this.customer === 'Fpro'
        ? FproFlappyIntro
        : this.customer === 'Makalius'
        ? MakaliusFlappyIntro
        : this.customer === 'Corepetitus'
        ? CorepetitusFlappyIntro
        : introGifPenki
    } alt="Image Description" style="z-index:4;width: ${
        document.body.offsetWidth < 418
          ? document.body.offsetWidth < 321
            ? '375px'
            : document.body.offsetWidth + 'px'
          : '418px'
      }; height: 668px;position:absolute;pointer-events: none; display:block;" id="background_intro">
    </img>
    <a href="https://www.boomio.com/" style="position:absolute;margin-top:380px;margin-left:-340px">
    <img src="${
      useCuponImage.src
    }" alt="Image Description" style="z-index:4;width: 335px;max-width:335px; height: 86px; position:absolute; display:none; " id="useCuponImage">
  </a>

    <img class="new_highscore_stars" src=${
      newHighscoreStarsImage.src
    } alt="Image Description" style="overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
    </img>
    <div class="new_highscore"><img src=${
      this.customer === 'Fpro'
        ? newRecordEn
        : this.language === 'EE'
        ? newRecordEE
        : this.language === 'LV'
        ? newRecordLV
        : this.language === 'RU'
        ? newRecordRU
        : newRecord
    } alt="Image Description" style="width: 100%; height: 100%;">
    </div>
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
</div>

<div style="left:calc(50% - ${
        this.customer === 'Fpro' ? '70px' : '100px'
      });position: absolute;z-index:999;pointer-events:none" class="tutorial">
${`<div style="${
  this.customer === 'Fpro' ? 'gap:50px' : 'gap:20px'
};display:flex;color: #FFF;text-shadow: 4px 4px 14px rgba(255, 255, 255, 0.41);font-family: Georama;font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: uppercase;">
    <div>${
      this.language === 'LV'
        ? 'KLIK'
        : this.language === 'RU'
        ? 'КЛИК'
        : this.language === 'EE'
        ? 'TAP'
        : this.customer === 'Fpro'
        ? 'TAP'
        : 'BAKST'
    }</div>
    <div>${
      this.language === 'LV'
        ? 'KLIK'
        : this.language === 'RU'
        ? 'КЛИК'
        : this.language === 'EE'
        ? 'TAP'
        : this.customer === 'Fpro'
        ? 'TAP'
        : 'BAKST'
    }</div>
  </div><img src=${tapImageBarbora} alt="Image Description" style="margin-left:50px;width: 71px; height: 54px;">`}

</div>
      <div class="flappy-container">
        <div class="boomio-score-input-container" style="display:none;width:188px;height">
        <div style="width: 148px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
      <img src=${
        this.customer === 'Barbora'
          ? scoreImage
          : this.customer === 'Fantazijos'
          ? scoreImageFantazijos
          : this.customer === 'Corepetitus'
          ? CorepetituslappyScore
          : this.customer === 'Fpro'
          ? FproFlappyScore
          : this.customer === 'Makalius'
          ? MakaliusFlappyScore
          : scoreImageGreen
      } alt="Image Description" style="width: 100%; height: 100%;"></img>
      <div style="text-align: center; color: white; font-size: 20px; font-family: Poppins; font-weight: 900; word-wrap: break-word;position:absolute;left:70px;top:10px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>

<div class="close-game-container" id="close-game-container" style="display:block;width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>


${new InputContainer(this.customer).createInputContainerDiv().outerHTML}




     
        <div style="margin-top:255px; z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:${
          document.body.offsetWidth < 418
            ? document.body.offsetWidth < 321
              ? '375px'
              : document.body.offsetWidth + 'px'
            : '418px'
        };display:none;" class="control-button" id="control-button">
        <div id="startButtonClick" style="margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-left: 127px; padding-right: 127px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word"><img src=${
          okImage.src
        } alt="Image Description"></div>
</div>
</div>
<div class="input-container1" style="width:${
        document.body.offsetWidth < 418
          ? document.body.offsetWidth < 321
            ? '375px'
            : document.body.offsetWidth + 'px'
          : '418px'
      }">
<div style="height: 100%; position: relative;  background: linear-gradient(166deg, rgba(220, 35, 110, 0.90) 9.98%, rgba(91, 104, 185, 0.90) 83.11%); border-top-left-radius: 30px; border-top-right-radius: 30px; backdrop-filter: blur(10px)">
  <div style="width: 100%; height: 63px; top: 25px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Georama; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">  <img src=${
    gameOver.src
  } alt="Image Description"></div>
  <div class="boomio-colored_box" style="width:calc(100% - 40px);"></div>
  <div style="width: 142px; left: 46px; top: 116px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:start;">TOTAL SCORE</div>
  <div style="left: 240px; top: 116px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;" id="bestScoreField"></div>
  <div style="width: 142px; left: 46px; top: 150px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:start;">BEST SCORE</div>
  <div style="left: 240px; top: 150px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;line-height:28px;" id="currentScoreField"></div>
  <div style="left: 46px; top: 185px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:start;">YOUR DISCOUNT REWARD</div>
  <div style="left: 240px; top: 185px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;" id="bestScoreFieldConverted"></div>
  <div id="startButtonClick1" style="border:2px solid white;line-height:24px;box-sizing:content-box;width: 127px; padding-left: 25px; padding-right: 25px; padding-top: 11px; padding-bottom: 11px; left: 27px; top: 255px; position: absolute; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
      <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word"><img src=${
        playAgain.src
      } alt="Image Description"></div>
  </div>



</div>
        </div>
        <div style="justify-content: center; align-items: center; gap: 24px;width:${
          document.body.offsetWidth < 418
            ? document.body.offsetWidth < 321
              ? '375px'
              : document.body.offsetWidth + 'px'
            : '418px'
        };" class="control-button1">
        <div  style="margin-left: 46px; margin-right: 46px; padding-top: 14px; padding-bottom: 14px; width:100%;background: linear-gradient(166deg, rgba(220, 35, 110, 0.90) 9.98%, rgba(91, 104, 185, 0.90) 83.11%); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 32px; border: 2px rgba(255, 255, 255, 0.20) solid; justify-content: center; align-items: center; gap: 8px; display: flex;">
<div style="color: white; font-size: 25px; font-family: Poppins; font-weight: 900; line-height: 24px; letter-spacing: 0.25px; word-wrap: break-word;" id="startButton">Play</div>
</div>
</div>
      </div>
      <canvas id="flappy-canvas" width=${
        document.body.offsetWidth < 418
          ? document.body.offsetWidth < 321
            ? '375px'
            : document.body.offsetWidth + 'px'
          : '418px'
      } height="668" class="flappy-game"></canvas>
    </div>
  `;

      widgetHtmlService.container.appendChild(myCanvas);

      if (this.showCompetitiveRegistration === 'competition') {
        const gameContainer = document.querySelector('.game-container-flappy');

        this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
          this.customer,
          this.scoreTable,
        );
        gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
      }

      if (this.showCompetitiveRegistration === 'points') {
        if (this.customer === 'Corepetitus') {
          const gameContainer = document.querySelector('.game-container');

          this.scoreTableContainerInstance = new PointCopyTableContainer(
            this.customer,
            this.scoreTable,
            this.currentScore,
          );
          gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
        } else {
          const gameContainer = document.querySelector('.game-container-flappy');

          this.scoreTableContainerInstance = new PointScoreTableContainer(
            this.customer,
            this.scoreTable,
            this.currentScore,
          );
          gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
        }
      }
      if (this.showCompetitiveRegistration === 'collectable') {
        const gameContainer = document.querySelector('.game-container-flappy');
        this.scoreTableContainerInstance = new CollectionScoreTableContainer(
          this.customer,
          this.collectables,
          this.collection,
          this.just_won,
        );
        gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
      }
    };
  }
}
