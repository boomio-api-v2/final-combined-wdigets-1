import './styles.css';

import {
  boomioLogo,
  SuccessmessagebannersNegativeEE,
  SuccessmessagebannersNegativeFI,
  SuccessmessagebannersNegativeLT,
  SuccessmessagebannersNegativeLV,
  SuccessmessagebannersNegativeRU,
  SuccessmessagebannersPossitiveEE,
  SuccessmessagebannersPossitiveEERU,
  SuccessmessagebannersPossitiveFI,
  SuccessmessagebannersPossitiveLT,
  SuccessmessagebannersPossitiveLTRU,
  SuccessmessagebannersPossitiveLV,
  SuccessmessagebannersPossitiveLVRU,
} from './constants';
import { localStorageService } from '@/services';

export class CompetitionCodeScoreTableLastContainerPigu {
  constructor(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.currentScore = currentScore;

    this.scoreTable = scoreTable; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null; // Store container reference
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'EN';

    this.render();
  }

  updateProps(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;

    this.language = this.config.language ? this.config.language : 'EN';
    this.config = localStorageService.getDefaultConfig();

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

    
<div
  style="
    max-width: 334px;
    max-height: 459px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 80px; /* Restore vertical position */
    left: 50%;
    transform: translateX(-50%); /* Center horizontally */
    background: url(${
      this.currentScore > 1000
        ? this.language === 'ET' &&
          ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
          ? SuccessmessagebannersPossitiveEE
          : this.language === 'RU' &&
            ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
          ? SuccessmessagebannersPossitiveEERU
          : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
          ? SuccessmessagebannersPossitiveLTRU
          : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
          ? SuccessmessagebannersPossitiveFI
          : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
          ? SuccessmessagebannersPossitiveLT
          : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
          ? SuccessmessagebannersPossitiveFI
          : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
          ? SuccessmessagebannersPossitiveLV
          : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
          ? SuccessmessagebannersPossitiveLVRU
          : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
          ? SuccessmessagebannersPossitiveLV
          : this.language === 'EN' &&
            ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
          ? SuccessmessagebannersPossitiveEE
          : SuccessmessagebannersPossitiveLT
        : this.language === 'ET' &&
          ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
        ? SuccessmessagebannersNegativeEE
        : this.language === 'LT' && this.campaignUrlProp === 'https://pigu.lt'
        ? SuccessmessagebannersNegativeLT
        : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
        ? SuccessmessagebannersNegativeRU
        : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
        ? SuccessmessagebannersNegativeRU
        : this.language === 'RU' &&
          ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
        ? SuccessmessagebannersNegativeRU
        : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
        ? SuccessmessagebannersNegativeLT
        : this.language === 'EN' && this.campaignUrlProp === 'https://220.lv'
        ? SuccessmessagebannersNegativeLV
        : this.language === 'EN' &&
          ['https://kaup.ee', 'https://kaup24.ee'].includes(this.campaignUrlProp)
        ? SuccessmessagebannersNegativeEE
        : this.language === 'FI' && this.campaignUrlProp === 'https://hobbyhall.fi'
        ? SuccessmessagebannersNegativeFI
        : this.language === 'LV' && this.campaignUrlProp === 'https://220.lv'
        ? SuccessmessagebannersNegativeLV
        : SuccessmessagebannersNegativeLT
    });
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    justify-content: center;
    align-items: center;
    display: ${this.prop === 'Pigu.lt' ? 'block' : 'none'};
  "
  
></div>


      </div> 
   
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
