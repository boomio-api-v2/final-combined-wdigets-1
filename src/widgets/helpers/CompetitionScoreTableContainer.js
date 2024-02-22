import './styles.css';

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
          ? this.prop === 'barbora'
            ? 'red'
            : this.prop === 'penki'
            ? '#00B5AC'
            : '#3BAF29'
          : this.prop === 'barbora'
          ? '#3BAF29'
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
            <tr style="background: none;box-shadow:none;margin: 0;height:44px ">
            <td style="padding-left:17px;text-align:start;width: 25px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${userBestScore}</td>

              <td style="padding-left:17px;text-align:start;width: 142px; color: ${
                this.prop === 'barbora' ? 'red' : 'white'
              }; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
        playerNameInput?.value
      }</td>
              <td style="width: 48px; color: ${
                this.prop === 'barbora' ? 'red' : 'white'
              }; border: none;font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">${userBestScore}</td>
            </tr>`;
    }

    this.containerDiv.querySelector('tbody').innerHTML = tableHTML;
  }

  render() {
    console.log(this.prop);

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background =
      this.prop === 'barbora'
        ? 'white'
        : this.prop === 'penki'
        ? 'none'
        : 'linear-gradient(0deg, rgba(0, 0, 0, 0.19), rgba(0, 0, 0, 0.19)),linear-gradient(166.42deg, rgba(255, 49, 131, 0.9) 9.98%, rgba(101, 123, 234, 0.9) 96.82%)';
    // containerDiv.style.border = this.prop === 'penki' && '2px solid #A6CE39';

    containerDiv.style.width =
      document.body.offsetWidth < 420 ? document.body.offsetWidth + 'px' : '420px';

    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: 52px; position: absolute; text-align: center; color: ${
        this.prop === 'barbora' ? '#3BAF29' : this.prop === 'penki' ? '#00B5AC' : 'white'
      }; font-size: 48px; font-family: Oswald; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-competition-scoreboard-name">REZULTATAI</div>
      <div  style="width: calc(100% - 56px); height: 412px; left: 32px; top: 144px; position: absolute; background: rgba(255, 255, 255, 0.20); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius:20px;border-right:none; backdrop-filter: blur(4px)">
        <div style="overflow-x:hidden;overflow-y: scroll; height: calc(100% - 60px);margin-right:5px; margin-top:20px;" class="custom-scrollbar">
          <table style="margin-left:2px;width: 100%;padding-top:20px;padding-bottom:20px;border-collapse: collapse;" >
            <tbody >
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:590px;position:absolute; height: 46px; background: ${
        this.prop === 'barbora' ? '#3BAF29' : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-competition-play-again">
        <div style="text-align: center; color: ${
          this.prop === 'barbora' ? 'white' : this.prop === 'penki' ? '#00B5AC' : '#FF3183'
        } ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">ŽAISK DAR KARTĄ</div>
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