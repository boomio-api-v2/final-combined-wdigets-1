import './styles.css';
import { BoomioBubbles, BoomioBubblesGif } from '@/сonstants';

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
        this.imageElement.src = BoomioBubblesGif;

        setTimeout(() => {
          this.imageElement.src = BoomioBubbles;
        }, 2000);
      }
    }, 8000);
  };
  createWidgetContainer = (type) => {
    const widgetScreenWrapper = document.createElement('div');
    widgetScreenWrapper.classList.add('boomio-widget-screen-wrapper');
    widgetScreenWrapper.setAttribute('id', 'boomio-widget-screen-wrapper-content');
    const widgetContent = document.createElement('div');
    widgetContent.setAttribute('id', 'boomio-widget-content');
    widgetScreenWrapper.appendChild(widgetContent);
    document.body.appendChild(widgetScreenWrapper);
    const boomioStartWidget = localStorage.getItem('start_widget');
    // localStorage.getItem('closing_button') &&
    if ((type === 'start_widget' || !type) && boomioStartWidget !== 'false') {
      const boomioMainHolder = document.createElement('div');
      boomioMainHolder.style.cursor = 'pointer';
      boomioMainHolder.style.position = 'fixed';
      boomioMainHolder.style.zIndex = 99999999;
      const storedBoomioWidgetPosition = JSON.parse(localStorage.getItem('boomio_hint_widget'));
      boomioMainHolder.style.bottom = storedBoomioWidgetPosition?.bottom ?? '30%'; // Adjust the starting vertical position
      boomioMainHolder.style.right = storedBoomioWidgetPosition?.right ?? '-150px'; // Adjust the starting horizontal position off-screen

      this.imageElement = document.createElement('img');
      this.imageElement.src = BoomioBubbles;

      this.imageElement.style.width = '150px'; // Change width here
      this.imageElement.style.height = '150px'; // Change height here
      boomioMainHolder.appendChild(this.imageElement);

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
          }, 210);
          localStorage.setItem('closing_button', false);
          e.stopPropagation();
          e.preventDefault();
        }
      });

      boomioMainHolder.addEventListener('animationend', (e) => {
        if (e.animationName === 'move-in') {
          boomioMainHolder.style.animation =
            'bounce 0.4s 6 alternate ease-out, bounce-left 3s forwards';
          setTimeout(() => {
            const computedStyle = window.getComputedStyle(boomioMainHolder);
            const bottom = computedStyle.getPropertyValue('bottom');
            const right = computedStyle.getPropertyValue('right');
            const positionObject = {
              bottom,
              right,
            };
            localStorage.setItem('boomio_hint_widget', JSON.stringify(positionObject));
            boomioMainHolder.style.animation = 'move-slowly 1s infinite alternate';
          }, 3000); // Delay the start of the move-slowly animation by 6 seconds (duration of the previous animations)
        }
      });

      widgetScreenWrapper.appendChild(boomioMainHolder);

      setTimeout(() => {
        if (!storedBoomioWidgetPosition) {
          setTimeout(() => {
            boomioMainHolder.style.animation = 'move-in 1.5s linear forwards';
          }, 1000);

          setTimeout(() => {
            this.imageElement.src = BoomioBubbles;
          }, 10000);
        }
      }, 100);
      this.changeImagePeriodically();
    } else {
      localStorage.setItem('closing_button', false);
    }
    this.container = widgetContent;
  };
}

export default new WidgetHtmlService();
