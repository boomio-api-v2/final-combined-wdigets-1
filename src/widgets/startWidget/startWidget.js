import { localStorageService, boomioService, DragElement, AnimationService } from '@/services';
import { closeIcon, giftImage  } from '@/сonstants/icons';
import './styles.css';

class StartWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    const size = 200;
    const { clientWidth, clientHeight } = document.documentElement;

    const posx = (Math.random() * (clientWidth - size)).toFixed();
    const posy = (Math.random() * (clientHeight - size * 1.5)).toFixed();

    const { animationEl } = new AnimationService({
      posx,
      posy,
      size,
    });

    new DragElement(animationEl);

    function closeModalDiscount() {
      boomioService.signal('START_CLOSE');
      animationEl.remove();
    }

    const { start_secondary_text,start_top_text,w_hint_static_text,w_button_text,under_picture_text } = localStorageService.config;
    
    animationEl.innerHTML = `
          <div class='position-relative product-design-bg-2 Preview-select' style='min-width: 300px; padding: 40px 32px;position:relative;'>
          <div class='close_button align-right'>
          <img src='${closeIcon}' width='30' height='30' alt='' id="close_div_img">
        </div>
            <div class='coupon__preview__body coupon_discount_modal'>
              <div class='coupon__preview__card__header text-center d-block'>
                <h3>${start_top_text}</h3>
                <h4>${under_picture_text}</h4>
                <div class='user_gets_hint_img'>
                  <img src='${giftImage}' alt=''>
                </div>
                
                  <h3 class='color_text_bold_h3'>${start_secondary_text}</h3>
                  <h4 class='color_text_bold_h4'>${w_hint_static_text}</h4>
              
                <button id="letGoToBtn" class='go_button'>${w_button_text}</button>
              </div>
            </div>
          </div>
    `;
    document.getElementById('close_div_img').onclick = closeModalDiscount;

    const letGoBtn = document.getElementById('letGoToBtn');
    letGoBtn.onclick = () => {
      boomioService.signal('START_OK');
      animationEl.remove();
    };
  };
}

export default () => {
  new StartWidget();
};
