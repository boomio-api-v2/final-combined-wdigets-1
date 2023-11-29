import { widgetHtmlService, AnimationService, localStorageService } from '@/services';
import './styles.css';

class FlappyBird {
  constructor() {
    this.isJumping = false;
    this.startFlappy();
    this.gameStarted = false;
    this.bestScore = 0;
    this.gameCount = 0;

    this.newHighScoreReached = false;
  }

  startFlappy() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();

    this.flappy = document.getElementById('boomio-flappy-container');
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
    img.src = 'https://i.ibb.co/DLcH5s3/Boomio-demo-3-1.png';
    const img2 = new Image();
    img2.src = 'https://i.ibb.co/y6qcCZx/Iki-X-Boomio-colab-2-1.png';
    const snowImg = new Image();
    snowImg.src = 'https://i.giphy.com/media/ggK4TpfK2cfuZcokhj/giphy.webp';

    let snowOffset = 0; // Initial offset for snow GIF animation
    let snowSpeed = 0.4; // Adjust the this.speed of the falling snow
    this.speed = 4;
    this.gamePlaying = false;
    const gravity = 0.12;

    const size = [70, 70];
    this.jump = -2.5;
    const cTenth = canvas.width / 10;
    this.flight = 0;
    let index = 0,
      flyHeight,
      currentScore,
      pipes;

    const pipeWidth = 86;
    let pipeGap = 250;
    const pipeLoc = () =>
      Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) + pipeWidth;

    const setup = () => {
      currentScore = 0;
      snowSpeed = 0.4;
      pipeGap = 250;
      this.speed = 4;
      this.flight = this.jump / 2;
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
      updateElapsedTime();

      index++;
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -((index * (this.speed / 2)) % canvas.width) + canvas.width,
        0,
        canvas.width,
        canvas.height,
      );
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -(index * (this.speed / 2)) % canvas.width,
        0,
        canvas.width,
        canvas.height,
      );

      if (this.gamePlaying) {
        pipes.map((pipe) => {
          // pipe moving
          pipe[0] -= this.speed;

          // top pipe
          ctx.drawImage(
            img,
            423,
            608 - pipe[1],
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
            422 + pipeWidth,
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
            currentScore = currentScore + 100;
            if (currentScore > 1) {
              document.getElementsByClassName('score-input-container')[0].style.display = 'block';
            }

            if (this.bestScore < currentScore) {
              this.newHighScoreReached = true;
            }
            // check if it's the best score
            this.bestScore = Math.max(this.bestScore, currentScore);

            // remove & create new pipe
            pipes = [
              ...pipes.slice(1),
              [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()],
            ];
            const targetPipeGap = Math.max(pipeGap - elapsedTime * 400, 130);
            pipeGap += (targetPipeGap - pipeGap) * 0.1; // Adjust the interpolation factor as needed
            snowSpeed = Math.min(snowSpeed + elapsedTime * 10, 3);
          }

          // if hit the pipe, end
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
                .getElementById('startButtonClick')
                .addEventListener('click', this.clickEventHandlerButton);

              this.gameCount++;
            }

            setTimeout(
              () => {
                const controlButton = document.querySelector('.control-button');
                controlButton.style.display = 'flex';
                controlButton.style.opacity = 1;
                document.getElementsByClassName('score-input-container')[0].style.display = 'none';
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
          ctx.drawImage(img, 422, 0, 77, 80, cTenth, flyHeight, 77, 80);
        }
        this.flight += gravity;
        flyHeight = Math.min(flyHeight + this.flight, canvas.height - size[1]);
      } else {
        ctx.drawImage(img, 422, 0, 77, 80, cTenth, flyHeight, 77, 80);

        flyHeight = canvas.height / 2 - size[1] / 2 - 70;
        if (this.newHighScoreReached) {
          const numbers = document.querySelector('.numbers');
          numbers.style.display = 'block';

          const scoreDigits = document.querySelectorAll('.numbers__window__digit');

          // Update the score digits content
          const scoreString = currentScore.toString();

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
            scoreDigits.forEach((digit) => {
              digit.classList.remove('counting-animation');
            });
          }, 1000);

          this.newHighScoreReached = false;
        }
        ctx.font = 'bold 30px monospace';
      }
      ctx.globalAlpha = 0.2; // Set transparency level (0 = fully transparent, 1 = fully opaque)
      ctx.drawImage(snowImg, 0, snowOffset, canvas.width, canvas.height);

      ctx.drawImage(snowImg, 0, snowOffset - canvas.height, canvas.width, canvas.height);
      ctx.globalAlpha = 1; // Reset transparency to fully opaque

      // Update snow offset for animation
      snowOffset = (snowOffset + snowSpeed) % canvas.height;
      document.getElementById('currentScore').innerHTML = `${currentScore}`;

      if (this.gamePlaying) {
        const easeOutQuad = (t) => t * (2 - t);
        const easingFactor = 0.1;
        const targetSpeed = Math.min(this.speed + elapsedTime * 0.2, 60); // 10 times faster
        this.speed += (targetSpeed - this.speed) * easeOutQuad(easingFactor);
      }
      setTimeout(function () {
        window.requestAnimationFrame(render);
      }, 1000 / 60);
    };

    setup();
    img.onload = render;
  }

  createContainer = () => {
    const starImg = new Image();
    starImg.src = 'https://i.ibb.co/28HnXdd/Group-20.png';

    const btnImg = new Image();
    btnImg.src = 'https://i.ibb.co/d74HGX8/Button-Yellow-2.png';

    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-flappy-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `
      <div class="game-container">
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
<div style="width: 19.88px; height: 19px; position: absolute;z-index:999" class="tutorial">
<img src=${starImg.src} alt="Image Description" style="width: 100%; height: 100%;">
</div>
        <div class="flappy-container" >
          <div class="score-input-container" style="display:none;">
          <div style="width: 100%; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
    <div style="width: 130px;background:#5C6DE0; height: 40px; position: relative; box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.20); border-radius: 24px; overflow: hidden; border: 3px rgba(10, 10, 10, 0.35) solid;display:flex;justify-content:space-evenly;align-items:center;">

    <div style="width: 19.88px; height: 19px; position: relative">
    <div style="width: 19.88px; height: 19px; left: 0px; top: 0px; position: absolute;z-index:999">
        <img src=${starImg.src} alt="Image Description" style="width: 100%; height: 100%;">
    </div>
</div>        <img src=${btnImg.src} alt="Image Description" class="button_background">


        <div style="padding-top: 1px;z-index:9999; padding-bottom: 0.67px; padding-left: 6px; justify-content: flex-end; align-items: center; display: inline-flex">
        <div style="text-align: center; color: white; font-size: 20px; font-family: Poppins; font-weight: 900; word-wrap: break-word" id="currentScore"></div>
    </div>

</div>

</div>
</div>
<div class="input-container">
<div style="width: 100%; height: 100%; padding-top: 35px; padding-bottom: 35px; background: linear-gradient(180deg, rgba(255, 109.56, 109.10, 0.80) 0%, rgba(101, 123, 234, 0.80) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.47) 100%); box-shadow: 0px -2px 40px rgba(133, 89, 243, 0.20); border-radius: 20px; border: 1px #FF6E6D solid; backdrop-filter: blur(10px); flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
<div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
<div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; text-transform: uppercase; line-height: 41.60px; word-wrap: break-word">RULES</div>
<div style="width: 320px; color: white; font-size: 16px; font-family: Poppins; font-weight: 800; text-transform: uppercase; line-height: 35.20px; word-wrap: break-word;text-align:start">1.Tap to fly <br/>2.Earn the most points<br/>3.Repeat as you like<br/>4.Convert best score to money</div>



</div>

</div>

          </div>
          <div style="margin-top:240px; justify-content: center; align-items: center; gap: 24px;display:flex; width:418px;" class="control-button">
          <div id="startButtonClick" style="margin-left: 46px; margin-right: 46px; padding-top: 14px; padding-bottom: 14px; width:100%;background: linear-gradient(93deg, #FF6E6D 0%, #8559F3 100%), radial-gradient(75.68% 75.68% at 416.22% 273.27%, rgba(0, 0, 0, 0.30) 0%, rgba(255, 255, 255, 0.11) 100%); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 32px; border: 2px rgba(255, 255, 255, 0.20) solid; justify-content: center; align-items: center; gap: 8px; display: flex;">
<div style="color: white; font-size: 25px; font-family: Poppins; font-weight: 900; line-height: 24px; letter-spacing: 0.25px; word-wrap: break-word;" id="startButton">Play</div>
</div></div>
        </div>

        
        <canvas id="flappy-canvas" width="418" height="668" class="flappy-game"></canvas>
      </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    // Adding event listener to the start button
    document.getElementById('startButtonClick').addEventListener('click', () => {
      // const playerName = document.getElementById('playerName').value;
      // const playerEmail = document.getElementById('playerEmail').value;

      if (true) {
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
            // controlButton.style.opacity = 0;
          }, 100);
          // Hide the input-container
          setTimeout(() => {
            inputContainer.style.display = 'none';
            // controlButton.style.display = 'none';
          }, 1000);
          if (this.gameCount === 0) {
            const controlButton = document.querySelector('.control-button');
            controlButton.style.display = 'none';

            this.clickEventHandler = () => {
              const tutorial = document.querySelector('.tutorial');
              tutorial.style.display = 'none';

              const numbers = document.querySelector('.numbers');
              numbers.style.display = 'none';
              this.gamePlaying = true;
              controlButton.style.opacity = 0;

              setTimeout(() => {
                canvas.onclick = () => {
                  console.log('Canvas clicked!');
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
          this.clickEventHandlerButton = () => {
            const numbers = document.querySelector('.numbers');
            numbers.style.display = 'none';
            const controlButton = document.querySelector('.control-button');
            this.gamePlaying = true;
            controlButton.style.display = 'none';
            controlButton.style.opacity = 0;

            setTimeout(() => {
              canvas.onclick = () => {
                console.log('Canvas clicked!');
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
      } else if (playerName.trim() === '') {
        alert('Please enter your Name before starting the game.');
      } else if (playerEmail.trim() === '') {
        alert('Please enter your Email before starting the game.');
      }
    });

    // createCloseMoveButtons(
    //   myCanvas.querySelector('.game-container'),
    //   document.getElementById('boomio-flappy-container'),
    //   [-30, 0],
    //   false,
    // );
  };
}

export default () => {
  new FlappyBird();
};
