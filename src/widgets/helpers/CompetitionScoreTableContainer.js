import './styles.css';

import { boomioLogo } from './constants';
import { localStorageService } from '@/services';

export class CompetitionScoreTableContainer {
  constructor(prop, scoreTable) {
    this.prop = prop;
    this.scoreTable = scoreTable; // Store the prop in a class property
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null; // Store container reference
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'EN';
    this.render();
  }

  updateProps(prop, scoreTable) {
    this.prop = prop;
    this.scoreTable = scoreTable;
    this.language = this.config.language ? this.config.language : 'EN';
    this.updateVisuals();
  }

  updateVisuals() {
    if (!this.containerDiv) return;
    const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
    const scoreboard =
      this.prop.includes('Gamtos Ateitis') || this.prop === 'Nykstukas'
        ? this.scoreTable?.teams_scoreboard
        : this.scoreTable?.scoreboard || [];
    const userBestPlace = parseInt(
      this.prop.includes('Gamtos Ateitis') || this.prop === 'Nykstukas'
        ? this.scoreTable.team_best_place
        : this.scoreTable.user_best_place,
    );
    const userBestScore = parseInt(this.scoreTable.user_best_score);
    this.userParticipationDays = this.scoreTable?.participation_days ?? 0; // nullish-coalescing

    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    const userId = urlParams.get('user_id');
    this.couponCodeNew = this.prop.includes('demo') ? 'discountcode' : 'boomio';
    const perlasGoTable = [
      'PERLIUKAS',
      'TAUPUOLIS',
      'ENERGINGAS',
      'GO LAIMA',
      'SKAITLIUKAS',
      'PILKASIS ŠEŠĖLIS',
      'PERLO MEDŽIOTOJAS',
      'ABRIKOSAS',
      'PERLASGOSTA',
      'UGIS',
      'ŽAIDĖJA',
      'ZORO',
      'PERLŲ DAMA',
      'EMILIUX',
      'VĖJO DRUMSTĖJAS',
      'RORO',
      'HARIS POTERIS',
      'VAIVORYKŠTĖ',
      'VALDELIS',
      'PERLAS PATS SAU',
      'LAIMĖTOJAS',
      'VALDOVAS',
      'AUKSO PERLAS',
      'NEWYORKE',
      'LAIMĖS BROLIS',
      'MISTY',
      'SĖKMĖS VILNIETIS',
      'GO VALDOVAS',
      'KLIK KLIK GO',
    ];

    const hiddenNicknames = [
      'Linksmuoliai',
      'Šypsenėlės',
      'Mėnulio Spinduliai',
      'Draugų Duetas',
      'Žaidimo Žvaigždės',
      'Saulės Vaikai',
      'Smagumėliai',
      'Žiežirbos',
      'Vafliniai',
      'Žaidimų Broliai',
      'Spalvoti Žingsniai',
      'Du Smalsučiai',
      'Švelnieji',
      'Lobių Medžiotojai',
      'Saulėti Draugai',
      'Gudručiai',
      'Keksiukų Komanda',
      'Braškių Duetas',
      'Spalvų Pora',
      'Vėjo Skrajūnai',
      'Linksmos Kojytės',
      'Mielieji',
      'Obuoliukai',
      'Dūzgiantys Bitukai',
      'Mažieji Tyrinėtojai',
      'Varlyčių Būrys',
      'Šokliukai',
      'Spalvoti Lašiukai',
      'Šviesos Kibirkštys',
      'Saldainiukai',
      'Kukurūzų Duetas',
      'Pupuliukai',
      'Draugiški Žingsniai',
      'Snaigių Porėlė',
      'Burbuliniai',
      'Mėlyni Draugai',
      'Laimės Žingsneliai',
      'Sūrio Ratukai',
      'Džiaugsmo Gaudytojai',
      'Vandenyno Žvaigždės',
      'Skambūs Lašeliai',
      'Gėlių Porėlė',
      'Švelnūs Pūkučiai',
      'Džiaugsmo Lašeliai',
      'Mėnulio Linksmuoliai',
      'Žaidimų Kibirkštys',
      'Linksmučiai',
      'Vaivorykštės Žingsniai',
      'Skrajūnai',
      'Mielieji Duetas',
      'Draugiškieji',
      'Žemuoginiai',
      'Spalvų Spindesys',
      'Meškiukų Komanda',
      'Mandarininiai',
      'Skruzdėlyčių Draugija',
      'Maži Stebuklai',
      'Riešutukai',
      'Saulės Kibirkštėlės',
      'Džiaugsmo Tandemas',
      'Draugystės Džiaugsmas',
      'Debesėlių Komanda',
      'Nuotykių Porininkai',
      'Burbuliukai',
      'Nykštukų Klubas',
      'Kakavos Pora',
      'Keliaujantys Šypsenukai',
      'Skanuoliai',
      'Draugystės Tiltas',
      'Vasaros Džiaugsmai',
      'Skraidantys Obuoliukai',
      'Purienų Pora',
      'Balandėlių Būrelis',
      'Linksmieji Spalviukai',
      'Saldi Draugystė',
      'Draugiški Nuotykiai',
      'Kukuliukai',
      'Žvaigždžių Pėdutės',
      'Minkštučių Duetas',
      'Mėnulio Meškučiai',
      'Braškių Komanda',
      'Spalvų Komanda',
      'Džiaugsmo Žaidėjai',
      'Draugiški Laimėtojai',
      'Žaismingi Linksmuoliai',
      'Debesėlių Porininkai',
      'Vaivorykštės Nuotaika',
      'Ledinukai',
      'Šypsenų Kolekcionieriai',
      'Žaidimų Draugystė',
      'Kakaviniai Draugai',
      'Mažieji Skrajūnai',
      'Linksmučiai Draugai',
      'Žaidimų Laimės Pora',
      'Pūkų Komanda',
      'Riešutėlių Porininkai',
      'Žvaigždutės Kelyje',
      'Pasakų Pora',
      'Mėlyni Spinduliai',
      'Žaidimų Bičiuliai',
      'Kakaviniai',
      'Velykiniai Varpeliai',
      'Vaikystės Komanda',
      'Spalvų Pasaka',
      'Gėlių Duetas',
      'Mūsų Draugystė',
      'Spalvoti Šypsniukai',
      'Pavasario Lašeliai',
      'Obuoliukų Džiaugsmas',
      'Draugiški Dvyniai',
    ];

    const ltNicknames = [
      'MAGIŠKAS',
      'ŽAIDĖJAS',
      'GRETAA',
      'BLASH',
      'BULKIN',
      'PILKASIS ŠEŠĖLIS',
      'GIEDRIUZAS',
      'ABRIKOSAS',
      'SKANUTĖ',
      'UGIS',
      'MIS LIETUVA',
      'ZORO',
      'SŪRELIS',
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
      'PIENIŠKAS',
      'BLAZING BILL',
    ];

    const enNicknames = [
      'James',
      'Bubbles',
      'Blaze',
      'Tofu',
      'Vex',
      'Peaches',
      'Emma',
      'Snug Bug',
      'Michael',
      'Mochi',
      'Nova',
      'Kiwi Pop',
      'Jinx',
      'Niblet',
      'Olivia',
      'Cookie',
      'William',
      'Waffles',
      'Echo',
      'Zoomie',
      'Rogue',
      'Apex',
      'Sophia',
      'Ava',
      'Benjamin',
      'Vanta',
      'Luna',
      'Glitch',
      'Chill',
      'Ghost',
      'Frost',
      'Titan',
      'Mia',
      'Storm',
      'Daniel',
      'Saber',
      'David',
      'Mute',
      'Isabella',
      'Vibe',
      'Charlotte',
      'Zane',
      'Matthew',
      'Drift',
      'Amelia',
      'Pixel',
      'Jacob',
      'Fang',
      'Nox',
      'Emily',
      'Grace',
      'Ethan',
    ];

    const lvNicknames = [
      'Jānis',
      'Anna',
      'Artūrs',
      'Kristīne',
      'Elīna',
      'Rihards',
      'Edgars',
      'Laura',
      'Kārlis',
      'Alise',
      'Kristaps',
      'Līga',
      'Roberts',
      'Dāvis',
      'Marta',
      'Ieva',
      'Linda',
      'Anete',
      'Andris',
      'Sanita',
      'Toms',
      'Dārta',
      'Mārtiņš',
      'Madara',
      'Reinis',
      'Emīls',
      'Agnese',
      'Ralfs',
      'Inese',
      'Sandis',
    ];

    let tableHTML = '';
    scoreboard?.forEach((item, index) => {
      const background = index + 1 === userBestPlace ? 'rgba(255, 255, 255, 1)' : 'none';

      const color = index + 1 === userBestPlace ? 'rgba(61, 73, 40, 1)' : 'white';
      const boxShadow =
        index + 1 === userBestPlace ? '2px 4px 3.4px 0px rgba(0, 0, 0, 0.10) inset' : 'none';

      tableHTML += `
            <tr style="background: ${background};box-shadow:${boxShadow};margin: 0;height:44px ">
            <td style="padding-left:8px;text-align:start;width: 25px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
        item.place
      }</td>
      <td style="padding-left:6px;text-align:start;width: 100px; color: ${color}; border: none;font-size: 16px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word;">
      ${
        !this.prop.includes('Gamtos Ateitis')
          ? userBestPlace === index + 1
            ? this.language === 'EN'
              ? 'Your score'
              : this.language === 'LV'
              ? 'Tavs rezultāts'
              : this.prop === 'Nykstukas'
              ? 'Tavo komandos rezultatas'
              : 'Tavo rezultatas'
            : this.prop === 'Perlas GO'
            ? perlasGoTable[index]
            : this.prop === 'Nykstukas'
            ? hiddenNicknames[index]
            : this.language === 'LV'
            ? lvNicknames[index]
            : this.language === 'EN'
            ? enNicknames[index]
            : ltNicknames[index]
          : scoreboard[index].team
      }
    </td>
              <td style="width: 48px; color: ${color}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;padding-right:10px;">${
        item.score
      }</td>
            </tr>`;
    });

    if (
      userBestPlace > (this.prop.includes('Gamtos Ateitis') || this.prop === 'Nykstukas' ? 100 : 20)
    ) {
      tableHTML += `
            <tr style="background: rgba(255, 255, 255, 1);box-shadow:none;margin: 0;height:44px ">
            <td style="padding-left:8px;text-align:start;width: 25px; color: rgba(61, 73, 40, 1); border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${userBestPlace}</td>

              <td style="padding-left:6px;text-align:start;width: 100px; color: ${'rgba(61, 73, 40, 1)'}; border: none;font-size: 14px; font-family: Georama; font-weight: 800; text-transform: uppercase; line-height: 27px; word-wrap: break-word">${
        !this.prop.includes('Gamtos Ateitis')
          ? this.prop === 'Nykstukas'
            ? 'Tavo komandos rezultatas'
            : this.language === 'EN'
            ? 'Your score'
            : this.language === 'LV'
            ? 'Tavs rezultāts'
            : 'Tavo rezultatas'
          : scoreboard[userBestPlace].team
      }</td>
              <td style="width: 48px; color: ${'rgba(61, 73, 40, 1)'}; border: none;font-size: 16px; font-family: Georama; font-weight: 800; line-height: 27px; word-wrap: break-word;padding-right:10px;">${userBestScore}</td>
            </tr>`;
    }

    let textColor = 'white';
    let fontSize = '14px';
    let fontWeight =
      this.prop === 'Barbora' ||
      this.prop === 'Fpro' ||
      this.prop === 'Vilvi' ||
      this.prop === 'Fantazijos' ||
      this.prop.includes('Gamtos Ateitis') ||
      this.prop === 'Pieno Žvaigždės' ||
      this.prop === 'LemonGym'
        ? '900'
        : '700';
    let scoreboardText = `
      ${
        (this.prop === 'Fantazijos' && this.scoreTable.user_best_score > 500) ||
        (this.prop === 'Makalius' && this.scoreTable?.user_best_place < 500) ||
        (this.prop === 'Pieno Žvaigždės' && this.scoreTable?.user_best_place < 25) ||
        (this.prop === 'Akropolis' && this.scoreTable?.user_best_place < 2025) ||
        (this.prop === 'Vilvi' && this.scoreTable?.user_best_place <= 10) ||
        (this.prop === 'Perlas GO' && !userId) ||
        (this.prop.includes('Gamtos Ateitis') && this.scoreTable?.team_best_place < 10) ||
        (this.prop === 'Zemaitijos Pienas' && this.scoreTable?.user_best_place <= 3) ||
        (this.prop === 'Nevezis' && this.scoreTable?.user_best_place <= 10) ||
        (this.prop === 'Daumantu' && this.scoreTable?.user_best_place <= 50) ||
        (this.prop === 'Magija' && this.scoreTable?.user_best_place <= 3) ||
        (this.prop === 'Nykstukas' && this.scoreTable.user_best_score > 200) ||
        (this.prop === 'Orlen' && this.scoreTable.user_best_place > 1000) ||
        (this.language === 'EN' && this.prop.includes('demo'))
          ? `<div style="width:100%; top: ${'420px'}; position: absolute; text-align: center; color: ${textColor}; font-size: ${
              this.prop === 'Barbora' ? '16px' : fontSize
            }; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: ${
              this.prop === 'Nykstukas' ? 'none' : 'uppercase'
            }; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? 'DOVANA tau!'
                : this.prop === 'Unisend' && this.language === 'LV'
                ? 'TEV VEICAS LIELISKI!'
                : this.prop === 'Akropolis' && this.language === 'LV'
                ? 'Tev veicās lieliski!'
                : this.prop === 'Eurovaistine'
                ? 'TEV VEICAS LIELISKI!'
                : this.language === 'LV'
                ? 'Atzīmējiet karstāko vasaru'
                : this.language === 'RU'
                ? 'Отпразднуйте самый жаркий месяц лета'
                : this.prop === 'Unisend' && this.language === 'ET'
                ? 'SUL LÄHEB HÄSTI!'
                : this.language === 'ET'
                ? 'Tähistage suve kuumimat kuud ja võitke'
                : this.prop === 'Fantazijos'
                ? '2024.06.09 ŠVENČIANT NACIONALINĘ 69 DIENĄ'
                : this.language === 'EN'
                ? 'Hooray, youre doing great!'
                : this.prop === 'Nykstukas'
                ? 'SVEIKINAME! Pretenduoji laimėti šios savaitės prizą'
                : 'Valio, tau puikiai sekasi!'
            }</div>

      ${
        this.prop === 'Nykstukas'
          ? `<div style="font-family: Montserrat;padding-left:4px;padding-right:4px;position:absolute;top:463px;width:calc(100% - 10px);margin-left:5px;background-color:#45A9D7;color:white;font-size: ${fontSize};font-weight: ${fontWeight}; ">10 Eur Wolt kuponus.</div>`
          : ''
      }
            <div style="width:calc(100% - 20px);margin-left:10px; top: ${
              this.prop === 'Nykstukas' ? '490px' : '450px'
            };line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size:${
              this.prop === 'Nykstukas' ? '14px' : '10px'
            } ; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? 'Pirk <a style="color:white" target="_blank" href="https://www.barbora.lt/">Barbora.lt</a>, nuolaidos kodo laukelyje vesk <b style="font-weight:900;font-size:18px;background-color:#FFC727;"> &apos;GIMTADIENIS&apos;</b> ir gauk dovanų!'
                : this.prop === 'Pieno Žvaigždės'
                ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį</br> fondą sudaro Forum Cinemas bilietai <u style="text-transform:lowercase">IR </br>pagrindiniai <u style="text-transform:uppercase">MIAU PRIZAI  </u></u>- Su Miau gyvent linksmiau!'
                : this.prop === 'Unisend' && this.language === 'LV'
                ? '100 spēlētāji ar visvairāk punktiem saņems balvas. Izloze 31. </br> oktobris! Uzvarētāji tiks informēti e-pastā.'
                : this.language === 'LV' && this.prop === 'Fantazijos'
                ? 'Un laimējiet līdz 30 balvām!</br> Par laimestu informēsim e-pastā.'
                : this.language === 'RU' && this.prop === 'Fantazijos'
                ? 'и выиграйте до 30 призов! Уведомление о выигрыше </br>придет на вашу электронную почту.'
                : this.prop === 'Akropolis' && this.language === 'LV'
                ? 'Ja saglabāsi savu pozīciju 500 labāko sarakstā, tu saņemsi </br>balvu no KFC, un pēc balvas izņemšanas – automātiski </br>piedalīsies AKROPOLE dāvanu kartes izlozē 100 EUR vērtībā.  </br>Tev ir iespēja uzlabot savu rezultātu, spēlējot vēlreiz!'
                : this.prop === 'Akropolis'
                ? 'Žaisk ir kasdien laimėk vieną CAIF CAFE kavos puodelį, o</br>atsiėmęs prizą turėk galimybę laimėti 100 EUR AKROPOLIO </br>dovanų kortelę!'
                : this.prop === 'Daumantu'
                ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei.</br> Prizinį fondą sudaro 50 Daumantų prizų!'
                : this.prop.includes('Gamtos Ateitis')
                ? 'Pusė geriausią rezultatą pasiekusių mokyklų pateks į kitą </br> žaidimo etapą ir sieks laimėti koncertą savo mokyklai! Jei </br>  Tavo mokykla pateks į kitą etapą, informuosime Tave el. </br>  paštu, kurį nurodei. '
                : this.prop === 'Unisend' && this.language === 'ET'
                ? 'Koguni 100 enim punkte kogunud mängijat </br> võidavad 31. oktoober auhindu!'
                : this.language === 'ET' && this.prop === 'Fantazijos'
                ? 'kuni 30 auhinda oma sensuaalseteks naudinguteks.</br> Võitjaid teavitatakse nendemääratud e-posti teel.'
                : this.prop === 'Fantazijos'
                ? 'net 69 geriausi žaidėjai laimės prizus! </br>Apie laimėjimą sužinosi savo nurodytu el. paštu.'
                : this.prop === 'LemonFeel'
                ? `Uzlabo savu rezultātu un cīnies par balvu, ko iegūs labākais spēlētājs LEMON FEEL noslēguma pasākumā – 28. augustā!</br> ${
                    this.userParticipationDays >= 3
                      ? `${this.userParticipationDays} DIENAS SUPER!`
                      : this.userParticipationDays === 1
                      ? `${this.userParticipationDays} DIENA`
                      : `${this.userParticipationDays} DIENAS`
                  } `
                : this.prop === 'Makalius'
                ? 'Apie laimėjimą sužinosi savo nurodytu el. paštu liepos 1 d. </br> Prizinį fondą sudaro net 500 kuponų po 20 €, 50 €'
                : this.prop === 'Vilvi'
                ? 'Net 10 geriausių žaidėjų xx dieną laimės VILVI prizus! </br> Jei laimėsi informuosime tavo nurodytu el. paštu.'
                : this.prop === 'Perlas GO'
                ? `Kiekvieną savaitę 20 geriausių „Perlas Go“ žaidėjų, užsiregistravusių </br> programėlėje ar savitarnos svetainėje laimi po 10 € „Wolt“ kuponą!</br> Jei laimėsi, informuosime tave registracijos metu nurodytu el. paštu.`
                : this.prop === 'Zemaitijos Pienas'
                ? 'Kas savaitę 3 daugiausia taškų surinkę žaidėjai laimės </br> „Dobilas“  prizus! Jei laimėjai, informuosime Tave el. paštu, </br> kurį nurodei. '
                : this.prop === 'Nykstukas'
                ? 'Geriausi žaidėjai gali laimėti bilietus į Post Malone koncertą! Laimėtojus informuosime el. paštu. Prizus dovanoja Nykštukas!'
                : this.prop === 'Nevezis'
                ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį </br>fondą sudaro oho! prizai!'
                : this.prop === 'Magija'
                ? 'Kas savaitę 3 daugiausia taškų surinkę žaidėjai laimės „Magija“  prizus! Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. '
                : this.prop === 'Orlen'
                ? 'Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį fondą sudaro net 1 000 ledų kas savaitę! Dydisis prizas - skrydis oro balionu!'
                : this.language === 'EN'
                ? ''
                : ''
            }</div>
              <div style="width:100%; top: ${
                this.prop === 'Perlas GO' ? '455px' : this.prop.includes('demo') ? '465px' : '505px'
              };line-height:14px; position: absolute; text-align: center; color: ${textColor}; font-size:${
              this.prop === 'Perlas GO' ? '10px' : '10px'
            } ; font-family: Montserrat; font-weight: 700; text-transform:${
              this.prop === 'Perlas GO' ? 'none' : 'uppercase'
            } ; word-wrap: break-word">${
              this.prop === 'Unisend' && this.language === 'ET'
                ? 'Võitjatega võetakse ühendust e-posti teel.'
                : this.language === 'LV' && this.prop === 'Fantazijos'
                ? 'IEPĒRCIETIES AR <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV </a> ATLAIŽU KODU: <div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                : this.language === 'RU' && this.prop === 'Fantazijos'
                ? 'ДЕЛАЙТЕ ПОКУПКИ С ПРОМОКОДОМ <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV: </a><div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                : this.language === 'ET' && this.prop === 'Fantazijos'
                ? 'Ostes YESYES.EE-st SOODUSKOODIGA<div ><a style="background-color:#FD7A77; font-size:14px">suvi</a></div>'
                : this.prop === 'Fantazijos'
                ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div><a style="background-color:#FD7A77;font-size:14px">69diena</a></div>`
                : this.prop === 'Makalius' && this.language === 'LT'
                ? 'arba 100 € MAKALIAUS paslaugoms įsigyti!'
                : this.prop.includes('demo')
                ? 'Congrats! Here’s your discount code – just for you!'
                : ''
            }</div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? '(Galioja pristatymams iki 04 14 d.)'
                : this.prop === 'Eurovaistine'
                ? 'Uzvarētāji tiks informēti e-pastā.'
                : this.language === 'LV' && this.prop !== 'Akropolis'
                ? 'UN SAŅEMIET 20% ATLAIDI VISAM!'
                : this.language === 'RU'
                ? 'И ПОЛУЧИТЕ СКИДКУ 20% НА ВСЕ!'
                : this.language === 'ET'
                ? 'SAATE 20% ALLAHINDLUST KÕIGELE!'
                : this.prop === 'Fantazijos'
                ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                : ''
            } </div> `
          : `<div style="width:100%; top: 420px; position: absolute; text-align: center; color: ${textColor}; font-size: ${fontSize}; font-family: Montserrat; font-weight: ${fontWeight}; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? 'Pagerink rezultatą ir laimėk </br>Barbora gimtadienio dovaną iškart!'
                : this.language === 'ES'
                ? 'LO ESTÁS HACIENDO MUY BIEN'
                : this.prop === 'Eurovaistine'
                ? 'TEV VEICAS LIELISKI!'
                : this.prop === 'Akropolis' && this.language === 'LV'
                ? 'Mēģini vēlreiz, tev izdosies!'
                : this.prop === 'Unisend' && this.language === 'LV'
                ? 'TEV VEICAS LIELISKI!'
                : this.language === 'LV'
                ? 'SUPER!'
                : this.language === 'RU'
                ? 'Отпразднуйте самый жаркий месяц лета'
                : this.prop === 'Unisend' && this.language === 'ET'
                ? 'SUL LÄHEB HÄSTI!'
                : this.language === 'ET'
                ? 'Tähistage suve kuumimat kuud ja võitke'
                : this.prop === 'Perlas GO'
                ? ''
                : this.prop === 'Dentsu'
                ? ''
                : this.language === 'EN'
                ? 'YOU CAN DO IT!'
                : this.language === 'ES'
                ? '¡TÚ PUEDES!'
                : this.prop === 'Nykstukas'
                ? ''
                : 'Tu gali!'
            }</div>
            <div style="width:calc(100% - 20px);margin-left:10px; top: ${
              this.prop === 'Perlas GO' ? '390px' : '450px'
            };line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? ''
                : this.prop === 'Eurovaistine'
                ? '50 spēlētāji, kuri iegūs vislielāko punktu skaitu, saņems </br>E-EUROAPTIEKA dāvanu, kuponus: 100€, 50€, 25€, 15€,'
                : this.prop === 'Pieno Žvaigždės'
                ? 'Pagerink rezultatą, nes kas savaitę geriausi žaidėjai laimės</br> prizus! Prizinį fondą sudaro Forum Cinemas bilietai <u style="text-transform:lowercase">IR </br>pagrindiniai <u style="text-transform:uppercase">MIAU PRIZAI  </u></u> - Su Miau gyvent linksmiau!'
                : this.prop === 'LemonFeel'
                ? `Uzlabo savu rezultātu un cīnies par balvu, ko iegūs labākais spēlētājs LEMON FEEL noslēguma pasākumā – 28. augustā!</br> ${
                    this.userParticipationDays >= 3
                      ? `${this.userParticipationDays} DIENAS SUPER!`
                      : this.userParticipationDays === 1
                      ? `${this.userParticipationDays} DIENA`
                      : `${this.userParticipationDays} DIENAS`
                  } `
                : this.prop === 'Penki Sezonai'
                ? 'Pagerink rezultatą nes balandžio 1d.'
                : this.prop === 'Akropolis' && this.language === 'LV'
                ? 'Uzlabo savu rezultātu un saņem kādu no KFC balvām un pēc</br>balvas saņemšanas - automātiski piedalīsies  AKROPOLE</br>dāvanu kartes izlozē 100 eur vērtībā.'
                : this.prop === 'Akropolis'
                ? 'Pagerink rezultatą ir kasdien laimėk vieną CAIF CAFE kavos </br>puodelį, o atsiėmęs prizą turėk galimybę laimėti 100 EUR</br>AKROPOLIO dovanų kortelę!'
                : this.prop === 'Daumantu'
                ? 'Pagerink rezultatą, nes kas savaitę </br> geriausi žaidėjai laimės prizus! '
                : this.prop.includes('Gamtos Ateitis')
                ? 'Pagerink rezultatą, nes pusė geriausią rezultatą pasiekusių </br> mokyklų pateks į kitą žaidimo etapą ir sieks laimėti koncertą </br> savo mokyklai! Jei Tavo mokykla pateks į kitą etapą, </br>informuosime Tave el. paštu, kurį nurodei. '
                : this.prop === 'Makalius'
                ? 'Pagerink rezultatą, nes liepos 1 dieną geriausi žaidėjai laimės </br>prizus! Prizinį fondą sudaro net 500 kuponų po 20 €, 50 € '
                : this.prop === 'Unisend' && this.language === 'LV'
                ? '100 spēlētāji ar visvairāk punktiem saņems balvas. Izloze 31. </br> oktobris! Uzvarētāji tiks informēti e-pastā.'
                : this.language === 'LV' && this.prop === 'Fantazijos'
                ? 'Un laimējiet līdz 30 balvām!</br> Par laimestu informēsim e-pastā.'
                : this.language === 'RU' && this.prop === 'Fantazijos'
                ? 'и выиграйте до 30 призов! Уведомление о выигрыше </br>придет на вашу электронную почту.'
                : this.prop === 'Unisend' && this.language === 'ET'
                ? 'Koguni 100 enim punkte kogunud mängijat </br> võidavad 31. oktoober auhindu!'
                : this.language === 'ET' && this.prop === 'Fantazijos'
                ? 'kuni 30 auhinda oma sensuaalseteks naudinguteks.</br> Võitjaid teavitatakse nendemääratud e-posti teel.'
                : this.prop === 'Vilvi'
                ? 'Pagerink rezultatą, nes net 10 geriausių žaidėjų xx dieną </br> laimės VILVI prizus!'
                : this.prop === 'Perlas GO'
                ? 'Kiekvieną savaitę 20 geriausių „Perlas Go“ žaidėjų, užsiregistravusių </br> programėlėje ar savitarnos svetainėje laimi po 10 € „Wolt“ kuponą!</br> Laimėjusius informuosime el. paštu.'
                : this.prop === 'Zemaitijos Pienas'
                ? 'Pagerink rezultatą, nes kas savaitę 3 daugiausia taškų surinkę </br> žaidėjai laimės „Dobilas“  prizus!  '
                : this.prop === 'Nykstukas'
                ? 'Geriausi žaidėjai gali laimėti bilietus į Post Malone koncertą! Jei laimėjai, informuosime Tave el. paštu, kurį nurodei. Prizinį fondą įsteigė Nykštukas! '
                : this.prop === 'Nevezis'
                ? 'Pagerink rezultatą, nes kas savaitę geriausi žaidėjai laimės</br> oho! prizus! '
                : this.prop === 'Magija'
                ? 'Pagerink rezultatą, nes kas savaitę 3 daugiausia taškų surinkę žaidėjai laimės „Dobilas“  prizus!'
                : this.prop === 'Orlen'
                ? 'Pagerink rezultatą, nes prizinį fondą sudaro net 1 000 ledų kas savaitę! O dydisis prizas - skrydis oro balionu!'
                : this.prop === 'Toni'
                ? '¡Buen intento! Cuanto más juegas, más oportunidades tienes de ganar ¿Puedes superar tu propio récord? ¡Inténtalo de nuevo y suma más chances de ganar! ¡Sigue jugando! Cada partida es una nueva oportunidad para llevarte un premio Cada partida cuenta. ¡Acumula oportunidades y gana!'
                : this.language === 'EN'
                ? ''
                : ''
            }</div>
              <div style="width:100%; top: ${'505px'};line-height:18px; position: absolute; text-align: center; color: ${textColor}; font-size:${
              this.prop ? '10px' : '10px'
            } ; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Unisend' && this.language === 'ET'
                ? 'Võitjatega võetakse ühendust e-posti teel.'
                : this.prop === 'Eurovaistine'
                ? '10€, 5€ vērtība.'
                : this.language === 'LV' && this.prop === 'Fantazijos'
                ? 'IEPĒRCIETIES AR <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV </a> ATLAIŽU KODU: <div ><a style="background-color:#FD7A77; font-size:14px">vasara</a></div>'
                : this.language === 'RU' && this.prop === 'Fantazijos'
                ? 'ДЕЛАЙТЕ ПОКУПКИ С ПРОМОКОДОМ <a onclick="event.stopPropagation();" target="_blank" href=https://yesyes.lv/ style="color:white"> YESYES.LV: </a><div ><a style="background-color:#FD7A77; font-size:14px">vasara </a></div>'
                : this.language === 'ET' && this.prop === 'Fantazijos'
                ? 'Ostes YESYES.EE-st SOODUSKOODIGA<div ><a style="background-color:#FD7A77; font-size:14px">suvi</a></div>'
                : this.prop === 'Fantazijos'
                ? `O PIRKDAMAS <a onclick="event.stopPropagation();" target="_blank" href=https://www.fantazijos.lt style="color:white"> Fantazijos.lt </a> SU NUOLAIDOS KODU <div ><a style="background-color:#FD7A77; font-size:14px">69diena</a></div>`
                : this.prop === 'Makalius' && this.language === 'LT'
                ? 'arba 100 € MAKALIAUS paslaugoms įsigyti!'
                : ''
            }</div>
              <div style="width:100%; top: 546px; position: absolute; text-align: center; color: ${textColor}; font-size: 10px; font-family: Montserrat; font-weight: 700; text-transform: uppercase; word-wrap: break-word">${
              this.prop === 'Barbora'
                ? '(Galioja pristatymams iki 04 14 d.)'
                : this.prop === 'Eurovaistine'
                ? 'Uzvarētāji tiks informēti e-pastā.'
                : this.language === 'LV' && this.prop === 'Fantazijos'
                ? 'UN SAŅEMIET 20% ATLAIDI VISAM!'
                : this.language === 'RU' && this.prop === 'Fantazijos'
                ? 'И ПОЛУЧИТЕ СКИДКУ 20% НА ВСЕ!'
                : this.language === 'ET' && this.prop === 'Fantazijos'
                ? 'SAATE 20% ALLAHINDLUST KÕIGELE!'
                : this.prop === 'Fantazijos'
                ? 'GAUK 19% NUOLAIDĄ VISKAM!'
                : ''
            } </div>
        `
      }
      ${
        false
          ? `<div style="box-sizing: border-box;width: 100%; padding-left: 12px; padding-right: 12px; padding-top: 7px; padding-bottom: 7px; background:${'#FFB151'}; border-radius: 32px; border: 0.50px  rgba(255, 255, 255, .6) solid; justify-content: space-between; align-items: center; display: inline-flex;width:260px;position:absolute;top:485px;left:calc(50% - 130px);">
      <div style="height: 17px; color: white; font-size: 16px; font-family: Montserrat; font-weight: 600; line-height: 16px; word-wrap: break-word" id="p_code_text2">
       ${this.prop.includes('demo') ? 'discountcode' : 'boomio'}
          </div>
          <svg width="22" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="boomio-copy-modal-btn2" style="cursor:pointer">
          <path d="M18.5625 3.42188H7.5625C7.42575 3.42188 7.2946 3.4762 7.1979 3.5729C7.1012 3.6696 7.04688 3.80075 7.04688 3.9375V7.54688H3.4375C3.30075 7.54688 3.1696 7.6012 3.0729 7.6979C2.9762 7.7946 2.92188 7.92575 2.92188 8.0625V19.0625C2.92188 19.1993 2.9762 19.3304 3.0729 19.4271C3.1696 19.5238 3.30075 19.5781 3.4375 19.5781H14.4375C14.5743 19.5781 14.7054 19.5238 14.8021 19.4271C14.8988 19.3304 14.9531 19.1993 14.9531 19.0625V15.4531H18.5625C18.6993 15.4531 18.8304 15.3988 18.9271 15.3021C19.0238 15.2054 19.0781 15.0743 19.0781 14.9375V3.9375C19.0781 3.80075 19.0238 3.6696 18.9271 3.5729C18.8304 3.4762 18.6993 3.42188 18.5625 3.42188ZM13.9219 18.5469H3.95312V8.57812H13.9219V18.5469ZM18.0469 14.4219H14.9531V8.0625C14.9531 7.92575 14.8988 7.7946 14.8021 7.6979C14.7054 7.6012 14.5743 7.54688 14.4375 7.54688H8.07812V4.45312H18.0469V14.4219Z" fill="white"/>
          </svg>
      </div> 
      `
          : ''
      }
    `;
    this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    if (false) {
      document.getElementById('boomio-copy-modal-btn2').onclick = () => {
        const textToCopy = this.couponCodeNew;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const copyButton = document.getElementById('p_code_text2');
        copyButton.textContent = this.language === 'EN' ? 'Copied!' : 'Nukopijuota!';

        setTimeout(() => {
          copyButton.textContent = this.couponCodeNew;
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
    const campaignUrl = urlParams.get('campaign_url');
    const userId = urlParams.get('user_id');
    containerDiv.style.width =
      document.documentElement.clientWidth < 426
        ? document.documentElement.clientWidth < 321
          ? '375px'
          : document.documentElement.clientWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:100%;top: 52px; position: absolute; text-align: center; color: ${'white'}; font-size: 40px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-competition-scoreboard-name">${
      this.language === 'LV'
        ? 'REZULTĀTI'
        : this.language === 'RU'
        ? 'РЕЗУЛЬТАТЫ'
        : this.language === 'ET'
        ? 'TULEMUSED'
        : this.language === 'ET'
        ? 'TULEMUSED'
        : this.language === 'ES'
        ? 'RESULTADOS'
        : this.language === 'EN'
        ? 'RESULTS'
        : 'REZULTATAI'
    }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
              


      <div  style="width: calc(100% - 32px); height: ${'260px'}; left: 16px; top: 124px; position: absolute; background: rgba(255, 255, 255, 0.20); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) inset; border-radius:20px;border-right:none; backdrop-filter: blur(4px)">
        <div style="overflow-x:hidden;overflow-y: scroll; height: calc(100% - 60px);margin-right:5px; margin-top:20px;" class="boomio-custom-scrollbar">
          <table style="margin-left:2px;width: 100%;padding-top:20px;padding-bottom:20px;border-collapse: collapse;" >
            <tbody class="boomio-tbody" style="background-color:transparent">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
      </div>
      <div style="
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-right: 20px;
  top: 535px;
  position: absolute;
  height: 36px;
  background: white;
  box-shadow: -4px -4px 8px #DFE6F5 inset;
  border-radius: 35px;
  display:${this.prop === 'Perlas GO' && !userId ? 'flex' : 'none'};
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
      font-size: 22px;
      font-family: 'Basis Grotesque Pro', sans-serif;
      font-weight: 800;
      line-height: 24px;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
    "

    rel="noopener noreferrer"
  >
    PANAUDOK KODĄ
  </a>
</div>

      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:580px;position:absolute; height: 36px; background: ${'white'}; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-game-play-again">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 22px; font-family: ${
      this.prop === 'Perlas GO' ? 'Basis Grotesque Pro, sans-serif' : 'Georama'
    }; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">${
      this.prop === 'Akropolis' && this.language === 'LV'
        ? 'SPĒLĒT VĒLREIZ'
        : this.prop === 'Eurovaistine'
        ? 'UZLABOT REZULTĀTU'
        : this.language === 'LV'
        ? 'UZLABOT REZULTĀTU'
        : this.language === 'RU'
        ? 'УЛУЧШИТЬ РЕЗУЛЬТАТ'
        : this.language === 'ET'
        ? 'PARANDA TULEMUST'
        : this.language === 'ES'
        ? 'MEJORAR EL RESULTADO'
        : this.language === 'EN'
        ? 'IMPROVE YOUR SCORE'
        : this.language === 'ES'
        ? 'MEJORA TU PUNTAJE'
        : 'PAGERINK REZULTATĄ'
    }</div>
      </div>

      <div style="left:calc(50% - 40px);width:78px;top:625px;position:absolute;margin-top:5px;height: 22px; background: url(${boomioLogo}); justify-content: center; align-items: center; display: flex;background-size: contain;background-repeat:no-repeat;" id="boomio-game-play-again">
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
