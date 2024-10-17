import './styles.css';

import {
  boomioLogo,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12,
  item13,
  item14,
  item15,
  item16,
  item17,
  item18,
  item19,
  item20,
  item21,
  item22,
  item23,
  item1Paper,
  item2Paper,
  item3Paper,
  item4Paper,
  item5Paper,
  item6Paper,
  item7Paper,
  item8Paper,
  item9Paper,
  item10Paper,
  item11Paper,
  item12Paper,
  item13Paper,
  item14Paper,
  item15Paper,
  item16Paper,
  item17Paper,
  item18Paper,
  item19Paper,
  item20Paper,
  item21Paper,
  item22Paper,
  item23Paper,
  item1Glass,
  item2Glass,
  item3Glass,
  item4Glass,
  item5Glass,
  item6Glass,
  item7Glass,
  item8Glass,
  item9Glass,
  item10Glass,
  item11Glass,
  item12Glass,
  item13Glass,
  item14Glass,
  item15Glass,
  item16Glass,
  item17Glass,
  item18Glass,
  item19Glass,
  item20Glass,
  item21Glass,
  item22Glass,
  item23Glass,
  item1PienoZvaigzdes,
  item2PienoZvaigzdes,
  item5PienoZvaigzdes,
  item7PienoZvaigzdes,
  item8PienoZvaigzdes,
  item15PienoZvaigzdes,
} from './constants';

export class DidYouKnowContainer {
  constructor(prop) {
    this.prop = prop;
    if (this.prop && this.prop.includes('Plastic')) {
      this.collectables = [
        item16,
        item4,
        item14,
        item1,
        item23,
        item20,
        item10,
        item8,
        item6,
        item12,
        item19,
        item7,
      ];
    } else if (this.prop && this.prop.includes('Paper')) {
      // Handle Paper collectables
      this.collectables = [
        item16Paper,
        item4Paper,
        item14Paper,
        item1Paper,
        item23Paper,
        item20Paper,
        item10Paper,
        item8Paper,
        item6Paper,
        item12Paper,
        item19Paper,
        item7Paper,
      ];
    } else if (this.prop && this.prop.includes('Glass')) {
      // Handle Glass collectables
      this.collectables = [
        item16Glass,
        item4Glass,
        item14Glass,
        item1Glass,
        item23Glass,
        item20Glass,
        item10Glass,
        item8Glass,
        item6Glass,
        item12Glass,
        item19Glass,
        item7Glass,
      ];
    } else if (this.prop === 'Pieno Žvaigždės') {
      // Handle Glass collectables
      this.collectables = [
        item15PienoZvaigzdes,
        item1PienoZvaigzdes,
        item8PienoZvaigzdes,
        item2PienoZvaigzdes,
        item7PienoZvaigzdes,
        item5PienoZvaigzdes,
      ];
    }

    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null;
    this.render();
  }

  // Update properties method
  updateProps(prop) {
    this.prop = prop;

    if (this.prop && this.prop.includes('Plastic')) {
      // Handle Gamtos Ateitis collectables
      this.collectables = [
        item16,
        item4,
        item14,
        item1,
        item23,
        item20,
        item10,
        item8,
        item6,
        item12,
        item19,
        item7,
      ];
    } else if (this.prop && this.prop.includes('Paper')) {
      // Handle Paper collectables
      this.collectables = [
        item16Paper,
        item4Paper,
        item14Paper,
        item1Paper,
        item23Paper,
        item20Paper,
        item10Paper,
        item8Paper,
        item6Paper,
        item12Paper,
        item19Paper,
        item7Paper,
      ];
    } else if (this.prop && this.prop.includes('Glass')) {
      // Handle Glass collectables
      this.collectables = [
        item16Glass,
        item4Glass,
        item14Glass,
        item1Glass,
        item23Glass,
        item20Glass,
        item10Glass,
        item8Glass,
        item6Glass,
        item12Glass,
        item19Glass,
        item7Glass,
      ];
    } else if (this.prop === 'Pieno Žvaigždės') {
      // Handle Glass collectables
      this.collectables = [
        item15PienoZvaigzdes,
        item1PienoZvaigzdes,
        item8PienoZvaigzdes,
        item2PienoZvaigzdes,
        item7PienoZvaigzdes,
        item5PienoZvaigzdes,
      ];
    }

    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    let tableHTML = '';
    this.collectables?.forEach((item, index) => {
      if (index % 3 === 0) {
        tableHTML += '<tr style="border-spacing:2px;border-collapse:separate">';
      }

      tableHTML += `
        <td style="padding:5px;text-align: center; border: none;">
        <div id="image-${index}" style="border-radius:20px;">
        <img class='image-container' style='opacity:1;width:${
          this.prop === 'Pieno Žvaigždės' ? '100px' : '60px'
        };height:${
        this.prop === 'Pieno Žvaigždės' ? '100px' : '60px'
      }' src=${item} alt="Scoreboard Image" >
        </div>
        </td>`;

      if ((index + 1) % 3 === 0 || index === this.collectables.length - 1) {
        tableHTML += '</tr>';
      }
    });

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    let scoreboardText = `
      ${`<div style="width:100%; top: ${'505px'};line-height:18px; position: absolute;font-weight: 700; text-align: center; color: white; font-size:${'12px'} ; font-family: Montserrat;  word-wrap: break-word">${
        this.prop.includes('Gamtos Ateitis')
          ? `Šių atliekų negalima mesti į
${
  this.prop === 'Gamtos Ateitis Paper'
    ? 'popieriui'
    : this.prop === 'Gamtos Ateitis Plastic'
    ? 'plastikui'
    : this.prop === 'Gamtos Ateitis Glass' && 'stiklui'
} skirtus konteinerius.`
          : 'SU MIAU GYVENT LINKSMIAU!'
      }</div>
              <div style="width:100%; top: ${'525px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${
        this.prop === 'Pieno Žvaigždės' ? '16px' : '12px'
      } ; font-family: Montserrat; font-weight: 400;  word-wrap: break-word">${
        this.prop === 'Pieno Žvaigždės'
          ? 'Daugiau “MIAU” produktų rasi'
          : 'Daugiau apie tinkamą  rūšiavimą sužinosi puslapyje'
      }</div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: white; font-size: 14px; font-family: Montserrat; font-weight: 700;  word-wrap: break-word;text-decoration: underline;"><a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="${
    this.prop === 'Pieno Žvaigždės'
      ? 'https://pienozvaigzdes.lt/lt/20_miau'
      : 'https://gamtosateitis.lt/rusiavimo-abc'
  }" 
  style="color:white">
  ${this.prop === 'Pieno Žvaigždės' ? 'DAUGIAU MIAU' : 'https://gamtosateitis.lt/rusiavimo-abc/'}
</a> </div> `}
    `;

    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
    this.addfunc();
  }

  addfunc() {
    // Attach event listeners after the images are added to the DOM
    // for (let index = 0; index < this.collectables?.length; index++) {
    //   const image = document.getElementById(`image-${index}`);
    //   if (image && window.getComputedStyle(image).backgroundColor !== 'rgb(255, 255, 255)') {
    //     image.addEventListener('click', () => {
    //       this.handleImageClick(image);
    //     });
    //   }
    // }
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
    containerDiv.classList.add('did-you-know-container');
    containerDiv.setAttribute('id', 'did-you-know-container');
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
      <div style="width:100%;top: 52px; position: absolute; text-align: center;line-height:42px; color: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; font-size: 40px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${
      this.prop === 'Pieno Žvaigždės' ? 'Ar visus RAGAVAI?' : 'Ar žinojai?'
    }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
      <div  style="width:100%;height: ${'302px'}; top: ${
      this.prop === 'Pieno Žvaigždės' ? '174px' : '114px'
    }; position: absolute; border-right:none;">
        <div class="boomio-custom-scrollbar">
          <table style="margin:10px;border-spacing:3px;width:100%;border-collapse:separate">
            <tbody class="boomio-tbody">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:595px;position:absolute; height: 46px; background: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-close-did-you-know">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">TOLIAU</div>
      </div>
    </div>`;
    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('did-you-know-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
