import { boomioService, DragElement, AnimationService } from '@/services';
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

    const props = {
      title: "You Got Lucky!",
      description: "There’s a reward waiting for you to win."
    };
    
    animationEl.innerHTML = `
          <div class='position-relative product-design-bg-2 Preview-select' style='min-width: 300px; padding: 40px 32px;position:relative;'>
          <div class='close_button align-right'>
          <img src='${closeIcon}' width='30' height='30' alt='' id="close_div_img">
        </div>
            <div class='coupon__preview__body coupon_discount_modal'>
              <div class='coupon__preview__card__header text-center d-block'>
                <h3>${props.title}</h3>
                <h4>${props.description}</h4>
                <div class='user_gets_hint_img'>
                  <img src='${giftImage}' alt=''>
                </div>
                ${!props.puzzle ? `
                  <h3 class='color_text_bold_h3'>Find a game and unlock your reward.</h3>
                  <h4 class='color_text_bold_h4'><b>Hint</b> - look at Adidas Stan Smith J FX7519</h4>
                ` : ''}
                <button id="letGoToBtn" class='go_button'>Go!</button>
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
