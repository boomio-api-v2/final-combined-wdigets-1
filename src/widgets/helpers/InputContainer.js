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
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.zIndex = 99999999999;
    containerDiv.innerHTML = `

    
    <div style="width: 100%; height: 180px;box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 20px; padding-right: 20px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700; line-height: 21.60px; word-wrap: break-word;">  ${`<div style="${
      this.prop === 'Ikea' ? 'margin-left:20px' : ''
    };color: #FFF;text-align: ${
      this.prop === 'Ikea' ? 'start' : 'center'
    } ;font-size: 40px;font-style: normal;font-weight: 700;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: ${
      this.prop === 'Ikea' ? 'none' : 'uppercase'
    };">${
      this.language === 'LV'
        ? 'NOTEIKUMI'
        : this.language === 'RU'
        ? 'ПРАВИЛА'
        : this.language === 'EE'
        ? 'REEGLID'
        : this.language === 'ES'
        ? 'REGLAS'
        : this.prop === 'Fpro'
        ? 'RULES'
        : this.prop === 'Ikea'
        ? 'Kaip žaisti?'
        : this.prop === 'Eurovaistine'
        ? 'NOTEIKUMI'
        : 'Taisyklės'
    }</div>`}</div>
    <div style="width: 390px;margin-top:10px;margin-bottom:10px;height:120px; color: white; font-size: 14px;font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${`<div style="width: 100%; height: 139px; position: relative">

 

          <div style="width:100%; height: 139px; left: 20px; top: 0px; position: absolute">
            <div style="left: 0px; top: 0px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : this.prop === 'Ikea'
                ? '20px'
                : '24px'
            }; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700; line-height: 43.50px; word-wrap: break-word">
              1. ${
                this.language === 'LV' && this.game === 'drive'
                  ? 'NOĶER,'
                  : this.language === 'EE' && this.game === 'drive'
                  ? 'LIIKUMISEKS —'
                  : this.language === 'LV' && this.game === 'doodle'
                  ? 'PĀRVIETOJIES'
                  : this.language === 'LV'
                  ? 'NOSPIEDIET'
                  : this.language === 'RU'
                  ? 'ПРАВИЛА'
                  : this.language === 'EE'
                  ? 'KLÕPSA'
                  : this.language === 'ES'
                  ? 'Click '
                  : this.prop === 'Fpro'
                  ? 'CLICK'
                  : this.prop === 'Ikea'
                  ? 'Vairuokite,'
                  : this.prop === 'Eurovaistine'
                  ? 'SAŅEMT'
                  : this.prop === 'Akropolis'
                  ? 'Judėk'
                  : this.prop === 'Pieno Žvaigždės'
                  ? 'Gaudyk'
                  : this.prop === 'Pegasas'
                  ? 'Gaudyk'
                  : 'Spausk'
              }
                            <div style="top: 9px;margin-top:5px;  color: white; font-size: ${
                              this.prop === 'Akropolis' ? '14px' : '12px'
                            };  font-weight: 700;margin-left:4px; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; word-wrap: break-word">
            ${
              this.prop === 'Eurovaistine'
                ? 'pārvietojoties uz sāniem.'
                : this.language === 'LV' && this.game === 'drive'
                ? 'uz sāniem braukt.'
                : this.language === 'EE' && this.game === 'drive'
                ? 'libista sõrmega küljelt küljele.'
                : this.language === 'LV'
                ? 'sāņus, lai nenokristu.'
                : this.language === 'LV' && this.game === 'drive'
                ? 'libista sõrmega küljelt küljele.'
                : this.language === 'RU'
                ? 'чтобы лететь'
                : this.language === 'EE'
                ? 'lendamiseks'
                : this.language === 'ES'
                ? 'para volar'
                : this.game === 'drive' && this.prop === 'Ikea'
                ? 'braukdami kairiau ar dešiniau.'
                : this.prop === 'Gamtos Ateitis Paper'
                ? 'popieriaus pakuočių atliekas.'
                : this.prop === 'Gamtos Ateitis Plastic'
                ? 'plastiko pakuočių atliekas.'
                : this.prop === 'Gamtos Ateitis Glass'
                ? 'stiklo pakuočių atliekas.'
                : this.prop === 'Pieno Žvaigždės'
                ? '“MIAU” produktus.'
                : this.prop === 'Pegasas'
                ? ' Pegaso produktus.'
                : this.game === 'drive'
                ? 'į šonus kad vairuotum'
                : this.prop === 'Fpro'
                ? 'TO FLY'
                : this.prop === 'Akropolis'
                ? 'į šonus kad  nenukristum.'
                : 'kad skristum.'
            }
          </div>
            </div>
            <div style="left: 0px; top: 36px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : this.prop === 'Ikea'
                ? '20px'
                : '24px'
            }; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700; line-height: 43.50px; word-wrap: break-word">
            2.  ${
              this.language === 'LV' && this.game === 'doodle'
                ? 'SPĒLĒ VĒLREIZ,'
                : this.language === 'LV'
                ? 'ATKĀRTO'
                : this.language === 'RU'
                ? 'ПОВТОРИТЬ'
                : this.language === 'EE'
                ? 'KORDA —'
                : this.language === 'ES'
                ? 'Repetir'
                : this.prop === 'Fpro'
                ? 'REPEAT'
                : this.prop === 'Ikea'
                ? 'Kartokite,'
                : this.prop === 'Eurovaistine'
                ? 'ATKĀRTOT'
                : 'Kartok'
            }
                         <div style=" top: 46px;margin-left:4px;margin-top:5px; color: white; font-size: ${
                           this.prop === 'Akropolis' ? '14px' : '12px'
                         }; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700;  word-wrap: break-word">
            ${
              this.prop === 'Eurovaistine'
                ? 'un uzlabo savu rezultātu.'
                : this.game === 'doodle' && this.language === 'LV'
                ? 'lai uzlabotu savu rezultātu.'
                : this.language === 'LV'
                ? 'labākam rezultātam'
                : this.language === 'RU'
                ? 'для лучшего результата'
                : this.language === 'ES'
                ? 'para un mejor resultado'
                : this.language === 'EE'
                ? 'parema tulemuse saavutamiseks.'
                : this.prop === 'Pieno Žvaigždės'
                ? 'siekdamas kuo geresnio rezultato.'
                : this.prop === 'Pegasas'
                ? 'siekdamas kuo geresnio rezultato.'
                : this.game === 'drive'
                ? 'siekdamas geresnio rezultato.'
                : this.game === 'drive' && this.prop === 'Ikea'
                ? 'jei nesate patenkinti rezultatu.'
                : this.prop === 'Fpro'
                ? 'FOR BETTER RESULT'
                : 'dėl geresnio rezultato.'
            }
          </div>
            </div>
            <div style="left: 1px; top: 70px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'EE'
                ? '20px'
                : this.prop === 'Ikea'
                ? '20px'
                : '24px'
            }; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700; line-height: 43.50px; word-wrap: break-word;white-space: nowrap;">
            3. ${
              this.language === 'LV'
                ? 'LAIMĒ'
                : this.language === 'RU'
                ? 'ВЫИГРАЙТЕ'
                : this.language === 'EE'
                ? 'VÕIDA —'
                : this.language === 'ES'
                ? 'Gana'
                : this.prop === 'Fpro'
                ? 'WIN'
                : this.prop === 'Ikea'
                ? 'Laimėkite,'
                : this.prop === 'Eurovaistine'
                ? 'LAIMĒ'
                : 'Laimėk'
            } 
                          <div style="top: 85px;margin-top:${
                            this.prop === 'Pieno Žvaigždės' ? '13px' : '3px'
                          }; color: white; font-size: ${
      this.prop === 'Akropolis' ? '14px' : '12px'
    }; font-family:${
      this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
    }; font-weight: 700;margin-left:4px; word-wrap: break-word; ${
      this.prop === 'Pieno Žvaigždės' ? 'white-space:normal;' : ''
    }${this.prop === 'Pieno Žvaigždės' ? 'line-height:25px;' : ''}">
            ${
              this.prop === 'Eurovaistine'
                ? 'kādu no 50 balvām!'
                : this.language === 'LV' && this.game === 'doodle'
                ? 'katru dienu!'
                : this.language === 'LV' && this.game === 'drive'
                ? 'līdz pat 100 Unisend balvām!'
                : this.language === 'EE' && this.game === 'drive'
                ? 'kuni 100 Unisend.ee auhinda!'
                : this.language === 'LV'
                ? 'līdz pat 30 Yesyes.lv balvām!'
                : this.language === 'RU'
                ? 'до 30 призов от Yesyes.lv!'
                : this.language === 'EE'
                ? 'до 30 призов от Yesyes.lv!'
                : this.language === 'ES'
                ? '100 premios!'
                : this.prop.includes('Gamtos Ateitis')
                ? 'stalo žaidimą ar rūšiavimo namuose rinkinį!'
                : this.prop === 'Pieno Žvaigždės'
                ? 'kassavaitinius Forum Cinema bilietus ir pagrindinius MIAU prizus!'
                : this.prop === 'Pegasas'
                ? '1 iš 80 Pegaso knygų, kas dvi savaites!'
                : this.prop === 'LemonGym'
                ? 'Lemon Gym narystes kas mėnesį!'
                : this.prop === 'Fpro'
                ? 'UP TO 20% OFF!'
                : this.prop === 'Barbora'
                ? 'iš karto!'
                : this.prop === 'Corepetitus'
                ? 'COREPETITUS priedą!'
                : this.prop === 'Ikea'
                ? 'ir prizą atsiimkite iš karto!'
                : this.prop === 'Fantazijos'
                ? 'net 69 Fantazijos.lt prizus!'
                : this.prop === 'Makalius'
                ? 'MAKALIAUS kuponus!'
                : this.prop === 'Akropolis'
                ? 'kasdien!'
                : 'Lemon Gym narystes</br> kas mėnesį!'
            }
          </div>
            </div>
          </div>
        </div>`}</div>
    ${
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonGym' ||
      this.prop === 'Makalius' ||
      this.prop === 'Corepetitus' ||
      this.prop === 'Pieno Žvaigždės' ||
      this.prop === 'Pegasas' ||
      this.prop === 'Eurovaistine' ||
      this.prop.includes('Gamtos Ateitis') ||
      this.prop === 'Akropolis' ||
      this.prop === 'Ikea'
        ? `<div style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:${
            this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
          }; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${
            this.prop === 'Barbora'
              ? 'href=https://www.barbora.lt/info/akciju-zaidimu-taisykles'
              : this.prop === 'Eurovaistine'
              ? 'href=https://www.e-euroaptieka.lv/ker-un-laime-speles-noteikumi'
              : this.prop === 'Unisend' && this.language === 'LV'
              ? 'href=https://unisend.lv'
              : this.prop === 'Unisend' && this.language === 'EE'
              ? 'href=https://unisend.ee'
              : this.prop === 'LemonGym'
              ? 'href=https://www.lemongym.lt/nestabdyk/#zaidimas'
              : this.prop === 'Ikea'
              ? 'href=https://www.ikea.lt/en/zaidimo-ar-gerai-vairuojate-taisykles'
              : this.prop === 'Makalius'
              ? 'href=https://www.makalius.lt/gimtadienio-zaidimo-taisykles/'
              : this.language === 'EE'
              ? 'href=https://docs.google.com/document/d/1OeMh9o3FeQMj00XRvsxlvwbUpaYuBgRsVLUZMCPWfdo/edit'
              : this.prop === 'Fantazijos'
              ? 'href=https://www.fantazijos.lt/zaidimo-taisykles'
              : this.prop === 'Fpro'
              ? 'href=https://fpro.com/'
              : this.prop === 'Corepetitus'
              ? 'href=https://www.corepetitus.lt/zaidimo-taisykles'
              : this.prop === 'Pieno Žvaigždės'
              ? 'href=https://www.boomio.com/pieno-zvaigzdes-miau-zaidimo-taisykles'
              : this.prop === 'Pegasas'
              ? 'href=https://www.pegasas.lt/c/pegaso-zaidimo-taisykles/'
              : this.prop === 'Akropolis' && this.language === 'LV'
              ? 'href=https://www.akropoleriga.lv/lv/jauns/spele-un-laime-kfc-balvas-katru-dienu-speles-noteikumi/41828'
              : this.prop === 'Akropolis'
              ? 'href=https://www.akropolis.lt/lt/akcija/zaisk-ir-laimek-kasdien/41169'
              : this.language === 'LV'
              ? 'href=https://docs.google.com/document/d/1QNzkm_j-Sn73LsykBYgFAfwg0Ij2TeM5/edit'
              : this.language === 'RU'
              ? 'href=https://docs.google.com/document/d/1PN05AH1AQUL6iiENuVVeVBJGip6Ia6w1/edit'
              : this.prop.includes('Gamtos Ateitis')
              ? 'href=https://gamtosateitis.lt/wp-content/uploads/2024/10/Zaidimo-taisykles.pdf'
              : ''
          } style="color:white;text-decoration: underline;font-size:12px;margin-top:6px;font-family:${
            this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
          };">${
            this.prop === 'Eurovaistine'
              ? 'Pilni spēles noteikumi šeit.'
              : this.language === 'LV' && this.prop === 'Akropolis'
              ? 'Pilnie spēles noteikumi.'
              : this.language === 'LV'
              ? 'Lasīt pilnus spēles noteikumus. '
              : this.language === 'RU'
              ? 'Читайте полные правила игры.'
              : this.language === 'EE'
              ? 'Loe kõik mängureeglid läbi.'
              : this.language === 'ES'
              ? 'Leer las reglas del juego.'
              : this.prop === 'Fpro'
              ? 'Read full games rules. '
              : this.prop === 'Ikea'
              ? 'Visos žaidimo taisyklės'
              : this.prop.includes('Gamtos Ateitis')
              ? 'Skaityk išsamias žaidimo taisykles.'
              : 'Skaityk pilnas žaidimo taisykles.'
          } </a></div>`
        : ''
    }
    <div style="align-self: stretch; text-align: center; color: white; font-size: 32px; font-family: Poppins; font-weight: 700; line-height: 21.60px; word-wrap: break-word;">  
      </div>
    </div>
    <div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 24px;display:flex; width:${
                document.body.offsetWidth < 426
                  ? document.body.offsetWidth < 321
                    ? '375px'
                    : document.body.offsetWidth + 'px'
                  : '426px'
              };" id="control-button" class="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height: 100%; padding-top: 12px; padding-bottom: 12px; background: white
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 24px; font-family:${
                this.prop === 'Ikea' ? 'Noto Sans' : 'Georama'
              }; font-weight: ${
      this.prop === 'Ikea' ? '400' : '700'
    }; line-height: 24px; word-wrap: break-word"> <div style="line-height:24px;text-align: center; color: ${'#3D4928'}; font-size: 24px;  line-height: 24px; word-wrap: break-word">${
      this.language === 'LV' && this.prop === 'Akropolis'
        ? 'PIEKRĪTU NOTEIKUMIEM'
        : this.language === 'LV'
        ? 'TĀLĀK'
        : this.language === 'RU'
        ? 'ДАЛЕЕ'
        : this.language === 'EE'
        ? 'EDASI'
        : this.language === 'ES'
        ? 'SIGUIENTE'
        : this.prop === 'Barbora' ||
          this.prop === 'Fantazijos' ||
          this.prop === 'LemonGym' ||
          this.prop === 'Corepetitus' ||
          this.prop === 'Pieno Žvaigždės' ||
          this.prop.includes('Gamtos Ateitis') ||
          this.prop === 'Makalius'
        ? 'PIRMYN'
        : this.prop === 'Fpro'
        ? 'PLAY'
        : this.prop === 'Eurovaistine'
        ? 'TĀLĀK'
        : this.prop === 'Akropolis'
        ? 'SUTINKU'
        : this.prop === 'Pegasas'
        ? 'PIRMYN'
        : 'LET’S PLAY'
    }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
