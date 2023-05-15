import { pole1, pole2, crate1, crate2, crate3, crate4, crate5, crate6, fishHeap1, fishHeap2, cat1_1, cat1_2, cat1_3, cat1_4, cat2_1, cat2_2, cat2_3, cat2_4, ground, hammerImg } from '@/сonstants';
import * as Matter from 'matter-js'

const theAnimation = function () {
    function init() {
        anim.image = anim.frames[anim.currentFrame];
        anim.frameCount = anim.frames.length;
        anim.width = anim?.image?.width ??  '300px';
        anim.height = anim?.image?.height ?? '300px';
        anim.callCounter = anim.frameDurations[anim.currentFrame];
    }
    function update() {
        anim.callCounter--;
        if (anim.callCounter <= 0) {
            anim.currentFrame++;
            if (anim.currentFrame > anim.frameCount - 1)
                anim.currentFrame = 0;
            anim.image = anim.frames[anim.currentFrame];
            anim.callCounter = anim.frameDurations[anim.currentFrame];
        }
    }
    var anim = {

        frames: [],         // array of frames (images)
        frameDurations: [],  // array of durations for every frame
        currentFrame: 0,          // current frame. 
        frameCount: 0,          // number of frames
        image: null,       // the current image at the currentFrame
        width: null,       // width in pixels
        height: null,       // height in pixels
        callCounter: 0,          // counts number of draw calls

        init: init,      // call to initialize
        update: update     // call after drawing picture
    };
    return anim;
}

class CatsWidget {
    constructor() {
        this.start();
      }

      start() {
        var catAnim1 = theAnimation();
        var catAnim2 = theAnimation();

        catAnim1.init();
        catAnim2.init();
    
        var myCanvas = document.createElement("canvas");
        document.getElementsByTagName("body")[0].appendChild(myCanvas);
        const cX = 300;
        const cY = 100;
        let clickAreas = [[], []];
        myCanvas.style.position = "absolute";
        myCanvas.style.left = cX + 'px';
        myCanvas.style.top = cY + 'px';
        myCanvas.style.zIndex = "100";
        
        myCanvas.height = 300;
        myCanvas.width = 231;
        myCanvas.addEventListener("mousedown", this.mouseDown, false);
        myCanvas.addEventListener('mousemove', this.onmousemove, false);
        
        var ctx = myCanvas.getContext("2d");
        
        var brokenCubes = [false, false];
        let boxBlueImgsArr = [crate1, crate2, crate3, crate4, crate5, crate6];
    // here we insert images used as frames, and specify how long frame should last (1 unit here approx = 1/60 sec)
    catAnim1.frames = [cat1_1, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4, cat1_2, cat1_3, cat1_4];
    catAnim1.frameDurations = [120, 6, 6, 6, 6, 6, 6, 6, 6, 20]; // should be same length as frame array
    
    catAnim2.frames = [cat2_1, cat2_2, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4, cat2_3, cat2_4];
    catAnim2.frameDurations = [75, 34, 7, 7, 7, 7, 7, 7, 7, 7];
    this.createBoxes();
    this.addBoxesTotheWorld();

    
    
    // module aliases
    const consts = {
        Engine: Matter.Engine,
        World: Matter.World,
        Body: Matter.Body,
        Bodies: Matter.Bodies,
        Events: Matter.Events,
        Vector: Matter.Vector,
        Composite: Matter.Composite
      }
    
    // create an engine
    var engine = Engine.create();
    //engine.gravity.scale = 0.00025;
    
    // create two boxes and a ground
    let boxA, boxB, theGround, wall1, wall2, roof, fishHeap1, fishHeap2;
    
    // create runner
    var runner = Runner.create();
    
    let cursorX = 0; let cursorY = 0;
    
    ////////// game loop:
    
    var now,
        dt = 0,
        last = timestamp(),
        step = 1 / 60;
    
        Runner.run(runner, engine);
        requestAnimationFrame(frame);
    }

 frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        //update(step);
    }

    this.clearScreen();
    this.drawBackground();
    this.drawPole();
    this.drawCubes();
    this.drawFishHeap();
    this.drawCats();
    this.drawGround();
    this.drawHammer();

    last = now;

    requestAnimationFrame(frame);
}

/////////// s:


 timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}



 createBoxes() {
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
    boxA = Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
    boxA.collisionFilter.group = 1;
    Body.setAngle(boxA, 90 * (Math.PI / 180));

    scale = 0.47;
    _width = crate1.width * scale;
    _height = crate1.height * scale;
    // we shrink collision just to colide with box itself:
    collisionWidth = _width / 1.33 * 0.99;
    collisionHeight = _height / 1.13 * 0.99;
    _x = this.myCanvas?.width * 0.53;
    _y = this.myCanvas?.height * 0.10;
    boxB = Bodies.rectangle(_x + (_width / 2), _y + (_height / 2), collisionWidth, collisionHeight, { width: _width, height: _height, broken: false, clickCount: 0, collisionWidth: collisionWidth });
    boxB.collisionFilter.group = 1;
    Body.setAngle(boxB, 180 * (Math.PI / 180));

    // walls for boxes to colide with:
    _width = this.myCanvas?.width;
    _height = 10;
    _x = this.myCanvas?.width / 2;
    _y = this.myCanvas?.height;
    theGround = Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = 10;
    _height = this.myCanvas.height;
    _x = -5;
    _y = this.myCanvas.height / 2;
    wall1 = Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = 10;
    _height = this.myCanvas.height;
    _x = this.myCanvas?.width + 5;
    _y = this.myCanvas?.height / 2;
    wall2 = Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });

    _width = this.myCanvas?.width;
    _height = 10;
    _x = this.myCanvas.width / 2;
    _y = -5;
    roof = Bodies.rectangle(_x, _y, _width, _height, { isStatic: true });
}

 updateBoxColliderForBrokenBox(box) {
    let divH;
  
    divH = crate6.height / crate1.height;

    Body.scale(box, 1, divH);
    box.height = box.height * divH;

}

 addBoxesTotheWorld() {
    Composite.add(engine.world, [boxA, boxB, theGround, wall1, wall2, roof]);
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
        fishHeap1 = Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
        fishHeap1.collisionFilter.group = -1;
        Composite.add(engine.world, fishHeap1);
    } else if (i == 1) {
        div = fishHeap2.height / fishHeap2.width;
        _width = box.collisionWidth;
        _height = box.collisionWidth * div;
        fishHeap2 = Bodies.rectangle(_x, _y, _width, _height, { width: _width, height: _height });
        fishHeap2.collisionFilter.group = -1;
        Composite.add(engine.world, fishHeap2);
    }

}

// mouse callback s:

 onmousemove(event) {
    cursorX = event.pageX - cX;
    cursorY = event.pageY - cY;
}

 mouseDown(event) {
    let clickX = event.pageX - cX;
    let clickY = event.pageY - cY;


    if (didWeClickOnObject(1, clickX, clickY)) { objectWasClicked(boxB, 1); }
    else if (didWeClickOnObject(0, clickX, clickY)) { objectWasClicked(boxA, 0); }
}

 didWeClickOnObject(i, clickX, clickY) {
    let _x1, _y1, _x2, _y2;
    _x1 = getTopLeft(i)[0];
    _y1 = getTopLeft(i)[1];

    _x2 = getBottomRight(i)[0];
    _y2 = getBottomRight(i)[1];

    if (brokenCubes[i] == false && clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2) { return true; }
    return false;
}

///// identify clicked area s:


 setClickArea(i, _x, _y, _width, _height) {
    clickAreas[i] = [_x, _y, _x + _width, _y + _height]
}

 getTopLeft(i) {
    let topLeft = [clickAreas[i][0], clickAreas[i][1]];
    return topLeft;
}
 getBottomRight(i) {
    let topRight = [clickAreas[i][2], clickAreas[i][3]];
    return topRight;
}

////// when object is clicked s:

 objectWasClicked(box, i) {
    let neg = Math.sign(Math.random() - 0.5);
    Body.applyForce(box, { x: box.position.x, y: box.position.y }, { x: -0.26 * neg, y: -0.49 });
    if (box.clickCount < boxBlueImgsArr.length - 1)
        box.clickCount++;
    if (box.clickCount == boxBlueImgsArr.length - 1) {
        boxA.collisionFilter.group = -1;
        boxB.collisionFilter.group = -1;
        Body.setAngle(box, 0);
        if (box.broken == false) {
            this.createFishHeap(box, i);
            this.updateBoxColliderForBrokenBox(box);
        }
        box.broken = true;
    }

}


/////// Draw s:

 clearScreen() {
    ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
}

 drawHammer() {
    if (hammerImg != null)
        ctx.drawImage(hammerImg, cursorX, cursorY);
}

 drawBackground() {
    //  if (background != null)
    // ctx.drawImage(background, 0, 0, this.myCanvas.width, this.myCanvas.height);
}

 drawPole() {
    let _x, _y, _width, _height;
    let scale = 0.64;

    _x = 0;
    _y = 0;
    _width = pole1.width * scale;
    _height = pole1.height * scale;

    if (boxA.clickCount == 0 && boxB.clickCount == 0)
        ctx.drawImage(pole1, _x, _y, _width, _height);
    else
        ctx.drawImage(pole2, _x, _y, _width, _height);
}

 drawGround() {
    let _x, _y, _width, _height;
    let div;

    div = ground.width / ground.height;

    _width = this.myCanvas.width;
    _height = this.myCanvas.width / div;
    _x = 0;
    _y = this.myCanvas.height - _height;
    ctx.drawImage(ground, _x, _y, _width, _height);
}

 drawCubes() {
    let _x, _y, _width, _height;
    let pivotX, pivotY;

    ctx.save();
    _width = boxB.width;
    _height = boxB.height;
    pivotX = boxB.position.x;
    pivotY = boxB.position.y;
    _x = pivotX - (_width / 2);
    _y = pivotY - (_height / 2);
    ctx.translate(pivotX, pivotY);
    ctx.rotate(boxB.angle);
    ctx.translate(-pivotX, -pivotY);
    if (brokenCubes[1] == false)
        ctx.drawImage(boxBlueImgsArr[boxB.clickCount], _x, _y, _width, _height);
    setClickArea(1, _x, _y, _width, _height);
    ctx.restore();

    ctx.save();
    _width = boxA.width;
    _height = boxA.height;
    pivotX = boxA.position.x;
    pivotY = boxA.position.y;
    _x = pivotX - (_width / 2);
    _y = pivotY - (_height / 2);
    ctx.translate(pivotX, pivotY);
    ctx.rotate(boxA.angle);
    ctx.translate(-pivotX, -pivotY);
    if (brokenCubes[0] == false)
        ctx.drawImage(boxBlueImgsArr[boxA.clickCount], _x, _y, _width, _height);
    setClickArea(0, _x, _y, _width, _height);
    ctx.restore();
}

 drawFishHeap() {
    let _x, _y, _width, _height;


    if (boxA.broken == true) {
        let pivotX, pivotY;
        pivotX = fishHeap1.position.x;
        pivotY = fishHeap1.position.y;
        _width = fishHeap1.width;
        _height = fishHeap1.height;
        _x = pivotX - (_width / 2);
        _y = pivotY - (_height / 2);
        ctx.drawImage(fishHeap1, _x, _y, _width, _height);
    }

    if (boxB.broken == true) {
        let pivotX, pivotY;
        pivotX = fishHeap2.position.x;
        pivotY = fishHeap2.position.y;
        _width = fishHeap2.width;
        _height = fishHeap2.height;
        _x = pivotX - (_width / 2);
        _y = pivotY - (_height / 2);
        ctx.drawImage(fishHeap2, _x, _y, _width, _height);
    }

}

 drawCats() {

    if (boxA.clickCount > 0 || boxB.clickCount > 0)
        return;

    let _x, _y, _width, _height;
    let scale = 0.28;

    _width = catAnim2.width * scale;
    _height = catAnim2.height * scale;
    _x = this.myCanvas.width * 0.12;
    _y = this.myCanvas.height * 0.28;
    ctx.drawImage(catAnim2.image, _x, _y, _width, _height);
    catAnim2.update();

    scale = 0.45;
    _width = catAnim1.width * scale;
    _height = catAnim1.height * scale;
    _x = 0;
    _y = this.myCanvas.height * 0.58;
    ctx.drawImage(catAnim1.image, _x, _y, _width, _height);
    catAnim1.update();
}

}
export default () => {
    new CatsWidget();
  };


