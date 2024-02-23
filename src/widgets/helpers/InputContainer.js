import './styles.css';
import { rules, rules2, rules2Mobile, inputBackground } from './constants';
import { localStorageService } from '@/services';
export class InputContainer {
  constructor(prop, game) {
    this.prop = prop;
    this.game = game; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    console.log(game);
    this.config = localStorageService.getDefaultConfig();
  }
  createInputContainerDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');
    containerDiv.style.width =
      document.body.offsetWidth < 426 ? document.body.offsetWidth + 'px' : '426px';
    containerDiv.style.background =
      this.prop === 'barbora'
        ? `url(${inputBackground}`
        : this.prop === 'penki'
        ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.19) 100%), linear-gradient(166deg, rgba(166, 206, 57, 0.90) 9.98%, rgba(0, 181, 172, 0.90) 96.82%)'
        : 'white';
    containerDiv.style.backgroundSize = 'cover';

    containerDiv.innerHTML = `

    
    <div style="width: 100%; height: 195px;box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; line-height: 21.60px; word-wrap: break-word;">  ${
      this.prop !== 'barbora'
        ? `<img style="width:150px;height:75px" src=${rules} alt="Image Description" >`
        : '<div style="color: #FFF;text-align: center;font-family: Georama;font-size: 40px;font-style: normal;font-weight: 900;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: uppercase;">TAISYKLĖS</div>'
    }</div>
    <div style="width: 360px;margin-top:10px;margin-bottom:10px;height:135px; color: white; font-size: 16px; font-family: Poppins; font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${
      this.prop !== 'barbora'
        ? `<img src=${
            this.isMobile ? rules2Mobile : rules2
          } alt="Image Description" style="width:100%;height:100%">`
        : `<div style="width: 100%; height: 139px; position: relative">
          <div style="width: 142px; left: 158px; top: 9px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            kad skristum
          </div>
          <div style="width: 229px; left: 153px; top: 55px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            dėl geresnio rezultato
          </div>
          <div style="width: 246px; left: 155px; top: 104px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            500+ prizų kas savaitę
          </div>
          <div style="width: 145px; height: 139px; left: 0px; top: 0px; position: absolute">
            <div style="left: 0px; top: 0px; position: absolute; color: white; font-size: 29px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
              1. Spausk
            </div>
            <div style="left: 0px; top: 46px; position: absolute; color: white; font-size: 29px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            2. Kartok
            </div>
            <div style="left: 1px; top: 95px; position: absolute; color: white; font-size: 29px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            3. Laimėk
            </div>
          </div>
        </div>`
    }</div>
    ${
      this.prop === 'barbora'
        ? '<div style="align-self: stretch; text-align: center; color: white; font-size: 12px; font-family: Poppins; font-weight: 900; line-height: 21.60px; word-wrap: break-word;">Skaityk pilnas žaidimo taisykles. </div>'
        : ''
    }
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; line-height: 21.60px; word-wrap: break-word;">  
      </div>
    </div>
    <div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:${
                document.body.offsetWidth < 430 ? document.body.offsetWidth + 'px' : '430px'
              };" class="control-button" id="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-top: 13px; padding-bottom: 13px; background: ${
                this.prop === 'penki' ? 'white' : this.game === 'doodle' ? '#3BAF29' : 'white'
              }
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: ${
                this.game === 'doodle'
                  ? 'white'
                  : this.prop === 'barbora'
                  ? '#3D4928'
                  : this.prop === 'penki'
                  ? '#00B5AC'
                  : '#FF3183'
              }; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">${
      this.prop === 'penki' || this.prop === 'barbora' ? 'PIRMYN' : 'LET’S PLAY'
    }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
