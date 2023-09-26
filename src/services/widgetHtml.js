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
    if (
      (type === 'start_widget' || !type) &&
      boomioStartWidget !== 'false' &&
      (boomioStartWidget || type === 'start_widget')
    ) {
      const boomioMainHolder = document.createElement('div');
      boomioMainHolder.style.cursor = 'pointer';
      boomioMainHolder.style.position = 'fixed';
      boomioMainHolder.style.zIndex = 99999999;
      const storedBoomioWidgetPosition = JSON.parse(localStorage.getItem('boomio_hint_widget'));
      boomioMainHolder.style.bottom = storedBoomioWidgetPosition?.bottom ?? '30%'; // Adjust the starting vertical position
      boomioMainHolder.style.right = storedBoomioWidgetPosition?.right ?? '-150px'; // Adjust the starting horizontal position off-screen
      this.imageElement = document.createElement('img');
      this.imageElement.src = BoomioBubbles;
      const isMobile = window.innerWidth <= 768;
      this.imageElement.style.width = isMobile ? '120.375px' : '160.5px'; // Change width here
      this.imageElement.style.height = isMobile ? '120.375px' : '160.5px'; // Change height here
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
            if (boomioMainHolder) {
              const windowHeight = window.innerHeight;
              const windowWidth = window.innerWidth;

              const computedStyle = getComputedStyle(boomioMainHolder);
              const bottomInPixels = parseFloat(computedStyle.bottom);
              const rightInPixels = parseFloat(computedStyle.right);

              const bottomPercentage = (bottomInPixels / windowHeight) * 100;
              const rightPercentage = (rightInPixels / windowWidth) * 100;

              const positionObject = {
                bottom: bottomPercentage + '%',
                right: rightPercentage + '%',
              };

              localStorage.setItem('boomio_hint_widget', JSON.stringify(positionObject));
            }

            boomioMainHolder.style.animation = 'move-slowly 1s infinite alternate';
          }, 3000);
        }
      });

      widgetScreenWrapper.appendChild(boomioMainHolder);

      setTimeout(() => {
        if (!storedBoomioWidgetPosition) {
          setTimeout(() => {
            boomioMainHolder.style.animation = 'move-in 1.5s linear forwards';
          }, 500);

          setTimeout(() => {
            this.imageElement.src = BoomioBubbles;
          }, 4000);
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
