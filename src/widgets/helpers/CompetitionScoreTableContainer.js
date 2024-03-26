import './styles.css';

import { boomioLogo } from './constants';

export class CompetitionScoreTableContainer {
  constructor(prop, scoreTable) {
    this.prop = prop;
    this.scoreTable = scoreTable; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null; // Store container reference
    this.render();
  }

  updateProps(prop, scoreTable) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
    // Update styles
    const scoreboard = this.scoreTable.scoreboard || [];
    const userBestPlace = parseInt(this.scoreTable.user_best_place);
    const userBestScore = parseInt(this.scoreTable.user_best_score);

    let tableHTML = '';
    scoreboard.forEach((item, index) => {
      const background = index + 1 === userBestPlace ? 'rgba(255, 255, 255, 1)' : 'none';

      const color =
        index + 1 === userBestPlace
          ? this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
            ? 'rgba(61, 73, 40, 1)'
            : 'white'
          : this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
          ? 'white'
          : 'white';
      const boxShadow =
        index + 1 === userBestPlace ? '2px 4px 3.4px 0px rgba(0, 0, 0, 0.10) inset' : 'none';

      tableHTML += `
            <tr style="background: ${background};box-shadow:${boxShadow};margin: 0;height:44px ">
            <td style="padding-left:17px;text-align:start;width: 25px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${item.place}</td>
              <td style="padding-left:17px;text-align:start;width: 142px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${item.user_name}</td>
              <td style="width: 48px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">${item.score}</td>
            </tr>`;
    });

    // Add new line if user_best_place is above 20
    if (userBestPlace > 20) {
      tableHTML += `
            <tr style="background: rgba(255, 255, 255, 1);box-shadow:none;margin: 0;height:44px ">
            <td style="padding-left:17px;text-align:start;width: 25px; color: rgba(61, 73, 40, 1); border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${userBestPlace}</td>

              <td style="padding-left:17px;text-align:start;width: 142px; color: ${
                this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
                  ? 'rgba(61, 73, 40, 1)'
                  : 'white'
              }; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
        playerNameInput?.value
      }</td>
              <td style="width: 48px; color: ${
                this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
                  ? 'rgba(61, 73, 40, 1)'
                  : 'white'
              }; border: none;font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">${userBestScore}</td>
            </tr>`;
    }

    let textColor =
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? 'white'
        : 'white';
    let fontSize =
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? '14px'
        : '10px';
    let fontWeight =
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? '900'
        : '700';

    let scoreboardText = `
      ${
        this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
          ? true
            ? `<div style="width:100%; top: 495px; position: absolute; text-align: center; color: ${textColor}; font-size: ${fontSize}; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora' ? 'DOVANA tau!' : 'Valio, tau puikiai sekasi!'
              }</div>
            <div style="width:100%; top: 524px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'Pirk <a target="_blank" href=https://www.barbora.lt/>Barbora.lt</> ir su kodu GIMTADIENIS gauk dovanų!'
                  : this.prop === 'Penki Sezonai'
                  ? 'Balandžio 1 d. 5 geriausi žaidėjai laimės prizus!'
                  : 'Balandžio 5 d.  net 30 geriausių žaidėjų laimės prizus!'
              }</div>
            <div style="width:100%; top: 540px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? '(Kodas galioja iki 04 14 d.)'
                  : this.prop === 'Penki Sezonai'
                  ? 'Apie laimėjimą informuosime nurodytu el. paštu. '
                  : 'Apie laimėjimą informuosime nurodytu el. paštu. '
              } </div> `
            : `<div style="width:100%; top: 495px; position: absolute; text-align: center; color: ${textColor}; font-size: ${fontSize}; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora' ? 'DOVANA tau!' : 'Tu gali!'
              }</div>
            <div style="width:100%; top: 524px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'Pagerink rezultatą ir laimėk Barbora '
                  : this.prop === 'Penki Sezonai'
                  ? 'Pagerink rezultatą nes balandžio 1d.'
                  : 'Pagerink rezultatą nes balandžio 5d.'
              }</div>
            <div style="width:100%; top: 536px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'gimtadienio dovaną iškart!'
                  : this.prop === 'Penki Sezonai'
                  ? '5 geriausi žaidėjai laimės prizus!'
                  : 'net 30 geriausių žaidėjų laimės prizus!'
              }</div> `
          : ''
      }
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background =
      this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
        ? 'none'
        : 'linear-gradient(0deg, rgba(0, 0, 0, 0.19), rgba(0, 0, 0, 0.19)),linear-gradient(166.42deg, rgba(255, 49, 131, 0.9) 9.98%, rgba(101, 123, 234, 0.9) 96.82%)';
    // containerDiv.style.border = this.prop === 'Penki Sezonai' && '2px solid #A6CE39';

    containerDiv.style.width =
      document.body.offsetWidth < 426 ? document.body.offsetWidth + 'px' : '426px';

    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: 52px; position: absolute; text-align: center; color: ${
        this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
          ? 'white'
          : 'white'
      }; font-size: 40px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-competition-scoreboard-name">REZULTATAI</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
              


      <div  style="width: calc(100% - 56px); height: 352px; left: 32px; top: 124px; position: absolute; background: rgba(255, 255, 255, 0.20); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius:20px;border-right:none; backdrop-filter: blur(4px)">
        <div style="overflow-x:hidden;overflow-y: scroll; height: calc(100% - 60px);margin-right:5px; margin-top:20px;" class="boomio-custom-scrollbar">
          <table style="margin-left:2px;width: 100%;padding-top:20px;padding-bottom:20px;border-collapse: collapse;" >
            <tbody class="boomio-tbody">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:570px;position:absolute; height: 46px; background: ${
        this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-competition-play-again">
        <div style="text-align: center; color: ${
          this.prop === 'Barbora' || this.prop === 'Penki Sezonai' || this.prop === 'Babune'
            ? 'rgba(61, 73, 40, 1)'
            : '#FF3183'
        } ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">PAGERINK REZULTATĄ</div>
      </div>

      <div style="left:calc(50% - 40px);width:80px;top:625px;position:absolute;height: 45px; background: url(${boomioLogo}); justify-content: center; align-items: center; display: flex;background-size: contain; " id="boomio-competition-play-again">
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
