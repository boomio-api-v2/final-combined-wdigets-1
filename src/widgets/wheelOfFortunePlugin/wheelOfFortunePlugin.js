import {
  boomioService,
  localStorageService,
  DragElement,
  QrCodeModal,
  AnimationService
} from '../../services';
import './styles.css';

const defaultList = [
  {
    color: '#f82',
    label: '10',
    img: 'https://eucys.eu/wp-content/uploads/2019/09/ribbon_prize-300x300.png',
  },
  {
    color: '#0bf',
    label: '10',
    img: 'https://cdn.pixabay.com/photo/2022/08/22/03/07/logo-7402580__340.png',
  },
  {
    color: '#fb0',
    label: '200',
    img: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png',
  },
  {
    color: '#0fb',
    label: '50',
    img: 'https://www.pngmart.com/files/12/Shopee-Logo-Transparent-Background.png',
  },
  {
    color: '#b0f',
    label: '100',
    img: 'https://cdn.freebiesupply.com/images/large/2x/dallas-cowboys-logo-transparent.png',
  },
  {
    color: '#f0b',
    label: '5',
    img: 'https://cdn-icons-png.flaticon.com/512/1018/1018083.png',
  },
  {
    color: '#bf0',
    label: '500',
    img: 'https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/6152b2d34ca06be4185ddd29_save-money.png',
  },
];


/// ///////////////

const rand = (m, M) => Math.random() * (M - m) + m;

class WheelOfFortunePlugin {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    if (!this.config.success) return;
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
      this.angVelMax = rand(0.10, 0.20);
    });

    this.config?.list?.forEach(this.drawSector);
    /// //To Check///////
    // if (document.readyState !== 'complete') return;
    this.wheelOfFortune = document.getElementById('wheelOfFortune');
    this.wheelOfFortune.style.display = 'block';
    this.addCloseIconToElement(this.wheelOfFortune);

    this.drageble = new DragElement(this.wheelOfFortune);

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
    this.elSpin.innerHTML = !this.angVel ? 'SPIN' : `
            <img style="width: 40px; height: 40px" src="${sector.img}"></img>
        `;
    this.elSpin.style.background = sector?.color;
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
    this.ctx.rotate(ang + this.arc / 2);
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 30px sans-serif';
    this.ctx.font = '14px serif';
    const img = new Image();
    img.src = sector.img;
    this.ctx.drawImage(img, 86, -12, 32, 32);
    this.ctx.fillText(sector.label, this.rad - 55, 10);
    this.ctx.restore();
  };

  createWheel = () => {
    const wheel = document.createElement('div');
    wheel.setAttribute('id', 'wheelOfFortune');
    wheel.classList.add('boomio--animation__wrapper', 'boomio--animation__wrapper--initial');
    wheel.style.display = 'none';
    wheel.innerHTML = `
                <canvas id="wheel" width="250" height="250"></canvas>
                <div id="spin">SPIN asd asd asd as dasd as dasd asd asd as d</div>
          `;
    document.body.appendChild(wheel);
  };

  startAnimation = () => {
    new AnimationService({
      elem: this.wheelOfFortune, size: 250
    })

  };


  addCloseIconToElement = (element) => {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('custom-close-icon');
    closeBtn.innerHTML = '&#x2715; ';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      element.remove();
    }, { once: true });
    element.appendChild(closeBtn);
  };


}

export const startWheelWidget = () => {
  new WheelOfFortunePlugin();
};
