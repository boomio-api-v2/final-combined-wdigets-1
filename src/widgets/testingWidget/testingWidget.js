import { boomioService, DragElement, AnimationService } from '@/services';
import { closeIcon  } from '@/сonstants/icons';
import './styles.css';

class TestingWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    const size = 200;
    const { clientWidth, clientHeight } = document.documentElement;

    const posx = ((clientWidth - size)/2).toFixed();
    const posy = ((clientHeight - size)/2).toFixed();

    const { animationEl } = new AnimationService({
      posx,
      posy,
      size,
    });

    new DragElement(animationEl);

    function closeModalDiscount() {
      animationEl.remove();
    }

    const props = {
      title: "You Got Lucky!",
      description: "There’s a reward waiting for you to win."
    };
    

    const widgetsList = [
      {'spawn':'puzzle','despawn':'puzzle'},
      {'spawn':'wheel','despawn':'wheelOfFortune'},
      {'spawn':'image','despawn':'puzzle'},
      {'spawn':'stone','despawn':'stone-container'},
      {'spawn':'ice','despawn':'ice-widget'},
      {'spawn':'penguin','despawn':'penguin-widget'},
    ];

    let buttonsHtml = '';
widgetsList.forEach((widget) => {
  const spawnBtnId = `SpawnBtn_${widget.spawn}`;
  const despawnBtnId = `DespawnBtn_${widget.spawn}`;

  buttonsHtml += `<div style='width:100%;margin-bottom:16px'>
    <button class='go_button' data-widget-spawn='${widget.spawn}' id='${spawnBtnId}'>Spawn</button>${widget.spawn}<button id="${despawnBtnId}" data-widget-despawn='${widget.despawn}' class='go_button'>Despawn</button>
  </div>`;
});

    animationEl.innerHTML = `
          <div class='position-relative product-design-bg-2 Preview-select' style='min-width: 400px; padding: 20px 10px;position:relative;'>
          <div class='close_button align-right'>
          <img src='${closeIcon}' width='30' height='30' alt='' id="close_div_img">
        </div>
            <div class='coupon__preview__body coupon_discount_modal'>
              <div class='coupon__preview__card__header text-center d-block'>
                <h3>Testing widgets</h3>
                ${buttonsHtml}          
                    </div>
            </div>
          </div>
    `;
    document.getElementById('close_div_img').onclick = closeModalDiscount;

    widgetsList.forEach((widget) => {
      const spawnBtnId = `SpawnBtn_${widget.spawn}`;
      const despawnBtnId = `DespawnBtn_${widget.spawn}`;

      document.getElementById(spawnBtnId).onclick = () => {
        const widget = document.getElementById(spawnBtnId).getAttribute('data-widget-spawn');
        console.log('spawn',widget);
        boomioService.testing(widget);
      };


      document.getElementById(despawnBtnId).onclick = () => {
        const widget = document.getElementById(despawnBtnId).getAttribute('data-widget-despawn');
        console.log('depsawn',widget);
        const element = document.getElementById(widget);
        if (element) {
        element.remove();
      }};
    });

  };
}

export default () => {
  new TestingWidget();
};
