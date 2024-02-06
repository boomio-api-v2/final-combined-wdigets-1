import './styles.css';

export class CompetitionTableContainer {
  createTestDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');

    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; background: linear-gradient(0deg, 0%, 100%); box-shadow: 10px 10px 20px rgba(151.28, 130.74, 227.37, 0.60) inset; border-top-left-radius: 30px; border-top-right-radius: 30px;  backdrop-filter: blur(10px)">
    <div style="width:100%;top: 62px; position: absolute; text-align: center; color: white; font-size: 48px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word">Scoreboard</div>
    <div style="width: 379px; height: 412px; left: 32px; top: 144px; position: absolute; background: rgba(255, 255, 255, 0.40); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius: 20px; border: 2px #FF3183 solid; backdrop-filter: blur(4px)"></div>
    <div style="width: 375px; height: 44px; left: 34px; top: 169px; position: absolute; background: white; box-shadow: 2px 4px 3.4000000953674316px rgba(0, 0, 0, 0.10) inset; border: 1px solid"></div>
    <div style="width: 142px; left: 51px; top: 178px; position: absolute; color: #FF3183; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 48px; left: 334px; top: 178px; position: absolute; color: #FF3183; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="width: 142px; left: 51px; top: 223px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 48px; left: 334px; top: 223px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="width: 225px; left: 51px; top: 280px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 225px; left: 51px; top: 332px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 225px; left: 51px; top: 384px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 225px; left: 51px; top: 437px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="width: 225px; left: 51px; top: 486px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">Lorem ipsum</div>
    <div style="left: 334px; top: 273px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="left: 334px; top: 325px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="left: 334px; top: 377px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="left: 334px; top: 430px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="left: 334px; top: 486px; position: absolute; color: white; font-size: 18px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word">1234</div>
    <div style="width: 8px; height: 295px; padding-top: 2px; padding-bottom: 268px; padding-left: 1px; padding-right: 1px; left: 401px; top: 180px; position: absolute; background: #FCFCFC; border-radius: 13px; border-left: 1px solid; border-right: 1px solid; flex-direction: column; justify-content: flex-start; align-items: center; display: inline-flex">
    <div style="width: 6px; height: 25px; background: #FF3183; border-radius: 100px"></div>
    </div>
    <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:600px;position:absolute; height: 46px; background: white; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex">
<div style="text-align: center; color: #FF3183; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word">PLAY AGAIN</div>
</div>
    </div>      `;

    return containerDiv;
  }
}
