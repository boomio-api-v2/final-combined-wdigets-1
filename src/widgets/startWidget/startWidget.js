import { localStorageService, boomioService, DragElement, AnimationService } from '@/services';
import { closeIcon, giftImage } from '@/сonstants/icons';
import './styles.css';

class StartWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    const size = 300;
    const { clientWidth, clientHeight } = document.documentElement;

    const posx = (Math.random() * (clientWidth - size)).toFixed();
    const posy = (Math.random() * (clientHeight - size * 1.5)).toFixed();

    const { animationEl } = new AnimationService({
      posx,
      posy,
      size,
    });

    new DragElement(animationEl);

    const { secondary_text, top_text, hint_static_text, button_text, under_picture_text } =
      localStorageService.config;

    animationEl.innerHTML = `
          <div class='position-relative product-design-bg-2 Preview-select' style='display:none;min-width: 180px;max-width: 300px; padding: 20px 22px;position:relative;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border: 1px solid #ddd' id='start_widget'>
          <div class='close_button align-right'>
          <img src='${closeIcon}' width='30' height='30' alt='' id="close_div_img">
        </div>
            <div class='coupon__preview__body coupon_discount_modal'>
              <div class='coupon__preview__card__header text-center d-block'>
                <h3>${top_text}</h3>
                <h4>${under_picture_text}</h4>
                <div class='user_gets_hint_img'>
                  <img src='${giftImage}' alt=''>
                </div>
                
                  <h3 class='color_text_bold_h3'>${secondary_text}</h3>
                  <h4 class='color_text_bold_h4'>${hint_static_text}</h4>
              
                <button id="letGoToBtn" class='go_button'>${button_text}</button>
              </div>
            </div>
          </div>
    `;
    function closeModalDiscount() {
      const element = document.getElementById('start_widget');
      element.style.display = 'none';
      localStorage.setItem('closing_button', 'start_widget');
      localStorage.setItem('start_signal', true);
      if (localStorage.getItem('start_signal')) {
        boomioService.signal('START_OK');
      }
    }

    document.getElementById('close_div_img').onclick = closeModalDiscount;
    localStorage.setItem('closing_button', 'start_widget');
    localStorage.setItem('start_widget', true);

    const letGoBtn = document.getElementById('letGoToBtn');
    letGoBtn.onclick = () => {
      const element = document.getElementById('start_widget');
      element.style.display = 'none';
      localStorage.setItem('closing_button', 'start_widget');

      localStorage.setItem('start_signal', true);

      if (localStorage.getItem('start_signal')) {
        boomioService.signal('START_OK');
      }
    };
  };
}

export default () => {
  new StartWidget();
};
