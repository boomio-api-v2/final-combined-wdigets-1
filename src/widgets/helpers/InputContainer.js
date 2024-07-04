import './styles.css';
import { localStorageService } from '@/services';

export class InputContainer {
  constructor(prop, game) {
    this.prop = prop;
    this.game = game; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();

    this.language = this.config.language ? this.config.language : 'EN';
  }
  createInputContainerDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');
    containerDiv.style.width =
      document.body.offsetWidth < 426 ? document.body.offsetWidth + 'px' : '426px';
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.zIndex = 99999999999;
    containerDiv.innerHTML = `

    
    <div style="width: 100%; height: 180px;box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 900; line-height: 21.60px; word-wrap: break-word;">  ${`<div style="color: #FFF;text-align: center;font-family: Georama;font-size: 40px;font-style: normal;font-weight: 900;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: uppercase;">${
      this.language === 'LV'
        ? 'NOTEIKUMI'
        : this.language === 'RU'
        ? 'ПРАВИЛА'
        : this.language === 'EE'
        ? 'REEGLID'
        : this.prop === 'Fpro'
        ? 'RULES'
        : 'TAISYKLĖS'
    }</div>`}</div>
    <div style="width: 360px;margin-top:10px;margin-bottom:10px;height:120px; color: white; font-size: 16px; font-family: Poppins; font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${`<div style="width: 100%; height: 139px; position: relative">
          <div style="width: 172px; left: ${
            this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
              ? '180px'
              : this.prop === 'Fpro'
              ? '130px'
              : '160px'
          }; top: 9px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            ${
              this.language === 'LV'
                ? 'lai lidotu'
                : this.language === 'RU'
                ? 'чтобы лететь'
                : this.language === 'EE'
                ? 'lendamiseks'
                : this.game === 'drive'
                ? 'į šonus kad vairuotum'
                : this.prop === 'Fpro'
                ? 'TO FLY'
                : 'kad skristum'
            }
          </div>
          <div style="width: 229px; left: ${
            this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
              ? '180px'
              : this.prop === 'Fpro'
              ? '150px'
              : '160px'
          }; top: 46px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 31.50px; word-wrap: break-word">
            ${
              this.language === 'LV'
                ? 'labākam rezultātam'
                : this.language === 'RU'
                ? 'для лучшего результата'
                : this.language === 'EE'
                ? 'parema tulemuse saavutamiseks'
                : this.prop === 'Fpro'
                ? 'FOR BETTER RESULT'
                : 'dėl geresnio rezultato'
            }
          </div>
          <div style="width: 236px; left: ${
            this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
              ? '180px'
              : this.prop === 'Fpro'
              ? '105px'
              : '160px'
          }; top: 85px; position: absolute; color: white; font-size: 14px; font-family: Georama; font-weight: 800; line-height: 18px; word-wrap: break-word">
            ${
              this.language === 'LV'
                ? 'līdz pat 30 Yesyes.lv balvām!'
                : this.language === 'RU'
                ? 'до 30 призов от Yesyes.lv!'
                : this.language === 'EE'
                ? 'kuni 30 yesyes.ee auhinda!'
                : this.prop === 'LemonGym'
                ? 'Lemon Gym narystes</br> kas mėnesį!'
                : this.prop === 'Fpro'
                ? 'UP TO 20% OFF!'
                : this.prop === 'Barbora'
                ? 'gimtadienio prizus iškart!'
                : this.prop === 'Fantazijos'
                ? 'net 69 Fantazijos.lt prizus!'
                : this.prop === 'Makalius'
                ? 'MAKALIAUS kuponus!'
                : 'Lemon Gym narystes</br> kas mėnesį!'
            }
          </div>
          <div style="width: ${
            this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
              ? '165px'
              : '145px'
          }; height: 139px; left: 20px; top: 0px; position: absolute">
            <div style="left: 0px; top: 0px; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : '24px'
            }; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
              1. ${
                this.language === 'LV'
                  ? 'NOSPIEDIET'
                  : this.language === 'RU'
                  ? 'ПРАВИЛА'
                  : this.language === 'EE'
                  ? 'KLÕPSA'
                  : this.prop === 'Fpro'
                  ? 'CLICK'
                  : 'Spausk'
              }
            </div>
            <div style="left: 0px; top: 36px; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : '24px'
            }; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            2.  ${
              this.language === 'LV'
                ? 'ATKĀRTOT'
                : this.language === 'RU'
                ? 'ПОВТОРИТЬ'
                : this.language === 'EE'
                ? 'KORDA'
                : this.prop === 'Fpro'
                ? 'REPEAT'
                : 'Kartok'
            }
            </div>
            <div style="left: 1px; top: 70px; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : '24px'
            }; font-family: Georama; font-weight: 800; line-height: 43.50px; word-wrap: break-word">
            3. ${
              this.language === 'LV'
                ? 'LAIMĒT'
                : this.language === 'RU'
                ? 'ВЫИГРАЙТЕ'
                : this.language === 'EE'
                ? 'VÕIDA'
                : this.prop === 'Fpro'
                ? 'WIN'
                : 'Laimėk'
            } 
            </div>
          </div>
        </div>`}</div>
    ${
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonGym' ||
      this.prop === 'Makalius'
        ? `<div style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family: Poppins; font-weight: 700; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${
            this.prop === 'Barbora'
              ? 'href=https://www.barbora.lt/info/akciju-zaidimu-taisykles'
              : this.prop === 'LemonGym'
              ? 'href=https://www.lemongym.lt/nestabdyk/#zaidimas'
              : this.prop === 'Makalius'
              ? 'href=https://www.makalius.lt/gimtadienio-zaidimo-taisykles/'
              : this.language === 'LV'
              ? 'href=https://docs.google.com/document/d/1QNzkm_j-Sn73LsykBYgFAfwg0Ij2TeM5/edit'
              : this.language === 'RU'
              ? 'href=https://docs.google.com/document/d/1PN05AH1AQUL6iiENuVVeVBJGip6Ia6w1/edit'
              : this.language === 'EE'
              ? 'href=https://docs.google.com/document/d/1OeMh9o3FeQMj00XRvsxlvwbUpaYuBgRsVLUZMCPWfdo/edit'
              : this.prop === 'Fantazijos'
              ? 'href=https://www.fantazijos.lt/zaidimo-taisykles'
              : this.prop === 'Fpro'
              ? 'href=https://fpro.com/'
              : 'href=https://drive.google.com/file/d/1UdSXF9ekFoyyzB4S1swMj7uAEtMa91c0/view?usp=sharing'
          } style="color:white;text-decoration: underline;font-size:12px;margin-top:6px;">${
            this.language === 'LV'
              ? 'Lasīt pilnus spēles noteikumus. '
              : this.language === 'RU'
              ? 'Читайте полные правила игры.'
              : this.language === 'EE'
              ? 'Loe kõik mängureeglid läbi.'
              : this.prop === 'Fpro'
              ? 'Read full games rules. '
              : 'Skaityk pilnas žaidimo taisykles.'
          } </a></div>`
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
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-top: 13px; padding-bottom: 13px; background: white
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 24px; font-family: Oswald; font-weight: 700; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: ${'#3D4928'}; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">${
      this.language === 'LV'
        ? 'TĀLĀK'
        : this.language === 'RU'
        ? 'ДАЛЕЕ'
        : this.language === 'EE'
        ? 'EDASI'
        : this.prop === 'Barbora' ||
          this.prop === 'Fantazijos' ||
          this.prop === 'LemonGym' ||
          this.prop === 'Makalius'
        ? 'PIRMYN'
        : this.prop === 'Fpro'
        ? 'PLAY'
        : 'LET’S PLAY'
    }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
