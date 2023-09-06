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
    boomioMainHolder.style.position = 'fixed';

    boomioMainHolder.style.bottom = '30%'; // Adjust the starting vertical position
    boomioMainHolder.style.right = '-150px'; // Adjust the starting horizontal position off-screen

    const imageElement = document.createElement('img');
    imageElement.src =
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';

    imageElement.style.width = '200px'; // Change width here
    imageElement.style.height = '200px'; // Change height here
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
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';

        setTimeout(() => {
          if (element) {
            element.style.display = 'block';
          }
        }, 10);
        setTimeout(() => {
          if (element) {
            imageElement.src =
              'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';

            // imageElement.src =
            //   'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/Boomio_bubble_game.gif?raw=true';
            element.style.opacity = '1';
          }
        }, 510);
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
        imageElement.src =
          'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/feature/claw-machine-auto/images/wheelOfFortuneWidget/frame_0_delay-0.3s.png?raw=true';
      }, 10000); // Adjust the delay time (in milliseconds) as needed
    }, 100); // Adjust the delay time (in milliseconds) as needed
  };
}

export default new WidgetHtmlService();
