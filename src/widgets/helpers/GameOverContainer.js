import './styles.css';
import { gameOver } from './constants';
export class GameOverContainer {
  createGameOverContainerDiv() {
    this.isMobile = window.innerWidth <= 1280;

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container1');
    containerDiv.setAttribute('id', 'input-container1');
    containerDiv.style.width =
      document.body.offsetWidth < 430 ? document.body.offsetWidth + 'px' : '430px';

    containerDiv.innerHTML = `
    <div style="height: 100%; position: relative;  background: white; border-top-left-radius: 30px; border-top-right-radius: 30px; backdrop-filter: blur(10px)">
        <div style="width: 100%; height: 63px; top: 25px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Oswald; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">  <img style="width:266px;height:60px;" src=${gameOver} alt="Image Description"></div>
        <div class="boomio-colored_box" style="border:3px solid #3BAF29;width:calc(100% - 40px)"></div>
        <div style="width: 142px; left: 46px; top: 116px; position: absolute; color: #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:start;">TOTAL SCORE</div>
        <div style="left: calc(60% - 40px); top: 116px; position: absolute; color:  #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;" id="bestScoreField"></div>
        <div style="width: 142px; left: 46px; top: 150px; position: absolute; color:  #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:start;">BEST SCORE</div>
        <div style="left: calc(60% - 40px); top: 150px; position: absolute; color:  #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;line-height:28px;" id="currentScoreField"></div>
        <div style="left: 46px; top: 185px; position: absolute; color:  #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:start;">YOUR DISCOUNT REWARD</div>
        <div style="left: calc(60% - 40px); top: 185px; position: absolute; color:  #3BAF29; font-size: 18px; font-family: Oswald; font-weight: 700; line-height: 27px; word-wrap: break-word;text-align:right;width:120px;" id="bestScoreFieldConverted"></div>
        <div style="display:flex;margin-top:120px;justify-content:space-between;margin-left:10px;margin-right:10px;">
        <div id="startButtonClick1" style="cursor:pointer;width:110px;line-height:24px;box-sizing:content-box;padding-left: 27px; padding-right: 27px; padding-top: 13px; padding-bottom: 13px; top: 255px; background: #3BAF29; box-shadow:-4px -4px 8px 0px #DFE6F599 inset, 2px 2px 4px 0px #EEF3FFBF inset, 0px 6px 20px 0px #B3C5EA80;border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
            <div style="text-align: center; color: #3BAF29 ; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word">     <div style="line-height:24pxtext-align: center; color: white; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word">PLAY AGAIN</div></div>
        </div>
        <div id="claimReward" style="width:110px;box-sizing:content-box;padding-left: 25px; padding-right: 25px; padding-top: 11px; padding-bottom: 11px; top: 255px; border-radius: 35px; overflow: hidden; border: 3px #3BAF29 solid; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
            <div style="line-height:24pxtext-align: center; color: #3BAF29; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word">CLAIM</div>
        </div>
        </div>
    </div>
    `;

    return containerDiv;
  }
}
