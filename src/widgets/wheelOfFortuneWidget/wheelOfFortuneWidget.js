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
import { pict } from './constants';
import './styles.css';

class WheelOfFortuneWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success && !localStorage.getItem('testing_Widgets')) return;
    this.x =  window.innerWidth > 560 ? 300 : window.innerWidth > 390 ? 1 :-20
    this.y = 200
    this.createWheel(this.number);
    this.elSpin = document.querySelector('#spin');
    this.ctx = document.getElementById('wheel').getContext`2d`;
    // this.config.list = this?.config?.list ?? defaultList;
    this.setValues()
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
    this.wheelOfFortune = document.getElementById('wheelOfFortune');
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
  /**
   * Sets value to a winning segment of wheel. Uses "p_top_text" field from handle for that.  Sets other values randomised around or from constants.js
   */
  setValues = () => {
    // this.config.p_top_text = '370€'
    this.config.list = defaultList;
    const winningValue = this.config.p_top_text?.replace(/\D/g, "")
    if (this.config.p_top_text?.includes('$') || this.config.p_top_text?.includes('€')) {
      this.config.list.forEach((e) => {
        const rounding = winningValue.length > 1 ? winningValue.length - 1 : 1
        const value = winningValue * 1 + Math.round(winningValue * getRandomArbitrary(-1, 1) / Math.pow(10, rounding - 1)) * Math.pow(10, rounding - 1);
        e.label = `${value}${this.config.p_top_text.includes('$') ? ' $' : ' €'}`
      })
      this.config.list[5].label = `${winningValue} ${this.config.p_top_text.includes('$') ? ' $' : ' €'}`
    }
    if (this.config.p_top_text?.includes('%')) {
      this.config.list[5].label = `${winningValue} % OFF`
    }
    if (this.config.p_top_text?.toLowerCase().includes('free shipping')) {
      this.config.list[5].label = 'Free Shippping'
    }
  }

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
        }, 5000);
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

    this.elSpin.style.color = 'white'
  };

  drawBackground = () => {
    // return
    this.ctx.beginPath() // outer circle 
    let angle = outerBorderAngle + 3 * this.PI / 2
    let gx = this.rad * Math.cos(angle);
    let gy = this.rad * Math.sin(angle);
    let cx = this.rad
    let cy = this.rad
    let grd = this.ctx.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
    outerBorderGradient.forEach((st) => grd.addColorStop(st.pct, st.clr))
    this.ctx.fillStyle = grd
    this.ctx.arc(this.rad, this.rad, this.rad, 0, 2 * this.PI)
    this.ctx.moveTo(this.rad, this.rad)
    this.ctx.lineTo(this.rad, this.rad)
    this.ctx.fill()

    this.ctx.beginPath() // black circle
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.rad, this.rad, this.rad - 2, 0, 2 * this.PI)
    this.ctx.moveTo(this.rad, this.rad)
    this.ctx.lineTo(this.rad, this.rad)
    this.ctx.fill()

    this.ctx.beginPath() // inner circle 
    angle = 0
    gx = this.rad * Math.cos(angle);
    gy = this.rad * Math.sin(angle);
    cx = this.rad
    cy = this.rad
    grd = this.ctx.createLinearGradient(cx - gx, cy - gy, cx + gx, cy + gy);
    innerBorderGradient.forEach((st) => grd.addColorStop(st.pct, st.clr))
    this.ctx.fillStyle = grd
    // this.ctx.arc(this.rad, this.rad, this.rad - 18, 0, 2 * this.PI)
    this.ctx.arc(this.rad, this.rad, this.rad - 23, 0, 2 * this.PI)
    this.ctx.moveTo(this.rad, this.rad)
    this.ctx.lineTo(this.rad, this.rad)
    this.ctx.fill()

    this.ctx.beginPath() // white circle
    this.ctx.fillStyle = 'white'
    // this.ctx.arc(this.rad, this.rad, this.rad - 20, 0, 2 * this.PI)
    this.ctx.arc(this.rad, this.rad, this.rad - 26, 0, 2 * this.PI)
    this.ctx.moveTo(this.rad, this.rad)
    this.ctx.lineTo(this.rad, this.rad)
    this.ctx.fill()
  }

  drawSector = (sector, i) => {
    const ang = this.arc * i - this.arc / 2;
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'multiply'
    this.ctx.beginPath();
    const grdShadow = this.ctx.createRadialGradient(this.rad, this.rad, 0, this.rad, this.rad, this.rad);
    shadowGradient.forEach((st) => grdShadow.addColorStop(st.pct, st.clr));
    this.ctx.fillStyle = grdShadow;
    this.ctx.moveTo(this.rad, this.rad);
    // this.ctx.arc(this.rad, this.rad, this.rad - 20, ang, ang + this.arc);
    this.ctx.arc(this.rad, this.rad, this.rad - 26, ang, ang + this.arc);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    const gx = this.rad * Math.cos(ang + this.PI + this.arc / 2);
    const gy = this.rad * Math.sin(ang + this.PI + this.arc / 2);
    const grd = this.ctx.createLinearGradient(this.rad - gx, this.rad - gy, this.rad, this.rad);
    sector.color.forEach((st) => grd.addColorStop(st.pct, st.clr))
    this.ctx.fillStyle = grd;

    this.ctx.moveTo(this.rad, this.rad);
    // this.ctx.arc(this.rad, this.rad, this.rad - 20, ang, ang + this.arc);
    this.ctx.arc(this.rad, this.rad, this.rad - 26, ang, ang + this.arc);
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
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    // this.ctx.font = 'bold 20px Montserrat';
    this.ctx.font = 'bold 16px Montserrat';
    this.ctx.fillText(sector.label, this.rad - 80, 10, 55);
    this.ctx.restore();
  }

  createWheel = () => {
   const x = this.x
    const y = this.y
    const wheel = document.createElement('div');
    wheel.setAttribute('id', 'wheelOfFortune');
    wheel.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    wheel.classList.add('wheelOfFortune');
    wheel.style.display = 'flex';

    wheel.innerHTML = `<div>
    <canvas id="wheel" class="wheel" width="350" height="350">
    </canvas><div class="spin-border-wrap">
    <div id="spin" class="spin"></div></div>
    <div class="topmark-box"></div>
    <div class="topmark-arrow"></div>
    </div>
    `;
    widgetHtmlService.container.appendChild(wheel);
    wheel.style.display = 'none'

    const delay = 500
    let transition = 0
    wrecks.forEach((w) => {
      const current = w.transition.replace(/[^0-9 .]/g, "")
      if (current > transition) transition = current
    })
    wrecks.forEach((w, i) => {
      window['pict' + i] = document.createElement('img');
      window['pict' + i].classList.add('picture');
      window['pict' + i].src = pict;
      window['pict' + i].style.left = `${x + w.dx}px`;
      window['pict' + i].style.top = `${y + w.dy}px`;
      window['pict' + i].style.clipPath = w.path;
      const angle= Math.ceil(Math.random()*359)
      window['pict' + i].style.transform = `rotate(${angle}deg)`
      setTimeout(() => {
        window['pict' + i].style.transform = `translate(${-w.dx}px,${-w.dy}px) rotate(0deg)`;
        window['pict' + i].style.transition = w.transition
      }, delay)
      widgetHtmlService.container.appendChild(window['pict' + i])
    })
    setTimeout(() => {
      wheel.style.display = 'flex';
      document.querySelectorAll('.picture').forEach((pic) => pic.remove())
    }, delay + transition * 1000)
  };

  startAnimation = () => {
    const x = this.x
    const y = this.y
    // true stands for no animation 
    new AnimationService({
      elem: this.wheelOfFortune,
      size: 350,
      posx: x,
      posy: y,
    }, true);
  };

  addCloseIconToElement = (element) => {
    const btnContainer = document.createElement('div')
    btnContainer.style.display = 'flex';
    btnContainer.style.flexDirection = 'column'
    btnContainer.style.justifyContent = 'center'
    const dragBtn = document.createElement('div')
    dragBtn.classList.add('round-close-icon');
    dragBtn.innerHTML = '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/131cda78a7d6d48ddfcd6475ccd5a61a66c2f2af/images/wheelOfFortuneWidget/icon-drag.svg"></img>';
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('round-close-icon');
    // closeBtn.innerHTML = '&#x2715; ';
    closeBtn.innerHTML = '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/131cda78a7d6d48ddfcd6475ccd5a61a66c2f2af/images/wheelOfFortuneWidget/round-close.svg"></img>';
    closeBtn.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        element.remove();
      },
      { once: true },
    );
    btnContainer.appendChild(closeBtn);
    btnContainer.appendChild(dragBtn);
    element.appendChild(btnContainer);
  };
}

export default () => {
  new WheelOfFortuneWidget();
};