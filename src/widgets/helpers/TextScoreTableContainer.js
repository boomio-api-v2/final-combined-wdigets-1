import './styles.css';
import { boomioLogo } from './constants';

export class TextScoreTableContainer {
  constructor(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.isMobile = window.innerWidth <= 1280;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;
    this.containerDiv = null; // Store container reference
    this.render();
  }

  updateProps(prop, scoreTable, currentScore) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.currentScore = currentScore;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;

    const userPercentageDiscount = parseInt(this?.scoreTable?.best_discount) || 0;
    const userDiscountCode = this?.scoreTable?.coupon_code || '';

    // Build table HTML
    let tableHTML = '';
    tableHTML += '<div>';
    tableHTML +=
      this.currentScore >= 1000
        ? `
          <div id='boomio-your-score' style="margin-bottom:10px;width:100%;margin-top:-110px;top:30px;position:absolute; text-align: center; color: white; font-size: 20px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight:400; text-transform: uppercase; word-wrap: break-word">
            TAVO REZULTATAS:  ${this.currentScore ?? 0}
          </div>
          <div style="width:100%; top: -50px; position: absolute; text-align: center; color: white; font-size: 30px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight: 900; text-transform: uppercase; word-wrap: break-word">
            SVEIKINAME!
          </div>
          <div style="width:100%;text-align: center; color: white; font-size:18px;font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight:800; text-transform: uppercase; word-wrap: break-word">
          </div>
          <div style="width:100%;font-weight:700;margin-top:50px;text-align: center; color: #76F99C; font-size: 16px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:22px;">
            Surinkai virš 1000 taškų ir pretenduoji </br> laimėti šios savaitės prizą:
          </div>
          <div style="width:100%;margin-top:40px;font-weight:700;text-align: center; color: #76F99C;text-transform: uppercase; font-size: 24px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:28px;">
            10 EUR VERTĖS „WOLT“ </br> dovanų kuponĄ.
          </div>
          <div style="width:100%;margin-top:40px;text-align: center; color: white; font-size: 14px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:18px;">
            Kiekvieną savaitę atsitiktiniu būdu atrinksime </br> <strong>NET 20 LAIMĖTOJŲ!</strong>
          </div>
        `
        : `
          <div id='boomio-your-score' style="margin-bottom:10px;width:100%;margin-top:-110px;top:30px;position:absolute; text-align: center; color: white; font-size: 20px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight:400; text-transform: uppercase; word-wrap: break-word">
            TAVO REZULTATAS:  ${this.currentScore ?? 0}
          </div>
          <div style="width:100%; top: -50px; position: absolute; text-align: center; color: white; font-size: 30px;line-height:34px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight: 900; text-transform: uppercase; word-wrap: break-word">
            TIKRAI GALI KILTI AUKŠČIAU!
          </div>
          <div style="width:100%;text-align: center; color: white; font-size:18px;font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; font-weight:800; text-transform: uppercase; word-wrap: break-word">
          </div>
          <div style="width:100%;font-weight:700;margin-top:50px;text-align: center; color: #76F99C; font-size: 16px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:22px;">
            Surink 1000 ar daugiau taškų </br> ir pretenduok laimėti:
          </div>
          <div style="width:100%;margin-top:40px;font-weight:700;text-align: center;text-transform: uppercase; color: #76F99C; font-size: 24px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:28px;">
            10 EUR VERTĖS „WOLT“ </br> dovanų kuponĄ.
          </div>
          <div style="width:100%;margin-top:40px;text-align: center; color: white; font-size: 14px; font-family: ${
            this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'
          }; word-wrap: break-word;line-height:18px;">
            Kiekvieną savaitę atsitiktiniu būdu atrinksime </br><strong>NET 20 LAIMĖTOJŲ!</strong>
          </div>
        `;
    tableHTML += '</div>';

    this.containerDiv.querySelector('.boomio-tbody-boomio').innerHTML = tableHTML;

    let fontWeight = '700';

    let scoreboardText = `
      <div style="width:calc(100% - 40px);
                  margin-left:20px;
                  top: 420px;
                  margin-top:10px;
                  position: absolute;
                  text-align: center;
                  color: white;
                  font-size: 14px;
                  font-family: ${this.prop === 'Perlas GO' ? 'Basis Grotesque Pro' : 'Montserrat'};
                  font-weight: ${fontWeight};
                  word-wrap: break-word">
        ${
          this.currentScore >= 1000
            ? '<div style="font-weight:400;">Jei pateksi tarp laimingųjų, informuosime tave </br> registracijos metu nurodytu el. paštu.</div>'
            : '<div style="font-weight:400;">Jei pateksi tarp laimingųjų, informuosime tave </br> registracijos metu nurodytu el. paštu.</div>'
        }
      </div>



      <div style="left:calc(50% - 40px);
                  width:78px;
                  top:625px;
                  position:absolute;
                  margin-top:5px;
                  height: 22px;
                  background: url(${boomioLogo});
                  justify-content: center;
                  align-items: center;
                  display: flex;
                  background-size: contain;
                  background-repeat:no-repeat;">
      </div>
    `;

    // Insert scoreboard text into .boomio-scoreboard-text
    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    // (Re)Insert tableHTML one more time if needed:
    // this.containerDiv.querySelector('.boomio-tbody-boomio').innerHTML = tableHTML;
    // (But it’s typically not needed to set it again.)
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';

    // Build the HTML in one shot, ensuring valid markup:
    containerDiv.innerHTML = `
      <div style="width: 100%; height: 100%; position: relative;">
        <div class="boomio-scoreboard-text"></div>
        <div style="width: calc(100% - 40px);
                    height: 280px;
                    left: 20px;
                    top: 124px;
                    position: absolute;
                    border-right:none;
                    backdrop-filter: blur(4px);">
          <div>
            <div class="boomio-tbody-boomio"></div>
          </div>
                  </div>
<div style="
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
  top: 510px;
  position: absolute;
  height: 46px;
  background: white;
  box-shadow: -4px -4px 8px #DFE6F5 inset;
  border-radius: 35px;
  display: flex;
  display:${campaignUrl ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  pointer-events: auto; /* Ensure the container receives taps */
      target="_blank"
      onclick="window.open('${'https://savitarna.perlasgo.lt/login?utm_source=boomio&utm_medium=game&utm_campaign=boomio_gamification_campaign'}', '_blank');"
">
  <a

    style="
      text-align: center;
      color: rgba(61, 73, 40, 1);
      font-size: 20px;
      font-family: 'Basis Grotesque Pro', sans-serif;
      font-weight: 700;
      line-height: 24px;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
    "

    rel="noopener noreferrer"
  >
    Registruotis „Perlas Go“
  </a>
</div>
              <div style="width: calc(100% - 40px);
                  margin-left:20px;
                  margin-right:20px;
                  top:575px;
                  position:absolute;
                  height: 46px;
                  background: white;
                  cursor:pointer;
                  box-shadow: -4px -4px 8px #DFE6F5 inset;
                  border-radius: 35px;
                  overflow: hidden;
                  justify-content: center;
                  align-items: center;
                  gap: 10px;
                  display: flex"
           id="boomio-game-play-again">
           
        <div style="text-align: center;
                    color: rgba(61, 73, 40, 1);
                    font-size: 20px;
                    font-family: Basis Grotesque Pro;
                    font-weight: 700;
                    line-height: 24px;
                    word-wrap: break-word;">
          PAGERINK REZULTATĄ
   
      </div>
      </div>     </div>
    `;

    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('collection-table-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
