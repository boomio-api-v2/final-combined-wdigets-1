import './styles.css';
import { rules, rules2, rules2Mobile } from './constants';

export class InputContainer {
  createInputContainerDiv() {
    this.isMobile = window.innerWidth <= 1280;

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');

    containerDiv.innerHTML = `

    
    <div style="width: 100%; height: 195px;box-sizing:content-box; padding-top: 25px; padding-bottom: 35px; background:  white;  border-top-right-radius: 20px;border-top-left-radius: 20px; backdrop-filter: blur(10px); flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; text-transform: uppercase; line-height: 41.60px; word-wrap: break-word;">  <img style="width:150px;height:60px" src=${rules} alt="Image Description" ></div>
    <div style="width: 320px;height:135px; color: white; font-size: 16px; font-family: Poppins; font-weight: 800; text-transform: uppercase; line-height: 35.20px; word-wrap: break-word;text-align:start;"><img src=${
      this.isMobile ? rules2Mobile : rules2
    } alt="Image Description" style="width:100%;height:100%"></div>
    </div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:424px;" class="control-button" id="control-button">
              <div id="startButtonClick" style="box-shadow: 0px 16px 32px 0px #3610A666; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-left: 137px; padding-right: 127px; padding-top: 11px; padding-bottom: 11px; background: #3BAF29
              ; border:3px solid white;border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: white; font-size: 18px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">LET'S PLAY</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}