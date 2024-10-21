import './runnerStyles.css';
import PxLoader from './scripts/PxLoader.js';
import howlercore from './scripts/howler.core.js';
import PxLoaderImage from './scripts/PxLoaderImage.js';
import yandexScripts from './scripts/yandexScripts.js';
import { localStorageService, widgetHtmlService } from '@/services';
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
  runngerbackground,
} from './scripts/constants';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';

class runnerWidget {
  static ctx;

  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Barbora';
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'points';
    this.language = this.config.language ? this.config.language : '';

    this.scoreTable = {};
    this.scoreTableContainerInstance;

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
      this.customer === 'Ikea'
        ? newRecordIkea
        : this.language === 'EE'
        ? newRecordEE
        : this.language === 'LV'
        ? newRecordLV
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
          this.language === 'LV' ? 'kustēties' : this.language === 'EE' ? 'LIIGU' : 'Brūkšt'
        }</div>
        <div>${
          this.language === 'LV' ? 'kustēties' : this.language === 'EE' ? 'LIIGU' : 'Brūkšt'
        }</div>
      </div><img src=${tapImageBarbora} alt="Image Description" style="width: 93px; height: 89px;">`}
      </div>
    <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:160px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:45px;padding:7px;background:${
      this.customer === 'Barbora'
        ? '#CC0001'
        : this.customer === 'Ikea'
        ? '#0058A3'
        : this.customer === 'Unisend'
        ? '#376728'
        : '#FFE92D'
    };border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${
    this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
  }; font-weight: 900; word-wrap: break-word;position:absolute;left:70px;top:17px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>



<div class="boomio-time-input-container" style="box-sizing:border-box;display:none;width:160px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:45px;padding:7px;background:${
      this.customer === 'Barbora'
        ? '#CC0001'
        : this.customer === 'Ikea'
        ? '#0058A3'
        : this.customer === 'Unisend'
        ? '#376728'
        : '#FFE92D'
    };border-radius:35px">
<div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
<img src=${stopwatch} alt="Image Description" style="width: 20px; height: 20px;margin-top:20px"></img>

<div style="text-align: center; color: white; font-size: 20px; font-family:${
      this.customer === 'Ikea' ? 'Noto Sans' : 'Georama'
    } ;font-weight: 900; word-wrap: break-word;position:absolute;left:70px;top:17px;z-index:3;line-height:30px;" id="currentTime"></div>
</div>
</div>



    <img src=${
      this.customer === 'Barbora'
        ? BarboraIntro
        : this.customer === 'Unisend' && this.language === 'EE'
        ? UnisendIntroEE
        : this.customer === 'Unisend' && this.language === 'LV'
        ? UnisendIntroLV
        : this.customer === 'Ikea'
        ? IkeaIntro
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

    <div class="close-game-container" id="close-game-container" style="top:calc(50% - 280px);display:block;width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>
    ${new InputContainer(this.customer, 'drive').createInputContainerDiv().outerHTML}


 
<body oncontextmenu="return false;">
  <div id="turnLandscape">
    rotate your device
    <img style='margin-top: 30px' id='rotateIcon' src="assets/gui/orientation.png" alt="">
  </div>
  <main>

    <div class="wrapper screenRatio">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="controlBlock hide">
        Controls
        <img class='controlButton' src="assets/gui/W.png" alt="">
        <div><img class='controlButton' src="assets/gui/A.png" alt="">
          <img class='controlButton' src="assets/gui/S.png" alt="">
          <img class='controlButton' src="assets/gui/D.png" alt="">
        </div>
      </div>
     <canvas id="boomio-runner-canvas" class="boomio-runner-canvas" style="${
       document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
     }">
      </canvas>

      <img class="pauseButton button hide" src="assets/gui/Pause.png" alt="" onclick="PauseToggle(); ">
      <div class="score hide"></div>
      <div class="coins hide">
        <div class="coinsText"></div>
        <img src="./assets/sprites/collect/coin.png" alt="">
      </div>

      <div class="leftButtonsBlock hide">
        <img id="mobileLeftButton" ontouchstart="leftPressed = true; this.style.opacity = '0.5'"
          ontouchend="leftPressed = false;  this.style.opacity = '1'" class="mobileControlButt"
          src="assets/gui/left.png" alt="">
        <img id="mobileRightButton" ontouchstart="rightPressed = true; this.style.opacity = '0.5'"
          ontouchend="rightPressed = false; this.style.opacity = '1'" class="mobileControlButt"
          src="assets/gui/right.png" alt="">
      </div>

      <div class="rightButtonsBlock hide">
        <img id="mobileUpButton" ontouchstart="jumpBegin(); this.style.opacity = '0.5'"
          ontouchend="this.style.opacity = '1'" class="mobileControlButt" src="assets/gui/up.png" alt="">
        <img id="mobileDownButton" ontouchstart="slideBegin(); this.style.opacity = '0.5'"
          ontouchend="slideEnd(); this.style.opacity = '1'" class="mobileControlButt" src="assets/gui/down.png" alt="">
      </div>



    </div>
    <div class="pause insideScreenRatio hide">
      PAUSED
      <div class="buttonHolder ">
        <img class='replayButton button' src="assets/gui/Redo.png" alt="" onclick="Replay(); ">
        <img class="playOnPauseButton button" src="assets/gui/Play.png" alt=""
          onclick="PauseToggle(); ">
        <img class='homeButton button' src="assets/gui/Home.png" alt="" onclick="GoToHome(); ">
      </div>
    </div>
    <div class="gameOver insideScreenRatio hide">
      <div class='HIandRecord'></div>
      <div class="score gameOverScore"></div>      
      <div class="gameOverCoinsHolder">
        <div class="gameOverCoins"></div>
        <img class='payForLifeImg'src="assets/sprites/collect/coin.png" alt="">
     </div>
      <div class="saveMeHolder">
        save me!
        <div class="saveMeButtonsHolder">
          <div class="payForLife smallBtn saveBtn" onclick="payForLife()">
            100
            <img class='payForLifeImg'src="assets/sprites/collect/coin.png" alt="">
         </div>
           <img class='smallBtn saveBtn' src="assets/gui/add.png" alt=""
             onclick="showRevawardVideo(saveMe); "><br>
        </div>
        
        
      </div>
      
      <div class="buttonHolder">
        <img class='homeButton button' src="assets/gui/Home.png" alt="" onclick="GoToHome(); ">
        <img class='replayButton button' src="assets/gui/Redo.png" alt="" onclick="Replay(); ">
      </div>
    </div>
    <div class="mainMenu mainBg hide screenRatio">
      <div class="mainMenuSide">
        <ul class="circles">
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
        <div class='mainTitle'>
          hood run
        </div>

        <div class="mainMenuButtons">

          <div class='storeButton  menuButton'
            onclick="toggleHide(storeBlock); storeCoinsText.innerText = Number(mainCoinBlock.innerText); storeSound.play()">
            <img src="assets/gui/cart.png" alt="">
            store
          </div>
          <div class='playButton  menuButton' ">
            <img src="assets/gui/Play.png" alt="">
            play
          </div>
          <div class='achivesButton  menuButton' onclick="toggleHide(achivesBlock); ">
            <img src="assets/gui/achives.png" alt="">
            achives
          </div>
        </div>
        <div class="mainLeftInfo">
          <div class="mainLeftWrapper">
            <img id='prizeImg' src="assets/gui/prize.png">
            <div class='HighScoreBlock mainStatText'></div>
          </div>
          <div class="mainLeftWrapper">
            <img id='coinImg' src="assets/sprites/collect/coin.png">
            <div class='mainCoinsText mainStatText'></div>
          </div>
        </div>


        <div class="rightTopBlock">
          <img class='smallBtn soundBtn' onclick="mutePage(); " alt="">
        </div>

      </div>
    </div>
    <div class="tutorial  hide"></div>
    <div class="achives mainBg screenRatio hide">
      <div class="statsHolder">
        <div class="stat" id="numberOfDeathsBlock"></div>
        <div class='stat ' id="numberOfJumpsBlock"></div>
        <div class='stat' id="numberOfSlidesBlock"></div>
      </div>
      <div class="achivesHolder">
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/pioneer.png" alt="">
          <div class='achiveText'>
            <p>Pioneer</p>
            Score 100 points
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/bomb.png" alt="">
          <div class='achiveText'>
            <p>Extreme</p>
            Score 300 points
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/motorbike.png" alt="">
          <div class='achiveText'>
            <p>Racer</p>
            Score 500 points
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/trees.png" alt="">
          <div class='achiveText'>
            <p>Run forest, run</p>
            Score 750 points
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/gigachad.png" alt="">
          <div class='achiveText'>
            <p>Gigachad</p>
            Score 1000 points
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/dead cat.png" alt="">
          <div class='achiveText'>
            <p>Puss in boots</p>
            Die 8 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/guitar.png" alt="">
          <div class='achiveText'>
            <p>Smells like Nirvana</p>
            Die 27 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/earth.png" alt="">
          <div class='achiveText'>
            <p>Main question</p>
            Die 42 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/skull.png" alt="">
          <div class='achiveText'>
            <p>Memento mori</p>
            Die 100 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/bouncer.png" alt="">
          <div class='achiveText'>
            <p>Bouncer</p>
            Jump 500 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/slide.png" alt="">
          <div class='achiveText'>
            <p>On the ground</p>
            Slide under barriers 300 times
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/sprites/collect/shieldIcon.png" alt="">
          <div class='achiveText'>
            <p>S.H.I.E.L.D.</p>
            Upgrade shield to max
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/sprites/collect/boosterIcon.png" alt="">
          <div class='achiveText'>
            <p>Flash</p>
            Upgrade booster to max
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/sprites/collect/coin.png" alt="">
          <div class='achiveText'>
            <p>Uncle Pennybags</p>
            Earn 1000 coins
          </div>
        </div>
        <div class="achiveBlock lock"><img class='achiveImg' src="assets/gui/success.png" alt="">
          <div class='achiveText'>
            <p>All for one</p>
            Unlock all achives
          </div>
        </div>
      </div>
      <div class="return-btn-holder">
        <button class='btn return-btn' onclick="toggleHide(achivesBlock); ">
          Return
        </button>
      </div>
    </div>
    <div class="store mainBg screenRatio hide">
      <div class="storeHolder">
        <div class="storeBack"></div>
        <div class="storeCoins">
          <div class="storeCoinsText"></div>
          <img src="./assets/sprites/collect/coin.png" alt="">
        </div>
          <img class='addBtn' src="assets/gui/add.png" alt=""
            onclick="showRevawardVideo(addCoins); "><br>
        <div class="upgradesWrapper">
          <div class="upgrade">
            <div class="shieldUpgradeHolder">
              Shield
              <div class="upgradeHolder">
                <img src="assets/sprites/collect/shieldIcon.png" alt="">
                <div class="upgradeProgress">
                  <div class="upgradeLevel shieldLevel"></div>
                  <div class="upgradeLevel shieldLevel"></div>
                  <div class="upgradeLevel shieldLevel"></div>
                  <div class="upgradeLevel shieldLevel"></div>
                </div>
              </div>
            </div>
            <div class="upgradeBtn smallBtn" onclick="Upgrade('shield')">
              <div class="upgradeBtnContent">
                <div class="shieldCost"></div>
                <img src="assets/sprites/collect/coin.png" class="upgradeCoinImg" alt="">
              </div>
            </div>
          </div>
          <div class="upgrade">
            <div class="boosterUpgradeHolder">
              Booster
              <div class="upgradeHolder">
                <img src="assets/sprites/collect/boosterIcon.png" alt="">
                <div class="upgradeProgress">
                  <div class="upgradeLevel boosterLevel"></div>
                  <div class="upgradeLevel boosterLevel"></div>
                  <div class="upgradeLevel boosterLevel"></div>
                  <div class="upgradeLevel boosterLevel"></div>
                </div>
              </div>
            </div>
            <div class="upgradeBtn smallBtn" onclick="Upgrade('booster')">
              <div class="upgradeBtnContent">
                <div class="boosterCost"></div>
                <img src="assets/sprites/collect/coin.png" class="upgradeCoinImg" alt="">
              </div>
            </div>
          </div>

        </div>
      </div>
      <button class='btn return-btn store-return-btn' onclick="toggleHide(storeBlock); ">
        Return
      </button>

  </main>

</body>

    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration === 'competition') {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
        this.customer,
        this.scoreTable,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }

    this.startGame(this.scoreTableContainerInstance);
  };

  startGame = () => {
    const canvas = document.getElementById('boomio-runner-canvas');
    const loader = new PxLoader();

    var ctx = canvas?.getContext('2d');
    var wrapperBlock = document.getElementsByClassName('wrapper')[0];

    var creditsBlock = document.getElementsByClassName('credits')[0];
    var storeBlock = document.getElementsByClassName('store')[0];
    var storeCoinsText = document.getElementsByClassName('storeCoinsText')[0];
    var achivesBlock = document.getElementsByClassName('achives')[0];
    var achivesBlocks = document.getElementsByClassName('achiveBlock');

    var pauseBlock = document.getElementsByClassName('pause')[0];
    var pauseButton = document.getElementsByClassName('pauseButton')[0];
    var gameOverBlock = document.getElementsByClassName('gameOver')[0];
    var mainMenuBlock = document.getElementsByClassName('mainMenu')[0];
    var controlBlock = document.getElementsByClassName('controlBlock')[0];

    var scoreBlock = document.getElementsByClassName('score')[0];
    var highScoreBlock = document.getElementsByClassName('HighScoreBlock')[0];

    var coinsBlock = document.getElementsByClassName('coins')[0];
    var mainCoinBlock = document.getElementsByClassName('mainCoinsText')[0];
    var coinsText = document.getElementsByClassName('coinsText')[0];
    var gameOverCoinsBlock = document.getElementsByClassName('gameOverCoins')[0];

    var GameOverScoreBlock = document.getElementsByClassName('score')[1];
    var HIandRecord = document.getElementsByClassName('HIandRecord')[0];
    var soundBtn = document.getElementsByClassName('soundBtn')[0];
    var rightButtonsBlock = document.getElementsByClassName('rightButtonsBlock')[0];
    var leftButtonsBlock = document.getElementsByClassName('leftButtonsBlock')[0];
    var loaderBlock = document.getElementsByClassName('loader')[0];
    var mainBgBlocks = document.getElementsByClassName('mainBg');
    var smallBtnBlocks = document.getElementsByClassName('smallBtn');

    var boosterLevels = document.getElementsByClassName('boosterLevel');
    var shieldLevels = document.getElementsByClassName('shieldLevel');

    var boosterCost = document.getElementsByClassName('boosterCost')[0];
    var shieldCost = document.getElementsByClassName('shieldCost')[0];

    var saveMeBlock = document.getElementsByClassName('saveMeHolder')[0];

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
    const toggleHide = (block) => block.classList.toggle('hide');
    const highScore = localStorage.getItem('HI') > 0 ? localStorage.getItem('HI') : 0;
    const myCoins = localStorage.getItem('myCoins') > 0 ? localStorage.getItem('myCoins') : 0;
    const numberOfJumps = localStorage.getItem('jumps') > 0 ? localStorage.getItem('jumps') : 0;
    const numberOfDeaths = localStorage.getItem('deaths') > 0 ? localStorage.getItem('deaths') : 0;
    const numberOfSlides = localStorage.getItem('slides') > 0 ? localStorage.getItem('slides') : 0;
    const shieldLevel =
      localStorage.getItem('shieldLevel') > 1 ? localStorage.getItem('shieldLevel') : 1;
    const boosterLevel =
      localStorage.getItem('boosterLevel') > 1 ? localStorage.getItem('boosterLevel') : 1;

    // Load sprites
    const runSprites = loadSprites(
      loader,
      'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/6823c695645059309df3dbf37840360a5cf94e0c/src/widgets/runnerWidget/assets/sprites/run',
      8,
    );
    const slideSprites = loadSprites(loader, './assets/sprites/slide', 6);
    const jumpSprites = loadSprites(loader, './assets/sprites/jump', 6);
    const deathSprites = loadSprites(loader, './assets/sprites/death', 4);
    const barriersSprites = loadSprites(loader, './assets/sprites/barriers', 7);
    const bgSprites = loadSprites(loader, './assets/bg', 8);
    const fgSprites = loadSprites(loader, './assets/fg', 2);

    const CollectSprites = [
      loader.addImage('./assets/sprites/collect/shield.png'),
      loader.addImage('./assets/sprites/collect/shieldIcon.png'),
      loader.addImage('./assets/sprites/collect/boosterIcon.png'),
      loader.addImage('./assets/sprites/collect/coin.png'),
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
            (((!this.topBarrier && this.x < -1.5 * barrierWidth) ||
              (this.topBarrier && this.x < -5 * barrierWidth) ||
              this.y < -500) &&
              !this.kicked) ||
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
        var playerWidth =
          (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
        var playerHeight =
          (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
        var barrierWidth = canvas.height / 3.5;
        var barrierHight =
          canvas.height / 3.5 / (object.image.naturalWidth / object.image.naturalHeight);
        var hit = false;

        if (object.topBarrier) {
          if (
            this.x + playerWidth / 2.5 > object.x &&
            this.x < object.x + (barrierWidth * object.sizeCoef) / 1.2
          ) {
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
            if (
              this.y - jumpHeight + playerHeight > object.y * 1.1 &&
              this.y - jumpHeight < object.y + barrierHight * object.sizeCoef
            ) {
              if (player.shield) {
                if (object.isCoin) {
                  if (!object.kicked) {
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
                    coins += 1;
                  }
                  object.kicked = true;
                  console.log(coins);
                }
                if (!object.isBooster && !object.isShield && !object.isCoin) hit = true;
              }
            }
          }
        }
        return hit;
      }
    }

    var player = new GameObject(
      runSprites[0],
      0.2 * canvas.width,
      canvas.height - wrapperBlock.offsetHeight / 2.5,
      true,
    );

    window.addEventListener('resize', Resize);
    Resize();
    updateAchives();

    function initializeGameLoader() {
      let pageMuted;
      if (
        typeof localStorage.getItem('pageMuted') === 'undefined' ||
        localStorage.getItem('pageMuted') === null
      ) {
        localStorage.setItem('pageMuted', '');
        pageMuted = false;
      } else {
        pageMuted = Boolean(localStorage.getItem('pageMuted'));
      }

      loader.start();

      if ('mediaSession' in navigator) {
        // Media session logic can be added here
      }

      loader.addCompletionListener(() => {
        window.addEventListener('load', function () {
          if (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
          ) {
            rightButtonsBlock.classList.remove('hide');
            leftButtonsBlock.classList.remove('hide');
          }

          for (let i = 0; i < mainBgBlocks.length; i += 1) {
            mainBgBlocks[i].style.backgroundImage = './stuff/bg.png';
          }

          for (let i = 0; i < smallBtnBlocks.length; i += 1) {
            smallBtnBlocks[i].style.backgroundImage = './stuff/bg.png';
          }

          toggleHide(mainMenuBlock);
          toggleHide(loaderBlock);
          toggleHide(controlBlock);
          bgRatio = bgSprites[0].naturalWidth / bgSprites[0].naturalHeight;
          gameInit();
        });
      });
    }

    const keyRightHandler = (e) => {
      console.log('asda');
      if (e.keyCode == 39 || e.keyCode == 68) {
        //right
        rightPressed = true;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        //left
        leftPressed = true;
      }
      if (e.keyCode == 87 || e.keyCode == 38) {
        //jump
        jumpBegin();
      }
      if (e.keyCode == 83 || e.keyCode == 40) {
        //slide
        slideBegin();
      }

      if (e.keyCode == 27 && !gameOver) {
        //pause
        PauseToggle();
      }
    };

    const keyLeftHandler = (e) => {
      console.log('asda');

      if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
      }
      if (e.keyCode == 83 || e.keyCode == 40) {
        slideEnd();
      }
      if (e.keyCode == 32 && gameOver == true) {
        Replay();
      }
    };

    const ResetGlobalVariables = () => {
      objects = [];
      coins = 0;
      player.x = 0.2 * canvas.width;
      gameOver = false;
      pause = false;
      player.rise = false;
      player.shield = false;
      player.boostTimer = 0;
      player.boost = false;
      player.dead = false;
      speed = canvas.clientWidth / 115;
      player.y = canvas.height - wrapperBlock.offsetHeight / 2.5;
      score = 0;
      leftPressed = false;
      rightPressed = false;
      document.removeEventListener('keydown', keyRightHandler, false);
      document.removeEventListener('keyup', keyLeftHandler, false);
    };

    const PlayButtonActivate = () => {
      console.log('asda');

      const toggleHide = (block) => block.classList.toggle('hide');

      ResetGlobalVariables();
      console.log('a');
      document.addEventListener('keydown', keyRightHandler, false);
      document.addEventListener('keyup', keyLeftHandler, false);
      toggleHide(mainMenuBlock);
      toggleHide(pauseButton);
      toggleHide(scoreBlock);
      toggleHide(coinsBlock);
      saveMeBlock.classList.remove('hide');

      controlBlock.style.opacity = 1;
      setTimeout(() => (controlBlock.style.opacity = 0), 2000);
      Start();
    };
    document.querySelector('.playButton').addEventListener('click', PlayButtonActivate);

    const PauseToggle = () => {
      const toggleHide = (block) => block.classList.toggle('hide');

      stopGame ? Start() : Stop();
      pause = pauseBlock.classList.contains('hide') ? true : false;
      toggleHide(pauseBlock);
      toggleHide(scoreBlock);
      toggleHide(coinsBlock);
      toggleHide(pauseButton);
    };

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
        //вправо
        player.x += speed;
      } else if (leftPressed && player.x > 0) {
        //влево
        player.x -= speed;
      }
      if (jumping) {
        //прыжок
        jumpCount += speed / (canvas.height / 75);
        jumpHeight =
          (canvas.height / 125) * jumpLength * Math.sin((Math.PI * jumpCount) / jumpLength);
      }
      if (jumpCount > jumpLength) {
        //приземление после прыжка
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

    const fg = [
      new Bg(fgSprites[0], 0, 0.3),
      new Bg(fgSprites[0], canvas.height * bgRatio, 0.3),
      new Bg(fgSprites[1], 0, 1),
      new Bg(fgSprites[1], canvas.height * bgRatio, 1),
    ];

    const CollectObjects = [new GameObject(CollectSprites[0], 0, 0, false)];

    function jumpBegin() {
      if (!player.slideing) {
        clearInterval(playerAnimate);
        playerAnimate = setInterval(() => {
          animate(player, jumpSprites);
        }, 100 + score / 10);
        jumping = true;
      }
    }
    function slideBegin() {
      if (!jumping) {
        player.slideing = true;
        slideing += 1;
        if (slideing == 1) {
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
          achivesBlocks[i].classList.remove('lock');
          unlockCount += 1;
        }
      }
      if (unlockCount == achivesBlocks.length - 1) {
        achivesBlocks[achivesBlocks.length - 1].classList.remove('lock');
      }
      document.getElementById('numberOfJumpsBlock').innerHTML = 'Jumps: ' + numberOfJumps;
      document.getElementById('numberOfDeathsBlock').innerHTML = 'Deaths: ' + numberOfDeaths;
      document.getElementById('numberOfSlidesBlock').innerHTML = 'Slides: ' + numberOfSlides;
    }

    function updateUpgrades() {
      for (let i = 0; i < shieldLevel; i += 1) {
        shieldLevels[i].classList.add('activeLevel');
      }
      for (let i = 0; i < boosterLevel; i += 1) {
        boosterLevels[i].classList.add('activeLevel');
      }
      if (shieldLevel < 4) {
        shieldCost.innerHTML = shieldLevel * 150;
      } else {
        shieldCost.innerHTML = 'MAX';
        document.getElementsByClassName('upgradeCoinImg')[0].classList.add('hide');
      }
      if (boosterLevel < 4) {
        boosterCost.innerHTML = boosterLevel * 150;
      } else {
        boosterCost.innerHTML = 'MAX';
        document.getElementsByClassName('upgradeCoinImg')[1].classList.add('hide');
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
      if (boost == 'shield') {
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
      player.shieldTimer = 0;
      player.boostTimer = 0;
      Stop();
      gameOverSound.play();
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
                toggleHide(coinsBlock);
                toggleHide(pauseButton);
                toggleHide(gameOverBlock);
                gameOverCoinsBlock.innerText =
                  Number(localStorage.getItem('myCoins')) + Number(coins);
                player.dead = false;
                showFullAdd();
                if (score > highScore) {
                  HIandRecord.innerHTML = 'new record!';
                  highScore = Number(score.toFixed(0));
                  localStorage.setItem('HI', score.toFixed(0));
                } else {
                  HIandRecord.innerText = 'HighScore: ' + highScore;
                }
                if (player.rise) {
                  saveMeBlock.classList.add('hide');
                }
                updateAchives();
              }, 80);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }

    function Replay() {
      if (gameOver) {
        localStorage.setItem('myCoins', Number(localStorage.getItem('myCoins')) + Number(coins));
        mainCoinBlock.innerText = localStorage.getItem('myCoins');
        toggleHide(gameOverBlock);
        toggleHide(pauseButton);
        toggleHide(scoreBlock);
        toggleHide(coinsBlock);
        saveMeBlock.classList.remove('hide');
      }
      if (pause) {
        toggleHide(pauseBlock);
        toggleHide(pauseButton);
        toggleHide(scoreBlock);
        toggleHide(coinsBlock);
      }
      ResetGlobalVariables();
      document.addEventListener('keydown', keyRightHandler, false);
      document.addEventListener('keyup', keyLeftHandler, false);
      Start();
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

    function showScoreAndCoins() {
      score += 0.12;
      scoreBlock.innerText =
        '0'.repeat(4 - String(score.toFixed(0).length)) + String(score.toFixed(0));
      coinsText.innerText = '0'.repeat(3 - String(coins).length) + coins;
    }

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
        if (RandomInteger(0, 1) == 1) {
          x = (4 * canvas.width) / 3;
          y =
            pos == 'top'
              ? canvas.height - wrapperBlock.offsetHeight / 1.4
              : canvas.height - wrapperBlock.offsetHeight / 3.1;
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

        if (RandomInteger(0, speed * 1.1) > speed) {
          if (objects.length == 0 || objects.at(-1).x < canvas.width - 100) {
            objects.push(
              new GameObject(
                barriersSprites[0],
                (4 * canvas.width) / 3.1,
                canvas.height - wrapperBlock.offsetHeight / 2.7,
                false,
              ),
            );
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
                objects.at(-1).y =
                  canvas.height -
                  canvas.height /
                    2.58 /
                    (objects.at(-1).image.naturalWidth / objects.at(-1).image.naturalHeight);
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
                if (
                  !objects.at(-1).isBooster &&
                  !player.boost &&
                  !objects.at(-1).isShield &&
                  !player.shield
                ) {
                  if (RandomInteger(0, 100) > 70) {
                    objects.at(-1).image = CollectSprites[1];
                    objects.at(-1).isShield = true;
                    objects.at(-1).sizeCoef = 0.5;
                    objects.at(-1).y =
                      RandomInteger(0, 1) == 1
                        ? canvas.height - wrapperBlock.offsetHeight / 2.5
                        : canvas.height - wrapperBlock.offsetHeight / 1.3;
                  }
                  if (RandomInteger(0, 100) > 70) {
                    objects.at(-1).image = CollectSprites[2];
                    objects.at(-1).isBooster = true;
                    objects.at(-1).sizeCoef = 0.5;
                    objects.at(-1).y =
                      RandomInteger(0, 1) == 1
                        ? canvas.height - wrapperBlock.offsetHeight / 2.5
                        : canvas.height - wrapperBlock.offsetHeight / 1.3;
                  }
                  break;
                }
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

          if (hit) {
            player.dead = true;
          }
        }

        player.Update();

        if (player.dead) {
          numberOfDeaths = Number(numberOfDeaths) + 1;
          localStorage.setItem('deaths', numberOfDeaths);
          gameOver = true;
          GameOver();
        }

        speed += 0.001;

        Draw();
        Move();
        showScoreAndCoins();
      }
    }

    function Draw() {
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < bg.length; i += 1) {
        bg[i].image.addEventListener(
          'load',
          ctx.drawImage(
            bg[i].image,
            0,
            0,
            bg[i].image.naturalWidth,
            bg[i].image.naturalHeight,
            bg[i].x,
            bg[i].y,
            canvas.height * bgRatio,
            canvas.height,
          ),
        );
      }

      for (var i = 0; i < objects.length; i++) {
        DrawObject(objects[i]);
      }
      ctx.imageSmoothingEnabled = false;
      DrawObject(player);
      if (player.boost) {
        if (player.boostTimer == 0) {
          clearInterval(playerAnimate);
          playerAnimate = setInterval(() => {
            animate(player, runSprites);
          }, 30);
          player.boostTimer += 1;
          player.shield = true;
          normalSpeed = speed;
          speed = speed * 5;
        }
      }
      for (var i = 0; i < (player.boost ? fg.length : fg.length - 2); i += 1) {
        fg[i].image.addEventListener(
          'load',
          ctx.drawImage(
            fg[i].image,
            0,
            0,
            fg[i].image.naturalWidth,
            fg[i].image.naturalHeight,
            fg[i].x,
            fg[i].y,
            canvas.height * bgRatio,
            canvas.height,
          ),
        );
      }

      if (player.shield) {
        CollectObjects[0].x = player.x;
        CollectObjects[0].y = player.y - jumpHeight;
        player.shieldTimer += 1;
        if (player.boost) {
          score += 0.12;
        }
        if (player.shieldTimer == activeTime) {
          setTimeout(() => {
            CollectObjects[0].image = new Image();
            DrawObject(CollectObjects[0]);
            if (player.boost) {
              clearInterval(playerAnimate);
              playerAnimate = setInterval(() => {
                animate(player, runSprites);
              }, 75);
              player.boost = false;
              speed = normalSpeed;
              player.boostTimer = 0;
            }
            setTimeout(() => {
              CollectObjects[0].image = CollectSprites[0];
              DrawObject(CollectObjects[0]);
              setTimeout(() => {
                CollectObjects[0].image = new Image();
                DrawObject(CollectObjects[0]);
                setTimeout(() => {
                  CollectObjects[0].image = CollectSprites[0];
                  DrawObject(CollectObjects[0]);
                  setTimeout(() => {
                    CollectObjects[0].image = new Image();
                    DrawObject(CollectObjects[0]);
                    setTimeout(() => {
                      CollectObjects[0].image = CollectSprites[0];
                      DrawObject(CollectObjects[0]);
                      setTimeout(() => {
                        CollectObjects[0].image = new Image();
                        DrawObject(CollectObjects[0]);
                        setTimeout(() => {
                          CollectObjects[0].image = CollectSprites[0];
                          DrawObject(CollectObjects[0]);
                          setTimeout(() => {
                            CollectObjects[0].image = new Image();
                            DrawObject(CollectObjects[0]);
                            setTimeout(() => {
                              CollectObjects[0].image = CollectSprites[0];
                              DrawObject(CollectObjects[0]);
                              setTimeout(() => {
                                CollectObjects[0].image = new Image();
                                DrawObject(CollectObjects[0]);
                                setTimeout(() => {
                                  CollectObjects[0].image = CollectSprites[0];
                                  DrawObject(CollectObjects[0]);
                                  player.shield = false;
                                  player.shieldTimer = 0;
                                  setTimeout(() => {
                                    CollectObjects[0].image = new Image();
                                    DrawObject(CollectObjects[0]);
                                    setTimeout(() => {
                                      CollectObjects[0].image = CollectSprites[0];
                                      DrawObject(CollectObjects[0]);
                                      setTimeout(() => {
                                        CollectObjects[0].image = new Image();
                                        DrawObject(CollectObjects[0]);
                                        setTimeout(() => {
                                          CollectObjects[0].image = CollectSprites[0];
                                          DrawObject(CollectObjects[0]);
                                          setTimeout(() => {
                                            CollectObjects[0].image = new Image();
                                            DrawObject(CollectObjects[0]);
                                            setTimeout(() => {
                                              CollectObjects[0].image = CollectSprites[0];
                                              DrawObject(CollectObjects[0]);
                                              setTimeout(() => {
                                                CollectObjects[0].image = new Image();
                                                DrawObject(CollectObjects[0]);
                                                setTimeout(() => {
                                                  CollectObjects[0].image = CollectSprites[0];
                                                  DrawObject(CollectObjects[0]);
                                                  setTimeout(() => {
                                                    CollectObjects[0].image = new Image();
                                                    DrawObject(CollectObjects[0]);
                                                    setTimeout(() => {
                                                      CollectObjects[0].image = CollectSprites[0];
                                                      DrawObject(CollectObjects[0]);
                                                      setTimeout(() => {
                                                        CollectObjects[0].image = new Image();
                                                        DrawObject(CollectObjects[0]);
                                                        setTimeout(() => {
                                                          CollectObjects[0].image =
                                                            CollectSprites[0];
                                                          DrawObject(CollectObjects[0]);
                                                          setTimeout(() => {
                                                            CollectObjects[0].image = new Image();
                                                            DrawObject(CollectObjects[0]);
                                                            setTimeout(() => {
                                                              CollectObjects[0].image =
                                                                CollectSprites[0];
                                                              DrawObject(CollectObjects[0]);
                                                              setTimeout(() => {
                                                                CollectObjects[0].image =
                                                                  new Image();
                                                                DrawObject(CollectObjects[0]);
                                                                setTimeout(() => {
                                                                  CollectObjects[0].image =
                                                                    CollectSprites[0];
                                                                  DrawObject(CollectObjects[0]);
                                                                  setTimeout(() => {
                                                                    CollectObjects[0].image =
                                                                      new Image();
                                                                    DrawObject(CollectObjects[0]);
                                                                    setTimeout(() => {
                                                                      CollectObjects[0].image =
                                                                        CollectSprites[0];
                                                                      DrawObject(CollectObjects[0]);
                                                                      setTimeout(() => {
                                                                        CollectObjects[0].image =
                                                                          new Image();
                                                                        DrawObject(
                                                                          CollectObjects[0],
                                                                        );
                                                                        setTimeout(() => {
                                                                          CollectObjects[0].image =
                                                                            CollectSprites[0];
                                                                          DrawObject(
                                                                            CollectObjects[0],
                                                                          );
                                                                          setTimeout(() => {
                                                                            CollectObjects[0].image =
                                                                              new Image();
                                                                            DrawObject(
                                                                              CollectObjects[0],
                                                                            );
                                                                            setTimeout(() => {
                                                                              CollectObjects[0].image =
                                                                                CollectSprites[0];
                                                                              DrawObject(
                                                                                CollectObjects[0],
                                                                              );
                                                                              setTimeout(() => {
                                                                                CollectObjects[0].image =
                                                                                  new Image();
                                                                                DrawObject(
                                                                                  CollectObjects[0],
                                                                                );
                                                                                setTimeout(() => {
                                                                                  CollectObjects[0].image =
                                                                                    CollectSprites[0];
                                                                                  DrawObject(
                                                                                    CollectObjects[0],
                                                                                  );
                                                                                  setTimeout(() => {
                                                                                    CollectObjects[0].image =
                                                                                      new Image();
                                                                                    DrawObject(
                                                                                      CollectObjects[0],
                                                                                    );
                                                                                    setTimeout(
                                                                                      () => {
                                                                                        CollectObjects[0].image =
                                                                                          CollectSprites[0];
                                                                                        DrawObject(
                                                                                          CollectObjects[0],
                                                                                        );
                                                                                        setTimeout(
                                                                                          () => {
                                                                                            CollectObjects[0].image =
                                                                                              new Image();
                                                                                            DrawObject(
                                                                                              CollectObjects[0],
                                                                                            );
                                                                                            setTimeout(
                                                                                              () => {
                                                                                                CollectObjects[0].image =
                                                                                                  CollectSprites[0];
                                                                                                DrawObject(
                                                                                                  CollectObjects[0],
                                                                                                );
                                                                                                player.shield = false;
                                                                                                player.shieldTimer = 0;
                                                                                              },
                                                                                              50,
                                                                                            );
                                                                                          },
                                                                                          50,
                                                                                        );
                                                                                      },
                                                                                      50,
                                                                                    );
                                                                                  }, 50);
                                                                                }, 50);
                                                                              }, 50);
                                                                            }, 50);
                                                                          }, 50);
                                                                        }, 50);
                                                                      }, 50);
                                                                    }, 50);
                                                                  }, 50);
                                                                }, 50);
                                                              }, 50);
                                                            }, 50);
                                                          }, 50);
                                                        }, 50);
                                                      }, 50);
                                                    }, 50);
                                                  }, 50);
                                                }, 50);
                                              }, 50);
                                            }, 50);
                                          }, 50);
                                        }, 50);
                                      }, 50);
                                    }, 50);
                                  }, 50);
                                }, 50);
                              }, 50);
                            }, 50);
                          }, 50);
                        }, 50);
                      }, 50);
                    }, 50);
                  }, 50);
                }, 50);
              }, 50);
            }, 50);
          }, 50);
        } else {
          DrawObject(CollectObjects[0]);
        }
      }
    }
    function DrawObject(object) {
      // Define widths and heights based on whether the object is the player or not
      const playerWidth =
        (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
      const playerHeight =
        (canvas.height / 5) * (player.image.naturalWidth / player.image.naturalHeight);
      const barrierWidth = canvas.height / 3.5;
      const barrierHeight =
        canvas.height / 3.5 / (object.image.naturalWidth / object.image.naturalHeight);

      // Check if the image is loaded
      if (object.image.complete) {
        // If image is already loaded, draw immediately
        ctx.drawImage(
          object.image,
          object.x,
          object.isPlayer ? object.y - jumpHeight : object.y,
          object.isPlayer ? playerWidth : barrierWidth * object.sizeCoef,
          object.isPlayer ? playerHeight : barrierHeight * object.sizeCoef,
        );
      } else {
        // If image is not loaded, wait for the load event
        object.image.addEventListener('load', () => {
          ctx.drawImage(
            object.image,
            object.x,
            object.isPlayer ? object.y - jumpHeight : object.y,
            object.isPlayer ? playerWidth : barrierWidth * object.sizeCoef,
            object.isPlayer ? playerHeight : barrierHeight * object.sizeCoef,
          );
        });

        // It's also good to handle error in case the image fails to load
        object.image.addEventListener('error', () => {
          console.error('Failed to load image:', object.image.src);
        });
      }
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
