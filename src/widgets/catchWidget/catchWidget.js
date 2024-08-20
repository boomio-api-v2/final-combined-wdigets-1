import { assignStyleOnElement } from '@/utils';
import {
  fruitImages,
  basketImage,
  backgroundSrc,
  catchSoundSrc,
  smashSoundSrc,
  musicSrc,
} from './constants';

class FruitCatcher {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvasBack = document.createElement('canvas');
    this.contextBack = this.canvasBack.getContext('2d');

    this.timer = null;
    this.hiscore = 0;
    this.player = null;
    this.fruits = [];
    this.numberOfFruits = 15;

    this.initCanvas();
    this.start();
  }

  initCanvas() {
    this.canvas.setAttribute('id', 'canvas');
    this.canvasBack.setAttribute('id', 'backgroundCanvas');
    this.canvas.width = this.canvasBack.width = 1024;
    this.canvas.height = this.canvasBack.height = 650;

    document.body.appendChild(this.canvasBack);
    document.body.appendChild(this.canvas);

    this.background = new Image();
    this.background.src = backgroundSrc;

    this.catchSounds = Array(5)
      .fill()
      .map(() => new Audio(catchSoundSrc));
    this.smashSounds = Array(5)
      .fill()
      .map(() => new Audio(smashSoundSrc));
    this.music = new Audio(musicSrc);
    this.music.loop = true;
  }

  start() {
    this.player = new this.Player(this.canvas);
    this.fruits = Array.from(
      { length: this.numberOfFruits },
      () => new this.Fruit(this.canvas, this.context, this.player),
    );

    this.startGame();
  }

  startGame() {
    this.updateGame();
    window.requestAnimationFrame(this.drawGame.bind(this));
  }

  updateGame() {
    if (this.player.fruitsMissed >= 10) {
      this.player.gameOver = true;
    }

    this.fruits.forEach((fruit) => fruit.fall());
    this.timer = window.setTimeout(this.updateGame.bind(this), 30);
  }

  drawGame() {
    if (!this.player.gameOver) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.contextBack.clearRect(0, 0, this.canvasBack.width, this.canvasBack.height);

      this.contextBack.drawImage(this.background, 0, 0);
      this.player.render();

      this.fruits.forEach((fruit) => fruit.render());
      this.contextBack.fillText(`SCORE: ${this.player.score}`, 50, 50);
      this.contextBack.fillText(`HI SCORE: ${this.hiscore}`, 250, 50);
      this.contextBack.fillText(`FRUIT CAUGHT: ${this.player.fruitsCollected}`, 500, 50);
      this.contextBack.fillText(`FRUIT MISSED: ${this.player.fruitsMissed}`, 780, 50);
    } else {
      this.endGame();
    }
    window.requestAnimationFrame(this.drawGame.bind(this));
  }

  endGame() {
    this.fruits.length = 0;

    if (this.hiscore < this.player.score) {
      this.hiscore = this.player.score;
      this.contextBack.fillText(
        `NEW HI SCORE: ${this.hiscore}`,
        this.canvas.width / 2 - 100,
        this.canvas.height / 2,
      );
    }

    this.contextBack.fillText(
      'PRESS ENTER TO RESTART',
      this.canvas.width / 2 - 140,
      this.canvas.height / 2 + 50,
    );
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    window.clearTimeout(this.timer);

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.start();
      }
    });
  }

  Player(canvas) {
    this.gameOver = false;
    this.score = 0;
    this.fruitsCollected = 0;
    this.fruitsMissed = 0;
    this.playerWidth = 150;
    this.playerHeight = 90;
    this.playerSpeed = 10;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.playerHeight;
    this.playerImage = new Image();
    this.playerImage.src = basketImage;

    this.render = () => {
      context.drawImage(this.playerImage, this.x, this.y);
    };

    this.moveLeft = () => {
      if (this.x > 0) {
        this.x -= this.playerSpeed;
      }
    };

    this.moveRight = () => {
      if (this.x < canvas.width - this.playerWidth) {
        this.x += this.playerSpeed;
      }
    };

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.moveLeft();
      } else if (e.keyCode === 39) {
        this.moveRight();
      }
    });
  }

  Fruit(canvas, context, player) {
    this.fruitNumber = Math.floor(Math.random() * 5);
    this.fruitType = '';
    this.fruitScore = 0;
    this.fruitWidth = 50;
    this.fruitHeight = 50;
    this.fruitImage = new Image();
    this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (canvas.width - this.fruitWidth);
    this.y = Math.random() * -canvas.height - this.fruitHeight;

    this.chooseFruit = () => {
      const fruitData = fruitImages[this.fruitNumber];
      this.fruitType = fruitData.type;
      this.fruitScore = fruitData.score * this.fruitSpeed;
      this.fruitImage.src = fruitData.src;
    };

    this.fall = () => {
      if (this.y < canvas.height - this.fruitHeight) {
        this.y += this.fruitSpeed;
      } else {
        player.fruitsMissed += 1;
        this.changeState();
        this.chooseFruit();
      }
      this.checkIfCaught();
    };

    this.checkIfCaught = () => {
      if (this.y >= player.y) {
        if (
          (this.x > player.x && this.x < player.x + player.playerWidth) ||
          (this.x + this.fruitWidth > player.x &&
            this.x + this.fruitWidth < player.x + player.playerWidth)
        ) {
          player.score += this.fruitScore;
          player.fruitsCollected += 1;
          this.changeState();
          this.chooseFruit();
        }
      }
    };

    this.changeState = () => {
      this.fruitNumber = Math.floor(Math.random() * 5);
      this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
      this.x = Math.random() * (canvas.width - this.fruitWidth);
      this.y = Math.random() * -canvas.height - this.fruitHeight;
    };

    this.render = () => {
      context.drawImage(this.fruitImage, this.x, this.y);
    };

    this.chooseFruit();
  }
}

export default () => {
  new FruitCatcher();
};
