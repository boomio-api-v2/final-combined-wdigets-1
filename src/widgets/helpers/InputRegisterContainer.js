import './styles.css';
import { checkIcon } from './constants';

export class InputRegisterContainer {
  createInputRegisterContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');

    let privacyCheckboxChecked = true; // Use let instead of const to allow reassignment

    containerDiv.innerHTML = `
      <div style="width: 327px; height: 124px; left: 53px; top: 38px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Oswald; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">REGISTER TO PLAY</div>
      <div id="boomio-competition-confirm-field" style="width: 379px; padding-top: 11px; padding-bottom: 11px; left: 27px; top: 430px; position: absolute; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word" >OK</div>
      </div>
      <div style="left: 28px; top: 353px; position: absolute; justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      
      <div class="privacyCheckbox" id="privacyCheckbox" style="cursor: pointer;">
            <img id="privacyCheckboxImg"  src="${
              privacyCheckboxChecked ? checkIcon : ''
            }" style="width: 20px; height: 20px;">
        </div>


        <div style="color: white; font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 32px; word-wrap: break-word">I agree with user agreement and privacy policy.</div>
      </div>
      <div style="width: 379px; height: 45px; left: 28px; top: 287px; position: absolute; background: white; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: 1px #FF3284 solid"></div>
      <div style="width: 379px; height: 45px; left: 28px; top: 204px; position: absolute; background: white; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: 1px #FF3183 solid"></div>
      <input id="boomio-competition-email-input-field" class="boomio-competition-email-input-field" type="text" style="border:none;width:329px;position: absolute; left: 51px; top: 299px; opacity: 0.60; text-align: start; color: #473F4E; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word" placeholder="Your email address">
      <input id="boomio-competition-name-input-field" class="boomio-competition-name-input-field" type="text" style="border:none;width:329px;position: absolute; left: 51px; top: 215px; opacity: 0.60; text-align: start; color: #473F4E; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word" placeholder="Player name">
    `;

    return containerDiv;
  }
}
