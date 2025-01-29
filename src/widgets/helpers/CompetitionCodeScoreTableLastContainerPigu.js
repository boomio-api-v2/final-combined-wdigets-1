import './styles.css';

import { boomioLogo } from './constants';
import { localStorageService } from '@/services';

export class CompetitionCodeScoreTableLastContainerPigu {
  constructor(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.currentScore = scoreTable.user_best_score;

    this.scoreTable = scoreTable; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null; // Store container reference
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'EN';
    this.couponCodeNew = this.config.couponCodeNew
      ? this.config.couponCodeNew
      : this.language === 'ET' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : this.language === 'RU' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
      ? 'KAUNEUS1224'
      : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
      ? 'KAUNEUS1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'EN' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : '';

    this.render();
  }

  updateProps(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.currentScore = scoreTable.user_best_score;

    this.language = this.config.language ? this.config.language : 'EN';
    this.config = localStorageService.getDefaultConfig();
    this.couponCodeNew = this.config.couponCodeNew
      ? this.config.couponCodeNew
      : this.language === 'ET' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : this.language === 'RU' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
      ? 'KAUNEUS1224'
      : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
      ? 'GROZIS1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
      ? 'KAUNEUS1224'
      : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
      ? 'SKAISTUMAM1224'
      : this.language === 'EN' &&
        (this.campaignUrlProp === 'https://kaup.ee' || this.campaignUrlProp === 'https://kaup24.ee')
      ? 'ILU1224'
      : '';

    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
    const scoreboard = this.scoreTable.scoreboard || [];
    const userBestPlace = parseInt(this.scoreTable.user_best_place);
    const userBestScore = parseInt(this.scoreTable.user_best_score);
    this.userDiscountCode = this?.scoreTable?.coupon_code || '';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;

    const piguTable =
      this.prop === 'Pigu.lt' && this.campaignUrlProp === 'https://220.lv'
        ? [
            'Piparkūka',
            'Vārpstiņš',
            'Lāčplēsis',
            'Mr kruze',
            'Tīģeris Miegā',
            'Kaspars',
            'Mežsargs',
            'Vēstnesis',
            'Latvānija',
            'Saulīte',
            'LAUVIŅA',
            'Punisher',
            'Tēvzeme',
            'Skailane',
            'Freefire',
            'Zelta Saule',
            'Tumsas Burvis',
            'Spīdīgais Runcis',
            'Krauklis',
            'Jānis',
            'Mēness Kafija',
            'Gints',
            'Saulīte',
            'Meža Puika',
            'Mēness Gaisma',
            'Orests',
            'Zane',
            'Viktors',
            'Lielais Karpis',
          ]
        : this.prop === 'Pigu.lt' &&
          (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee')
        ? [
            'Mannu',
            'Seenekuningas',
            'Tots',
            'Laura',
            'Suur Kõrv',
            'Tanni',
            'Jüri',
            'Miisu',
            'Seaküla Simson',
            'Alex',
            'Pille',
            'Mees',
            'Notsu',
            'Sannu',
            'Mõmmi',
            'Tõnis',
            'Tommy',
            'Mati',
            'Karuott',
            'Tirts',
            'Siska',
            'Jänku',
            'Tibuke',
            'Paps',
            'Tannu',
            'Kitti',
            'Päikeseke',
            'Ants',
            'Zorro',
            'Jannu',
          ]
        : this.prop === 'Pigu.lt' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? [
            'Tukku',
            'Jonsku',
            'Vampyyri',
            'Simppa',
            'Möhköfantti',
            'Pekka-Pahus',
            'Aksu',
            'Pulla',
            'Sofku',
            'Eikka',
            'Timpe',
            'Hirvi',
            'Ripa',
            'Lumikko',
            'Häiskä',
            'Hanski',
            'Jarska',
            'Pupu',
            'Kivimies',
            'Kake',
            'Kauris',
            'Tuulipuku',
            'Helmi',
            'Peltsu',
            'Eltsu',
            'Nani - Banaani',
          ]
        : this.prop === 'Pigu.lt' &&
          this.campaignUrlProp === 'https://pigu.lt' && [
            'PIGUTIS',
            'BLASH',
            'BULKIN',
            'PILKASIS ŠEŠĖLIS',
            'GIEDRIUZAS',
            'ABRIKOSAS',
            'TRUMPAS',
            'UGIS',
            'MIS LIETUVA',
            'ZORO',
            'RUKIS',
            'EMILIUX',
            'VĖJO DRUMSTĖJAS',
            'RORO',
            'HARIS POTERIS',
            'VAIVORYKŠTĖ',
            'VALDELIS',
            'ŠOKLIUKĖ',
            'FANTAZUOTOJAS',
            'VALDOVAS',
            'PEMPĖ',
            'NEWYORKE',
            'VORIUKAS',
            'MISTY',
            'BLACKTHORN',
            'BLAZING BILL',
            'SKRAIDŪNAS',
          ];
    let tableHTML = '';
    scoreboard.forEach((item, index) => {
      const background = index + 1 === userBestPlace ? 'rgba(255, 255, 255, 1)' : 'none';

      const color =
        index + 1 === userBestPlace
          ? this.prop === 'Barbora' ||
            this.prop === 'Fpro' ||
            this.prop === 'Fantazijos' ||
            this.prop === 'Makalius' ||
            this.prop === 'Ikea' ||
            this.prop === 'Unisend' ||
            this.prop === 'Pieno Žvaigždės' ||
            this.prop === 'Pegasas' ||
            this.prop === 'Pigu.lt' ||
            this.prop === 'Eurovaistine' ||
            this.prop === 'Akropolis' ||
            this.prop.includes('Gamtos Ateitis') ||
            this.prop === 'LemonGym'
            ? 'rgba(61, 73, 40, 1)'
            : 'white'
          : this.prop === 'Barbora' ||
            this.prop === 'Fpro' ||
            this.prop === 'Fantazijos' ||
            this.prop === 'Makalius' ||
            this.prop === 'Pieno Žvaigždės' ||
            this.prop === 'Pegasas' ||
            this.prop === 'Pigu.lt' ||
            this.prop.includes('Gamtos Ateitis') ||
            this.prop === 'LemonGym'
          ? 'white'
          : 'white';
      const boxShadow =
        index + 1 === userBestPlace ? '2px 4px 3.4px 0px rgba(0, 0, 0, 0.10) inset' : 'none';

      tableHTML += `
            <tr style="background: ${background};box-shadow:${boxShadow};margin: 0;height:44px ">
            <td style="padding-left:8px;text-align:start;width: 25px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${item.place}</td>
      <td style="padding-left:6px;text-align:start;width: 100px; color: ${color}; border: none;font-size: 16px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word;">
      ${piguTable[index]}
    </td>
              <td style="width: 48px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;padding-right:11px;">${item.score}</td>
            </tr>`;
    });

    let textColor = 'white';
    let fontSize = '16px';
    let fontWeight =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.prop.includes('Gamtos Ateitis') ||
      this.prop === 'Pieno Žvaigždės' ||
      this.prop === 'Pegasas' ||
      this.prop === 'Pigu.lt' ||
      this.prop === 'LemonGym'
        ? '900'
        : '700';
    let scoreboardText = `
       <div id='boomio-your-score' style="margin-bottom:10px;width:100%;top:50px;position:absolute; text-align: center; color: white; font-size: 20px; font-family: Montserrat; font-weight:400; text-transform: uppercase; word-wrap: break-word"> 
    ${
      this.prop === 'Pigu.lt' && this.language === 'EN'
        ? 'Your score:'
        : this.prop === 'Pigu.lt' && this.language === 'LV'
        ? 'Tavs rezultāts:'
        : this.prop === 'Pigu.lt' && this.language === 'ET'
        ? 'Sinu tulemus: '
        : this.prop === 'Pigu.lt' && this.language === 'FI'
        ? 'Tuloksesi:'
        : this.prop === 'Pigu.lt' && this.language === 'RU'
        ? 'Твой результат:'
        : this.prop === 'Pigu.lt' && this.language === 'LT' && 'Tavo rezultatas:'
    } ${this.currentScore ?? 0} </div>
               <div id='boomio-your-score' style="line-height:34px;margin-bottom:10px;margin-left:20px;width:calc(100% - 40px);top:80px;position:absolute; text-align: center; color: white; font-size: 32px; font-family: Montserrat; font-weight:900; text-transform: uppercase; word-wrap: break-word; display:${
                 this.prop === 'Pigu.lt' ? 'none' : 'block'
               }"> 
    ${
      this.currentScore >= 1000
        ? this.prop === 'Pigu.lt' && this.language === 'EN'
          ? 'Congratulations! '
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? 'Apsveicam! '
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? 'Palju õnne! '
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? 'Onnittelut! '
          : this.prop === 'Pigu.lt' && this.language === 'RU'
          ? 'Поздравляем! '
          : this.prop === 'Pigu.lt' && this.language === 'LT' && 'Sveikiname! '
        : this.prop === 'Pigu.lt' && this.language === 'EN'
        ? 'Oh no, you were so close!'
        : this.prop === 'Pigu.lt' && this.language === 'LV'
        ? 'Ak nē, tu biji tik tuvu!'
        : this.prop === 'Pigu.lt' && this.language === 'ET'
        ? 'Oh ei, olid võidule nii lähedal! '
        : this.prop === 'Pigu.lt' && this.language === 'FI'
        ? 'Voi ei, olit niin lähellä!'
        : this.prop === 'Pigu.lt' && this.language === 'RU'
        ? 'Как жаль, это  было так близко! '
        : this.prop === 'Pigu.lt' && this.language === 'LT' && 'O ne, tu buvai taip arti!'
    } </div>
      ${`<div style="display:${
        this.prop === 'Pigu.lt ' ? 'none' : 'none'
      };width:100%; top: 210px; position: absolute; text-align: center; color: ${textColor}; font-size: 14px; font-family: Montserrat; font-weight: ${fontWeight};  word-wrap: break-word">${
        this.prop === 'Pigu.lt' && this.language === 'EN'
          ? 'Congratulations!'
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? 'Apsveicam!'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? 'Palju õnne!'
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? 'Onneksi olkoon!'
          : this.prop === 'Pigu.lt' && this.language === 'RU'
          ? 'Поздравляем!'
          : this.prop === 'Pigu.lt' && this.language === 'LT'
          ? 'Sveikiname!'
          : this.prop === 'Barbora'
          ? 'Pagerink rezultatą ir laimėk </br>Barbora gimtadienio dovaną iškart!'
          : this.language === 'ES'
          ? 'LO ESTÁS HACIENDO MUY BIEN'
          : this.prop === 'Eurovaistine'
          ? 'TEV VEICAS LIELISKI!'
          : this.prop === 'Akropolis' && this.language === 'LV'
          ? 'Mēģini vēlreiz, tev izdosies!'
          : this.prop === 'Unisend' && this.language === 'LV'
          ? 'TEV VEICAS LIELISKI!'
          : this.language === 'LV'
          ? 'Atzīmējiet karstāko vasaru'
          : this.language === 'RU'
          ? 'Отпразднуйте самый жаркий месяц лета'
          : this.prop === 'Unisend' && this.language === 'EE'
          ? 'SUL LÄHEB HÄSTI!'
          : this.language === 'EE'
          ? 'Tähistage suve kuumimat kuud ja võitke'
          : 'Sveikiname!'
      }</div>
            <div style="display:${
              this.prop === 'Pigu.lt ' ? 'none' : 'none'
            };width:100%; top: 230px;line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size: 11px; font-family: Montserrat; font-weight: 700;  word-wrap: break-word">${
        this.prop === 'Pigu.lt' && this.language === 'EN'
          ? 'Today, you`ve won a discount code for the Pigu.lt website.'
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? 'Šodien Tu esi laimējis 220.lv atlaižu kodu.'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? 'Võitsid täna allahindluskoodi Kaup24 e-poodi. '
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? 'Olet voittanut alekoodin Hobbyhall.fi-verkkokauppaan!'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            (this.campaignUrlProp === 'https://kaup.ee' ||
              this.campaignUrlProp === 'https://kaup24.ee')
          ? 'Сегодня ты выиграл скидочный код Kaup24.'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://pigu.lt'
          ? 'Сегодня ты выиграл скидочный код Pigu.lt.'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://220.lv'
          ? 'Сегодня ты выиграл скидочный код 220.lv.'
          : this.prop === 'Pigu.lt'
          ? `Laimėjai nuolaidos kodą Pigu.lt svetainėje.`
          : ''
      }</div>
      ${
        this.currentScore >= 1000
          ? `<div style="margin-left:20px;width:calc(100% - 40px);position:absolute;margin-top:200px;">
              <div style="width:100%; top: ${'245px'};line-height:18px; text-align: center; color: #FFD66B; font-size:${
              this.isMobile ? '12px' : '14px'
            } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? '<strong style="text-transform:uppercase">You`ve scored over 1000 points and are eligible to win this week`s prizes:</strong>  '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                ? '<strong style="text-transform:uppercase"> Tu esi ieguvis vairāk nekā 1000 punktus un esi ieguvis iespēju laimēt balvu:</strong>'
                : this.prop === 'Pigu.lt' && this.language === 'ET'
                ? '<strong style="text-transform:uppercase">Oled skoorinud üle 1000 punkti ja sul on võimalus võita järgnevad auhinnad: </strong> '
                : this.prop === 'Pigu.lt' && this.language === 'FI'
                ? '<strong style="text-transform:uppercase">Olet saavuttanut yli 1000 pistettä ja voit voittaa yhden tämän viikon palkinnoista:</strong>'
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  (this.campaignUrlProp === 'https://kaup.ee' ||
                    this.campaignUrlProp === 'https://kaup24.ee')
                ? '<strong style="text-transform:uppercase">Вы набрали более 1000 очков и получили возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  this.campaignUrlProp === 'https://pigu.lt'
                ? '<strong style="text-transform:uppercase">Вы набрали более 1000 очков и получили возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  this.campaignUrlProp === 'https://220.lv'
                ? '<strong style="text-transform:uppercase">Вы набрали более 1000 очков и получили возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt'
                ? '<strong style="text-transform:uppercase">Surinkai virš 1000 taškų ir pretenduoji laimėti šios savaitės prizus:</strong>  '
                : ''
            }</div>`
          : `<div style="margin-left:20px;width:calc(100% - 40px);position:absolute;margin-top:200px;display:${
              this.prop === 'Pigu.lt' ? 'none' : 'block'
            }">
              <div style="width:100%; top: ${'245px'};line-height:18px; text-align: center; color: #FFD66B; font-size:${
              this.isMobile ? '10px' : '12px'
            } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Pigu.lt' && this.language === 'EN'
                ? '<strong style="text-transform:uppercase">Get 1000 points or more and qualify for this week`s prizes:</strong>  '
                : this.prop === 'Pigu.lt' && this.language === 'LV'
                ? '<strong style="text-transform:uppercase"> Sakrāj 1000 punktus vai vairāk un iegūsti iespēju laimēt balvu:</strong>'
                : this.prop === 'Pigu.lt' && this.language === 'ET'
                ? '<strong style="text-transform:uppercase">Teeni 1000 punkti või rohkem ja Sul on võimalus võita sellel nädalal need auhinnad:</strong> '
                : this.prop === 'Pigu.lt' && this.language === 'FI'
                ? '<strong style="text-transform:uppercase">Kerää 1000 pistettä tai enemmän ja voit voittaa palkinnon:</strong>'
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  (this.campaignUrlProp === 'https://kaup.ee' ||
                    this.campaignUrlProp === 'https://kaup24.ee')
                ? '<strong style="text-transform:uppercase">Набери 1000 очков или больше и получи возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  this.campaignUrlProp === 'https://pigu.lt'
                ? '<strong style="text-transform:uppercase">Набери 1000 очков или больше и получи возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt' &&
                  this.language === 'RU' &&
                  this.campaignUrlProp === 'https://220.lv'
                ? '<strong style="text-transform:uppercase">Набери 1000 очков или больше и получи возможность выиграть приз:</strong> '
                : this.prop === 'Pigu.lt'
                ? '<strong style="text-transform:uppercase">Surink 1000 ar daugiau taškų ir pretenduok gauti šios savaitės prizus:</strong>  '
                : ''
            }</div>`
      }
                    <div style="width:100%; margin-top: ${'10px'};line-height:18px; text-align: center; color: #FFD66B; font-size:${
        this.isMobile ? '17px' : '19px'
      } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
        this.prop === 'Pigu.lt' && this.language === 'LV'
          ? '<strong style="text-transform:uppercase"> </strong>'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? '<strong style="text-transform:uppercase"> </strong> '
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? '<strong style="text-transform:uppercase"></strong>'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            (this.campaignUrlProp === 'https://kaup.ee' ||
              this.campaignUrlProp === 'https://kaup24.ee')
          ? '<strong style="text-transform:uppercase"></strong> '
          : this.prop === 'Pigu.lt' &&
            this.language === 'EN' &&
            this.campaignUrlProp === 'https://pigu.lt'
          ? '<strong style="text-transform:uppercase">LEGO® Star Wars Emperor`s Throne™ Diorama</strong> '
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://pigu.lt'
          ? '<strong style="text-transform:uppercase">LEGO® Star Wars™ Диорама Тронный зал императора</strong> '
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://220.lv'
          ? '<strong style="text-transform:uppercase"></strong> '
          : this.prop === 'Pigu.lt'
          ? '<strong style="text-transform:uppercase">LEGO® Star Wars Imperatoriaus sosto menės™ diorama</strong>  '
          : this.prop === 'Pigu.lt' && this.language === 'EN'
          ? '<strong style="text-transform:uppercase"></strong>  '
          : ''
      }</div>
                    <div style="width:100%; margin-top: ${'10px'};line-height:18px;  text-align: center; color: #FFD66B; font-size:${
        this.isMobile ? '17px' : '19px'
      } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
        this.prop === 'Pigu.lt' && this.language === 'EN'
          ? '<strong style="text-transform:uppercase">10 x €20 gift vouchers</strong>  '
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? '<strong style="text-transform:uppercase"> 10 gab. 20€ dāvanu kartes.</strong>'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? '<strong style="text-transform:uppercase">10 x 20 € väärtuses kinkekaarte</strong> '
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? '<strong style="text-transform:uppercase">10 kpl 20 euron lahjakortteja</strong>'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            (this.campaignUrlProp === 'https://kaup.ee' ||
              this.campaignUrlProp === 'https://kaup24.ee')
          ? '<strong style="text-transform:uppercase">10 шт. подарочные карты на 20 €.</strong> '
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://pigu.lt'
          ? '<strong style="text-transform:uppercase">10 шт. подарочные карты на 20 €.</strong> '
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://220.lv'
          ? '<strong style="text-transform:uppercase">10 шт. подарочные карты на 20 €.</strong> '
          : this.prop === 'Pigu.lt'
          ? '<strong style="text-transform:uppercase">10 x 20 € vertės dovanų kuponų</strong>  '
          : ''
      }</div>
      </div>
              <div style="width:100%; top: 346px; position: absolute; text-align: center; color: ${textColor}; font-size: 9px; font-family: Montserrat; font-weight: 400;  word-wrap: break-word;display:${
        this.prop === 'Pigu.lt' ? 'none' : 'block'
      }">      ${
        this.prop === 'Pigu.lt'
          ? this.language === 'EN'
            ? 'Winners are chosen at random.'
            : this.language === 'LV'
            ? 'Uzvarētāji tiek izvēlēti pēc nejaušības principa.'
            : this.language === 'ET'
            ? 'Võitjad valitakse juhuslikkuse alusel.'
            : this.language === 'FI'
            ? 'Voittajat valitaan sattumanvaraisesti.'
            : this.language === 'RU' &&
              (this.campaignUrlProp === 'https://kaup.ee' ||
                this.campaignUrlProp === 'https://kaup24.ee')
            ? 'Победители выбираются случайным образом.'
            : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
            ? 'Победители выбираются случайным образом.'
            : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
            ? 'Победители выбираются случайным образом.'
            : 'Laimėtojai renkami atsitiktine tvarka.'
          : ''
      } </div>
       </div>
      <div style="width:100%;font-size:${
        this.isSmallMobile ? '8px' : this.isMobile ? '10px' : '12px'
      };text-align:center;text-transform:uppercase;top:550px;position:absolute;margin-top:2px;height: 22px; justify-content: center; align-items: center; display: flex;font-weight:600;background-size: contain;">
          <div style="display:${
            this.prop === 'Pigu.lt' ? 'block' : 'none'
          };border-radius:35px;width: calc(100% - 60px);margin-left:30px;margin-right:30px;top:585px;height: 28px; background: ${
        this.prop === 'Pigu.lt' ? '#F34434' : 'none'
      }; overflow: hidden; justify-content: center; align-items: center; gap: 11px; display: flex;font-family:Georama" id="boomio-game-link-to-web">
      ${
        this.prop === 'Pigu.lt'
          ? this.language === 'EN'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.pigu.lt/gamification-cta">Buy now</a>'
            : this.language === 'LV'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.220.lv/gamification-cta">Pirkt tagad </a>'
            : this.language === 'ET'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.kaup24.ee/gamification-cta">Osta kohe</a>'
            : this.language === 'FI'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.hobbyhall.fi/gamification-cta">Osta nyt</a>'
            : this.language === 'RU' &&
              (this.campaignUrlProp === 'https://kaup.ee' ||
                this.campaignUrlProp === 'https://kaup24.ee')
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.kaup24.ee/gamification-cta">Купить сейчас</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.pigu.lt/gamification-cta">Купить сейчас</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://link.220.lv/gamification-cta">Купить сейчас</a>'
            : '<a style="text-decoration:none;color:white" target="_blank" href="https://link.pigu.lt/gamification-cta">Pirkti dabar</a>'
          : ''
      }
  </div>
</div>

                     <div style="display:none;text-transform: uppercase;margin-left:20px;width:calc(100% - 40px); top: 415px; position: absolute; text-align: center; color: ${textColor}; font-size: 14px; font-family: Montserrat; font-weight: 700;  word-wrap: break-word">${
        this.prop === 'Pigu.lt' && this.language === 'EN'
          ? 'Play again and improve your score'
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? 'Spēlē atkal un uzlabo savu rezultātu,'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? 'Mängi uuesti ja paranda oma tulemust,'
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? 'Pelaa uudelleen ja paranna tulostasi,'
          : this.prop === 'Pigu.lt' && this.language === 'RU'
          ? 'Играй снова и улучшай свой результат,'
          : this.prop === 'Pigu.lt'
          ? 'PRIZAI KIEKVIENĄ savaitę!'
          : ''
      } </div>
                     <div style="margin-left:20px;width:calc(100% - 40px); top: 435px; position: absolute; text-align: center; color: ${textColor}; font-size: 12px; font-family: Montserrat; font-weight: 500;  word-wrap: break-word;display:${
        this.prop === 'Pigu.lt' ? 'none' : 'block'
      }">${
        this.prop === 'Pigu.lt' && this.language === 'EN'
          ? 'If you will win, we’ll notify you via the email address in your account.'
          : this.prop === 'Pigu.lt' && this.language === 'LV'
          ? 'Ja uzvarēsi, mēs informēsim Tevi, izmantojot kontā norādīto e-pasta adresi.'
          : this.prop === 'Pigu.lt' && this.language === 'ET'
          ? 'Kui peaksid võitma, teavitame Sind registreeritud e-posti kaudu.'
          : this.prop === 'Pigu.lt' && this.language === 'FI'
          ? 'Jos voitat, ilmoitamme siitä sähköpostitse käyttäjätililläsi olevaan osoitteeseen.'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            (this.campaignUrlProp === 'https://kaup.ee' ||
              this.campaignUrlProp === 'https://kaup24.ee')
          ? 'Если ты выиграл, мы свяжемся с тобой по электронной почте, указанной в твоем аккаунте.'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://pigu.lt'
          ? 'Если ты выиграл, мы свяжемся с тобой по электронной почте, указанной в твоем аккаунте.'
          : this.prop === 'Pigu.lt' &&
            this.language === 'RU' &&
            this.campaignUrlProp === 'https://220.lv'
          ? 'Если ты выиграл, мы свяжемся с тобой по электронной почте, указанной в твоем аккаунте.'
          : this.prop === 'Pigu.lt'
          ? 'Jei laimėsi informuosime tave paskyroje nurodytu el. paštu.'
          : ''
      } </div>
        `}

      `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';
    // containerDiv.style.border = this.prop === 'Penki Sezonai' && '2px solid #A6CE39';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    this.campaignUrlProp = urlParams.get('campaign_url');

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
  

      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 60px);margin-left:30px;margin-right:30px;top:595px;position:absolute; height: 38px; background: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 11px; display: flex" id="boomio-game-play-again">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 20px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">${
      this.prop === 'Akropolis' && this.language === 'LV'
        ? 'SPĒLĒT VĒLREIZ'
        : this.prop === 'Pigu.lt' && this.language === 'EN'
        ? 'IMPROVE SCORE'
        : this.prop === 'Pigu.lt' && this.language === 'LV'
        ? 'UZLABOT REZULTĀTU'
        : this.prop === 'Pigu.lt' && this.language === 'ET'
        ? 'PARANDA TULEMUSI '
        : this.prop === 'Pigu.lt' && this.language === 'FI'
        ? 'PARANNA TULOSTA'
        : this.prop === 'Pigu.lt' && this.language === 'RU'
        ? 'УЛУЧШИТЬ РЕЗУЛЬТАТ'
        : this.prop === 'Eurovaistine'
        ? 'UZLABOT REZULTĀTU'
        : this.language === 'LV'
        ? 'UZLABOT REZULTĀTU'
        : this.language === 'RU'
        ? 'УЛУЧШИТЬ РЕЗУЛЬТАТ'
        : this.language === 'EE'
        ? 'PARANDA TULEMUST'
        : this.language === 'ES'
        ? 'MEJORAR EL RESULTADO'
        : 'PAGERINK REZULTATĄ'
    }</div>
      </div>

    </div>`;

    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('competition-table-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
