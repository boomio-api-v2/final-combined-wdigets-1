import './styles.css';
import { checkIcon } from './constants';

export class InputRegisterContainer {
  constructor(prop) {
    this.prop = prop; // Store the this.prop in a class this.property
    this.isMobile = window.innerWidth <= 1280;
  }
  createInputRegisterContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');
    console.log(this.prop);
    containerDiv.style.background =
      this.prop === 'barbora'
        ? 'white'
        : this.prop === 'penki'
        ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.19) 100%), linear-gradient(166deg, rgba(166, 206, 57, 0.90) 9.98%, rgba(0, 181, 172, 0.90) 96.82%)'
        : 'linear-gradient(0deg, rgba(0, 0, 0, 0.19), rgba(0, 0, 0, 0.19)),linear-gradient(166.42deg, rgba(255, 49, 131, 0.9) 9.98%, rgba(101, 123, 234, 0.9) 96.82%)';

    containerDiv.style.width =
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px';

    let privacyCheckboxChecked = true; // Use let instead of const to allow reassignment
    containerDiv.innerHTML = `
      <div style="height: 124px; top: 38px; position: relative; text-align: center;margin:10px; color: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; font-size: 54px; font-family: Oswald; font-weight: 900; text-transform: uppercase; line-height: 62.40px; word-wrap: break-word">REGISTRUOKIS ŽAISTI</div>
      <div id="boomio-competition-confirm-field" style="cursor:pointer;width: calc(100% - 54px); padding-top: 11px; padding-bottom: 11px; left: 27px; top: 430px; position: absolute; background: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center; color: ${
          this.prop === 'barbora' ? 'white' : this.prop === 'penki' ? '#00B5AC' : '#FF3183'
        } ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word" >TOLIAU</div>
      </div>
      <div class="privacyCheckbox" id="privacyCheckbox" style="cursor:pointer;left: 28px; top: 375px; position: absolute; justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      
      <div  style="cursor: pointer;">
            <img id="privacyCheckboxImg"  src="${
              privacyCheckboxChecked ? checkIcon : ''
            }" style="width: 20px; height: 20px;">
        </div>


        <div style="color: ${
          this.prop === 'barbora' ? '#3BAF29' : 'white'
        }; font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 32px; word-wrap: break-word;text-align:start;">Sutinku su Penki sezonai <a href="https://penkisezonai.lt/lt-lt/privatumo-politika.html" style="color:white;text-decoration: underline;font-size:14px;">privatumo politika.</a></div>
      </div>


      <div style="width: calc(100% - 54px); height: 30px; left: 45px; top: 260px; position: absolute;text-align:start;z-index:99999;color: #CD1E1E;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: -0.42px;
      " id="competition-name-error"></div>


      <div style="width: calc(100% - 54px); height: 30px; left: 45px; top: 340px; position: absolute;text-align:start;z-index:99999;color: #CD1E1E;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: -0.42px;
      " id="competition-email-error"></div>


      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: 287px; position: absolute; background: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${
      this.prop === 'barbora'
        ? '1px rgba(59,175,41,0.9) solid'
        : this.prop === 'penki'
        ? '1px solid #A6CE39'
        : ' 1px #FF3284 solid'
    }"></div>



      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: 204px; position: absolute; background: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${
      this.prop === 'barbora'
        ? '1px rgba(59,175,41,0.9) solid'
        : this.prop === 'penki'
        ? '1px solid #A6CE39'
        : ' 1px #FF3284 solid'
    }"></div>
      <input id="boomio-competition-email-input-field" class="boomio-competition-email-input-field" type="text" style="border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: 299px; opacity: 0.60;background-color: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; text-align: start; color:  ${
      this.prop === 'barbora' ? 'white' : '#473F4E'
    } ; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word" placeholder="Elektroninio pašto adresas">
      <input id="boomio-competition-name-input-field" class="boomio-competition-name-input-field" type="text" style="border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: 215px; opacity: 0.60;background-color: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; text-align: start; color:  ${
      this.prop === 'barbora' ? 'white' : '#473F4E'
    } ; font-size: 20px; font-family: Londrina Solid; font-weight: 300; line-height: 24px; word-wrap: break-word" placeholder="Žaidėjo slapyvardis">
    `;

    return containerDiv;
  }
}
