import './styles.css';

export class CompetitionScoreTableContainer {
  createCompetitionScoreTableContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');

    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; background: linear-gradient(0deg, 0%, 100%); box-shadow: 10px 10px 20px rgba(151.28, 130.74, 227.37, 0.60) inset; backdrop-filter: blur(10px)">
      <div style="width:100%;top: 62px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Oswald; font-weight: 900; text-transform: uppercase; word-wrap: break-word">Scoreboard</div>
      <div  style="width: 379px; height: 412px; left: 32px; top: 144px; position: absolute; background: rgba(255, 255, 255, 0.20); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius:20px;border-right:none; backdrop-filter: blur(4px)">
        <div style="overflow-y: scroll; height: calc(100% - 60px);margin-right:5px; margin-top:20px;" class="custom-scrollbar">
          <table style="width: 100%;padding-top:20px;padding-bottom:20px;border-collapse: collapse;" >
            <tbody >
    `;

    const data = [
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
      { label: 'Lorem ipsum', value: 1234 },
    ];

    data.forEach((item, index) => {
      const background = index === 1 ? 'rgba(255, 255, 255, 1)' : 'none';
      const color = index === 1 ? 'red' : 'white';
      const boxShadow = index === 1 ? '2px 4px 3.4px 0px rgba(0, 0, 0, 0.10) inset' : 'none';

      containerDiv.querySelector('tbody').innerHTML += `
            <tr style="background: ${background};box-shadow:${boxShadow};margin: 0;height:44px ">
              <td style="padding-left:17px;text-align:start;width: 142px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${item.label}</td>
              <td style="width: 48px; color: ${color}; border: none;font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">${item.value}</td>
            </tr>`;
    });

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:590px;position:absolute; height: 46px; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-competition-play-again">
        <div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word ">PLAY AGAIN</div>
      </div>
    </div>`;

    return containerDiv;
  }
}
