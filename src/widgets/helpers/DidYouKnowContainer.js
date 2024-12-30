import './styles.css';
import { localStorageService } from '@/services';
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
  item1pegasas,
  item2pegasas,
  item3pegasas,
  item4pegasas,
  item5pegasas,
  item6pegasas,
  item7pegasas,
  item8pegasas,
  item9pegasas,
  item10pegasas,
  item11pegasas,
  item12pegasas,
  closeDidYouKnow,
} from './constants';

export class DidYouKnowContainer {
  constructor(prop) {
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    this.dynamicData = this.config.dynamicData ? this.config.dynamicData : null;

    const currentPageUrl = window.location.href;
    this.isSmallMobile = window.innerWidth <= 380;

    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    this.isMobileWidthSmall = window.innerWidth <= 400;

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    this.user_id = urlParams.get('user_id');

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
    } else if (this.prop === 'Pegasas') {
      // Handle Glass collectables
      this.collectables = [
        item1pegasas,
        item2pegasas,
        item3pegasas,
        item4pegasas,
        item5pegasas,
        item6pegasas,
        item7pegasas,
        item8pegasas,
        item9pegasas,
        item10pegasas,
        item11pegasas,
        item12pegasas,
      ];
    }
    this.collectablesLinks = [];
    if (this.prop === 'Pigu.lt') {
      this.collectablesLinks = this.dynamicData;
    } else {
      this.collectablesLinks = [
        'https://www.pegasas.lt/noriu-valgyti-sveikai-bet-skaniai-1114698',
        'https://www.pegasas.lt/liepsnojantis-kryzius-ciklo-svetimsale-5-knyga-1113987',
        'https://www.pegasas.lt/sviesos-stygius-1114152',
        'https://www.pegasas.lt/gliukozes-revoliucija-1114104',
        'https://www.pegasas.lt/wrendale-kaulinio-porceliano-puodelis-su-padekliuku-oh-christmas-tree-5994082',
        'https://www.pegasas.lt/kaledos-ateina-1114320',
        'https://www.pegasas.lt/manifestavimas-1114435',
        'https://www.pegasas.lt/nesiojama-zaidimu-konsole-my-arcade-go-gamer-tetris-301-zaidimas-viename-530631',
        'https://www.pegasas.lt/namu-kvapas-the-olphactory-white-musk-250-ml-5338027',
        'https://www.pegasas.lt/haris-poteris-kaledos-hogvartse-paveiksleliu-knyga-1114472',
        'https://www.pegasas.lt/lego-city-miesto-centro-tramvajus-ir-stotele-60423-5704456',
        'https://www.pegasas.lt/sunyciai-patruliai-advento-kalendorius-1114538',
      ];
    }
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null;
    this.render();
  }

  // Update properties method
  updateProps(prop) {
    this.prop = prop;
    this.isMobileWidthSmall = window.innerWidth <= 400;
    this.isSmallMobile = window.innerWidth <= 380;

    if (this.prop === 'Pigu.lt') {
      this.collectablesLinks = this.dynamicData;
    } else if (this.prop && this.prop.includes('Plastic')) {
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
    } else if (this.prop === 'Pegasas') {
      // Handle Glass collectables
      this.collectables = [
        item1pegasas,
        item2pegasas,
        item3pegasas,
        item4pegasas,
        item5pegasas,
        item6pegasas,
        item7pegasas,
        item8pegasas,
        item9pegasas,
        item10pegasas,
        item11pegasas,
        item12pegasas,
      ];
    }

    this.updateVisuals();
  }

  updateVisuals() {
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    if (!this.containerDiv) return;

    // Placeholder logic for updating visuals with products
    let tableHTML = '';
    this.products =
      this.dynamicData.campaignResponses[0]?.payload?.products
        .map((product) => ({
          id: product.id,
          image: product.imageUrl,
          title: product.name,
          link: product.url,
        }))
        .slice(0, 12) || [];
    const loopingImages = this.prop === 'Pigu.lt' ? this.products : this.collectables;
    const maxImages = 12; // Limit to 12 images

    if (this.prop === 'Pigu.lt') {
      loopingImages?.forEach((product, index) => {
        if (index % 3 === 0) {
          tableHTML += '<tr style="border-spacing:2px;border-collapse:separate">';
        }

        tableHTML += `
          <td style="padding:5px;text-align: center; border: none; cursor:pointer;">
            <div id="image-${index}" style="max-width:200px;">
              <img class='image-container' style='opacity:1;max-width: none; height: auto; object-fit: contain;max-height:70px;' 
                src=${product.image} alt="Product Image">
              
              ${
                product.link
                  ? `<div class='image-container-text'>
                       <a href="${product.link}" 
                          target="_blank" style="color: white; text-decoration: underline;">
                         <p style="margin-left:10px;margin-right:10px;max-width:280px;line-height:10px;">
                           ${product.title}
                         </p>
                       </a>
                     </div>`
                  : ''
              }
            </div>
          </td>`;

        if ((index + 1) % 3 === 0 || index === loopingImages.length - 1) {
          tableHTML += '</tr>';
        }
      });
    } else {
      loopingImages?.forEach((item, index) => {
        const link = this.collectablesLinks[index];

        if (index % 3 === 0) {
          tableHTML += '<tr style="border-spacing:2px;border-collapse:separate">';
        }

        tableHTML += `
          <td style="padding:5px;text-align: center; border: none; ${
            this.prop === 'Pegasas' || this.prop === 'Pigu.lt' ? 'cursor:pointer' : ''
          }">
          <div id="image-${index}" style="max-width:200px;">
          <img class='image-container' style='opacity:1;max-width: none; height: auto; object-fit: contain;max-height:$
            ${this.prop === 'Pigu.lt' ? '100px' : '70px'};' src=${item} alt="Scoreboard Image" >
        
        ${
          (this.prop === 'Pegasas' && this.collectablesLinks[index]) ||
          (this.prop === 'Pigu.lt' && link)
            ? `<div class='image-container-text'><a href="${
                this.prop === 'Pegasas'
                  ? this.collectablesLinks[index]
                  : this.prop === 'Pigu.lt' &&
                    link.url +
                      '&utm_source=Boomio&utm_medium=Gamification&utm_campaign=Black_Friday'
              }" target="_blank" style="color: white; text-decoration: underline;"><p style="margin-left:10px;margin-right:10px;max-width:280px;line-height:10px;">${
                this.prop === 'Pegasas'
                  ? this.collectablesLinks[index]
                  : this.prop === 'Pigu.lt' && link.title
              }<p/></a></div>`
            : ''
        }
          </div>
          </td>`;

        if ((index + 1) % 3 === 0 || index === loopingImages.length - 1) {
          tableHTML += '</tr>';
        }
      });
    }
    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
    let scoreboardText = `
      ${`<div class="bomio-first-line" style="width:100%; top: ${'505px'};line-height:18px; position: absolute;font-weight: 700; text-align: center; color: white; font-size:${
        this.prop === 'Pegasas' || this.prop === 'Pieno Žvaigždės' ? '18px' : '12px'
      } ; font-family: Montserrat;  word-wrap: break-word">${
        this.prop.includes('Gamtos Ateitis')
          ? `Šių atliekų negalima mesti į
${
  this.prop === 'Gamtos Ateitis Paper'
    ? 'popieriui'
    : this.prop === 'Gamtos Ateitis Plastic'
    ? 'plastikui'
    : this.prop === 'Gamtos Ateitis Glass' && 'stiklui'
} skirtus konteinerius.`
          : this.prop === 'Pegasas'
          ? 'DAUGIAU PEGASO PRODUKTŲ RASI'
          : 'SU MIAU GYVENT SMAGIAU'
      }</div>
              <div class="bomio-second-line" style="width:100%; top: ${'525px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${'12px'} ; font-family: Montserrat; font-weight:${
        this.prop === 'Pieno Žvaigždės' ? 500 : 400
      };  word-wrap: break-word;text-decoration:${
        this.prop === 'Pieno Žvaigždės' ? 'underline' : ''
      } ">${
        this.prop === 'Pegasas'
          ? ''
          : this.prop === 'Pieno Žvaigždės'
          ? ''
          : 'Daugiau apie tinkamą  rūšiavimą sužinosi puslapyje'
      }${
        this.prop === 'Pieno Žvaigždės'
          ? `<a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="https://pienozvaigzdes.lt/lt/20_miau" 
  style="color:white">
  DAUGIAU MIAU!
</a> `
          : ''
      }
          ${
            this.prop === 'Pegasas' || this.prop === 'Pigu.lt'
              ? `<a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="https://www.pegasas.lt/" 
  style="color:white;font-size:16px;">
  Pegasas.lt
</a> `
              : ''
          }
          
      
      </div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: white; font-size: 14px; font-family: Montserrat; font-weight: 700;  word-wrap: break-word;text-decoration: underline;"><a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="${
    this.prop === 'Pieno Žvaigždės'
      ? 'https://pienozvaigzdes.lt/lt/20_miau'
      : this.prop === 'Pegasas'
      ? 'https://www.pegasas.lt/'
      : 'https://gamtosateitis.lt/rusiavimo-abc'
  }" 
  style="color:white">
  ${
    this.prop === 'Pegasas'
      ? ''
      : this.prop === 'Pieno Žvaigždės'
      ? ''
      : 'https://gamtosateitis.lt/rusiavimo-abc/'
  }
</a> </div> `}
    `;

    if (this.prop !== 'Pigu.lt') {
      this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;
    }

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
    if (this.prop === 'Pegasas' || this.prop === 'Pigu.lt') {
      document.getElementById('boomio-close-did-you-know').addEventListener('click', () => {
        // Find all enlarged images by checking for the 'enlarge-image' class
        const enlargedImages = document.querySelectorAll('.enlarge-image');
        if (this.prop === 'Pigu.lt') {
          document.querySelector('.closeDidYouKnow').style.display = 'none';
        }
        // Loop through each enlarged image and remove the 'enlarge-image' class
        enlargedImages.forEach((imgElement) => {
          imgElement.classList.remove('enlarge-image');
          if (this.prop === 'Pigu.lt') {
            document.querySelector('.closeDidYouKnow').style.display = 'none';
          }
          // Also hide the text element associated with the image if it exists
          const textElement = imgElement.querySelector('.image-container-text');
          if (textElement) {
            textElement.style.display = 'none';
          }
        });
      });

      this.addfunc(); // Make sure to reapply any additional functions you need
    }
  }

  addfunc() {
    const loopElement = this.prop === 'Pigu.lt' ? this.products : this.collectables?.length;

    for (let index = 0; index < loopElement.length; index++) {
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

    const textElement = image.querySelector('.image-container-text');

    if (textElement) {
      // Toggle the visibility of the text when the image is enlarged
      textElement.style.display = textElement.style.display === 'block' ? 'none' : 'block';
    }

    if (this.prop === 'Pegasas') {
      document.querySelector('.bomio-first-line').style.display =
        textElement.style.display === 'block' ? 'none' : 'block';
      document.querySelector('.bomio-second-line').style.display =
        textElement.style.display === 'block' ? 'none' : 'block';
    }

    // Get the image element (the actual <img> inside the image div)
    const imgElement = image.querySelector('img');
    if (imgElement) {
      imgElement.classList.toggle('enlarge-image');
      if (this.prop === 'Pigu.lt') {
        document.querySelector('.closeDidYouKnow').style.display =
          document.querySelector('.closeDidYouKnow').style.display === 'none' ? 'block' : 'none';
      }
    }

    // Add event listener to close image when clicking anywhere on the screen
    const closeImageHandler = (event) => {
      const firstLine = document.querySelector('.bomio-first-line');
      const secondLine = document.querySelector('.bomio-second-line');
      if (firstLine) firstLine.style.display = 'block';
      if (secondLine) secondLine.style.display = 'block';
      // Check if the click is outside the image container (image or text)
      if (!image.contains(event.target)) {
        // Close the enlarged image by removing the 'enlarge-image' class

        if (imgElement) {
          imgElement.classList.remove('enlarge-image');
          if (this.prop === 'Pigu.lt') {
            document.querySelector('.closeDidYouKnow').style.display = 'none';
          }
        }

        // Hide the text element if it exists
        if (textElement) {
          textElement.style.display = 'none';
        }

        // Remove the event listener after the image is closed to prevent memory leaks
        document.removeEventListener('click', closeImageHandler);
      }
    };
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
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:calc(100% - 20px);margin-left:10px;top: 42px; position: absolute; text-align: center;line-height:42px; color: ${
        this.prop === 'Pigu.lt' ? 'white' : 'white'
      }; font-size: ${
      this.isMobileWidthSmall ? '26px' : '30px'
    }; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',    sans-serif; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${
      this.prop === 'Pigu.lt'
        ? this.language === 'EN'
          ? 'HAVE YOU SEEN THE TOP DEALS?'
          : this.language === 'LT'
          ? 'AR JAU MATEI TOP PASIŪLYMUS?'
          : this.language === 'LV'
          ? 'VAI ESI REDZĒJIS TOP PIEDĀVĀJUMUS?'
          : this.language === 'ET'
          ? 'KAS OLED TOP PAKKUMISI NÄINUD?'
          : this.language === 'FI'
          ? 'OLETKO NÄHNYT HUIPPUDIILEJÄ?'
          : this.language === 'RU' && 'А ТЫ УЖЕ ВИДЕЛ ТОП ПРЕДЛОЖЕНИЯ?'
        : this.prop === 'Pieno Žvaigždės'
        ? 'Ar visus RAGAVAI?'
        : this.prop === 'Pegasas'
        ? 'ĮSIGYK PEGASO PERKAMIAUSIUS'
        : 'Ar žinojai?'
    }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
      <div  style="width:100%;height: ${'302px'}; top: ${
      this.prop === 'Pegasas' ? '100px' : this.prop === 'Pieno Žvaigždės' ? '174px' : '114px'
    }; position: absolute; border-right:none;">
        <div class="boomio-custom-scrollbar">
          <table style="margin-top:${
            this.prop === 'Pigu.lt' ? (this.isMobileWidthSmall ? '30px' : '40px') : '30px'
          };border-spacing:3px;width:${
      this.isMobileWidthSmall ? 'calc(100% - 60px)' : 'calc(100% - 80px)'
    };margin-left:${this.isMobileWidthSmall ? '20px' : '40px'};border-collapse:separate">
            <tbody class="boomio-tbody">
            <div class='closeDidYouKnow' style='pointer-events: none;position:absolute;z-index:9999999;right:${
              this.isMobileWidthSmall ? '20px' : '40px'
            };top:35px;display:none' id='closeDidYouKnow'>
                            <img style="pointer-events: none;" src=${closeDidYouKnow} alt="Scoreboard Image" ></img> </div>

    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>

          <div style="width:100%;font-size:${
            this.isSmallMobile ? '8px' : this.isMobile ? '10px' : '12px'
          };text-align:center;text-transform:uppercase;top:555px;position:absolute;margin-top:2px;height: 22px; justify-content: center; align-items: center; display: flex;font-weight:600;background-size: contain;">
          <div style="display:${
            this.prop === 'Pigu.lt' ? 'block' : 'none'
          };border-radius:35px;width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:585px;height: 28px; background: ${
      this.prop === 'Pigu.lt' ? '#F34434' : 'none'
    }; overflow: hidden; justify-content: center; align-items: center; gap: 11px; display: flex;font-family:Georama" id="boomio-game-link-to-web">
      ${
        this.prop === 'Pigu.lt'
          ? this.language === 'EN'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Discover the best Pigu.lt deals!</a>'
            : this.language === 'LV'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://220.lv">Atklāj labākos 220.lv piedāvājumus!</a>'
            : this.language === 'ET'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://kaup24.ee">Avasta Kaup24.ee parimaid ostudiile!</a>'
            : this.language === 'FI'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://hobbyhall.fi">Löydä parhaat diilit Hobbyhall.fi verkkokaupasta!</a>'
            : this.language === 'RU' &&
              (this.campaignUrlProp === 'https://kaup.ee' ||
                this.campaignUrlProp === 'https://kaup24.ee')
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://kaup24.ee">Открой для себя лучшие предложения Kaup24!</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Открой для себя лучшие предложения Pigu.lt!</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Открой для себя лучшие предложения 220.lv!</a>'
            : '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Atrask geriausius Pigu.lt pasiūlymus!</a>'
          : ''
      }
  </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:595px;position:absolute; height: 38px; background: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-close-did-you-know">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">
        ${
          this.prop !== 'Pigu.lt'
            ? 'TOLIAU'
            : this.language === 'EN'
            ? 'NEXT'
            : this.language === 'LT'
            ? 'PIRMYN'
            : this.language === 'LV'
            ? 'KLIKŠĶINI'
            : this.language === 'ET'
            ? 'JÄRGMINE'
            : this.language === 'FI'
            ? 'SEURAAVA'
            : this.language === 'RU' && 'ДАЛЕЕ'
        }
        </div>
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
