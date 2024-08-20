import { catch1, catch2, catch3, catch4, background } from './constants';
import {
  widgetHtmlService,
  AnimationService,
  QrCodeModal,
  localStorageService,
  boomioService,
} from '@/services';
import './styles.css';

class CatchGame {
  constructor() {
    // Create and configure the game container
    this.createContainer();

    // Get canvas elements and their contexts
    this.canvas = document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');
    this.canvasBack = document.getElementById('backgroundCanvas');
    this.contextBack = this.canvasBack.getContext('2d');

    // Background image setup
    this.background = new Image();
    this.background.src = background;

    // Sound setup
    this.catchSounds = Array.from({ length: 5 }, () => new Audio('Audio/bleep.wav'));
    this.music = new Audio('Audio/MarimbaBoy.wav');
    this.music.loop = true;
    this.smashSounds = Array.from({ length: 5 }, () => new Audio('Audio/smash.mp3'));

    // Initialize game variables
    this.timer = null;
    this.hiscore = 0;
    this.fruits = [];
    this.numberOfFruits = 15;
    this.smashCounter = 0;
    this.catchSoundCounter = 0;

    // Start the game
    this.init();
  }

  createContainer() {
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
        <canvas id="backgroundCanvas" width="418px" height="668px"></canvas>
        <canvas id="gameCanvas" width="418px" height="668px"></canvas>
      </div>
    `;

    widgetHtmlService.container.appendChild(gameContainer);
  }

  init() {
    this.createPlayer();
    this.createFruits();
    this.addEventListeners();
    this.startGame();
  }

  createPlayer() {
    this.player = new Player(this.canvas, this.context);
  }

  createFruits() {
    this.fruits = [];
    for (let i = 0; i < this.numberOfFruits; i++) {
      const fruit = new Fruit(this.canvas, this.context, this.player);
      fruit.chooseFruit();
      this.fruits.push(fruit);
    }
  }

  addEventListeners() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.player.moveLeft();
      } else if (e.keyCode === 39) {
        this.player.moveRight();
      } else if (e.keyCode === 13 && this.player.gameOver) {
        this.resetGame();
      }
    });
  }

  startGame() {
    this.updateGame();
    window.requestAnimationFrame(() => this.drawGame());
  }

  updateGame() {
    if (this.player.fruitsMissed >= 10) {
      this.player.gameOver = true;
    }

    this.fruits.forEach((fruit) => fruit.fall());

    this.timer = window.setTimeout(() => this.updateGame(), 30);
  }

  drawGame() {
    if (!this.player.gameOver) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.contextBack.clearRect(0, 0, this.canvasBack.width, this.canvasBack.height);

      this.contextBack.drawImage(this.background, 0, 0);
      this.player.render();

      this.fruits.forEach((fruit) => fruit.render());

      this.contextBack.font = 'bold 23px Velvetica';
      this.contextBack.fillStyle = 'WHITE';
      this.contextBack.fillText(`SCORE: ${this.player.score}`, 50, 50);
      this.contextBack.fillText(`HI SCORE: ${this.hiscore}`, 250, 50);
      this.contextBack.fillText(`FRUIT CAUGHT: ${this.player.fruitsCollected}`, 500, 50);
      this.contextBack.fillText(`FRUIT MISSED: ${this.player.fruitsMissed}`, 780, 50);
    } else {
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
    }

    window.requestAnimationFrame(() => this.drawGame());
  }

  resetGame() {
    this.init();
  }
}

class Player {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.gameOver = false;
    this.score = 0;
    this.fruitsCollected = 0;
    this.fruitsMissed = 0;
    this.playerWidth = 150;
    this.playerHeight = 90;
    this.playerSpeed = 10;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - this.playerHeight;
    this.playerImage = new Image();
    this.playerImage.src = basket2;
  }

  render() {
    this.context.drawImage(this.playerImage, this.x, this.y);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.playerSpeed;
    }
  }

  moveRight() {
    if (this.x < this.canvas.width - this.playerWidth) {
      this.x += this.playerSpeed;
    }
  }
}

class Fruit {
  constructor(canvas, context, player) {
    this.canvas = canvas;
    this.context = context;
    this.player = player;
    this.fruitNumber = Math.floor(Math.random() * 5);
    this.fruitType = '';
    this.fruitScore = 0;
    this.fruitWidth = 50;
    this.fruitHeight = 50;
    this.fruitImage = new Image();
    this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (this.canvas.width - this.fruitWidth);
    this.y = Math.random() * -this.canvas.height - this.fruitHeight;

    // Fruit images
    this.images = [catch1, catch2, catch3, catch4];
  }

  chooseFruit() {
    this.fruitType = ['catch1', 'catch2', 'catch3', 'catch4'][this.fruitNumber];
    this.fruitScore = [5, 10, 15, 20][this.fruitNumber] * this.fruitSpeed;
    this.fruitImage.src = this.images[this.fruitNumber];
  }

  fall() {
    if (this.y < this.canvas.height - this.fruitHeight) {
      this.y += this.fruitSpeed;
    } else {
      // Handle fruit miss
      this.changeState();
      this.chooseFruit();
    }
    this.checkIfCaught();
  }

  checkIfCaught() {
    if (this.y >= this.player.y) {
      if (
        (this.x > this.player.x && this.x < this.player.x + this.player.playerWidth) ||
        (this.x + this.fruitWidth > this.player.x &&
          this.x + this.fruitWidth < this.player.x + this.player.playerWidth)
      ) {
        this.changeState();
        this.chooseFruit();
      }
    }
  }

  changeState() {
    this.fruitNumber = Math.floor(Math.random() * 4);
    this.fruitSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (this.canvas.width - this.fruitWidth);
    this.y = Math.random() * -this.canvas.height - this.fruitHeight;
  }

  render() {
    this.context.drawImage(this.fruitImage, this.x, this.y);
  }
}

export default () => {
  new CatchGame();
};
