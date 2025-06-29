import './styles.css';
import { uncheckIcon } from './constants';
import { localStorageService } from '@/services';
export class InputRegisterContainer {
  constructor(prop) {
    this.prop = prop; // Store the this.prop in a class this.property
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'EN';
    this.teams = this.config.teams;
  }

  createInputRegisterContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.width =
      document.documentElement.clientWidth < 426
        ? document.documentElement.clientWidth < 321
          ? '375px'
          : document.documentElement.clientWidth + 'px'
        : '426px';
    let privacyCheckboxChecked = true;
    let privacyCheckboxChecked2 = true;
    this.teams = this.config.teams;

    containerDiv.innerHTML = `
      <div style="height: 124px; top:${
        this.prop === 'SaludSA' || this.prop === 'Pegasas'
          ? '0px'
          : this.language !== 'LT'
          ? '70px'
          : '90px'
      }; position: relative; text-align:${
      this.prop === 'Ikea' ? 'start' : 'center'
    } ;left:34px;margin-right:68px; color: ${'white'}; font-size: ${
      this.isMobile ? '26px' : '28px'
    }; font-family: ${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
    }; font-weight: 700; text-transform: ${
      this.prop === 'Ikea' ? 'none' : 'uppercase'
    }; line-height: 32px; word-wrap: break-word">${
      this.language === 'LV' && this.prop === 'Akropolis'
        ? 'REĢISTRĒJIES'
        : this.prop === 'LemonFeel'
        ? 'REĢISTRĒJIES, LAI KRĀTU PUNKTUS'
        : this.language === 'LV'
        ? 'REĢISTRĒJIES, LAI SPĒLĒTU'
        : this.language === 'RU'
        ? 'ЗАРЕГИСТРИРОВАТЬСЯ ДЛЯ ИГРЫ'
        : this.language === 'ET'
        ? 'REGISTREERI MÄNGIMISEKS'
        : this.prop === 'Fpro'
        ? 'REGISTER TO PLAY'
        : this.prop === 'Ikea'
        ? 'Registracija'
        : this.prop === 'Eurovaistine'
        ? 'REĢISTRĒJIES'
        : this.prop === 'SaludSA'
        ? 'REGÍSTRATE</br>PARA JUGAR'
        : this.language === 'EN'
        ? 'Register to Play'
        : this.language === 'ES'
        ? 'Registrarse para jugar'
        : 'Registruokis Žaisti'
    }</div>
          <div style="height: 124px; top:${'20px'}; position: relative; text-align:${
      this.prop === 'Ikea' ? 'start' : 'center'
    } ;left:34px;margin-right:68px; color: ${'white'}; font-size: ${'12px'}; font-family: ${'Georama'}; font-weight: 500;  line-height: 14px; word-wrap: break-word">${
      this.prop.includes('Gamtos Ateitis')
        ? 'Jau registravaisi? Naudok tą patį el. paštą ir mokyklą bei</br> toliau gerink rezultatą!'
        : this.language === 'EN'
        ? 'Already registered? Use the same email </br> and improve your result!'
        : this.language === 'ES'
        ? '¿Ya estás registrado? Usa el mismo correo electrónico y mejora tu resultado.'
        : this.prop === 'LemonFeel'
        ? 'Ievadi e-pastu, ko izmantoji, reģistrējoties LEMON FEEL </br> abonementam vai savam LEMON GYM profilam'
        : this.language === 'LV'
        ? ' Jau reģistrējies? Izmanto to pašu e-pastu  </br>un uzlabo savu rezultātu!'
        : this.language === 'RU'
        ? ' Уже зарегистрировался? Используй тот же  </br>email и улучшай результат!'
        : this.language === 'ES'
        ? 'Oled juba registreerunud? Kasuta sama e-posti </br> ja paranda oma tulemust!'
        : this.language === 'ET'
        ? 'Jau reģistrējies? Izmanto to pašu e-pasta adresi, </BR> lai turpinātu uzlabot savu rezultātu!'
        : this.language === 'PL'
        ? 'Już się zarejestrowałeś? Użyj tego samego nicku i e-maila </br>, by dalej poprawiać wynik!'
        : this.language === 'FI'
        ? ' Oletko jo rekisteröitynyt? Käytä samaa sähköpostia</br> ja paranna tulostasi!'
        : this.prop === 'Perlas GO'
        ? 'Jau registravaisi? Naudok tą patį el. paštą </br> toliau gerinant rezultatą!'
        : this.prop === 'Orlen'
        ? 'Jau registravaisi? Naudok tą patį telefono numerį </br> toliau gerinant rezultatą!'
        : this.language === 'EN'
        ? 'Already registered? Use the same nickname and email </br> to keep improving your score!'
        : 'Jau registravaisi? Naudok tą patį el. paštą </br> toliau gerinant rezultatą!'
    } 
    </div>
      <div id="boomio-competition-confirm-field" disabled=${
        privacyCheckboxChecked ? true : false
      } style="cursor:pointer;width: calc(100% - 54px); padding-top: 11px; padding-bottom: 11px; left: 27px; top: 455px; position: absolute; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center;font-family:${
          this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
        };   color: ${'#3D4928'} ; font-size: 24px;  font-weight: ${
      this.prop === 'Ikea' ? '400' : '700'
    }; line-height: 24px; word-wrap: break-word" >${
      this.language === 'LV'
        ? 'TĀLĀK'
        : this.language === 'RU'
        ? 'ДАЛЕЕ'
        : this.language === 'ET'
        ? 'EDASI'
        : this.language === 'ES' || this.language === 'ET'
        ? 'SIGUIENTE'
        : this.prop === 'Fpro'
        ? 'NEXT'
        : this.prop === 'SaludSA'
        ? 'SIGUIENTE'
        : this.prop === 'Ikea'
        ? 'Toliau'
        : this.prop === 'Eurovaistine'
        ? 'TĀLĀK'
        : this.language === 'EN'
        ? 'CONTINUE'
        : this.language === 'ES'
        ? 'CONTINUAR'
        : 'TOLIAU'
    }</div>
      </div>
       <div class="boomio-privacyCheckbox2" id="boomio-privacyCheckbox2" style=";cursor:${
         this.prop === 'Fpro' ? 'auto' : 'pointer'
       } ;left: 34px; top: ${
      this.prop === 'Zemaitijos Pienas' ? '360px' : '360px'
    }; position: absolute; justify-content: center; align-items: center; gap: 5px; display: ${
      this.prop === 'Makalius' ||
      this.prop === 'Pegasas' ||
      this.prop === 'Pieno Žvaigždės' ||
      this.prop === 'Eurovaistine' ||
      this.prop === 'Perlas GO' ||
      this.prop === 'Daumantu' ||
      this.prop === 'Dentsu' ||
      this.prop === 'Zemaitijos Pienas' ||
      this.prop === 'Orlen' ||
      this.prop === 'LemonGym' ||
      this.prop === 'LemonFeel' ||
      this.prop === 'Nevezis' ||
      this.prop === 'Magija' ||
      this.prop === 'Nykstukas' ||
      (this.prop === 'Akropolis' && this.language === 'LV')
        ? 'inline-flex'
        : 'none'
    }">
      <div  style=" cursor: ${this.prop === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg2" src="${
              privacyCheckboxChecked2 ? uncheckIcon : ''
            }" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${
      this.isMobile
        ? this.prop === 'Akropolis' && this.language === 'LV'
          ? '8px'
          : '10px'
        : this.prop === 'Pieno Žvaigždės' || this.prop === 'Pegasas'
        ? '12px'
        : this.prop === 'Akropolis' && this.language === 'LV'
        ? '10px'
        : '12px'
    }; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
    };font-weight: 400; word-wrap: break-word;text-align:start;">${
      this.prop === 'Ikea'
        ? 'Sutinku gauti IKEA naujienas.'
        : this.prop === 'Perlas GO'
        ? 'Sutinku gauti „Perlas Go“ naujienas el. paštu.'
        : this.prop === 'Eurovaistine'
        ? 'Piekrītu saņemt Euroaptieka informatīvos izdevumus.'
        : this.prop === 'Daumantu'
        ? 'Sutinku gauti „Daumantų“ naujienlaiškius.'
        : this.prop === 'Pieno Žvaigždės'
        ? 'Sutinku gauti „Pieno žvaigždės“ naujienlaiškius.'
        : this.prop === 'Pegasas'
        ? 'Sutinku gauti Pegaso naujienlaiškius.'
        : this.prop === 'Corepetitus'
        ? 'Sutinku gauti Corepetitus naujienlaiškius.'
        : this.language === 'LV' && this.prop === 'Akropolis'
        ? 'Piekrītu saņemt AKROPOLE iepirkšanās centru jaunumus e-pastā.'
        : this.language === 'LV' && (this.prop === 'LemonGym' || this.prop === 'LemonFeel')
        ? 'Piekrītu saņemt LEMON GYM jaunumu vēstuli.'
        : this.language === 'LV'
        ? 'Es piekrītu saņemt Unisend.lv jaunumus.'
        : this.prop === 'Dentsu'
        ? 'Sutinku gauti Dentsu ir Boomio naujienas.'
        : this.prop === 'Zemaitijos Pienas'
        ? 'Sutinku gauti „Žemaitijos pienas“ naujienlaiškius.'
        : this.prop === 'Nykstukas'
        ? 'Sutinku gauti „Pieno žvaigždės“ naujienlaiškius.'
        : this.prop === 'Nevezis'
        ? 'Sutinku gauti UAB ,,Naujasis Nevėžis“ naujienlaiškius.'
        : this.prop === 'Magija'
        ? 'Sutinku gauti „Žemaitijos pienas“ naujienlaiškius.'
        : this.prop === 'Orlen'
        ? 'Sutinku gauti „ORLEN“ naujienlaiškius.'
        : this.prop === 'Unisend' && this.language === 'LV'
        ? 'Nõustun saama Unisend.ee uudiskirju'
        : 'Sutinku gauti naujienlaiškius.'
    }
    </div>
      </div>
      
 <div class="boomio-privacyCheckbox3" id="boomio-privacyCheckbox3" style=";cursor:${
   this.prop === 'Fpro' ? 'auto' : 'pointer'
 } ;left: 34px; top: ${'375px'}; position: absolute; justify-content: center; align-items: center; gap: 5px; display: ${
      this.prop === 'Pegasas' ? 'inline-flex' : 'none'
    }">
      <div  style=" cursor: ${this.prop === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg3" src="${
              privacyCheckboxChecked2 ? uncheckIcon : ''
            }" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${'10px'}; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
    };font-weight: 400; word-wrap: break-word;text-align:start;">${
      this.prop === 'Pegasas' ? 'Sutinku gauti Pegaso naujienas SMS žinute.' : ''
    }
    </div>
      </div>

        <div class="boomio-privacyCheckbox" id="boomio-privacyCheckbox" style="cursor:${
          this.prop === 'Fpro' ? 'auto' : 'pointer'
        } ;left: 34px; top: ${
      this.prop === 'Akropolis'
        ? this.language === 'LV'
          ? '375px'
          : '362px'
        : this.prop === 'Vilvi'
        ? '360px'
        : this.prop === 'Dentsu'
        ? '375px'
        : '395px'
    }; position: absolute; justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      <div  style=" display: ${
        this.prop === 'Fpro' || this.prop === 'Fantazijos' ? 'none' : 'inline-flex'
      };cursor: ${this.prop === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg" src="${
              privacyCheckboxChecked ? uncheckIcon : ''
            }" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-heigt:6px;font-size: ${
      this.isMobile
        ? this.prop === 'Akropolis' && this.language === 'LV'
          ? '8px'
          : '10px'
        : this.prop === 'Eurovaistine'
        ? '12px'
        : this.prop === 'Akropolis' && this.language === 'LV'
        ? '10px'
        : '12px'
    }; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
    } ;  font-weight: 400; width:${
      this.prop?.includes('Gamtos Ateitis') ? '320px' : '350px'
    };word-wrap: break-word;line-height:14px;text-align:start;">${
      this.prop === 'Fpro'
        ? 'By continuing, I agree to receive FPRO newsletters.'
        : this.prop === 'Pieno Žvaigždės'
        ? 'Sutinku su „Pieno žvaigždės“'
        : this.prop === 'Pegasas'
        ? 'Sutinku su Pegaso'
        : this.prop === 'Barbora'
        ? 'Sutinku gauti Barboros naujienas.'
        : this.prop?.includes('Gamtos Ateitis')
        ? 'Sutinku su Gamintojų ir importuotojų asociacijos „Gamtos ateitis“'
        : this.prop === 'Unisend' && this.language === 'LV'
        ? `Esmu izlasījis <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://unisend.lv/spelesnoteikumi/'} style="color:white;text-decoration: underline;"> spēles noteikumus</a>  un piekrītu tiem.`
        : this.prop === 'Unisend' && this.language === 'ET'
        ? `Olen <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://unisend.ee/unisendi-mangureeglid/'} style="color:white;text-decoration: underline;"> mängureeglitega</a> tutvunud ja nõustun nendega.`
        : this.prop === 'Fantazijos' && this.language === 'LV'
        ? 'Turpinot spēlēt, es piekrītu saņemt yesyes.lv jaunumus.'
        : this.prop === 'Fantazijos' && this.language === 'RU'
        ? 'Продолжая играть, я соглашаюсь получать информационную рассылку yesyes.lv.'
        : this.prop === 'Fantazijos' && this.language === 'ET'
        ? 'Mängu jätkates nõustun yesyes.ee uudiskirja saamisega.'
        : this.prop === 'Fantazijos' && this.prop === 'Fantazijos'
        ? 'Sutinku gauti Fantazijos.lt naujienlaiškius.'
        : this.prop === 'Makalius'
        ? 'Sutinku gauti Makaliaus naujienlaiškius.'
        : this.prop === 'Ikea'
        ? 'Sutinku su'
        : this.prop === 'SaludSA'
        ? 'Acepto recibir boletines de SaludSA.'
        : this.prop === 'Eurovaistine'
        ? 'Piekrītu Euroaptiekas'
        : this.prop === 'Daumantu'
        ? 'Sutinku su „Daumantų“ privatumo politika.'
        : this.prop === 'Akropolis' && this.language === 'LV'
        ? `Piekrītu <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.akropoleriga.lv/lv/jauns/spele-un-laime-kfc-balvas-katru-dienu-speles-noteikumi/41828'} style="color:white;text-decoration: underline;"> spēles noteikumiem un privātuma politikai</a>. `
        : this.prop === 'Akropolis'
        ? 'Sutinku gauti PPC AKROPOLIS naujienas.'
        : this.prop === 'Perlas GO'
        ? `Sutinku su <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Basis Grotesque Pro; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.perlasgo.lt/akcijos-zaisk-ir-laimek-taisykles/'} style="color:white;text-decoration: underline;"> akcijos taisyklėmis</a> ir „Perlas Go“ <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Basis Grotesque Pro; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.perlasgo.lt/privatumo-politika/'} style="color:white;text-decoration: underline;">privatumo politika.</a> `
        : this.prop === 'Corepetitus'
        ? 'Sutinku su'
        : this.prop === 'Zemaitijos Pienas'
        ? 'Sutinku su „Žemaitijos pienas“'
        : this.prop === 'Vilvi'
        ? 'Sutinku gauti VILVI naujienas. <div style="font-size:8px;"> Jūsų sutikimu Jūsų el. pašto duomenis VILVI tvarkys laimėtojų nustatymo ir naujienlaiškių siuntimo tikslu. </div>'
        : this.prop === 'Dentsu'
        ? `Sutinku su <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.boomio.com/dentsu-game-rules'} style="color:white; text-decoration: underline;"> akcijos taisyklėmis </a>  ir Dentsu`
        : this.prop === 'Nykstukas'
        ? 'Sutinku su „Pieno žvaigždės“'
        : this.language === 'EN'
        ? 'I agree to receive '
        : this.language === 'ES'
        ? 'Acepto recibir'
        : this.language === 'LV' && (this.prop === 'LemonGym' || this.prop === 'LemonFeel')
        ? 'Piekrītu LEMON GYM'
        : this.language === 'LV'
        ? 'Es piekrītu'
        : this.language === 'ET'
        ? 'Ma olen nõus'
        : this.prop === 'Nevezis'
        ? 'Sutinku su UAB ,,Naujasis Nevėžis“'
        : this.prop === 'Magija'
        ? 'Sutinku su UAB ,,Naujasis Nevėžis“'
        : this.prop === 'Orlen'
        ? 'Sutinku su „ORLEN“'
        : `Sutinku  ${
            this.prop === 'LemonGym'
              ? 'gauti naujienas bei informaciją, laimėjimo atveju, dėl prizų atsiėmimo. '
              : ''
          } `
    }
    ${
      this.prop !== 'Barbora' &&
      this.prop !== 'Fpro' &&
      this.prop !== 'Fantazijos' &&
      this.prop !== 'Makalius' &&
      this.prop !== 'Unisend' &&
      this.prop !== 'Akropolis' &&
      this.prop !== 'SaludSA' &&
      this.prop !== 'Vilvi' &&
      this.prop !== 'Daumantu' &&
      this.prop !== 'Perlas GO'
        ? `<a onclick="event.stopPropagation();" target="_blank" href="${
            this.prop === 'Ikea'
              ? 'https://www.ikea.lt/lt/privacy-policy'
              : this.prop === 'Corepetitus'
              ? 'https://www.corepetitus.lt/privatumo-politika'
              : this.prop === 'Eurovaistine'
              ? 'https://www.e-euroaptieka.lv/privatuma-politika'
              : this.prop === 'Pieno Žvaigždės'
              ? 'https://pienozvaigzdes.lt/lt/content/18-privatumo-politika'
              : this.prop === 'Pegasas'
              ? 'https://www.pegasas.lt/c/privatumas-ir-slapuku-veikla/'
              : this.prop?.includes('Gamtos Ateitis')
              ? 'https://gamtosateitis.lt/privatumo-politika/'
              : this.prop === 'Dentsu'
              ? 'https://www.dentsu.com/our-policies/privacy-notices'
              : this.prop === 'Zemaitijos Pienas'
              ? 'https://www.zpienas.lt/privatumo-politika/'
              : this.prop === 'Nevezis'
              ? 'https://nevezis.lt/privatumo-politika/'
              : this.prop === 'Magija'
              ? 'https://www.zpienas.lt/privatumo-politika/'
              : this.prop === 'LemonGym' || this.prop === 'LemonFeel'
              ? 'https://www.lemongym.lv/en/privacy-policy/'
              : this.prop === 'Nykstukas'
              ? 'https://pienozvaigzdes.lt/lt/content/18-privatumo-politika'
              : this.prop === 'Orlen'
              ? 'https://www.orlen.lt/LT/Apie%20mus/Privatumo%20politika/Puslapiai/default.aspx'
              : ''
          }" style="color:white;text-decoration: underline; font-size: ${
            this.isMobile ? '10px' : this.prop === 'Eurovaistine' ? '12px' : '12px'
          }; ">${
            this.prop === 'Ikea'
              ? 'IKEA privatumo politika'
              : this.prop === 'Perlas GO'
              ? 'ir „Perlas Go“ privatumo politika'
              : this.prop === 'Eurovaistine'
              ? 'privātuma politikai'
              : this.prop === 'Corepetitus'
              ? 'Corepetitus privatumo politika'
              : this.language === 'LV' && (this.prop === 'LemonGym' || this.prop === 'LemonFeel')
              ? 'privātuma politikai'
              : this.language === 'EN'
              ? 'newsletters'
              : this.language === 'LV'
              ? 'privātuma politikai'
              : this.language === 'ES'
              ? 'boletines'
              : this.language === 'ET'
              ? 'privaatsuspoliitika'
              : 'privatumo politika'
          }.</a> `
        : ''
    }
    </div>
      </div>

      
        <div style="margin-right:20px;display:${
          this.prop === 'Akropolis' ? 'block' : 'none'
        } ;left: 34px; top:${
      this.prop === 'Akropolis' ? '383px' : '384px'
    }; position: absolute; justify-content: start;align-items: start; gap: 5px;font-size:9px;color:white;text-align:start;line-height:9px;">
        ${
          this.language === 'LV'
            ? ``
            : `Jūsų sutikimu Jūsų el. pašto duomenis AKROPOLIS GROUP, UAB tvarkys laimėtojų nustatymo ir naujienlaiškių siuntimo tikslu. Sutikimą galėsite bet kuriuo metu atšaukti, spaudžiant nuorodą gautame naujienlaiškyje arba kreipiantis privatumas@akropolis.lt. Plačiau <a onclick="event.stopPropagation();" target="_blank" ${'href=www.akropolis.lt'} style="text-decoration: underline;color:white;">www.akropolis.lt</a>..`
        } 

</div>
   
   
        <div id="competition-checkbox-error" style="padding-top:1px;height:${
          this.prop === 'Magija'
            ? 'auto'
            : this.language === 'LV' || this.prop === 'Perlas GO' || this.prop === 'Nevezis'
            ? '15px'
            : '28px'
        } ;margin-right:30px;display:${
      this.prop === 'Akropolis' ||
      this.prop === 'Eurovaistine' ||
      this.prop === 'Vilvi' ||
      this.prop === 'Perlas GO' ||
      this.prop === 'Magija' ||
      this.prop === 'Nevezis'
        ? 'block'
        : 'none'
    } ;left: 34px; top:${
      this.prop?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : '430px'
    }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${
      this.prop === 'Perlas GO' ? '10px' : this.isMobile ? '8px' : '9px'
    };color:${
      this.prop === 'Akropolis' && this.language === 'LV' ? '#FFD833' : 'rgb(216, 0, 12)'
    };text-align:start;line-height:8px;">
</div>

        <div id="competition-checkbox-error2" style="padding-top:1px;height:${
          this.language === 'LV' ? '14px' : '28px'
        } ;margin-right:30px;display:${
      this.prop === 'Akropolis' || this.prop === 'Eurovaistine' ? 'block' : 'none'
    } ;left: 34px; top:${
      this.prop?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : '420px'
    }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${
      this.isMobile ? '9px' : '10px'
    };color:${
      this.prop === 'Akropolis' && this.language === 'LV' ? '#FFD833' : '#D8000C'
    };text-align:start;line-height:8px;">
</div>

        <div id="competition-checkbox-error3" style="padding-top:1px;height:${
          this.language === 'LV' ? '14px' : '28px'
        } ;margin-right:30px;display:${
      this.prop === 'Akropolis' || this.prop === 'Eurovaistine' ? 'block' : 'none'
    } ;left: 34px; top:${
      this.prop?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : '420px'
    }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${
      this.isMobile ? '9px' : '10px'
    };color:${
      this.prop === 'Akropolis' && this.language === 'LV' ? '#FFD833' : '#D8000C'
    };text-align:start;line-height:8px;">
</div>




      <div style="display:${
        this.prop.includes('Gamtos Ateitis') ||
        this.prop === 'Perlas GO' ||
        this.prop === 'Nevezis' ||
        this.prop === 'Magija' ||
        this.prop === 'LemonGym' ||
        this.prop === 'Nykstukas' ||
        this.prop === 'Orlen' ||
        this.prop === 'LemonFeel' ||
        this.prop === 'Tiche' ||
        this.prop === 'Toni' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      }width: calc(100% - 70px); height: 21px; left: 35px; top: ${
      this.prop === 'SaludSA' || this.prop === 'Pegasas' ? '178px' : '258px'
    }; position: absolute;text-align:start;z-index:99999;color: ${
      this.prop === 'Akropolis' && this.language === 'LV' ? '#FFD833' : '#D8000C'
    };
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.42px;
      border-radius:4px;
      padding:1px 8px 1px 8px;
      " id="competition-name-error"></div>


      <div style="width: calc(100% - 70px); height: 21px; left: 35px; top: ${
        this.prop === 'SaludSA' || this.prop === 'Pegasas'
          ? '258px'
          : this.prop.includes('Gamtos Ateitis')
          ? '348px'
          : this.prop === 'Nykstukas'
          ? '430px'
          : '338px'
      } ; position: absolute;text-align:start;z-index:99999;color: ${
      this.prop === 'Akropolis' && this.language === 'LV' ? '#FFD833' : '#D8000C'
    };
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.42px;
      border-radius:4px;
      padding:1px 8px 1px 8px;
      " id="competition-email-error"> </div>


      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: ${
        this.prop === 'SaludSA' || this.prop === 'Pegasas'
          ? '207px'
          : this.prop.includes('Gamtos Ateitis')
          ? '180px'
          : this.prop === 'Perlas GO' ||
            this.prop === 'Nevezis' ||
            this.prop === 'Magija' ||
            this.prop === 'LemonGym' ||
            this.prop === 'Nykstukas' ||
            this.prop === 'Orlen' ||
            this.prop === 'LemonFeel' ||
            this.prop === 'Tiche' ||
            this.prop === 'Toni' ||
            this.language === 'EN'
          ? '240px'
          : '287px'
      }; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'}"></div>



      <div style="width: calc(100% - 54px); height: 45px; left: 28px;display:${
        this.prop.includes('Gamtos Ateitis') ||
        this.prop === 'Perlas GO' ||
        this.prop === 'Nevezis' ||
        this.prop === 'Magija' ||
        this.prop === 'LemonGym' ||
        this.prop === 'Orlen' ||
        this.prop === 'LemonFeel' ||
        this.prop === 'Tiche' ||
        this.prop === 'Toni' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      }; top: ${
      this.prop === 'SaludSA' || this.prop === 'Pegasas'
        ? '124px'
        : this.prop === 'Nykstukas'
        ? '304px'
        : '204px'
    }; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'}"></div>
      <input id="boomio-competition-email-input-field" class="boomio-competition-email-input-field" type="text" style="box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${
        this.prop === 'SaludSA' || this.prop === 'Pegasas'
          ? '219px'
          : this.prop.includes('Gamtos Ateitis')
          ? '189px'
          : this.prop === 'Perlas GO' ||
            this.prop === 'Nevezis' ||
            this.prop === 'Magija' ||
            this.prop === 'LemonGym' ||
            this.prop === 'Nykstukas' ||
            this.prop === 'Orlen' ||
            this.prop === 'LemonFeel' ||
            this.prop === 'Tiche' ||
            this.prop === 'Toni' ||
            this.language === 'EN'
          ? '249px'
          : '299px'
      };height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonGym' ||
      this.prop === 'Tiche' ||
      this.prop === 'Toni' ||
      this.prop === 'LemonFeel'
        ? 'rgba(61, 73, 40, 1)'
        : '#473F4E'
    } ; font-size: 18px; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
    }; font-weight: 500; line-height: 24px; word-wrap: break-word" placeholder="${
      this.language === 'LV'
        ? 'Spēlētāja e-pasts'
        : this.language === 'RU'
        ? 'Емейл игрока'
        : this.language === 'ET'
        ? 'Mängija e-post'
        : this.prop === 'Fpro'
        ? 'Email address'
        : this.prop === 'Ikea'
        ? 'El. pašto adresas'
        : this.prop === 'Eurovaistine'
        ? 'Spēlētāja e-pasts'
        : this.prop === 'SaludSA'
        ? 'Correo electrónico'
        : this.prop.includes('Gamtos Ateitis')
        ? 'El. pašto adresas'
        : this.language === 'EN'
        ? 'Email address'
        : this.language === 'ES'
        ? 'Dirección de correo electrónico'
        : this.prop === 'Orlen'
        ? 'Telefono numeris'
        : 'Elektroninio pašto adresas'
    }">
      <input id="boomio-competition-name-input-field" class="boomio-competition-name-input-field" type="text" style="display:${
        this.prop.includes('Gamtos Ateitis') ||
        this.prop === 'Perlas GO' ||
        this.prop === 'Nevezis' ||
        this.prop === 'Magija' ||
        this.prop === 'LemonGym' ||
        this.prop === 'Orlen' ||
        this.prop === 'LemonFeel' ||
        this.prop === 'Tiche' ||
        this.prop === 'Toni' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      };box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${
      this.prop === 'SaludSA' || this.prop === 'Pegasas'
        ? '135px'
        : this.prop === 'Nykstukas'
        ? '315px'
        : '215px'
    };height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop === 'LemonFeel' ||
      this.prop === 'Tiche' ||
      this.prop === 'Toni' ||
      this.prop === 'LemonGym'
        ? 'rgba(61, 73, 40, 1)'
        : '#473F4E'
    } ; font-size: 18px; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
    }; font-weight: 500; line-height: 24px; word-wrap: break-word" placeholder="${
      this.language === 'LV'
        ? 'Spēlētāja lietotājvārds'
        : this.language === 'RU'
        ? 'Псевдоним игрока'
        : this.language === 'ET'
        ? 'Mängija hüüdnimi'
        : this.prop === 'Fpro'
        ? 'Players full name'
        : this.prop === 'Ikea'
        ? 'Žaidėjo vardas'
        : this.prop === 'Eurovaistine'
        ? 'Spēlētāja lietotājvārds'
        : this.prop === 'SaludSA'
        ? 'Nombre de usuario'
        : this.language === 'EN'
        ? 'Player nickname'
        : this.prop === 'Nykstukas'
        ? 'Komandos pavadinimas'
        : 'Žaidėjo slapyvardis'
    }">
          <select id="city-select" class="boomio-competition-city-select" style="display:${
            this.prop.includes('Gamtos Ateitis') ? 'block' : 'none'
          };width:calc(100% - 54px); margin:10px; padding:8px; border:1px solid #ccc; border-radius:35px;left:28px;height:45px;position:absolute;top:240px;margin:0px;box-shadow:2px 4px 3px rgba(0, 0, 0, 0.25) inset;color:#473F4E;font-family:Georama;">
        <option value="">Miestas ar rajonas</option>
        ${Object.keys(this.teams)
          .map((city) => `<option value="${city}">${city}</option>`)
          .join('')}
      </select>
      <select id="school-select" class="boomio-competition-school-select" style="display:${
        this.prop.includes('Gamtos Ateitis') ? 'block' : 'none'
      };width:calc(100% - 54px); margin:10px; padding:8px; border:1px solid #ccc; border-radius:35px;left:28px;height:45px;position:absolute;top:300px;margin:0px;box-shadow:2px 4px 3px rgba(0, 0, 0, 0.25) inset;color:#473F4E;font-family:Georama;">
         <option value="">Pirmiau pasirink miestą ar rajoną</option>
      </select>
      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: ${'290px'}; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'};display:${
      this.prop === 'SaludSA' || this.prop === 'Pegasas' ? 'block' : 'none'
    }"></div>
          <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: ${'290px'}; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'};display:${
      this.prop === 'SaludSA' || this.prop === 'Pegasas' ? 'block' : 'none'
    }"></div>
    <input id="boomio-competition-phone-input-field" inputmode="tel" 
 class="boomio-competition-phone-input-field" type="text" style="box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${'300px'};height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${'#473F4E'} ; font-size: 18px; font-family:${'Georama'}; font-weight: 500; line-height: 24px; word-wrap: break-word;display:${
      this.prop === 'SaludSA' || this.prop === 'Pegasas' ? 'block' : 'none'
    }" placeholder="${this.prop === 'SaludSA' ? 'Número de teléfono' : 'Telefono numeris'}">

    `;

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      return null;
    }

    // Function to set the values in the input fields
    const setCredentialsToInputs = () => {
      const emailInput = document.querySelector('.boomio-competition-email-input-field');
      const playerNameInput = document.querySelector('.boomio-competition-name-input-field');

      const credentials = getCookie('boomio_game_credentials');

      if (credentials) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          if (parsedCredentials.email && emailInput) {
            emailInput.value = parsedCredentials.email;
          }
          if (this.prop !== 'Nykstukas' && parsedCredentials.name && playerNameInput) {
            playerNameInput.value = parsedCredentials.name;
          }
        } catch (e) {
          console.error('Error parsing boomio_game_credentials cookie:', e);
        }
      }
    };

    setTimeout(setCredentialsToInputs, 50);

    return containerDiv;
  }
}
