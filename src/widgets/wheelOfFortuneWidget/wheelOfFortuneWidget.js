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
import { outerBorderGradient } from './constants';
import { outerBorderAngle } from './constants';
import { innerBorderGradient } from './constants';
import { shadowGradient } from './constants';
import { wrecks } from './constants';
import { pictS } from './constants';
import { pictL } from './constants';
import './styles.css';
import { createCloseMoveButtons } from '@/utlis';

class WheelOfFortuneWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success && !localStorage.getItem('testing_Widgets')) return;
    this.x = window.matchMedia('(min-width: 560px)').matches
      ? 300
      : window.matchMedia('(min-width: 390px)').matches
      ? 1
      : -20;
    this.y = 200;
    this.size = window.matchMedia('(min-width: 560px)').matches ? 450 : 350;
    this.createWheel();
    this.elSpin = document.querySelector('#boomio-spin');
    this.ctx = document.getElementById('boomio-wheel').getContext`2d`;
    // this.config.list = this?.config?.list ?? defaultList;
    this.setValues();
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
    this.drawBackground();
    this.elSpin.addEventListener('click', () => {
      boomioService.signal('SPIN');
      if (this.isSpinning) return;
      this.isSpinning = true;
      this.isAccelerating = true;
      // this.angVelMax = getRandomArbitrary(0.1, 0.2);
      this.angVelMax = 0.15;
    });

    this.config?.list?.forEach(this.drawSector);
    this.config?.list?.forEach(this.addText);
    this.wheelOfFortune = document.getElementById('boomio-wheelOfFortune');

    new DragElement(this.wheelOfFortune);
    this.rotate(); // Initial rotation
    this.engine(); // Start engine!
    this.startAnimation();
    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

    createCloseMoveButtons(
      this.wheelOfFortune,
      this.wheelOfFortune,
      isMobile ? [-140, 0] : [-200, 0],
      true,
    );
  }
  engine = () => {
    this.frame();
    requestAnimationFrame(this.engine);
  };
  /**
   * Sets value to a winning segment of wheel. Uses "p_top_text" field from handle for that.  Sets other values randomised around or from constants.js
   */
  setValues = () => {
    // this.config.p_top_text = '370€'
    this.config.list = defaultList;
    const winningValue = this.config.p_top_text?.replace(/\D/g, '');
    if (this.config.p_top_text?.includes('$') || this.config.p_top_text?.includes('€')) {
      this.config.list.forEach((e) => {
        const rounding = winningValue.length > 1 ? winningValue.length - 1 : 1;
        const value =
          winningValue * 1 +
          Math.round((winningValue * getRandomArbitrary(-1, 1)) / Math.pow(10, rounding - 1)) *
            Math.pow(10, rounding - 1);
        e.label = `${value}${this.config.p_top_text.includes('$') ? ' $' : ' €'}`;
      });
      this.config.list[5].label = `${winningValue} ${
        this.config.p_top_text.includes('$') ? ' $' : ' €'
      }`;
    }
    if (this.config.p_top_text?.includes('%')) {
      this.config.list[5].label = `${winningValue} % OFF`;
    }
    if (this.config.p_top_text?.toLowerCase().includes('free shipping')) {
      this.config.list[5].label = 'Free Shippping';
    }
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
        setTimeout(() => {
          this.wheelOfFortune.remove();
        }, 2000);
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
            <img style="width: 40px; height: 40px" src="https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/wheelof-fortune/images/wheelOfFortuneWidget/fav-boomiyo.png?raw=true"></img>
        `;
    // this.elSpin.style.background = sector.color;

    this.elSpin.style.color = 'white';
  };

  drawBackground = () => {
    // return
    this.ctx.beginPath(); // outer circle
    let angle = outerBorderAngle + (3 * this.PI) / 2;
    let gx = this.rad * Math.cos(angle);
    let gy = this.rad * Math.sin(angle);
    let cx = this.rad;
    let cy = this.rad;
    let grd = this.ctx.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
    outerBorderGradient.forEach((st) => grd.addColorStop(st.pct, st.clr));
    this.ctx.fillStyle = grd;
    this.ctx.arc(this.rad, this.rad, this.rad, 0, 2 * this.PI);
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();

    this.ctx.beginPath(); // black circle
    this.ctx.fillStyle = 'black';
    if (this.size === 350) {
      this.ctx.arc(this.rad, this.rad, this.rad - 2, 0, 2 * this.PI);
    } else {
      this.ctx.arc(this.rad, this.rad, this.rad - 3, 0, 2 * this.PI);
    }
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();

    this.ctx.beginPath(); // inner circle
    angle = 0;
    gx = this.rad * Math.cos(angle);
    gy = this.rad * Math.sin(angle);
    cx = this.rad;
    cy = this.rad;
    grd = this.ctx.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
    innerBorderGradient.forEach((st) => grd.addColorStop(st.pct, st.clr));
    this.ctx.fillStyle = grd;
    // this.ctx.arc(this.rad, this.rad, this.rad - 18, 0, 2 * this.PI)
    if (this.size === 350) {
      this.ctx.arc(this.rad, this.rad, this.rad - 23, 0, 2 * this.PI);
    } else {
      this.ctx.arc(this.rad, this.rad, this.rad - 32, 0, 2 * this.PI);
    }
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();

    this.ctx.beginPath(); // white circle
    this.ctx.fillStyle = 'white';
    // this.ctx.arc(this.rad, this.rad, this.rad - 20, 0, 2 * this.PI)
    if (this.size === 350) {
      this.ctx.arc(this.rad, this.rad, this.rad - 26, 0, 2 * this.PI);
    } else {
      this.ctx.arc(this.rad, this.rad, this.rad - 36, 0, 2 * this.PI);
    }
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();
  };

  drawSector = (sector, i) => {
    let outerCircle;
    if (this.size === 350) {
      outerCircle = 26;
    } else {
      outerCircle = 36;
    }
    const ang = this.arc * i - this.arc / 2;
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.beginPath();
    let grdShadow;
    grdShadow = this.ctx.createRadialGradient(
      this.rad,
      this.rad,
      0,
      this.rad,
      this.rad,
      this.rad - outerCircle,
    );
    shadowGradient.forEach((st) => grdShadow.addColorStop(st.pct, st.clr));
    this.ctx.fillStyle = grdShadow;
    this.ctx.moveTo(this.rad, this.rad);
    this.ctx.arc(this.rad, this.rad, this.rad - outerCircle, ang, ang + this.arc);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    const gx = this.rad * Math.cos(ang + this.PI + this.arc / 2);
    const gy = this.rad * Math.sin(ang + this.PI + this.arc / 2);
    const grd = this.ctx.createLinearGradient(this.rad - gx, this.rad - gy, this.rad, this.rad);
    sector.color.forEach((st) => grd.addColorStop(st.pct, st.clr));
    this.ctx.fillStyle = grd;
    this.ctx.moveTo(this.rad, this.rad);
    // this.ctx.arc(this.rad, this.rad, this.rad - 20, ang, ang + this.arc);
    this.ctx.arc(this.rad, this.rad, this.rad - outerCircle, ang, ang + this.arc);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  };
  addText = (sector, i) => {
    const ang = this.arc * i - this.arc / 2;
    this.ctx.save();
    this.ctx.translate(this.rad, this.rad);
    this.ctx.rotate(ang + this.arc / 2);
    //shadow
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#FE4100';

    if (this.size === 350) {
      this.ctx.font = 'bold 17px Montserrat';
      this.ctx.fillText(sector.label, this.rad - 97, 10, 75);
    } else {
      this.ctx.font = 'bold 20px Montserrat';
      this.ctx.fillText(sector.label, this.rad - 122, 10, 85);
    }
    //text
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';

    if (this.size === 350) {
      this.ctx.font = 'bold 17px Montserrat';
      this.ctx.fillText(sector.label, this.rad - 95, 10, 75);
    } else {
      this.ctx.font = 'bold 20px Montserrat';
      this.ctx.fillText(sector.label, this.rad - 120, 10, 85);
    }
    this.ctx.restore();
  };

  createWheel = () => {
    let pict;
    this.size === 350 ? (pict = pictS) : (pict = pictL);
    const x = this.x;
    const y = this.y + document.documentElement.scrollTop;
    const wheel = document.createElement('div');
    wheel.setAttribute('id', 'boomio-wheelOfFortune');
    wheel.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    wheel.classList.add('boomio-wheelOfFortune');
    wheel.style.display = 'flex';
    wheel.style.left = `${x}px`;
    wheel.style.top = `${y}px`;
    wheel.innerHTML = `<div>
    <canvas id="boomio-wheel" class="boomio-wheel" width="${this.size}" height="${this.size}">
    </canvas><div class="boomio-spin-border-wrap">
    <div id="boomio-spin" class="boomio-spin"></div></div>
    <div class="boomio-topmark-box"></div>
    <div class="boomio-topmark-arrow"></div>
    </div>
    `;
    widgetHtmlService.container.appendChild(wheel);
    wheel.style.display = 'none';
    const delay = 100;
    let transition = 0;
    wrecks.forEach((w) => {
      const current = w.transition.replace(/[^0-9 .]/g, '');
      if (current > transition) transition = current;
    });
    wrecks.forEach((w, i) => {
      window['pict' + i] = document.createElement('img');
      window['pict' + i].classList.add('boomio-picture');
      window['pict' + i].src = pict;
      window['pict' + i].style.left = `${x + w.dx}px`;
      window['pict' + i].style.top = `${y + w.dy}px`;
      window['pict' + i].style.clipPath = w.path;
      const angle = Math.ceil(Math.random() * 359);
      window['pict' + i].style.transform = `rotate(${angle}deg)`;
      setTimeout(() => {
        window['pict' + i].style.transform = `translate(${-w.dx}px,${-w.dy}px) rotate(0deg)`;
        window['pict' + i].style.transition = w.transition;
      }, delay);
      widgetHtmlService.container.appendChild(window['pict' + i]);
    });
    setTimeout(() => {
      const pictures = document.querySelectorAll('.boomio-picture');

      // Apply CSS transition for opacity to the pictures
      pictures.forEach((pic) => {
        pic.style.transition = 'opacity 0.5s ease'; // You can adjust the duration and easing as needed
        pic.style.opacity = 0.8;
      });
      wheel.style.opacity = 0.1;
      wheel.style.display = 'flex';

      setTimeout(() => {
        wheel.style.transition = 'opacity 0.5s ease'; // You can adjust the duration and easing as needed
        wheel.style.opacity = 1; // Set the opacity to 1 to make it visible
      }, 500);
      // After the pictures have faded out, remove them from the DOM
      setTimeout(() => {
        pictures.forEach((pic) => pic.remove());
      }, 700); // Adjust the time (in milliseconds) to match your transition duration
    }, delay + transition * 1000);
  };

  startAnimation = () => {
    const x = this.x;
    const y = this.y + document.documentElement.scrollTop;
    // true stands for no animation
    new AnimationService(
      {
        elem: this.wheelOfFortune,
        size: this.size,
        posx: x,
        posy: y,
      },
      true,
    );
  };
}

export default () => {
  new WheelOfFortuneWidget();
};
