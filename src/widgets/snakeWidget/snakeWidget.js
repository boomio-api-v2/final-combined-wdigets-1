import {
  widgetHtmlService,
  AnimationService,
  localStorageService,
  DragElement,
  QrCodeModal,
} from '@/services';
import './styles.css';
import { giftImage } from '@/сonstants/icons';

var Game = Game || {};
var Keyboard = Keyboard || {};
var Component = Component || {};

Keyboard.Keymap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

Keyboard.ControllerEvents = function () {
  var self = this;
  this.pressKey = null;
  this.keymap = Keyboard.Keymap;
  document.onkeydown = function (event) {
    self.pressKey = event.which;
  };
  this.getKey = function () {
    return this.keymap[this.pressKey];
  };
};

Component.Stage = function (canvas, conf) {
  this.keyEvent = new Keyboard.ControllerEvents();
  this.width = canvas.width;
  this.height = canvas.height;
  this.length = [];
  this.food = {};
  this.score = 0;
  this.direction = 'right';
  this.conf = {
    cw: 40,
    size: 3,
    fps: 1000,
    head: null,
    tail: null,
    foodImg: null,
  };

  if (typeof conf == 'object') {
    for (var key in conf) {
      if (conf.hasOwnProperty(key)) {
        this.conf[key] = conf[key];
      }
    }
  }
};

Component.Snake = function (canvas, conf) {
  var self = this;

  this.stage = new Component.Stage(canvas, conf);
  this.initSnake = function () {
    for (var i = 0; i < this.stage.conf.size; i++) {
      this.stage.length.push({ x: i, y: 0 });
    }
  };
  this.initSnake();

  this.initFood = function () {
    this.stage.food = {
      x: Math.round((Math.random() * (this.stage.width - this.stage.conf.cw)) / this.stage.conf.cw),
      y: Math.round(
        (Math.random() * (this.stage.height - this.stage.conf.cw)) / this.stage.conf.cw,
      ),
      image: this.stage.conf.foodImg, // Assign the preloaded image to the food object
    };
  };

  this.initFood();

  this.restart = function () {
    this.stage.length = [];
    this.stage.food = {};
    this.stage.score = 0;
    this.stage.direction = 'right';
    this.stage.keyEvent.pressKey = null;
    this.initSnake();
    this.initFood();
  };
};

Game.Draw = function (context, snake) {
  this.drawStage = function () {
    var keyPress = snake.stage.keyEvent.getKey();
    if (typeof keyPress !== 'undefined') {
      snake.stage.direction = keyPress;
    }

    context.fillStyle = '#edeae6';
    context.fillRect(0, 0, snake.stage.width, snake.stage.height);

    var nx = snake.stage.length[0].x;
    var ny = snake.stage.length[0].y;

    switch (snake.stage.direction) {
      case 'right':
        nx++;
        break;
      case 'left':
        nx--;
        break;
      case 'up':
        ny--;
        break;
      case 'down':
        ny++;
        break;
    }

    if (this.collision(nx, ny)) {
      snake.restart();
      return;
    }

    if (nx === snake.stage.food.x && ny === snake.stage.food.y) {
      var tail = { x: nx, y: ny };
      snake.stage.score++;
      snake.initFood();
    } else {
      var tail = snake.stage.length.pop();
      tail.x = nx;
      tail.y = ny;
    }

    if (snake.stage.score === 4) {
      this.checkScore();
    }

    snake.stage.length.unshift(tail);

    for (var i = 0; i < snake.stage.length.length; i++) {
      var cell = snake.stage.length[i];
      if (i === 0) {
        this.drawCell(cell.x, cell.y, 'rgb(27, 115, 20)', snake.stage.conf.head);
      } else if (i === snake.stage.length.length - 1) {
        this.drawCell(cell.x, cell.y, 'rgb(180, 40, 121)');
      } else {
        this.drawCell(cell.x, cell.y, 'rgb(40, 180, 99)');
      }
    }
    this.drawCell(snake.stage.food.x, snake.stage.food.y, 'rgb(158, 84, 0)');

    this.checkScore = function () {
      const snakeContainer = document.getElementById('snake-container');
      if (snakeContainer && snakeContainer.parentNode) {
        snakeContainer.parentNode.removeChild(snakeContainer);
        new QrCodeModal();
      }
    };

    context.fillText('Score: ' + snake.stage.score, 5, snake.stage.height - 5);
  };

  this.drawCell = function (x, y, color, image) {
    var cellSize = snake.stage.conf.cw;
    var radius = cellSize / 2;
    var centerX = x * cellSize + radius;
    var centerY = y * cellSize + radius;

    context.fillStyle = color;
    context.beginPath();

    if (x === snake.stage.length[0].x && y === snake.stage.length[0].y) {
      //hd
      var rotation = 0;
      if (snake.stage.direction === 'up') {
        rotation = Math.PI;
      } else if (snake.stage.direction === 'down') {
        rotation = Math.PI * 2;
      } else if (snake.stage.direction === 'left') {
        rotation = Math.PI * 0.5;
      } else if (snake.stage.direction === 'right') {
        rotation = Math.PI * 1.5;
      }

      context.save();
      context.translate(centerX, centerY);
      context.rotate(rotation);
      if (image) {
        context.drawImage(image, -radius, -radius, cellSize, cellSize);
      }
      context.restore();
    } else if (
      x === snake.stage.length[snake.stage.length.length - 1].x &&
      y === snake.stage.length[snake.stage.length.length - 1].y
    ) {
      //tail
      context.fillStyle = color;
      context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else {
      if (x === snake.stage.food.x && y === snake.stage.food.y && snake.stage.food.image) {
        context.drawImage(snake.stage.food.image, x * cellSize, y * cellSize, cellSize, cellSize);
      } else {
        context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    context.fill();
  };

  this.collision = function (nx, ny) {
    var cellSize = snake.stage.conf.cw;
    var maxX = snake.stage.width / cellSize;
    var maxY = snake.stage.height / cellSize;

    if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) {
      snake.restart();
      return true;
    }
    return false;
  };
};

Game.Snake = function (elementId, conf) {
  var canvas = document.getElementById(elementId);
  var context = canvas.getContext('2d');
  var snake = new Component.Snake(canvas, conf);
  var gameDraw = new Game.Draw(context, snake);

  // Swipe Event Listeners
  var xStart, yStart;

  canvas.addEventListener('touchstart', function (event) {
    xStart = event.touches[0].clientX;
    yStart = event.touches[0].clientY;
  });

  canvas.addEventListener('touchend', function (event) {
    var xEnd = event.changedTouches[0].clientX;
    var yEnd = event.changedTouches[0].clientY;

    var xDiff = xStart - xEnd;
    var yDiff = yStart - yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // Swipe Left
        if (snake.stage.direction !== 'right') {
          snake.stage.direction = 'left';
        }
      } else {
        // Swipe Right
        if (snake.stage.direction !== 'left') {
          snake.stage.direction = 'right';
        }
      }
    } else {
      if (yDiff > 0) {
        // Swipe Up
        if (snake.stage.direction !== 'down') {
          snake.stage.direction = 'up';
        }
      } else {
        // Swipe Down
        if (snake.stage.direction !== 'up') {
          snake.stage.direction = 'down';
        }
      }
    }
  });

  setInterval(function () {
    gameDraw.drawStage();
  }, snake.stage.conf.fps);
};

class SnakeWidget {
  constructor() {
    this.startSnake();
  }
  startSnake() {
    this.config = localStorageService.getDefaultConfig();
    var head = new Image();
    head.src = 'https://raw.githubusercontent.com/komeilshahmoradi/Snake/main/Sprites/snake.png';
    var tail = new Image();
    tail.src = 'https://raw.githubusercontent.com/komeilshahmoradi/Snake/main/Sprites/snake.png';
    var foodImg = new Image();
    foodImg.src = giftImage;

    this.createContainer();
    this.snake = document.getElementById('snake-container');
    this.animation = new AnimationService({
      elem: this.snake,
    });
    this.draggeble = new DragElement(this.snake);
    new DragElement(this.snake);
    var snake = new Game.Snake('stage', { fps: 400, size: 3, head: head, tail: tail, foodImg });
  }

  createContainer = () => {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'snake-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    myCanvas.style.width = '280px';
    myCanvas.style.height = '330px';
    myCanvas.innerHTML = `
    <h3>Catch Discount</h3>
    <canvas id="stage" height="280" width="280" ></canvas>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
  };
}

export default () => {
  new SnakeWidget();
};
