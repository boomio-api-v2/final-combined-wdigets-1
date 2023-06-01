import theAnimation from './theAnimation';
import theDelay from './theDelay';
import theDrip from './theDrip';
import theHandleObject from './theHandleObject';
import theJar from './theJar';
import theTransform from './theTransform';
import * as constants from '@/сonstants';
import {
  localStorageService,
  QrCodeModal,
  AnimationService,
  widgetHtmlService,
  DragElement,
} from '@/services';
import './styles.css';

class HedgehogWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success && !localStorage.getItem('testing_Widgets')) return;
    this.imagePaths = {
      eziukas10: constants.eziukas10,
      eziukas11: constants.eziukas11,
      eziukas12: constants.eziukas12,
      eziukas13: constants.eziukas13,
      eziukas20: constants.eziukas20,
      eziukas21: constants.eziukas21,
      eziukas30: constants.eziukas30,
      machine1: constants.machine1,
      fullJar: constants.fullJar,
      emptyJarWthLid: constants.emptyJarWthLid,
      stiklainis1: constants.stiklainis1,
      jar00: constants.jar00,
      jar01: constants.jar01,
      jar02: constants.jar02,
      jar03: constants.jar03,
      jar04: constants.jar04,
      jar05: constants.jar05,
      jar06: constants.jar06,
      jar07: constants.jar07,
      jar08: constants.jar08,
      jar09: constants.jar09,
      handle1: constants.handle1,
      handle2: constants.handle2,
      handle3: constants.handle3,
      drip1: constants.drip1,
      drip2: constants.drip2,
      drip3: constants.drip3,
      drip4: constants.drip4,
      drip5: constants.drip5,
      hand1: constants.hand1,
      hand2: constants.hand2,
    };
    this.loadedImages = [];
    this.createContainer();
    this.userAgent = window.navigator.userAgent;
    this.isMobile = false;
    if (
      this.userAgent.match(/Android/i) ||
      this.userAgent.match(/webOS/i) ||
      this.userAgent.match(/iPhone/i) ||
      this.userAgent.match(/iPad/i) ||
      this.userAgent.match(/iPod/i) ||
      this.userAgent.match(/BlackBerry/i) ||
      this.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile = true;
    }
    this.cX = 5;
    this.cY = 100;
    this.myCanvas = document.getElementById('jar-container');
    this.myCanvas.height = 299;
    this.myCanvas.width = 340;
    this.myCanvas.style.display = 'block';
    this.myCanvas.style.margin = '0 auto';
    this.myCanvas.style.imageRendering = 'high-quality';
    this.myCanvas.style.cursor = 'none';

    if (this.isMobile) {
      this.myCanvas.addEventListener('touchstart', (event) => this.tchStart(event));
      this.myCanvas.addEventListener('touchend', (event) => this.tchEnd(event));
      this.myCanvas.addEventListener('touchmove', (event) => this.tchMove(event));
    } else {
      this.myCanvas.addEventListener('mousedown', (event) => this.mouseDown(event), false);
      this.myCanvas.addEventListener('mouseup', (event) => this.mouseUp(event), false);
      this.myCanvas.addEventListener('mousemove', (event) => this.onmousemove(event), false);
    }
    this.ctx = this.myCanvas.getContext('2d');
    this.eziukAnim1 = theAnimation.animation();
    this.eziukAnim2 = theAnimation.animation();

    this.jamJar = theJar.animation();

    this.jamJar.scale = 0.48;
    this.jamJar.x = this.myCanvas.width * 0.22;
    this.jamJar.y = this.myCanvas.height * 0.68;

    this.fullJarMovement = theTransform.animation();
    this.fullJarMovement.canvasContext = this.ctx;
    this.fullJarMovement.x = this.jamJar.x;
    this.fullJarMovement.y = this.jamJar.y;
    this.emptyJarMovement = theTransform.animation();
    this.emptyJarMovement.canvasContext = this.ctx;
    this.emptyJarMovement.scale = 0.28;
    this.emptyJarMovement.x = this.myCanvas.width * 0.58;
    this.emptyJarMovement.y = this.myCanvas.width * 0.78;

    this.myDelay = theDelay.animation();

    this.cursorX = 0;
    this.cursorY = 0;

    this.xu, this.yu;
    this.thePivotX, this.thePivotY;
    this.clickAreas = [[]];

    this.animation = new AnimationService({
      elem: this.myCanvas,
    });
    const { posx, posy } = this.animation;
    this.draggeble = new DragElement(this.myCanvas, { x_position: posx, y_position: posy });
    this.loadAllImages();
  }

  createContainer = () => {
    const myCanvas = document.createElement('canvas');
    myCanvas.setAttribute('id', 'jar-container');
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

  frame() {
    const endTime = Date.now() + 5000;
    const loop = () => {
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      this.clearScreen();
      this.drawMachine();
      this.drawEmptyJars();
      this.drawFullJars();
      this.drawJarMovement();
      this.drawHandle();
      this.drawIdleHandle();
      this.drawEziukus();
      this.drawDrip();
      this.drawJar();
      this.drawHammer();
      this.myDelay.update();
      if (this.jamJar.fullJars < 4 || Date.now() < endTime) {
        requestAnimationFrame(loop);
      } else {
        new QrCodeModal();
        this.myCanvas.remove();
      }
    };
    requestAnimationFrame(loop);
  }

  start() {
    this.jamJar.myDelay = this.myDelay;
    this.handle1 = this.loadedImages['handle1'];
    this.handle2 = this.loadedImages['handle2'];
    this.handle3 = this.loadedImages['handle3'];

    this.myHandle = theHandleObject.animation();
    this.myHandle.img1 = this.handle1;
    this.myHandle.img2 = this.handle2;
    this.myHandle.img3 = this.handle3;

    this.jamJar.myHandle = this.myHandle;

    this.eziukAnim1.frames = [
      this.loadedImages['eziukas10'],
      this.loadedImages['eziukas11'],
      this.loadedImages['eziukas12'],
      this.loadedImages['eziukas13'],
      this.loadedImages['eziukas12'],
      this.loadedImages['eziukas13'],
      this.loadedImages['eziukas12'],
      this.loadedImages['eziukas13'],
    ];
    this.eziukAnim1.frameDurations = [83, 40, 20, 20, 20, 20, 20, 50]; // should be same length as frame array

    this.eziukAnim2.frames = [
      this.loadedImages['eziukas21'],
      this.loadedImages['eziukas20'],
      this.loadedImages['eziukas21'],
      this.loadedImages['eziukas20'],
      this.loadedImages['eziukas21'],
      this.loadedImages['eziukas20'],
    ];
    this.eziukAnim2.frameDurations = [16, 16, 16, 16, 16, 130];

    this.drip1 = this.loadedImages['drip1'];
    this.drip2 = this.loadedImages['drip2'];
    this.drip3 = this.loadedImages['drip3'];
    this.drip4 = this.loadedImages['drip4'];

    this.dripImg5 = this.loadedImages['drip5'];

    this.juiceDrip = theDrip.animation();
    this.juiceDrip.image = this.dripImg5;
    this.jamJar.juiceDrip = this.juiceDrip;

    this.hammerImg = this.loadedImages['hand1'];
    this.hammerImg2 = this.loadedImages['hand2'];
    this.handImg = this.hammerImg;
    this.jamJar.images = [
      this.loadedImages['stiklainis1'],
      this.loadedImages['jar00'],
      this.loadedImages['jar01'],
      this.loadedImages['jar02'],
      this.loadedImages['jar03'],
      this.loadedImages['jar04'],
      this.loadedImages['jar05'],
      this.loadedImages['jar06'],
      this.loadedImages['jar07'],
      this.loadedImages['jar08'],
      this.loadedImages['jar09'],
    ];
    this.fullJarMovement.image = this.loadedImages['fullJar'];
    this.emptyJarMovement.image = this.loadedImages['stiklainis1'];

    this.jamJar.init();
    this.eziukAnim1.init();
    this.eziukAnim2.init();
    this.myHandle.init();

    this.jamJar.fireTranslationWhenJarIsFilled = () => this.translateJars(this.jamJar);
    this.myHandle.releaseHandleFunction = () => this.releaseHandle(this.myHandle);
    requestAnimationFrame(() => this.frame());
  }

  translateJars() {
    this.draggeble = false;
    this.jamJar.scale = 0.48;
    this.jamJar.x = this.myCanvas.width * 0.22;
    this.jamJar.y = this.myCanvas.height * 0.68;
    this.fullJarMovement.scale = this.jamJar.scale;
    this.fullJarMovement.x = this.jamJar.x;
    this.fullJarMovement.y = this.jamJar.y;

    let scale = 0.28;
    let _x = this.myCanvas.width * 0.021;
    let _y = this.myCanvas.height * 0.78;
    this.fullJarMovement.x2 = _x;
    this.fullJarMovement.y2 = _y;
    this.fullJarMovement.scale2 = scale;
    this.fullJarMovement.functionToFireWhenDone = this.fullJarMovement.nullFunction;
    this.fullJarMovement.functionToFireWhenDone = () => {
      this.jamJar.fullJars++;
    };
    this.fullJarMovement.shouldPlay = true;
    if (this.jamJar.emptyJars <= 0) {
      return;
    }
    this.emptyJarMovement.scale = 0.28;
    this.emptyJarMovement.x = this.myCanvas.width * 0.58;
    this.emptyJarMovement.y = this.myCanvas.width * 0.78;
    this.emptyJarMovement.x2 = this.fullJarMovement.x;
    this.emptyJarMovement.y2 = this.fullJarMovement.y;
    this.emptyJarMovement.scale2 = this.fullJarMovement.scale;
    this.emptyJarMovement.functionToFireWhenDone = this.emptyJarMovement.nullFunction;
    this.emptyJarMovement.functionToFireWhenDone = () => {
      this.jamJar.init();
      this.juiceDrip.isLocked = false;
    };
    this.emptyJarMovement.shouldPlay = true;
    this.jamJar.emptyJars--;
  }

  grabTheHandle() {
    if (this.myHandle.isIdle == true) return;
    this.xu = this.cursorX;
    this.yu = this.cursorY;

    this.myHandle.isTurning = true;
  }

  releaseHandle() {
    this.handImg = this.hammerImg;
    this.myHandle.switchToImage1();
    this.xu = 0;
    this.yu = 0;
    this.myHandle.isTurning = false;
    this.juiceDrip.stopPlaying();
    this.juiceDrip.resetScale();
  }

  pourTheJuice() {
    this.juiceDrip.play();
    if (this.juiceDrip.isPouring == true) this.jamJar.updateFill(0.002);
  }

  tchEnd(event) {
    event.preventDefault();
    this.handImg = this.hammerImg;
    this.releaseHandle();
  }
  tchStart(event) {
    event.preventDefault();
    this.handImg = this.hammerImg2;
    let clickX = event.touches[0].pageX - this.cX;
    let clickY = event.touches[0].pageY - this.cY;
    this.cursorX = clickX;
    this.cursorY = clickY;
    if (this.didWeClickOnObject(0, clickX, clickY)) {
      this.objectWasClicked();
    }
  }
  tchMove(event) {
    event.preventDefault();
    this.cursorX = event.touches[0].pageX - this.cX;
    this.cursorY = event.touches[0].pageY - this.cY;
  }

  onmousemove(event) {
    const canvas = document.getElementById('jar-container');
    const styles = window.getComputedStyle(canvas);
    const top = parseInt(styles?.top, 10);
    const left = parseInt(styles?.left, 10);
    this.cursorX = event.pageX - left;
    this.cursorY = event.pageY - top;
  }
  mouseUp(event) {
    const canvas = document.getElementById('jar-container');
    const styles = window.getComputedStyle(canvas);
    const top = parseInt(styles?.top, 10);
    const left = parseInt(styles?.left, 10);
    this.cursorX = event.pageX - left;
    this.cursorY = event.pageY - top;
    this.handImg = this.hammerImg;
    this.releaseHandle();
  }
  mouseDown(event) {
    const canvas = document.getElementById('jar-container');
    const styles = window.getComputedStyle(canvas);
    const top = parseInt(styles?.top, 10);
    const left = parseInt(styles?.left, 10);
    this.handImg = this.hammerImg2;
    let clickX = event.pageX - left;
    let clickY = event.pageY - top;
    if (this.didWeClickOnObject(0, clickX, clickY)) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      this.objectWasClicked();
    }
  }

  didWeClickOnObject(i, clickX, clickY) {
    let _x1, _y1, _x2, _y2;
    _x1 = this.getTopLeft(i)[0];
    _y1 = this.getTopLeft(i)[1];

    _x2 = this.getBottomRight(i)[0];
    _y2 = this.getBottomRight(i)[1];

    if (clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2) {
      return true;
    }
    return false;
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

  objectWasClicked() {
    this.grabTheHandle();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
  }

  drawHammer() {
    if (this.handImg != null)
      this.ctx.drawImage(
        this.handImg,
        this.cursorX - this.handImg.width / 2,
        this.cursorY - this.handImg.height / 2,
      );
  }

  drawMachine() {
    let _x, _y, _width, _height;
    let scale = 0.48;

    _width = this.loadedImages['machine1'].width * scale;
    _height = this.loadedImages['machine1'].height * scale;
    _x = this.myCanvas.width * 0;
    _y = this.myCanvas.height * 0;
    this.ctx.drawImage(this.loadedImages['machine1'], _x, _y, _width, _height);
  }

  drawJar() {
    if (this.jamJar.shouldPlay == false) {
      return;
    }
    let _x, _y, _width, _height;
    let scale = this.jamJar.scale;
    _width = this.jamJar.image.width * scale;
    _height = this.jamJar.image.height * scale;
    _x = this.jamJar.x;
    _y = this.jamJar.y;

    this.ctx.drawImage(this.jamJar.image, _x, _y, _width, _height);
  }

  drawJarMovement() {
    this.fullJarMovement.drawMovement();
    this.emptyJarMovement.drawMovement();
  }

  drawEmptyJars() {
    let _x, _y, _width, _height;
    let scale = 0.28;

    if (this.jamJar.emptyJars <= 0) return;
    _width = this.loadedImages['stiklainis1'].width * scale;
    _height = this.loadedImages['stiklainis1'].height * scale;
    _x = this.myCanvas.width * 0.58;
    _y = this.myCanvas.height * 0.78;
    this.ctx.drawImage(this.loadedImages['stiklainis1'], _x, _y, _width, _height);

    if (this.jamJar.emptyJars == 1) return;
    _width = this.loadedImages['stiklainis1'].width * scale;
    _height = this.loadedImages['stiklainis1'].height * scale;
    _x = this.myCanvas.width * 0.58 + _width;
    _y = this.myCanvas.height * 0.78;
    this.ctx.drawImage(this.loadedImages['stiklainis1'], _x, _y, _width, _height);

    if (this.jamJar.emptyJars == 2) return;
    _width = this.loadedImages['stiklainis1'].width * scale;
    _height = this.loadedImages['stiklainis1'].height * scale;
    _x = this.myCanvas.width * 0.58 + _width * 2;
    _y = this.myCanvas.height * 0.78;
    this.ctx.drawImage(this.loadedImages['stiklainis1'], _x, _y, _width, _height);
  }

  drawFullJars() {
    let _x, _y, _width, _height;
    let scale = 0.28;
    if (this.jamJar.fullJars == 0) return;

    _width = this.loadedImages['fullJar'].width * scale;
    _height = this.loadedImages['fullJar'].height * scale;
    _x = this.myCanvas.width * 0.021;
    _y = this.myCanvas.height * 0.78;
    this.ctx.drawImage(this.loadedImages['fullJar'], _x, _y, _width, _height);

    if (this.jamJar.fullJars == 1) return;

    _width = this.loadedImages['fullJar'].width * scale;
    _height = this.loadedImages['fullJar'].height * scale;
    _x = this.myCanvas.width * 0.021;
    _y = this.myCanvas.height * 0.78 - _height;
    this.ctx.drawImage(this.loadedImages['fullJar'], _x, _y, _width, _height);

    if (this.jamJar.fullJars == 2) return;

    _width = this.loadedImages['fullJar'].width * scale;
    _height = this.loadedImages['fullJar'].height * scale;
    _x = this.myCanvas.width * 0.021;
    _y = this.myCanvas.height * 0.78 - _height * 2;
    this.ctx.drawImage(this.loadedImages['fullJar'], _x, _y, _width, _height);

    if (this.jamJar.fullJars == 3) return;

    _width = this.loadedImages['fullJar'].width * scale;
    _height = this.loadedImages['fullJar'].height * scale;
    _x = this.myCanvas.width * 0.021;
    _y = this.myCanvas.height * 0.78 - _height * 3;
    this.ctx.drawImage(this.loadedImages['fullJar'], _x, _y, _width, _height);
  }

  drawDrip() {
    if (this.juiceDrip.shouldPlay == false) return;
    let _x, _y, _width, _height;
    let scale = 0.48;

    _width = this.loadedImages['stiklainis1'].width * scale * 0.38;
    _height = this.loadedImages['stiklainis1'].height * (scale * this.juiceDrip.verticalScale);

    this.juiceDrip.updateScale();

    _x = this.myCanvas.width * 0.3 - _width / 2;
    _y = this.myCanvas.height * 0.62;
    this.ctx.drawImage(this.juiceDrip.image, _x, _y, _width, _height);
  }

  drawHandle() {
    if (this.myHandle.image == null || this.myHandle.isIdle == true) return;
    let _x, _y, _width, _height;
    let scale = 0.48;
    _width = this.myHandle.image.width * scale;
    _height = this.myHandle.image.height * scale;
    _x = this.myCanvas.width * 0.66;
    _y = this.myCanvas.height * 0.438;
    if (this.myHandle.isTurning == false)
      this.ctx.drawImage(this.myHandle.image, _x, _y, _width, _height);
    this.setClickArea(
      0,
      _x + this.myHandle.image.width * scale * 0.31,
      _y + this.myHandle.image.width * scale * -0.04,
      65,
      50,
    );

    if (this.myHandle.isTurning == false) return;

    let pivotX = _x + this.myHandle.image.width * scale * 0.196;
    let pivotY = _y + this.myHandle.image.height * scale * 0.492;
    this.ctx.save();
    this.ctx.translate(pivotX, pivotY);
    let rad = (this.cursorY - this.yu) * 0.016;

    if (rad > 2.0) this.releaseHandle();
    else if (rad < 0) rad = 0;
    else if (rad > 1) {
      rad = 1;
      this.myHandle.switchToImage2();
      this.pourTheJuice();
    }

    this.ctx.rotate(rad);
    this.ctx.translate(-pivotX, -pivotY);
    this.ctx.drawImage(this.myHandle.image, _x, _y, _width, _height);
    this.ctx.restore();
  }

  drawIdleHandle() {
    if (this.myHandle.isIdle == false) {
      return;
    }

    let scale = 0.48;
    let _x = this.myCanvas.width * 0.66;
    let _y = this.myCanvas.height * 0.438;
    let _width = this.myHandle.image.width * scale;
    let _height = this.myHandle.image.height * scale;
    let pivotX = _x + this.myHandle.image.width * scale * 0.196;
    let pivotY = _y + this.myHandle.image.height * scale * 0.492;
    let rad;
    rad = this.myHandle.updateRadians();
    this.ctx.save();
    this.ctx.translate(pivotX, pivotY);
    this.ctx.rotate(rad);
    this.ctx.translate(-pivotX, -pivotY);
    this.ctx.drawImage(this.myHandle.image, _x, _y, _width, _height);
    this.ctx.restore();
  }

  drawEziukus() {
    let _x, _y, _width, _height;
    let scale = 0.48;
    _width = this.eziukAnim1.width * scale;
    _height = this.eziukAnim1.height * scale;
    _x = this.myCanvas.width * 0.79;
    _y = this.myCanvas.height * 0.64;
    this.ctx.drawImage(this.eziukAnim1.image, _x, _y, _width, _height);
    this.eziukAnim1.update();
    _width = this.eziukAnim2.width * scale;
    _height = this.eziukAnim2.height * scale;
    _x = this.myCanvas.width * 0.36;
    _y = this.myCanvas.height * 0.7;
    this.ctx.drawImage(this.eziukAnim2.image, _x, _y, _width, _height);
    this.eziukAnim2.update();
    scale = 0.52;
    _width = this.loadedImages['eziukas30'].width * scale;
    _height = this.loadedImages['eziukas30'].height * scale;
    _x = this.myCanvas.width * 0.08;
    _y = this.myCanvas.height * 0.74;
    this.ctx.drawImage(this.loadedImages['eziukas30'], _x, _y, _width, _height);
  }
}
export default () => {
  new HedgehogWidget();
};
