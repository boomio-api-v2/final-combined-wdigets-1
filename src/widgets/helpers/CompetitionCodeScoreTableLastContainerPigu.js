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
  SuccessmessagebannersPossitiveFIcode,
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
    console.log(this.currentScore);
    console.log(this.userDiscountCode);

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
    border-radius:45px;
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
          ? this.userDiscountCode
            ? SuccessmessagebannersPossitiveFIcode
            : SuccessmessagebannersPossitiveFI
          : this.language === 'EN' && this.campaignUrlProp === 'https://pigu.lt'
          ? SuccessmessagebannersPossitiveLT
          : this.language === 'EN' && this.campaignUrlProp === 'https://hobbyhall.fi'
          ? this.userDiscountCode
            ? SuccessmessagebannersPossitiveFIcode
            : SuccessmessagebannersPossitiveFI
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
  
>
${
  this.language === 'FI' &&
  this.campaignUrlProp === 'https://hobbyhall.fi' &&
  this.currentScore > 1000 &&
  this.userDiscountCode
    ? `
        <div style="margin-top:215px;">
          <div style="letter-spacing: -0.3px;line-height: 150%;width:100%;margin-top:20px; text-align: center; color: white; font-size: 10px; font-family: Montserrat; font-weight:400; word-wrap: break-word;"> 
     Ilmainen toimitus koodilla PostNordin noutopisteeseen <strong id="startCodeRulesButtonClick" style="text-decoration:underline">koodilla*</strong>
</div>
</div>
        <div style="box-sizing: border-box;width: 100%; padding-left: 12px; padding-right: 12px; padding-top: 7px; padding-bottom: 7px; background:     ${'linear-gradient(90deg, rgba(254, 227, 233, 0.60) 0%, rgba(255, 214.63, 231.75, 0.60) 22%, rgba(243, 219, 240, 0.60) 42%, rgba(234, 223, 247, 0.60) 62%, rgba(234, 223, 247, 0.60) 82%, rgba(238.45, 215.69, 255, 0.60) 100%)'}; border-radius: 32px; border: 0.50px  rgba(255, 255, 255, .6) solid; justify-content: space-between; align-items: center; display: inline-flex;width:250px;margin-top:10px;">
<div style="height: 17px; color: white; font-size: 16px; font-family: Montserrat; font-weight: 600; line-height: 16px; word-wrap: break-word" id="p_code_text2">
 ${this.userDiscountCode ?? 'CODE'}
    </div>
    <svg width="22" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="boomio-copy-modal-btn" style="cursor:pointer">
    <path d="M18.5625 3.42188H7.5625C7.42575 3.42188 7.2946 3.4762 7.1979 3.5729C7.1012 3.6696 7.04688 3.80075 7.04688 3.9375V7.54688H3.4375C3.30075 7.54688 3.1696 7.6012 3.0729 7.6979C2.9762 7.7946 2.92188 7.92575 2.92188 8.0625V19.0625C2.92188 19.1993 2.9762 19.3304 3.0729 19.4271C3.1696 19.5238 3.30075 19.5781 3.4375 19.5781H14.4375C14.5743 19.5781 14.7054 19.5238 14.8021 19.4271C14.8988 19.3304 14.9531 19.1993 14.9531 19.0625V15.4531H18.5625C18.6993 15.4531 18.8304 15.3988 18.9271 15.3021C19.0238 15.2054 19.0781 15.0743 19.0781 14.9375V3.9375C19.0781 3.80075 19.0238 3.6696 18.9271 3.5729C18.8304 3.4762 18.6993 3.42188 18.5625 3.42188ZM13.9219 18.5469H3.95312V8.57812H13.9219V18.5469ZM18.0469 14.4219H14.9531V8.0625C14.9531 7.92575 14.8988 7.7946 14.8021 7.6979C14.7054 7.6012 14.5743 7.54688 14.4375 7.54688H8.07812V4.45312H18.0469V14.4219Z" fill="white"/>
    </svg>
</div> 
    <div style="letter-spacing: -0.3px;line-height: 150%;width:100%;margin-top:10px; text-align: center; color: white; font-size: 10px; font-family: Montserrat; font-weight:400; word-wrap: break-word;"> 
     Voimassa vain keskiyöhön asti!</div>
</div></div>`
    : ' '
}
</div>



      </div> 
   
      `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    const observer = new MutationObserver((mutationsList, observer) => {
      // Check if the 'rules-table-container-pigu' and 'control-button' have been added to the DOM
      const rulesTableContainer = document.getElementById('rules-table-container-pigu');
      const closeBtn = document.getElementById('boomio-game-play-again');

      if (rulesTableContainer && closeBtn) {
        // Element found, add event listener to 'control-button'
        closeBtn.addEventListener('click', () => {
          rulesTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          setTimeout(() => {
            rulesTableContainer.style.height = '10px';
            rulesTableContainer.style.top = 'calc(50% + 330px)';
            rulesTableContainer.style.opacity = 0;
          }, 100);
          setTimeout(() => {
            rulesTableContainer.style.display = 'none';
          }, 1000);
        });

        // Stop observing once the elements are found and event listener is added
        observer.disconnect();
      }
    });

    // Start observing the DOM for changes in child elements
    observer.observe(document.body, { childList: true, subtree: true });

    function showCompetitionTableContainer() {
      const rulesTableContainer = document.querySelector('.rules-table-container-pigu');
      rulesTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      rulesTableContainer.style.display = 'block';
      setTimeout(() => {
        rulesTableContainer.style.height = '150px';
        rulesTableContainer.style.top = 'calc(50% + 30px)';
        rulesTableContainer.style.opacity = 1;
      }, 100);
    }
    if (this.prop === 'Pigu.lt') {
      const observer = new MutationObserver((mutationsList, observer) => {
        // Check if the element has been added to the DOM
        const startRulesButton = document.getElementById('startCodeRulesButtonClick');
        if (startRulesButton) {
          // Element found, add event listener
          startRulesButton.addEventListener('click', showCompetitionTableContainer);
          // Stop observing once the element is found
          observer.disconnect();
        }
      });

      // Start observing the DOM for changes
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.getElementById('boomio-copy-modal-btn')) {
      document.getElementById('boomio-copy-modal-btn').onclick = () => {
        const textToCopy = this.userDiscountCode;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const copyButton = document.getElementById('p_code_text2');
        copyButton.textContent = 'Copied';

        setTimeout(() => {
          copyButton.textContent = this.userDiscountCode;
        }, 2000);
      };
    }
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
