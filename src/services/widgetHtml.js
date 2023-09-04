import './styles.css';

class WidgetHtmlService {
  constructor() {
    this.container = null;
  }
  createWidgetContainer = () => {
    const widgetScreenWrapper = document.createElement('div');
    widgetScreenWrapper.classList.add('boomio-widget-screen-wrapper');
    widgetScreenWrapper.setAttribute('id', 'boomio-widget-screen-wrapper-content');
    const boomioMainHolder = document.createElement('div');
    boomioMainHolder.style.cursor = 'pointer';
    boomioMainHolder.style.position = 'absolute';

    boomioMainHolder.style.bottom = '-200px';
    boomioMainHolder.style.right = '200px';

    const imageElement = document.createElement('img');
    imageElement.src =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/Boomio_bubble_game.gif?raw=true';

    imageElement.style.width = '100px'; // Change width here
    imageElement.style.height = '100px'; // Change height here
    imageElement.classList.add('jumping-image');
    boomioMainHolder.appendChild(imageElement);

    const widgetContent = document.createElement('div');
    widgetContent.setAttribute('id', 'boomio-widget-content');
    widgetScreenWrapper.appendChild(widgetContent);
    document.body.appendChild(widgetScreenWrapper);
    boomioMainHolder.addEventListener('click', (e) => {
      const item = localStorage.getItem('closing_button');
      const element = document.getElementById(item);
      if (element) {
        element.classList.add('fade-out');
        imageElement.src =
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/Boomio_bubble_game.gif?raw=true';

        setTimeout(() => {
          if (element) {
            element.style.display = 'block';
          }
        }, 10);
        setTimeout(() => {
          if (element) {
            imageElement.src =
              'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';
            element.style.opacity = '1';
          }
        }, 510);
        localStorage.setItem('closing_button', false);
        e.stopPropagation();
        e.preventDefault();
      }
    });
    widgetScreenWrapper.appendChild(boomioMainHolder);
    this.container = widgetContent;
    setTimeout(() => {
      boomioMainHolder.style.transition = 'bottom 1s ease-in-out';
      boomioMainHolder.style.bottom = '20px';
      setTimeout(() => {
        imageElement.src =
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';
      }, 4000);
    }, 100); // Adjust the delay time (in milliseconds) as needed
  };
}

export default new WidgetHtmlService();
