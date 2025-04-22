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
import { DownloadScoreTableContainer } from '../helpers/DownloadScoreTableContainer';
import { RulesContainerPigu } from '../helpers/RulesContainerPigu';
import { CompetitionCodeScoreTableContainer } from '../helpers/CompetitionCodeScoreTableContainer';
import { CompetitionCodeScoreTableContainerPigu } from '../helpers/CompetitionCodeScoreTableContainerPigu';
import { RulesContainer } from '../helpers/RulesContainer';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { CompetitionCodeScoreTableLastContainerPigu } from '../helpers/CompetitionCodeScoreTableLastContainerPigu';

import {
  close,
  introGif,
  scoreImage,
  tapImageBarbora,
  checkIcon,
  uncheckIcon,
  mainBarbora,
  mainPenki,
  star,
  introGifPenki,
  scoreImageGreen,
  mainFantazijos,
  scoreImageFantazijos,
  introGifFantazijos,
  newRecord,
  newRecordRU,
  newRecordEE,
  newRecordFI,
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
  SaludSAIntro,
  SaludSABackground,
  SaludSARecord,
  PiguBackground,
  PiguIntro,
  PIGUBackgroundfi,
  PIGUBackgroundlv,
  PIGUBackgroundlt,
  PIGUBackgroundee,
  ChristmasPiguFlapThroughXmasEEEnNew,
  ChristmasPiguFlapThroughXmasEENew,
  ChristmasPiguFlapThroughXmasEERuNew,
  ChristmasPiguFlapThroughXmasFIEnNew,
  ChristmasPiguFlapThroughXmasFINew,
  ChristmasPiguFlapThroughXmasLTEnNew,
  ChristmasPiguFlapThroughXmasLTNew,
  ChristmasPiguFlapThroughXmasLTRuNew,
  ChristmasPiguFlapThroughXmasLVEnNew,
  ChristmasPiguFlapThroughXmasLVNew,
  ChristmasPiguFlapThroughXmasLVRuNew,
  PIGUFirstEE,
  PIGUFirstLT,
  PIGUFirstFI,
  PIGUFirstLV,
  PIGUSecondEE,
  PIGUSecondLT,
  PIGUSecondFI,
  PIGUSecondLV,
  DentsuBackground,
  DentsuIntro,
  demoGame1,
  demoGame2,
  demoGame3,
  demoGame4,
  demoGame5,
  demoGame6,
  demoGame7,
  demoGame8,
  demoGame9,
  demoGame10,
} from './constants';
class FlappyBird {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.gameClosed = false;
    this.showCompetitiveRegistration =
      this?.config?.game_type !== '' ? this.config.game_type : 'competition';
    this.userBestPlace = 0;
    this.scoreTable = {};
    this.isJumping = false;
    this.customer = this.config.business_name ? this.config.business_name : 'demo-1';
    const currentPageUrl = window.location.href;

    const urlParams = new URL(currentPageUrl).searchParams;
    const languageParam = urlParams.get('language');
    this.language = this.customer === 'Pigu.lt' ? languageParam : this.config.language ?? 'EN';
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;

    this.campaignUrl = this.config.campaignUrl ? this.config.campaignUrl : '';
    this.checkboxChange = false;
    this.checkboxChange2 = false;
    this.checkboxChange3 = false;

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
    this.isMobileHeightSmall = window.innerHeight <= 600;

    this.newHighScoreReached = false;
    this.scoreTableContainerInstance;
    const params = new URLSearchParams(window.location.search);

    this.game_code = params.get('game_code');
  }

  showRulesOrRegistration() {
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const user_id = urlParams.get('user_id');

    if (this.customer === 'Pigu.lt' && this.bestScore <= 0) {
      const checkboxImg3 = document.querySelector('.boomio-rules-privacyCheckbox');
      checkboxImg3.addEventListener('click', () => {
        this.checkboxChange3 = !this.checkboxChange3;
        const checkboxImgChange3 = document.getElementById('boomio-rules-privacyCheckbox-img');
        checkboxImgChange3.src = this.checkboxChange3 ? checkIcon : uncheckIcon;
      });
    }
    if (this.showCompetitiveRegistration && this.campaignUrl === '') {
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
        if (this.customer !== 'SaludSA') {
          const canvas = document.getElementById('flappy-canvas');
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
        } else {
          boomioService
            .signal('', 'user_info', {
              emails_consent: this.checkboxChange,
              user_email:
                this.customer === 'SaludSA' ? new Date().toISOString() : emailInput?.value,
              user_name:
                this.customer === 'SaludSA' ? new Date().toISOString() : playerNameInput?.value,
            })
            .then((response) => {
              this.bestScore = response.user_best_score;
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
                  inputContainer.style.height = this.customer === 'Pigu.lt' ? '400px' : '332px';
                  inputContainer.style.top = `calc(50% + ${
                    this.isMobileHeightSmall ? '110px' : '180px'
                  })`;
                  inputContainer.style.opacity = 1;
                }, 100);
              }, 300);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }, 300);
    } else if (this.customer === 'Pigu.lt' && user_id !== '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          this.bestScore = response.user_best_score;
          this.didYouKnowContainer.updateProps(this.customer, this.scoreTable);

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
            this.bestScore = response.user_best_score;

            this.showRulesPigu();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if (this.customer === 'Pigu.lt' && user_id === '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          this.bestScore = response.user_best_score;

          this.showRulesPigu();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setTimeout(() => {
        const canvas = document.getElementById('flappy-canvas');
        document.getElementById('background_blur').style.opacity =
          this.language === 'LV' ? 0.4 : 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'blur(2px)';
        const inputContainer = document.querySelector('.input-container');
        console.log('Displaying input-container for SaludSA');
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
  }

  showRulesPigu() {
    this.config = localStorageService.getDefaultConfig();
    this.bestScore = this.config.bestScore ? this.config.bestScore : 0;

    if (this.bestScore > 0) {
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
    setTimeout(() => {
      const canvas = document.getElementById('flappy-canvas');
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
        inputContainer.style.top = `calc(50% + ${this.isMobileHeightSmall ? '110px' : '180px'})`;
        inputContainer.style.opacity = 1;
      }, 100);
    }, 300);
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
    const randomChoice = Math.round(Math.random());
    img.src =
      this.customer === 'SaludSA'
        ? SaludSABackground
        : this.campaignUrlProp === 'https://pigu.lt'
        ? randomChoice === 0
          ? PIGUFirstLT
          : PIGUSecondLT
        : this.campaignUrlProp === 'https://220.lv'
        ? randomChoice === 0
          ? PIGUFirstLV
          : PIGUSecondLV
        : this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee'
        ? randomChoice === 0
          ? PIGUFirstEE
          : PIGUSecondEE
        : this.campaignUrlProp === 'https://hobbyhall.fi'
        ? randomChoice === 0
          ? PIGUFirstFI
          : PIGUSecondFI
        : this.customer === 'Barbora'
        ? mainBarbora
        : this.customer === 'Fantazijos'
        ? mainFantazijos
        : this.customer === 'Fpro'
        ? FproFlappyBackground
        : this.customer === 'Makalius'
        ? MakaliusFlappyBackground
        : this.customer === 'Corepetitus'
        ? CorepetitusFlappyBackground
        : this.customer === 'Dentsu'
        ? DentsuBackground
        : this.customer === 'demo-1'
        ? demoGame1
        : this.customer === 'demo-2'
        ? demoGame2
        : this.customer === 'demo-3'
        ? demoGame3
        : this.customer === 'demo-4'
        ? demoGame4
        : this.customer === 'demo-5'
        ? demoGame5
        : this.customer === 'demo-6'
        ? demoGame6
        : this.customer === 'demo-7'
        ? demoGame7
        : this.customer === 'demo-8'
        ? demoGame8
        : this.customer === 'demo-9'
        ? demoGame9
        : this.customer === 'demo-10'
        ? demoGame10
        : this.customer === 'Penki Sezonai' && mainPenki;

    // img.src = 'https://i.ibb.co/MP91zG9/Spring-2.png';

    const img2 = new Image();
    img2.src = 'https://i.ibb.co/SrtXMFx/Boomio-demo-penguin.png';

    const img3 = new Image();
    img3.src = 'https://i.ibb.co/xq7Yf83/Boomio-demo-3-1.png';

    const snowImg = new Image();
    snowImg.src = snowFantazijos;

    let snowOffset = 0; // Initial offset for snow GIF animation
    let snowSpeed = this.customer === 'SaludSA' ? 0.3 : 0.4; // Adjust the this.speed of the falling snow
    this.speed = this.customer === 'SaludSA' ? 2.5 : 4;
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

      setTimeout(
        () => {
          document.getElementById('flappy-canvas').style.transition = 'opacity 1s ease';
          document.getElementById('flappy-canvas').style.opacity = 1;

          document.getElementById('background_intro').style.transition = 'opacity 1s ease';
          document.getElementById('background_intro').style.opacity = 0;
          if (this.gameCount === 0) {
            document.getElementById('background_blur').style.display = 'block';
            document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
            this.showRulesOrRegistration();
          }
          if (this.gameCount === 0) {
            setTimeout(() => {
              document.getElementById('background_blur').style.opacity = 0.37;
              canvas.style.transition = 'filter 0.6s ease';
              canvas.style.filter = 'blur(2px)';
            }, 1000);
          }
          setTimeout(
            () => {
              const background = document.getElementById('background_intro');

              if (background) {
                background.style.display = 'none';
              }
            },
            this.customer.includes('demo') ? 0 : 2000,
          );
        },
        this.customer.includes('demo') ? 0 : 2000,
      );
      //gifas
      // flyHeight = canvas.height / 2 - size[1] / 2;
      pipes = [[canvas.width, pipeLoc()]];
      for (let i = 1; i < 3; i++) {
        pipes.push([pipes[i - 1][0] + pipeGap + pipeWidth, pipeLoc()]);
      }
    };

    let lastUpdateTime = Date.now();
    let elapsedTime = 0;

    const updateElapsedTime = () => {
      const currentTime = Date.now();
      elapsedTime = (currentTime - lastUpdateTime) / 1000; // Convert to seconds
      lastUpdateTime = currentTime;
    };

    function hideScore() {
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

    const render = () => {
      if (!this.gameClosed) {
        updateElapsedTime();
        this.index++;
        ctx.drawImage(
          img,
          0,
          0,
          418,
          canvas.height,
          -((this.index * (this.speed / 2)) % 418) + 418,
          0,
          420,
          canvas.height,
        );
        ctx.drawImage(
          img,
          0,
          0,
          418,
          canvas.height,
          -(this.index * (this.speed / 2)) % 418,
          0,
          420,
          canvas.height,
        );

        if (this.gamePlaying) {
          if (canvas.width > 450 || canvas.height < 600) {
            canvas.width =
              document.body.offsetWidth < 418
                ? document.body.offsetWidth < 321
                  ? '375px'
                  : document.body.offsetWidth
                : '418';
            canvas.height = '668';
          }
          pipes.map((pipe) => {
            // pipe moving
            pipe[0] -= this.speed;

            // top pipe
            ctx.drawImage(
              img,
              419,
              604 - pipe[1],
              pipeWidth,
              pipe[1],
              pipe[0],
              0,
              pipeWidth,
              pipe[1],
            );
            // bottom pipe
            ctx.drawImage(
              img,
              426 + pipeWidth,
              108,
              pipeWidth,
              canvas.height - pipe[1] + pipeGap,
              pipe[0],
              pipe[1] + pipeGap,
              pipeWidth,
              canvas.height - pipe[1] + pipeGap,
            );
            // give 1 point & create new pipe
            if (pipe[0] <= -pipeWidth) {
              this.currentScore = this.currentScore + 100;
              document.getElementById('currentScore').innerHTML = `${this.currentScore}`;

              if (this.currentScore > 1) {
                const currectScoreDiv = document.getElementsByClassName(
                  'boomio-score-input-container',
                )[0];
                currectScoreDiv.style.transition = 'opacity 0.8s ease';
                currectScoreDiv.style.display = 'block';
                currectScoreDiv.style.opacity = 1;
              }
              if (this.bestScore < this.currentScore) {
                this.newHighScoreReached = true;
              }
              // check if it's the best score
              this.bestScore = Math.max(this.bestScore, this.currentScore);

              // remove & create new pipe
              pipes = [
                ...pipes.slice(1),
                [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
              ];
              const targetPipeGap = Math.max(pipeGap - elapsedTime * 400, 130);
              pipeGap += (targetPipeGap - pipeGap) * 0.1; // Adjust the interpolation factor as needed
              snowSpeed = Math.min(snowSpeed + elapsedTime * 10, 3);
              const decayFactor = 2; // Adjust this value based on how quickly you want the jump to decrease
              const gravityFactor = 2;
              this.gravity = Math.min(this.gravity * Math.pow(gravityFactor, elapsedTime), 0.4);
              this.jump = Math.max(this.jump * Math.pow(decayFactor, elapsedTime), -7);
            }

            if (
              [
                pipe[0] <= cTenth - 10 + size[0],
                pipe[0] + pipeWidth >= cTenth,
                pipe[1] > flyHeight + 25 || pipe[1] + pipeGap < flyHeight - 25 + size[1],
              ].every((elem) => elem)
            ) {
              this.gamePlaying = false;

              if (this.gameCount === 0) {
                const canvas = document.getElementById('flappy-canvas');
                canvas.removeEventListener('click', this.clickEventHandler);

                document
                  .getElementById('startButtonClick1')
                  .addEventListener('click', this.clickEventHandlerButton);

                this.gameCount++;
              }

              setTimeout(
                () => {
                  if (
                    this.showCompetitiveRegistration === 'competition' ||
                    this.showCompetitiveRegistration === 'points' ||
                    this.showCompetitiveRegistration === 'collectable'
                  ) {
                    const clickEventHandlerResetGame = () => {
                      this.index = 0;
                      this.currentScore = 0;

                      const competitionTableContainer = document.querySelector(
                        '.competition-table-container',
                      );

                      competitionTableContainer.style.transition =
                        'height 1s ease, top 1s ease, opacity 1s ease';
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
                              document.getElementById('background_blur').style.display = 'none';
                              const canvas = document.getElementById('flappy-canvas');
                              canvas.style.transition = 'filter 1s ease';
                              canvas.style.filter = 'none';
                              this.gamePlaying = true;
                            })
                            .catch((error) => {
                              console.error('Error:', error);
                            });
                        }
                      }, 400);
                    };
                    hideScore();
                    boomioService
                      .signal('ROUND_FINISHED', 'signal', {
                        score: this.currentScore,
                      })
                      .then((response) => {
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
                        hideScore();
                        this.userBestPlace = response.user_best_place;
                        if (this.showCompetitiveRegistration === 'points') {
                          this.scoreTable = response;
                          this.scoreTableContainerInstance.updateProps(
                            this.customer,
                            this.scoreTable,
                            this.currentScore,
                          );
                          const competitionRestart =
                            document.getElementById('boomio-game-play-again');
                          competitionRestart.addEventListener('click', clickEventHandlerResetGame);
                        }

                        if (this.showCompetitiveRegistration === 'competition') {
                          this.scoreTable = response;
                          this.scoreTableContainerInstance.updateProps(
                            this.customer,
                            this.scoreTable,
                            this.currentScore,
                          );
                        }
                        if (this.showCompetitiveRegistration === 'collectable') {
                          if (this.customer !== 'Corepetitus') {
                            this.collection = response?.collection
                              ? response?.collection
                              : this.collection;
                            this.just_won = response?.just_won ? response?.just_won : this.just_won;
                            this.scoreTableContainerInstance.updateProps(
                              this.customer,
                              this.collectables,
                              this.collection,
                              this.just_won,
                            );
                          }
                        }
                        if (this.customer === 'Corepetitus') {
                          this.scoreTable = response;
                          this.scoreTableContainerInstance.updateProps(
                            this.customer,
                            this.scoreTable,
                            this.currentScore,
                          );
                        }
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });
                  }

                  if (this.showCompetitiveRegistration === 'competition') {
                    const canvas = document.getElementById('flappy-canvas');
                    let competitionTableContainer = '';
                    if (this.customer === 'Pigu.lt') {
                      competitionTableContainer = document.querySelector('.did-you-know-container');
                    } else {
                      competitionTableContainer = document.querySelector(
                        '.competition-table-container',
                      );
                    }
                    canvas.style.transition = 'filter 0.6s ease';
                    canvas.style.filter = 'blur(2px)';
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
                      'boomio-score-input-container',
                    )[0];
                    currectScoreDiv.style.opacity = 0;
                    setTimeout(() => {
                      currectScoreDiv.style.display = 'none';
                    }, 300);
                  } else {
                    const canvas = document.getElementById('flappy-canvas');
                    const competitionTableContainer = document.querySelector(
                      '.competition-table-container',
                    );
                    canvas.style.transition = 'filter 0.6s ease';
                    canvas.style.filter = 'blur(2px)';
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
                      'boomio-score-input-container',
                    )[0];
                    currectScoreDiv.style.opacity = 0;
                    setTimeout(() => {
                      currectScoreDiv.style.display = 'none';
                    }, 300);
                  }
                  setup();
                },
                this.newHighScoreReached ? 2500 : 100,
              );
            }
          });
        }

        if (this.gamePlaying) {
          if (this.isJumping) {
            ctx.drawImage(img, 506, 0, 80, 80, cTenth, flyHeight, 77, 80);
          } else {
            ctx.drawImage(img, 424, 0, 80, 80, cTenth, flyHeight, 77, 80);
          }
          this.flight += this.gravity;
          flyHeight = Math.min(flyHeight + this.flight, canvas.height - size[1]);
        } else {
          if (!this.newHighScoreReached) {
            ctx.drawImage(img, 424, 0, 80, 80, cTenth, flyHeight, 77, 80);
          }

          flyHeight = canvas.height / 2 - size[1] / 2 - 70;

          document.getElementById('bestScoreField').textContent = this.currentScore;
          document.getElementById('currentScoreField').textContent = this.bestScore;

          document.getElementById('bestScoreFieldConverted').textContent =
            this.config.discountType !== 'percentage'
              ? this.bestScore / 100 + '€'
              : this.bestScore > 5000
              ? '30%'
              : this.bestScore > 3000
              ? '20%'
              : this.bestScore > 1000
              ? '10%'
              : this.bestScore > 1
              ? '5%'
              : this.bestScore;

          this.discount =
            this.config.discountType !== 'percentage'
              ? this.bestScore / 100 + '€'
              : this.bestScore > 5000
              ? '30%'
              : this.bestScore > 3000
              ? '20%'
              : this.bestScore > 1000
              ? '10%'
              : this.bestScore > 1
              ? '5%'
              : this.bestScore;

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

            // Update the score digits content
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
          ctx.font = 'bold 30px monospace';
        }
        ctx.globalAlpha = 0.6; // Set transparency level (0 = fully transparent, 1 = fully opaque)

        if (!this.gameEnded && this.customer === '123') {
          ctx.drawImage(snowImg, 0, snowOffset, canvas.width, canvas.height);
          ctx.drawImage(snowImg, 0, snowOffset - canvas.height, canvas.width, canvas.height);
        }

        ctx.globalAlpha = 1; // Reset transparency to fully opaque

        // Update snow offset for animation
        snowOffset = (snowOffset + snowSpeed) % canvas.height;

        if (this.gamePlaying) {
          const easeOutQuad = (t) => t * (2 - t);
          const easingFactor = 0.1;
          const targetSpeed = Math.min(this.speed + elapsedTime * 0.2, 60); // 10 times faster
          this.speed += (targetSpeed - this.speed) * easeOutQuad(easingFactor);
        }
        setTimeout(function () {
          window.requestAnimationFrame(render);
        }, 1000 / 60);
      }
    };

    setup();
    img.onload = render;
  }

  closeGame = () => {
    const element = document.getElementById('boomio-flappy-container');
    if (element && element.parentNode) {
      this.gameClosed = true;
      element.parentNode.removeChild(element);
    }
  };

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
      this.language === 'ET' &&
      (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
        ? ChristmasPiguFlapThroughXmasEENew
        : this.language === 'RU' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? ChristmasPiguFlapThroughXmasEERuNew
        : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
        ? ChristmasPiguFlapThroughXmasLTNew
        : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
        ? ChristmasPiguFlapThroughXmasLTRuNew
        : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? ChristmasPiguFlapThroughXmasFINew
        : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
        ? ChristmasPiguFlapThroughXmasLTEnNew
        : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? ChristmasPiguFlapThroughXmasFIEnNew
        : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
        ? ChristmasPiguFlapThroughXmasLVNew
        : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
        ? ChristmasPiguFlapThroughXmasLVRuNew
        : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
        ? ChristmasPiguFlapThroughXmasLVEnNew
        : this.language === 'EN' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? ChristmasPiguFlapThroughXmasEEEnNew
        : this.customer === 'SaludSA'
        ? SaludSAIntro
        : this.customer === 'Barbora'
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
        : this.customer === 'Dentsu'
        ? DentsuIntro
        : this.customer === 'Penki Sezonai' && introGifPenki
    } alt="Image Description" style="z-index:4;width: ${
      document.body.offsetWidth < 418
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '418px'
    }; height: 668px;position:absolute;pointer-events: none; display:${
      this.customer.includes('demo') ? 'none' : 'block'
    };" id="background_intro">
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
      this.customer === 'SaludSA'
        ? SaludSARecord
        : this.language === 'EN'
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
    } 

alt="Image Description" style="width: 100%; height: 100%;">
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

<span class="numbers__window">

<span class="numbers__window__digit numbers__window__digit--6" data-fake="8395216407" id="bestScore6"></span>
</span></div>

<div style="position: absolute;z-index:999;pointer-events:none" class="tutorial">
${`<div style="${
  this.customer === 'Fpro' ? 'gap:50px' : 'gap:20px'
};display:flex;color: #FFF;text-shadow: 4px 4px 14px rgba(255, 255, 255, 0.41);font-family: Georama;font-size: 26px;font-weight: 900;line-height: 130%; /* 33.8px */ letter-spacing: -0.16px;text-transform: uppercase;">
    <div>${
      this.language === 'LV'
        ? 'KLIKŠĶINI'
        : this.language === 'EN'
        ? 'TAP'
        : this.language === 'RU'
        ? 'КЛИК'
        : this.language === 'EE'
        ? 'TAP'
        : this.language === 'ET'
        ? 'TÄPI'
        : this.language === 'ES'
        ? 'TAP'
        : this.customer === 'Fpro'
        ? 'TAP'
        : this.language === 'FI'
        ? 'NAPSAUTA'
        : this.customer === 'SaludSA'
        ? 'TAP'
        : 'BAKST'
    }</div>
    <div>${
      this.language === 'LV'
        ? 'KLIKŠĶINI'
        : this.language === 'EN'
        ? 'TAP'
        : this.language === 'RU'
        ? 'КЛИК'
        : this.language === 'ET'
        ? 'TÄPI'
        : this.language === 'EE'
        ? 'TAP'
        : this.language === 'ES'
        ? 'TAP'
        : this.customer === 'Fpro'
        ? 'TAP'
        : this.language === 'FI'
        ? 'NAPSAUTA'
        : this.customer === 'SaludSA'
        ? 'TAP'
        : 'BAKST'
    }</div>
  </div><img src=${tapImageBarbora} alt="Image Description" style="margin-left:50px;width: 71px; height: 54px;">`}

</div>
      <div class="flappy-container">
            <div class="boomio-score-input-container" style="box-sizing:border-box;display:none;width:130px;box-shadow:0px 3px 6px 0px rgba(30, 30, 30, 0.30);height:40px;padding:7px;background:${
              this.customer === 'Dentsu'
                ? '#FE5022'
                : this.customer.includes('demo')
                ? '0A3533'
                : '#C6152F'
            };border-radius:35px">
    <div style="width: 148px;top:-15px;left:10px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <img src=${star} alt="Image Description" style="width: 20px; height: 20px;margin-top:18px"></img>

  <div style="text-align: center; color: white; font-size: 20px; font-family:${'Georama'}; font-weight: 900; word-wrap: break-word;position:absolute;left:35px;top:15px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>
  ${
    this.campaignUrl === ''
      ? `
<div class="close-game-container" id="close-game-container" style="display:block;width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>`
      : ''
  }



${new InputContainer(this.customer).createInputContainerDiv('flappy').outerHTML}
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
      const gameContainer = document.querySelector('.game-container');
      if (this.customer === 'Pigu.lt') {
        this.scoreTableContainerInstance = new CompetitionCodeScoreTableLastContainerPigu(
          this.customer,
          this.scoreTable,
          this.currentScore,
        );
      } else {
        console.log(this.cus);
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

    if (this.showCompetitiveRegistration === 'points') {
      if (this.customer === 'SaludSA') {
        const gameContainer = document.querySelector('.game-container-flappy');

        this.scoreTableContainerInstance = new DownloadScoreTableContainer(
          this.customer,
          this.scoreTable,
        );
        gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
      } else {
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
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');

      this.didYouKnowContainer = new DidYouKnowContainer(this.customer);
      gameContainer.appendChild(this.didYouKnowContainer.containerDiv);
    }
    if (this.customer === 'Pigu.lt') {
      const gameContainer = document.querySelector('.game-container');
      this.rulesContainerPigu = new RulesContainerPigu(this.customer, this.scoreTable);
      gameContainer.appendChild(this.rulesContainerPigu.containerDiv);
    }

    if (
      this.showCompetitiveRegistration === 'competition' ||
      this.showCompetitiveRegistration === 'points' ||
      this.showCompetitiveRegistration === 'collectable'
    ) {
      const clickEventHandlerShowRules = () => {
        if (this.gameCount === 0) {
          const emailInput = document.querySelector('.boomio-competition-email-input-field');
          const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
          const checkboxChange = this.customer === 'Fantazijos' ? true : this.checkboxChange;
          const phone = document.querySelector('.boomio-competition-phone-input-field');

          setTimeout(() => {
            if (this.customer !== 'SaludSA') {
              if (!checkboxChange) {
                document.getElementById('competition-checkbox-error').innerText =
                  this.language === 'LV'
                    ? 'Spēlētājam ir jāpiekrīt datu apstrādei, lai turpinātu.'
                    : this.customer === 'SaludSA'
                    ? 'Para continuar debes aaceptar recibir newsletters de SaludSA.'
                    : this.language === 'EN'
                    ? 'You need to agree to receive updates in order to continue'
                    : 'Norint tęsti, privaloma sutikti su privatumo politika.';
                document.getElementById('competition-checkbox-error').style.backgroundColor =
                  '#FFBABA';
                document.getElementById('competition-checkbox-error').style.display = 'block';
                document.getElementById('competition-checkbox-error').style.height = '14px';

                document.getElementById('competition-name-error').innerText = '';

                document.getElementById('competition-name-error').style.backgroundColor =
                  'transparent';

                document.getElementById('competition-email-error').innerText = '';
                document.getElementById('competition-email-error').style.backgroundColor =
                  'transparent';
                if (this.customer.includes('demo')) {
                  return;
                }
              }

              if (emailInput?.value === '' || emailInput?.value === null) {
                document.getElementById('competition-email-error').innerText =
                  this.language === 'LV'
                    ? 'Obligāti aizpildāmie lauki.'
                    : this.customer === 'SaludSA'
                    ? 'Para continuar debes agregar el correo electrónico.'
                    : this.language === 'EN'
                    ? 'Filling in is required to continue.'
                    : 'Norint tęsti privaloma užpildyti.';
                document.getElementById('competition-email-error').style.backgroundColor =
                  '#FFBABA';
                document.getElementById('competition-name-error').innerText = '';

                document.getElementById('competition-name-error').style.backgroundColor =
                  'transparent';
                document.getElementById('competition-checkbox-error').innerText = '';
                document.getElementById('competition-checkbox-error').style.backgroundColor =
                  'transparent';
                if (this.customer.includes('demo')) {
                  return;
                }
              }
              if (
                playerNameInput?.value === '' ||
                playerNameInput?.value === null ||
                (phone?.value === null && this.customer === 'SaludSA')
              ) {
                document.getElementById('competition-name-error').innerText =
                  this.language === 'LV'
                    ? 'Obligāti aizpildāmie lauki.'
                    : this.customer === 'SaludSA'
                    ? 'Para continuar debes agregar el nombre de usuario.'
                    : this.language === 'EN'
                    ? 'Filling in is required to continue.'
                    : 'Norint tęsti privaloma užpildyti.';
                document.getElementById('competition-name-error').style.backgroundColor = '#FFBABA';

                document.getElementById('competition-email-error').innerText = '';
                document.getElementById('competition-email-error').style.backgroundColor =
                  'transparent';
                document.getElementById('competition-checkbox-error').innerText = '';
                document.getElementById('competition-checkbox-error').style.backgroundColor =
                  'transparent';
                if (this.customer.includes('demo')) {
                  return;
                }
              }
            }

            if (
              this.customer === 'SaludSA' ||
              this.showCompetitiveRegistration === 'competition' ||
              this.showCompetitiveRegistration === 'points' ||
              this.showCompetitiveRegistration === 'collectable'
            ) {
              boomioService
                .signal('', 'user_info', {
                  emails_consent: this.checkboxChange,
                  user_email:
                    this.customer === 'SaludSA' ? new Date().toISOString() : emailInput?.value,
                  user_name:
                    this.customer === 'SaludSA' ? new Date().toISOString() : playerNameInput?.value,
                })
                .then((response) => {
                  if (response.success === false) {
                    if (response.res_code === 'EMAIL_EXIST') {
                      document.getElementById('competition-email-error').innerText =
                        this.customer === 'Fpro'
                          ? 'This email address already exists. Please use another one.'
                          : this.language === 'LV'
                          ? 'Šī e-pasta adrese jau eksistē. Izmantojiet citu.'
                          : this.customer === 'SaludSA'
                          ? 'Para continuar debes agregar el correo electrónico.'
                          : this.language === 'ES'
                          ? 'Este email ya está en uso. Use otro email.'
                          : this.language === 'RU'
                          ? 'Этот е-мейл адрес уже существует. Используйте другой.'
                          : this.language === 'EE'
                          ? 'See e-posti aadress on juba olemas. Kasutage teist.'
                          : 'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-email-error').style.backgroundColor =
                        '#FFBABA';

                      document.getElementById('competition-name-error').innerText = '';

                      document.getElementById('competition-name-error').style.backgroundColor =
                        'transparent';
                    } else if (response.res_code === 'NICKNAME_EXIST') {
                      document.getElementById('competition-name-error').innerText =
                        this.customer === 'Fpro'
                          ? 'This nickname already exists. Please use another one.'
                          : this.language === 'ES'
                          ? 'Este nickname ya está en uso. Use otro nickname.'
                          : this.language === 'LV'
                          ? 'Šis segvārds jau pastāv. Izmantojiet citu.'
                          : this.customer === 'SaludSA'
                          ? 'Para continuar debes agregar el nombre de usuario.'
                          : this.language === 'RU'
                          ? 'Этот псевдоним уже существует. Используйте другой.'
                          : this.language === 'EE'
                          ? 'See hüüdnimi on juba olemas. Kasutage teist.'
                          : 'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-name-error').style.backgroundColor =
                        '#FFBABA';

                      document.getElementById('competition-email-error').innerText = '';
                      document.getElementById('competition-email-error').style.backgroundColor =
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
                      const canvas = document.getElementById('flappy-canvas');
                      document.getElementById('background_blur').style.opacity = 0.37;
                      canvas.style.transition = 'filter 0.6s ease';
                      canvas.style.filter = 'blur(2px)';
                      const inputContainer = document.querySelector('.input-container');
                      document.getElementById('control-button').style.transition =
                        'opacity 2s ease';
                      document.getElementById('control-button').style.opacity = 1;
                      document.getElementById('control-button').style.display = 'flex';
                      inputContainer.style.transition =
                        'height 1s ease, top 1s ease, opacity 1s ease';
                      inputContainer.style.display = 'block';
                      setTimeout(() => {
                        inputContainer.style.height =
                          this.customer === 'Pigu.lt' ? '400px' : '332px';
                        inputContainer.style.top = `calc(50% + ${
                          this.isMobileHeightSmall ? '110px' : '180px'
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

      const clickEventHandlerDidYouKnow = () => {
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

      const clickEventHandlerResetGame = () => {
        const competitionRestart = document.getElementById('boomio-game-play-again');
        competitionRestart.removeEventListener('click', clickEventHandlerResetGame);

        setTimeout(() => {
          competitionRestart.addEventListener('click', clickEventHandlerResetGame);
        }, 2000);

        const controlButton = document.querySelector('.control-button1');
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
                document.getElementById('background_blur').style.display = 'none';
                const canvas = document.getElementById('flappy-canvas');
                canvas.style.transition = 'filter 1s ease';
                canvas.style.filter = 'none';
                this.gamePlaying = true;
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }, 400);
      };

      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);

      const competitionRestart = document.getElementById('boomio-game-play-again');
      competitionRestart.addEventListener('click', clickEventHandlerResetGame);
      if (this.customer === 'Pigu.lt') {
        const competitionRestart = document.getElementById('boomio-game-play-again-pigu');
        competitionRestart.addEventListener('click', this.showRulesPigu);
      }
      if (this.customer === 'Pigu.lt') {
        const competitionDidYouKnow = document.getElementById('boomio-close-did-you-know');
        competitionDidYouKnow.addEventListener('click', clickEventHandlerDidYouKnow);
      }
    }

    document.getElementById('startButtonClick').addEventListener('click', () => {
      if (!this.checkboxChange3 && this.customer === 'Pigu.lt' && this.bestScore <= 0) {
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
            : 'Norint tęsti, privaloma sutikti gauti naujienas bei informaciją apie prizus.';
        document.getElementById('boomio-rules-checkbox-error').style.display = 'block';

        document.getElementById('boomio-rules-checkbox-error').style.backgroundColor = '#FFBABA';
        return;
      }

      if (!this.gameStarted) {
        let canvas = document.getElementById('flappy-canvas');

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
                    this.gameStarted = true;
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
              }
            }

            setTimeout(() => {
              canvas.onclick = () => {
                this.flight = this.jump;
                this.isJumping = true;
                setTimeout(() => {
                  this.isJumping = false;
                }, 300);
              };
            }, 50);
            this.gamePlaying = true;
            document.getElementById('background_blur').style.display = 'none';
            const canvas = document.getElementById('flappy-canvas');
            canvas.style.transition = 'filter 1s ease';
            canvas.style.filter = 'none';

            controlButton.style.opacity = 0;
          };
          canvas.addEventListener('click', this.clickEventHandler);
        }
        this.clickEventHandlerButton = () => {
          const controlButton = document.querySelector('.control-button1');
          const inputContainer = document.querySelector('.input-container1');
          this.index = 0;
          this.currentScore = 0;
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

          setTimeout(() => {
            document.getElementById('background_blur').style.display = 'none';
            const canvas = document.getElementById('flappy-canvas');
            canvas.style.transition = 'filter 1s ease';
            canvas.style.filter = 'none';
            this.gamePlaying = true;
          }, 400);
          controlButton.style.display = 'none';
          controlButton.style.opacity = 0;
          setTimeout(() => {
            canvas.onclick = () => {
              this.flight = this.jump;
              this.isJumping = true;
              this.gameStarted = true;
              setTimeout(() => {
                this.isJumping = false;
              }, 300);
            };
          }, 50);
        };
      }
    });
    if (this.campaignUrl === '') {
      document.getElementById('close-game-container').addEventListener('click', () => {
        this.closeGame();
      });
    }
  };
}

export default () => {
  new FlappyBird();
};
