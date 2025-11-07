import './styles.css';
import { uncheckIcon, checkIcon } from './constants';
import { localStorageService } from '@/services';

const privacyPolicytranslations = {
  pigu: {
    EN: `I agree with <a href="https://pigu.lt/ru/t/politika-konfidentsialnosti-zao-pigu" target="_blank" rel="noopener noreferrer" style="color:white">Pigu.lt/220.lv/Kaup24.ee/Hobbyhall.fi</a> privacy policy.`,
    LT: `Sutinku su <a href="https://pigu.lt/lt/t/privatumo-politika" target="_blank" rel="noopener noreferrer" style="color:white">Pigu.lt</a> privatumo politika.`,
    RU: `Я согласен(на) с политикой конфиденциальности <a href="https://pigu.lt/ru/t/politika-konfidentsialnosti-zao-pigu" target="_blank" rel="noopener noreferrer" style="color:white">Pigu.lt</a>.`,
  },
  220: {
    LV: `Es piekrītu <a href="https://220.lv/lv/t/privatuma-politika" target="_blank" rel="noopener noreferrer" style="color:white">220.lv</a> privātuma politikai.`,
    RU: `Я согласен(на) с политикой конфиденциальности <a href="https://220.lv/ru/t/politika-konfidencialnosti" target="_blank" rel="noopener noreferrer" style="color:white">220.lv</a>.`,
  },
  kaup24: {
    ET: `Nõustun <a href="https://kaup24.ee/et/t/privaatsuspoliitika" target="_blank" rel="noopener noreferrer" style="color:white">Kaup24.ee</a> privaatsuspoliitikaga.`,
    RU: `Я согласен(на) с политикой конфиденциальности <a href="https://kaup24.ee/ru/t/konfidencialnos" target="_blank" rel="noopener noreferrer" style="color:white">Kaup24.ee</a>.`,
  },
  hobbyhall: {
    EN: `I agree with <a href="https://hobbyhall.fi/fi/t/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:white">Hobbyhall.fi</a> privacy policy.`,
    FI: `Hyväksyn yrityksen <a href="https://hobbyhall.fi/fi/t/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:white">tietosuojakäytännön</a>.`,
  },
};

export class InputRegisterContainer {
  constructor() {
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name;
    this.language = this.config.language;
    this.teams = this.config.teams;
  }

  createInputRegisterContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.width = document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px';
    let privacyCheckboxChecked = false;
    let privacyCheckboxChecked2 = false;
    this.teams = this.customer === 'Akropolis' ? ['Vilnius', 'Klaipėda', 'Šiauliai', 'Kaunas'] : this.config.teams;

    const options = Array.isArray(this.teams) ? this.teams : Object.keys(this.teams);

    containerDiv.innerHTML = `
      <div style="height: ${this.customer === 'Toni' ? '0px' : '124px'}; top:${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? '0px' : this.language !== 'LT' ? '70px' : '90px'
      }; position: relative; text-align:${this.customer === 'Ikea' ? 'start' : 'center'} ;left:34px;margin-right:68px; color: ${'white'}; font-size: ${this.isMobile ? '24px' : '26px'}; font-family: ${
        this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
      }; font-weight: 700; text-transform: ${this.customer === 'Ikea' ? 'none' : 'uppercase'}; line-height: 32px; word-wrap: break-word">${
        this.language === 'LV' && this.customer === 'Akropolis'
          ? 'REĢISTRĒJIES'
          : this.customer === 'LemonFeel'
            ? 'REĢISTRĒJIES, LAI KRĀTU PUNKTUS'
            : this.language === 'LV'
              ? 'REĢISTRĒJIES SPĒLEI'
              : this.language === 'RU'
                ? 'ЗАРЕГИСТРИРОВАТЬСЯ ДЛЯ ИГРЫ'
                : this.language === 'ET'
                  ? 'REGISTREERI MÄNGU'
                  : this.customer === 'Fpro'
                    ? 'REGISTER TO PLAY'
                    : this.customer === 'Ikea'
                      ? 'Registracija'
                      : this.customer === 'Eurovaistine'
                        ? 'REĢISTRĒJIES'
                        : this.customer === 'SaludSA'
                          ? 'REGÍSTRATE</br>PARA JUGAR'
                          : this.customer === 'Apranga'
                            ? 'REGISTRUOKITĖS ŽAISTI'
                            : this.language === 'EN'
                              ? 'Register to Play'
                              : this.language === 'ES'
                                ? '¡Regístrate para jugar!'
                                : this.language === 'FI'
                                  ? 'REKISTERÖIDY PELAAMAAN'
                                  : 'Registruokis Žaisti'
      }</div>
          <div style="height: 124px; top:${this.customer === 'Toni' ? '60px' : '20px'}; position: relative; text-align:${
            this.customer === 'Ikea' ? 'start' : 'center'
          } ;left:34px;margin-right:68px; color: ${'white'}; font-size: ${'14px'}; font-family: ${'Georama'}; font-weight: 500;  line-height: 14px; word-wrap: break-word">${
            this.customer.includes('Gamtos Ateitis')
              ? 'Jau registravaisi? Naudok tą patį el. paštą ir mokyklą bei</br> toliau gerink rezultatą!'
              : this.language === 'EN'
                ? 'Already registered? Use the same email </br> and improve your result!'
                : this.language === 'ES'
                  ? '¿Ya te registraste? Usa la misma información para mejorar tus resultados.'
                  : this.customer === 'LemonFeel'
                    ? 'Ievadi e-pastu, ko izmantoji, reģistrējoties LEMON FEEL </br> abonementam vai savam LEMON GYM profilam'
                    : this.language === 'LV'
                      ? ' Jau reģistrējies? Izmanto to pašu e-pastu  </br>un uzlabo savu rezultātu!'
                      : this.language === 'RU'
                        ? ' Уже зарегистрировался? Используй тот же  </br>email и улучшай результат!'
                        : this.language === 'ET'
                          ? 'Juba registreerunud? Kasuta sama e-posti aadressi </br> ja paranda oma tulemust!'
                          : this.language === 'PL'
                            ? 'Już się zarejestrowałeś? Użyj tego samego nicku i e-maila </br>, by dalej poprawiać wynik!'
                            : this.language === 'FI'
                              ? ' Oletko jo rekisteröitynyt? Käytä samaa sähköpostia</br> ja paranna tulostasi!'
                              : this.customer === 'Perlas GO'
                                ? 'Jau registravaisi? Naudok tą patį el. paštą </br> toliau gerinant rezultatą!'
                                : this.customer === 'Orlen'
                                  ? 'Jau registravaisi? Naudok tą patį telefono numerį </br> toliau gerinant rezultatą!'
                                  : 'Jau registravaisi? Naudok tą patį el. paštą </br> toliau gerinant rezultatą!'
          } 
    </div>
      <div id="boomio-competition-confirm-field" style="cursor:pointer;width: calc(100% - 54px); padding-top: 11px; padding-bottom: 11px; left: 27px; top: 455px; position: absolute; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center;font-family:${this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'};   color: ${
          this.customer === 'Toni' ? '#10069F' : 'rgba(61, 73, 40, 1)'
        } ; font-size: 24px;  font-weight: ${this.customer === 'Ikea' ? '400' : '700'}; line-height: 24px; word-wrap: break-word" >${
          this.language === 'LV'
            ? 'TĀLĀK'
            : this.language === 'RU'
              ? 'ДАЛЕЕ'
              : this.language === 'ET'
                ? 'EDASI'
                : this.language === 'ES'
                  ? 'SIGUIENTE'
                  : this.customer === 'Fpro'
                    ? 'NEXT'
                    : this.customer === 'SaludSA'
                      ? 'SIGUIENTE'
                      : this.customer === 'Ikea'
                        ? 'Toliau'
                        : this.customer === 'Eurovaistine'
                          ? 'TĀLĀK'
                          : this.language === 'EN'
                            ? 'CONTINUE'
                            : this.language === 'FI'
                              ? 'SEURAAVA'
                              : 'TOLIAU'
        }</div>
      </div>
       <div id="boomio-privacyCheckbox2" class="boomio-privacyCheckbox2" style=";cursor:${this.customer === 'Fpro' ? 'auto' : 'pointer'} ;left: 34px; top: ${
         this.customer === 'Zemaitijos Pienas' ? '360px' : '360px'
       }; position: absolute; justify-content: center; align-items: center; gap: 5px; display: ${
         this.customer === 'Makalius' ||
         this.customer === 'Pegasas' ||
         this.customer === 'Pieno Žvaigždės' ||
         this.customer === 'Eurovaistine' ||
         this.customer === 'Perlas GO' ||
         this.customer === 'Daumantu' ||
         this.customer === 'Dentsu' ||
         this.customer === 'Zemaitijos Pienas' ||
         this.customer === 'Orlen' ||
         this.customer === 'LemonGym' ||
         this.customer === 'LemonFeel' ||
         this.customer === 'Magija' ||
         this.customer === 'Pigu.lt' ||
         this.customer === 'Nykstukas' ||
         this.customer === 'Novaturas' ||
         this.customer === 'Apranga' ||
         this.customer === 'Toni' ||
         (this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU'))
           ? 'inline-flex'
           : 'none'
       }">
      <div  style=" cursor: ${this.customer === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg2" src="${privacyCheckboxChecked2 ? checkIcon : uncheckIcon}" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${
          this.isMobile
            ? this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU')
              ? '8px'
              : '10px'
            : this.customer === 'Pieno Žvaigždės' || this.customer === 'Pegasas'
              ? '12px'
              : this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU')
                ? '10px'
                : '12px'
        }; font-family:${this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'};font-weight: 400;  line-height: 14px; word-wrap: break-word;text-align:start;">${
          this.customer === 'Novaturas' && this.language === 'LT'
            ? 'Norint tęsti privaloma sutikti gauti įmonės naujienlaiškius.'
            : this.customer === 'Novaturas' && this.language === 'LV'
              ? 'Lai turpinātu, ir jāpiekrīt saņemt uzņēmuma jaunumu izsūtnes.'
              : this.customer === 'Novaturas' && this.language === 'ET'
                ? 'Jätkamiseks nõustu saama Novatoursi uudiskirju.'
                : this.customer === 'Novaturas' && this.language === 'EN'
                  ? 'To continue, you must agree to receive the companys newsletters.'
                  : this.customer === 'Novaturas' && this.language === 'RU'
                    ? 'Чтобы продолжить, необходимо согласиться на получение новостной рассылки компании.'
                    : this.customer === 'Ikea'
                      ? 'Sutinku gauti IKEA naujienas.'
                      : this.customer === 'Perlas GO'
                        ? 'Sutinku gauti „Perlas Go“ naujienas el. paštu.'
                        : this.customer === 'Eurovaistine'
                          ? 'Piekrītu saņemt Euroaptieka informatīvos izdevumus.'
                          : this.customer === 'Daumantu'
                            ? 'Sutinku gauti „Daumantų“ naujienlaiškius.'
                            : this.customer === 'Pieno Žvaigždės'
                              ? 'Sutinku gauti „Pieno žvaigždės“ naujienlaiškius.'
                              : this.customer === 'Pegasas'
                                ? 'Sutinku gauti Pegaso naujienlaiškius.'
                                : this.customer === 'Corepetitus'
                                  ? 'Sutinku gauti Corepetitus naujienlaiškius.'
                                  : this.customer === 'Akropolis' && this.language === 'LV'
                                    ? 'Piekrītu saņemt AKROPOLE iepirkšanās centru jaunumus e-pastā.'
                                    : this.customer === 'Akropolis' && this.language === 'RU'
                                      ? 'Я согласен получать новости торгового центра AKROPOLE по электронной почте.'
                                      : this.language === 'LV' && (this.customer === 'LemonGym' || this.customer === 'LemonFeel')
                                        ? 'Piekrītu saņemt LEMON GYM jaunumu vēstuli.'
                                        : this.customer === 'Dentsu'
                                          ? 'Sutinku gauti Dentsu ir Boomio naujienas.'
                                          : this.customer === 'Zemaitijos Pienas' && this.language === 'LT'
                                            ? 'Sutinku gauti „Žemaitijos pienas“ naujienlaiškius.'
                                            : this.customer === 'Zemaitijos Pienas' && this.language === 'LV'
                                              ? 'Piekrītu saņemt jaunumus no „Žemaitijos pienam“.'
                                              : this.customer === 'Zemaitijos Pienas' && this.language === 'ET'
                                                ? 'Nõustun saama „Žemaitijos pienas“ uudiskirju.'
                                                : this.customer === 'Nykstukas'
                                                  ? 'Sutinku gauti „Pieno žvaigždės“ naujienlaiškius.'
                                                  : this.customer === 'Nevezis'
                                                    ? 'Sutinku gauti OHO GROUP UAB naujienlaiškius.'
                                                    : this.customer === 'Toni'
                                                      ? 'Confirmo que soy mayor de 13 años.'
                                                      : this.customer === 'Magija'
                                                        ? 'Sutinku gauti „Žemaitijos pienas“ naujienlaiškius.'
                                                        : this.customer === 'Orlen'
                                                          ? 'Sutinku gauti „ORLEN“ naujienlaiškius.'
                                                          : this.customer === 'Pigu.lt' && this.language === 'RU'
                                                            ? 'Я прочитал(а) и согласен(на) с правилами и инструкциями игры.'
                                                            : this.customer === 'Pigu.lt' && this.language === 'FI'
                                                              ? 'Olen lukenut ja hyväksyn pelin säännöt ja ohjeet.'
                                                              : this.customer === 'Pigu.lt' && this.language === 'LV'
                                                                ? 'Esmu izlasījis un piekrītu spēles noteikumiem un instrukcijām.'
                                                                : this.customer === 'Pigu.lt' && this.language === 'LT'
                                                                  ? 'Perskaičiau ir sutinku su žaidimo taisyklėmis bei instrukcijomis.'
                                                                  : this.customer === 'Pigu.lt' && this.language === 'EN'
                                                                    ? 'I have read and agree with game rules and instructions.'
                                                                    : this.customer === 'Pigu.lt' && this.language === 'ET'
                                                                      ? 'Olen tutvunud ja nõustun mängureeglite ning juhistega.'
                                                                      : this.customer === 'Apranga'
                                                                        ? 'Sutinku su <a href="https://soulz.lt/lt/page/zaidimotaisykles" target="_blank" rel="noopener noreferrer" style="color:white">Žaidimo taisyklėmis.</a>'
                                                                        : 'Sutinku gauti naujienlaiškius.'
        }</div>
      </div>
      
 <div id="boomio-privacyCheckbox3" class="boomio-privacyCheckbox3" style=";cursor:${
   this.customer === 'Fpro' ? 'auto' : 'pointer'
 } ;left: 34px; top: ${'375px'}; position: absolute; justify-content: center; align-items: center; gap: 5px; display: ${this.customer === 'Pegasas' ? 'inline-flex' : 'none'}">
      <div  style=" cursor: ${this.customer === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg3" src="${privacyCheckboxChecked2 ? checkIcon : uncheckIcon}" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${'10px'}; font-family:${
          this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
        };font-weight: 400; word-wrap: break-word;text-align:start;">${this.customer === 'Pegasas' ? 'Sutinku gauti Pegaso naujienas SMS žinute.' : ''}
    </div>
      </div>

        <div id="boomio-privacyCheckbox" class="boomio-privacyCheckbox" style="cursor:${this.customer === 'Fpro' ? 'auto' : 'pointer'} ;left: 34px; top: ${
          this.customer === 'Akropolis' ? (this.language === 'LV' || this.language === 'RU' ? '395px' : '362px') : this.customer === 'Vilvi' ? '360px' : this.customer === 'Dentsu' ? '375px' : '395px'
        }; position: absolute; justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      <div  style=" display: ${this.customer === 'Fpro' || this.customer === 'Fantazijos' ? 'none' : 'inline-flex'};cursor: ${this.customer === 'Fpro' ? 'auto' : 'pointer'};">
            <img id="privacyCheckboxImg" src="${privacyCheckboxChecked ? checkIcon : uncheckIcon}" style="width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-height:6px;font-size: ${
          this.isMobile
            ? this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU')
              ? '8px'
              : '10px'
            : this.customer === 'Eurovaistine'
              ? '12px'
              : this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU')
                ? '10px'
                : '12px'
        }; font-family:${this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'} ;  font-weight: 400; width:${
          this.customer?.includes('Gamtos Ateitis') ? '320px' : '350px'
        };word-wrap: break-word;line-height:14px;text-align:start;">${
          this.customer === 'Novaturas' && this.language === 'LT'
            ? 'Norint tęsti privaloma sutikti su įmonės  <a href="https://www.novaturas.lt/privatumo-politika" target="_blank" rel="noopener noreferrer">privatumo politika</a>.'
            : this.customer === 'Novaturas' && this.language === 'LV'
              ? 'Lai turpinātu, ir jāpiekrīt uzņēmuma <a href="https://www.novatours.lv/privatuma-politika" target="_blank" rel="noopener noreferrer">privātuma politikai</a>.'
              : this.customer === 'Novaturas' && this.language === 'ET'
                ? 'Jätkamiseks nõustu ettevõtte <a href="https://www.novatours.ee/privaatsusteave" target="_blank" rel="noopener noreferrer">privaatsuspoliitikaga</a>.'
                : this.customer === 'Novaturas' && this.language === 'EN'
                  ? 'To continue, you must agree to the companys   <a href="https://www.novaturas.lt/privatumo-politika" target="_blank" rel="noopener noreferrer">privacy policy</a>.'
                  : this.customer === 'Novaturas' && this.language === 'RU'
                    ? 'Чтобы продолжить, необходимо согласиться с политикой <a href="https://www.novaturas.lt/privatumo-politika" target="_blank" rel="noopener noreferrer">конфиденциальности компании</a>.'
                    : this.customer === 'Fpro'
                      ? 'By continuing, I agree to receive FPRO newsletters.'
                      : this.customer === 'Pieno Žvaigždės'
                        ? 'Sutinku su „Pieno žvaigždės“'
                        : this.customer === 'Pegasas'
                          ? 'Sutinku su Pegaso'
                          : this.customer === 'Barbora'
                            ? 'Sutinku gauti Barboros naujienas.'
                            : this.customer?.includes('Gamtos Ateitis')
                              ? 'Sutinku su Gamintojų ir importuotojų asociacijos „Gamtos ateitis“'
                              : this.customer === 'Unisend' && this.language === 'LV'
                                ? `Esmu izlasījis <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://unisend.lv/spelesnoteikumi/'} style="color:white;text-decoration: underline;"> spēles noteikumus</a>  un piekrītu tiem.`
                                : this.customer === 'Unisend' && this.language === 'ET'
                                  ? `Olen <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://unisend.ee/unisendi-mangureeglid/'} style="color:white;text-decoration: underline;"> mängureeglitega</a> tutvunud ja nõustun nendega.`
                                  : this.customer === 'Fantazijos' && this.language === 'LV'
                                    ? 'Turpinot spēlēt, es piekrītu saņemt yesyes.lv jaunumus.'
                                    : this.customer === 'Fantazijos' && this.language === 'RU'
                                      ? 'Продолжая играть, я соглашаюсь получать информационную рассылку yesyes.lv.'
                                      : this.customer === 'Fantazijos' && this.language === 'ET'
                                        ? 'Mängu jätkates nõustun yesyes.ee uudiskirja saamisega.'
                                        : this.customer === 'Fantazijos'
                                          ? 'Sutinku gauti Fantazijos.lt naujienlaiškius.'
                                          : this.customer === 'Makalius'
                                            ? 'Sutinku gauti Makaliaus naujienlaiškius.'
                                            : this.customer === 'Ikea'
                                              ? 'Sutinku su'
                                              : this.customer === 'SaludSA'
                                                ? 'Acepto recibir boletines de SaludSA.'
                                                : this.customer === 'Eurovaistine'
                                                  ? 'Piekrītu Euroaptiekas'
                                                  : this.customer === 'Daumantu'
                                                    ? 'Sutinku su „Daumantų“ privatumo politika.'
                                                    : this.customer === 'Akropolis' && this.language === 'LV'
                                                      ? 'Lai turpinātu, ir jāpiekrīt <a onclick="event.stopPropagation();" target="_blank" href="https://www.akropoleriga.lv/lv/jauns/speles-spele-un-laime-katru-dienu-noteikumi/46463" style="color: white;">spēles</a> noteikumiem un <a onclick="event.stopPropagation();" target="_blank" href="https://www.akropoleriga.lv/lv/privatuma-politika?cid=7" style="color: white;">privātuma politikai</a>. Piekrītot spēles noteikumiem, apliecinu, ka esmu sasniedzis vismaz 13 gadu vecumu.'
                                                      : this.customer === 'Akropolis' && this.language === 'RU'
                                                        ? 'Чтобы продолжить, вы должны согласиться с <a onclick="event.stopPropagation();" target="_blank" href="https://www.akropoleriga.lv/lv/jauns/speles-spele-un-laime-katru-dienu-noteikumi/46463" style="color: white;">правилами игры</a> и <a onclick="event.stopPropagation();" target="_blank" href="https://www.akropoleriga.lv/lv/privatuma-politika?cid=7" style="color: white;">политикой конфиденциальности</a>. Согласившись с правилами игры, я подтверждаю, что мне исполнилось как минимум 13 лет.'
                                                        : this.customer === 'Akropolis' && this.language === 'LT'
                                                          ? 'Sutinku gauti PPC AKROPOLIS naujienas.'
                                                          : this.customer === 'Perlas GO'
                                                            ? `Sutinku su <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Basis Grotesque Pro; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.perlasgo.lt/akcijos-zaisk-ir-laimek-taisykles/'} style="color:white;text-decoration: underline;"> akcijos taisyklėmis</a> ir „Perlas Go“ <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Basis Grotesque Pro; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.perlasgo.lt/privatumo-politika/'} style="color:white;text-decoration: underline;">privatumo politika.</a> `
                                                            : this.customer === 'Corepetitus'
                                                              ? 'Sutinku su'
                                                              : this.customer === 'Zemaitijos Pienas' && this.language === 'LT'
                                                                ? 'Sutinku su „Žemaitijos pienas“'
                                                                : this.customer === 'Zemaitijos Pienas' && this.language === 'LV'
                                                                  ? 'Piekrītu „Žemaitijos pienam“'
                                                                  : this.customer === 'Zemaitijos Pienas' && this.language === 'ET'
                                                                    ? 'Nõustun saama „Žemaitijos pienas“ uudiskirju.'
                                                                    : this.customer === 'Vilvi'
                                                                      ? 'Sutinku gauti VILVI naujienas. <div style="font-size:8px;"> Jūsų sutikimu Jūsų el. pašto duomenis VILVI tvarkys laimėtojų nustatymo ir naujienlaiškių siuntimo tikslu. </div>'
                                                                      : this.customer === 'Dentsu'
                                                                        ? `Sutinku su <a style="align-self: stretch; text-align: center; color: white; font-size: 10px; font-family:Georama; font-weight: 600; line-height: 21.60px; word-wrap: break-word;"><a onclick="event.stopPropagation();" target="_blank" ${'href=https://www.boomio.com/dentsu-game-rules'} style="color:white; text-decoration: underline;"> akcijos taisyklėmis </a>  ir Dentsu`
                                                                        : this.customer === 'Nykstukas'
                                                                          ? 'Sutinku su „Pieno žvaigždės“'
                                                                          : this.customer === 'Toni'
                                                                            ? 'Acepto los términos y condicines de la actividad. Acepto recibir comunicaciones de marketing por parte de Tonicorp sobre productos, servicios y promociones.'
                                                                            : this.language === 'LV' && (this.customer === 'LemonGym' || this.customer === 'LemonFeel')
                                                                              ? 'Piekrītu LEMON GYM'
                                                                              : this.customer === 'Nevezis'
                                                                                ? 'Sutinku su OHO GROUP UAB'
                                                                                : this.customer === 'Orlen'
                                                                                  ? 'Sutinku su „ORLEN“'
                                                                                  : this.customer === 'Apranga'
                                                                                    ? 'Sutinku, kad mano asmens duomenys būtų tvarkomi tiesioginės rinkodaros tikslu <a href="https://soulz.lt/lt/page/privatumo-pranesimas-2025-new" target="_blank" rel="noopener noreferrer" style="color:white">Privatumo pranešime</a> nustatyta tvarka.'
                                                                                    : this.config.campaignUrlOrCurrentPage.includes('pigu')
                                                                                      ? privacyPolicytranslations['pigu'][this.language] || privacyPolicytranslations['pigu']['LT']
                                                                                      : this.config.campaignUrlOrCurrentPage.includes('220')
                                                                                        ? privacyPolicytranslations['220'][this.language] || privacyPolicytranslations['220']['LV']
                                                                                        : this.config.campaignUrlOrCurrentPage.includes('kaup24')
                                                                                          ? privacyPolicytranslations['kaup24'][this.language] || privacyPolicytranslations['kaup24']['ET']
                                                                                          : this.config.campaignUrlOrCurrentPage.includes('hobbyhall')
                                                                                            ? privacyPolicytranslations['hobbyhall'][this.language] || privacyPolicytranslations['hobbyhall']['FI']
                                                                                            : this.language === 'EN'
                                                                                              ? 'I agree to receive '
                                                                                              : this.language === 'LV'
                                                                                                ? 'Es piekrītu'
                                                                                                : this.language === 'ET'
                                                                                                  ? 'Ma olen nõus'
                                                                                                  : `Sutinku  ${
                                                                                                      this.customer === 'LemonGym'
                                                                                                        ? 'gauti naujienas bei informaciją, laimėjimo atveju, dėl prizų atsiėmimo. '
                                                                                                        : ''
                                                                                                    } `
        }
    ${
      this.customer !== 'Barbora' &&
      this.customer !== 'Fpro' &&
      this.customer !== 'Fantazijos' &&
      this.customer !== 'Makalius' &&
      this.customer !== 'Unisend' &&
      this.customer !== 'Akropolis' &&
      this.customer !== 'SaludSA' &&
      this.customer !== 'Vilvi' &&
      this.customer !== 'Daumantu' &&
      this.customer !== 'Toni' &&
      this.customer !== 'Pigu.lt' &&
      this.customer !== 'Novaturas' &&
      this.customer !== 'Perlas GO' &&
      this.customer !== 'Apranga'
        ? `<a onclick="event.stopPropagation();" target="_blank" href="${
            this.customer === 'Ikea'
              ? 'https://www.ikea.lt/lt/privacy-policy'
              : this.customer === 'Corepetitus'
                ? 'https://www.corepetitus.lt/privatumo-politika'
                : this.customer === 'Eurovaistine'
                  ? 'https://www.e-euroaptieka.lv/privatuma-politika'
                  : this.customer === 'Pieno Žvaigždės'
                    ? 'https://pienozvaigzdes.lt/lt/content/18-privatumo-politika'
                    : this.customer === 'Pegasas'
                      ? 'https://www.pegasas.lt/c/privatumas-ir-slapuku-veikla/'
                      : this.customer?.includes('Gamtos Ateitis')
                        ? 'https://gamtosateitis.lt/privatumo-politika/'
                        : this.customer === 'Dentsu'
                          ? 'https://www.dentsu.com/our-policies/privacy-notices'
                          : this.customer === 'Zemaitijos Pienas'
                            ? 'https://www.zpienas.lt/privatumo-politika/'
                            : this.customer === 'Nevezis'
                              ? 'https://nevezis.lt/privatumo-politika/'
                              : this.customer === 'Magija'
                                ? 'https://www.zpienas.lt/privatumo-politika/'
                                : this.customer === 'LemonGym' || this.customer === 'LemonFeel'
                                  ? 'https://www.lemongym.lv/en/privacy-policy/'
                                  : this.customer === 'Nykstukas'
                                    ? 'https://pienozvaigzdes.lt/lt/content/18-privatumo-politika'
                                    : this.customer === 'Orlen'
                                      ? 'https://www.orlen.lt/LT/Apie%20mus/Privatumo%20politika/Puslapiai/default.aspx'
                                      : this.customer === 'Novaturas' && this.language === 'LT'
                                        ? 'https://www.novaturas.lt/privatumo-politika'
                                        : this.customer === 'Novaturas' && this.language === 'LV'
                                          ? 'https://www.novatours.lv/privatuma-politika'
                                          : this.customer === 'Novaturas' && this.language === 'ET'
                                            ? 'https://www.novatours.ee/privaatsusteave'
                                            : ''
          }" style="color:white;text-decoration: underline; font-size: ${this.isMobile ? '10px' : this.customer === 'Eurovaistine' ? '12px' : '12px'}; ">${
            this.customer === 'Ikea'
              ? 'IKEA privatumo politika.'
              : this.customer === 'Perlas GO'
                ? 'ir „Perlas Go“ privatumo politika.'
                : this.customer === 'Eurovaistine'
                  ? 'privātuma politikai.'
                  : this.customer === 'Corepetitus'
                    ? 'Corepetitus privatumo politika.'
                    : this.language === 'LV' && (this.customer === 'LemonGym' || this.customer === 'LemonFeel')
                      ? 'privātuma politikai.'
                      : this.language === 'EN'
                        ? 'newsletters.'
                        : this.language === 'LV'
                          ? 'privātuma politikai.'
                          : this.language === 'ES'
                            ? ''
                            : this.language === 'ET'
                              ? 'privaatsuspoliitika.'
                              : 'privatumo politika.'
          }</a> `
        : ''
    }
    </div>
      </div>

      
        <div style="margin-right:20px;display:${this.customer === 'Akropolis' && this.language === 'LT' ? 'block' : 'none'} ;left: 34px; top:${
          this.customer === 'Akropolis' ? '383px' : '384px'
        }; position: absolute; justify-content: start;align-items: start; gap: 5px;font-size:9px;color:white;text-align:start;line-height:9px;">
        ${`Jūsų sutikimu Jūsų el. pašto duomenis AKROPOLIS GROUP, UAB tvarkys laimėtojų nustatymo ir naujienlaiškių siuntimo tikslu. Sutikimą galėsite bet kuriuo metu atšaukti, spaudžiant nuorodą gautame naujienlaiškyje arba kreipiantis privatumas@akropolis.lt. Plačiau <a onclick="event.stopPropagation();" target="_blank" ${'href=www.akropolis.lt'} style="text-decoration: underline;color:white;">www.akropolis.lt</a>.`} 

</div>
   
   
        <div id="competition-checkbox-error" style="width: fit-content;height:auto;padding-top:1px;margin-right:30px;display:none;left: 34px; top:${
          this.customer?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : this.language === 'ES' ? '436px' : '430px'
        }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${this.customer === 'Perlas GO' ? '10px' : this.isMobile ? '8px' : '9px'};color:${'#D8000C'};text-align:start;line-height:8px;">
        </div>

        <div id="competition-checkbox-error2" style="padding-top:1px;height:${this.language === 'LV' ? '14px' : '28px'} ;margin-right:30px;display:${
          this.customer === 'Akropolis' || this.customer === 'Eurovaistine' ? 'block' : 'none'
        } ;left: 34px; top:${
          this.customer?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : this.customer === 'Toni' ? '436px' : '430px'
        }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${this.isMobile ? '8px' : '9px'};color:${'#D8000C'};text-align:start;line-height:8px;">
</div>

        <div id="competition-checkbox-error3" style="padding-top:1px;height:${this.language === 'LV' ? '14px' : '28px'} ;margin-right:30px;display:${
          this.customer === 'Akropolis' || this.customer === 'Eurovaistine' ? 'block' : 'none'
        } ;left: 34px; top:${
          this.customer?.includes('Gamtos Ateitis') ? '435px' : this.language === 'LV' ? '440px' : '430px'
        }; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${this.isMobile ? '9px' : '10px'};color:${'#D8000C'};text-align:start;line-height:8px;">
</div>

      <div id="competition-name-error" style="display:${
        this.customer.includes('Gamtos Ateitis') ||
        this.customer === 'Perlas GO' ||
        this.customer === 'Nevezis' ||
        this.customer === 'Magija' ||
        this.customer === 'Pigu.lt' ||
        this.customer === 'LemonGym' ||
        this.customer === 'Nykstukas' ||
        this.customer === 'Orlen' ||
        this.customer === 'LemonFeel' ||
        this.customer === 'Tiche' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Novaturas' ||
        this.customer === 'Apranga' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      };width: fit-content; height: auto; left: 35px; top: ${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? '171px' : '255px'
      }; position: absolute;text-align:start;z-index:99999;color:#D8000C;
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.42px;
      border-radius:4px;
      padding:1px 8px 1px 8px;
      "></div>

      <div id="competition-email-error" style="width: fit-content; height: auto; left: 35px; top: ${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni'
          ? '255px'
          : this.customer.includes('Gamtos Ateitis')
            ? '348px'
            : this.customer === 'Nykstukas'
              ? '430px'
              : '338px'
      } ; position: absolute;text-align:start;z-index:99999;color:#D8000C;
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.42px;
      border-radius:4px;
      padding:1px 8px 1px 8px;
      "></div>


      <div id="competition-phone-error" style="width: fit-content; height: auto; left: 35px; top:335px; position: absolute;text-align:start;z-index:99999;color: ${'#D8000C'};
      font-family: Montserrat;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -0.42px;
      border-radius:4px;
      padding:1px 8px 1px 8px;
      "></div>

      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: ${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni'
          ? '207px'
          : this.customer.includes('Gamtos Ateitis')
            ? '180px'
            : this.customer === 'Perlas GO' ||
                this.customer === 'Nevezis' ||
                this.customer === 'Magija' ||
                this.customer === 'Pigu.lt' ||
                this.customer === 'LemonGym' ||
                this.customer === 'Nykstukas' ||
                this.customer === 'Orlen' ||
                this.customer === 'LemonFeel' ||
                this.customer === 'Tiche' ||
                this.customer === 'Zemaitijos Pienas' ||
                this.customer === 'Novaturas' ||
                this.customer === 'Apranga' ||
                this.language === 'EN'
              ? '240px'
              : '287px'
      }; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'}"></div>



      <div style="width: calc(100% - 54px); height: 45px; left: 28px;display:${
        this.customer.includes('Gamtos Ateitis') ||
        this.customer === 'Perlas GO' ||
        this.customer === 'Nevezis' ||
        this.customer === 'Magija' ||
        this.customer === 'Pigu.lt' ||
        this.customer === 'LemonGym' ||
        this.customer === 'Orlen' ||
        this.customer === 'LemonFeel' ||
        this.customer === 'Tiche' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Novaturas' ||
        this.customer === 'Apranga' ||
        this.customer === 'Akropolis' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      }; top: ${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? '124px' : this.customer === 'Nykstukas' ? '304px' : '204px'
      }; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'}"></div>
      <input id="boomio-competition-email-input-field" class="boomio-competition-email-input-field"
        maxLength=${this.customer === 'Toni' ? 10 : 50}
       type="text" style="box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${
         this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni'
           ? '219px'
           : this.customer.includes('Gamtos Ateitis')
             ? '189px'
             : this.customer === 'Perlas GO' ||
                 this.customer === 'Nevezis' ||
                 this.customer === 'Magija' ||
                 this.customer === 'Pigu.lt' ||
                 this.customer === 'LemonGym' ||
                 this.customer === 'Nykstukas' ||
                 this.customer === 'Orlen' ||
                 this.customer === 'LemonFeel' ||
                 this.customer === 'Tiche' ||
                 this.customer === 'Zemaitijos Pienas' ||
                 this.customer === 'Novaturas' ||
                 this.customer === 'Apranga' ||
                 this.language === 'EN'
               ? '249px'
               : '299px'
       };height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${
         this.customer === 'Barbora' ||
         this.customer === 'Fpro' ||
         this.customer === 'Fantazijos' ||
         this.customer === 'LemonGym' ||
         this.customer === 'Tiche' ||
         this.customer === 'Zemaitijos Pienas' ||
         this.customer === 'Novaturas' ||
         this.customer === 'Apranga' ||
         this.customer === 'LemonFeel'
           ? 'rgba(61, 73, 40, 1)'
           : '#473F4E'
       } ; font-size: 18px; font-family:${this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: 500; line-height: 24px; word-wrap: break-word" placeholder="${
         this.customer === 'Fpro'
           ? 'Email address'
           : this.customer === 'Ikea'
             ? 'El. pašto adresas'
             : this.customer === 'Eurovaistine'
               ? 'Spēlētāja e-pasts'
               : this.customer === 'SaludSA'
                 ? 'Correo electrónico'
                 : this.customer.includes('Gamtos Ateitis')
                   ? 'El. pašto adresas'
                   : this.language === 'LV'
                     ? 'Spēlētāja e-pasts'
                     : this.language === 'RU'
                       ? 'Емейл игрока'
                       : this.language === 'ET'
                         ? 'Mängija e-post'
                         : this.language === 'FI'
                           ? 'Sähköpostiosoite'
                           : this.language === 'EN'
                             ? 'Email address'
                             : this.language === 'ES'
                               ? 'Número de contacto'
                               : this.customer === 'Orlen'
                                 ? 'Telefono numeris'
                                 : 'Elektroninio pašto adresas'
       }">
      <input id="boomio-competition-name-input-field" class="boomio-competition-name-input-field" type="text" style="display:${
        this.customer.includes('Gamtos Ateitis') ||
        this.customer === 'Perlas GO' ||
        this.customer === 'Nevezis' ||
        this.customer === 'Magija' ||
        this.customer === 'Pigu.lt' ||
        this.customer === 'LemonGym' ||
        this.customer === 'Orlen' ||
        this.customer === 'LemonFeel' ||
        this.customer === 'Tiche' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Novaturas' ||
        this.customer === 'Apranga' ||
        this.customer === 'Akropolis' ||
        this.language === 'EN'
          ? 'none'
          : 'block'
      };box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? '135px' : this.customer === 'Nykstukas' ? '315px' : '215px'
      };height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${
        this.customer === 'Barbora' ||
        this.customer === 'Fpro' ||
        this.customer === 'Fantazijos' ||
        this.customer === 'LemonFeel' ||
        this.customer === 'Tiche' ||
        this.customer === 'Zemaitijos Pienas' ||
        this.customer === 'Novaturas' ||
        this.customer === 'Apranga' ||
        this.customer === 'LemonGym'
          ? 'rgba(61, 73, 40, 1)'
          : '#473F4E'
      } ; font-size: 18px; font-family:${this.customer === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: 500; line-height: 24px; word-wrap: break-word" placeholder="${
        this.language === 'LV'
          ? 'Spēlētāja lietotājvārds'
          : this.language === 'RU'
            ? 'Псевдоним игрока'
            : this.language === 'ET'
              ? 'Mängija hüüdnimi'
              : this.language === 'ES'
                ? 'Nombre y apellido'
                : this.customer === 'Fpro'
                  ? 'Players full name'
                  : this.customer === 'Ikea'
                    ? 'Žaidėjo vardas'
                    : this.customer === 'Eurovaistine'
                      ? 'Spēlētāja lietotājvārds'
                      : this.customer === 'SaludSA'
                        ? 'Nombre de usuario'
                        : this.language === 'EN'
                          ? 'Player nickname'
                          : this.customer === 'Nykstukas'
                            ? 'Komandos pavadinimas'
                            : 'Žaidėjo slapyvardis'
      }"> 
    
             <select id="city-select" class="boomio-competition-city-select"
    style="display:${this.customer.includes('Gamtos Ateitis') ? 'block' : 'none'};
           width:calc(100% - 54px); margin:10px; padding:8px; border:1px solid #ccc; border-radius:35px;
           left:28px;height:45px;position:absolute;top:${this.customer.includes('Gamtos Ateitis') ? '240px' : '205px'};margin:0px;;margin:0px;
           box-shadow:2px 4px 3px rgba(0, 0, 0, 0.25) inset;color:rgba(160, 155, 163, 1);font-family:Georama;font-size:18px;font-weight:500;">
        <option value="">${this.customer.includes('Gamtos Ateitis') ? 'Miestas ar rajonas' : 'Kurio miesto AKROPOLIO naujienos tau aktualiausios?'}</option>
    ${options.map((city) => `<option value="${city}">${city}</option>`).join('')}
  </select>

    
 
      <select id="school-select" class="boomio-competition-school-select" style="display:${
        this.customer.includes('Gamtos Ateitis') ? 'block' : 'none'
      };width:calc(100% - 54px); margin:10px; padding:8px; border:1px solid #ccc; border-radius:35px;left:28px;height:45px;position:absolute;top:300px;margin:0px;box-shadow:2px 4px 3px rgba(0, 0, 0, 0.25) inset;color:rgba(160, 155, 163, 1);font-family:Georama;font-size:18px;font-weight:500;">
         <option value="">Pirmiau pasirink miestą ar rajoną</option>
      </select>
      <div style="width: calc(100% - 54px); height: 45px; left: 28px; top: ${'290px'}; position: absolute; background: ${'white'}; box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.25) inset; border-radius: 35px; border: ${'1px rgba(164,164,164,0.9) solid'};display:${
        this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? 'block' : 'none'
      }"></div>

    <input id="boomio-competition-phone-input-field" class="boomio-competition-phone-input-field"
    maxLength=${this.customer === 'Toni' ? 10 : 50}
    inputmode="tel" 
  type="text" style="box-shadow:none;padding:0px;border:none;width:calc(100% - 94px);position: absolute; left: 51px; top: ${'300px'};height:30px; opacity: 0.60;background-color: ${'white'}; text-align: start; color:  ${'#473F4E'} ; font-size: 18px; font-family:${'Georama'}; font-weight: 500; line-height: 24px; word-wrap: break-word;display:${
    this.customer === 'SaludSA' || this.customer === 'Pegasas' || this.customer === 'Toni' ? 'block' : 'none'
  }" placeholder="${this.customer === 'SaludSA' ? 'Número de teléfono' : this.language === 'ES' ? 'Número de cédula' : this.language === 'EN' ? 'Phone number' : 'Telefono numeris'}">
    `;

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      return null;
    }

    // Function to set the values in the input fields
    const setCredentialsToInputs = () => {
      if (this.customer !== 'Toni') {
        const emailInput = document.querySelector('.boomio-competition-email-input-field');
        const playerNameInput = document.querySelector('.boomio-competition-name-input-field');

        const credentials = getCookie('boomio_game_credentials');

        if (credentials) {
          try {
            const parsedCredentials = JSON.parse(credentials);
            if (parsedCredentials.email && emailInput) {
              emailInput.value = parsedCredentials.email;
            }
            if (this.customer !== 'Nykstukas' && parsedCredentials.name && playerNameInput) {
              playerNameInput.value = parsedCredentials.name;
            }
          } catch (e) {
            console.error('Error parsing boomio_game_credentials cookie:', e);
          }
        }
      }
    };

    setTimeout(setCredentialsToInputs, 50);

    return containerDiv;
  }
}
