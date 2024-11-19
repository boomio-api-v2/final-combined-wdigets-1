import './styles.css';

import { boomioLogo, close } from './constants';
export class RulesContainer {
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
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;

    const content =
      this.campaignUrlProp === 'https://pigu.lt'
        ? `<div><p><meta charset="utf-8"></p>

<p><strong>BENDROSIOS NUOSTATOS</strong></p>

<p>1.&nbsp; &nbsp; &nbsp;&nbsp;Šios žaidimo taisyklės (toliau – Žaidimo taisyklės) nustato UAB „Pigu“ (įmonės kodas 300866792, buveinė Laisvės pr. 75, LT-06144 Vilnius) (toliau – Akcijos organizatorius) organizuojamo žaidimo vykdymo tvarką, žaidimo dovanas ir jų įteikimo, ginčų sprendimo ir kitą tvarką. &nbsp;</p>

<p>2.&nbsp; &nbsp; &nbsp;&nbsp;Žaidimo vykdymo laikotarpis:&nbsp;2024 m. lapkričio 15 d. – 2024 m. gruodžio 22 d.&nbsp;(imtinai).</p>

<p>3.&nbsp; &nbsp; &nbsp;&nbsp;Žaidimo dalyvis turi būti registruotas pigu.lt narys&nbsp;&nbsp;ir būti sutikęs gauti žaidimo naujienas ir informaciją apie prizus.</p>

<p>4.&nbsp; &nbsp; &nbsp;&nbsp;Žaidimas vykdomas Pigu.lt mobiliojoje programėlėje. Žaidimo metu žaidimo dalyvis kontroliuoja žaidimo herojų, kurio tikslas šokinėjant platformomis pakilti kuo aukščiau nenukrentat. Platformos gali sulūžti. Kiekviena užšokta platforma suteikia taškų. Siekiant pagerinti rezultatą, žaidimo dalyvis žaidimą gali kartoti.</p>

<p><strong>ŽAIDIMO DOVANOS IR JŲ ĮTEIKIMO TVARKA</strong></p>

<p>5.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Žaidimo dovanas sudaro:</p>

<p>5.1.&nbsp;&nbsp;nuolaidos kodai, apsiperkant Pigu.lt programėlėje, kurie galioja tik laimėjimo dieną iki vidurnakčio, nurodytomis sąlygomis žaidimo lange.</p>

<p>5.2.&nbsp;dešimt&nbsp;20€&nbsp;vertės dovanų kuponų, kuriuos laimi 10 daugiausiai taškų pasiekusių žaidimo dalyvių kiekvieną savaitę.</p>

<p>6.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kasdien, daugiau nei 1500 taškų surinkę, žaidimo dalyviai gauna nuolaidos kodą.</p>

<p>7.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kiekvieną savaitę, dešimt daugiausiai taškų pasiekusių žaidimo dalyvių laimės&nbsp;20€&nbsp;vertės dovanų kuponus.</p>

<p>8.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Informavimo apie žaidimo dovaną ir jų įteikimo tvarka:</p>

<p>8.1.&nbsp;&nbsp;Apie žaidimo dovaną, nurodytą Žaidimo taisyklių 5.1. punkte, žaidimo dalyvis yra informuojamas rezultatų lange, iš karto po žaidimo laimėjimo.</p>

<p>8.2.&nbsp;Apie žaidimo dovaną, nurodytą Žaidimo taisyklių 5.2. punkte, žaidimo dalyvis yra informuojamas jo nurodytu&nbsp;elektroninio pašto adresu. Informacija apie praėjusios savaitės žaidimo laimėjimą siunčiama pirmadieniais, šiomis dienomis: 2024 m.&nbsp;lapkričio 25 d., 2024 m. gruodžio 2 d., 2024 m. gruodžio 9 d., 2024 m. gruodžio 16 d., 2024 m. gruodžio 23 d.</p>

<p>9.&nbsp; &nbsp; &nbsp;&nbsp;Žaidimo dovanų kuponų panaudojimo sąlygos:</p>

<p>9.1.&nbsp;Dovanų kuponas galioja 1 savaitę nuo jo išsiuntimo dienos.</p>

<p>9.2.&nbsp;Dovanų kuponas negrąžinamas bei į pinigus nekeičiamas.</p>

<p>9.3.&nbsp;Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą, suma viršija dovanų kupono vertę, trūkstamą sumą galima sumokėti pasirinkus vieną iš Pigu.lt siūlomų atsiskaitymo būdų.</p>

<p>9.4.&nbsp;Dovanų kupono kodas gali būti pritaikytas tik vienam užsakymui. Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą suma yra mažesnė nei dovanų kupono vertė, susidaręs skirtumas negrąžinamas.</p>

<p>9.5.&nbsp;Dovanų kuponas negalioja PVM mokėtojams - fiziniams ir juridiniams asmenims (išskyrus biudžetines įstaigas), kai bandoma atsiskaityti už prekes, kurioms taikomas atvirkštinis PVM apmokestinimas.</p>

<p><strong>BAIGIAMOSIOS NUOSTATOS</strong></p>

<p>10.&nbsp; &nbsp;Nustačius nesąžiningą žaidimo dalyvio elgesį, Akcijos organizatorius pasilieka teisę žaidimo dalyvį pašalinti iš žaidimo be išankstinio pranešimo.</p>

<p>11.&nbsp; &nbsp;Visi ginčai, kylantys dėl žaidimo, yra sprendžiami derybų būdu. Jei susitarimo nepavyksta pasiekti derybomis, ginčai yra sprendžiami Lietuvos teisme Lietuvos Respublikos įstatymų nustatyta tvarka pagal Akcijos organizatoriaus buveinės vietą.</p>

<p>12.&nbsp; &nbsp;Akcijos organizatorius turi teisę vienašališkai nutraukti žaidimą ir panaikinti prizus dėl nenugalimos jėgos aplinkybių (force majeure) iš karto po to, kai dalyviai informuojami apie žaidimo nutraukimą viešai.</p>

<p>13.&nbsp; &nbsp;Akcijos organizatorius turi teisę be išankstinio įspėjimo vienašališkai keisti ar papildyti šias Žaidimo taisykles, apie tai žaidimo dalyvius informuodamas&nbsp;https://pigu.lt/lt/t/zaidimo-taisykles-jump&nbsp;puslapyje.</p>

<p>14.&nbsp; &nbsp;Akcijos organizatorius įsipareigoja užtikrinti jam perduotų asmens duomenų saugumą ir neperduoti jų tretiesiems asmenims, išskyrus atvejus, kai to duomenų pateikimas būtinas pagal teisės aktų reikalavimus.</p>

<p>15.&nbsp; &nbsp;Apriboti Jūsų asmens duomenų tvarkymą ir/ar įgyvendinti Jūsų kaip asmens duomenų subjekto teises Jūs galite šiais būdais:</p>

<p>- susisiekdami su mumis el. paštu:&nbsp;<a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a>;</p>

<p>- susisiekdami su mumis telefonu: +370 52073998.</p>

<p>Su žaidimu susijusių asmens duomenų tvarkymui yra taikomos Privatumo politikos nuostatos, su kuriomis galite susipažinti adresu&nbsp;https://pigu.lt/lt/t/privatumo-politika.</p>

<p>Mums svarbi Jūsų nuomonė bei pasiūlymai! Lauksime jų el.p.&nbsp;<a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p></div>`
        : this.campaignUrlProp === 'https://220.lv'
        ? `<div><p><strong>VISPĀRĪGI NOTEIKUMI</strong></p>

<p>1. Šos&nbsp;spēles noteikumus (turpmāk tekstā “Spēles noteikumi”) nosaka&nbsp;SIA "Pigu Latvia"&nbsp;(uzņēmuma kods&nbsp;43603025092, juridiskā adrese&nbsp;Krasta iela 52, Rīga, LV-1003, Latvija) (turpmāk tekstā “Akcijas organizētājs”) organizētās spēles norises kārtību, spēles balvas un to piegādi, strīdu risināšanu un citas procedūras.</p>

<p>2. Spēles periods: 2024. gada 15. novembris - 2024. gada 22. decembris (ieskaitot).</p>

<p>3. Spēles dalībniekam jābūt&nbsp;reģistrētam 220.lv lietotājam&nbsp;un jāpiekrīt saņemt spēles jaunumus un informāciju par balvām.</p>

<p>4. Spēle norisinās 220.lv mobilajā lietotnē. Spēles laikā dalībnieks kontrolē spēles varoni, kura mērķis ir lēkt pa platformām, lai uzlēktu pēc iespējas augstāk, nenokrītot. Platformas var salūzt. Katra sasniegtā platforma dod punktus. Lai uzlabotu rezultātu, spēles dalībnieks var atkārtot spēli.</p>

<p><strong>SPĒLES BALVAS UN TO PIEGĀDES PROCEDŪRA</strong></p>

<p>5.&nbsp;Spēles balvas sastāv no:</p>

<p>&nbsp; &nbsp;5.1. Atlaižu kodi, iepērkoties<a href="https://www.google.com/url?q=http://220.lv&amp;sa=D&amp;source=editors&amp;ust=1731608554328927&amp;usg=AOvVaw1isZq09jHrS3R--QBwjmjh">&nbsp;</a>220.lv&nbsp;lietotnē, kas ir derīgi tikai uzvaras dienā līdz pusnaktij ar papildu nosacījumiem tiek parādīti spēles logā.</p>

<p>&nbsp; &nbsp;5.2. desmit 220.lv dāvanu kartes 20 eiro vērtībā, kurus iegūst 10 spēles dalībnieki, kuri katru nedēļu ir ieguvuši visvairāk punktu.</p>

<p>6.&nbsp;Katru dienu, spēles dalībnieki, kuri iegūst vairāk nekā 1500 punktius, saņem atlaižu kodu.</p>

<p>7. Katru nedēļu desmit spēles dalībnieki, kuri iegūst visvairāk punktu, laimēs 220.lv dāvanu kartes 20 eiro vērtībā.</p>

<p>8. Informēšana par spēles balvu un tās piegādes procedūra:</p>

<p>&nbsp; &nbsp;8.1. par spēles balvu, kas norādīta Spēles noteikumu 5.1. punktā, spēles dalībnieks tiek informēts rezultātu logā uzreiz pēc spēles pabeigšanas un uzvaras.</p>

<p>&nbsp; &nbsp;8.2. par spēles balvu, kas norādīta Spēles noteikumu 5.2. punktā, spēles dalībnieks tiek informēts uz viņa norādīto e-pasta adresi. Informācija par iepriekšējās nedēļas spēles uzvarām tiek nosūtīta pirmdienās šādos datumos: 2024. gada 25. novembrī, 2024. gada 2. decembrī, 2024. gada 9. decembrī, 2024. gada 16. decembrī, 2024. gada 23. decembrī.</p>

<p>9. Spēles dāvanu kartes izmantošanas noteikumi:</p>

<p>&nbsp; &nbsp;9.1. dāvanu karte ir derīga 1 nedēļu no tās nosūtīšanas dienas;</p>

<p>&nbsp; &nbsp;9.2. dāvanu karte nav atmaksājama un to nevar apmainīt pret skaidru naudu;</p>

<p>&nbsp; &nbsp;9.3. ja pasūtījuma, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa pārsniedz dāvanu kartes vērtību, trūkstošo summu var samaksāt, izvēloties vienu no 220.lv piedāvātajiem maksājumu veidiem;</p>

<p>&nbsp; &nbsp;9.4. dāvanu kartes kods var tikt piemērots tikai vienam pasūtījumam. Ja pasūtījumam, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa ir mazāka par dāvanu kartes vērtību, starpība netiek atmaksāta;</p>

<p>&nbsp; &nbsp;9.5.&nbsp;Dāvanu karte nav izmantojama PVN maksātājiem &nbsp;norēķiniem par precēm, kurām tiek pielietots reversais PVN.</p>

<p><strong>NOBEIGUMA NOTEIKUMI</strong></p>

<p>10.&nbsp;Konstatējot negodīgu spēles dalībnieka rīcību, Akcijas organizētājs patur tiesības izslēgt spēles dalībnieku no spēles bez iepriekšēja brīdinājuma.</p>

<p>11. Visi strīdi, kas izriet no spēles, tiek risināti sarunu ceļā. Ja sarunu ceļā neizdodas panākt vienošanos, strīdi tiek risināti Latvijas tiesā saskaņā ar Latvijas Republikas likumdošanā noteikto kārtību atbilstoši Akcijas organizētāja juridiskās adreses atrašanās vietai.</p>

<p>12. Akcijas organizētājam ir tiesības vienpusēji izbeigt spēli un atcelt balvas nepārvaramas varas apstākļu (force majeure) dēļ nekavējoties pēc tam, kad dalībnieki ir publiski informēti par spēles izbeigšanu.</p>

<p>13. Akcijas organizētājam ir tiesības vienpusēji mainīt vai papildināt šos Spēles noteikumus bez iepriekšēja brīdinājuma, par to informējot spēles dalībniekus tīmekļa vietnē<a href="https://www.google.com/url?q=https://pigu.lt/lt/t/zaidimo-taisykles&amp;sa=D&amp;source=editors&amp;ust=1731608554330305&amp;usg=AOvVaw36sTBgp6D0mUmW74bLSHqi">&nbsp;</a>https://220.lv/lv/t/game-rules-jump.</p>

<p>14. Akcijas organizētājs apņemas nodrošināt tam nodoto personas datu drošību un nenodot tos trešajām personām, izņemot gadījumus, kad šādu datu sniegšana ir nepieciešama saskaņā ar normatīvo aktu prasībām.</p>

<p>15. Jūs varat ierobežot savu personas datu apstrādi un/vai izmantot savas kā datu subjekta tiesības šādos veidos:</p>

<ul>
	<li>sazinoties ar mums pa e-pastu:&nbsp;<a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a>;</li>
	<li>sazinoties ar mums pa tālruni:&nbsp;+371 60001472.</li>
</ul>

<p>Spēles noteikumiem piemērojami Privātuma politikas noteikumi, ar kuriem varat iepazīties vietnē<a href="https://www.google.com/url?q=https://pigu.lt/lt/t/privatumo-politika&amp;sa=D&amp;source=editors&amp;ust=1731608554330940&amp;usg=AOvVaw0xhPhnLtWuNvBXwUZplShE">&nbsp;</a>https://220.lv/lv/t/privatuma-politika.</p>

<p>Mēs novērtējam Jūsu viedokli un ieteikumus! Gaidīsim tos uz e-pasta adresi&nbsp;<a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p></div>`
        : this.campaignUrlProp === 'https://kaup.ee'
        ? `<div><p><strong>ÜLDISED SÄTTED</strong></p>

<p>1.&nbsp;Käesolevad mängureeglid (edaspidi "mängureeglid") kehtestavad DLB Trading OÜ (ettevõtte reg.nr 11791329, aadressil Peterburi tee 2F, 11415 Tallinn, Eesti) (edaspidi "kampaania korraldaja") korraldatava mängu läbiviimise korra, mängu auhinnad ja nende kättetoimetamise, vaidluste lahendamise ja muud protseduurid.</p>

<p>2. Mängu periood: 15. november 2024 - 22. detsember 2024 (kaasa arvatud)</p>

<p>3. Mängus osaleja peab olema registreeritud pigu.lt liige ja olema nõustunud saama mängu uudiseid ja teavet auhindade kohta.</p>

<p>4. Mängu mängitakse Kaup24.ee mobiilirakenduses. Mängu ajal juhib mängus osaleja mängu kangelast, kelle eesmärk on hüpata platvormidel võimalikult kõrgele, ilma et ta kukuks. Platvormid võivad puruneda. Iga hüpatud platvorm annab punkte. Tulemuse parandamiseks võib mängus osaleja mängu korrata.</p>

<p><strong>MÄNGU AUHINNAD JA NENDE KÄTTEANDMISE KORD</strong></p>

<p>5.&nbsp;Mängu auhinnad koosnevad:</p>

<p>&nbsp; &nbsp;5.1.&nbsp;allahindluskoodid, ostude tegemisel Kaup24.ee rakenduses, mis kehtivad ainult võitmise päeval kuni südaööni mänguaknas näidatud lisatingimustega</p>

<p>&nbsp; &nbsp;5.2. kümme kinkekaarti väärtuses 20€, mille võidavad 10 mängus osalejat, kes on igal nädalal kogunud kõige rohkem punkte.</p>

<p>6.&nbsp;Iga päev saavad mängus osalejad, kes koguvad rohkem kui 1500 punkti, allahindluskoodi.</p>

<p>7. Igal nädalal võidavad kümme enim punkte kogunud mängus osalejat kinkekaardid väärtusega 20€.</p>

<p>8. Mängu auhinnast ja selle kättetoimetamisest teavitamise kord:</p>

<p>&nbsp; &nbsp;8.1. mängu auhinnast, mis on nimetatud mängureeglite punktis 5.1, teavitatakse mängus osalejat tulemuste aknas kohe pärast mängu võitmist.</p>

<p>&nbsp; &nbsp;8.2. mängu auhinnast, mis on nimetatud mängureeglite punktis 5.2, teavitatakse mängus osalejat tema poolt megatud e-posti aadressil. Teave eelmise nädala mängu võitmise kohta saadetakse välja esmaspäeviti järgmistel kuupäevadel: 25. november 2024, 2. detsember 2024, 9. detsember 2024, 16. detsember 2024, 23. detsember 2024.</p>

<p>9. Mängu kinkekaartide kasutustingimused:</p>

<p>&nbsp; &nbsp;9.1. kinkekaart kehtib 1 nädala jooksul alates selle väljastamise kuupäevast;</p>

<p>&nbsp; &nbsp;9.2. kinkekaart ei ole tagastatav ega vahetatav raha vastu;</p>

<p>&nbsp; &nbsp;9.3. kui tellimuse, mille eest tasutakse kinkekaardiga, summa ületab kinkekaardi väärtuse, saab puuduoleva summa tasuda, valides ühe Kaup24.ee pakutavatest makseviisidest;</p>

<p>&nbsp; &nbsp;9.4. kinkekaardi koodi saab kasutada ainult ühe tellimuse kohta. Kui tellimuse, mille eest tasutakse kinkekaardiga, summa on väiksem kui kinkekaardi väärtus, siis tekkinud vahet ei tagastata;</p>

<p>&nbsp; &nbsp;9.5. kinkekaart ei kehti käibemaksukohustuslastele - füüsilistele ja juriidilistele isikutele (välja arvatud eelarvelised asutused), kui püütakse tasuda kaupade eest, millele kohaldatakse pöördmaksustamist;.</p>

<p><strong>LÕPPSÄTTED</strong></p>

<p>10.&nbsp;Mängus osaleja ebaausate tegude avastamise korral jätab kampaania korraldaja endale õiguse mängus osaleja mängust ilma eelneva etteteatamiseta eemaldada.</p>

<p>11. Kõik mängust tulenevad vaidlused lahendatakse läbirääkimiste teel. Kui läbirääkimiste teel ei jõuta kokkuleppele, lahendatakse vaidlused kohtus vastavalt Eesti Vabariigi seadustega kehtestatud korrale vastavalt kampaania korraldaja registrijärgsele asukohale.</p>

<p>12. Kampaania korraldajal on õigus mäng ühepoolselt lõpetada ja auhinnad tühistada vääramatu jõu (force majeure) tõttu kohe pärast seda, kui osalejaid on mängu lõpetamisest avalikult teavitatud.</p>

<p>13. Kampaania korraldajal on õigus neid mängureegleid ühepoolselt ja ette teatamata muuta või täiendada, teavitades sellest mängus osalejaid lehel<a href="https://www.google.com/url?q=https://pigu.lt/lt/t/zaidimo-taisykles&amp;sa=D&amp;source=editors&amp;ust=1731660373673165&amp;usg=AOvVaw3GRPqEDJGdwN1Ndo1TsNhq">&nbsp;</a>https://kaup24.ee/et/t/game-rules-jump.</p>

<p>14. Kampaania korraldaja kohustub tagama talle edastatud isikuandmete turvalisuse ja mitte edastama neid kolmandatele isikutele, välja arvatud juhul, kui selliste andmete esitamine on vajalik vastavalt õigusaktide nõuetele.</p>

<p>15. Te saate oma isikuandmete töötlemist piirata ja/või kasutada oma andmesubjekti õigusi järgmistel viisidel:</p>

<ul>
	<li>võttes meiega ühendust e-posti teel: andmekaitse@kaup24.ee;</li>
	<li>võttes meiega ühendust telefoni teel: +372 6 468 107.</li>
</ul>

<p>Mänguga seotud isikuandmete töötlemisele kohaldatakse privaatsuspoliitika sätteid, millega saab tutvuda aadressil&nbsp;https://kaup24.ee/et/t/privaatsuspoliitika.</p>

<p>Me hindame teie arvamust ja ettepanekuid! Ootame neid e-posti aadressil pood@kaup24.ee.</p></div>`
        : this.campaignUrlProp === 'https://hobbyhall.fi' &&
          `<div><p><strong>YLEISET&nbsp;MÄÄRÄYKSET</strong></p>

<p>1.&nbsp;Nämä pelisäännöt (jäljempänä "pelisäännöt") määrittelevät&nbsp;Hobby Hall Suomi Oy&nbsp;(jäljempänä "kampanjan järjestäjä") järjestämän pelin järjestämismenettelyjä, pelin palkintoja ja niiden toimitusta, riitojen ratkaisua ja muita menettelyjä.</p>

<p>2. Pelijakso: 15.11. - 22.12.2024.</p>

<p>3. Pelin osallistujan on oltava rekisteröitynyt Hobbyhall.fi-verkkokauppaan ja hänen on oltava hyväksynyt pelin tietojen ja palkintotietojen vastaanotto.</p>

<p>4. Peliä pelataan Hobbyhall.fi-mobiilisovelluksessa. Pelin aikana pelaaja ohjaa pelin sankaria, jonka tavoitteena on hypätä alustoille päästäkseen mahdollisimman korkealle putoamatta. Alustat voivat rikkoutua. Jokainen hypätty alusta antaa pisteitä. Tuloksen parantamiseksi pelaaja voi pelata pelin uudelleen.</p>

<p><strong>PELIN PALKINNOT JA NIIDEN TOIMITUSMENETTELY</strong></p>

<p>5.&nbsp;Pelipalkinnot koostuvat seuraavista:</p>

<p>&nbsp; &nbsp;5.1.&nbsp;Joka päivä, pelin osallistujat jotka saavat yli 1500 pistettä saavat alekoodin. Koodin voi käyttää Hobbyhall.fi-sovelluksessa ja se on voimassa vain voittopäivänä 23:59 asti. Ehdot näkyvät pelin ruudulla.</p>

<p>&nbsp; &nbsp;5.2. Viikoittain kymmenen eniten pisteitä saanutta osallistujaa voittaa 20€:n lahjakortin.</p>

<p>6. Pelipalkinnosta ja sen toimittamisesta tiedottaminen:</p>

<p>&nbsp; &nbsp;6.1. Pelin osallistujalle ilmoitetaan pelisääntöjen kohdassa 5.1 määritellystä pelipalkinnosta tulosikkunassa heti pelin päättymisen jälkeen.</p>

<p>&nbsp; &nbsp;6.2. Pelisääntöjen kohdassa 5.2 määritellystä pelipalkinnosta ilmoitetaan pelin osallistujalle hänen ilmoittamaansa sähköpostiosoitteeseen. Tiedot edellisen viikon pelin voittamisesta lähetetään maanantaisin seuraavina päivinä: 25.11.2024, 2.12.2024, 9.12.2024, 16.12.2024, 23.12.2024.</p>

<p>7. Pelissä voitettujen lahjakorttien käyttöehdot:</p>

<p>&nbsp; &nbsp;7.1. lahjakortti on voimassa yhden viikon sen lähettämispäivästä;</p>

<p>&nbsp; &nbsp;7.2. lahjakorttia ei voi palauttaa eikä vaihtaa rahaksi;</p>

<p>&nbsp; &nbsp;7.3. jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa ylittää lahjakortin arvon, puuttuvan summan voi maksaa valitsemalla jonkin muun Hobbyhall.fi-verkkokaupan tarjoamista maksutavoista;</p>

<p>&nbsp; &nbsp;7.4. lahjakorttikoodia voi käyttää vain yhteen tilaukseen. Jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa on pienempi kuin lahjakortin arvo, erotusta ei palauteta;</p>

<p>&nbsp;&nbsp;&nbsp;7.5. Lahjakorttia eivät voi käyttää arvonlisäverovelvolliset (luonnolliset henkilöt ja oikeushenkilöt, lukuun ottamatta julkisia organisaatioita ja laitoksia), kun maksetaan tuotteita, joihin sovelletaan käännettyä arvonlisäverovelvollisuutta;</p>

<p><strong>LOPPUMÄÄRÄYKSET</strong></p>

<p>8. Kampanjan järjestäjä pidättää oikeuden poistaa pelin osallistuja pelistä ilman ennakkoilmoitusta, jos havaitaan&nbsp;epärehellistä toimintaa.</p>

<p>9. Kaikki pelistä johtuvat riidat ratkaistaan neuvottelemalla. Jos neuvotteluissa ei päästä sopimukseen, riidat ratkaistaan Suomen tuomioistuimessa Suomen tasavallan lakien mukaisesti kampanjan järjestäjän rekisteröidyn toimipaikan sijainnin mukaan.</p>

<p>10. Kampanjan järjestäjällä on oikeus yksipuolisesti lopettaa peli ja peruuttaa palkinnot force majeure&nbsp;-olosuhteiden vuoksi välittömästi sen jälkeen, kun osallistujille on ilmoitettu julkisesti pelin päättymisestä.</p>

<p>11. Kampanjan järjestäjällä on oikeus yksipuolisesti muuttaa tai täydentää näitä pelisääntöjä ilman ennakkoilmoitusta ilmoittamalla siitä pelin osallistujille osoitteessa&nbsp;https://hobbyhall.fi/fi/t/game-rules-jump&nbsp;</p>

<p>12. Kampanjan järjestäjä sitoutuu varmistamaan sille siirrettyjen henkilötietojen turvallisuuden eikä luovuta niitä kolmansille osapuolille, paitsi jos kyseisten tietojen toimittaminen on tarpeen lakisääteisten vaatimusten mukaisesti.</p>

<p>13. Voit rajoittaa henkilötietojesi käsittelyä ja/tai käyttää oikeuksiasi rekisteröitynä seuraavasti:</p>

<ul>
	<li>ottamalla meihin yhteyttä sähköpostitse:&nbsp;asiakaspalvelu@hobbyhall.fi</li>
	<li>ottamalla meihin yhteyttä puhelimitse:&nbsp;09 8566 8000.</li>
</ul>

<p>Peliin liittyvien henkilötietojen käsittelyyn sovelletaan tietosuojakäytännön määräyksiä, jotka löytyvät osoitteesta https://hobbyhall.fi/fi/t/privacy-policy.</p></div>`;
    const containerDiv = document.querySelector('.rules-table-container');
    containerDiv.innerHTML += `
              </div>
              <div id="close-rules-container" style="display:block;width: 100%; display:flex;justify-content:end;align-items:end;margin-top:10px">
<img src=${close} alt="Image Description" style="width:32px;height:32px;padding-right:10px;"></img>
</div>
<div class="boomio-custom-scrollbar-rules" style="overflow-x:hidden;overflow-y: scroll;height: calc(100% - 20px);text-align:left;padding-left:10px;font-size:10px;line-height:14px;min-width:320px;">
  ${content}
</div>
              </div>
    `;

    this.containerDiv = containerDiv;
    const closeBtn = document.getElementById('close-rules-container');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const rulesTableContainer = document.getElementById('rules-table-container');

        rulesTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        setTimeout(() => {
          rulesTableContainer.style.height = '10px';
          rulesTableContainer.style.top = 'calc(50% + 330px)';
          rulesTableContainer.style.opacity = 0;
        }, 100);
        setTimeout(() => {
          rulesTableContainer.style.display = 'none';
        }, 1000);
      });
    }
    if (document.getElementById('boomio-copy-modal-btn')) {
      document.getElementById('boomio-copy-modal-btn').onclick = () => {
        const textToCopy = userDiscountCode;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand('copy');
        document.body.removeChild(textarea);
      };
    }
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('rules-table-container');
    containerDiv.setAttribute('id', 'rules-table-container');
    containerDiv.style.background = '#DDDDDD';
    containerDiv.style.borderRadius = '10px';
    containerDiv.style.paddingBottom = '20px';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '315px'
          : document.body.offsetWidth - 60 + 'px'
        : '366px';
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
