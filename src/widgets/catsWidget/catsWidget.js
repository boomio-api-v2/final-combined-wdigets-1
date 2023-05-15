import { pole1, pole2, crate1, crate2, crate3, crate4, crate5, crate6, fishHeap1, fishHeap2, cat1_1, cat1_2, cat1_3, cat1_4, cat2_1, cat2_2, cat2_3, cat2_4, ground, hammerImage } from '@/сonstants';
import * as Matter from 'matter-js'
import theAnimation from './animation';


class CatsWidget {
    constructor() {
        this.boxBlueImgsArr = [crate1, crate2, crate3, crate4, crate5, crate6];

        this.start();
      }

      start = () => {
        this.catAnim1 = theAnimation.animation();
        this.catAnim2 = theAnimation.animation();
        this.catAnim1.init();
        this.catAnim2.init();
        this.myCanvas = document.createElement("canvas");
        document.getElementsByTagName("Body")[0].appendChild(this.myCanvas);
        const cX = 300;
        const cY = 100;
        this.clickAreas = [[], []];
        this.myCanvas.style.position = "absolute";
        this.myCanvas.style.left = cX + 'px';
        this.myCanvas.style.top = cY + 'px';
        this.myCanvas.style.zIndex = "100";
        this.myCanvas.height = 300;
        this.myCanvas.width = 231;
        this.myCanvas.addEventListener("mousedown", this.mouseDown, false);
        this.myCanvas.addEventListener('mousemove', this.onmousemove, false);

        this.ctx = this.myCanvas.getContext("2d");
        this.brokenCubes = [false, false];
    // here we insert images used as frames, and specify how long frame should last (1 unit here approx = 1/60 sec)
    this.catAnim1.frames = [cat1_1, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4];
    this.catAnim1.frameDurations = [120, 6, 6, 6, 6, 6, 6, 6, 6, 20]; // should be same length as frame array
    
    this.catAnim2.frames = [cat2_1, cat2_2, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4];
    this.catAnim2.frameDurations = [75, 34, 7, 7, 7, 7, 7, 7, 7, 7];
    var engine = Matter.Engine.create();
    this.createBoxes();
    this.addBoxesTotheWorld(engine);
    // create two boxes and a ground
    this.boxA, boxB, theGround, wall1, wall2, roof, fishHeap1, fishHeap2;
    // create runner
    var runner = Matter.Runner.create();
    this.cursorX = 0; this.cursorY = 0;
    this.now
    this.dt = 0
    this.last = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    this.step = 1/60;
    this.frame();
     Matter.Runner.run(runner, engine);
    }

    frame() {
    this.now = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
    while (this.dt > this.step) {
        this.dt = this.dt - this.step;
        //update(step);
    }
    this.clearScreen();
    this.drawPole();
    this.drawCubes();
    this.drawFishHeap();
    this.drawCats();
    this.drawGround();
    this.drawHammer();
    this.last = this.now;
    requestAnimationFrame(this.frame.bind(this)); 
}


 createBoxes= () => {
    let _x, _y, _width, _height;
    let scale = 0.64;
    let collisionWidth, collisionHeight;

    _width = crate1.width * scale;
    _height = crate1.height * scale;

    /// collision width and height are a bit smaller because
    // because box image has protruding bits like fish tails etc. we want only collide with box:
    collisionWidth = _width / 1.33;
    collisionHeight = _height / 1.13;
    _x = this.myCanvas?.width * 0.28;
    _y = this.myCanvas?.height * 0.48
    this.boxA = Matter.Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
    this.boxA.collisionFilter.group = 1;
    Matter.Body.setAngle(this.boxA, 90 * (Math.PI / 180));

    scale = 0.47;
    _width = crate1.width * scale;
    _height = crate1.height * scale;
    // we shrink collision just to colide with box itself:
    collisionWidth = _width / 1.33 * 0.99;
    collisionHeight = _height / 1.13 * 0.99;
    _x = this.myCanvas?.width * 0.53;
    _y = this.myCanvas?.height * 0.10;
    this.boxB = Matter.Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
    this.boxB.collisionFilter.group = 1;
    Matter.Body.setAngle(this.boxB, 180 * (Math.PI / 180));

    // walls for boxes to colide with:
    _width = this.myCanvas?.width;
    _height = 10;
    _x = this.myCanvas?.width / 2;
    _y = this.myCanvas?.height;
    this.theGround = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = 10;
    _height = this.myCanvas?.height;
    _x = -5;
    _y = this.myCanvas?.height / 2;
    this.wall1 = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = 10;
    _height = this.myCanvas?.height;
    _x = this.myCanvas?.width + 5;
    _y = this.myCanvas?.height / 2;
    this.wall2 = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = this.myCanvas?.width;
    _height = 10;
    _x = this.myCanvas?.width / 2;
    _y = -5;
    this.roof = Matter.Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });
}

 updateBoxColliderForBrokenBox(box) {
    let divH;
  
    divH = crate6.height / crate1.height;

    Matter.Body.scale(box, 1, divH);
    box.height = box.height * divH;

}
addBoxesTotheWorld= (engine) => {
    Matter.Composite.add(engine.world, [this.boxA, this.boxB, this.theGround, this.wall1, this.wall2, this.roof]);
  }
 createFishHeap(box, i) {

    let _x, _y, _width, _height;
    let div;

    _x = box.position.x;
    _y = box.position.y;

    if (i == 0) {
        div = fishHeap1.height / fishHeap1.width;
        _width = box.collisionWidth;
        _height = box.collisionWidth * div;
        fishHeap1 = Matter.Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
        fishHeap1.collisionFilter.group = -1;
        Matter.Composite.add(this.engine.world, fishHeap1);
    } else if (i == 1) {
        div = fishHeap2.height / fishHeap2.width;
        _width = box.collisionWidth;
        _height = box.collisionWidth * div;
        fishHeap2 = Matter.Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
        fishHeap2.collisionFilter.group = -1;
        Matter.Composite.add(this.engine.world, fishHeap2);
    }

}

 onmousemove(event) {
    this.cursorX = event.pageX - this.cX;
    this.cursorY = event.pageY - this.cY;
}

 mouseDown(event) {
    let clickX = event.pageX - this.cX;
    let clickY = event.pageY - this.cY;


    if (didWeClickOnObject(1, clickX, clickY)) { objectWasClicked(this.boxB, 1); }
    else if (didWeClickOnObject(0, clickX, clickY)) { objectWasClicked(this.boxA, 0); }
}

 didWeClickOnObject(i, clickX, clickY) {
    let _x1, _y1, _x2, _y2;
    _x1 = getTopLeft(i)[0];
    _y1 = getTopLeft(i)[1];

    _x2 = getBottomRight(i)[0];
    _y2 = getBottomRight(i)[1];

    if (this.brokenCubes[i] == false && clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2) { return true; }
    return false;
}

///// identify clicked area s:

 setClickArea(i, _x, _y, _width, _height) {
    this.clickAreas[i] = [_x, _y, _x + _width, _y + _height]
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
 clearScreen() {
    this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
}
 drawHammer() {
    if (hammerImage != null)
    var img=new Image();
    img.onload = () => {
        this.ctx.drawImage(img, this.cursorX, this.cursorY);
    };
   img.src=hammerImage;
}

 drawPole() {
    var img1=new Image();
    img1.onload=start;
    img1.src=pole1;

    var img2=new Image();
    img2.onload=start;
    img2.src=pole2;


    function start() {
        if(img1 && img2){
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
    }
    }

}

 drawGround() {
    let _x, _y, _width, _height;
    let div;

    div = ground.width / ground.height;

    _width = this.myCanvas.width;
    _height = this.myCanvas.width / div;
    _x = 0;
    _y = this.myCanvas.height - _height;
    var img=new Image();
    img.onload = () => {
        this.ctx.drawImage(img, _x, _y, _width, _height);
        };
    img.src=ground;
}

 drawCubes() {
    let _x, _y, _width, _height;
    let pivotX, pivotY;

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

    if (this.brokenCubes[1] == false){
    const img = new Image();
    img.onload = () => {
    this.ctx.drawImage(img, _x, _y, _width, _height);
    };
    img.src = this.boxBlueImgsArr[this.boxB.clickCount];
}

    this.setClickArea(1, _x, _y, _width, _height);
    this.ctx.restore();

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

    var brokenCube=new Image();
    brokenCube.onload=start;
    brokenCube.src=this.boxBlueImgsArr[this.boxA.clickCount];
    function start(){
    if (this.brokenCubes[0] == false){
        var img=new Image();
        img.onload = () => {
            this.ctx.drawImage(img, _x, _y, _width, _height);
        };
        img.src=brokenCube;
        this.setClickArea(0, _x, _y, _width, _height);
    this.ctx.restore();}
    }
}

 drawFishHeap() {
    let _x, _y, _width, _height;
    if (this.boxA.broken == true) {
        let pivotX, pivotY;
        var img=new Image();
        img.onload=start;
        img.src=fishHeap1;


        function start(){
            pivotX = img.position.x;
            pivotY = img.position.y;
            _width = img.width;
            _height = img.height;
            _x = pivotX - (_width / 2);
            _y = pivotY - (_height / 2);
            this.ctx.drawImage(img, _x, _y, _width, _height);
        }
    }
    if (this.boxB.broken == true) {
        let pivotX, pivotY;
        pivotX = fishHeap2.position.x;
        pivotY = fishHeap2.position.y;
        _width = fishHeap2.width;
        _height = fishHeap2.height;
        _x = pivotX - (_width / 2);
        _y = pivotY - (_height / 2);
        var img=new Image();
        img.onload = () => {
            this.ctx.drawImage(img, _x, _y, _width, _height);
        };
        img.src=fishHeap2;
    }
}

 drawCats() {
    if (this.boxA.clickCount > 0 || this.boxB.clickCount > 0)
        return;
    let _x, _y, _width, _height;
    let scale = 0.28;
    _width = this.catAnim2.width * scale;
    _height = this.catAnim2.height * scale;
    _x = this.myCanvas.width * 0.12;
    _y = this.myCanvas.height * 0.28;

    const catImage2 = new Image();
    catImage2.onload = () => {
        this.ctx.drawImage(catImage2, _x, _y, _width, _height);
    };
    catImage2.src = this.catAnim2.image;


    
    this.catAnim2.update();
    scale = 0.45;
    _width = this.catAnim1.width * scale;
    _height = this.catAnim1.height * scale;
    _x = 0;
    _y = this.myCanvas.height * 0.58;

    const catImage1 = new Image();
    catImage1.onload = () => {
        this.ctx.drawImage(catImage1, _x, _y, _width, _height);
    };
    catImage1.src = this.catAnim1.image;

    this.catAnim1.update();
}
}
export default () => {
    new CatsWidget();
  };


