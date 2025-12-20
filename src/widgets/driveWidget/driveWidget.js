import { localStorageService, widgetHtmlService } from '@/services';
import { t } from '@/services/translations';
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
  piguDriveEEEn,
  piguDriveEERu,
  piguDriveEE,
  piguDriveFIEn,
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
  newRecordEs,
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
import { CompetitionCodeScoreTableContainer } from '../helpers/CompetitionCodeScoreTableContainer';
import { CompetitionCodeScoreTableLastContainerPigu } from '../helpers/CompetitionCodeScoreTableLastContainerPigu';
import { DownloadScoreTableContainer } from '../helpers/DownloadScoreTableContainer';
import { RulesContainerPigu } from '../helpers/RulesContainerPigu';
import { CompetitionCodeScoreTableContainerPigu } from '../helpers/CompetitionCodeScoreTableContainerPigu';
import { QRDiscountScoreTableContainer } from '../helpers/QRDiscountScoreTableContainer';
import { RulesContainer } from '../helpers/RulesContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { getBrandColor, isLifeCustomer } from './utils';

// Helper function to get intro image based on customer, language, campaign URL, and type
const getIntroImage = (customer, language, campaignUrl) => {
  // Pigu.lt multi-language logic
  if (campaignUrl === 'https://kaup.ee' || campaignUrl === 'https://kaup24.ee') {
    if (language === 'ET') return piguDriveEE;
    if (language === 'RU') return piguDriveEERu;
    if (language === 'EN') return piguDriveEEEn;
  }

  if (campaignUrl === 'https://pigu.lt') {
    if (language === 'LT') return piguDriveLT;
    if (language === 'RU') return piguDriveLTRu;
    if (language === 'EN') return piguDriveLTEn;
  }

  if (campaignUrl === 'https://hobbyhall.fi') {
    if (language === 'FI') return piguDriveFI;
    if (language === 'EN') return piguDriveFIEn;
  }

  if (campaignUrl === 'https://220.lv') {
    if (language === 'LV') return piguDriveLV;
    if (language === 'RU') return piguDriveLVRu;
    if (language === 'EN') return piguDriveLVEn;
  }

  // Customer-specific logic
  if (customer === 'Barbora') return BarboraIntro;
  if (customer === 'Ikea') return IkeaIntro;

  if (customer === 'Unisend') {
    if (language === 'ET') return UnisendIntroEE;
    if (language === 'LV') return UnisendIntroLV;
  }

  if (customer === 'LemonGym') return intro;
  if (customer === 'Orlen') return introOrlen;

  if (customer === 'Gamtos Ateitis Paper') return introPaper;
  if (customer === 'Gamtos Ateitis Glass') return introGlass;
  if (customer === 'Gamtos Ateitis Plastic') return introPlastic;

  return ''; // Default empty
};

class driveWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name;
    this.language = this.config.language;
    this.campaignUrlOrCurrentPage = this.config.campaignUrlOrCurrentPage;
    this.showCompetitiveRegistration = this?.config?.game_type !== '' ? this.config.game_type : 'competition';

    this.scoreTable = {};
    this.scoreTableContainerInstance;

    this.createContainer();
    document.querySelector('.game-container').style.backgroundColor = window.innerWidth <= 768 ? 'black' : 'none';
  }

  createContainer = () => {
    const blurImage = new Image();
    blurImage.src = 'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/main/images/common/ui/Blur-game-rules.png';
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/main/images/common/effects/New-demo-best-score.gif';

    const randomType = () => {
      const types = [1, 2, 3];
      return types[Math.floor(Math.random() * types.length)];
    };

    this.type = randomType();
    const introImage = getIntroImage(this.customer, this.language, this.campaignUrlOrCurrentPage);
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-drive-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');

    myCanvas.innerHTML = `
    <div class="game-container" id="game-container">


    <img class="new_highscore_stars" src=${
      newHighscoreStarsImage.src
    } alt="Image Description" style="width:auto;overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
    </img>
    <div class="new_highscore"><img src=${
      this.language === 'EN'
        ? newRecordEn
        : this.language === 'LV'
          ? newRecordLV
          : this.language === 'ET'
            ? newRecordEE
            : this.language === 'FI'
              ? newRecordFI
              : this.language === 'RU'
                ? newRecordRU
                : this.language === 'ES'
                  ? newRecordEs
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
    };font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: ${this.customer === 'Ikea' ? 'none' : 'uppercase'};">
        <div>${t('controlDriveSwipeLeft', this.language)}</div>
        <div>${t('controlDriveSwipeRight', this.language)}</div>
      </div><img src=${tapImageBarbora} alt="Image Description" style="width: 93px; height: 89px;">`}
      </div>
    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${getBrandColor(
      this.customer,
    )};border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${
    this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
  }; font-weight: 900; word-wrap: break-word;position:absolute;left:25px;top:17px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>



${
  isLifeCustomer(this.customer)
    ? `<div class="boomio-life-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${getBrandColor(
        this.customer,
      )};border-radius:35px">
<div style="width: 148px;top:-15px;height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${life} alt="Life image" style="margin-left:-10px;width: 50px; height: 50px;margin-top:15px"></img>

<div style="text-align: center; color: white; font-size: 16px; font-family:${'Georama'} ;font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:17px;z-index:3;line-height:30px;" id="currentLife"></div>
</div>
</div>`
    : `<div class="boomio-time-input-container" style="box-sizing:border-box;display:none;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${getBrandColor(
        this.customer,
      )};border-radius:35px">
<div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${stopwatch} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

<div style="text-align: center; color: white; font-size: 20px; font-family:${
        this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
      } ;font-weight: 900; word-wrap: break-word;position:absolute;left:28px;top:17px;z-index:3;line-height:30px;" id="currentTime"></div>
</div>
</div>`
}



    <img ${introImage ? `src="${introImage}"` : ''} alt="Intro image" style="z-index:4;width:${
      document.documentElement.clientWidth < 418 ? document.documentElement.clientWidth + 'px' : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:${introImage ? 'block' : 'none'};" id="background_intro">
    <img src=${blurImage.src} alt="Blur Image" style="z-index:3;width: ${
      document.documentElement.clientWidth < 418 ? document.documentElement.clientWidth + 'px' : '418px'
    }; height: 668px;position:absolute;opacity:0.37;pointer-events: none; display:block;" id="background_blur">

    ${this.showCompetitiveRegistration ? new InputRegisterContainer().createInputRegisterContainer().outerHTML : ''}

    <div class="close-game-container" id="close-game-container" style="top:calc(50% - 290px);display:${this.customer === 'Pigu.lt' ? 'none' : 'block'};width:32px;height:32px;">
<img src=${close} alt="Close image" style="width: 100%; height: 100%;"></img>
</div>
    ${new InputContainer().createInputContainerDiv().outerHTML}

      <canvas id="boomio-drive-canvas" class="boomio-drive-canvas" style="${document.documentElement.clientWidth < 418 ? document.documentElement.clientWidth + 'px' : '418px'}">
      </canvas>
    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration === 'competition') {
      const gameContainer = document.querySelector('.game-container');
      if (this.customer === 'Pigu.lt') {
        this.scoreTableContainerInstance = new CompetitionCodeScoreTableLastContainerPigu(this.customer, this.scoreTable, this.currentScore);
      } else if (this.customer === 'Toni') {
        this.scoreTableContainerInstance = new CompetitionCodeScoreTableContainer(this.customer, this.scoreTable);
      } else if (this.customer === 'KakeMake') {
        this.scoreTableContainerInstance = new QRDiscountScoreTableContainer(this.customer, this.scoreTable);
      } else {
        this.scoreTableContainerInstance = new CompetitionScoreTableContainer(this.customer, this.scoreTable);
      }
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.competitionCodeScoreTableContainerPigu = new CompetitionCodeScoreTableContainerPigu(this.customer, this.scoreTable);
      gameContainer.appendChild(this.competitionCodeScoreTableContainerPigu.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.rulesContainer = new RulesContainer(this.customer, this.scoreTable);
      gameContainer.appendChild(this.rulesContainer.containerDiv);
    }

    const gameContainer = document.querySelector('.game-container');
    this.didYouKnowContainer = new DidYouKnowContainer();
    gameContainer.appendChild(this.didYouKnowContainer.containerDiv);

    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.rulesContainerPigu = new RulesContainerPigu(this.customer, this.scoreTable);
      gameContainer.appendChild(this.rulesContainerPigu.containerDiv);
    }
    if (this.showCompetitiveRegistration === 'points') {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new DownloadScoreTableContainer(this.customer, this.scoreTable, this.currentScore);
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
    startGame(this.scoreTableContainerInstance, this.didYouKnowContainer, this.competitionCodeScoreTableContainerPigu, this.type);
  };
}

export default () => {
  new driveWidget();
};
