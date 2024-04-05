import { localStorageService, widgetHtmlService } from '@/services';
import startGame from './js/index.js';
import { intro } from './js/constants';
import './index.css';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';

class NewGame {
  static ctx;

  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name ? this.config.business_name : 'Barbora';
    this.showCompetitiveRegistration = this.config.game_type ?? 'competitive';
    this.scoreTable = {};
    this.scoreTableContainerInstance;
    this.createContainer();
  }

  createContainer = () => {
    const blurImage = new Image();
    blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';

    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-NewGame-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `
    <div class="game-container" id="game-container">

    <div class="boomio-score-input-container" style="display:none;width:188px;height">
    <div style="width: 148px; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
  <img src='' alt="" style="width: 100%; height: 100%;"></img>
  <div style="text-align: center; color: white; font-size: 20px; font-family: Poppins; font-weight: 900; word-wrap: break-word;position:absolute;left:70px;top:10px;z-index:3;line-height:30px;" id="currentScore"></div>
</div>
</div>

    <img src=${intro} alt="Image Description" style="z-index:4;width:${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:block;" id="background_intro">
    <img src=${blurImage.src} alt="Image Description" style="z-index:3;width: ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 668px;position:absolute;opacity:0.37;pointer-events: none; display:block;" id="background_blur">

    ${
      this.showCompetitiveRegistration
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    }
    ${new InputContainer(this.customer, 'doodle').createInputContainerDiv().outerHTML}

      <canvas id="boomio-newGame-canvas" class="boomio-newGame-canvas" style="${
        document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
      }">
      </canvas>
    </div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration) {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
        this.customer,
        this.scoreTable,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }

    startGame(this.scoreTableContainerInstance);
  };
}

export default () => {
  new NewGame();
};
