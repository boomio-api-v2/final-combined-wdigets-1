import './styles.css';
import { rules, rules2, rules2Mobile, inputBackground } from './constants';

export class InputContainer {
  constructor(prop) {
    this.prop = prop; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    console.log(prop);
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

    
    <div style="width: 100%; height: 195px;box-sizing:content-box; padding-top: 15px; padding-bottom: 35px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; text-transform: uppercase; line-height: 21.60px; word-wrap: break-word;">  <img style="width:150px;height:75px" src=${rules} alt="Image Description" ></div>
    <div style="width: 320px;height:135px; color: white; font-size: 16px; font-family: Poppins; font-weight: 700; text-transform: uppercase; line-height: 35.20px; word-wrap: break-word;text-align:start;"><img src=${
      this.isMobile ? rules2Mobile : rules2
    } alt="Image Description" style="width:100%;height:100%"></div>
    </div>
    <div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:${
                document.body.offsetWidth < 430 ? document.body.offsetWidth + 'px' : '430px'
              };" class="control-button" id="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px 0px #DFE6F599 inset, 2px 2px 4px 0px #EEF3FFBF inset, 0px 6px 20px 0px #B3C5EA80; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-top: 13px; padding-bottom: 13px; background: ${
                this.prop === 'penki' ? 'white' : 'white'
              }
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: ${
                this.prop === 'barbora' ? '#3D4928' : this.prop === 'penki' ? '#00B5AC' : '#FF3183'
              }; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">${
      this.prop === 'penki' || this.prop === 'barbora' ? 'PIRMYN' : 'LET’S PLAY'
    }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
