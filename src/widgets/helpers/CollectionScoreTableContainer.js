import './styles.css';

import { boomioLogo } from './constants';

export class CollectionScoreTableContainer {
  constructor(prop, collectables, collection, just_won) {
    this.prop = prop;
    this.collectables = collectables;
    this.collection = collection;
    this.just_won = just_won;
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null;
    this.render();
  }

  updateProps(prop, collectables, collection, just_won) {
    this.prop = prop;
    this.collectables = collectables;
    this.collection = collection;
    this.just_won = just_won;
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    let tableHTML = '';
    this.collectables?.forEach((item, index) => {
      if (index % 4 === 0) {
        tableHTML += '<tr style="border-spacing:2px;border-collapse:separate">';
      }

      const isInCollection = this.collection?.includes(item?.period_id);
      const divStyle = isInCollection ? '' : 'border-radius:20px;background:white;';
      const imgStyle = isInCollection ? '' : 'opacity:0.1;';

      tableHTML += `
        <td style="text-align: center; border: none;">
        <div id="image-${index}" style="${divStyle}">
        <img class='image-container' style="${imgStyle}" src=${item.url} alt="Scoreboard Image" >
        </div>
        </td>`;

      if ((index + 1) % 4 === 0 || index === this.collectables.length - 1) {
        tableHTML += '</tr>';
      }
    });

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    let fontSize =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.customer.includes('Gamtos Ateitis') ||
      this.prop === 'LemonGym'
        ? '14px'
        : '10px';
    let fontWeight =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Fantazijos' ||
      this.customer.includes('Gamtos Ateitis') ||
      this.prop === 'LemonGym'
        ? '900'
        : '700';
    let scoreboardText = `
      ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.customer.includes('Gamtos Ateitis') ||
        this.prop === 'LemonGym'
          ? this.collectables?.user_best_place <
              (this.prop === 'Barbora' ? 0 : this.prop === 'LemonGym' ? 11 : 30) ||
            this.prop === 'Barbora' ||
            this.prop === 'Fantazijos'
            ? `<div style="width:100%; top: ${'440px'}; position: absolute; text-align: center; color: white; font-size: ${
                this.prop === 'Barbora' ? '18px' : fontSize
              }; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'DOVANA tau!'
                  : this.prop === 'Fantazijos'
                  ? '2024.06.09 ŠVENČIANT NACIONALINĘ 69 DIENĄ'
                  : 'Valio, tau puikiai sekasi!'
              }</div>
            <div style="width:100%; top: ${'470px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${
                this.prop ? '10px' : '10px'
              } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'Pirk <a style="color:white" target="_blank" href="https://www.barbora.lt/">Barbora.lt</a>, nuolaidos kodo laukelyje vesk <b style="font-weight:900;font-size:18px;background-color:#FFC727;"> </br>GIMTADIENIS&apos;</b> ir gauk dovanų!'
                  : this.prop === 'Fantazijos'
                  ? 'net 69 geriausi žaidėjai laimės prizus! </br>Apie laimėjimą sužinosi savo nurodytu el. paštu.'
                  : this.prop === 'LemonGym'
                  ? 'Mėnesio gale 11 geriausių žaidėjų laimės</br> Lemon Gym PREMIUM PLUS  narystes!'
                  : ''
              }</div>
              <div style="width:100%; top: ${'510px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${
                this.prop ? '10px' : '10px'
              } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Fantazijos'
                  ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div><a style="background-color:#FD7A77;font-size:14px">69diena</a></div>`
                  : ''
              }</div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: white; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? '(Galioja pristatymams iki 04 14 d.)'
                : this.prop === 'Fantazijos'
                ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                : 'Apie laimėjimą informuosime nurodytu el. paštu.'
            } </div> `
            : `<div style="width:100%; top: 440px; position: absolute; text-align: center; color: white; font-size: ${fontSize}; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? 'Pagerink rezultatą ir laimėk </br>Barbora gimtadienio dovaną iškart!'
                  : 'Tu gali!'
              }</div>
            <div style="width:100%; top: 470px;line-height:18px; position: absolute; text-align: center; color: white; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? ''
                : this.prop === 'LemonGym'
                ? 'Pagerink rezultatą nes mėnesio gale 11 geriausių žaidėjų laimės</br>Lemon Gym PREMIUM PLUS  narystes!'
                : this.prop === 'Penki Sezonai'
                ? 'Pagerink rezultatą nes balandžio 1d.'
                : 'Pagerink rezultatą nes 2024. 06. 09 d.</br>net 69 geriausi žaidėjai laimės prizus!'
            }</div>
              <div style="width:100%; top: ${'510px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${
                this.prop ? '10px' : '10px'
              } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Fantazijos'
                  ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div ><a style="background-color:#FD7A77; font-size:14px">69diena</a></div>`
                  : ''
              }</div>
              <div style="width:100%; top: 546px; position: absolute; text-align: center; color: white; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
                this.prop === 'Barbora'
                  ? '(Galioja pristatymams iki 04 14 d.)'
                  : this.prop === 'Fantazijos'
                  ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                  : 'Apie laimėjimą informuosime nurodytu el. paštu.'
              } </div>
        `
          : ''
      }
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
    this.addfunc();
  }

  addfunc() {
    // Attach event listeners after the images are added to the DOM
    for (let index = 0; index < this.collectables?.length; index++) {
      const image = document.getElementById(`image-${index}`);
      if (image && window.getComputedStyle(image).backgroundColor !== 'rgb(255, 255, 255)') {
        image.addEventListener('click', () => {
          this.handleImageClick(image);
        });
      }
    }
  }
  handleImageClick(image) {
    // Toggle a class to make the image larger and centered
    image.classList.toggle('enlarge-image');

    // Toggle the class for each child element of the clicked image
    const children = image.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.toggle('enlarge-image');
    }

    // Add event listener to handle clicking outside of the enlarged image to revert it back to normal size
    document.addEventListener('click', function closeImage(event) {
      if (!image.contains(event.target)) {
        image.classList.remove('enlarge-image');
        for (let i = 0; i < children.length; i++) {
          children[i].classList.remove('enlarge-image');
        }
        document.removeEventListener('click', closeImage);
      }
    });
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('competition-table-container');
    containerDiv.setAttribute('id', 'competition-table-container');
    containerDiv.style.background = 'none';
    // containerDiv.style.border = this.prop === 'Penki Sezonai' && '2px solid #A6CE39';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '380px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: 52px; position: absolute; text-align: center; color: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; font-size: 40px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${'REZULTATAI'}</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
      <div  style="margin-left:14px;height: ${'302px'}; top: 114px; position: absolute; border-right:none;">
        <div class="boomio-custom-scrollbar">
          <table style="margin:10px;border-spacing:3px;border-collapse:separate">
            <tbody class="boomio-tbody">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:575px;position:absolute; height: 38px; background: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-game-play-again">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">ŽAISK DAR KARTĄ</div>
      </div>

      <div style="left:calc(50% - 40px);width:78px;top:625px;position:absolute;margin-top:5px;height: 22px; background: url(${boomioLogo}); justify-content: center; align-items: center; display: flex;background-size: contain;background-repeat:no-repeat;" id="boomio-game-play-again">
      </div>
    </div>`;
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
