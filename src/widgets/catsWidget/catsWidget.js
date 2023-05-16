import { pole1, pole2, crate1, crate2, crate3, crate4, crate5, crate6, fishHeapImg1, fishHeapImg2, cat1_1, cat1_2, cat1_3, cat1_4, cat2_1, cat2_2, cat2_3, cat2_4, ground, hammerImage } from '@/сonstants';
import * as Matter from 'matter-js'
import theAnimation from './animation';

class CatsWidget {
    constructor() {
        this.boxBlueImgsArr = [crate1, crate2, crate3, crate4, crate5, crate6];
        this.myCanvas = document.createElement("canvas");
        document.getElementsByTagName("Body")[0].appendChild(this.myCanvas);
        this.cX = 300;
        this.cY = 100;
        this.clickAreas = [[], []];
        this.myCanvas.style.position = "absolute";
        this.myCanvas.style.left = this.cX + 'px';
        this.myCanvas.style.top = this.cY + 'px';
        this.myCanvas.style.zIndex = "100";
        this.myCanvas.height = 300;
        this.myCanvas.width = 231;
        this.myCanvas.addEventListener("mousedown", (event) => this.mouseDown(event), false);
        this.myCanvas.addEventListener('mousemove', (event) => this.onmousemove(event), false);
        this.catAnim1 = theAnimation.animation();
        this.catAnim2 = theAnimation.animation();
        this.ctx = this.myCanvas.getContext("2d");
        this.brokenCubes = [false, false];
    // here we insert images used as frames, and specify how long frame should last (1 unit here approx = 1/60 sec)
    this.catAnim1.frames = [cat1_1, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4];
    this.catAnim1.frameDurations = [120, 6, 6, 6, 6, 6, 6, 6, 6, 20]; // should be same length as frame array
    this.catAnim2.frames = [cat2_1, cat2_2, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4];
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
    const stiliukas = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(stiliukas);
    
    const myCss = `
    canvas {
        border: 0px solid #055500;
        display: block;
        margin: 0 auto;
        image-rendering: high-quality;
      }
    `;
    const addStyles = (stylesheet, cssRules) => {
        if (stylesheet.styleSheet) {
            stylesheet.styleSheet.cssText = cssRules;
        } else {
            stylesheet.appendChild(document.createTextNode(cssRules));
        }
    };
    
    addStyles(stiliukas, myCss);
    Matter.Runner.run(this.runner, this.engine);


    this.start();
    }
    
    start(){
    var crateImg=new Image();
    crateImg.onload = () => {
        this.createBoxes(crateImg)
          .then(() => {
            this.addBoxesTotheWorld();
            
            this.catAnim1.init();
            this.catAnim2.init();
            requestAnimationFrame(() => this.frame());

          })
          .catch((error) => {
            console.error('Error creating boxes:', error);
          });
      };
      crateImg.src = crate1;

    }

    timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : Date.now();
      }
      
      fps = 30;
      now;
      then = Date.now();
      interval = 1000/this.fps;
      delta;

      frame() {
        requestAnimationFrame(() => this.frame());
     
        this.now = Date.now();
        this.delta = this.now - this.then;
         
        if (this.delta > this.interval) {
            this.then = this.now - (this.delta % this.interval);
            this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
            this.drawPole();
            this.drawCubes1();
            this.drawCubes2();
            this.drawFishHeap();
            this.drawCats();
            this.drawGround();
            this.drawHammer();       
         }
        }
      
 createBoxes(crateImg){
    return new Promise((resolve) => {
    let _x, _y, _width, _height;
    let scale = 0.64;
    let collisionWidth, collisionHeight;

    _width = crateImg.width * scale;
    _height = crateImg.height * scale;
    collisionWidth = _width / 1.33;
    collisionHeight = _height / 1.13;
    _x = this.myCanvas.width * 0.28;
    _y = this.myCanvas.height * 0.48
    this.boxA = Matter.Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
    this.boxA.collisionFilter.group = 1;
    Matter.Body.setAngle(this.boxA, 90 * (Math.PI / 180));

    scale = 0.47;
    _width = crateImg.width * scale;
    _height = crateImg.height * scale;
    collisionWidth = _width / 1.33 * 0.99;
    collisionHeight = _height / 1.13 * 0.99;
    _x = this.myCanvas.width * 0.53;
    _y = this.myCanvas.height * 0.10;
    this.boxB = Matter.Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
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
    console.log('18');
    let divH;
  
    divH = crate6.height / crate1.height;

    Matter.Body.scale(box, 1, divH);
    box.height = box.height * divH;

    }

    addBoxesTotheWorld() {
    console.log('17',this.theGround);
    Matter.Composite.add(this.engine.world, [this.boxA, this.boxB, this.theGround, this.wall1, this.wall2, this.roof]);
    } 

   createFishHeap(box, i) {
    let _x, _y, _width, _height;
    let div;
    _x = box.position.x;
    _y = box.position.y;
    console.log(box.position);
    if (i == 0) {

        var fishHeapImage1=new Image();
        fishHeapImage1.onload = () => {
            div = fishHeapImage1.height / fishHeapImage1.width;
            _width = box.collisionWidth;
            _height = box.collisionWidth * div;
            this.fishHeap1 = Matter.Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
            this.fishHeap1.collisionFilter.group = -1
              .then(() => {
                Matter.Composite.add(this.engine.world, this.fishHeap1);
            })
              .catch((error) => {
                console.error('Error creating boxes:', error);
              });
          };
        fishHeapImage1.src=fishHeapImg1;
        console.log('created1',this.fishHeap1);

    } else if (i == 1) {
        var fishHeapImage2=new Image();
        fishHeapImage2.onload = () => {
            div = fishHeapImage2.height / fishHeapImage2.width;
            _width = box.collisionWidth;
            _height = box.collisionWidth * div;
            this.fishHeap2 = Matter.Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
            this.fishHeap2.collisionFilter.group = -1
              .then(() => {
                Matter.Composite.add(this.engine.world, this.fishHeap1);
            })
              .catch((error) => {
                console.error('Error creating boxes:', error);
              });
          };
        fishHeapImage2.src=fishHeapImg2;
                console.log('created1',this.fishHeap1);
    }
    }

    onmousemove(event) {
    console.log('15');
    console.log('event.pageX',event.pageX);
    console.log('this.cX',this.cX);

    this.cursorX = event.pageX - this.cX;
    this.cursorY = event.pageY - this.cY;
    }

    mouseDown(event) {
    console.log('14');
    let clickX = event.pageX - this.cX;
    let clickY = event.pageY - this.cY;
    if (this.didWeClickOnObject(1, clickX, clickY)) {
        this.objectWasClicked(this.boxB, 1);
      } else if (this.didWeClickOnObject(0, clickX, clickY)) {
        this.objectWasClicked(this.boxA, 0);
      }
    }

    didWeClickOnObject(i, clickX, clickY) {
    console.log('13');
    let _x1, _y1, _x2, _y2;
    _x1 = this.getTopLeft(i)[0];
    _y1 = this.getTopLeft(i)[1];
    _x2 = this.getBottomRight(i)[0];
    _y2 = this.getBottomRight(i)[1];
    return this.brokenCubes[i] == false && clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2;
    }

///// identify clicked area s:

 setClickArea(i, _x, _y, _width, _height) {
    console.log('12');
    this.clickAreas[i] = [_x, _y, _x + _width, _y + _height]
}

 getTopLeft(i) {
    console.log('11');
    let topLeft = [this.clickAreas[i][0], this.clickAreas[i][1]];
    return topLeft;
}
 getBottomRight(i) {
    console.log('10');
    let topRight = [this.clickAreas[i][2], this.clickAreas[i][3]];
    return topRight;
}

 objectWasClicked(box, i) {
    console.log('9');
    let neg = Math.sign(Math.random() - 0.5);
    Matter.Body.applyForce(box, { x: box.position.x, y: box.position.y }, { x: -0.26 * neg, y: -0.49 });
    if (box.clickCount < this.boxBlueImgsArr.length - 1)
        box.clickCount++;
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

 drawHammer() {
    var img=new Image();
    img.onload = () => {
        this.ctx.drawImage(img, this.cursorX, this.cursorY);
    };
   img.src=hammerImage;
}

drawPole() {
    var img1 = new Image();
    img1.onload = () => {
        var img2 = new Image();
        img2.onload = () => {
            let _x, _y, _width, _height;
            let scale = 0.64;
            _x = 0;
            _y = 0;
            _width = img1.width * scale;
            _height = img1.height * scale;
            if (this.boxA?.clickCount === 0 && this.boxB?.clickCount === 0) {
                this.ctx.drawImage(img1, _x, _y, _width, _height);
            } else {
                this.ctx.drawImage(img2, _x, _y, _width, _height);
            }
        };
        img2.src = pole2; // Start loading the second image after the first one has loaded
    };
    img1.src = pole1; // Start loading the first image

    // Removed the `start()` function as it's not necessary anymore
}


 drawGround() {
    console.log('5');
    let _x, _y, _width, _height;
    let div;
    var img=new Image();
    img.onload = () => {
        div = img.width / img.height;
        _width = this.myCanvas.width;
        _height = this.myCanvas.width / div;
        _x = 0;
        _y = this.myCanvas.height - _height;
        this.ctx.drawImage(img, _x, _y, _width, _height);
        };
    img.src=ground;
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
        _x = pivotX - (_width / 2);
        _y = pivotY - (_height / 2);
        this.ctx.translate(pivotX, pivotY);
        this.ctx.rotate(this.boxB.angle);
        this.ctx.translate(-pivotX, -pivotY);
      const boxImg1 = new Image();
      boxImg1.onload = () => {
        this.ctx.drawImage(boxImg1, _x, _y, _width, _height);
      };
      boxImg1.src = this.boxBlueImgsArr[this.boxB.clickCount];
    }
    this.setClickArea(1, _x, _y, _width, _height);
    this.ctx.restore();
  
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
        _x = pivotX - (_width / 2);
        _y = pivotY - (_height / 2);
    
        this.ctx.translate(pivotX, pivotY);
        this.ctx.rotate(this.boxA.angle);
        this.ctx.translate(-pivotX, -pivotY);
      const boxImg2 = new Image();
      boxImg2.onload = () => {
        this.ctx.drawImage(boxImg2, _x, _y, _width, _height);
      };
      boxImg2.src = this.boxBlueImgsArr[this.boxA.clickCount];
    }
    this.setClickArea(0, _x, _y, _width, _height);
    this.ctx.restore();
  }


 drawFishHeap() {
    console.log('draw',this.fishHeap1);

    let _x, _y, _width, _height;
    if (this.boxA.broken == true) {
        let pivotX, pivotY;
        var fishHeapImage1=new Image();
        fishHeapImage1.onload = () => {
            pivotX = this.fishHeap1.position.x;
            pivotY = this.fishHeap1.position.y;
            _width = fishHeapImage1.width;
            _height = fishHeapImage1.height;
            _x = pivotX - (_width / 2);
            _y = pivotY - (_height / 2);
            this.ctx.drawImage(fishHeapImage1, _x, _y, _width, _height);
          };
          fishHeapImage1.src=fishHeapImg1;
    }
    if (this.boxB.broken == true) {
        var fishHeapImage2=new Image();
        fishHeapImage2.onload = () => {
            let pivotX, pivotY;
            pivotX = this.fishHeap2.position.x;
            pivotY = this.fishHeap2.position.y;
            _width = fishHeapImage2.width;
            _height = fishHeapImage2.height;
            _x = pivotX - (_width / 2);
            _y = pivotY - (_height / 2);
            this.ctx.drawImage(fishHeapImage2, _x, _y, _width, _height);
        };
        fishHeapImage2.src=fishHeapImg2;
    }
}

 drawCats() {
    if (this.boxA.clickCount > 0 || this.boxB.clickCount > 0)
        return;
            const catImage2 = new Image();
    let _x, _y, _width, _height;
    let scale = 0.28;

    catImage2.onload = () => {
        _width = catImage2.width * scale;
        _height = catImage2.height * scale;
        _x = this.myCanvas.width * 0.12;
        _y = this.myCanvas.height * 0.28;
        this.ctx.drawImage(catImage2, _x, _y, _width, _height);
    };
    catImage2.src = this.catAnim2.image;
    this.catAnim2.update();

    const catImage1 = new Image();
    catImage1.onload = () => {
        scale = 0.45;
        _width = catImage1.width * scale;
        _height = catImage1.height * scale;
        _x = 0;
        _y = this.myCanvas.height * 0.58;
        this.ctx.drawImage(catImage1, _x, _y, _width, _height);
    };
    catImage1.src = this.catAnim1.image;
    this.catAnim1.update();
}
}
export default () => {
    new CatsWidget();
  };


