import {
  close,
  newRecord,
  intro,
  star,
  life,
  controllLeft,
  controllRight,
  Controlls,
  introGamtosAteitis,
  introGamtosAteitisPaper,
  introGamtosAteitisGlass,
  introPienoZvaigzdes,
  introPegasas,
  introAkropolis,
} from './constants';
import './styles.css';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';
import { CompetitionCodeScoreTableContainer } from '../helpers/CompetitionCodeScoreTableContainer';

import { PointScoreTableContainer } from '../helpers/PointScoreTableContainer';
import { DownloadScoreTableContainer } from '../helpers/DownloadScoreTableContainer';
import { IkeaScoreTableContainer } from '../helpers/IkeaScoreTableContainer';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';
import { DidYouKnowContainer } from '../helpers/DidYouKnowContainer';
import { ShareContainer } from '../helpers/ShareContainer';

class CrushGame {
  constructor() {}

  startCatch = () => {};

  createContainer() {
    const blurImage = new Image();
    blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';
    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';
    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';
    // Create and configure the game container
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'boomio-catch-container');
    gameContainer.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );
    gameContainer.innerHTML = `
      <div class="game-container game-container-catch">
        <canvas id="boomio-catch-canvas" width=${
          document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
        }; height="668px"></canvas>
      </div>
    `;
  }
}

export default () => {
  new CrushGame();
};
