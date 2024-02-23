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
import { InputContainer } from '../helpers/InputContainer';
import { close, introGif, scoreImage } from './constants';
class FlappyBird {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.gameClosed = false;
    this.showCompetitiveRegistration = this.config.game_type === 'competition';
    this.userBestPlace = 0;
    this.scoreTable = {};
    this.isJumping = false;
    this.startFlappy();
    this.gameStarted = false;
    this.bestScore = 0;
    this.discount = '0%';
    this.gameCount = 0;
    this.gameEnded = false;
    this.isMobile = window.innerWidth <= 768;
    this.newHighScoreReached = false;
    this.scoreTableContainerInstance;
  }

  startFlappy() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();

    this.checkboxChange = true;

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

    img.src = 'https://i.ibb.co/mt26nqh/Group-1000001767.png';

    // img.src = 'https://i.ibb.co/L9Z93yp/Clip-path-group-8.png';

    // img.src = 'https://i.ibb.co/MP91zG9/Spring-2.png';

    const img2 = new Image();
    img2.src = 'https://i.ibb.co/SrtXMFx/Boomio-demo-penguin.png';

    const img3 = new Image();
    img3.src = 'https://i.ibb.co/xq7Yf83/Boomio-demo-3-1.png';

    const snowImg = new Image();
    snowImg.src =
      'https://i.ibb.co/hVgn0NM/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif';

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

      console.log('stars');
      const new_highscore = document.querySelector('.new_highscore');
      const new_highscore_stars = document.querySelector('.new_highscore_stars');
      const numbers = document.querySelector('.numbers');

      numbers.style.transition = 'opacity 0.5s ease';
      numbers.style.opacity = 0;
      new_highscore.style.transition = 'opacity 0.5s ease';
      new_highscore.style.opacity = 0;
      new_highscore_stars.style.transition = 'opacity 0.5s ease';
      new_highscore_stars.style.opacity = 0;
      console.log('remove stars');

      setTimeout(() => {
        new_highscore.style.display = 'none';
        new_highscore_stars.style.display = 'none';
        numbers.style.display = 'none';
      }, 500);

      setTimeout(() => {
        document.getElementById('flappy-canvas').style.transition = 'opacity 1s ease';
        document.getElementById('flappy-canvas').style.opacity = 1;

        if (this.gameCount === 0) {
          if (this.showCompetitiveRegistration) {
            const checkboxImg = document.querySelector('.privacyCheckbox');
            checkboxImg.addEventListener('click', () => {
              this.checkboxChange = !this.checkboxChange;
              const checkboxImgChange = document.getElementById('privacyCheckboxImg');
              checkboxImgChange.src = this.checkboxChange
                ? 'https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/feature/qr-remove/images/doodleWidget/simple-line-icons_check.png'
                : 'none';
            });
            const emailInput = document.querySelector('.boomio-competition-email-input-field');
            const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
            emailInput.addEventListener('input', () => {});
            playerNameInput.addEventListener('input', () => {});
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
      }, 4000);
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
          418,
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
          418,
          canvas.height,
        );

        if (this.gamePlaying) {
          pipes.map((pipe) => {
            // pipe moving
            pipe[0] -= this.speed;

            // top pipe
            ctx.drawImage(
              img,
              419,
              595 - pipe[1],
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
                const currectScoreDiv = document.getElementsByClassName('score-input-container')[0];
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
                pipe[0] <= cTenth + size[0],
                pipe[0] + pipeWidth >= cTenth,
                pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1],
              ].every((elem) => elem)
            ) {
              this.gamePlaying = false;

              if (this.gameCount === 0) {
                const canvas = document.getElementById('flappy-canvas');
                canvas.removeEventListener('click', this.clickEventHandler);

                document
                  .getElementById('startButtonClick1')
                  .addEventListener('click', this.clickEventHandlerButton);

                document
                  .getElementById('claimReward')
                  .addEventListener('click', this.clickEventHandlerClaimButton);

                this.gameCount++;
              }

              setTimeout(
                () => {
                  const inputContainer = document.querySelector('.input-container1');
                  if (this.showCompetitiveRegistration) {
                    boomioService
                      .signal('ROUND_FINISHED', 'signal', { score: this.currentScore })
                      .then((response) => {
                        console.log('Response2', response);
                        this.userBestPlace = response.user_best_place;

                        this.scoreTable = response;

                        this.scoreTableContainerInstance.updateProps('barbora', this.scoreTable);
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });
                  }

                  if (this.showCompetitiveRegistration) {
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
                    const currectScoreDiv =
                      document.getElementsByClassName('score-input-container')[0];
                    currectScoreDiv.style.opacity = 0;
                    setTimeout(() => {
                      currectScoreDiv.style.display = 'none';
                    }, 300);
                  } else {
                    const canvas = document.getElementById('flappy-canvas');
                    canvas.style.transition = 'filter 0.6s ease';
                    canvas.style.filter = 'blur(2px)';
                    document.getElementById('background_blur').style.display = 'block';
                    inputContainer.style.transition =
                      'height 1s ease, top 1s ease, opacity 1s ease';
                    inputContainer.style.display = 'block';
                    setTimeout(() => {
                      inputContainer.style.height = '332px';
                      inputContainer.style.top = 'calc(50% + 170px)';
                      inputContainer.style.opacity = 1;
                    }, 100);
                    const currectScoreDiv =
                      document.getElementsByClassName('score-input-container')[0];
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
            ctx.drawImage(img, 506, 0, 77, 80, cTenth, flyHeight, 77, 80);
          } else {
            ctx.drawImage(img, 424, 0, 77, 80, cTenth, flyHeight, 77, 80);
          }
          this.flight += this.gravity;
          flyHeight = Math.min(flyHeight + this.flight, canvas.height - size[1]);
        } else {
          if (!this.newHighScoreReached) {
            ctx.drawImage(img, 424, 0, 77, 80, cTenth, flyHeight, 77, 80);
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
              scoreDigits[i - leadingZeros].classList.add('counting-animation');
            }

            // Remove the counting class after a short delay
            setTimeout(() => {
              setTimeout(() => {
                this.newHighScoreReached = false;
              }, 2000);
              scoreDigits.forEach((digit) => {
                digit.classList.remove('counting-animation');
              });
            }, 1000);
          }
          ctx.font = 'bold 30px monospace';
        }
        ctx.globalAlpha = 0.2; // Set transparency level (0 = fully transparent, 1 = fully opaque)

        if (!this.gameEnded) {
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

    const tapImage = new Image();
    tapImage.src = 'https://i.ibb.co/LdbY1B8/tap.png';

    const introImage = new Image();
    introImage.src = 'https://i.ibb.co/XFgPwS0/Winter-game-2024-intro.gif';

    const useCuponImage = new Image();
    useCuponImage.src = 'https://i.ibb.co/dGnFRp1/Button-use-it.png';

    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';

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
        this.showCompetitiveRegistration
          ? new InputRegisterContainer('barbora').createInputRegisterContainer().outerHTML
          : ''
      }

  
      <img src=${
        endingBackground.src
      } alt="Image Description" style="z-index:1;width: 418px; height: 670px;position:absolute;opacity:0; pointer-events: none; display:none;" id="ending_background">
      </img>
      <img src=${blurImage.src} alt="Image Description" style="z-index:1;width: ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;" id="background_blur">
      </img>
            <img  style="z-index:1;width: ${
              document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
            }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;" id="snow_background_qr">
      </img>
      <img src=${introGif} alt="Image Description" style="z-index:4;width: ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
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
        newHighscoreImage.src
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

<div style="left:calc(50% - 20px);position: absolute;z-index:999;pointer-events:none" class="tutorial">
<img src=${
      tapImage.src
    } alt="Image Description" style="width: 53px; height: 34px;margin-left:-60px;position:absolute;top:-30px;margin-left:-26px">
<img src=${
      tapImage.src
    } alt="Image Description" style="width: 53px; height: 34px;margin-left:-60px;position:absolute;top:-30px;margin-left:23px">

<img src=${clickImg.src} alt="Image Description" style="width: 71px; height: 54px;">
</div>
        <div class="flappy-container">
          <div class="score-input-container" style="display:none;width:188px;height">
          <div style="width: 148px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
        <img src=${scoreImage} alt="Image Description" style="width: 100%; height: 100%;"></img>
        <div style="text-align: center; color: white; font-size: 20px; font-family: Poppins; font-weight: 900; word-wrap: break-word;position:absolute;left:90px;top:10px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>

<div class="close-game-container" id="close-game-container" style="display:block;width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>


${new InputContainer('barbora').createInputContainerDiv().outerHTML}




       
          <div style="margin-top:255px; z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:${
            document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
          };display:none;" class="control-button" id="control-button">
          <div id="startButtonClick" style="margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-left: 127px; padding-right: 127px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
          <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word"><img src=${
            okImage.src
          } alt="Image Description"></div>
</div>
</div>
<div class="input-container1" style="width:${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }">
<div style="height: 100%; position: relative;  background: linear-gradient(166deg, rgba(220, 35, 110, 0.90) 9.98%, rgba(91, 104, 185, 0.90) 83.11%); border-top-left-radius: 30px; border-top-right-radius: 30px; backdrop-filter: blur(10px)">
    <div style="width: 100%; height: 63px; top: 25px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Georama; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">  <img src=${
      gameOver.src
    } alt="Image Description"></div>
    <div class="colored_box" style="width:calc(100% - 40px);"></div>
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
    <div id="claimReward" style="box-sizing:content-box;width: 127px; padding-left: 25px; padding-right: 25px; padding-top: 11px; padding-bottom: 11px; left: 220px; top: 255px; position: absolute; border-radius: 35px; overflow: hidden; border: 3px white solid; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="line-height:24pxtext-align: center; color: white; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">CLAIM</div>
    </div>



</div>
          </div>
          <div style="justify-content: center; align-items: center; gap: 24px;width:${
            document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
          };" class="control-button1">
          <div  style="margin-left: 46px; margin-right: 46px; padding-top: 14px; padding-bottom: 14px; width:100%;background: linear-gradient(166deg, rgba(220, 35, 110, 0.90) 9.98%, rgba(91, 104, 185, 0.90) 83.11%); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 32px; border: 2px rgba(255, 255, 255, 0.20) solid; justify-content: center; align-items: center; gap: 8px; display: flex;">
<div style="color: white; font-size: 25px; font-family: Poppins; font-weight: 900; line-height: 24px; letter-spacing: 0.25px; word-wrap: break-word;" id="startButton">Play</div>
</div>
</div>



        </div>


        
        
        <canvas id="flappy-canvas" width=${
          document.body.offsetWidth < 418 ? document.body.offsetWidth : '418'
        } height="668" class="flappy-game"></canvas>
      </div>
    `;

    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration) {
      const gameContainer = document.querySelector('.game-container-flappy');

      this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
        'barbora',
        this.scoreTable,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }

    if (this.showCompetitiveRegistration) {
      const clickEventHandlerShowRules = () => {
        if (this.gameCount === 0) {
          setTimeout(() => {
            const emailInput = document.querySelector('.boomio-competition-email-input-field');
            const playerNameInput = document.querySelector('.boomio-competition-name-input-field');

            if (this.showCompetitiveRegistration && this.checkboxChange) {
              boomioService
                .signal('', 'user_info', {
                  user_email: emailInput?.value,
                  user_name: playerNameInput?.value,
                })
                .then((response) => {
                  console.log('response1', response);

                  if (response.success === false) {
                    if (response.res_code === 'EMAIL_EXIST') {
                      document.getElementById('competition-email-error').innerText =
                        response.res_msg;

                      document.getElementById('competition-name-error').innerText = '';
                    } else if (response.res_code === 'NAME_EXIST') {
                      document.getElementById('competition-name-error').innerText =
                        response.res_msg;

                      document.getElementById('competition-email-error').innerText = '';
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
                        inputContainer.style.height = '332px';
                        inputContainer.style.top = 'calc(50% + 170px)';
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

      const clickEventHandlerResetGame = () => {
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
          document.getElementById('background_blur').style.display = 'none';
          const canvas = document.getElementById('flappy-canvas');
          canvas.style.transition = 'filter 1s ease';
          canvas.style.filter = 'none';
          this.gamePlaying = true;
        }, 400);
        controlButton.style.display = 'none';
        controlButton.style.opacity = 0;
      };

      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);

      const competitionRestart = document.getElementById('boomio-competition-play-again');
      competitionRestart.addEventListener('click', clickEventHandlerResetGame);
    }

    document.getElementById('startButtonClick').addEventListener('click', () => {
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
            this.gamePlaying = true;
            document.getElementById('background_blur').style.display = 'none';
            const canvas = document.getElementById('flappy-canvas');
            canvas.style.transition = 'filter 1s ease';
            canvas.style.filter = 'none';

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
          canvas.addEventListener('click', this.clickEventHandler);
        }

        this.clickEventHandlerClaimButton = () => {
          const inputContainer = document.querySelector('.input-container1');
          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          setTimeout(() => {
            inputContainer.style.height = '10px';
            inputContainer.style.top = 'calc(50% + 330px)';
            inputContainer.style.opacity = 0;
          }, 100);
          setTimeout(() => {
            inputContainer.style.display = 'none';
          }, 400);

          setTimeout(() => {
            document.getElementById('useCuponImage').style.display = 'block';
            document.getElementById('background_blur').style.transition = 'opacity 1s ease';
            document.getElementById('ending_background').style.display = 'block';
            document.getElementById('snow_background_qr').style.display = 'block';

            setTimeout(() => {
              document.getElementById('background_blur').style.opacity = 0;
              document.getElementById('ending_background').style.transition = 'opacity 1s ease';
              document.getElementById('ending_background').style.opacity = 1;

              document.getElementById('snow_background_qr').style.transition = 'opacity 1s ease';
              document.getElementById('snow_background_qr').style.opacity = 0.3;
            }, 100);

            this.gameEnded = true;
            setTimeout(() => {
              new QrCodeModal(true, this.discount);
            }, 200);
          }, 500);
        };

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

    const closeGame = () => {
      const element = document.getElementById('boomio-flappy-container');
      if (element && element.parentNode) {
        this.gameClosed = true;
        element.parentNode.removeChild(element);
      }
    };

    document.getElementById('close-game-container').addEventListener('click', () => {
      closeGame();
    });
  };
}

export default () => {
  new FlappyBird();
};
