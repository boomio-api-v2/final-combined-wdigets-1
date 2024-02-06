import './styles.css';
import { checkIcon } from './constants';

export class InputRegisterContainer {
  createTestDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');

    containerDiv.innerHTML = `
      <div style="width: 327px; height: 124px; left: 53px; top: 38px; position: absolute; text-align: center; color: black; font-size: 48px; font-family: Georama; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">REGISTER TO PLAY</div>
      <div style="width: 379px; padding-top: 11px; padding-bottom: 11px; left: 27px; top: 430px; position: absolute; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">OK</div>
      </div>
      <div style="left: 28px; top: 353px; position: absolute; justify-content: center; align-items: center; gap: 5px; display: inline-flex">
        <div style="width: 20px; height: 20px; position: relative">
          <div style="width: 20px; height: 20px; left: 0px; top: 0px; position: absolute; background: white"><img src="${checkIcon}"/></div>
        </div>
        <div style="color: white; font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 32px; word-wrap: break-word">I agree with user agreement and privacy policy.</div>
      </div>
      <div style="width: 379px; height: 45px; left: 28px; top: 287px; position: absolute; background: white; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: 1px #FF3284 solid"></div>
      <div style="width: 379px; height: 45px; left: 28px; top: 204px; position: absolute; background: white; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: 1px #FF3183 solid"></div>
      <div style="left: 61px; top: 299px; position: absolute; opacity: 0.60; text-align: center; color: #473F4E; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word">Your email address</div>
      <div style="left: 61px; top: 215px; position: absolute; opacity: 0.60; text-align: center; color: #473F4E; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word">Player name</div>
    `;

    return containerDiv;
  }
}
