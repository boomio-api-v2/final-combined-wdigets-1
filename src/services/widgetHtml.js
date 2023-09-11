import './styles.css';

class WidgetHtmlService {
  constructor() {
    this.container = null;
    this.imageElement;
  }

  changeImagePeriodically = () => {
    setInterval(() => {
      const item = localStorage.getItem('closing_button');
      const element = document.getElementById(item);
      if (element) {
        const element = document.getElementById('boomio-widget-content');
        this.imageElement.src =
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/New_boomio_logo_bubble.png?raw=true';

        setTimeout(() => {
          this.imageElement.src =
            'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/db5cdbda00947c118c62a4358b42247179687b40/images/wheelOfFortuneWidget/Boomio_bubble_game.gif?raw=true';
        }, 1000);
      }
    }, 4000); // 20 seconds in milliseconds
  };

  createWidgetContainer = () => {
    const widgetScreenWrapper = document.createElement('div');
    widgetScreenWrapper.classList.add('boomio-widget-screen-wrapper');
    widgetScreenWrapper.setAttribute('id', 'boomio-widget-screen-wrapper-content');

    const boomioMainHolder = document.createElement('div');
    boomioMainHolder.style.cursor = 'pointer';
    boomioMainHolder.style.position = 'fixed';

    boomioMainHolder.style.bottom = '30%'; // Adjust the starting vertical position
    boomioMainHolder.style.right = '-150px'; // Adjust the starting horizontal position off-screen

    this.imageElement = document.createElement('img');
    this.imageElement.src =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/New_boomio_logo_bubble.png?raw=true';

    this.imageElement.style.width = '200px'; // Change width here
    this.imageElement.style.height = '200px'; // Change height here
    boomioMainHolder.appendChild(this.imageElement);

    const widgetContent = document.createElement('div');
    widgetContent.setAttribute('id', 'boomio-widget-content');
    widgetScreenWrapper.appendChild(widgetContent);
    document.body.appendChild(widgetScreenWrapper);

    boomioMainHolder.addEventListener('click', (e) => {
      const item = localStorage.getItem('closing_button');
      const element = document.getElementById(item);
      if (element) {
        element.classList.add('fade-out');
        setTimeout(() => {
          if (element) {
            element.style.display = 'block';
          }
        }, 10);
        setTimeout(() => {
          if (element) {
            element.style.opacity = '1';
          }
        }, 1010);
        localStorage.setItem('closing_button', false);
        e.stopPropagation();
        e.preventDefault();
      }
    });

    boomioMainHolder.addEventListener('animationend', (e) => {
      if (e.animationName === 'move-in') {
        boomioMainHolder.style.animation =
          'bounce 0.4s 8 alternate ease-out, bounce-left 4s forwards';
        setTimeout(() => {
          boomioMainHolder.style.animation = 'move-slowly 1s infinite alternate';
        }, 4000); // Delay the start of the move-slowly animation by 6 seconds (duration of the previous animations)
      }
    });
    widgetScreenWrapper.appendChild(boomioMainHolder);
    this.container = widgetContent;

    setTimeout(() => {
      setTimeout(() => {
        boomioMainHolder.style.animation = 'move-in 1.5s linear forwards';
      }, 1000);

      setTimeout(() => {
        this.imageElement.src =
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/New_boomio_logo_bubble.png?raw=true';
      }, 10000);
    }, 100);
    this.changeImagePeriodically();
  };
}

export default new WidgetHtmlService();
