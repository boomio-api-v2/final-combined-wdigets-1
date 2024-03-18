import { widgetHtmlService } from '@/services';
import startGame from './js/index.js';

class NewGame {
  static ctx;

  constructor() {
    this.createContainer();
  }

  createContainer = () => {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-NewGame-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `

    <div id="parent" style="width:100%;height:100%;position:fixed;top:0px;left:0px;">
      <div class="vbm">
        up or tap to jump &#x1f579; left/right or drag to turn
      </div>

      <div id="canvas-wrapper"><canvas id="game"></canvas></div>
    </div>

    `;
    widgetHtmlService.container.appendChild(myCanvas);
    startGame();
  };
}

export default () => {
  new NewGame();
};
