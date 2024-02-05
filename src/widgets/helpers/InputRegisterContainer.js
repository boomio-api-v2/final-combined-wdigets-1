import './styles.css';
export class InputRegisterContainer {
  createTestDiv() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-register-container');
    containerDiv.setAttribute('id', 'input-register-container');

    containerDiv.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        padding-top: 25px;
        padding-bottom: 35px;
        background: white;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 19px;
        display: inline-flex;
      ">
        <div style="
          padding-left: 20px;
          padding-right: 20px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          display: flex;
        ">
          <div style="
            align-self: stretch;
            text-align: center;
            color: white;
            font-size: 32px;
            font-family: Poppins;
            font-weight: 900;
            text-transform: uppercase;
            line-height: 41.60px;
            word-wrap: break-word;
          ">
            <img style="width:179px;height:60px" src="YOUR_IMAGE_SOURCE" alt="Image Description">
          </div>
          <div style="
            width: 320px;
            color: white;
            font-size: 16px;
            font-family: Poppins;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 35.20px;
            word-wrap: break-word;
            text-align:start;
          ">
            <img src="YOUR_SECOND_IMAGE_SOURCE" alt="Image Description" style="width:100%;height:100%">
          </div>
        </div>
      </div>
    `;

    return containerDiv;
  }
}
