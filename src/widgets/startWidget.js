import {
  boomioService,
  localStorageService,
  DragElement,
} from '../services';

/// /////Constants Icons/////////
const closeIcon = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/close.png?raw=true';
const gifIcon = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/gift.png?raw=true';
const couponsDiscountIcon = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/couponsDiscount.png?raw=true';
const discountIcon = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/discount.png?raw=true';
const gameIcon = 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/main/images/startWidget/game.png?raw=true';

/// ///////////////////////
const style = document.createElement('style');
style.setAttribute('id', 'boomio--stylesheet');
document.getElementsByTagName('head')[0].appendChild(style);

function addStyles(stylesheet, cssRules) {
  if (stylesheet.styleSheet) {
    stylesheet.styleSheet.cssText = cssRules;
  } else {
    stylesheet.appendChild(document.createTextNode(cssRules));
  }
}

class StartWidget {
  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.makeDiv();
  }

  makeDiv = () => {
    const divsize = (200).toFixed();
    const QRsize = (300).toFixed();
    const animationNR = this.config.animation ?? 0;
    const { clientWidth, clientHeight } = document.documentElement;

    const posx = (Math.random() * (clientWidth - QRsize)).toFixed();
    const posy = (Math.random() * (clientHeight - (QRsize * 1.5))).toFixed();

    const animate = (animation) => (el) => {
      el.classList.add(`boomio--animation--${animation}`);
    };
    const animArr = [
      animate('moveRight'),
      animate('moveLeft'),
      animate('moveDown'),
      animate('moveUp'),
      animate('fadeIn'),
      animate('moveDiagonalDown'),
      animate('rotateRight'),
      animate('zoomIn'),
      animate('skewLeft'),
      animate('moveDiagonalUp'),
      animate('tada'),
      animate('lightSpeedInLeft'),
      animate('rollIn'),
    ];

    const animFunc = animArr[animationNR];
    const animationEl = document.createElement('div');
    animationEl.setAttribute('id', 'boomio--animation');
    animationEl.classList.add('boomio--animation__wrapper');
    animationEl.classList.add('boomio--animation__wrapper--initial');
    animationEl.innerHTML = `<div style="background-color: rgb(255, 255, 255); width: 375px; height: fit-content; border-radius: 10px; padding: 0px;">
	<style> @import url('https://fonts.googleapis.com/css?family=Montserrat');*{font-family: 'Montserrat' ;font-style: normal;}.fontColor{background: -webkit-linear-gradient(#FF3183, #8559F3);-webkit-background-clip: text;-webkit-text-fill-color: transparent;}
	</style>
	
	<div class="coupon_user_gets_modal" style="padding: 40px 32px;">
	   <div class="close_div" >
	   <img src="${closeIcon}" alt="img not find" id="close_div_img">  
	   </div>
	   <h1>Hey !</h1>
	   <p>We prepared some rewards for you!</p>
	   <div class="coupon_user_gets_modal_img_div">
			<img src="${gifIcon}" alt="img not find">  
			<img src="${couponsDiscountIcon}" alt="img not find">  
			<img src="${discountIcon}" alt="img not find">  
			<img src="${gameIcon}" alt="img not find">    
	   </div>
	   <p>Search for your favourite products and be suprised!</p>
	   <div class="center_text">
		  <div id="letGoToBtn"
		   class="coupon_user_gets_modal_button coupon_button"><span class="coupon_user_gets_modal_button">Let’s go</span></div>
	   </div>
	</div>
 </div>`;
    animationEl.classList.remove('boomio--qr');
    // animationEl.addEventListener('click', function _listener(e) {
    //     boomio.signal('START_OK')
    //     animationEl.remove()
    // });
    new DragElement(animationEl);
    document.body.appendChild(animationEl);
    function closeModalDiscount() {
      boomioService.signal('START_CLOSE');
      animationEl.remove();
    }

    document.getElementById('close_div_img').onclick = closeModalDiscount;

    const duration = '1000ms';
    const easing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

    const initialPosition = {
      x: animationEl.clientWidth + parseInt(posy, 10),
      nx: -1 * (animationEl.clientWidth + parseInt(posy, 10)),
      y: animationEl.clientHeight + parseInt(posx, 10),
      ny: -1 * (animationEl.clientHeight + parseInt(posx, 10)),
    };
    const css = `
		.boomio--animation__wrapper {
			text-align: center;
			position: fixed;
			z-index: 9999;
			left: ${posx}px;
			top: ${posy}px;
			visibility: visible;
			opacity: 1;
		}

		.boomio--animation__wrapper--initial {
			width: ${divsize}px;
			cursor: pointer;
			transition: transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
			animation-duration: ${duration};
			animation-timing-function: ${easing};
			animation-iteration-count: 1;
		}

		.boomio--animation__wrapper--initial:hover {
			transform: scale(1.0);
		}
		
		@keyframes boomio-animate--lightSpeedInLeft {
			from {
				transform: translate3d(${initialPosition.nx}px, 0, 0) skewX(30deg);
				opacity: 0;
			}
		
			60% {
				transform: skewX(-20deg);
				opacity: 1;
			}
		
			80% {
				transform: skewX(5deg);
			}
		
			to {
				transform: translate3d(0, 0, 0);
			}
		}
		

		@keyframes boomio-animate--moveRight {
			0% {
				transform: translateX(${initialPosition.nx}px);
			}
			100% {
				transform: translateX(0);
			}
		}

		@keyframes boomio-animate--moveLeft {
			0% {
				transform: translateX(${initialPosition.x}px);
			}
			100% {
				transform: translateX(0);
			}
		}

		@keyframes boomio-animate--moveDown {
			0% {
				transform: translateY(${initialPosition.ny}px);
			}
			100% {
				transform: translateY(0);
			}
		}
		
		@keyframes boomio-animate--moveUp {
			0% {
				transform: translateY(${initialPosition.y}px);
			}
			100% {
				transform: translateY(0);
			}
		}
		
		@keyframes boomio-animate--moveDiagonalDown {
			0% {
				transform: translate(${initialPosition.nx}px, ${initialPosition.ny}px);
			}
			100% {
				transform: translate(0, 0);
			}
		}
		
		@keyframes boomio-animate--moveDiagonalUp {
			0% {
				transform: translate(${initialPosition.nx}px, ${initialPosition.y}px);
			}
			100% {
				transform: translate(0, 0);
			}
		}

		.align-items-center {
            align-items: center !important;
        }

        .justify-content-center {
            justify-content: center !important;
        }

        .flex-column {
            flex-direction: column !important;
        }

        .d-flex {
            display: flex !important;
        }

        .pt-2 {
            padding-top: 0.5rem !important;
        }
	
        .coupon__preview__body {
            padding: 40px 32px;
        }

          
        .product-design-bg-2 *{
            font-family: 'Montserrat' ;
            font-style: normal;
        }

        .product-design-bg-2 {
            background-color: #ffffff;
            width: 375px;
            height: -moz-fit-content;
            height: fit-content;
            padding: 20px;
            border-radius: 10px;
            padding: 0;
        }

        .coupon_discount_modal .coupon_preview_card_info {
            padding: 10px 30px;
            cursor: pointer;
        }

        .coupon_discount_modal .coupon__preview__card {
            box-shadow: 10px 11px 5px -5px rgb(195 195 195 / 35%);
        }

        .coupon__preview__card {
            position: relative;
            width: 100%;
            height: 282px;
            border: double 2px transparent;
            border-radius: 24px;
            background-image: linear-gradient(#FBFAFC, #FBFAFC), linear-gradient(39.06deg, #FFC24F 8.58%, #FF3183 32.32%, #8559F3 60.82%, #657BEA 66.73%, #34B0DC 77.01%, #15D1D3 84.73%, #09DDD0 88.95%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }


        .coupon_discount_modal .coupon__preview__card__header {
            padding: 0;
            margin-top: 10%;
            text-align: center;
        }

        .coupon_discount_modal .coupon__preview__card {
            height: auto;
        }

        .coupon_discount_modal .coupon_info {
            padding: 32px;
        }

        .coupon_discount_modal .coupon_preview_card_info {
            padding: 10px 30px;
            cursor: pointer;
        }

        .coupon_discount_modal .coupon__preview__card {
            box-shadow: 10px 11px 5px -5px rgba(195, 195, 195, 0.35);
        }



        .coupon_preview_card_footer .appstore-img img,
        .coupon_preview_card_footer .playstore-img img {
            width: 150px;
        }
        .footer-dec {
            margin: 0;
            padding: 0;
            text-align: center;
            padding-top: 11px;
            line-height: 21px;
        }
		.close{
			position: absolute;
			right: 7px;
			font-size: 20px;
			top: 6px;
			color: #000;
			cursor: pointer;
		}
		.coupon_user_gets_modal h1 ,.coupon_user_gets_modal p{
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 16px;
			line-height: 20px;
			text-align: center;
			letter-spacing: -0.03em;
			color: #473F4E;
		}
		.coupon_user_gets_modal_button{
			width: 53%;
			border: 1px double transparent;
			padding: 2px;
			height: 43px;
			border: none;
			border-radius: 24px;
			background-image: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)), linear-gradient(41.01deg, #FF6E6D 0%, #FF3183 5.48%, #598BF3 88.77%, #657BEA 95.23%, #34B0DC 101.49%);;
			background-origin: border-box;
			background-clip: content-box, border-box;
			align-items: center;
			display: flex;
			justify-content: center;
			cursor: pointer;
		}
		.coupon_user_gets_modal_button span{
			background: linear-gradient(41.01deg, #FF6E6D 0%, #FF3183 5.48%, #598BF3 88.77%, #657BEA 95.23%, #34B0DC 101.49%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;'
			font-size: 17px;
			font-weight: 600;
		}
		.coupon_user_gets_modal_img_div img{
			width: 30px;
			margin: 0% 5%;
		}
		.coupon_user_gets_modal_img_div{
			text-align: center;
			margin-bottom: 8%;
			margin-top: 8%;
		}
		.center_text{
			align-items: center;
			display: flex;
			justify-content: center;
		}
		.close_div
		{
			text-align:right;
		}
		.coupon_user_gets_modal{
			padding: 25px 22px  !important;
			margin-bottom: 17px;
			padding-bottom: 56px !important;
		}
		.close_div img  
		{
			width: 11%;
			cursor: pointer;
		}
		.coupon_button:hover
		{
			background: linear-gradient(41.01deg, #FF6E6D 0%, #FF3183 5.48%, #598BF3 88.77%, #657BEA 95.23%, #34B0DC 101.49%);
			color: #fff;
		}
		.coupon_button:hover span
		{
			background: #fff;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		`;

    addStyles(style, css);

    animFunc(animationEl);
    const letGoBtn = document.getElementById('letGoToBtn');
    letGoBtn.onclick = () => {
      boomioService.signal('START_OK');
      animationEl.remove();
    };
  };
}

export const startStartWidget = () => {
  new StartWidget();
};
