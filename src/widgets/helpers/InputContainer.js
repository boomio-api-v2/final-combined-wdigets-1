import './styles.css';
import { rules, rules2, rules2Mobile } from './constants';
import { localStorageService } from '@/services';
export class InputContainer {
  constructor(prop, game) {
    this.prop = prop;
    this.game = game; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();
  }
  createInputContainerDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');
    containerDiv.style.width =
      document.body.offsetWidth < 426 ? document.body.offsetWidth + 'px' : '426px';
    containerDiv.style.background =
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? `none`
        : 'white';
    containerDiv.style.backgroundSize = 'cover';

    containerDiv.innerHTML = `

    
    <div style="width: 100%; height: 180px;box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; line-height: 21.60px; word-wrap: break-word;">  ${
      this.prop !== 'Barbora' && this.prop !== 'Penki Sezonai' && this.prop !== 'Babune'
        ? `<img style="width:150px;height:75px" src=${rules} alt="Image Description" >`
        : '<div style="color: #FFF;text-align: center;font-family: Georama;font-size: 40px;font-style: normal;font-weight: 900;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: uppercase;">TAISYKLĖS</div>'
    }</div>
    <div style="width: 360px;margin-top:10px;margin-bottom:10px;height:120px; color: white; font-size: 16px; font-family: Poppins; font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${
      this.prop !== 'Barbora' && this.prop !== 'Penki Sezonai' && this.prop !== 'Babune'
        ? `<img src=${
            this.isMobile ? rules2Mobile : rules2
          } alt="Image Description" style="width:270px;height:100%">`
        : `<div style="width: 100%; height: 139px; position: relative">
          <div style="width: 142px; left: 160px; top: 9px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            kad skristum
          </div>
          <div style="width: 229px; left: 160px; top: 46px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            dėl geresnio rezultato
          </div>
          <div style="width: 246px; left: 160px; top: 88px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 18px; word-wrap: break-word">
            ${
              this.prop === 'Barbora'
                ? 'KINO PAVASARIO bilietus arba BARBOROS kuponus'
                : this.prop === 'Penki Sezonai'
                ? 'pavasario batukus, arba lietaus pirštinės REIMA KURA'
                : '50€ ir kitus Babūnė kuponus. Net 30 laimėtojų!'
            }
          </div>
          <div style="width: 145px; height: 139px; left: 40px; top: 0px; position: absolute">
            <div style="left: 0px; top: 0px; position: absolute; color: white; font-size: 24px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
              1. Spausk
            </div>
            <div style="left: 0px; top: 36px; position: absolute; color: white; font-size: 24px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            2. Kartok
            </div>
            <div style="left: 1px; top: 70px; position: absolute; color: white; font-size: 24px; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            3. Laimėk
            </div>
          </div>
        </div>`
    }</div>
    ${
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? `<div style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family: Poppins; font-weight: 700; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${
            this.prop === 'Barbora'
              ? 'href=https://www.barbora.lt/info/akciju-zaidimu-taisykles'
              : this.prop === 'Babune'
              ? "href='taisykles'"
              : 'href=https://drive.google.com/file/d/1UdSXF9ekFoyyzB4S1swMj7uAEtMa91c0/view?usp=sharing'
          } style="color:white;text-decoration: underline;font-size:12px;margin-top:6px;">Skaityk pilnas žaidimo taisykles. </a></div>`
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
              };" id="control-button" class="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-top: 13px; padding-bottom: 13px; background: ${
                this.game === 'doodle' ? '#3BAF29' : 'white'
              }
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: ${
                this.game === 'doodle'
                  ? 'white'
                  : this.prop === 'Barbora' ||
                    this.prop === 'Penki Sezonai' ||
                    this.prop === 'Babune'
                  ? '#3D4928'
                  : '#FF3183'
              }; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">${
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? 'PIRMYN'
        : 'LET’S PLAY'
    }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
