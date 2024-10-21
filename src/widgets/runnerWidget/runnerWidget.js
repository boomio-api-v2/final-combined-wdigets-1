import {
  close,
  background,
  newRecord,
  intro,
  star,
  life,
  controllRight,
  Controlls,
  introGamtosAteitis,
  backgroundGamtosAteitis,
  introGamtosAteitisPaper,
  backgroundGamtosAteitisPaper,
  introGamtosAteitisGlass,
  backgroundGamtosAteitisGlass,
  backgroundPienoZvaigzdes,
  introPegasas,
  backgroundPegasas,
} from './constants';
import './runnerStyles.css';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { widgetHtmlService, localStorageService } from '@/services';

class RunnerWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Pegasas';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.language = this.config.language ? this.config.language : '';
    this.gameCount = 0;
    this.didYouKnow = true;
    this.checkboxChange = false;
    this.checkboxChange2 = false;
    this.gameStarted = false;
    this.currentScore = 0;
    this.movement = { left: false, right: false }; // To track current movement state
    this.touchMoveActive = false; // To track touch hold state for mobile
    this.scoreTable = {};
    this.scoreTableContainerInstance;
    this.createContainer();
    document.querySelector('.game-container').style.backgroundColor =
      window.innerWidth <= 768 ? 'black' : 'none';

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
        : background
    }) center`;

    this.timer = null;
    this.highscore = 0;
    this.fruits = [];
    this.numberOfFruits = 8;
    this.smashCounter = 0;
    this.catchSoundCounter = 0;
    this.animationFrame = null;
    this.defaultscore = this.customer === 'Eurovaistine' || this.customer === 'Pegasas' ? 3 : 5;
    this.createContainer();
  }

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
        <div>${this.language == 'LT' ? 'BRŪKŠT' : 'KLIK'}</div>
        <div>${this.language == 'LT' ? 'BRŪKŠT' : 'KLIK'}</div>
      </div><img src=${Controlls} alt="Image Description" style="width: 110px; height: 50px;">`}
      </div>
       ${
         window.innerWidth <= 768
           ? `
      <img src=${controllLeft} alt="Image Description" style="width: 40px; height: 40px;top:calc(50% + 200px);position:absolute;left:calc(50% - 150px);" id="controllLeft">
      <img src=${controllRight} alt="Image Description" style="width: 40px; height: 40px;top:calc(50% + 200px);position:absolute;left:calc(50% + 120px);" id="controllRight">`
           : ''
       }
    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
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
        : intro
    } alt="Image Description" style="z-index:4;width:${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:block;" id="background_intro">
    <img src=${blurImage.src} alt="Image Description" style="z-index:3;width: ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 668px;position:absolute;opacity:0.37;pointer-events: none; display:block;" id="background_blur">

    ${
      this.showCompetitiveRegistration
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    }

    <div class="close-game-container" id="close-game-container" style="top:calc(50% - 280px);display:block;width:25px;height:25px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>
    ${new InputContainer(this.customer, 'drive').createInputContainerDiv().outerHTML}

        <canvas id="boomio-catch-canvas" width=${
          document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
        }; height="668px"></canvas>
      </div>
    `;
    widgetHtmlService.container.appendChild(gameContainer);
  }
}

export default () => {
  new RunnerWidget();
};
