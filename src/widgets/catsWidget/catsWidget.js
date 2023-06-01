import * as constants from '@/сonstants';
import * as Matter from 'matter-js';
import theAnimation from './animation';
import {
  AnimationService,
  localStorageService,
  widgetHtmlService,
  DragElement,
  QrCodeModal,
} from '@/services';
import './styles.css';

class CatsWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success && !localStorage.getItem('testing_Widgets')) return;
    this.imagePaths = {
      pole1: constants.pole1,
      pole2: constants.pole2,
      crate1: constants.crate1,
      crate2: constants.crate2,
      crate3: constants.crate3,
      crate4: constants.crate4,
      crate5: constants.crate5,
      crate6: constants.crate6,
      fishHeapImg1: constants.fishHeapImg1,
      fishHeapImg2: constants.fishHeapImg2,
      cat1_1: constants.cat1_1,
      cat1_2: constants.cat1_2,
      cat1_3: constants.cat1_3,
      cat1_4: constants.cat1_4,
      cat2_1: constants.cat2_1,
      cat2_2: constants.cat2_2,
      cat2_3: constants.cat2_3,
      cat2_4: constants.cat2_4,
      ground: constants.ground,
      hammerImage: constants.hammerImage,
    };
    this.loadedImages = [];
    this.boxBlueImgsArr = [];
    this.createContainer();
    this.cX = 300;
    this.cY = 100;
    this.clickAreas = [[], []];
    this.myCanvas = document.getElementById('crates-container');
    this.myCanvas.height = 300;
    this.myCanvas.width = 231;
    this.myCanvas.addEventListener('mousedown', (event) => this.mouseDown(event), false);
    this.myCanvas.addEventListener('mousemove', (event) => this.onmousemove(event), false);
    this.catAnim1 = theAnimation.animation();
    this.catAnim2 = theAnimation.animation();
    this.ctx = this.myCanvas.getContext('2d');
    this.brokenCubes = [false, false];
    this.catAnim1.frames = [];
    this.catAnim1.frameDurations = [120, 6, 6, 6, 6, 6, 6, 6, 6, 20]; // should be same length as frame array
    this.catAnim2.frames = [];
    this.catAnim2.frameDurations = [75, 34, 7, 7, 7, 7, 7, 7, 7, 7];
    this.engine = Matter.Engine.create();
    this.boxA;
    this.boxB;
    this.theGround;
    this.wall1;
    this.wall2;
    this.roof;
    this.fishHeap1;
    this.fishHeap2;
    this.runner = Matter.Runner.create();
    this.cursorX = 0;
    this.cursorY = 0;
    this.animation = new AnimationService({
      elem: this.myCanvas,
    });
    const { posx, posy } = this.animation;
    this.draggeble = new DragElement(this.myCanvas, { x_position: posx, y_position: posy });
    Matter.Runner.run(this.runner, this.engine);
    this.loadAllImages();
  }

  createContainer = () => {
    const myCanvas = document.createElement('canvas');
    myCanvas.setAttribute('id', 'crates-container');
    myCanvas.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    widgetHtmlService.container.appendChild(myCanvas);
  };

  checkAllImagesLoaded() {
    if (Object.keys(this.loadedImages).length === Object.keys(this.imagePaths).length) {
      this.start();
    }
  }

  loadImage(name, path) {
    var image = new Image();
    image.onload = () => {
      this.loadedImages[name] = image;
      this.checkAllImagesLoaded();
    };
    image.src = path;
  }

  loadAllImages() {
    for (const key in this.imagePaths) {
      const path = this.imagePaths[key];
      const name = key;
      this.loadImage(name, path);
    }
  }

  start() {
    this.catAnim1.frames = [
      this.loadedImages['cat1_1'],
      this.loadedImages['cat1_2'],
      this.loadedImages['cat1_3'],
      this.loadedImages['cat1_4'],
      this.loadedImages['cat1_2'],
      this.loadedImages['cat1_3'],
      this.loadedImages['cat1_4'],
      this.loadedImages['cat1_2'],
      this.loadedImages['cat1_3'],
      this.loadedImages['cat1_4'],
    ];
    this.catAnim2.frames = [
      this.loadedImages['cat2_1'],
      this.loadedImages['cat2_2'],
      this.loadedImages['cat2_3'],
      this.loadedImages['cat2_4'],
      this.loadedImages['cat2_3'],
      this.loadedImages['cat2_4'],
      this.loadedImages['cat2_3'],
      this.loadedImages['cat2_4'],
      this.loadedImages['cat2_3'],
      this.loadedImages['cat2_4'],
    ];
    this.boxBlueImgsArr = [
      this.loadedImages['crate1'],
      this.loadedImages['crate2'],
      this.loadedImages['crate3'],
      this.loadedImages['crate4'],
      this.loadedImages['crate5'],
      this.loadedImages['crate6'],
    ];
    this.createBoxes(this.loadedImages['crate1']);
    this.addBoxesTotheWorld();
    this.catAnim1.init();
    this.catAnim2.init();
    requestAnimationFrame(() => this.frame());
  }

  frame() {
    const endTime = Date.now() + 5000;

    const loop = () => {
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      this.drawPole();
      this.drawCubes1();
      this.drawCubes2();
      this.drawFishHeap();
      this.drawCats();
      this.drawGround();
      this.drawHammer();
      if (!this.boxA.broken || !this.boxB.broken || Date.now() < endTime) {
        requestAnimationFrame(loop);
      } else {
        new QrCodeModal();
        this.myCanvas.remove();
      }
    };
    requestAnimationFrame(loop);
  }

  createBoxes(crateImg) {
    return new Promise((resolve) => {
      let _x, _y, _width, _height;
      let scale = 0.64;
      let collisionWidth, collisionHeight;

      _width = crateImg.width * scale;
      _height = crateImg.height * scale;
      collisionWidth = _width / 1.33;
      collisionHeight = _height / 1.13;
      _x = this.myCanvas.width * 0.28;
      _y = this.myCanvas.height * 0.48;
      this.boxA = Matter.Bodies.rectangle(
        _x + _width / 2,
        _y + _height / 2,
        collisionWidth,
        collisionHeight,
        {
          width: _width,
          height: _height,
          broken: false,
          clickCount: 0,
          collisionWidth: collisionWidth,
        },
      );
      this.boxA.collisionFilter.group = 1;
      Matter.Body.setAngle(this.boxA, 90 * (Math.PI / 180));

      scale = 0.47;
      _width = crateImg.width * scale;
      _height = crateImg.height * scale;
      collisionWidth = (_width / 1.33) * 0.99;
      collisionHeight = (_height / 1.13) * 0.99;
      _x = this.myCanvas.width * 0.53;
      _y = this.myCanvas.height * 0.1;
      this.boxB = Matter.Bodies.rectangle(
        _x + _width / 2,
        _y + _height / 2,
        collisionWidth,
        collisionHeight,
        {
          width: _width,
          height: _height,
          broken: false,
          clickCount: 0,
          collisionWidth: collisionWidth,
        },
      );
      this.boxB.collisionFilter.group = 1;
      Matter.Body.setAngle(this.boxB, 180 * (Math.PI / 180));

      _width = this.myCanvas.width;
      _height = 10;
      _x = this.myCanvas.width / 2;
      _y = this.myCanvas.height;
      this.theGround = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

      _width = 10;
      _height = this.myCanvas.height;
      _x = -5;
      _y = this.myCanvas.height / 2;
      this.wall1 = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

      _width = 10;
      _height = this.myCanvas.height;
      _x = this.myCanvas.width + 5;
      _y = this.myCanvas.height / 2;
      this.wall2 = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

      _width = this.myCanvas.width;
      _height = 10;
      _x = this.myCanvas.width / 2;
      _y = -5;
      this.roof = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });
      resolve();
    });
  }

  updateBoxColliderForBrokenBox(box) {
    let height1, height6;
    height1 = this.loadedImages['crate1'].height;
    height6 = this.loadedImages['crate6'].height;
    const divH = height6 / height1;
    Matter.Body.scale(box, 1, divH);
    box.height = box.height * divH;
  }
  addBoxesTotheWorld() {
    Matter.Composite.add(this.engine.world, [
      this.boxA,
      this.boxB,
      this.theGround,
      this.wall1,
      this.wall2,
      this.roof,
    ]);
  }

  onmousemove(event) {
    const canvas = document.getElementById('crates-container');
    const styles = window.getComputedStyle(canvas);
    const top = parseInt(styles?.top, 10);
    const left = parseInt(styles?.left, 10);
    this.cursorX = event.pageX - left;
    this.cursorY = event.pageY - top;
  }

  mouseDown(event) {
    const canvas = document.getElementById('crates-container');
    const styles = window.getComputedStyle(canvas);
    const top = parseInt(styles?.top, 10);
    const left = parseInt(styles?.left, 10);
    let clickX = event.pageX - left;
    let clickY = event.pageY - top;
    if (this.didWeClickOnObject(1, clickX, clickY)) {
      this.objectWasClicked(this.boxB, 1);
    } else if (this.didWeClickOnObject(0, clickX, clickY)) {
      this.objectWasClicked(this.boxA, 0);
    }
  }

  didWeClickOnObject(i, clickX, clickY) {
    let _x1, _y1, _x2, _y2;
    _x1 = this.getTopLeft(i)[0];
    _y1 = this.getTopLeft(i)[1];
    _x2 = this.getBottomRight(i)[0];
    _y2 = this.getBottomRight(i)[1];
    return (
      this.brokenCubes[i] == false && clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2
    );
  }

  setClickArea(i, _x, _y, _width, _height) {
    this.clickAreas[i] = [_x, _y, _x + _width, _y + _height];
  }

  getTopLeft(i) {
    let topLeft = [this.clickAreas[i][0], this.clickAreas[i][1]];
    return topLeft;
  }
  getBottomRight(i) {
    let topRight = [this.clickAreas[i][2], this.clickAreas[i][3]];
    return topRight;
  }

  objectWasClicked(box, i) {
    let neg = Math.sign(Math.random() - 0.5);
    Matter.Body.applyForce(
      box,
      { x: box.position.x, y: box.position.y },
      { x: -0.26 * neg, y: -0.49 },
    );
    if (box.clickCount < this.boxBlueImgsArr.length - 1) box.clickCount++;
    if (box.clickCount == this.boxBlueImgsArr.length - 1) {
      this.boxA.collisionFilter.group = -1;
      this.boxB.collisionFilter.group = -1;
      Matter.Body.setAngle(box, 0);
      if (box.broken == false) {
        this.createFishHeap(box, i);
        this.updateBoxColliderForBrokenBox(box);
      }
      box.broken = true;
    }
  }

  addHammerToCursor = () => {
    const hammer = document.createElement('img');
    hammer.setAttribute('id', 'hammer');
    hammer.setAttribute('src', hammerImage);
    this.stoneContainer.appendChild(hammer);
    this.stoneContainer.onmousemove = ({ clientX, clientY }) => {
      const { x_position, y_position } = this.draggeble;
      assignStyleOnElement(hammer.style, {
        left: `${clientX - x_position + 5}px`,
        top: `${clientY - y_position + 5}px`,
      });
    };
  };
  drawHammer() {
    this.ctx.drawImage(this.loadedImages['hammerImage'], this.cursorX, this.cursorY);
  }

  drawPole() {
    let _x, _y, _width, _height;
    let scale = 0.64;
    _x = 0;
    _y = 0;
    _width = this.loadedImages['pole1'].width * scale;
    _height = this.loadedImages['pole1'].height * scale;
    if (this.boxA?.clickCount === 0 && this.boxB?.clickCount === 0) {
      this.ctx.drawImage(this.loadedImages['pole1'], _x, _y, _width, _height);
    } else {
      this.ctx.drawImage(this.loadedImages['pole2'], _x, _y, _width, _height);
    }
  }

  drawGround() {
    let _x, _y, _width, _height;
    let div;
    div = this.loadedImages['ground'].width / this.loadedImages['ground'].height;
    _width = this.myCanvas.width;
    _height = this.myCanvas.width / div;
    _x = 0;
    _y = this.myCanvas.height - _height;
    this.ctx.drawImage(this.loadedImages['ground'], _x, _y, _width, _height);
  }

  drawCubes1() {
    let _x, _y, _width, _height;
    let pivotX, pivotY;
    if (this.brokenCubes[1] == false) {
      this.ctx.save();
      _width = this.boxB.width;
      _height = this.boxB.height;
      pivotX = this.boxB.position.x;
      pivotY = this.boxB.position.y;
      _x = pivotX - _width / 2;
      _y = pivotY - _height / 2;
      this.ctx.translate(pivotX, pivotY);
      this.ctx.rotate(this.boxB.angle);
      this.ctx.translate(-pivotX, -pivotY);
      this.ctx.drawImage(this.boxBlueImgsArr[this.boxB.clickCount], _x, _y, _width, _height);
      this.setClickArea(1, _x, _y, _width, _height);
      this.ctx.restore();
    }
  }

  drawCubes2() {
    let _x, _y, _width, _height;
    let pivotX, pivotY;

    if (this.brokenCubes[0] == false) {
      this.ctx.save();
      _width = this.boxA.width;
      _height = this.boxA.height;
      pivotX = this.boxA.position.x;
      pivotY = this.boxA.position.y;
      _x = pivotX - _width / 2;
      _y = pivotY - _height / 2;

      this.ctx.translate(pivotX, pivotY);
      this.ctx.rotate(this.boxA.angle);
      this.ctx.translate(-pivotX, -pivotY);
      this.ctx.drawImage(this.boxBlueImgsArr[this.boxA.clickCount], _x, _y, _width, _height);
      this.setClickArea(0, _x, _y, _width, _height);
      this.ctx.restore();
    }
  }

  createFishHeap(box, i) {
    let _x, _y, _width, _height;
    let div;
    _x = box.position.x;
    _y = box.position.y;
    if (i == 0) {
      div = this.loadedImages['fishHeapImg1'].height / this.loadedImages['fishHeapImg1'].width;
      _width = box.collisionWidth;
      _height = box.collisionWidth * div;
      this.fishHeap1 = Matter.Bodies.rectangle(_x, _y, _width, _height, {
        width: _width,
        height: _height,
      });
      this.fishHeap1.collisionFilter.group = -1;
      Matter.Composite.add(this.engine.world, this.fishHeap1);
    } else if (i == 1) {
      div = this.loadedImages['fishHeapImg2'].height / this.loadedImages['fishHeapImg2'].width;
      _width = box.collisionWidth;
      _height = box.collisionWidth * div;
      this.fishHeap2 = Matter.Bodies.rectangle(_x, _y, _width, _height, {
        width: _width,
        height: _height,
      });
      this.fishHeap2.collisionFilter.group = -1;
      Matter.Composite.add(this.engine.world, this.fishHeap2);
    }
  }

  drawFishHeap() {
    let _x, _y, _width, _height;
    if (this.boxA.broken == true && this.fishHeap1) {
      let pivotX, pivotY;
      pivotX = this.fishHeap1.position.x;
      pivotY = this.fishHeap1.position.y;
      _width = this.loadedImages['fishHeapImg1'].width / 1.5;
      _height = this.loadedImages['fishHeapImg1'].height / 1.5;
      _x = pivotX - _width / 2;
      _y = pivotY - _height / 2;
      this.ctx.drawImage(this.loadedImages['fishHeapImg1'], _x, _y, _width, _height);
    }
    if (this.boxB.broken == true && this.fishHeap2) {
      let pivotX, pivotY;
      pivotX = this.fishHeap2.position.x;
      pivotY = this.fishHeap2.position.y;
      _width = this.loadedImages['fishHeapImg2'].width / 1.5;
      _height = this.loadedImages['fishHeapImg2'].height / 1.5;
      _x = pivotX - _width / 2;
      _y = pivotY - _height / 2;
      this.ctx.drawImage(this.loadedImages['fishHeapImg2'], _x, _y, _width, _height);
    }
  }

  drawCats() {
    if (this.boxA.clickCount > 0 || this.boxB.clickCount > 0) return;
    let _x, _y, _width, _height;
    let scale = 0.28;
    _width = this.catAnim2.image.width * scale;
    _height = this.catAnim2.image.height * scale;
    _x = this.myCanvas.width * 0.12;
    _y = this.myCanvas.height * 0.28;
    this.ctx.drawImage(this.catAnim2.image, _x, _y, _width, _height);
    this.catAnim2.update();

    scale = 0.45;
    _width = this.catAnim1.image.width * scale;
    _height = this.catAnim1.image.height * scale;
    _x = 0;
    _y = this.myCanvas.height * 0.58;
    this.ctx.drawImage(this.catAnim1.image, _x, _y, _width, _height);
    this.catAnim1.update();
  }
}
export default () => {
  new CatsWidget();
};
