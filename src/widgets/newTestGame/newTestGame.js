import { widgetHtmlService } from '@/services';

class DoodleWidget {
  static ctx;

  constructor() {
    this.createContainer();
  }

  createContainer = () => {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-doodle-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `
      <center>
        <div id="game">
        </div>
      </center>
    `;
    widgetHtmlService.container.appendChild(myCanvas);
  };
}

export default () => {
  new DoodleWidget();
};
