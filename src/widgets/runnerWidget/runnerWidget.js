import './runnerStyles.css';
import PxLoader from './scripts/PxLoader.js';
import { localStorageService, widgetHtmlService, boomioService } from '@/services';
import { Elements } from '../helpers/HtmlElementsHelper';
import {
  star,
  newRecord,
  newRecordEE,
  newRecordLV,
  newRecordIkea,
  runnerbackground,
  runnerbackgroundDentsu,
  home,
  redo,
  up,
  down,
  left,
  right,
  coin,
  add,
  prize,
  achieves,
  cart,
  play,
  boost,
  shield,
  pause,
  life,
  checkIcon,
  upDentsu,
  downDentsu,
  leftDentsu,
  rightDentsu,
  dentsuOrientation,
  uncheckIcon,
  runnerbackgroundNykstukas,
  runnerbackgroundDemo,
  close,
} from './constants';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { ShareContainer } from '../helpers/ShareContainer';

class runnerWidget {
  static ctx;

  constructor() {
    this.shareClicked = false;

    this.config = localStorageService.getDefaultConfig();
    this.checkboxChange = false;
    this.checkboxChange2 = false;
    this.checkboxChange3 = false;
    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;
    this.customer = this.config.business_name ? this.config.business_name : 'Nykstukas';
    this.showCompetitiveRegistration = this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.language = this.config.language ? this.config.language : '';
    this.scoreTable = {};
    this.scoreTableContainerInstance;

    this.createContainer();
    document.querySelector('.game-container').style.backgroundColor = window.innerWidth <= 768 ? 'black' : 'none';
  }

  createContainer = () => {
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';
    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';

    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-runner-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial', 'box');

    myCanvas.innerHTML = `
    <div class="game-container" id="game-container">
      ${`
    <div class="close-game-container" id="close-game-container" style="display:block;width:32px;height:32px;top:calc(0% + 30px);left:calc(100% - 30px);">
    <img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
    </div>`}
<div id="fullscreenButton" style="height:36px;display:none; width:200px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 5; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px;">
  <div style="margin-top:7px; text-align: center; color: rgba(61, 73, 40, 1); font-size: 22px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word; cursor:pointer;">${
    this.language ? 'Start' : 'Pradėti'
  }</div>
</div>

    <img src=''
    alt="Image Description" 
    style="z-index:4; width: 100vw; height: 100vh;position:absolute;pointer-events: none; display:none;" 
    id="background_intro">

    <img class="new_highscore_stars" src=${
      newHighscoreStarsImage.src
    } alt="Image Description" style="overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
    </img>
    <div class="new_highscore"><img src=${
      this.customer === 'Ikea' ? newRecordIkea : this.language === 'ET' ? newRecordEE : this.language === 'LV' ? newRecordLV : newRecord
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
    


 
<div class="boomio-runner-body" oncontextmenu="return false;" style="background:">
<div id="turnLandscape" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; ">
  ${this.customer === 'Nykstukas' ? 'Pasukite savo įrenginį' : 'rotate your device'}
  <img style="margin-top: 30px" id="rotateIcon" src="${dentsuOrientation}" alt="">
</div>
  <div class="boomio-runner-main">
    <div class="boomio-runner-wrapper boomio-screenRatio">
      <div class="boomio-runner-controlBlock">
        ${this.language === 'EN' ? 'Rules' : 'Taisyklės'}
        <img class='boomio-runner-controlButton' src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? upDentsu : up}" alt="">
        <div><img class='boomio-runner-controlButton' src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? leftDentsu : left}" alt="">
          <img class='boomio-runner-controlButton' src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? downDentsu : right}" alt="">
          <img class='boomio-runner-controlButton' src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? rightDentsu : down}" alt="">
        </div>
      </div>
     <canvas id="boomio-runner-canvas" class="boomio-runner-canvas" style="${document.documentElement.clientWidth < 418 ? document.documentElement.clientWidth + 'px' : '418px'}">
      </canvas>

      <img class="boomio-runner-pauseButton boomio-runner-button boomio-hide" src="${pause}" style="display:none" alt="">
    
<div class="boomio-runner-score-input-container boomio-hide" style="box-sizing:border-box;display:block;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${'#313131'};border-radius:35px">
<div style="width: 148px;top:-15px;height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${star} alt="Image Description" style="margin-right:-10px;width: 25px; height: 25px;margin-top:15px"></img>

<div style="text-align: center; color: white; font-size: 16px; font-family:${'Georama'} ;font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" class="currentScore" id="currentScore">0</div></div>
</div>


<div class="boomio-runner-life-input-container boomio-hide" style="box-sizing:border-box;display:block;width:120px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${'#313131'};border-radius:35px">
<div style="width: 148px;top:-15px;height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${life} alt="Image Description" style="margin-left:-10px;width: 50px; height: 50px;margin-top:15px"></img>

<div style="text-align: center; color: white; font-size: 16px; font-family:${'Georama'} ;font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:17px;z-index:3;line-height:30px;" id="currentLife">3/3</div></div>
</div>

    ${this.showCompetitiveRegistration ? new InputRegisterContainer(this.customer, 'runner').createInputRegisterContainer().outerHTML : ''}

    
    ${new InputContainer(this.customer, 'runner').createInputContainerDiv('runner').outerHTML}

<div class="boomio-runner-leftButtonsBlock boomio-hide">
  <img id="mobileLeftButton" class="boomio-runner-mobileControlButt" src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? leftDentsu : left}" alt="">
  <img id="mobileRightButton" class="boomio-runner-mobileControlButt" src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? rightDentsu : right}" alt="">
</div>

<div class="boomio-runner-rightButtonsBlock boomio-hide">
  <img id="mobileUpButton" class="boomio-runner-mobileControlButt" src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? upDentsu : up}" alt="">
  <img id="mobileDownButton" class="boomio-runner-mobileControlButt" src="${this.customer === 'Dentsu' || this.customer === 'Nykstukas' || this.customer === 'demo-20' ? downDentsu : down}" alt="">
</div>




    </div>
    <div class="boomio-runner-pause boomio-insideScreenRatio boomio-hide">
      PAUSED
      <div class="boomio-buttonHolder ">
        <img class='boomio-runner-replayButton1 boomio-runner-button' src="${redo}" alt="" ">
        <img class="boomio-runner-pauseButton1 boomio-runner-button" src="${play}" alt=""
          >
        <img class='boomio-runner-homeButton boomio-runner-button' src="${home}" alt=""">
      </div>
    </div>
    <div class="boomio-runner-gameOver boomio-insideScreenRatio boomio-hide">
      <div class='boomio-runner-HIandRecord'></div>
      <div class="boomio-runner-score-input-container boomio-runner-gameOverScore"></div>      
      <div class="boomio-runner-gameOverCoinsHolder">
        <div class="gameOverCoins"></div>
        <img class='boomio-runner-payForLifeImg'src="${coin}" alt="">
     </div>
      <div class="boomio-runner-saveMeHolder">
        save me!
        <div class="boomio-runner-saveMeButtonsHolder">
          <div class="boomio-runner-payForLife boomio-runner-smallBtn boomio-runner-saveBtn" onclick="boomio-runner-payForLife()">
            100
            <img class='boomio-runner-payForLifeImg'src="${coin}" alt="">
         </div>
           <img class='boomio-runner-smallBtn boomio-runner-saveBtn' src="${add}" alt=""
             onclick="showRevawardVideo(saveMe); "><br>
        </div>
        
        
      </div>
      
      <div class="boomio-buttonHolder">
        <img class='boomio-runner-homeButton1 boomio-runner-button' src="${home}" alt="">
        <img class='boomio-runner-replayButton boomio-runner-button' src="${redo}" alt="">
      </div>
    </div>
    <div class="boomio-runner-mainMenu boomio-runner-mainBg boomio-hide boomio-screenRatio">
      <div class="boomio-runner-mainMenuSide">
        <ul class="boomio-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class='boomio-runner-mainTitle'>
        </div>

        <div class="boomio-runner-mainMenuButtons">
${
  false
    ? `<div class='storeButton  boomio-runner-menuButton' >
            <img src="${cart}" alt="">
            store
          </div>
          <div class='boomio-runner-playButton  boomio-runner-menuButton' ">
            <img src="${play}" alt="">
            play
          </div>
          <div class='achivesButton  boomio-runner-menuButton' ">
            <img src="${achieves}" alt="">
            achives
          </div>`
    : ' '
}
 
        </div>
        <div class="boomio-runner-mainLeftInfo" style="display:none">
          <div class="mainLeftWrapper">
            <img id='boomio-runner-prizeImg' src="${prize}">
            <div class='HighScoreBlock boomio-runner-mainStatText'></div>
          </div>
          <div class="mainLeftWrapper">
            <img id='boomio-runner-coinImg' src="${coin}">
            <div class='mainCoinsText boomio-runner-mainStatText'></div>
          </div>
        </div>

      </div>
    </div>
    <div class="tutorial  boomio-hide"></div>
<div class="boomio-runner-achives boomio-runner-mainBg boomio-screenRatio boomio-hide" style="background-image: url('${
      this.customer === 'Dentsu' ? runnerbackgroundDentsu : this.customer === 'Nykstukas' ? runnerbackgroundNykstukas : this.customer === 'demo-20' ? runnerbackgroundDemo : runnerbackground
    }');">
      <div class="boomio-statsHolder">
        <div class="boomio-runner-stat" id="numberOfDeathsBlock"></div>
        <div class='boomio-runner-stat ' id="numberOfJumpsBlock"></div>
        <div class='boomio-runner-stat' id="numberOfSlidesBlock"></div>
      </div>
      <div class="boomio-runner-achivesHolder">
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/pioneer.png" alt="">
          <div class='boomio-achiveText'>
            <p>Pioneer</p>
            Score 100 points
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/bomb.png" alt="">
          <div class='boomio-achiveText'>
            <p>Extreme</p>
            Score 300 points
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/motorbike.png" alt="">
          <div class='boomio-achiveText'>
            <p>Racer</p>
            Score 500 points
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/trees.png" alt="">
          <div class='boomio-achiveText'>
            <p>Run forest, run</p>
            Score 750 points
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/gigachad.png" alt="">
          <div class='boomio-achiveText'>
            <p>Gigachad</p>
            Score 1000 points
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/dead cat.png" alt="">
          <div class='boomio-achiveText'>
            <p>Puss in boots</p>
            Die 8 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/guitar.png" alt="">
          <div class='boomio-achiveText'>
            <p>Smells like Nirvana</p>
            Die 27 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/earth.png" alt="">
          <div class='boomio-achiveText'>
            <p>Main question</p>
            Die 42 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/skull.png" alt="">
          <div class='boomio-achiveText'>
            <p>Memento mori</p>
            Die 100 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/bouncer.png" alt="">
          <div class='boomio-achiveText'>
            <p>Bouncer</p>
            Jump 500 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/slide.png" alt="">
          <div class='boomio-achiveText'>
            <p>On the ground</p>
            Slide under barriers 300 times
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${shield}" alt="">
          <div class='boomio-achiveText'>
            <p>S.H.I.E.L.D.</p>
            Upgrade shield to max
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${boost}" alt="">
          <div class='boomio-achiveText'>
            <p>Flash</p>
            Upgrade booster to max
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${coin}" alt="">
          <div class='boomio-achiveText'>
            <p>Uncle Pennybags</p>
            Earn 1000 coins
          </div>
        </div>
        <div class="boomio-runner-achiveBlock boomio-lock"><img class='boomio-achiveImg' src="${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/gui/success.png" alt="">
          <div class='boomio-achiveText'>
            <p>All for one</p>
            Unlock all achives
          </div>
        </div>
      </div>
      <div class="boomio-runner-return-btn-holder">
        <button class='boomio-btn boomio-runner-return-btn'>
          Return
        </button>
      </div>
    </div>
    <div class="store boomio-runner-mainBg boomio-screenRatio boomio-hide">
      <div class="boomio-runner-storeHolder">
        <div class="boomio-runner-storeBack"></div>
        <div class="boomio-runner-storeCoins">
          <div class="storeCoinsText"></div>
          <img src="${coin}" alt="">
        </div>
          <img class='boomio-runner-addBtn' src="${add}" alt=""
            onclick="showRevawardVideo(addCoins); "><br>
        <div class="boomio-runner-upgradesWrapper">
          <div class="upgrade">
            <div class="boomio-runner-shieldUpgradeHolder">
              Shield
              <div class="boomio-runner-upgradeHolder">
                <img src="${shield}" alt="">
                <div class="boomio-runner-upgradeProgress">
                  <div class="boomio-runner-upgradeLevel shieldLevel"></div>
                  <div class="boomio-runner-upgradeLevel shieldLevel"></div>
                  <div class="boomio-runner-upgradeLevel shieldLevel"></div>
                  <div class="boomio-runner-upgradeLevel shieldLevel"></div>
                </div>
              </div>
            </div>
            <div class="boomio-runner-upgradeBtn boomio-runner-smallBtn" onclick="Upgrade('shield')">
              <div class="upgradeBtnContent">
                <div class="shieldCost"></div>
                <img src="${coin}" class="upgradeCoinImg" alt="">
              </div>
            </div>
          </div>
          <div class="upgrade">
            <div class="boomio-runner-boosterUpgradeHolder">
              Booster
              <div class="boomio-runner-upgradeHolder">
                <img src="${boost}" alt="">
                <div class="boomio-runner-upgradeProgress">
                  <div class="boomio-runner-upgradeLevel boosterLevel"></div>
                  <div class="boomio-runner-upgradeLevel boosterLevel"></div>
                  <div class="boomio-runner-upgradeLevel boosterLevel"></div>
                  <div class="boomio-runner-upgradeLevel boosterLevel"></div>
                </div>
              </div>
            </div>
            <div class="boomio-runner-upgradeBtn boomio-runner-smallBtn" onclick="Upgrade('booster')">
              <div class="upgradeBtnContent">
                <div class="boosterCost"></div>
                <img src="${coin}" class="upgradeCoinImg" alt="">
              </div>
            </div>
          </div>

        </div>
      </div>
      <button class='boomio-btn boomio-runner-return-btn boomio-runner-store-return-btn'">
        Return
      </button>

  </div>

</div>

    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    const gameContainer = document.querySelector('.game-container');

    this.scoreTableContainerInstance = new CompetitionScoreTableContainer(this.customer, this.scoreTable);
    gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);

    if (this.customer === 'Nykstukas') {
      const gameContainer = document.querySelector('.game-container');

      const didYouKnowContainer = new DidYouKnowContainer(this.customer);
      gameContainer.appendChild(didYouKnowContainer.containerDiv);

      this.shareContainer = new ShareContainer(this.customer);
      gameContainer.appendChild(this.shareContainer.containerDiv);
    }

    this.startGame(this.scoreTableContainerInstance);
    document.addEventListener('shareClicked', (_event) => {
      if (this.shareClicked === false) {
        console.log('shareClicked');
        this.shareClicked = true;
        this.currentScore = this.currentScore + 1000;
      }
    });
  };

  startGame = () => {
    const canvas = document.getElementById('boomio-runner-canvas');
    adjustScaleAndPosition();
    const loader = new PxLoader();
    var gameOverAlreadyHandled = false;
    this.config = localStorageService.getDefaultConfig();
    const customer = this.config.business_name ? this.config.business_name : 'Nykstukas';

    var ctx = canvas?.getContext('2d');
    var wrapperBlock = document.getElementsByClassName('boomio-runner-wrapper')[0];
    var gameStarted = undefined;
    var creditsBlock = document.getElementsByClassName('boomio-runner-credits')[0];
    var storeBlock = document.getElementsByClassName('store')[0];
    var storeCoinsText = document.getElementsByClassName('storeCoinsText')[0];
    var achivesBlock = document.getElementsByClassName('boomio-runner-achives')[0];
    var achivesBlocks = document.getElementsByClassName('boomio-runner-achiveBlock');

    var pauseBlock = document.getElementsByClassName('boomio-runner-pause')[0];
    var pauseButton = document.getElementsByClassName('boomio-runner-pauseButton')[0];
    var lifeContainer = document.getElementsByClassName('boomio-runner-life-input-container')[0];

    var gameOverBlock = document.getElementsByClassName('boomio-runner-gameOver')[0];
    var mainMenuBlock = document.getElementsByClassName('boomio-runner-mainMenu')[0];
    var controlBlock = document.getElementsByClassName('boomio-runner-controlBlock')[0];

    var scoreBlock = document.getElementsByClassName('boomio-runner-score-input-container')[0];
    var highScoreBlock = document.getElementsByClassName('HighScoreBlock')[0];

    var mainCoinBlock = document.getElementsByClassName('mainCoinsText')[0];
    let currentScore = document.getElementsByClassName('currentScore')[0];
    var gameOverCoinsBlock = document.getElementsByClassName('gameOverCoins')[0];

    var GameOverScoreBlock = document.getElementsByClassName('boomio-runner-score-input-container')[1];
    var HIandRecord = document.getElementsByClassName('boomio-runner-HIandRecord')[0];
    var soundBtn = document.getElementsByClassName('boomio-runner-soundBtn')[0];
    var rightButtonsBlock = document.getElementsByClassName('boomio-runner-rightButtonsBlock')[0];
    var leftButtonsBlock = document.getElementsByClassName('boomio-runner-leftButtonsBlock')[0];
    var mainBgBlocks = document.getElementsByClassName('boomio-runner-mainBg');
    var smallBtnBlocks = document.getElementsByClassName('boomio-runner-smallBtn');

    var boosterLevels = document.getElementsByClassName('boosterLevel');
    var shieldLevels = document.getElementsByClassName('shieldLevel');

    var boosterCost = document.getElementsByClassName('boosterCost')[0];
    var shieldCost = document.getElementsByClassName('shieldCost')[0];

    var saveMeBlock = document.getElementsByClassName('boomio-runner-saveMeHolder')[0];

    var normalSpeed;
    var speed;
    var bgRatio;
    var leftPressed = false;
    var rightPressed = false;
    var upPressed = false;
    var downPressed = false;
    var slideing = 0;
    var jumping = false;
    var jumpCount = 0;
    var jumpLength = 50;
    var jumpHeight = 0;
    var overIndex = 1;
    var fpsInterval, startTime, now, then, elapsed;
    var frameCount = 0;
    var frameNumber = 1;
    var stopGame = false;
    var score = 0;
    var pause = false;
    var gameOver = false;
    var coins = 0;
    var player;
    var activeTime;
    const toggleHide = (block) => block.classList.toggle('boomio-hide');
    let highScore = localStorage.getItem('HI') > 0 ? localStorage.getItem('HI') : 0;
    let myCoins = localStorage.getItem('myCoins') > 0 ? localStorage.getItem('myCoins') : 0;
    let numberOfJumps = localStorage.getItem('jumps') > 0 ? localStorage.getItem('jumps') : 0;
    let numberOfDeaths = localStorage.getItem('deaths') > 0 ? localStorage.getItem('deaths') : 0;
    let numberOfSlides = localStorage.getItem('slides') > 0 ? localStorage.getItem('slides') : 0;
    let shieldLevel = localStorage.getItem('shieldLevel') > 1 ? localStorage.getItem('shieldLevel') : 1;
    let boosterLevel = localStorage.getItem('boosterLevel') > 1 ? localStorage.getItem('boosterLevel') : 1;

    // Load sprites
    const runSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/sprites/run`,
      8,
    );
    const slideSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/sprites/slide`,
      6,
    );
    const jumpSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/sprites/jump`,
      6,
    );
    const deathSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/sprites/death`,
      4,
    );
    const barriersSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/sprites/barriers`,
      7,
    );
    const bgSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/bg`,
      8,
    );
    const fgSprites = loadSprites(
      loader,
      `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
        this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
      }/fg`,
      2,
    );

    const CollectSprites = [
      loader.addImage(
        `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/sprites/collect/shield.png`,
      ),
      loader.addImage(
        `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/sprites/collect/shieldIcon.png`,
      ),
      loader.addImage(
        `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/sprites/collect/boosterIcon.png`,
      ),
      loader.addImage(
        `https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/refs/heads/feature/new-testing/images/runningWidget/${
          this.customer === 'Dentsu' ? 'assetsDentsu' : this.customer === 'Nykstukas' ? 'assetsNykstukas' : this.customer === 'demo-20' ? 'assetsDemo' : 'assetsTesting'
        }/sprites/collect/coin.png`,
      ),
    ];

    class GameObject {
      constructor(image, x, y, isPlayer) {
        this.x = x;
        this.y = y;
        this.slideing = false;
        this.dead = false;
        this.isPlayer = isPlayer;
        this.image = image;
        this.speed = speed;

        this.isShield = false;
        this.isBooster = false;
        this.randDist = RandomInteger(-speed * 2, speed * 2);
        this.shieldTimer = 0;
        this.shield = false;
        this.boost = false;
        this.boostTimer = 0;

        this.topBarrier = false;
        this.levitateCount = 0;
        this.sizeCoef = 1;
        this.levitateHeight = 0;
        this.isLevitate = false;
      }

      Update() {
        var barrierWidth = (canvas.height / 5) * (this.image.width / this.image.height);

        if (!this.isPlayer) {
          if (this.isLevitate) {
            this.levitateCount += 0.025;
            this.levitateHeight = (canvas.height / 50) * Math.sin(Math.PI * this.levitateCount);
            this.y += this.levitateHeight;
          }

          if (
            (((!this.topBarrier && this.x < -1.5 * barrierWidth) || (this.topBarrier && this.x < -5 * barrierWidth) || this.y < -500) && !this.kicked) ||
            (this.kicked && this.x <= -5 * canvas.width) ||
            (this.kicked && this.y <= -5 * canvas.height)
          ) {
            this.dead = true;
          }
          if (this.kicked) {
            this.x -= this.randDist;
            this.y -= speed * 2;
          } else {
            this.x -= speed;
          }
        }
      }
      Collide(object) {
        var playerWidth = (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
        var playerHeight = (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
        var barrierWidth = canvas.height / 3.5;
        var barrierHight = canvas.height / 3.5 / (object.image.naturalWidth / object.image.naturalHeight);
        var hit = false;

        if (object.topBarrier) {
          if (this.x + playerWidth / 2.5 > object.x && this.x < object.x + (barrierWidth * object.sizeCoef) / 1.2) {
            if (this.y - jumpHeight + playerHeight / 1.2 > object.y) {
              var actualPlayerHigh = this.slideing ? this.y + playerHeight / 2.2 : this.y;
              if (actualPlayerHigh * 1.1 - jumpHeight < object.y + barrierHight * object.sizeCoef) {
                if (player.shield) {
                  object.kicked = true;
                } else {
                  hit = true;
                }
              }
            }
          }
        } else {
          if (this.x + playerWidth / 1.5 > object.x && this.x < object.x + barrierWidth / 1.5) {
            if (this.y - jumpHeight + playerHeight > object.y * 1.1 && this.y - jumpHeight < object.y + barrierHight * object.sizeCoef) {
              if (player.shield) {
                if (object.isCoin) {
                  if (!object.kicked) {
                    score += 50;
                    currentScore.innerText = '0'.repeat(4 - String(score.toFixed(0).length)) + String(score.toFixed(0));

                    coins += 1;
                  }
                  object.kicked = true;
                } else {
                  object.kicked = true;
                }
              } else {
                if (object.isShield) {
                  player.shield = true;
                  activeTime = shieldLevel * 82;

                  object.image = new Image();
                }
                if (object.isBooster) {
                  player.boost = true;
                  activeTime = boosterLevel * 82;
                  object.image = new Image();
                }
                if (object.isCoin) {
                  if (!object.kicked) {
                    score += 50;
                    currentScore.innerText = '0'.repeat(4 - String(score.toFixed(0).length)) + String(score.toFixed(0));
                    coins += 1;
                  }
                  object.kicked = true;
                }
                if (!object.isBooster && !object.isShield && !object.isCoin) hit = true;
              }
            }
          }
        }
        return hit;
      }
    }

    var player = new GameObject(runSprites[0], 0.2 * canvas.width, canvas.height - wrapperBlock.offsetHeight / 2.5, true);
    window.addEventListener('resize', Resize);

    let orientationTimeout;

    const checkOrientationAndPause = () => {
      if (gameStarted === undefined) return;

      clearTimeout(orientationTimeout);

      orientationTimeout = setTimeout(() => {
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isPortrait) {
          if (!stopGame) {
            console.log('Game paused because device is in portrait');
            Stop();
          }
        } else {
          if (stopGame) {
            console.log('Game resumed because device is in landscape');
            Start();
          }
        }

        adjustScaleAndPosition();
      }, 100); // wait 200ms after rotation
    };

    window.addEventListener('orientationchange', checkOrientationAndPause);
    window.addEventListener('resize', adjustScaleAndPosition);
    document.addEventListener('DOMContentLoaded', adjustScaleAndPosition);

    function adjustScaleAndPosition() {
      const isNarrowScreen = window.innerWidth <= 920;

      const competitionTable = document.querySelector('.competition-table-container');
      const didYouKnowTable = document.querySelector('.did-you-know-container');
      const shareContainer = document.querySelector('.share-container');
      if (isNarrowScreen && shareContainer) {
        shareContainer.style.left = 'calc(50% - 60px)';
        shareContainer.style.top = 'calc(50% - 144px)';
        shareContainer.style.scale = '0.65';
      }
      if (isNarrowScreen && didYouKnowTable && competitionTable) {
        didYouKnowTable.style.scale = '0.65';
        didYouKnowTable.style.left = 'calc(50% - 60px)';
        didYouKnowTable.style.top = 'calc(50% - 144px)';

        competitionTable.style.scale = '0.56';
        competitionTable.style.left = 'calc(50% - 80px)';
        competitionTable.style.top = 'calc(50% - 144px)';
      }
    }

    Resize();
    updateAchives();

    function initializeGameLoader() {
      let pageMuted;
      if (typeof localStorage.getItem('pageMuted') === 'undefined' || localStorage.getItem('pageMuted') === null) {
        localStorage.setItem('pageMuted', '');
        pageMuted = false;
      } else {
        pageMuted = Boolean(localStorage.getItem('pageMuted'));
      }

      loader.start();

      if ('mediaSession' in navigator) {
        // Media session logic can be added here
      }

      let ysdk;

      // function showFullAdd() { need to check
      //   ysdk.adv.showFullscreenAdv({
      //     callbacks: {
      //       onClose: function (wasShown) {
      //         // some action after close
      //       },
      //       onError: function (error) {
      //         // some action on error
      //       },
      //     },
      //   });
      // }

      function showRevawardVideo(getReward) {
        ysdk.adv.showRewardedVideo({
          callbacks: {
            onOpen: () => {},
            onRewarded: () => {},
            onClose: () => {
              getReward();
            },
            onError: (e) => {
              console.log('Error while open video ad:', e);
            },
          },
        });
      }

      const addCoins = () => {
        myCoins = Number(myCoins) + 100;
        localStorage.setItem('myCoins', myCoins);
        storeCoinsText.innerText = Number(myCoins);
        mainCoinBlock.innerText = Number(myCoins);

        coinSound.play();
      };

      const saveMe = () => {
        player.rise = true;
        gameOver = false;
        stopGame = false;
        player.dead = false;
        toggleHide(gameOverBlock);
        toggleHide(pauseButton);
        toggleHide(scoreBlock);

        player.shield = true;
        activeTime = 1;
        Start();
        canvas.focus();
      };

      loader.addCompletionListener(() => {
        const initGame = () => {
          if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
            rightButtonsBlock.classList.remove('boomio-hide');
            leftButtonsBlock.classList.remove('boomio-hide');
          }

          for (let i = 0; i < mainBgBlocks.length; i += 1) {
            mainBgBlocks[i].style.backgroundImage = `url(${
              customer === 'Dentsu' ? runnerbackgroundDentsu : customer === 'Nykstukas' ? runnerbackgroundNykstukas : customer === 'demo-20' ? runnerbackgroundDemo : runnerbackground
            })`; // Ensure url syntax
          }

          toggleHide(mainMenuBlock);
          setTimeout(() => {
            const backgroundIntro = document.getElementById('background_intro');
            if (backgroundIntro) {
              backgroundIntro.style.transition = 'opacity 1s ease';
              backgroundIntro.style.opacity = 0;
              setTimeout(() => {
                backgroundIntro.style.display = 'none';
              }, 2500);
            }
          }, 2500); //intro speed

          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          if (isIOS || window.innerWidth >= 920) {
            showRules();
          } else {
            const fullscreenBtn = document.getElementById('fullscreenButton');
            fullscreenBtn.style.display = 'block';
            fullscreenBtn.addEventListener('click', () => {
              requestFullscreen();
              setTimeout(() => {
                showRules();
                fullscreenBtn.style.display = 'none';
              }, 100);
            });
          }

          const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');

          competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);
          const gameEndButton = document.getElementById('boomio-game-play-again');
          if (customer === 'Nykstukas') {
            const competitionDidYouKnow = document.getElementById('boomio-close-did-you-know');
            competitionDidYouKnow.addEventListener('click', () => clickEventHandlerDidYouKnow(false));
            const competitionShare = document.getElementById('boomio-close-share');
            competitionShare.addEventListener('click', () => clickEventHandlerDidYouKnow(true));
          }

          document.getElementById('close-game-container').addEventListener('click', () => {
            closeGame();
          });

          gameEndButton.addEventListener('click', Replay);
          bgRatio = bgSprites[0].naturalWidth / bgSprites[0].naturalHeight;
        };

        // Use DOMContentLoaded event
        if (document.readyState === 'loading') {
          // Document is still loading
          document.addEventListener('DOMContentLoaded', initGame);
        } else {
          // Document has already loaded
          initGame();
        }
      });
    }
    const closeGame = () => {
      if (this.gameClosed) return;
      this.gameClosed = true;

      // Remove the main game container
      const element = document.getElementById('boomio-runner-container');
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }

      // Stop animation loop
      stopGame = true;

      // Clear player animation
      clearInterval(playerAnimate);

      // Clear orientation timer
      clearTimeout(orientationTimeout);

      // Remove all event listeners
      window.removeEventListener('resize', Resize);
      window.removeEventListener('orientationchange', checkOrientationAndPause);
      document.removeEventListener('keydown', keyRightHandler);
      document.removeEventListener('keyup', keyLeftHandler);

      // Optionally clear intervals/timeouts if you've stored them
      // Cancel any delayed timeouts, e.g., tutorial
      if (this.clickEventHandler) {
        const canvas = document.getElementById('boomio-runner-canvas');
        if (canvas) canvas.removeEventListener('click', this.clickEventHandler);
      }

      console.log('Game closed successfully');
    };

    const showRules = () => {
      setTimeout(() => {
        const canvas = document.getElementById('boomio-runner-canvas');
        this.customer === 'Pegasas' ? 0.8 : 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'grayscale(20%) blur(2px) brightness(85%)';

        const inpuRegisterContainer = document.querySelector('.input-register-container');
        inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inpuRegisterContainer.style.display = 'block';
        setTimeout(() => {
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

          inpuRegisterContainer.style.height = '528px';
          inpuRegisterContainer.style.top = window.innerWidth > 920 ? 'calc(50% + 74px)' : isIOS ? '40%' : '35%';
          inpuRegisterContainer.style.opacity = 1;
        }, 100);
      }, 300);
    };

    const clickEventHandlerShowRules = () => {
      const competitionConfirmFieldBody = document.getElementById('boomio-competition-confirm-field');
      setTimeout(() => {
        const emailInput = document.querySelector('.boomio-competition-email-input-field');
        const phone = document.querySelector('.boomio-competition-phone-input-field');

        const checkboxChange = this.checkboxChange;
        const checkboxChange2 = this.checkboxChange2;
        const checkboxChange3 = this.checkboxChange3;

        if (!checkboxChange) {
          document.getElementById('competition-checkbox-error2').innerText =
            this.prop === 'Nykstukas'
              ? 'Norėdami tęsti, turite sutikti su akcijos taisyklėmis, Dentsu privatumo politika bei gauti Dentsu ir Boomio naujienas.'
              : 'Norėdami tęsti, turite sutikti su "Pieno Žvaigždės" privatumo politika.';
          document.getElementById('competition-checkbox-error2').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-checkbox-error2').style.display = 'block';
          document.getElementById('competition-checkbox-error2').style.height = '14px';

          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';

          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor = 'transparent';
          return;
        }
        if (checkboxChange) {
          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';

          document.getElementById('competition-email-error').innerText = '';
          document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor = 'transparent';

          document.getElementById('competition-checkbox-error2').innerText = '';
          document.getElementById('competition-checkbox-error2').style.backgroundColor = 'transparent';
        }
        if (emailInput?.value === '' || emailInput?.value === null) {
          document.getElementById('competition-email-error').innerText = 'Norint tęsti privaloma užpildyti.';
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
          document.getElementById('competition-name-error').innerText = '';

          document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error').innerText = '';
          document.getElementById('competition-checkbox-error').style.backgroundColor = 'transparent';
          document.getElementById('competition-checkbox-error2').innerText = '';
          document.getElementById('competition-checkbox-error2').style.backgroundColor = 'transparent';

          document.getElementById('competition-checkbox-error3').innerText = '';
          document.getElementById('competition-checkbox-error3').style.backgroundColor = 'transparent';
        }

        const isValidEmail = (email) => {
          // Enhanced regex for email validation with TLD enforcement
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          // Additional check to prevent consecutive dots
          if (email.includes('..')) {
            return false;
          }

          return emailRegex.test(email);
        };

        if (!isValidEmail(emailInput?.value)) {
          document.getElementById('competition-email-error').innerText = 'Neteisingas el. pašto formatas.'; // Incorrect email format in Lithuanian
          document.getElementById('competition-email-error').zIndex = 1;
          document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';

          return;
        }

        if (this.showCompetitiveRegistration === 'competition' || this.showCompetitiveRegistration === 'points' || this.showCompetitiveRegistration === 'collectable') {
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
              emails_consent: checkboxChange2,
              user_email: Elements.getEmailValue(),
              user_name: Elements.getEmailValue(),
              game_code: this.game_code,
              ...(phoneValue ? { phone: phoneValue } : {}), // Include only if phoneValue is non-empty
            })
            .then((response) => {
              boomioCatchSpinner.remove();
              if (response.success === false) {
                this.loading = false;

                if (response.res_code === 'EMAIL_EXIST') {
                  document.getElementById('competition-email-error').innerText =
                    this.customer === 'Fpro'
                      ? 'This email address already exists. Please use another one.'
                      : this.language === 'LV'
                        ? 'Šī e-pasta adrese jau eksistē. Izmantojiet citu.'
                        : this.language === 'RU'
                          ? 'Этот е-мейл адрес уже существует. Используйте другой.'
                          : this.language === 'ET'
                            ? 'See e-posti aadress on juba olemas. Kasutage teist.'
                            : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-email-error').style.backgroundColor = '#FFBABA';
                  document.getElementById('competition-name-error').innerText = '';
                  document.getElementById('competition-name-error').style.backgroundColor = 'transparent';
                } else if (response.res_code === 'NICKNAME_EXIST') {
                  document.getElementById('competition-name-error').innerText =
                    this.customer === 'Fpro'
                      ? 'This nickname already exists. Please use another one.'
                      : this.language === 'LV'
                        ? 'Šis segvārds jau pastāv. Izmantojiet citu.'
                        : this.language === 'RU'
                          ? 'Этот псевдоним уже существует. Используйте другой.'
                          : this.language === 'ET'
                            ? 'See hüüdnimi on juba olemas. Kasutage teist.'
                            : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                  document.getElementById('competition-name-error').style.backgroundColor = '#FFBABA';

                  document.getElementById('competition-email-error').innerText = '';
                  document.getElementById('competition-email-error').style.backgroundColor = 'transparent';
                }
              } else {
                this.bestScore = response.user_best_score;
                const inpuRegisterContainer = document.querySelector('.input-register-container');
                inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
                setTimeout(() => {
                  inpuRegisterContainer.style.height = '10px';
                  inpuRegisterContainer.style.top = 'calc(50% + 330px)';
                  inpuRegisterContainer.style.opacity = 0;
                }, 100);
                setTimeout(() => {
                  inpuRegisterContainer.style.display = 'none';
                }, 1000);
                setTimeout(() => {
                  const canvas = document.getElementById('boomio-runner-canvas');

                  canvas.style.transition = 'filter 0.6s ease';
                  canvas.style.filter = 'grayscale(20%) blur(2px) brightness(85%)';
                  const inputContainer = document.querySelector('.input-container');
                  document.getElementById('control-button').style.transition = 'opacity 2s ease';
                  document.getElementById('control-button').style.opacity = 1;
                  document.getElementById('control-button').style.display = 'flex';
                  inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
                  inputContainer.style.display = 'block';
                  setTimeout(() => {
                    inputContainer.style.height = '332px';
                    inputContainer.style.top = window.innerWidth > 920 ? 'calc(50% + 170px)' : '60%';
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
    };

    const clickEventHandlerDidYouKnow = (closeShare) => {
      const shareContainer = document.querySelector('.share-container');

      const didYouKnowTableContainer = closeShare ? document.querySelector('.share-container') : document.querySelector('.did-you-know-container');
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

          if (isNarrowScreen) {
            shareContainer.style.top = 'calc(50% - 144px)';
          } else {
            shareContainer.style.top = 'calc(50%)';
          }
          shareContainer.style.opacity = 1;
        }, 100);
      } else {
        if (this.customer === 'Nykstukas') {
          boomioService
            .signal('ROUND_FINISHED', 'signal', {
              score: this.currentScore,
              shared_somewhere: this.shareClicked,
            })
            .then((response) => {
              this.userBestPlace = response.user_best_place;
              if (this.showCompetitiveRegistration === 'points') {
                this.scoreTable = response;
                this.scoreTableContainerInstance.updateProps(this.customer, this.scoreTable, this.currentScore);
              }
              if (this.showCompetitiveRegistration === 'competition') {
                this.scoreTable = response;
                this.scoreTableContainerInstance.updateProps(this.customer, this.scoreTable);
              }

              if (this.showCompetitiveRegistration === 'collectable') {
                this.collection = response?.collection ? response?.collection : this.collection;
                this.just_won = response?.just_won ? response?.just_won : this.just_won;
                this.scoreTableContainerInstance.updateProps(this.customer, this.collectables, this.collection, this.just_won);
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

          if (isNarrowScreen) {
            competitionTableContainer.style.top = 'calc(50% - 144px)';
          } else {
            competitionTableContainer.style.top = 'calc(50%)';
          }
          competitionTableContainer.style.opacity = 1;
        }, 100);
      }
    };

    const keyRightHandler = (e) => {
      if (e.keyCode === 39 || e.keyCode === 68) {
        //right
        rightPressed = true;
      }
      if (e.keyCode === 37 || e.keyCode === 65) {
        //left
        leftPressed = true;
      }
      if (e.keyCode === 87 || e.keyCode === 38) {
        //jump
        jumpBegin();
      }
      if (e.keyCode === 83 || e.keyCode === 40) {
        //slide
        slideBegin();
      }

      if (e.keyCode === 27 && !gameOver) {
        //pause
        PauseToggle();
      }
    };

    const keyLeftHandler = (e) => {
      if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false;
      }
      if (e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = false;
      }
      if (e.keyCode === 83 || e.keyCode === 40) {
        slideEnd();
      }
      if (e.keyCode === 32 && gameOver === true) {
        Replay();
      }
    };

    const showCompetitiveRegistrationTable = () => {
      setTimeout(() => {
        if (this.showCompetitiveRegistration && this.customer !== 'Nykstukas') {
          boomioService
            .signal('ROUND_FINISHED', 'signal', {
              score: Math.floor(this.currentScore),
              shared_somewhere: this.shareClicked,
            })
            .then((response) => {
              const mainMenu = document.getElementsByClassName('boomio-runner-mainMenu')[0];
              mainMenu.style.setProperty('display', 'block', 'important');
              // Set initial opacity to 0
              mainMenu.style.setProperty('opacity', '0', 'important');
              // Force reflow to ensure the opacity change takes effect
              void mainMenu.offsetWidth;
              // Add the transition with !important and set the opacity to 1 over 0.5s
              mainMenu.style.setProperty('transition', 'opacity 0.5s ease-in-out', 'important');
              mainMenu.style.setProperty('opacity', '1', 'important');

              gameStarted = false;
              if (this.customer === 'Pigu.lt') {
                if (window.Boomio) {
                  window.Boomio.logEvent('game_finished', JSON.stringify(response));
                } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Boomio) {
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

              this.scoreTableContainerInstance.updateProps(this.customer, this.scoreTable);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        if (this.showCompetitiveRegistration) {
          let competitionTableContainer = '';
          if (this.customer === 'Nykstukas') {
            competitionTableContainer = document.querySelector('.did-you-know-container');
          } else {
            competitionTableContainer = document.querySelector('.competition-table-container');
          }
          const canvas = document.getElementById('boomio-runner-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'grayscale(20%) blur(2px) brightness(85%)';
          this.language === 'LV' ? 0.4 : 0.37;
          competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          competitionTableContainer.style.display = 'block';
          setTimeout(() => {
            competitionTableContainer.style.height = '680px';
            competitionTableContainer.style.top = window.innerWidth > 920 ? 'calc(50% + 74px)' : '10%';
            competitionTableContainer.style.opacity = 1;
          }, 100);
        } else {
          const inputContainer = document.querySelector('.input-container1');
          const canvas = document.getElementById('boomio-runner-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'grayscale(20%) blur(2px) brightness(85%)';
          document.getElementById('').style.display = 'block';
          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          inputContainer.style.display = 'block';
          setTimeout(() => {
            inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
            inputContainer.style.top = window.innerWidth > 920 ? 'calc(50% + 170px)' : '20%';
            inputContainer.style.opacity = 1;
          }, 100);
        }
      }, 100);
    };

    const ResetGlobalVariables = () => {
      const canvas = document.getElementById('boomio-runner-canvas');
      canvas.style.transition = 'filter 1s ease';
      document.getElementById('currentLife').innerHTML = `3 / 3`;

      canvas.style.filter = 'none';
      rightButtonsBlock.classList.remove('boomio-hide');
      leftButtonsBlock.classList.remove('boomio-hide');

      objects = [];
      coins = 0;
      player.x = 0.2 * canvas.width;
      player.y = canvas.height - wrapperBlock.offsetHeight / 2.5;
      gameOver = false;
      pause = false;
      player.rise = false;
      player.shield = false;
      player.boostTimer = 0;
      player.boost = false;
      player.dead = false;
      player.life = 3;
      speed = canvas.clientWidth / 300;
      score = 0;
      leftPressed = false;
      rightPressed = false;

      document.removeEventListener('keydown', keyRightHandler, false);
      document.removeEventListener('keyup', keyLeftHandler, false);
    };
    const PauseToggle = () => {
      // const toggleHide = (block) => block.classList.toggle('boomio-hide');
      console.log('paused');
      // stopGame ? Start() : Stop();

      // pause = pauseBlock.classList.contains('boomio-hide') ? true : false;
      // toggleHide(pauseBlock);
      // toggleHide(scoreBlock);
      // toggleHide(pauseButton);
      // toggleHide(lifeContainer);
    };
    function requestFullscreen() {
      const container = document.getElementById('boomio-runner-container');
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen(); // Safari
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen(); // IE11
      }
    }
    const PlayButtonActivate = () => {
      controlBlock.style.opacity = 1;
      setTimeout(() => (controlBlock.style.opacity = 0), 2000);

      if (window.innerWidth > window.innerHeight) {
        document.getElementById('turnLandscape').style.display = 'none !important';
      } else {
        document.getElementById('turnLandscape').style.display = 'flex !important';
      }

      document.getElementById('turnLandscape').style.zIndex = 10;
      if (!gameStarted) {
        let canvas = document.getElementById('boomio-runner-canvas');

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

            if (this.gameCount === 0) {
              this.init();
              console.log('init');
              this.gameCount++;

              const canvas = document.getElementById('boomio-runner-canvas');
              canvas.style.transition = 'filter 1s ease';
              canvas.style.filter = 'none';

              controlButton.style.opacity = 0;
            }
          };
          canvas.addEventListener('click', this.clickEventHandler);
        }
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
          const canvas = document.getElementById('boomio-runner-canvas');
          canvas.style.transition = 'filter 1s ease';
          canvas.style.filter = 'none';
        }, 400);
        controlButton.style.display = 'none';
        controlButton.style.opacity = 0;
        setTimeout(() => {
          if (this.showCompetitiveRegistration === 'competition' || this.showCompetitiveRegistration === 'points' || this.showCompetitiveRegistration === 'collectable') {
            boomioService
              .signal('ROUND_STARTED', 'signal')
              .then((_response) => {
                gameStarted = true;
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
          console.log('started');
          const toggleHide = (block) => block.classList.toggle('boomio-hide');

          const isPortrait = window.innerHeight > window.innerWidth;

          if (isPortrait) {
            console.log('Starting paused because device is in portrait');
            Stop(); // don't start moving
          } else {
            console.log('Starting game because device is in landscape');
            Start(); // start moving
          }

          ResetGlobalVariables();
          document.addEventListener('keydown', keyRightHandler, false);
          document.addEventListener('keyup', keyLeftHandler, false);
          toggleHide(mainMenuBlock);
          toggleHide(pauseButton);
          toggleHide(scoreBlock);

          toggleHide(lifeContainer);

          saveMeBlock.classList.remove('boomio-hide');
        }, 50);
      }
    };
    // Select button elements
    const mobileLeftButton = document.getElementById('mobileLeftButton');
    const mobileRightButton = document.getElementById('mobileRightButton');
    const mobileUpButton = document.getElementById('mobileUpButton');
    const mobileDownButton = document.getElementById('mobileDownButton');

    // Define event handlers
    const handleTouchStart = (callback, button) => {
      return () => {
        callback(true);
        button.style.opacity = '0.5';
      };
    };

    const handleTouchEnd = (callback, button) => {
      return () => {
        callback(false);
        button.style.opacity = '1';
      };
    };

    // Define actions
    const setLeftPressed = (isPressed) => (leftPressed = isPressed);
    const setRightPressed = (isPressed) => (rightPressed = isPressed);

    // Add event listeners
    mobileLeftButton.addEventListener('touchstart', handleTouchStart(setLeftPressed, mobileLeftButton));
    mobileLeftButton.addEventListener('touchend', handleTouchEnd(setLeftPressed, mobileLeftButton));

    mobileRightButton.addEventListener('touchstart', handleTouchStart(setRightPressed, mobileRightButton));
    mobileRightButton.addEventListener('touchend', handleTouchEnd(setRightPressed, mobileRightButton));

    mobileUpButton.addEventListener('touchstart', () => {
      jumpBegin();
      mobileUpButton.style.opacity = '0.5';
    });
    mobileUpButton.addEventListener('touchend', () => {
      mobileUpButton.style.opacity = '1';
    });

    mobileDownButton.addEventListener('touchstart', () => {
      slideBegin();
      mobileDownButton.style.opacity = '0.5';
    });
    mobileDownButton.addEventListener('touchend', () => {
      slideEnd();
      mobileDownButton.style.opacity = '1';
    });

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

    document.getElementById('startButtonClick').addEventListener('click', () => {
      PlayButtonActivate();
    });
    document.querySelector('.boomio-runner-homeButton').addEventListener('click', GoToHome);
    document.querySelector('.boomio-runner-homeButton1').addEventListener('click', GoToHome);
    document.querySelector('.boomio-runner-pauseButton').addEventListener('click', PauseToggle);
    document.querySelector('.boomio-runner-pauseButton1').addEventListener('click', PauseToggle);

    document.querySelector('.boomio-runner-replayButton').addEventListener('click', Replay);
    document.querySelector('.boomio-runner-replayButton1').addEventListener('click', Replay);

    document.querySelector('.boomio-runner-store-return-btn').addEventListener('click', () => {
      toggleHide(storeBlock);
    });
    document.querySelector('.boomio-runner-return-btn').addEventListener('click', () => {
      toggleHide(achivesBlock);
    });
    // document.querySelector('.achivesButton').addEventListener('click', () => {
    //   toggleHide(achivesBlock);
    // });
    // document.querySelector('.storeButton').addEventListener('click', () => {
    //   toggleHide(storeBlock);
    //   storeCoinsText.innerText = Number(mainCoinBlock.innerText);
    // });

    function loadSprites(loader, basePath, count) {
      const sprites = [];
      for (let i = 1; i <= count; i += 1) {
        // Construct the full URL for each sprite image
        const spriteUrl = `${basePath}/${i}.png`;
        // Add the image to the loader
        sprites.push(loader.addImage(spriteUrl));
      }
      return sprites;
    }

    // Call the function to initialize the loader
    initializeGameLoader();

    updateUpgrades();

    function Resize() {
      canvas.width = wrapperBlock.offsetWidth;
      canvas.height = wrapperBlock.offsetHeight;

      if (window.innerWidth > window.innerHeight) {
        document.getElementById('turnLandscape').style.display = 'none !important';
      }

      // Adjust player Y-position to match new height
      if (player && player.isPlayer) {
        player.y = canvas.height - wrapperBlock.offsetHeight / 2.5;
      }
    }

    highScoreBlock.innerText = highScore;
    mainCoinBlock.innerText = myCoins;

    class Bg {
      constructor(image, x, layer) {
        this.x = x;
        this.y = 0;
        this.layer = layer;
        this.image = image;
        var obj = this;
        this.image.addEventListener('load', function () {
          obj.loaded = true;
        });
      }
      Update(bg) {
        this.x -= speed * this.layer;
        if (this.x < 0) {
          bg.x = this.x + canvas.height * bgRatio - speed;
        }
      }
    }

    var objects = [];
    function animate(object, spritesArr) {
      frameNumber += 1;
      if (frameNumber > spritesArr.length - 1) {
        frameNumber = 1;
      }
      object.image = spritesArr[frameNumber];
    }

    var playerAnimate = setInterval(() => {
      animate(player, runSprites);
    }, 75);

    function Move() {
      if (rightPressed && player.x + canvas.width / 10 < canvas.width) {
        player.x += speed;
      } else if (leftPressed && player.x > 0) {
        player.x -= speed;
      }
      if (jumping) {
        jumpCount += speed / (canvas.height / 75);
        jumpHeight = (canvas.height / 125) * jumpLength * Math.sin((Math.PI * jumpCount) / jumpLength);
      }
      if (jumpCount > jumpLength) {
        jumpCount = 0;
        jumping = false;
        jumpHeight = 0;
        numberOfJumps = Number(numberOfJumps) + 1;
        localStorage.setItem('jumps', numberOfJumps);
        clearInterval(playerAnimate);
        playerAnimate = setInterval(() => {
          animate(player, runSprites);
        }, 75);
      }
    }

    const fg = [new Bg(fgSprites[0], 0, 0.3), new Bg(fgSprites[0], canvas.height * bgRatio, 0.3), new Bg(fgSprites[1], 0, 1), new Bg(fgSprites[1], canvas.height * bgRatio, 1)];

    const CollectObjects = [new GameObject(CollectSprites[0], 0, 0, false)];

    function jumpBegin() {
      if (!player.slideing) {
        clearInterval(playerAnimate);
        playerAnimate = setInterval(
          () => {
            animate(player, jumpSprites);
          },
          100 + score / 10,
        );
        jumping = true;
      }
    }
    function slideBegin() {
      if (!jumping) {
        player.slideing = true;
        slideing += 1;
        if (slideing === 1) {
          clearInterval(playerAnimate);
          player.image = slideSprites[0];
          setTimeout(() => {
            player.image = slideSprites[1];
          }, 20);
          playerAnimate = setInterval(() => {
            player.image = slideSprites[2];
            animate(player, slideSprites.slice(3, 6));
          }, 100);
        }
      }
    }

    function slideEnd() {
      if (!jumping) {
        player.slideing = false;
        clearInterval(playerAnimate);
        slideing = 0;
        player.image = slideSprites[1];
        setTimeout(() => {
          player.image = slideSprites[0];
        }, 20);
        playerAnimate = setInterval(() => {
          animate(player, runSprites);
        }, 75);
        numberOfSlides = Number(numberOfSlides) + 1;
        localStorage.setItem('slides', numberOfSlides);
      }
    }

    function updateAchives() {
      const achives = {
        0: highScore >= 100,
        1: highScore >= 300,
        2: highScore >= 500,
        3: highScore >= 700,
        4: highScore >= 1000,
        5: numberOfDeaths >= 8,
        6: numberOfDeaths >= 27,
        7: numberOfDeaths >= 42,
        8: numberOfDeaths >= 100,
        9: numberOfJumps >= 500,
        10: numberOfSlides >= 300,
        11: shieldLevel >= 4,
        12: boosterLevel >= 4,
        13: myCoins >= 1000,
      };
      var unlockCount = 0;
      for (var i = 0; i < achivesBlocks.length - 1; i += 1) {
        if (achives[i]) {
          achivesBlocks[i].classList.remove('boomio-lock');
          unlockCount += 1;
        }
      }
      if (unlockCount === achivesBlocks.length - 1) {
        achivesBlocks[achivesBlocks.length - 1].classList.remove('boomio-lock');
      }
      document.getElementById('numberOfJumpsBlock').innerHTML = 'Jumps: ' + numberOfJumps;
      document.getElementById('numberOfDeathsBlock').innerHTML = 'Deaths: ' + numberOfDeaths;
      document.getElementById('numberOfSlidesBlock').innerHTML = 'Slides: ' + numberOfSlides;
    }

    function updateUpgrades() {
      for (let i = 0; i < shieldLevel; i += 1) {
        shieldLevels[i].classList.add('boomio-runner-activeLevel');
      }
      for (let i = 0; i < boosterLevel; i += 1) {
        boosterLevels[i].classList.add('boomio-runner-activeLevel');
      }
      if (shieldLevel < 4) {
        shieldCost.innerHTML = shieldLevel * 150;
      } else {
        shieldCost.innerHTML = 'MAX';
        document.getElementsByClassName('upgradeCoinImg')[0].classList.add('boomio-hide');
      }
      if (boosterLevel < 4) {
        boosterCost.innerHTML = boosterLevel * 150;
      } else {
        boosterCost.innerHTML = 'MAX';
        document.getElementsByClassName('upgradeCoinImg')[1].classList.add('boomio-hide');
      }
    }
    //localStorage.clear()
    //localStorage.setItem('myCoins', 10000);
    function payForLife() {
      if (+myCoins >= 100) {
        myCoins = +myCoins - 100;
        localStorage.setItem('myCoins', myCoins);
        coinSound.play();
        saveMe();
      } else {
        notEnough.play();
      }
    }

    function Upgrade(boost) {
      if (boost === 'shield') {
        if (+shieldCost.innerText <= +myCoins && +shieldLevel < 4) {
          myCoins = +myCoins - +shieldCost.innerText;
          shieldLevel = +shieldLevel + 1;
          localStorage.setItem('shieldLevel', shieldLevel);
          localStorage.setItem('myCoins', myCoins);
          storeCoinsText.innerText = +myCoins;
          mainCoinBlock.innerText = localStorage.getItem('myCoins');
          coinSound.play();
          updateUpgrades();
        } else {
          notEnough.play();
        }
      } else {
        if (+boosterCost.innerText <= +myCoins && +boosterLevel < 4) {
          myCoins = +myCoins - +boosterCost.innerText;
          boosterLevel = +boosterLevel + 1;
          localStorage.setItem('boosterLevel', boosterLevel);
          localStorage.setItem('myCoins', myCoins);
          storeCoinsText.innerText = +myCoins;
          mainCoinBlock.innerText = localStorage.getItem('myCoins');
          coinSound.play();
          updateUpgrades();
        } else {
          notEnough.play();
        }
      }
    }

    function GameOver() {
      if (gameOverAlreadyHandled) return; // ✅ prevent multiple runs
      gameOverAlreadyHandled = true;

      player.shieldTimer = 0;
      player.boostTimer = 0;
      Stop();
      setTimeout(() => {
        player.image = deathSprites[0];
        Draw();
        setTimeout(() => {
          player.image = deathSprites[1];
          Draw();
          setTimeout(() => {
            player.image = deathSprites[2];
            Draw();
            setTimeout(() => {
              player.image = deathSprites[3];
              Draw();
              setTimeout(() => {
                GameOverScoreBlock.innerText = 'Score: ' + score.toFixed(0);
                toggleHide(scoreBlock);

                toggleHide(pauseButton);
                // toggleHide(gameOverBlock);
                toggleHide(lifeContainer);

                showCompetitiveRegistrationTable();
                rightButtonsBlock.classList.add('boomio-hide');
                leftButtonsBlock.classList.add('boomio-hide');
                gameOverCoinsBlock.innerText = Number(localStorage.getItem('myCoins')) + Number(coins);
                player.dead = false;
                // showFullAdd(); need to check
                if (score > highScore) {
                  HIandRecord.innerHTML = 'new record!';
                  highScore = Number(score.toFixed(0));
                  localStorage.setItem('HI', score.toFixed(0));
                } else {
                  HIandRecord.innerText = 'HighScore: ' + highScore;
                }
                if (player.rise) {
                  saveMeBlock.classList.add('boomio-hide');
                }
                updateAchives();
              }, 80);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }

    function Replay() {
      gameOverAlreadyHandled = false;

      boomioService
        .signal('ROUND_STARTED', 'signal')
        .then((_response) => {
          gameStarted = true;
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      controlBlock.style.opacity = 1;
      setTimeout(() => (controlBlock.style.opacity = 0), 2000);

      if (gameOver) {
        localStorage.setItem('myCoins', Number(localStorage.getItem('myCoins')) + Number(coins));
        mainCoinBlock.innerText = localStorage.getItem('myCoins');

        // (Optionally update myCoins etc. as needed)
        const mainMenu = document.getElementsByClassName('boomio-runner-mainMenu')[0];

        // Ensure the menu is currently shown (opacity 1)
        mainMenu.style.setProperty('display', 'block', 'important');
        mainMenu.style.setProperty('opacity', '1', 'important');

        // Force reflow
        void mainMenu.offsetWidth;

        // Set up transition to fade from 1 to 0 over 0.5s
        mainMenu.style.setProperty('transition', 'opacity 0.5s ease-in-out', 'important');
        mainMenu.style.setProperty('opacity', '0', 'important');

        // Once the fade-out transition is complete, hide the element
        setTimeout(() => {
          mainMenu.style.setProperty('display', 'none', 'important');
        }, 500);

        // toggleHide(gameOverBlock);
        toggleHide(pauseButton);
        toggleHide(scoreBlock);

        toggleHide(lifeContainer);

        saveMeBlock.classList.remove('boomio-hide');
      }
      if (pause) {
        toggleHide(pauseBlock);
        toggleHide(pauseButton);
        toggleHide(scoreBlock);

        toggleHide(lifeContainer);
      }
      ResetGlobalVariables();
      document.addEventListener('keydown', keyRightHandler, false);
      document.addEventListener('keyup', keyLeftHandler, false);
      const competitionTableContainer = document.querySelector('.competition-table-container');

      competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      setTimeout(() => {
        competitionTableContainer.style.height = '10px';
        competitionTableContainer.style.top = 'calc(50% + 330px)';
        competitionTableContainer.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        competitionTableContainer.style.display = 'none';
        Start();
      }, 400);
    }

    function GoToHome() {
      if (pause) {
        toggleHide(pauseBlock);
      }
      if (gameOver) {
        localStorage.setItem('myCoins', Number(localStorage.getItem('myCoins')) + Number(coins));
        mainCoinBlock.innerText = localStorage.getItem('myCoins');
        toggleHide(gameOverBlock);
      }

      highScoreBlock.innerText = highScore;
      ResetGlobalVariables();
      updateAchives();
      updateUpgrades();
      toggleHide(mainMenuBlock);
    }
    function UpdateBg(index, arr = bg) {
      arr[index].Update(arr[index + 1]);
      arr[index + 1].Update(arr[index]);
    }

    const showScoreAndCoins = () => {
      score += 0.12;
      this.currentScore = score;

      currentScore.innerText = '0'.repeat(4 - String(score.toFixed(0).length)) + String(score.toFixed(0));
    };
    function Start() {
      stopGame = false;
      fpsInterval = 1000 / 60;
      then = Date.now();
      startTime = then;
      Update();
    }

    function Stop() {
      stopGame = true;
    }
    function pushRandomCoin(pos, newCoin = true) {
      let x;
      let y;
      if (RandomInteger(1, 4) >= 2) {
        if (RandomInteger(0, 1) === 1) {
          x = (4 * canvas.width) / 3;
          y = pos === 'top' ? canvas.height - wrapperBlock.offsetHeight / 1.4 : canvas.height - wrapperBlock.offsetHeight / 3.1;
        } else {
          x = (4 * canvas.width) / 2;
          y = canvas.height - wrapperBlock.offsetHeight / 3.1;
        }
        if (newCoin) {
          objects.push(new GameObject(barriersSprites[0], x, y, false));
        }
        objects.at(-1).image = CollectSprites[3];
        objects.at(-1).isCoin = true;
        objects.at(-1).sizeCoef = 0.3;
      }
    }
    function Update() {
      if (stopGame) {
        return;
      }
      requestAnimationFrame(Update);

      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        for (let i = 0; i < bg.length - 1; i += 2) {
          UpdateBg(i);
        }

        // Adjust object placement condition
        if (objects.length === 0 || objects.at(-1).x < canvas.width - 200) {
          objects.push(new GameObject(barriersSprites[0], (4 * canvas.width) / 2.5, canvas.height - wrapperBlock.offsetHeight / 2.7, false));
          var randomBarrier = RandomInteger(1, 8);
          switch (randomBarrier) {
            case 1:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              pushRandomCoin('top');
              break;
            case 2:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              pushRandomCoin('top');
              break;
            case 3:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              pushRandomCoin('top');
              break;
            case 4:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              objects.at(-1).y = canvas.height - wrapperBlock.offsetHeight / 2.35;
              pushRandomCoin('top');
              break;
            case 5:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              objects.at(-1).topBarrier = true;
              objects.at(-1).y = canvas.height - canvas.height / 2.58 / (objects.at(-1).image.naturalWidth / objects.at(-1).image.naturalHeight);
              pushRandomCoin('bottom');
              break;
            case 6:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              pushRandomCoin('top');
              break;
            case 7:
              objects.at(-1).image = barriersSprites[randomBarrier - 1];
              objects.at(-1).isLevitate = true;
              objects.at(-1).topBarrier = true;
              objects.at(-1).sizeCoef = 1.7;
              objects.at(-1).y = canvas.height - wrapperBlock.offsetHeight / 1.11;
              pushRandomCoin('bottom');
              break;
            case 8:
              if (!objects.at(-1).isBooster && !player.boost && !objects.at(-1).isShield && !player.shield) {
                if (RandomInteger(0, 100) > 70) {
                  objects.at(-1).image = CollectSprites[1];
                  objects.at(-1).isShield = true;
                  objects.at(-1).sizeCoef = 0.5;
                  objects.at(-1).y = RandomInteger(0, 1) === 1 ? canvas.height - wrapperBlock.offsetHeight / 2.5 : canvas.height - wrapperBlock.offsetHeight / 1.3;
                }
                if (RandomInteger(0, 100) > 70) {
                  objects.at(-1).image = CollectSprites[2];
                  objects.at(-1).isBooster = true;
                  objects.at(-1).sizeCoef = 0.5;
                  objects.at(-1).y = RandomInteger(0, 1) === 1 ? canvas.height - wrapperBlock.offsetHeight / 2.5 : canvas.height - wrapperBlock.offsetHeight / 1.3;
                }
                break;
              }
          }
        }

        for (let i = 0; i < fg.length - 1; i += 2) {
          UpdateBg(i, fg);
        }

        var isDead = false;

        for (var i = 0; i < objects.length; i++) {
          objects[i].Update(i);

          if (objects[i].dead) {
            isDead = true;
          }
        }

        if (isDead) {
          objects.shift();
        }

        var hit = false;

        for (var i = 0; i < objects.length; i++) {
          hit = player.Collide(objects[i]);

          if (hit && !player.immune) {
            console.log(player.life);
            if (player.life > 0) {
              player.life = player.life - 1;
              document.getElementById('currentLife').innerHTML = `${player.life} / 3`;
              const container = document.querySelector('.boomio-runner-life-input-container');
              container.classList.add('shake-life');
              setTimeout(() => {
                container.classList.remove('shake-life');
              }, 500);
              player.shield = true;
              activeTime = shieldLevel * 82;
              CollectSprites[1].image = new Image();
            } else {
              player.dead = true;
            }
          }
        }

        player.Update();

        if (player.dead) {
          numberOfDeaths = Number(numberOfDeaths) + 1;
          localStorage.setItem('deaths', numberOfDeaths);
          gameOver = true;
          GameOver();
        }

        speed += 0.0015;

        Draw();
        Move();
        showScoreAndCoins();
      }
    }

    const bg = [
      new Bg(bgSprites[0], 0, 0.1),
      new Bg(bgSprites[0], canvas.height * bgRatio, 0.1),

      new Bg(bgSprites[1], 0, 0.15),
      new Bg(bgSprites[1], canvas.height * bgRatio, 0.15),

      new Bg(bgSprites[2], 0, 0.25),
      new Bg(bgSprites[2], canvas.height * bgRatio, 0.25),

      new Bg(bgSprites[3], 0, 0.3),
      new Bg(bgSprites[3], canvas.height * bgRatio, 0.3),

      new Bg(bgSprites[7], 0, 0.4),
      new Bg(bgSprites[7], canvas.height * bgRatio, 0.4),

      new Bg(bgSprites[4], 0, 0.6),
      new Bg(bgSprites[4], canvas.height * bgRatio, 0.6),

      new Bg(bgSprites[5], 0, 1),
      new Bg(bgSprites[5], canvas.height * bgRatio, 1),

      new Bg(bgSprites[6], 0, 1.2),
      new Bg(bgSprites[6], canvas.height * bgRatio, 1.2),
    ];

    function Draw() {
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < bg.length; i += 1) {
        bg[i].image.addEventListener('load', ctx.drawImage(bg[i].image, 0, 0, bg[i].image.naturalWidth, bg[i].image.naturalHeight, bg[i].x, bg[i].y, canvas.height * bgRatio, canvas.height));
      }

      for (var i = 0; i < objects.length; i++) {
        DrawObject(objects[i]);
      }
      ctx.imageSmoothingEnabled = false;
      DrawObject(player);
      if (player.boost) {
        if (player.boostTimer === 0) {
          clearInterval(playerAnimate);
          playerAnimate = setInterval(() => {
            animate(player, runSprites);
          }, 30);
          // Optionally set a visual effect, e.g. shield on boost
          player.shield = true;
          // Save current speed, then multiply for boost
          normalSpeed = speed;
          speed = speed * 5;
        }
        // Increment the booster timer every frame
        player.boostTimer += 1;
        // When booster active time expires, reset boost and speed
        if (player.boostTimer >= activeTime) {
          player.boost = false;
          speed = normalSpeed;
          player.boostTimer = 0;
        }
      }
      for (var i = 0; i < (player.boost ? fg.length : fg.length - 2); i += 1) {
        fg[i].image.addEventListener('load', ctx.drawImage(fg[i].image, 0, 0, fg[i].image.naturalWidth, fg[i].image.naturalHeight, fg[i].x, fg[i].y, canvas.height * bgRatio, canvas.height));
      }

      if (player.shield) {
        // Increment the shield timer (adjust the increment value as needed)
        player.shieldTimer += 1; // or += deltaTime

        let offsetX = -50;
        let offsetY = -50;

        // Adjust offsets for mobile devices
        if (window.innerWidth < 920) {
          // Change these values as you need for mobile
          offsetX = -20;
          offsetY = -20;
        }

        // Position the shield with the offsets
        CollectObjects[0].x = player.x + offsetX;
        CollectObjects[0].y = player.y - jumpHeight + offsetY;
        if (player.boost) {
          score += 0.12;
        }

        if (player.shieldTimer >= activeTime) {
          if (!player.blinking) {
            player.blinking = true; // Start blinking phase
            setTimeout(() => {
              toggleImage(0, 30, 50, () => {
                player.shield = false;
                player.shieldTimer = 0;
                player.blinking = false;
              });
            }, 50);
          }
        } else {
          // Draw shield with opacity 0.5
          ctx.save();
          ctx.globalAlpha = 0.5;
          CollectObjects[0].image = CollectSprites[0]; // Assign the shield sprite
          DrawObject(CollectObjects[0]);
          ctx.restore();
        }
        // ... rest of your shield code ...
      }
    }
    function toggleImage(index, maxToggles, delay, callback) {
      if (index >= maxToggles) {
        callback();
        return;
      }

      ctx.save();
      // For even indices, draw with 0.5 opacity; for odd, draw nothing (or clear)
      if (index % 2 === 0) {
        ctx.globalAlpha = 0.5;
        CollectObjects[0].image = CollectSprites[0];
      } else {
        // Draw a transparent image (or skip drawing)
        CollectObjects[0].image = new Image();
      }
      DrawObject(CollectObjects[0]);
      ctx.restore();

      setTimeout(() => {
        toggleImage(index + 1, maxToggles, delay, callback);
      }, delay);
    }
    function DrawObject(object) {
      var playerWidth = (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
      var playerHeight = (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
      var barrierWidth = canvas.height / 3.5;
      var barrierHight = canvas.height / 3.5 / (object.image.naturalWidth / object.image.naturalHeight);
      object.image.addEventListener(
        'load',
        ctx.drawImage(
          object.image,
          object.x,
          object.isPlayer ? object.y - jumpHeight : object.y,
          object.isPlayer ? playerWidth : barrierWidth * object.sizeCoef,
          object.isPlayer ? playerHeight : barrierHight * object.sizeCoef,
        ),
      );
    }

    function RandomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
  };
}

export default () => {
  new runnerWidget();
};
