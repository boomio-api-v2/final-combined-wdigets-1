import { localStorageService, widgetHtmlService } from '@/services';
import startGame from './js/index.js';
import {
  intro,
  tapImageBarbora,
  stopwatch,
  star,
  newRecord,
  newRecordEE,
  newRecordLV,
  close,
  BarboraIntro,
  IkeaIntro,
  UnisendIntroLV,
  UnisendIntroEE,
  newRecordIkea,
  piguDriveEEEn,
  piguDriveEERu,
  piguDriveEE,
  piguDriveFIEn,
  piguDriveFIRu,
  piguDriveFI,
  piguDriveLTEn,
  piguDriveLTRu,
  piguDriveLT,
  piguDriveLVEn,
  piguDriveLVRu,
  piguDriveLV,
  newRecordEn,
  newRecordFI,
  newRecordRU,
  life,
  introGlass,
  introPaper,
  introPlastic,
  introOrlen,
} from './js/constants';
import './index.css';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { DownloadScoreTableContainer } from '../helpers/DownloadScoreTableContainer';
import { RulesContainerPigu } from '../helpers/RulesContainerPigu';
import { CompetitionCodeScoreTableContainerPigu } from '../helpers/CompetitionCodeScoreTableContainerPigu';
import { RulesContainer } from '../helpers/RulesContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { CompetitionCodeScoreTableContainer } from '../helpers/CompetitionCodeScoreTableContainer';
import { CompetitionCodeScoreTableLastContainerPigu } from '../helpers/CompetitionCodeScoreTableLastContainerPigu';

class driveWidget {
  static ctx;

  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Novaturas';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';

    this.scoreTable = {};
    this.scoreTableContainerInstance;
    const currentPageUrl = window.location.href;

    const urlParams = new URL(currentPageUrl).searchParams;
    const languageParam = urlParams.get('language');
    this.language = this.customer === 'Pigu.lt' ? languageParam : this.config.language ?? 'ES';
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;

    this.createContainer();
    document.querySelector('.game-container').style.backgroundColor =
      window.innerWidth <= 768 ? 'black' : 'none';
  }

  createContainer = () => {
    const blurImage = new Image();
    blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';
    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';
    const randomType = () => {
      const types = [1, 2, 3];
      return types[Math.floor(Math.random() * types.length)];
    };

    this.type = randomType();
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-drive-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `
    <div class="game-container" id="game-container">


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
    }  alt="Image Description" style="width: 100%; height: 100%;">
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
    ${`<div style="gap:20px;display:flex;color: #FFF;text-shadow: 4px 4px 14px rgba(255, 255, 255, 0.41);font-family:${
      this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
    };font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: ${
      this.customer === 'Ikea' ? 'none' : 'uppercase'
    };">
        <div>${
          this.language === 'FI'
            ? 'PYYHKÄISE'
            : this.language === 'ET'
            ? 'LIBISTA'
            : this.language === 'RU'
            ? 'ПРОВЕДИ '
            : this.language === 'LV'
            ? 'kustēties'
            : this.language === 'ET'
            ? 'LIIGU'
            : 'Brūkšt'
        }</div>
        <div>${
          this.language === 'FI'
            ? 'PYYHKÄISE'
            : this.language === 'ET'
            ? 'LIBISTA'
            : this.language === 'RU'
            ? 'ПРОВЕДИ '
            : this.language === 'LV'
            ? 'kustēties'
            : this.language === 'ET'
            ? 'LIIGU'
            : 'Brūkšt'
        }</div>
      </div><img src=${tapImageBarbora} alt="Image Description" style="width: 93px; height: 89px;">`}
      </div>
    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
      this.customer === 'Barbora'
        ? '#CC0001'
        : this.customer === 'Ikea'
        ? '#0058A3'
        : this.customer === 'Unisend'
        ? '#376728'
        : this.customer === 'Pigu.lt'
        ? '#DF503E'
        : this.customer === 'Gamtos Ateitis'
        ? '#3F7543'
        : this.customer === 'Orlen'
        ? '#EF1C1D'
        : '#FFE92D'
    };border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${
    this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
  }; font-weight: 900; word-wrap: break-word;position:absolute;left:25px;top:17px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>





${
  this.customer === 'Pigu.lt' || this.customer === 'Gamtos Ateitis' || this.customer === 'Orlen'
    ? `<div class="boomio-life-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
        this.customer === 'Gamtos Ateitis'
          ? '#3F7543'
          : this.customer === 'Orlen'
          ? '#EF1C1D'
          : '#DF503E'
      };border-radius:35px">
<div style="width: 148px;top:-15px;height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${life} alt="Image Description" style="margin-left:-10px;width: 50px; height: 50px;margin-top:15px"></img>

<div style="text-align: center; color: white; font-size: 16px; font-family:${'Georama'} ;font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:17px;z-index:3;line-height:30px;" id="currentLife"></div>
</div>
</div>`
    : `<div class="boomio-time-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
        this.customer === 'Barbora'
          ? '#CC0001'
          : this.customer === 'Ikea'
          ? '#0058A3'
          : this.customer === 'Unisend'
          ? '#376728'
          : this.customer === 'Pigu.lt'
          ? '#DF503E'
          : this.customer === 'Gamtos Ateitis'
          ? '#3F7543'
          : this.customer === 'Orlen'
          ? '#EF1C1D'
          : '#FFE92D'
      };border-radius:35px">
<div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${stopwatch} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

<div style="text-align: center; color: white; font-size: 20px; font-family:${
        this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
      } ;font-weight: 900; word-wrap: break-word;position:absolute;left:28px;top:17px;z-index:3;line-height:30px;" id="currentTime"></div>
</div>
</div>`
}



    <img src=${
      this.language === 'ET' &&
      (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
        ? piguDriveEE
        : this.language === 'RU' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? piguDriveEERu
        : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
        ? piguDriveLT
        : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
        ? piguDriveLTRu
        : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? piguDriveFI
        : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
        ? piguDriveLTEn
        : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? piguDriveFIEn
        : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
        ? piguDriveLV
        : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
        ? piguDriveLVRu
        : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
        ? piguDriveLVEn
        : this.language === 'EN' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? piguDriveEEEn
        : this.customer === 'Barbora'
        ? BarboraIntro
        : this.customer === 'Unisend' && this.language === 'ET'
        ? UnisendIntroEE
        : this.customer === 'Unisend' && this.language === 'LV'
        ? UnisendIntroLV
        : this.customer === 'Ikea'
        ? IkeaIntro
        : this.customer === 'LemonGym'
        ? intro
        : this.customer === 'Orlen'
        ? introOrlen
        : this.type === 1
        ? introPaper
        : this.type === 2
        ? introGlass
        : this.type === 3
        ? introPlastic
        : ''
    } alt="Image Description" style="z-index:4;width:${
      document.documentElement.clientWidth < 418
        ? document.documentElement.clientWidth + 'px'
        : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:block;" id="background_intro">
    <img src=${blurImage.src} alt="Image Description" style="z-index:3;width: ${
      document.documentElement.clientWidth < 418
        ? document.documentElement.clientWidth + 'px'
        : '418px'
    }; height: 668px;position:absolute;opacity:0.37;pointer-events: none; display:block;" id="background_blur">

    ${
      this.showCompetitiveRegistration
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    }

    <div class="close-game-container" id="close-game-container" style="top:calc(50% - 290px);display:${
      this.customer === 'Pigu.lt' ? 'none' : 'block'
    };width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>
    ${
      new InputContainer(this.customer, 'drive').createInputContainerDiv('drive', this.type)
        .outerHTML
    }

      <canvas id="boomio-drive-canvas" class="boomio-drive-canvas" style="${
        document.documentElement.clientWidth < 418
          ? document.documentElement.clientWidth + 'px'
          : '418px'
      }">
      </canvas>
    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration === 'competition') {
      const gameContainer = document.querySelector('.game-container');
      if (this.customer === 'Pigu.lt') {
        this.scoreTableContainerInstance = new CompetitionCodeScoreTableLastContainerPigu(
          this.customer,
          this.scoreTable,
          this.currentScore,
        );
      } else {
        this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
          this.customer,
          this.scoreTable,
        );
      }
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.competitionCodeScoreTableContainerPigu = new CompetitionCodeScoreTableContainerPigu(
        this.customer,
        this.scoreTable,
      );
      gameContainer.appendChild(this.competitionCodeScoreTableContainerPigu.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.rulesContainer = new RulesContainer(this.customer, this.scoreTable);
      gameContainer.appendChild(this.rulesContainer.containerDiv);
    }
    if (this.customer === 'Pigu.lt' || this.customer === 'Gamtos Ateitis') {
      const gameContainer = document.querySelector('.game-container');

      this.didYouKnowContainer = new DidYouKnowContainer(this.customer, this.type);
      gameContainer.appendChild(this.didYouKnowContainer.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.rulesContainerPigu = new RulesContainerPigu(this.customer, this.scoreTable);
      gameContainer.appendChild(this.rulesContainerPigu.containerDiv);
    }
    if (this.showCompetitiveRegistration === 'points') {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new DownloadScoreTableContainer(
        this.customer,
        this.scoreTable,
        this.currentScore,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }
    // if (this.showCompetitiveRegistration === 'collectable') {
    //   const gameContainer = document.querySelector('.game-container');
    //   this.scoreTableContainerInstance = new CollectionScoreTableContainer(
    //     this.customer,
    //     this.collectables,
    //     this.collection,
    //     this.just_won,
    //   );
    //   gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    // }
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
    startGame(
      this.scoreTableContainerInstance,
      this.didYouKnowContainer,
      this.competitionCodeScoreTableContainerPigu,
      this.type,
    );
  };
}

export default () => {
  new driveWidget();
};
