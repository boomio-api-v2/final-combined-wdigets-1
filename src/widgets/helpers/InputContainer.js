import './styles.css';
import { localStorageService } from '@/services';
import { uncheckIcon } from './constants';

export class InputContainer {
  constructor(prop, game) {
    this.prop = prop;
    this.game = game;
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();

    this.language = this.config.language ? this.config.language : 'EN';

    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    this.campaignUrlProp = urlParams.get('campaign_url');
  }

  createInputContainerDiv(game, type) {
    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');
    containerDiv.style.width = document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px';
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.zIndex = 9999;
    this.game = game;
    this.type = type;

    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const userId = urlParams.get('user_id');
    containerDiv.innerHTML = `

      
    <div style="width: 100%; height: ${'180px'};box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="margin-top:-20px;align-self: stretch; text-align: center; color: white; font-size: 32px; font-family:${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
    }; font-weight: 700; line-height: 21.60px; word-wrap: break-word;">  ${`<div style="${this.prop === 'Ikea' ? 'margin-left:20px' : ''};color: #FFF;text-align: ${
      this.prop === 'Ikea' ? 'start' : 'center'
    } ;font-size: 30px;font-style: normal;font-weight: 700;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: uppercase;">${
      this.language === 'LV'
        ? 'NOTEIKUMI'
        : this.language === 'RU'
          ? 'ПРАВИЛА'
          : this.language === 'ET'
            ? 'MÄNGUREEGLID'
            : this.language === 'ES'
              ? 'REGLAS'
              : this.language === 'FI'
                ? 'Säännöt'
                : this.language === 'EN'
                  ? 'RULES'
                  : this.prop === 'Ikea'
                    ? 'Kaip žaisti?'
                    : this.prop === 'Eurovaistine'
                      ? 'NOTEIKUMI'
                      : this.prop === 'SaludSA'
                        ? 'Reglas'
                        : 'TAISYKLĖS'
    }</div>`}</div>
    <div style="width: ${this.isMobile ? '370px' : '390px'};margin-top:10px;margin-bottom:10px;height:${
      this.prop.includes('Gamtos Ateitis') ||
      this.prop === 'Nykstukas' ||
      this.prop === 'LemonGym' ||
      this.prop === 'Magija' ||
      this.prop === 'Orlen' ||
      this.prop === 'Novaturas' ||
      this.prop === 'Nevezis' ||
      this.prop === 'Pigu.lt' ||
      this.prop === 'Zemaitijos Pienas' ||
      this.prop === 'LemonFeel' ||
      this.prop === 'Apranga'
        ? '150px'
        : '110px'
    }; color: white; font-size: 14px;font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${`<div style="width: 100%; height: 120px; position: relative">

 

          <div style="width:100%; height: 120px; left: 20px; top: 0px; position: absolute">
            <div style="left: 0px; top: -10px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'ET' ? '20px' : this.prop === 'Ikea' ? '20px' : '20px'
            }; font-family:${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: 700; line-height: 43.50px; word-wrap: break-word">
            
              1. ${
                this.prop === 'Pigu.lt' && this.language === 'LT'
                  ? 'Sudėk'
                  : this.prop === 'Pigu.lt' && this.language === 'EN'
                    ? 'Match'
                    : this.prop === 'Pigu.lt' && this.language === 'LV'
                      ? 'Saliec '
                      : this.prop === 'Pigu.lt' && this.language === 'ET'
                        ? 'Kogu '
                        : this.prop === 'Pigu.lt' && this.language === 'FI'
                          ? 'Yhdistä '
                          : this.prop === 'Pigu.lt' && this.language === 'RU'
                            ? 'Собери '
                            : this.prop === 'Apranga'
                              ? 'Gaudykite '
                              : this.language === 'EN' && this.game === 'drive'
                                ? 'Move '
                                : this.language === 'LV' && this.game === 'drive'
                                  ? 'Stūrē '
                                  : this.language === 'ET' && this.game === 'drive'
                                    ? 'Navigeerimiseks '
                                    : this.language === 'FI' && this.game === 'drive'
                                      ? 'PYYHKÄISE'
                                      : this.language === 'RU' && this.game === 'drive'
                                        ? 'Двигайтесь '
                                        : this.language === 'LT' && this.game === 'drive'
                                          ? 'Judėk  '
                                          : this.language === 'ET' && this.game === 'drive'
                                            ? 'LIIKUMISEKS —'
                                            : this.language === 'LV' && this.game === 'doodle'
                                              ? 'PĀRVIETOJIES'
                                              : this.prop === 'Eurovaistine'
                                                ? 'SAŅEMT'
                                                : this.game === 'catch' && this.language === 'EN'
                                                  ? 'CATCH'
                                                  : this.game === 'catch' && this.language === 'ES'
                                                    ? 'ATRAPAR'
                                                    : this.game === 'catch'
                                                      ? 'Gaudyk'
                                                      : this.prop === 'SaludSA'
                                                        ? 'Presiona'
                                                        : this.prop === 'Perlas GO'
                                                          ? 'Judėk'
                                                          : this.prop === 'Dentsu' && this.game === 'runner'
                                                            ? 'Judėk'
                                                            : this.prop.includes('Gamtos Ateitis') && this.game === 'catch'
                                                              ? 'Brauk'
                                                              : this.prop.includes('Gamtos Ateitis') && this.game === 'crush'
                                                                ? 'Sudėk'
                                                                : this.game === 'drive' && this.language === 'LT'
                                                                  ? 'į šonus, kad vairuotum.'
                                                                  : this.game === 'drive' && this.language === 'LV'
                                                                    ? 'pa labi un pa kreisi'
                                                                    : this.game === 'drive' && this.language === 'ET'
                                                                      ? 'liigu paremale ja vasakule.'
                                                                      : this.game === 'drive' && this.language === 'EN'
                                                                        ? 'sideways to steer.'
                                                                        : this.game === 'drive' && this.language === 'RU'
                                                                          ? 'вправо и влево '
                                                                          : this.prop === 'LemonFeel'
                                                                            ? 'KLIKŠĶINI,'
                                                                            : this.language === 'LV'
                                                                              ? 'SPIED,'
                                                                              : this.language === 'RU'
                                                                                ? 'ПРАВИЛА'
                                                                                : this.prop === 'Toni'
                                                                                  ? 'Desliza'
                                                                                  : this.language === 'ET'
                                                                                    ? 'KLÕPSA'
                                                                                    : this.prop === 'Fpro'
                                                                                      ? 'CLICK'
                                                                                      : this.prop === 'Ikea'
                                                                                        ? 'Vairuokite,'
                                                                                        : this.language === 'EN'
                                                                                          ? 'CLICK'
                                                                                          : this.prop === 'Nykstukas'
                                                                                            ? 'Judėk'
                                                                                            : this.game === 'doodle'
                                                                                              ? 'Judėk'
                                                                                              : this.language === 'ES' && this.game === 'crush'
                                                                                                ? 'CONECTAR'
                                                                                                : this.game === 'crush'
                                                                                                  ? 'Sudėk'
                                                                                                  : this.game === 'drive'
                                                                                                    ? 'Brauk'
                                                                                                    : this.game === 'crush'
                                                                                                      ? 'Sudėk'
                                                                                                      : 'Spausk,'
              }
    <div
  style="position:initial;top: 9px; margin-top: 2px; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-weight: 700; margin-left: 4px; font-family: ${
    this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
  }; word-wrap: break-word"
>
  ${
    this.prop === 'Akropolis' && this.language === 'LV'
      ? 'sāņus, lai nenokristu.'
      : this.prop === 'Akropolis'
        ? ',,Caif Cafe“ kavos puodelius.'
        : this.prop === 'Daumantu'
          ? ' TIK Daumantų produktus.'
          : this.prop === 'Pigu.lt' && this.language === 'EN' && this.game === 'crush'
            ? '3 or more items together.'
            : this.prop === 'Pigu.lt' && this.language === 'LV' && this.game === 'crush'
              ? 'kopā 3 vai vairāk priekšmetus.'
              : this.prop === 'Pigu.lt' && this.language === 'ET' && this.game === 'crush'
                ? '3 või rohkem sarnast asja.'
                : this.prop === 'Pigu.lt' && this.language === 'FI' && this.game === 'crush'
                  ? 'vähintään 3 samanlaista esinettä.'
                  : this.prop === 'Pigu.lt' && this.language === 'RU' && this.game === 'crush'
                    ? '3 или более предметов.'
                    : this.prop === 'Pigu.lt' && this.language === 'LT' && this.game === 'crush'
                      ? 'kartu 3 ar daugiau prekes.'
                      : this.prop === 'Pigu.lt' && this.language === 'EN'
                        ? 'to jump'
                        : this.prop === 'Pigu.lt' && this.language === 'LV'
                          ? 'lai lektu'
                          : this.prop === 'Pigu.lt' && this.language === 'ET'
                            ? 'et hüpata'
                            : this.prop === 'Pigu.lt' && this.language === 'FI'
                              ? 'hypätäksesi'
                              : this.prop === 'Pigu.lt' && this.language === 'RU'
                                ? 'чтобы прыгнуть'
                                : this.prop === 'Pigu.lt' && this.language === 'LT'
                                  ? 'kad pašoktum'
                                  : this.prop === 'Eurovaistine'
                                    ? 'pārvietojoties uz sāniem.'
                                    : this.prop === 'Apranga'
                                      ? 'SOULZ prekes ir rinkite taškus.'
                                      : this.game === 'drive' && this.language === 'LT'
                                        ? 'į šonus, kad vairuotum.'
                                        : this.game === 'drive' && this.language === 'LV'
                                          ? 'pa labi un pa kreisi'
                                          : this.game === 'drive' && this.language === 'ET'
                                            ? 'liigu paremale ja vasakule. '
                                            : this.game === 'drive' && this.language === 'EN'
                                              ? 'sideways to steer.'
                                              : this.game === 'drive' && this.language === 'RU'
                                                ? 'вправо и влево'
                                                : this.language === 'LV'
                                                  ? 'lai lidotu.'
                                                  : this.language === 'LV' && this.game === 'drive'
                                                    ? 'libista sõrmega küljelt küljele.'
                                                    : this.language === 'RU'
                                                      ? 'чтобы лететь'
                                                      : this.game === 'catch' && this.prop === 'Toni'
                                                        ? 'la BiciTopsy.'
                                                        : this.game === 'crush' && this.prop === 'Toni'
                                                          ? 'y junta.'
                                                          : this.language === 'ET'
                                                            ? 'lendamiseks'
                                                            : this.game === 'drive' && this.prop === 'Ikea'
                                                              ? 'braukdami kairiau ar dešiniau.'
                                                              : this.prop === 'Gamtos Ateitis Paper' && this.game === 'catch'
                                                                ? 'popieriaus pakuočių atliekas.'
                                                                : this.prop === 'Gamtos Ateitis Plastic' && this.game === 'catch'
                                                                  ? 'plastiko pakuočių atliekas.'
                                                                  : this.prop === 'Gamtos Ateitis Glass' && this.game === 'catch'
                                                                    ? 'stiklo pakuočių atliekas.'
                                                                    : this.prop.includes('Gamtos Ateitis') && this.game === 'crush'
                                                                      ? 'kartu 3 ar daugiau vienodų pakuočių.'
                                                                      : this.prop === 'Pieno Žvaigždės'
                                                                        ? '“MIAU” produktus.'
                                                                        : this.prop === 'Pegasas'
                                                                          ? ' Pegaso produktus.'
                                                                          : this.game === 'drive'
                                                                            ? 'į šonus, kad vairuotum.'
                                                                            : this.prop === 'Fpro'
                                                                              ? 'TO FLY'
                                                                              : this.prop === 'SaludSA'
                                                                                ? 'para volar'
                                                                                : this.prop === 'Perlas GO'
                                                                                  ? 'į šonus, kad nenukristum.'
                                                                                  : this.prop === 'Dentsu' && this.game === 'flappy'
                                                                                    ? 'kad skristum.'
                                                                                    : this.game === 'runner'
                                                                                      ? 'rodyklių pagalba.'
                                                                                      : this.prop === 'Nevezis'
                                                                                        ? '3 ar daugiau vienodų oho! pakuočių. '
                                                                                        : this.game === 'doodle'
                                                                                          ? 'į šonus, kad nenukristum.'
                                                                                          : this.prop === 'Nykstukas'
                                                                                            ? 'baksnodamas ekraną Nykštuką išlaikysi ore.'
                                                                                            : this.prop === 'Orlen' && this.game === 'catch'
                                                                                              ? 'ledus ir gauk taškus.'
                                                                                              : this.language === 'EN' && this.game === 'catch'
                                                                                                ? 'to get points.'
                                                                                                : this.language === 'ES' && this.game === 'catch'
                                                                                                  ? 'para obtener puntos.'
                                                                                                  : this.language === 'EN'
                                                                                                    ? 'TO FLY'
                                                                                                    : this.language === 'ES' && this.game === 'crush'
                                                                                                      ? 'Tres o más helados ‘Toni’'
                                                                                                      : this.prop === 'Zemaitijos Pienas'
                                                                                                        ? 'kartu 3 ar daugiau vienodų prekių.'
                                                                                                        : this.game === 'crush'
                                                                                                          ? 'kartu 3 ar daugiau prekes.'
                                                                                                          : 'kad skristum.'
  }
</div>

            </div>
            <div style="left: 0px; top: 30px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'ET' ? '20px' : this.prop === 'Ikea' ? '20px' : '20px'
            }; font-family:${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: 700; line-height: 43.50px; word-wrap: break-word">
            2.  ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'Repeat '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'Atkārto,'
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'Korda,'
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'Toista ,'
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'Повтори  '
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'Kartok  '
                          : this.language === 'LV' && this.game === 'doodle'
                            ? 'SPĒLĒ VĒLREIZ,'
                            : this.prop === 'Novaturas' && this.language === 'LT'
                              ? 'Rink  '
                              : this.prop === 'Novaturas' && this.language === 'LV'
                                ? 'Savāc '
                                : this.prop === 'Novaturas' && this.language === 'ET'
                                  ? 'Kogu  '
                                  : this.prop === 'Novaturas' && this.language === 'EN'
                                    ? 'Collect  '
                                    : this.prop === 'Novaturas' && this.language === 'RU'
                                      ? 'Собирайте  '
                                      : this.language === 'LV'
                                        ? 'ATKĀRTO,'
                                        : this.language === 'RU'
                                          ? 'ПОВТОРИТЬ'
                                          : this.prop === 'Toni' && this.game === 'catch'
                                            ? 'Atrapa'
                                            : this.prop === 'Toni' && this.game === 'crush'
                                              ? 'Combina '
                                              : this.language === 'ET'
                                                ? 'KORDA'
                                                : this.prop === 'Fpro'
                                                  ? 'REPEAT'
                                                  : this.prop === 'Ikea'
                                                    ? 'Kartokite,'
                                                    : this.prop === 'Eurovaistine'
                                                      ? 'ATKĀRTOT'
                                                      : this.prop === 'SaludSA'
                                                        ? 'Presiona'
                                                        : this.prop.includes('Gamtos Ateitis') && this.game === 'catch'
                                                          ? 'Rink'
                                                          : this.prop.includes('Gamtos Ateitis') && this.game === 'crush'
                                                            ? 'Siek'
                                                            : this.language === 'EN'
                                                              ? 'REPEAT'
                                                              : this.language === 'ES'
                                                                ? 'REPETIR'
                                                                : this.prop === 'Nykstukas'
                                                                  ? 'Įveik'
                                                                  : this.prop === 'Nevezis'
                                                                    ? 'Brauk'
                                                                    : this.prop === 'Magija'
                                                                      ? 'Kartok,'
                                                                      : this.prop === 'Orlen' && this.game === 'catch'
                                                                        ? 'Venk'
                                                                        : this.prop === 'Orlen'
                                                                          ? 'Rink'
                                                                          : this.prop === 'Novaturas' && this.language === 'LT'
                                                                            ? 'Rink'
                                                                            : this.prop === 'Apranga'
                                                                              ? 'Venkite'
                                                                              : 'Kartok'
            }
                         <div style="position:initial;top: 46px;margin-left:4px;margin-top:2px; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${
                           this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
                         }; font-weight: 700;  word-wrap: break-word">
            ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'for better result.'
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'lai sasniegtu labāku rezultātu.'
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'et tulemus oleks veel parem.'
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'paremman tuloksen saavuttamiseksi.'
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'для достижения наилучших результатов.'
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'dėl geresnio rezultato.'
                          : this.prop === 'Eurovaistine'
                            ? 'un uzlabo savu rezultātu.'
                            : this.game === 'doodle' && this.language === 'LV'
                              ? 'lai uzlabotu savu rezultātu.'
                              : this.language === 'LV' && this.game === 'drive'
                                ? 'kuponus un iegūsti punktus'
                                : this.language === 'LV'
                                  ? 'lai sasniegtu labāku rezultātu.'
                                  : this.language === 'RU'
                                    ? 'для лучшего результата'
                                    : this.prop === 'Toni' && this.game === 'catch'
                                      ? 'los helados Topsy para ganar puntos.'
                                      : this.prop === 'Toni' && this.game === 'crush'
                                        ? '3 o más, helados Topsy iguales.'
                                        : this.language === 'ET'
                                          ? 'kaarte ja teeni puntke.'
                                          : this.prop === 'Pieno Žvaigždės'
                                            ? 'siekdamas kuo geresnio rezultato.'
                                            : this.prop === 'Pegasas'
                                              ? 'siekdamas kuo geresnio rezultato.'
                                              : this.game === 'drive' && this.prop === 'Ikea'
                                                ? 'jei nesate patenkinti rezultatu.'
                                                : this.prop === 'Fpro'
                                                  ? 'FOR BETTER RESULT'
                                                  : this.prop === 'SaludSA'
                                                    ? '3 veces para mejorar'
                                                    : this.prop.includes('Gamtos Ateitis') && this.type === 1 && this.game === 'catch'
                                                      ? 'popieriaus pakuočių atliekas ir gauk taškų.'
                                                      : this.prop.includes('Gamtos Ateitis') && this.type === 2 && this.game === 'catch'
                                                        ? 'stiklo pakuočių atliekas ir gauk taškų.'
                                                        : this.prop.includes('Gamtos Ateitis') && this.type === 3 && this.game === 'catch'
                                                          ? 'plastiko pakuočių atliekas ir gauk taškų.'
                                                          : this.prop.includes('Gamtos Ateitis') && this.game === 'crush'
                                                            ? 'geresnio rezultato.'
                                                            : this.prop === 'Novaturas' && this.language === 'LT'
                                                              ? 'korteles ir gauk taškus.  '
                                                              : this.prop === 'Novaturas' && this.language === 'LV'
                                                                ? 'kārtis un iegūsti punktus '
                                                                : this.prop === 'Novaturas' && this.language === 'ET'
                                                                  ? 'kaarte ja teeni puntke.'
                                                                  : this.prop === 'Novaturas' && this.language === 'EN'
                                                                    ? 'cards and earn points.  '
                                                                    : this.prop === 'Novaturas' && this.language === 'RU'
                                                                      ? 'карты и зарабатывайте пункты.  '
                                                                      : this.language === 'EN'
                                                                        ? 'to get the best possible result'
                                                                        : this.language === 'ES'
                                                                          ? 'para obtener el mejor resultado posible'
                                                                          : this.prop === 'Nykstukas'
                                                                            ? 'ledų kliūtis.'
                                                                            : this.prop === 'Nevezis'
                                                                              ? 'ir pelnyk taškus.'
                                                                              : this.prop === 'Orlen' && this.game === 'catch'
                                                                                ? 'draudžiamų ženklų.'
                                                                                : this.prop === 'Orlen'
                                                                                  ? 'ledus ir gauk taškus. '
                                                                                  : this.prop === 'Novaturas' && this.language === 'LT'
                                                                                    ? 'korteles ir gauk taškus.'
                                                                                    : this.prop === 'Perlas GO'
                                                                                      ? 'siekdamas kuo geresnio rezultato.'
                                                                                      : this.prop === 'Apranga'
                                                                                        ? 'pakabų, kad nepralaimėtumėte.'
                                                                                        : 'siekdamas kuo geresnio rezultato.'
            }
          </div>
            </div>
            <div style="left: 1px; top: 70px;display:flex; position: absolute; color: white; font-size: ${
              this.language === 'LV' || this.language === 'RU' || this.language === 'ET' ? '20px' : this.prop === 'Ikea' ? '20px' : '20px'
            }; font-family:${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: 700; line-height: 43.50px; word-wrap: break-word;white-space: nowrap;">
            3. ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'Enjoy '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'Izbaudi '
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'Naudi '
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'Nauti '
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'Приятной '
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'Mėgaukis '
                          : this.prop === 'Toni' && this.game === 'catch'
                            ? 'Evita'
                            : this.prop === 'Toni' && this.game === 'crush'
                              ? 'Acumula Más Puntos'
                              : this.prop === 'Fpro'
                                ? 'WIN'
                                : this.prop === 'Ikea'
                                  ? 'Laimėkite,'
                                  : this.prop === 'Perlas GO' && !userId
                                    ? 'Registruokis'
                                    : this.prop === 'Perlas GO'
                                      ? 'Mėgaukis'
                                      : this.prop === 'Eurovaistine'
                                        ? 'LAIMĒ'
                                        : this.prop === 'SaludSA'
                                          ? '¡Gana!'
                                          : this.prop.includes('Gamtos Ateitis')
                                            ? 'Kartok,'
                                            : this.prop === 'Nykstukas'
                                              ? 'Kartok'
                                              : this.prop === 'Nevezis'
                                                ? 'Kartok'
                                                : this.prop === 'Magija'
                                                  ? 'Mėgaukis'
                                                  : this.prop === 'Orlen'
                                                    ? 'Kartok'
                                                    : this.prop === 'Novaturas' && this.language === 'LT'
                                                      ? 'Kartok'
                                                      : this.language === 'LV'
                                                        ? 'Atkārto '
                                                        : this.language === 'ET'
                                                          ? 'Proovi '
                                                          : this.language === 'EN'
                                                            ? 'Repeat '
                                                            : this.language === 'RU'
                                                              ? 'Повторяйте '
                                                              : this.prop === 'Zemaitijos Pienas'
                                                                ? 'Mėgaukis'
                                                                : this.prop === 'Apranga'
                                                                  ? 'Kartokite,'
                                                                  : 'Laimėk'
            } 
                          <div style="position:initial;top: 85px;margin-top:${
                            this.prop === 'Perlas GO' ? '19px' : this.prop === 'SaludSA' || this.prop === 'Pieno Žvaigždės' || this.prop === 'Dentsu' ? '16px' : '2px'
                          }; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${
                            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
                          }; font-weight: 700;margin-left:4px; word-wrap: break-word; ${
                            this.prop === 'Perlas GO' || this.prop === 'SaludSA' || this.prop === 'Pieno Žvaigždės' || this.prop === 'Dentsu' ? 'white-space:normal;' : ''
                          }
    ${this.prop === 'Toni' && 'margin-top:13px;line-height:14px;white-space:normal;'}
    ${this.prop === 'Perlas GO' || this.prop === 'SaludSA' || this.prop === 'Pieno Žvaigždės' || this.prop === 'Dentsu' ? 'line-height:14px;' : ''}">
            ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'the game. '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'spēli. '
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'mängu. '
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'pelistä. '
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'игры.'
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'žaidimu. '
                          : this.prop === 'Eurovaistine'
                            ? 'kādu no 50 balvām!'
                            : this.language === 'LV' && this.game === 'doodle'
                              ? 'katru dienu!'
                              : this.language === 'LV' && this.game === 'drive'
                                ? 'un uzlabo savu rezultātu'
                                : this.language === 'ET' && this.game === 'drive'
                                  ? 'uuesti ja paranda oma tulemust.'
                                  : this.language === 'LV' && this.prop === 'Pigu.lt'
                                    ? 'līdz pat 30 Yesyes.lv balvām!'
                                    : this.language === 'LV' && this.prop === 'LemonFeel'
                                      ? 'spēli.'
                                      : this.language === 'LV' && this.prop === 'LemonGym'
                                        ? 'spēli.'
                                        : this.prop === 'Toni' && this.game === 'catch'
                                          ? 'los palitos vacíos para no perder vidas.'
                                          : this.prop === 'Toni' && this.game === 'crush'
                                            ? 'combinando helados con splash de leche.'
                                            : this.language === 'ET'
                                              ? 'auhinnad.'
                                              : this.prop.includes('Gamtos Ateitis')
                                                ? 'pagerinus rezultatą prisidės taškų skirtumas.'
                                                : this.prop === 'Pieno Žvaigždės'
                                                  ? 'kassavaitinius Forum Cinema bilietus ir pagrindinius MIAU prizus!'
                                                  : this.prop === 'Pegasas'
                                                    ? '1 iš 80 Pegaso knygų, kas dvi savaites!'
                                                    : this.prop === 'LemonGym'
                                                      ? 'Lemon Gym narystes kas mėnesį!'
                                                      : this.prop === 'Perlas GO' && !userId
                                                        ? '„Perlas Go“ savitarnoje </br> arba mobiliojoje programėlėje.'
                                                        : this.prop === 'Perlas GO'
                                                          ? 'žaidimu.'
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
                                                                        ? '1 iš 2000 kavos puodelių kasdien!'
                                                                        : this.prop === 'Daumantu'
                                                                          ? 'Daumantų prizus!'
                                                                          : this.prop === 'SaludSA'
                                                                            ? 'premios Saludsa Vitality y participa </br> en el sorteo de increíbles premios.'
                                                                            : this.prop === 'Vilvi'
                                                                              ? 'kasdien!'
                                                                              : this.prop === 'Dentsu'
                                                                                ? '1 mėn. prieigą  prie interaktyvios tikslinės auditorijos!'
                                                                                : this.prop === 'Nykstukas'
                                                                                  ? 'siekiant kuo geresnio rezultato.'
                                                                                  : this.prop === 'Nevezis'
                                                                                    ? 'siekiant kuo geresnio rezultato.'
                                                                                    : this.prop === 'Magija'
                                                                                      ? 'žaidimu.'
                                                                                      : this.prop === 'Zemaitijos Pienas'
                                                                                        ? 'žaidimu.'
                                                                                        : this.prop === 'Orlen'
                                                                                          ? ' ir  pagerink rezultatą.'
                                                                                          : this.prop === 'Apranga'
                                                                                            ? ' siekdami geresnio rezultato.'
                                                                                            : this.language === 'LT'
                                                                                              ? 'ir pagerink rezultatą.'
                                                                                              : this.language === 'LV'
                                                                                                ? 'un uzlabo savu rezultātu '
                                                                                                : this.language === 'ET'
                                                                                                  ? 'uuesti ja paranda oma tulemust. '
                                                                                                  : this.language === 'EN'
                                                                                                    ? 'and improve your score.'
                                                                                                    : this.language === 'RU'
                                                                                                      ? 'и улучшайте свой результат '
                                                                                                      : 'prizus!'
            }
          </div>
            </div>
${
  this.prop === 'Perlas GO' ||
  this.prop.includes('Gamtos Ateitis') ||
  this.prop === 'Nykstukas' ||
  this.prop === 'Nevezis' ||
  this.prop === 'Magija' ||
  this.prop === 'Orlen' ||
  this.prop === 'Novaturas' ||
  this.prop === 'LemonFeel' ||
  this.prop === 'Pigu.lt' ||
  this.prop === 'Toni' ||
  this.prop === 'Zemaitijos Pienas' ||
  this.prop === 'LemonGym' ||
  this.prop === 'Apranga'
    ? `<div style="left: 1px; top: 110px;display:flex; position: absolute; color: white; font-size: ${'20px'}; font-family:${
        this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
      }; font-weight: 700; line-height: 43.50px; word-wrap: break-word;white-space: nowrap;">
            4. ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'Win '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'Laimē  '
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'Võida  '
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'Voita  '
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'Выигрывай '
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'Laimėk'
                          : this.prop === 'Novaturas' && this.language === 'LT'
                            ? 'Laimėk'
                            : this.prop === 'Novaturas' && this.language === 'LV'
                              ? 'Laimē'
                              : this.prop === 'Novaturas' && this.language === 'ET'
                                ? 'Võida '
                                : this.prop === 'Novaturas' && this.language === 'EN'
                                  ? 'Win '
                                  : this.prop === 'Novaturas' && this.language === 'RU'
                                    ? 'Выигрывайте '
                                    : this.prop === 'Toni'
                                      ? 'Vuelve'
                                      : this.prop === 'LemonFeel'
                                        ? '28.AUGUSTĀ'
                                        : this.prop === 'Apranga'
                                          ? 'Laimėkite'
                                          : this.language === 'LV'
                                            ? 'LAIMĒ'
                                            : 'Laimėk'
            } 
                          <div style="position:initial;top: 85px;margin-top:${'17px'}; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${
                            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
                          }; font-weight: 700;margin-left:4px; word-wrap: break-word; ${'white-space:normal;'}${'line-height:14px;'}">
            ${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? 'prizes! '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                  ? 'balvas!'
                  : this.prop === 'Pigu.lt' && this.language === 'ET'
                    ? 'auhindu!'
                    : this.prop === 'Pigu.lt' && this.language === 'FI'
                      ? 'palkintoja!'
                      : this.prop === 'Pigu.lt' && this.language === 'RU'
                        ? 'призы!'
                        : this.prop === 'Pigu.lt' && this.language === 'LT'
                          ? 'prizus!'
                          : this.prop.includes('Gamtos Ateitis')
                            ? 'koncertą savo mokyklai!'
                            : this.prop === 'Toni'
                              ? 'a jugar para incrementar tus oportunidades de ganar y participa por increíbles premios.'
                              : this.prop === 'LemonGym'
                                ? 'LEMON GYM balvas!'
                                : this.prop === 'Nevezis'
                                  ? 'šaunius prizus!'
                                  : this.prop === 'Magija'
                                    ? 'belaides „Magija“ ausines, „Magija“ </br> sūrelių dėžutę arba „Magija“ puodelį!'
                                    : this.prop === 'Nykstukas'
                                      ? 'vertingus prizus kas savaitę!'
                                      : this.prop === 'Orlen'
                                        ? '1 000 ledų kas savaitę!'
                                        : this.prop === 'Novaturas' && this.language === 'LT'
                                          ? ' „Novaturas“ prizus!'
                                          : this.prop === 'Novaturas' && this.language === 'LV'
                                            ? 'Novatours atlaižu kuponus!'
                                            : this.prop === 'Novaturas' && this.language === 'ET'
                                              ? 'Novatoursi auhindu!'
                                              : this.prop === 'Novaturas' && this.language === 'EN'
                                                ? ' „Novaturas“ prizus!'
                                                : this.prop === 'Novaturas' && this.language === 'RU'
                                                  ? 'призы от Novatours!'
                                                  : this.prop === 'LemonFeel'
                                                    ? 'apbalvosim labāko spēlētāju'
                                                    : this.prop === 'Apranga'
                                                      ? 'prizus!'
                                                      : 'prizus!'
            }
          </div>
            </div>`
    : ``
}
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
      this.prop === 'Pigu.lt' ||
      this.prop === 'SaludSA' ||
      this.prop === 'Vilvi' ||
      this.prop === 'Zemaitijos Pienas' ||
      this.prop === 'Ikea' ||
      this.prop === 'Nykstukas' ||
      this.prop === 'LemonGym' ||
      this.prop === 'Nevezis' ||
      this.prop === 'Magija' ||
      this.prop === 'Orlen' ||
      this.prop === 'LemonFeel' ||
      this.prop === 'Novaturas' ||
      this.prop.includes('demo')
        ? `<div id="startRulesButtonClick" style="align-self: stretch; text-align: ${'center'}; color: white; font-size: 10px; font-family:${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'
          }; font-weight: 500; line-height: 21.60px; word-wrap: break-word;"><a target="_blank" rel="noopener noreferrer" ${
            this.prop === 'Novaturas' && this.language === 'LT'
              ? 'href=https://www.novaturas.lt/zaidimo-taisykles'
              : this.prop === 'Novaturas' && this.language === 'LV'
                ? 'href=https://www.novatours.lv/speles-noteikumi'
                : this.prop === 'Novaturas' && this.language === 'ET'
                  ? 'href=https://www.novatours.ee/mangu-reeglid'
                  : this.prop === 'Novaturas' && this.language === 'RU'
                    ? 'href=https://www.novatours.lv/ru/pravila-igri'
                    : this.config.currentPageUrl.toLowerCase().includes('pigu')
                      ? this.language === 'RU'
                        ? `href=https://pigu.lt/ru/t/zaidimo-taisykles-jump`
                        : `href=https://pigu.lt/lt/t/zaidimo-taisykles-jump`
                      : this.config.currentPageUrl.toLowerCase().includes('220')
                        ? this.language === 'RU'
                          ? `href=https://220.lv/ru/t/game-rules-jump`
                          : `href=https://220.lv/lv/t/game-rules-jump `
                        : this.config.currentPageUrl.toLowerCase().includes('kaup24')
                          ? this.language === 'RU'
                            ? `href=https://kaup24.ee/ru/t/game-rules-jump `
                            : `href=https://kaup24.ee/et/t/game-rules-jump `
                          : this.config.currentPageUrl.toLowerCase().includes('hobbyhall')
                            ? this.language === 'EN'
                              ? `href=https://hobbyhall.fi/fi/t/game-rules-jump `
                              : `href=https://hobbyhall.fi/fi/t/game-rules-jump `
                            : this.prop === 'SaludSA'
                              ? 'href=https://ventas.saludsa.com/reglas-juego'
                              : this.prop === 'Barbora'
                                ? 'href=https://www.barbora.lt/info/akciju-zaidimu-taisykles'
                                : this.prop === 'Eurovaistine'
                                  ? 'href=https://www.e-euroaptieka.lv/ker-un-laime-speles-noteikumi'
                                  : this.prop === 'Unisend' && this.language === 'LV'
                                    ? 'href=https://unisend.lv'
                                    : this.prop === 'Unisend' && this.language === 'ET'
                                      ? 'href=https://unisend.ee'
                                      : this.prop === 'LemonGym'
                                        ? 'href=https://www.lemongym.lv/wp-content/uploads/2025/05/LEMON-GYM-LV-speles-noteikumi.pdf'
                                        : this.prop === 'Ikea'
                                          ? 'href=https://www.ikea.lt/en/zaidimo-ar-gerai-vairuojate-taisykles'
                                          : this.prop === 'Makalius'
                                            ? 'href=https://www.makalius.lt/gimtadienio-zaidimo-taisykles/'
                                            : this.language === 'ET'
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
                                                            ? 'href=https://www.akropolis.lt/view-file/14247_%C5%BDaidi%20ir%20kava%20kasdien%20laimi_Kavos_%C5%BEaidimas_2025.pdf'
                                                            : this.language === 'LV' && this.prop === 'Fantazijos'
                                                              ? 'href=https://docs.google.com/document/d/1QNzkm_j-Sn73LsykBYgFAfwg0Ij2TeM5/edit'
                                                              : this.language === 'RU' && this.prop === 'Fantazijos'
                                                                ? 'href=https://docs.google.com/document/d/1PN05AH1AQUL6iiENuVVeVBJGip6Ia6w1/edit'
                                                                : this.prop.includes('Gamtos Ateitis')
                                                                  ? 'href=https://gamtosateitis.lt/wp-content/uploads/2025/05/Taisykles_word.pdf'
                                                                  : this.prop === 'Zemaitijos Pienas'
                                                                    ? 'href=https://www.boomio.com/zemaitijos-pienas-protein-m-zaidimo-taisykles'
                                                                    : this.prop === 'Nykstukas'
                                                                      ? 'href=https://www.nykstukozaidimas.lt/taisykles/'
                                                                      : this.prop === 'Magija'
                                                                        ? 'href=https://www.boomio.com/zemaitijos-pienas-magija-zaidimo-taisykles'
                                                                        : this.prop === 'Nevezis'
                                                                          ? 'href=https://ohosausryciai.lt/zaidimo-taisykles.html'
                                                                          : this.prop === 'LemonFeel'
                                                                            ? 'href=https://www.lemongym.lv/wp-content/uploads/2025/05/LEMON-FEEL-speles-noteikumi.pdf'
                                                                            : this.prop === 'Orlen'
                                                                              ? 'href=https://www.orlen.lt/LT/zaidimas/Puslapiai/taisykl%c4%97s.aspx'
                                                                              : `href=${window.location.href}`
          } style="color:white;text-decoration: underline;font-size:14px;margin-top:6px;font-family:${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'};">${
            this.prop === 'Pigu.lt' && this.language === 'EN'
              ? 'Read the detailed game rules.'
              : this.prop === 'Pigu.lt' && this.language === 'LV'
                ? 'Izlasi detalizētos spēles noteikumus.'
                : this.prop === 'Pigu.lt' && this.language === 'ET'
                  ? 'Loe mängu täpseid reegleid.'
                  : this.prop === 'Pigu.lt' && this.language === 'FI'
                    ? 'Lue tarkat säännöt.'
                    : this.prop === 'Pigu.lt' && this.language === 'RU'
                      ? 'Ознакомься с подробными правилами игры.'
                      : this.prop === 'Pigu.lt'
                        ? 'Skaityk išsamias žaidimo taisykles'
                        : this.prop === 'Eurovaistine'
                          ? 'Pilni spēles noteikumi šeit.'
                          : this.prop === 'Fpro'
                            ? 'Read full games rules. '
                            : this.prop === 'SaludSA'
                              ? 'Revisa las reglas completas del juego.'
                              : this.prop === 'Ikea'
                                ? 'Visos žaidimo taisyklės'
                                : this.prop === 'LemonFeel'
                                  ? 'Lasīt pilnos spēles noteikumus'
                                  : this.prop.includes('Gamtos Ateitis')
                                    ? 'Skaityk išsamias žaidimo taisykles.'
                                    : this.language === 'EN'
                                      ? 'Read the full game rules'
                                      : this.language === 'LV'
                                        ? 'Izlasi detalizētos spēles noteikumus.'
                                        : this.language === 'RU'
                                          ? 'Ознакомьтесь с полными правилами игры.'
                                          : this.language === 'ET'
                                            ? 'Loe kõiki mängureegleid.'
                                            : 'Skaityk išsamias žaidimo taisykles.'
          } </a></div>
           
          ${
            this.prop === 'Pigu.lt' && false
              ? ` <div class="boomio-rules-privacyCheckbox" id="boomio-rules-privacyCheckbox" style="margin-left:30px;cursor:${'pointer'} ;left: 34px;  justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      <div  style=" display: ${'inline-flex'};cursor: ${'pointer'};">
            <img id="boomio-rules-privacyCheckbox-img" src="${uncheckIcon}" style="max-width:fit-content;width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${'10px'}; font-family:${'Montserrat'} ;width:calc(100% - 50px);  font-weight: 400; word-wrap: break-word;line-height:14px;text-align:start;">
        ${
          this.prop === 'Pigu.lt' && this.language === 'EN'
            ? 'I agree to receive game news and information about prizes, and for my data to be processed for this purpose.'
            : this.prop === 'Pigu.lt' && this.language === 'LV'
              ? 'Es piekrītu saņemt spēles jaunumus un informāciju par balvām, kā arī piekrītu manu datu apstrādei šim nolūkam'
              : this.prop === 'Pigu.lt' && this.language === 'ET'
                ? 'Nõustun saama teavet mängu uudiste ja auhindade kohta ning luban oma andmete töötlemise selleks otstarbeks.'
                : this.prop === 'Pigu.lt' && this.language === 'FI'
                  ? 'Hyväksyn, että minulle lähetetään tietoja pelistä ja palkinnoista, ja että tietojani käsitellään tätä tarkoitusta varten.'
                  : this.prop === 'Pigu.lt' && this.language === 'RU'
                    ? 'Я соглашаюсь получать новости о игре и информацию о призах, а также на обработку моих данных с этой целью.'
                    : 'Sutinku gauti žaidimo naujienas ir informaciją apie prizus, bei kad mano duomenys būtų tvarkomi šiuo tikslu.'
        }
    </div>
      </div>         <div id="boomio-rules-checkbox-error" style="margin-left:16px;padding-top:1px;margin-right:14px;display:${'none'} ;top:${'270px'}; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${
        this.isMobile ? '8px' : '10px'
      };color:${'#D8000C'};text-align:start;line-height:8px;">
</div>`
              : ''
          }
          `
        : ''
    }
    </div>
    <div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 20px;display:flex; width:${
                document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px'
              };" id="control-button" class="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height: 100%; height:38px;background: white
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 20px; font-family:${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Georama'}; font-weight: ${
                this.prop === 'Ikea' ? '400' : '700'
              }; line-height: 20px; word-wrap: break-word"> <div style="line-height:20px;text-align: center; color: ${
                this.prop === 'Toni' ? '#10069F' : 'rgba(61, 73, 40, 1)'
              }; font-size: 20px;  line-height: 20px; word-wrap: break-word">${
                this.prop === 'Pigu.lt' && this.language === 'EN'
                  ? 'NEXT'
                  : this.prop === 'Pigu.lt' && this.language === 'LV'
                    ? 'TĀLĀK'
                    : this.prop === 'Pigu.lt' && this.language === 'ET'
                      ? 'JÄRGMINE'
                      : this.prop === 'Pigu.lt' && this.language === 'FI'
                        ? 'SEURAAVA'
                        : this.prop === 'Pigu.lt' && this.language === 'RU'
                          ? 'ДАЛЕЕ'
                          : this.prop === 'Pigu.lt'
                            ? 'PIRMYN'
                            : this.language === 'LV' && this.prop === 'Akropolis'
                              ? 'PIEKRĪTU NOTEIKUMIEM'
                              : this.language === 'LV'
                                ? 'TĀLĀK'
                                : this.language === 'RU'
                                  ? 'ДАЛЕЕ'
                                  : this.language === 'ET'
                                    ? 'EDASI'
                                    : this.language === 'ES' || this.language === 'ET'
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
                                              : this.prop === 'Daumantu'
                                                ? 'PIRMYN'
                                                : this.prop === 'Pegasas'
                                                  ? 'PIRMYN'
                                                  : this.prop === 'SaludSA'
                                                    ? 'SIGUIENTE'
                                                    : this.prop === 'Vilvi'
                                                      ? 'SUTINKU'
                                                      : this.prop === 'Perlas GO'
                                                        ? 'SUTINKU'
                                                        : this.language === 'EN'
                                                          ? 'CONTINUE'
                                                          : 'SUTINKU'
              }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
