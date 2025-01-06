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
    this.language = urlParams.get('language');

    const content =
      this.campaignUrlProp === 'https://pigu.lt' && this.language === 'LT'
        ? `<div>
    <p><meta charset="utf-8"></p>
    <p><strong>Žaidimo taisyklės</strong></p>
    <p>Redakcija nuo 2025-01-06</p>

    <p><strong>BENDROSIOS NUOSTATOS</strong></p>

    <p>1.&nbsp;&nbsp;&nbsp;Šios žaidimo taisyklės (toliau – Žaidimo taisyklės) nustato UAB „Pigu“ (įmonės kodas 300866792, buveinė Laisvės pr. 75, LT-06144 Vilnius) (toliau – Akcijos organizatorius) organizuojamo žaidimo vykdymo tvarką, žaidimo dovanas ir jų įteikimo, ginčų sprendimo ir kitą tvarką.</p>

    <p>2.&nbsp;&nbsp;&nbsp;Žaidimo vykdymo laikotarpis: 2024 m. lapkričio 15 d. – 2025 m. vasario 2 d. (imtinai).</p>

    <p>3.&nbsp;&nbsp;&nbsp;Žaidimo dalyvis turi būti registruotas pigu.lt narys ir būti sutikęs gauti žaidimo naujienas ir informaciją apie prizus.</p>

    <p>4.&nbsp;&nbsp;&nbsp;žaidimas vykdomas Pigu.lt mobiliojoje programėlėje. žaidimo metu žaidimo dalyvis kontroliuoja žaidimo herojų, kurio tikslas skrendant neatsitrenkti į kliūtis. Siekiant pagerinti rezultatą, žaidimo dalyvis žaidimą gali kartoti.</p>

    <p><strong>žAIDIMO DOVANOS IR JŲ ĮTEIKIMO TVARKA</strong></p>

    <p>5.&nbsp;&nbsp;&nbsp;Kiekvieną savaitę, dešimt atsitiktine tvarka atrinktų žaidimo dalyvių, surinkusių 1000 ar daugiau taškų, laimės 20€ vertės dovanų kuponus ar fizinį prizą. Informaciją apie fizinį prizą galima bus rasti Pigu.lt Facebook ir Instagram socialinių tinklų profiliuose.</p>

    <p>5.1.&nbsp;&nbsp;žaidimo dovaną žaidimo dalyvis gali gauti tik vieną kartą per 28 dienas nuo žaidimo laimėtojų paskelbimo, kurio datos pateiktos taisyklių 6.1. punkte. Jei tarp dešimties atrinktų žaidėjų patenka žaidimo dalyvis, kuris jau gavo žaidimo dovaną per paskutines 28 dienas, jo dovana perleidžiama kitam žaidėjui atsitiktinės atrankos būdu.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Informavimo apie žaidimo dovaną ir jų įteikimo tvarka:</p>

    <p>6.1.&nbsp;&nbsp;Apie žaidimo dovaną, nurodytą žaidimo taisyklių 5. punkte, žaidimo dalyvis yra informuojamas jo nurodytu elektroninio pašto adresu. Informacija apie praėjusios savaitės žaidimo laimėjimą siunčiama pirmadieniais, šiomis dienomis: 2024 m. lapkričio 25 d., 2024 m. gruodžio 2 d., 2024 m. gruodžio 9 d., 2024 m. gruodžio 16 d., 2024 m. gruodžio 23 d., 2024 m. gruodžio 30 d., 2025 m. sausio 6 d., 2025 m. sausio 13 d., 2025 m. sausio 20 d., 2025 m. sausio 27 d., 2025 m. vasario 3 d.</p>

    <p>7.&nbsp;&nbsp;&nbsp;žaidimo dovanų kuponų panaudojimo sąlygos:</p>

    <p>7.1.&nbsp;&nbsp;Dovanų kuponas galioja 1 savaitę nuo jo išsiuntimo dienos;</p>

    <p>7.2.&nbsp;&nbsp;Dovanų kuponas negrąžinamas bei į pinigus nekečiamas;</p>

    <p>7.3.&nbsp;&nbsp;Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą, suma viršija dovanų kupono vertę, trūkstamą sumą galima sumokėti pasirinkus vieną iš Pigu.lt siūlomų atsiskaitymo būdų;</p>

    <p>7.4.&nbsp;&nbsp;Dovanų kupono kodas gali būti pritaikytas tik vienam užsakymui. Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą suma yra mažesnė nei dovanų kupono vertė, susidaręs skirtumas negrąžinamas;</p>

    <p>7.5.&nbsp;&nbsp;Dovanų kuponas negalioja PVM mokėtojams - fiziniams ir juridiniams asmenims (išskyrus biudžetines įstaigas), kai bandoma atsiskaityti už prekes, kurioms taikomas atvirkštinis PVM apmokestinimas.</p>

    <p>8.&nbsp;&nbsp;&nbsp;Visus su dovanos įteikimu susijusius pagal Lietuvos Respublikos teisės aktus mokėtinus mokesčius (įskaitant ir jos siuntimo išlaidas Lietuvos Respublikoje) sumoka Akcijos organizatorius.</p>

    <p><strong>BAIGIAMOSIOS NUOSTATOS</strong></p>

    <p>9.&nbsp;&nbsp;&nbsp;Nustačius nesąžiningą žaidimo dalyvio elgesį, Akcijos organizatorius pasilieka teisę žaidimo dalyvį pašalinti iš žaidimo be išankstinio pranešimo.</p>

    <p>10.&nbsp;&nbsp;&nbsp;Visi ginčai, kylantys dėl žaidimo, yra sprendžiami derybų būdu. Jei susitarimo nepavyksta pasiekti derybomis, ginčai yra sprendžiami Lietuvos teisme Lietuvos Respublikos įstatymų nustatyta tvarka pagal Akcijos organizatoriaus buveinės vietą.</p>

    <p>11.&nbsp;&nbsp;&nbsp;Akcijos organizatorius turi teisę vienašališkai nutraukti žaidimą ir panaikinti prizus dėl nenugalimos jėgos aplinkybių (force majeure) iš karto po to, kai dalyviai informuojami apie žaidimo nutraukimą viešai.</p>

    <p>12.&nbsp;&nbsp;&nbsp;Akcijos organizatorius turi teisę be išankstinio įspėjimo vienašališkai keisti ar papildyti šias žaidimo taisykles, apie tai žaidimo dalyvius informuodamas <a href="https://pigu.lt/lt/t/zaidimo-taisykles-jump">https://pigu.lt/lt/t/zaidimo-taisykles-jump</a> puslapyje.</p>

    <p>13.&nbsp;&nbsp;&nbsp;Akcijos organizatorius įsipareigoja užtikrinti jam perduotų asmens duomenų saugumą ir neperduoti jų tretiesiems asmenims, išskyrus atvejus, kai to duomenų pateikimas būtinas pagal teisės aktų reikalavimus.</p>

    <p>14.&nbsp;&nbsp;&nbsp;Apriboti Jūsų asmens duomenų tvarkymą ir/ar įgyvendinti Jūsų kaip asmens duomenų subjekto teises Jūs galite šiais būdais:</p>

    <p>- susisiekdami su mumis el. paštu: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a>;</p>

    <p>- susisiekdami su mumis telefonu: +370 52073998.</p>

    <p>Su žaidimu susijusių asmens duomenų tvarkymui yra taikomos Privatumo politikos nuostatos, su kuriomis galite susipažinti adresu <a href="https://pigu.lt/lt/t/privatumo-politika">https://pigu.lt/lt/t/privatumo-politika</a>.</p>

    <p>Mums svarbi Jūsų nuomonė bei pasiūlymai! Lauksime jų el.p. <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>


`
        : this.campaignUrlProp === 'https://pigu.lt' && this.language === 'EN'
        ? `<div>
    <p><meta charset="utf-8"></p>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-01-06</p>
    <p><strong>GENERAL PROVISIONS</strong></p>

    <p>1. These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by UAB "Pigu" (company code 300866792, registered address Laisvės pr. 75, LT-06144 Vilnius) (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution and other procedures.</p>
    <p>2. Game period: November 15, 2024 - December 22, 2024 (inclusive).</p>
    <p>3. The game participant must be a registered pigu.lt member and have agreed to receive game news and information about prizes.</p>
    <p>4. The game is played on the Pigu.lt mobile app. During the game, the game participant controls the game hero, whose goal is to avoid hitting obstacles while flying. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>

    <p>5. Each week, ten randomly selected game participants who have reached 1000 points or more will win €20 worth of gift vouchers or a physical prize. Information about the physical prize will be available on Pigu.lt's Facebook and Instagram social media profiles.</p>
    <p>5.1 A Participant may only receive a Game Prize once within 28 days of the announcement of the winners of the Game, the dates of which are set out in clause 6.1. If a Game Participant who has already received a Game Prize in the last 28 days is among the ten selected players, their Game Prize will be transferred to another player by random selection.</p>

    <p>6. The procedure for informing about the game prize and its delivery:</p>
    <p>6.1 The game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by him. Information about winning the previous week's game is sent on Mondays, on the following dates: November 25, 2024, December 2, 2024, December 9, 2024, December 16, 2024, December 23, 2024, 30 December 2024, 6 January 2025, 13 January 2025, 20 January 2025, 27 January 2025, 3 February 2025.</p>

    <p>7. Terms of use of game gift vouchers:</p>
    <p>7.1 The gift voucher is valid for 1 week from the date of its dispatch;</p>
    <p>7.2 The gift voucher is non-refundable and cannot be exchanged for cash;</p>
    <p>7.3 If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Pigu.lt;</p>
    <p>7.4 The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable;</p>
    <p>7.5 The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation;</p>

    <p><strong>FINAL PROVISIONS</strong></p>

    <p>8. Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>
    <p>9. All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in a Lithuanian court in accordance with the procedure established by the laws of the Republic of Lithuania according to the location of the Promotion Organizer's registered office.</p>
    <p>10. The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>
    <p>11. The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://pigu.lt/lt/t/zaidimo-taisykles">Game Rules Page</a>.</p>
    <p>12. The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>
    <p>13. You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>
    <ul>
        <li>By contacting us by e-mail: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a></li>
        <li>By contacting us by phone: +370 52073998</li>
    </ul>
    <p>The provisions of the <a href="https://pigu.lt/lt/t/privatumo-politika">Privacy Policy</a> apply to the processing of personal data related to the game.</p>

    <p>We value your opinion and suggestions! We will be waiting for them at the e-mail address <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>


`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'LV'
        ? `<div>
    <p><meta charset="utf-8"></p>
    <p><strong>Spēles noteikumi</strong></p>
    <p>Pārskatīts 2025. gada 6. janvārī</p>
    <p><strong>VISPĀRĪGI NOTEIKUMI</strong></p>

    <p>1.&nbsp;&nbsp;&nbsp;Šos spēles noteikumus (turpmāk tekstā “Spēles noteikumi”) nosaka SIA "Pigu Latvia" (uzņēmuma kods 43603025092, juridiskā adrese Krasta iela 52, Rīga, LV-1003, Latvija) (turpmāk tekstā “Akcijas organizētājs”) organizētās spēles norises kārtību, spēles balvas un to piegādi, strīdu risināšanu un citas procedūras.</p>

    <p>2.&nbsp;&nbsp;&nbsp;Spēles periods: 2024. gada 15. novembris - 2024. gada 22. decembris (ieskaitot).</p>

    <p>3.&nbsp;&nbsp;&nbsp;Spēles dalībniekam jābūt reģistrētam 220.lv lietotājam un jāpiekrīt saņemt spēles jaunumus un informāciju par balvām.</p>

    <p>4.&nbsp;&nbsp;&nbsp;Spēle norisinās 220.lv mobilajā lietotnē. Spēles laikā spēles dalībnieks kontrolē spēles varoni, kura mērķis ir izvairīties no šķēršļiem lidojuma laikā. Lai uzlabotu rezultātu, spēles dalībnieks var atkārtot spēli.</p>

    <p><strong>SPĒLES BALVAS UN TO PIEGĀDES PROCEDŪRA</strong></p>

    <p>5.&nbsp;&nbsp;&nbsp;Katru nedēļu desmit nejauši izvēlēti spēles dalībnieki, kuri ir sakrājuši 1000 punktus vai vairāk, laimēs 220.lv dāvanu kartes 20 eiro vērtībā.</p>

    <p>5.1&nbsp;&nbsp;Dalībnieks var saņemt Spēles balvu tikai vienu reizi 28 dienu laikā pēc Spēles uzvarētāju paziņošanas, noteiktajos datumos 6.1. punktā. Ja Spēlētājs, kurš pēdējo 28 dienu laikā jau ir saņēmis Spēles balvu, ir starp 10 nejauši izvēlētajiem spēlētājiem, viņa Spēles balva tiks nodota citam nejauši izvēlētam spēlētājam.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Informēšana par spēles balvu un tās piegādes procedūra:</p>

    <p>6.1.&nbsp;&nbsp;Par spēles balvu, kas norādīta Spēles noteikumu 5. punktā, spēles dalībnieks tiek informēts uz viņa norādīto e-pasta adresi. Informācija par iepriekšējās nedēļas spēles uzvarām tiek nosūtīta pirmdienās šādos datumos: 2024. gada 25. novembrī, 2024. gada 2. decembrī, 2024. gada 9. decembrī, 2024. gada 16. decembrī, 2024. gada 23. decembrī, 2024. gada 30. decembrī, 2025. gada 6. janvārī, 2025. gada 13. janvārī, 2025. gada 20. janvārī, 2025. gada 27. janvārī, 2025. gada 3. februārī.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Spēles dāvanu kartes izmantošanas noteikumi:</p>

    <p>7.1.&nbsp;&nbsp;Dāvanu karte ir derīga 1 nedēļu no tās nosūtīšanas dienas;</p>

    <p>7.2.&nbsp;&nbsp;Dāvanu karte nav atmaksājama un to nevar apmainīt pret skaidru naudu;</p>

    <p>7.3.&nbsp;&nbsp;Ja pasūtījuma, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa pārsniedz dāvanu kartes vērtību, trūkstošo summu var samaksāt, izvēloties vienu no 220.lv piedāvātajiem maksājumu veidiem;</p>

    <p>7.4.&nbsp;&nbsp;Dāvanu kartes kods var tikt piemērots tikai vienam pasūtījumam. Ja pasūtījumam, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa ir mazāka par dāvanu kartes vērtību, starpība netiek atmaksāta;</p>

    <p>7.5.&nbsp;&nbsp;Dāvanu karte nav izmantojama PVN maksātājiem norēķiniem par precēm, kurām tiek pielietots reversais PVN.</p>

    <p><strong>NOBEIGUMA NOTEIKUMI</strong></p>

    <p>8.&nbsp;&nbsp;Konstatējot negodīgu spēles dalībnieka rīcību, Akcijas organizētājs patur tiesības izslēgt spēles dalībnieku no spēles bez iepriekšēja brīdinājuma.</p>

    <p>9.&nbsp;&nbsp;Visi strīdi, kas izriet no spēles, tiek risināti sarunu ceļā. Ja sarunu ceļā neizdodas panākt vienošanos, strīdi tiek risināti Latvijas tiesā saskaņā ar Latvijas Republikas likumdošanā noteikto kārtību atbilstoši Akcijas organizētāja juridiskās adreses atrašanās vietai.</p>

    <p>10.&nbsp;&nbsp;Akcijas organizētājam ir tiesības vienpusēji izbeigt spēli un atcelt balvas nepārvaramas varas apstākļu (force majeure) dēļ nekavējoties pēc tam, kad dalībnieki ir publiski informēti par spēles izbeigšanu.</p>

    <p>11.&nbsp;&nbsp;Akcijas organizētājam ir tiesības vienpusēji mainīt vai papildināt šos Spēles noteikumus bez iepriekšēja brīdinājuma, par to informējot spēles dalībniekus tīmekļa vietnē <a href="https://220.lv/lv/t/game-rules-jump">https://220.lv/lv/t/game-rules-jump</a>.</p>

    <p>12.&nbsp;&nbsp;Akcijas organizētājs apņemas nodrošināt tam nodoto personas datu drošību un nenodot tos trešajām personām, izņemot gadījumus, kad šādu datu sniegšana ir nepieciešama saskaņā ar normatīvo aktu prasībām.</p>

    <p>13.&nbsp;&nbsp;Jūs varat ierobežot savu personas datu apstrādi un/vai izmantot savas kā datu subjekta tiesības šādos veidos:</p>

    <p>- sazinoties ar mums pa e-pastu: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a>;</p>

    <p>- sazinoties ar mums pa tālruni: +371 60001472.</p>

    <p>Spēles noteikumiem piemērojami Privātuma politikas noteikumi, ar kuriem varat iepazīties vietnē <a href="https://220.lv/lv/t/privatuma-politika">https://220.lv/lv/t/privatuma-politika</a>.</p>

    <p>Mēs novērtējam Jūsu viedokli un ieteikumus! Gaidīsim tos uz e-pasta adresi <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'RU'
        ? `<div>
    <p><meta charset="utf-8"></p>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 23 декабря 2024 г.</p>
    <p><strong>Правила игры</strong><br>Пересмотрено 23 декабря 2024 года</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>

    <p>1.&nbsp;&nbsp;&nbsp;Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры SIA "Pigu Latvia" (код компании 43603025092, юридический адрес Улица Краста, 52, Рига, LV-1003, Латвия) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>

    <p>2.&nbsp;&nbsp;&nbsp;Период проведения игры: 15 ноября 2024 г. - 22 декабря 2024 г. (включительно).</p>

    <p>3.&nbsp;&nbsp;&nbsp;Участник игры должен быть зарегистрированным участником 220.lv и согласиться получать новости игры и информацию о призах.</p>

    <p>4.&nbsp;&nbsp;&nbsp;Игра проводится в мобильном приложении 220.lv. Во время игры участник управляет игровым персонажем, цель которого — избегать препятствия во время полёта. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>

    <p>5.&nbsp;&nbsp;&nbsp;Каждую неделю десять участников игры, набравших наибольшее количество очков, будут выигрывать подарочных карт на сумму 20 евро.</p>

    <p>5.1.&nbsp;&nbsp;Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если Игрок, который уже получил приз игры за последние 28 дней, входит в топ-10 игроков, его приз будет передан следующему игроку с наивысшим количеством очков.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Порядок информирования об игровом призе и его доставке:</p>

    <p>6.1.&nbsp;&nbsp;Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 ноября 2024 г., 2 декабря 2024 г., 9 декабря 2024 г., 16 декабря 2024 г., 23 декабря 2024 г., 30 декабря 2024 года, 6 января 2025 года, 13 января 2025 года, 20 января 2025 года, 27 января 2025 года, 3 февраля 2025 года.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Условия использования подарочных ваучеров игры:</p>

    <p>7.1.&nbsp;&nbsp;Подарочная карта действительна в течение 1 недели с даты его отправки;</p>

    <p>7.2.&nbsp;&nbsp;Подарочная карта возврату не подлежит и не может быть обмененa на наличные;</p>

    <p>7.3.&nbsp;&nbsp;Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых 220.lv;</p>

    <p>7.4.&nbsp;&nbsp;Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит;</p>

    <p>7.5.&nbsp;&nbsp;Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом;</p>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>

    <p>8.&nbsp;&nbsp;При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>

    <p>9.&nbsp;&nbsp;Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в латвийском суде в соответствии с процедурой, установленной законодательством Латвийской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>

    <p>10.&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>

    <p>11.&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://220.lv/ru/t/game-rules-jump">https://220.lv/ru/t/game-rules-jump</a>.</p>

    <p>12.&nbsp;&nbsp;Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>

    <p>13.&nbsp;&nbsp;Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>

    <p>- связавшись с нами по электронной почте: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a></p>

    <p>- связавшись с нами по телефону: +371 60001472.</p>

    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://220.lv/ru/t/politika-konfidencialnosti">https://220.lv/ru/t/politika-konfidencialnosti</a>.</p>

    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>
`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'EN'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 6 января 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>

    <p>1. Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры SIA "Pigu Latvia" (код компании 43603025092, юридический адрес Улица Краста, 52, Рига, LV-1003, Латвия) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>

    <p>2. Период проведения игры: 15 ноября 2024 г. - 22 декабря 2024 г. (включительно).</p>

    <p>3. Участник игры должен быть зарегистрированным участником 220.lv и согласиться получать новости игры и информацию о призах.</p>

    <p>4. Игра проводится в мобильном приложении 220.lv. Во время игры участник управляет игровым персонажем, цель которого — избегать препятствия во время полёта. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>

    <p>5. Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</p>

    <p>5.1. Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6. Порядок информирования об игровом призе и его доставке:</p>

    <p>6.1. Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 ноября 2024 г., 2 декабря 2024 г., 9 декабря 2024 г., 16 декабря 2024 г., 23 декабря 2024 г., 30 декабря 2024 года, 6 января 2025 года, 13 января 2025 года, 20 января 2025 года, 27 января 2025 года, 3 февраля 2025 года.</p>

    <p><strong>Условия использования подарочных ваучеров игры:</strong></p>

    <p>7.1. Подарочная карта действительна в течение 1 недели с даты его отправки;</p>

    <p>7.2. Подарочная карта возврату не подлежит и не может быть обмененa на наличные;</p>

    <p>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых 220.lv;</p>

    <p>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит;</p>

    <p>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом;</p>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>

    <p>8. При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>

    <p>9. Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в латвийском суде в соответствии с процедурой, установленной законодательством Латвийской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>

    <p>10. Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>

    <p>11. Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://220.lv/ru/t/game-rules-jump">https://220.lv/ru/t/game-rules-jump</a>.</p>

    <p>12. Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>

    <p>13. Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>

    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a></li>
        <li>связавшись с нами по телефону: +371 60001472.</li>
    </ul>

    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://220.lv/ru/t/politika-konfidencialnosti">https://220.lv/ru/t/politika-konfidencialnosti</a>.</p>

    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>

`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'ET'
        ? `<div>
    <p><strong>Mängureeglid</strong></p>
    <p>Muudetud 06.01.2025</p>

    <p><strong>ÜLDISED SÄTTED</strong></p>

    <p>1. Käesolevad mängureeglid (edaspidi "mängureeglid") kehtestavad DLB Trading OÜ (ettevõtte reg.nr 11791329, aadressil Peterburi tee 2F, 11415 Tallinn, Eesti) (edaspidi "kampaania korraldaja") korraldatava mängu läbiviimise korra, mängu auhinnad ja nende kättetoimetamise, vaidluste lahendamise ja muud protseduurid.</p>

    <p>2. Mängu periood: 15. november 2024 - 22. detsember 2024 (kaasa arvatud)</p>

    <p>3. Mängus osaleja peab olema registreeritud pigu.lt liige ja olema nõustunud saama mängu uudiseid ja teavet auhindade kohta.</p>

    <p>4. Mängu mängitakse Kaup24.ee mobiilirakenduses. Mängu ajal juhib mängus osaleja mängukangelast, kelle eesmärk on lennata vältides tabamusi. Tulemuse parandamiseks võib mängus osaleja mängu korrata.</p>

    <p><strong>MÄNGU AUHINNAD JA NENDE KÄTTEANDMISE KORD</strong></p>

    <p>5. Igal nädalal võidavad kümme juhuslikult valitud mängus osalejat, kes on saavutanud vähemalt 1000 punkti, 20 euro väärtuses kinkekaarte.</p>

    <p>5.1. Osaleja võib saada mänguauhinna ainult üks kord 28 päeva jooksul alates mängu võitjate väljakuulutamisest, mille kuupäevad on sätestatud punktis 6.1. Kui mängus osaleja, kes on viimase 28 päeva jooksul juba võitnud auhinna ning on kümne väljavalitud mängija hulgas, kantakse tema mänguauhind juhusliku valiku teel üle teisele mängijale.</p>

    <p>6. Mängu auhinnast ja selle kättetoimetamisest teavitamise kord:</p>

    <p>6.1. mängu auhinnast, mis on nimetatud mängureeglite punktis 5, teavitatakse mängus osalejat tema poolt megatud e-posti aadressil. Teave eelmise nädala mängu võitmise kohta saadetakse välja esmaspäeviti järgmistel kuupäevadel: 25. november 2024, 2. detsember 2024, 9. detsember 2024, 16. detsember 2024, 23. detsember 2024, 30.detsember 2024. 6.jaanuar 2025, 13.jaanuar 2025, 20.jaanuar 2025, 27.jaanuar 2025, 3.veebruar 2025.</p>

    <p><strong>Mängu kinkekaartide kasutustingimused:</strong></p>

    <p>7.1. kinkekaart kehtib 1 nädala jooksul alates selle väljastamise kuupäevast;</p>

    <p>7.2. kinkekaart ei ole tagastatav ega vahetatav raha vastu;</p>

    <p>7.3. kui tellimuse, mille eest tasutakse kinkekaardiga, summa ületab kinkekaardi väärtuse, saab puuduoleva summa tasuda, valides ühe Kaup24.ee pakutavatest makseviisidest;</p>

    <p>7.4. kinkekaardi koodi saab kasutada ainult ühe tellimuse kohta. Kui tellimuse, mille eest tasutakse kinkekaardiga, summa on väiksem kui kinkekaardi väärtus, siis tekkinud vahet ei tagastata;</p>

    <p>7.5. kinkekaart ei kehti käibemaksukohustuslastele - füüsilistele ja juriidilistele isikutele (välja arvatud eelarvelised asutused), kui püütakse tasuda kaupade eest, millele kohaldatakse pöördmaksustamist;</p>

    <p><strong>LÕPPSÄTTED</strong></p>

    <p>8. Mängus osaleja ebaausate tegude avastamise korral jätab kampaania korraldaja endale õiguse mängus osaleja mängust ilma eelneva etteteatamiseta eemaldada.</p>

    <p>9. Kõik mängust tulenevad vaidlused lahendatakse läbirääkimiste teel. Kui läbirääkimiste teel ei jõuta kokkuleppele, lahendatakse vaidlused kohtus vastavalt Eesti Vabariigi seadustega kehtestatud korrale vastavalt kampaania korraldaja registrijärgsele asukohale.</p>

    <p>10. Kampaania korraldajal on õigus mäng ühepoolselt lõpetada ja auhinnad tühistada vääramatu jõu (force majeure) tõttu kohe pärast seda, kui osalejaid on mängu lõpetamisest avalikult teavitatud.</p>

    <p>11. Kampaania korraldajal on õigus neid mängureegleid ühepoolselt ja ette teatamata muuta või täiendada, teavitades sellest mängus osalejaid lehel <a href="https://kaup24.ee/et/t/game-rules-jump">https://kaup24.ee/et/t/game-rules-jump</a>.</p>

    <p>12. Kampaania korraldaja kohustub tagama talle edastatud isikuandmete turvalisuse ja mitte edastama neid kolmandatele isikutele, välja arvatud juhul, kui selliste andmete esitamine on vajalik vastavalt õigusaktide nõuetele.</p>

    <p>13. Te saate oma isikuandmete töötlemist piirata ja/või kasutada oma andmesubjekti õigusi järgmistel viisidel:</p>

    <p>- võttes meiega ühendust e-posti teel: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a>;</p>

    <p>- võttes meiega ühendust telefoni teel: +372 6 468 107.</p>

    <p>Mänguga seotud isikuandmete töötlemisele kohaldatakse privaatsuspoliitika sätteid, millega saab tutvuda aadressil <a href="https://kaup24.ee/et/t/privaatsuspoliitika">https://kaup24.ee/et/t/privaatsuspoliitika</a>.</p>

    <p>Me hindame teie arvamust ja ettepanekuid! Ootame neid e-posti aadressil <a href="mailto:pood@kaup24.ee">pood@kaup24.ee</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://pigu.lt' && this.language === 'RU'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 6 января 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>

    <p>1. Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры UAB «Pigu» (код компании 300866792, юридический адрес Laisvės pr. 75, LT-06144 Вильнюс) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>

    <p>2. Период проведения игры: 15 ноября 2024 г. - 22 декабря 2024 г. (включительно).</p>

    <p>3. Участник игры должен быть зарегистрированным участником pigu.lt и согласиться получать новости игры и информацию о призах.</p>

    <p>4. Игра проводится в мобильном приложении Pigu.lt. Во время игры участник управляет игровым персонажем, цель которого — избегать препятствия во время полёта. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>

    <p>5. Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро или физический приз. Информация о физическом призе будет доступна в социальных сетях Pigu.lt в Facebook и Instagram.</p>

    <p>5.1. Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6. Порядок информирования об игровом призе и его доставке:</p>

    <p>6.1. Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 ноября 2024 г., 2 декабря 2024 г., 9 декабря 2024 г., 16 декабря 2024 г., 23 декабря 2024 г., 30 декабря 2024 года, 6 января 2025 года, 13 января 2025 года, 20 января 2025 года, 27 января 2025 года, 3 февраля 2025 года.</p>

    <p><strong>Условия использования подарочных карт игры:</strong></p>

    <p>7.1. Подарочная карта действительна в течение 1 недели с даты отправки;</p>

    <p>7.2. Подарочная карта возврату не подлежит и не может быть обмененa на наличные;</p>

    <p>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых Pigu.lt;</p>

    <p>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит;</p>

    <p>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом;</p>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>

    <p>8. При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>

    <p>9. Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в литовском суде в соответствии с процедурой, установленной законодательством Литовской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>

    <p>10. Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>

    <p>11. Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://pigu.lt/lt/t/zaidimo-taisykles">https://pigu.lt/lt/t/zaidimo-taisykles</a>.</p>

    <p>12. Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>

    <p>13. Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>

    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a></li>
        <li>связавшись с нами по телефону: +370 52073998.</li>
    </ul>

    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://pigu.lt/lt/t/privatumo-politika">https://pigu.lt/lt/t/privatumo-politika</a>.</p>

    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>

`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'RU'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 6 января 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>

    <p>1. Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры DLB Trading OÜ (код компании 11791329, юридический адрес Peterburi tee 2F, 11415 Таллинн, Эстония) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>

    <p>2. Период проведения игры: 15 ноября 2024 г. - 22 декабря 2024 г. (включительно).</p>

    <p>3. Участник игры должен быть зарегистрированным участником Kaup24.ee и согласиться получать новости игры и информацию о призах.</p>

    <p>4. Игра проводится в мобильном приложении Kaup24.ee. Во время игры участник управляет игровым персонажем, цель которого — избегать препятствия во время полёта. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>

    <p>5. Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</p>

    <p>5.1. Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6. Порядок информирования об игровом призе и его доставке:</p>

    <p>6.1. Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 ноября 2024 г., 2 декабря 2024 г., 9 декабря 2024 г., 16 декабря 2024 г., 23 декабря 2024 г., 30 декабря 2024 года, 6 января 2025 года, 13 января 2025 года, 20 января 2025 года, 27 января 2025 года, 3 февраля 2025 года.</p>

    <p><strong>Условия использования подарочных карт игры:</strong></p>

    <p>7.1. Подарочная карта действительна в течение 1 недели с даты его отправки;</p>

    <p>7.2. Подарочная карта возврату не подлежит и не может быть обмененa на наличные;</p>

    <p>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых Kaup24.ee;</p>

    <p>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит;</p>

    <p>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом;</p>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>

    <p>8. При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>

    <p>9. Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в эстонском суде в соответствии с процедурой, установленной законодательством Эстонской республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>

    <p>10. Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>

    <p>11. Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://kaup24.ee/ru/t/game-rules-jump">https://kaup24.ee/ru/t/game-rules-jump</a>.</p>

    <p>12. Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>

    <p>13. Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>

    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a></li>
        <li>связавшись с нами по телефону: +372 6 468 107.</li>
    </ul>

    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://kaup24.ee/ru/t/konfidencialnos">https://kaup24.ee/ru/t/konfidencialnos</a>.</p>

    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес <a href="mailto:pood@kaup24.ee">pood@kaup24.ee</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://hobbyhall.fi' && this.language === 'FI'
        ? `<div>
    <p><strong>Pelisäännöt</strong></p>
    <p>Päivitetty 6.1.2025</p>

    <p><strong>YLEISET MÄÄRÄYKSET</strong></p>

    <p>1. Nämä pelisäännöt (jäljempänä "pelisäännöt") määrittelevät Hobby Hall Suomi Oy (jäljempänä "kampanjan järjestäjä") järjestämän pelin järjestämismenettelyjä, pelin palkintoja ja niiden toimitusta, riitojen ratkaisua ja muita menettelyjä.</p>

    <p>2. Pelijakso: 15.11. - 22.12.2024.</p>

    <p>3. Pelin osallistujan on oltava rekisteröitynyt Hobbyhall.fi-verkkokauppaan ja hänen on oltava hyväksynyt pelin tietojen ja palkintotietojen vastaanotto.</p>

    <p>4. Peliä pelataan Hobbyhall.fi-mobiilisovelluksessa. Pelin aikana pelaaja hallitsee pelin hahmoa, jonka tavoitteena on väistää esteitä lentäessään. Tuloksen parantamiseksi pelaaja voi pelata pelin uudelleen.</p>

    <p><strong>PELIN PALKINNOT JA NIIDEN TOIMITUSMENETTELY</strong></p>

    <p>5. Joka viikko, kymmenen satunnaisesti valittua, 1000 pistettä tai yli saanutta pelaajaa voittaa 20€:n lahjakortin.</p>

    <p>5.1 Osallistuja voi saada pelipalkinnon vain kerran 28 päivän aikana. Aikaraja lasketaan siitä, kun pelin voittajat on julkistettu ehtojen kohdassa 6.1. määritellyn mukaisesti. Jos pelaaja, joka on jo saanut pelipalkinnon viimeisten 28 päivän aikana, on kymmenen valitun voittajan joukossa, hänen pelipalkintonsa siirretään toiselle satunnaisesti valitulle pelaajalle.</p>

    <p>6. Pelipalkinnosta ja sen toimittamisesta tiedottaminen:</p>

    <p>6.1. Pelisääntöjen kohdassa 5.1 määritellystä pelipalkinnosta ilmoitetaan pelin osallistujalle hänen ilmoittamaansa sähköpostiosoitteeseen. Tiedot edellisen viikon pelin voittamisesta lähetetään maanantaisin seuraavina päivinä: 25.11.2024, 2.12.2024, 9.12.2024, 16.12.2024, 23.12.2024, 30.12.2024, 6.1.2025, 13.1.2025, 20.1.2025, 27.1.2025 ja 3.2.2025.</p>

    <p><strong>Pelissä voitettujen lahjakorttien käyttöehdot:</strong></p>

    <p>7.1. lahjakortti on voimassa yhden viikon sen lähettämispäivästä;</p>

    <p>7.2. lahjakorttia ei voi palauttaa eikä vaihtaa rahaksi;</p>

    <p>7.3. jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa ylittää lahjakortin arvon, puuttuvan summan voi maksaa valitsemalla jonkin muun Hobbyhall.fi-verkkokaupan tarjoamista maksutavoista;</p>

    <p>7.4. lahjakorttikoodia voi käyttää vain yhteen tilaukseen. Jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa on pienempi kuin lahjakortin arvo, erotusta ei palauteta;</p>

    <p>7.5. Lahjakorttia eivät voi käyttää arvonlisäverovelvolliset (luonnolliset henkilöt ja oikeushenkilöt, lukuun ottamatta julkisia organisaatioita ja laitoksia), kun maksetaan tuotteita, joihin sovelletaan käännettyä arvonlisäverovelvollisuutta;</p>

    <p><strong>LOPPUMÄÄRÄYKSET</strong></p>

    <p>8. Kampanjan järjestäjä pidättää oikeuden poistaa pelin osallistuja pelistä ilman ennakkoilmoitusta, jos havaitaan epärehellistä toimintaa.</p>

    <p>9. Kaikki pelistä johtuvat riidat ratkaistaan neuvottelemalla. Jos neuvotteluissa ei päästä sopimukseen, riidat ratkaistaan Suomen tuomioistuimessa Suomen tasavallan lakien mukaisesti kampanjan järjestäjän rekisteröidyn toimipaikan sijainnin mukaan.</p>

    <p>10. Kampanjan järjestäjällä on oikeus yksipuolisesti lopettaa peli ja peruuttaa palkinnot force majeure -olosuhteiden vuoksi välittömästi sen jälkeen, kun osallistujille on ilmoitettu julkisesti pelin päättymisestä.</p>

    <p>11. Kampanjan järjestäjällä on oikeus yksipuolisesti muuttaa tai täydentää näitä pelisääntöjä ilman ennakkoilmoitusta ilmoittamalla siitä pelin osallistujille osoitteessa <a href="https://hobbyhall.fi/fi/t/game-rules-jump">https://hobbyhall.fi/fi/t/game-rules-jump</a>.</p>

    <p>12. Kampanjan järjestäjä sitoutuu varmistamaan sille siirrettyjen henkilötietojen turvallisuuden eikä luovuta niitä kolmansille osapuolille, paitsi jos kyseisten tietojen toimittaminen on tarpeen lakisääteisten vaatimusten mukaisesti.</p>

    <p>13. Voit rajoittaa henkilötietojesi käsittelyä ja/tai käyttää oikeuksiasi rekisteröitynä seuraavasti:</p>

    <p>- ottamalla meihin yhteyttä sähköpostitse: <a href="mailto:asiakaspalvelu@hobbyhall.fi">asiakaspalvelu@hobbyhall.fi</a></p>

    <p>- ottamalla meihin yhteyttä puhelimitse: 09 8566 8000.</p>

    <p>Peliin liittyvien henkilötietojen käsittelyyn sovelletaan tietosuojakäytännön määräyksiä, jotka löytyvät osoitteesta <a href="https://hobbyhall.fi/fi/t/privacy-policy">https://hobbyhall.fi/fi/t/privacy-policy</a>.</p>
</div>

`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'EN'
        ? `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-01-06</p>

    <p><strong>GENERAL PROVISIONS</strong></p>

    <p>1. These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by DLB Trading OÜ (company code 11791329, registered address Peterburi tee 2F, 11415 Tallinn, Eesti) (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution and other procedures.</p>

    <p>2. Game period: November 15, 2024 - December 22, 2024 (inclusive)</p>

    <p>3. The game participant must be a registered Kaup24.ee member and have agreed to receive game news and information about prizes.</p>

    <p>4. The game is played on the Kaup24.ee mobile app. During the game, the game participant controls the game hero, whose goal is to avoid hitting obstacles while flying. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>

    <p>5. Each week, ten randomly selected game participants who have reached 1000 points or more will win 20 € worth of gift vouchers.</p>

    <p>5.1 A Participant may only receive a Game Prize once within 28 days of the announcement of the winners of the Game, the dates of which are set out in clause 6.1. If a Game Participant who has already received a Game Prize in the last 28 days is among the ten selected players, their Game Prize will be transferred to another player by random selection.</p>

    <p>6. The procedure for informing about the game prize and its delivery:</p>

    <p>6.1. the game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by him. Information about winning the previous week's game is sent on Mondays, on the following dates: November 25, 2024, December 2, 2024, December 9, 2024, December 16, 2024, December 23, 2024, 30 December 2024, 6 January 2025, 13 January 2025, 20 January 2025, 27 January 2025, 3 February 2025.</p>

    <p><strong>Terms of use of game gift vouchers:</strong></p>

    <p>7.1. the gift voucher is valid for 1 week from the date of its dispatch;</p>

    <p>7.2. the gift voucher is non-refundable and cannot be exchanged for cash;</p>

    <p>7.3. if the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Pigu.lt;</p>

    <p>7.4. the gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable;</p>

    <p>7.5. the gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation;</p>

    <p><strong>FINAL PROVISIONS</strong></p>

    <p>8. Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>

    <p>9. All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in an Estonian court in accordance with the procedure established by the laws of the Republic of Estonia according to the location of the Promotion Organizer's registered office.</p>

    <p>10. The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>

    <p>11. The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://kaup24.ee/et/t/game-rules-jump">https://kaup24.ee/et/t/game-rules-jump</a> page.</p>

    <p>12. The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>

    <p>13. You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>

    <p>- by contacting us by e-mail: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a>;</p>

    <p>- by contacting us by phone: +372 6 468 107.</p>

    <p>The provisions of the Privacy Policy, which you can find at <a href="https://kaup24.ee/et/t/privaatsuspoliitika">https://kaup24.ee/et/t/privaatsuspoliitika</a>, apply to the processing of personal data related to the game.</p>

    <p>We value your opinion and suggestions! We will be waiting for them at the e-mail address <a href="mailto:pood@kaup24.ee">pood@kaup24.ee</a>.</p>
</div>


`
        : this.campaignUrlProp === 'https://hobbyhall.fi' &&
          this.language === 'EN' &&
          `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-01-06</p>

    <p><strong>GENERAL PROVISIONS</strong></p>

    <p>1. These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by Hobby Hall Suomi Oy (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution and other procedures.</p>

    <p>2. Game period: November 15, 2024 - December 22, 2024 (inclusive)</p>

    <p>3. The game participant must be a registered Hobbyhall.fi member and have agreed to receive game news and information about prizes.</p>

    <p>4. The game is played on the Hobbyhall.fi mobile app. During the game, the game participant controls the game hero, whose goal is to avoid hitting obstacles while flying. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>

    <p>5. Each week, ten randomly selected game participants who have reached 1000 points or more will win 20 € worth of gift vouchers.</p>

    <p>5.1 A Participant may only receive a Game Prize once within 28 days of the announcement of the winners of the Game, the dates of which are set out in clause 6.1. If a Game Participant who has already received a Game Prize in the last 28 days is among the ten selected players, their Game Prize will be transferred to another player by random selection.</p>

    <p>6. The procedure for informing about the game prize and its delivery:</p>

    <p>6.1. The game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by him. Information about winning the previous week's game is sent on Mondays, on the following dates: 25.11.2024, 2.12.2024, 9.12.2024, 16.12.2024, 23.12.2024, 30.12.2024, 6.1.2025, 13.1.2025, 20.1.2025, 27.1.2025 and 3.2.2025.</p>

    <p><strong>Terms of use of game gift vouchers:</strong></p>

    <p>7.1. The gift voucher is valid for 1 week from the date of its dispatch;</p>

    <p>7.2. The gift voucher is non-refundable and cannot be exchanged for cash;</p>

    <p>7.3. If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Pigu.lt;</p>

    <p>7.4. The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable;</p>

    <p>7.5. The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation;</p>

    <p><strong>FINAL PROVISIONS</strong></p>

    <p>8. Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>

    <p>9. All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in a Finnish court in accordance with the procedure established by the laws of the Republic of Finland according to the location of the Promotion Organizer's registered office.</p>

    <p>10. The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>

    <p>11. The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://hobbyhall.fi/fi/t/game-rules-jump">https://hobbyhall.fi/fi/t/game-rules-jump</a> page.</p>

    <p>12. The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>

    <p>13. You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>

    <ul>
        <li>by contacting us by e-mail: <a href="mailto:asiakaspalvelu@hobbyhall.fi">asiakaspalvelu@hobbyhall.fi</a></li>
        <li>by contacting us by phone: 09 8566 8000.</li>
    </ul>

    <p>The provisions of the Privacy Policy, which you can find at <a href="https://hobbyhall.fi/fi/t/privacy-policy">https://hobbyhall.fi/fi/t/privacy-policy</a>, apply to the processing of personal data related to the game.</p>
</div>

`;
    const containerDiv = document.querySelector('.rules-table-container');
    containerDiv.innerHTML += `
              </div>
              <div id="close-rules-container" style="display:block;width: 100%; display:flex;justify-content:end;align-items:end;margin-top:10px">
<img src=${close} alt="Image Description" style="width:32px;height:32px;margin-right:10px;"></img>
</div>
<div class="boomio-custom-scrollbar-rules" style="overflow-x:hidden;overflow-y: scroll;height: calc(100% - 20px);text-align:left;padding-left:10px;font-size:10px;line-height:14px;">
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
