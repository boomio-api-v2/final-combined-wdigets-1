import {
  boomioService,
  localStorageService,
  DragElement,
  QrCodeModal,
  AnimationService,
  widgetHtmlService,
} from '@/services';
import { getRandomArbitrary } from '@/utlis';
import { defaultList } from './constants';
import './styles.css';

class WheelOfFortuneWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success && !localStorage.getItem('testing_Widgets')) return;
    this.createWheel();
    this.elSpin = document.querySelector('#spin');
    this.ctx = document.getElementById('wheel').getContext`2d`;
    this.config.list = this?.config?.list ?? defaultList;
    this.tot = this.config?.list?.length ?? 0;
    this.dia = this.ctx.canvas.width;
    this.rad = this.dia / 2;
    this.PI = Math.PI;
    this.TAU = 2 * this.PI;
    this.arc = this.TAU / (this.config?.list?.length ?? 0);
    this.friction = 0.991;
    this.angVelMin = 0.002;
    this.angVelMax = 0;
    this.angVel = 0;
    this.ang = 0;
    this.isSpinning = false;
    this.isAccelerating = false;
    this.elSpin.addEventListener('click', () => {
      boomioService.signal('SPIN');
      if (this.isSpinning) return;
      this.isSpinning = true;
      this.isAccelerating = true;
      this.angVelMax = getRandomArbitrary(0.1, 0.2);
    });

    this.config?.list?.forEach(this.drawSector);
    /// //To Check///////
    // if (document.readyState !== 'complete') return;
    this.wheelOfFortune = document.getElementById('wheelOfFortune');
    this.wheelOfFortune.style.display = 'block';
    this.addCloseIconToElement(this.wheelOfFortune);

    new DragElement(this.wheelOfFortune);

    this.rotate(); // Initial rotation
    this.engine(); // Start engine!
    this.startAnimation();
  }

  engine = () => {
    this.frame();
    requestAnimationFrame(this.engine);
  };

  frame = () => {
    if (!this.isSpinning) return;

    if (this.angVel >= this.angVelMax) this.isAccelerating = false;

    // Accelerate
    if (this.isAccelerating) {
      this.angVel ||= this.angVelMin; // Initial velocity kick
      this.angVel *= 1.06; // Accelerate
    }


    // Decelerate
    else {
      this.isAccelerating = false;
      this.angVel *= this.friction; // Decelerate by friction

      // SPIN END:
      if (this.angVel < this.angVelMin) {
        this.isSpinning = false;
        this.angVel = 0;
        new QrCodeModal();
        this.wheelOfFortune.remove();
      }
    }
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    this.rotate(); // CSS rotate!
  };

  getIndex = () => Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

  rotate = () => {
    const sector = this.config?.list?.[this.getIndex()];
    this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
    this.elSpin.innerHTML = !this.angVel
      ? 'SPIN'
      : `      
            <img style="width: 40px; height: 40px" src="https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/gift.png?raw=true"></img>
        `;
    //  Correct image to be put here
    this.elSpin.style.background = 'white';
  };

  drawSector = (sector, i) => {
    const ang = this.arc * i;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = sector.color;
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();
    this.ctx.translate(this.rad, this.rad);
    // this.ctx.rotate(ang + this.arc / 2); 
    this.ctx.rotate(ang + this.arc / 2 + 3 * Math.PI / 2); // rotate by 90 degrees

    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 15px sans-serif';
    // this.ctx.font = '14px serif';
    const img = new Image();

    img.src = sector.img;
    // this.ctx.drawImage(img, 86, -12, 32, 32);
    // this.ctx.fillText(sector.label, this.rad - 55, 10);
    this.ctx.fillText(sector.label, 0, 55); // change text position
    this.ctx.restore();
  };

  createWheel = () => {
    const wheel = document.createElement('div');
    wheel.setAttribute('id', 'wheelOfFortune');
    wheel.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    wheel.classList.add('wheel-border');
    wheel.style.display = 'none';
    wheel.innerHTML = `
                <canvas id="wheel" width="250" height="250"></canvas>
                <div id="spin">SPIN asd asd asd as dasd as dasd asd asd as d</div>
          `;
    widgetHtmlService.container.appendChild(wheel);
  };

  startAnimation = () => {
    new AnimationService({
      elem: this.wheelOfFortune,
      size: 250,
    });
  };

  addCloseIconToElement = (element) => {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('custom-close-icon');
    closeBtn.innerHTML = '&#x2715; ';
    closeBtn.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        element.remove();
      },
      { once: true },
    );
    element.appendChild(closeBtn);
  };
}

export default () => {
  new WheelOfFortuneWidget();
};
