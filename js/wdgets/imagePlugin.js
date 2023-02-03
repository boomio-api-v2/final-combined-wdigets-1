////constants
// const localStoragePropertyName = 'boomioPluginConfig';
import { localStorageConfig, DragElement } from '../modules';
import { isMobileDevice, playStoreImage, dotImage, appStoreImage} from '../config';

const style = document.createElement('style');
style.setAttribute('id', 'boomio--stylesheet');
document.getElementsByTagName('head')[0].appendChild(style);

const mainCss = `
[draggable=true] {
    cursor: move;
}

.boomie-preview-mobile {
    width: 100px;
}
#boomio--qr {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
}
.custom-close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -16px;
    font-size: 13px;
    top: -16px;
    color: #000;
    cursor: pointer;
    background-color: lightgray;
    width: 16px;
    height: 16px;
    border-radius: 20px;
    font-size: 10px;
    opacity: 0.45;
}
.boomio--animation__wrapper:empty {
    display: block !important;
}
.boomio--animation__wrapper {
    text-align: center;
    position: fixed;
    z-index: 9999;
    visibility: visible;
    background-size: cover;
    opacity: 1;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#widgetPreview {
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: -55px;
    cursor: pointer;
}
#puzzle-widget {
    border-radius: 10px;
    background-size: contain;
    position: fixed;
    z-index: 1000;
    left: 20px;
    top: 20px;
}
.boomio--puzzle-widget-text {
    width: 100%;
    z-index: 100000;
    position: absolute;
    cursor: pointer;
    color: white;
    font-weight: bold;
    top: 50px;
    font-size: ${isMobileDevice ? 20 : 36}px;
    text-align: center;
}
.coupon_discount_modal .coupon_info h3 {
    background: -webkit-linear-gradient(#FF3183, #8559F3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 30px;
}

.coupon_discount_modal .coupon_info p {
    padding: 0;
    font-size: 13px;
    font-weight: 600;
    margin: 0;
}


.coupon_discount_modal .coupon_preview_card_footer {
    margin-top: 0px;
}
.coupon_discount_modal .coupon_preview_card_footer a {
    color:black
}

.coupon_discount_modal .coupon_preview_card_footer p {
    font-size: 14px;
}

.coupon_preview_card_footer .btn-content {
    width: 100%;
    border: none;
    padding: 1px;
    height: 47px;
    border: double 2px transparent;
    border-radius: 24px;
    background-image: linear-gradient(#e8dff7, #fee0e7), linear-gradient(39.06deg, #FFC24F 8.58%, #FF3183 32.32%, #8559F3 60.82%, #657BEA 66.73%, #34B0DC 77.01%, #15D1D3 84.73%, #09DDD0 88.95%);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.coupon_preview_card_footer .btn-content img {
    width: 30px;
}

.coupon_preview_card_footer .btn-content .small-font {
    font-weight: 500;
    font-size: 14px;
    text-align: left;
}

.coupon_preview_card_footer .appstore-img img,
.coupon_preview_card_footer .playstore-img img {
    width: 150px;
}
.coupon_preview_card_footer .btn-text-group {
    line-height: 14px;
    font-size: 14px;
}
.coupon_preview_card_footer .btn-content {
    cursor: pointer;
}
.footer-dec {
    margin: 0;
    padding: 0;
    text-align: center;
    padding-top: 11px;
    line-height: 21px;
}
.coupon_discount_modal .coupon_preview_card_info {
    display: flex;
    justify-content: center;
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

.coupon__preview__card::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -18px;
    /* background-color: #fff; */
    width: 32px;
    height: 37.6px;
    transform: translate(0%, -50%);
    border-radius: 50%;
    border: 2px solid transparent;
    background-image: linear-gradient(#fff, #fff), linear-gradient(228.29deg, #FD5A97 10.56%, #FB6E80 86.04%);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.coupon__preview__card__after {
    position: absolute;
    content: "";
    width: 19px;
    top: 50%;
    left: 0px;
    height: 50px;
    background-color: #fff;
    transform: translate(-111%, -50%);
}

.coupon__preview__card::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -18px;
    background-color: #fff;
    width: 32px;
    height: 37.6px;
    transform: translate(0%, -50%);
    border-radius: 50%;
    border: 2px solid transparent;
    background-image: linear-gradient(#fff, #fff), linear-gradient(180deg, #5CB1E0 0%, #7E85E9 100%);
    background-clip: content-box, border-box;
}

.coupon__preview__card__befor {
    position: absolute;
    content: "";
    width: 19px;
    top: 50%;
    right: 0px;
    height: 50px;
    z-index: 1;
    background-color: #fff;
    transform: translate(111%, -50%);
}

.coupon_discount_modal .coupon__preview__card__header {
    padding: 0;
    text-align: center;
}

.coupon_discount_modal .coupon__preview__card__header h1 {
    text-transform: uppercase;
    margin-bottom: 14px;
}

.coupon_discount_modal .coupon__preview__card {
    height: auto;
}

.coupon_discount_modal .coupon_info {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.coupon_discount_modal .coupon_preview_card_info {
    cursor: pointer;
}



.coupon_discount_modal .coupon__preview__card {
    box-shadow: 10px 11px 5px -5px rgba(195, 195, 195, 0.35);
}

.coupon_discount_modal .coupon_info h3 {
    margin: 0;
    padding: 0;
}

.coupon_discount_modal .coupon_info h3:first-child {
    font-size: 40px;
    background: -webkit-linear-gradient(#FF3183, #8559F3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    line-height: 37px;
}

`;

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const assignStyle = (style, properties) => {
    Object.assign(style, properties);
}

class ImagePlugin {
    constructor() {
        this.addStyles(mainCss)
        this.config = localStorageConfig.getDefaultConfig();
        this.startAnimation()
    }
    addStyles = (cssRules) => {
        const style = document.createElement('style');
        style.setAttribute('id', 'boomio--stylesheet');
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.styleSheet) {
            style.styleSheet.cssText = cssRules;
        } else {
            style.appendChild(document.createTextNode(cssRules));
        }
    };

    startAnimation = () => {
        const { animation, img } = this.config;
        const puzzleSize = 250;
        const animationEl = document.createElement('div');
        animationEl.classList.add('boomio--animation__wrapper');
        animationEl.classList.add('boomio--animation__wrapper--initial');
        animationEl.onclick = (e) => {
            e.target.remove()
            this.showQR();
        }
        this.drageble =  new DragElement(animationEl)
        document.body.appendChild(animationEl);
        assignStyle(animationEl.style, {
            width: '100px',
            height: '100px',
            backgroundImage: `url(${img})`
        })
        const systemFont =
            'system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue';
        const duration = '1000ms';
        const easingBack = 'cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        const easing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

        const { clientWidth, clientHeight } = document.documentElement;

        const getPosition = (size) => parseInt(getRandomArbitrary(10, size - 250).toFixed())

        this.posx = getPosition(clientWidth);
        this.posy = getPosition(clientHeight);

        const initialPosition = {
            x: animationEl.clientWidth + parseInt(this.posy),
            nx: -1 * (animationEl.clientWidth + parseInt(this.posy)),
            y: animationEl.clientHeight + parseInt(this.posx),
            ny: -1 * (animationEl.clientHeight + parseInt(this.posx)),
        };

        const css = `
        [draggable=true] {
            cursor: move;
        }
        #puzzle-widget {
            border-radius: 10px;
            background-size: contain;
            position: fixed;
            z-index: 1000;
            left: 20px;
            top: 20px;
        }
        .boomio--puzzle-widget-text {
            width: 100%;
            z-index: 100000;
            position: absolute;
            cursor: pointer;
            color: white;
            font-weight: bold;
            top: 50px;
            font-size: ${isMobileDevice ? 20 : 36}px;
            text-align: center;
        }
        #boomio--qr {
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 1000;
        }
        .boomio--puzzle-widget {
            cursor: pointer;
            background-color: #F5F5F5;
            border-radius: 10px;
            background-size: contain;
            width: 150px;
            height: 150px;
            position: fixed;
            z-index: 2;
            // left: 10px;
            // top: 10px;
        }
		.boomio--animation__wrapper {
			text-align: center;
			position: fixed;
			z-index: 9999;
			left: ${this.posx}px;
			top: ${this.posy}px;
			visibility: visible;
			background-size: cover;
			opacity: 1;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
		}
        .boomio--animation__wrapper {
          outline: none !important;
        }
        .boomio--animation__wrapper:empty {
			display: block !important;
		}
		.boomio--animation__wrapper--initial {
			width: ${puzzleSize}px;
			cursor: pointer;
			transition: transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
			animation-duration: ${duration};
			animation-timing-function: ${easing};
			animation-iteration-count: 1;
		}

		.boomio--animation__wrapper--initial:hover {
			transform: scale(1.1);
		}

		// .boomio--animation__wrapper--initial:active {
		// 	transform: scale(.9);
		// }

		.boomio--animation__wrapper--qr {
			animation-name: boomio-animate-qr;
			animation-duration: 300ms;
			animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
			animation-fill-mode: forwards;
			animation-iteration-count: 1;
			background-color: #ffffff;
			box-shadow: rgba(22, 31, 39, 0.42) 0px 60px 123px -25px, rgba(19, 26, 32, 0.08) 0px 35px 75px -35px;
			// padding: 16px;
			border-radius: 7px;
		}

		.boomio--animation__heading {
			color: #000;
			font: 22px/1.2 ${systemFont};
			margin: 0 0 16px;
		}

		h4.boomio--animation__heading {
			font-size: 16px;
			opacity: .7;
			margin-top: -8px;
		}

		.boomio--animation--moveRight { animation-name: boomio-animate--moveRight; animation-timing-function: ${easingBack}; }
		.boomio--animation--moveLeft { animation-name: boomio-animate--moveLeft; animation-timing-function: ${easingBack}; }
		.boomio--animation--moveUp { animation-name: boomio-animate--moveUp; }
		.boomio--animation--moveDown { animation-name: boomio-animate--moveDown; }
		.boomio--animation--moveDiagonalDown { animation-name: boomio-animate--moveDiagonalDown; }
		.boomio--animation--moveDiagonalUp { animation-name: boomio-animate--moveDiagonalUp; }
		.boomio--animation--fadeIn { animation-name: boomio-animate--fadeIn; }
		.boomio--animation--zoomIn { animation-name: boomio-animate--zoomIn; animation-timing-function: ${easingBack}; }
		.boomio--animation--rotateRight { animation-name: boomio-animate--rotateRight; animation-timing-function: ${easingBack}; }
		.boomio--animation--skewLeft { animation-name: boomio-animate--skewLeft; }
		.boomio--animation--tada { animation-name: boomio-animate--tada; }
		.boomio--animation--lightSpeedInLeft { animation-name: boomio-animate--lightSpeedInLeft; }
		.boomio--animation--rollIn { animation-name: boomio-animate--rollIn; }

		@keyframes boomio-animate-qr {
			0% {
				transform: scale(0);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes boomio-animate--rollIn {
			from {
				opacity: 0;
				transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
			}
		
			to {
				opacity: 1;
				transform: translate3d(0, 0, 0);
			}
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
		
		@keyframes boomio-animate--tada {
			from {
				transform: scale3d(1, 1, 1);
			}
		
			10%,
			20% {
				transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
			}
		
			30%,
			50%,
			70%,
			90% {
				transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
			}
		
			40%,
			60%,
			80% {
				transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
			}
		
			to {
				transform: scale3d(1, 1, 1);
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

		@keyframes boomio-animate--fadeIn {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
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

		@keyframes boomio-animate--rotateRight {
			0% {
				transform: rotate(360deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes boomio-animate--skewLeft {
			0% {
				transform: skew(60deg, 60deg);
			}
			100% {
				transform: skew(0deg, 0deg);
			}
		}

		@keyframes boomio-animate--zoomIn {
			0% {
				transform: scale(0);
			}
			100% {
				transform: scale(1);
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
            padding: 40px 20px;
        }

		@import url('https://fonts.googleapis.com/css?family=Montserrat');
          
        .product-design-bg-2 *{
            font-family: 'Montserrat' ;
            font-style: normal;
        }
        .coupon_discount_modal .coupon__preview__card__header h1 {
            text-transform: uppercase;
            margin-bottom: 14px;
        }

        .coupon__preview__card__header h1 {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            letter-spacing: -0.02em;
            color: #473F4E;
            margin: 0px;
        }

        .product-design-bg-2 {
            background-color: #ffffff;
            width: ${isMobileDevice ? '100%' : '375px'};
            height: -moz-fit-content;
            height: fit-content;
            padding: 20px;
            border-radius: 10px;
            padding: 0;
        }

        .coupon_discount_modal .coupon_preview_card_info {
            display: flex;
            justify-content: center;
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

        .coupon__preview__card::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -18px;
            /* background-color: #fff; */
            width: 32px;
            height: 37.6px;
            transform: translate(0%, -50%);
            border-radius: 50%;
            border: 2px solid transparent;
            background-image: linear-gradient(#fff, #fff), linear-gradient(228.29deg, #FD5A97 10.56%, #FB6E80 86.04%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }

        .coupon__preview__card__after {
            position: absolute;
            content: "";
            width: 19px;
            top: 50%;
            left: 0px;
            height: 50px;
            background-color: #fff;
            transform: translate(-111%, -50%);
        }

        .coupon__preview__card::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -18px;
            background-color: #fff;
            width: 32px;
            height: 37.6px;
            transform: translate(0%, -50%);
            border-radius: 50%;
            border: 2px solid transparent;
            background-image: linear-gradient(#fff, #fff), linear-gradient(180deg, #5CB1E0 0%, #7E85E9 100%);
            background-clip: content-box, border-box;
        }

        .coupon__preview__card__befor {
            position: absolute;
            content: "";
            width: 19px;
            top: 50%;
            right: 0px;
            height: 50px;
            z-index: 1;
            background-color: #fff;
            transform: translate(111%, -50%);
        }

        .coupon_discount_modal .coupon__preview__card__header {
            padding: 0;
            text-align: center;
        }

        .coupon_discount_modal .coupon__preview__card__header h1 {
            text-transform: uppercase;
            margin-bottom: 14px;
        }

        .coupon_discount_modal .coupon__preview__card {
            height: auto;
        }

        .coupon_discount_modal .coupon_info {
            padding: 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .coupon_discount_modal .coupon_preview_card_info {
            cursor: pointer;
        }

      

        .coupon_discount_modal .coupon__preview__card {
            box-shadow: 10px 11px 5px -5px rgba(195, 195, 195, 0.35);
        }

        .coupon_discount_modal .coupon_info h3 {
            margin: 0;
            padding: 0;
        }

        .coupon_discount_modal .coupon_info h3:first-child {
            font-size: 40px;
            background: -webkit-linear-gradient(#FF3183, #8559F3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
            line-height: 37px;
        }

        .coupon_discount_modal .coupon_info h3 {
            background: -webkit-linear-gradient(#FF3183, #8559F3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            font-weight: 900;
            font-size: 30px;
        }

        .coupon_discount_modal .coupon_info p {
            padding: 0;
            font-size: 13px;
            font-weight: 600;
            margin: 0;
        }


        .coupon_discount_modal .coupon_preview_card_footer {
            margin-top: 0px;
        }
		.coupon_discount_modal .coupon_preview_card_footer a {
            color:black
        }

        .coupon_discount_modal .coupon_preview_card_footer p {
            font-size: 14px;
        }

        .coupon_preview_card_footer .btn-content {
            width: 100%;
            border: none;
            padding: 1px;
            height: 47px;
            border: double 2px transparent;
            border-radius: 24px;
            background-image: linear-gradient(#e8dff7, #fee0e7), linear-gradient(39.06deg, #FFC24F 8.58%, #FF3183 32.32%, #8559F3 60.82%, #657BEA 66.73%, #34B0DC 77.01%, #15D1D3 84.73%, #09DDD0 88.95%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }

        .coupon_preview_card_footer .btn-content img {
            width: 30px;
        }

        .coupon_preview_card_footer .btn-content .small-font {
            font-weight: 500;
            font-size: 14px;
			text-align: left;
        }

        .coupon_preview_card_footer .appstore-img img,
        .coupon_preview_card_footer .playstore-img img {
            width: 150px;
        }
        .coupon_preview_card_footer .btn-text-group {
            line-height: 14px;
            font-size: 14px;
        }
        .coupon_preview_card_footer .btn-content {
            cursor: pointer;
        }
        .footer-dec {
            margin: 0;
            padding: 0;
            text-align: center;
            padding-top: 11px;
            line-height: 21px;
        }
		.custom-close-icon {
		    display: flex;
		    justify-content: center;
		    align-items: center;
            position: absolute;
            right: -16px;
            font-size: 13px;
            top: -16px;
            color: #000;
            cursor: pointer;
            background-color: lightgray;
            width: 16px;
            height: 16px;
            border-radius: 20px;
            font-size: 10px;
            opacity: 0.45;
		}
		`;

        this.addStyles( css);

        const animFunc = this.getAnimateFunction(animation);
        animFunc(animationEl);
    };

    getAnimateFunction = (nr) => {
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

        return animArr[nr]
    }

    showQR = () => {
        const { qrcode } = this.config;
        const qrEl = document.createElement('div');

        qrEl.setAttribute('id', 'boomio--qr');


        qrEl.innerHTML = this.qrCodeInnerHtml();

        document.body.append(qrEl);

        new QRCode('qrcodeShowHtml', {
            text: qrcode,
            width: 300,
            height: 300,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
        });
        const coupon = document.getElementById('coupon_div');
        const qrcodeShow = document.getElementById('qrcodeShow');
        qrcodeShow.style.display = isMobileDevice ? 'none' : 'block';
        coupon.style.display = isMobileDevice ? 'block' : 'none';
        document.getElementById('close').onclick = (e) => {
            const elementRemove = document.getElementById('boomio--qr');
            elementRemove.remove();
            e.stopPropagation();
        };
        if (isMobileDevice) return;
        qrcodeShow.onclick = () => {
            coupon.style.display = 'block'
            qrcodeShow.style.display = 'none'
        }
        coupon.onclick = () => {
            qrcodeShow.style.display = 'block'
            coupon.style.display = 'none'
        }
        const { posX, posY} = this.drageble.getQrCodePosition(
            qrEl,
            this.config.x_position,
            this.config.y_position
        )
        qrEl.style.left = `${posX}px`;
        qrEl.style.top = `${posY}px`;
    }

    qrCodeInnerHtml = () =>  `<div class="product-design-bg-2 p-0 Preview-select box-show qr-div" >
		<span class='custom-close-icon' style='top: 16px; right: 10px' id='close'>&#x2715; </span>
		<div class="coupon__preview__body coupon_discount_modal">

			<div class="coupon__preview__card__header text-center d-block">
				<h1>YOU GOT A 20% DISCOUNT </h1>
			</div>

			<div class="coupon_preview_card_info ">
				<div id='qrcodeShow' style="display:none">
					<a class="qrcodeShowHtml" id="qrcodeShowHtml"> </a>
				</div>
				<div class="coupon__preview__card coupon_div" id="coupon_div" >
					<div class="coupon_info">
						<h3>20 %</h3>
						<h3>Discount</h3>
						<p style="text-align: center; margin-top: 8px">Unique code: <span id="qrcode">${this.config.qrcode}</span> </p>
					</div>
					<div class="coupon__preview__card__after"></div>
					<div class="coupon__preview__card__befor"></div>
				</div>
			</div>
			<div class="coupon_preview_card_footer">
				<p>To have immpediate access for all your great rewards <b> open of download</b></p>
				<a href=${this.config.app_url}>
				<div class="btn-content d-flex align-items-center justify-content-center" style="height: 46px;">
					<img src="${dotImage}" alt="img not find">
					<div class="d-flex flex-column btn-text-group ml-2"><small class="small-font">Open</small>
						<b>Boomio
							app</b>
					</div>
				</div>
				</a>
				${!isMobileDevice ? (
        `		<div class="d-flex pt-2">
					<div class="appstore-img "><a href=""><img src="${appStoreImage}"
								alt="App Store"></a></div>
					<div class="playstore-img"><a href=${this.config.app_url}"><img src="${playStoreImage}"
								alt="Play Store"></a></div>
				</div>`
    ) : ''}
				<div>
					<p class="footer-dec">Don't have time now? Make a screenshot and use it later!</p>
				</div>
			</div>
		</div>
	</div>`

}


export const startImageWidget = () => {
    new ImagePlugin();
}