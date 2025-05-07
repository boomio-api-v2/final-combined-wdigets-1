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
    <p><strong>Žaidimo taisyklės</strong></p>
    <p>Redakcija nuo 2025-03-25</p>

    <p><strong>BENDROSIOS NUOSTATOS</strong></p>
    <p>Šios žaidimo taisyklės (toliau – Žaidimo taisyklės) nustato UAB „Pigu“ (įmonės kodas 300866792, buveinė Laisvės pr. 75, LT-06144 Vilnius) (toliau – Akcijos organizatorius) organizuojamo žaidimo vykdymo tvarką, žaidimo dovanas ir jų įteikimo, ginčų sprendimo ir kitą tvarką.</p>
    <p>Žaidimo vykdymo laikotarpis: 2025 m. kovo 25 d. – 2025 m. balandžio 20 d. (imtinai)</p>
    <p>Žaidimo dalyvis turi būti registruotas pigu.lt narys ir būti sutikęs gauti žaidimo naujienas ir informaciją apie prizus.</p>
    <p>Žaidimas vykdomas Pigu.lt mobiliojoje programėlėje. Žaidimo metu žaidimo dalyvis kontroliuoja žaidimo herojų, kurio tikslas šokinėjant ant laiptelių pakilti kuo aukščiau. Siekiant pagerinti rezultatą, žaidimo dalyvis žaidimą gali kartoti.</p>

    <p><strong>ŽAIDIMO DOVANOS IR JŲ ĮTEIKIMO TVARKA</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Kiekvieną savaitę, dešimt atsitiktine tvarka atrinktų žaidimo dalyvių, surinkusių 1000 ar daugiau taškų, laimės 20€ vertės dovanų kuponus.</p>
    <p>5.1.&nbsp;&nbsp;Žaidimo dovaną žaidimo dalyvis gali gauti tik vieną kartą per 28 dienas nuo žaidimo laimėtojų paskelbimo, kurio datos pateiktos taisyklių 6.1. punkte. Jei tarp dešimties atrinktų žaidėjų patenka žaidimo dalyvis, kuris jau gavo žaidimo dovaną per paskutines 28 dienas, jo dovana perleidžiama kitam žaidėjui atsitiktinės atrankos būdu.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Informavimo apie žaidimo dovaną ir jų įteikimo tvarka:</p>
    <p>6.1.&nbsp;&nbsp;Apie žaidimo dovaną, nurodytą Žaidimo taisyklių 5. punkte, žaidimo dalyvis yra informuojamas jo nurodytu elektroninio pašto adresu. Informacija apie praėjusios savaitės žaidimo laimėjimą siunčiama pirmadieniais, šiomis dienomis: 2025 m. kovo 25 d., 2025 m. kovo 24 d., 2025 m. kovo 31 d., 2025 m. balandžio 7 d., 2025 m. balandžio 14 d., 2025 m. balandžio 22 d.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Žaidimo dovanų kuponų panaudojimo sąlygos:</p>
    <ul>
        <li>7.1. Dovanų kuponas galioja 1 savaitę nuo jo išsiuntimo dienos;</li>
        <li>7.2. Dovanų kuponas negrąžinamas bei į pinigus nekeičiamas;</li>
        <li>7.3. Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą, suma viršija dovanų kupono vertę, trūkstamą sumą galima sumokėti pasirinkus vieną iš Pigu.lt siūlomų atsiskaitymo būdų;</li>
        <li>7.4. Dovanų kupono kodas gali būti pritaikytas tik vienam užsakymui. Jei užsakymo, už kurį atsiskaitoma pritaikius dovanų kuponą, suma yra mažesnė nei dovanų kupono vertė, susidaręs skirtumas negrąžinamas;</li>
        <li>7.5. Dovanų kuponas negalioja PVM mokėtojams – fiziniams ir juridiniams asmenims (išskyrus biudžetines įstaigas), kai bandoma atsiskaityti už prekes, kurioms taikomas atvirkštinis PVM apmokestinimas.</li>
    </ul>

    <p><strong>BAIGIAMOSIOS NUOSTATOS</strong></p>
    <p>9.&nbsp;&nbsp;&nbsp;Nustačius nesąžiningą žaidimo dalyvio elgesį, Akcijos organizatorius pasilieka teisę žaidimo dalyvį pašalinti iš žaidimo be išankstinio pranešimo.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Visi ginčai, kylantys dėl žaidimo, yra sprendžiami derybų būdu. Jei susitarimo nepavyksta pasiekti derybomis, ginčai yra sprendžiami Lietuvos teisme Lietuvos Respublikos įstatymų nustatyta tvarka pagal Akcijos organizatoriaus buveinės vietą.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Akcijos organizatorius turi teisę vienašališkai nutraukti žaidimą ir panaikinti prizus dėl nenugalimos jėgos aplinkybių (force majeure) iš karto po to, kai dalyviai informuojami apie žaidimo nutraukimą viešai.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Akcijos organizatorius turi teisę be išankstinio įspėjimo vienašališkai keisti ar papildyti šias Žaidimo taisykles, apie tai žaidimo dalyvius informuodamas <a href="https://pigu.lt/lt/t/zaidimo-taisykles-jump">https://pigu.lt/lt/t/zaidimo-taisykles-jump</a> puslapyje.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Akcijos organizatorius įsipareigoja užtikrinti jam perduotų asmens duomenų saugumą ir neperduoti jų tretiesiems asmenims, išskyrus atvejus, kai to duomenų pateikimas būtinas pagal teisės aktų reikalavimus.</p>
    <p>14.&nbsp;&nbsp;&nbsp;Apriboti Jūsų asmens duomenų tvarkymą ir/ar įgyvendinti Jūsų kaip asmens duomenų subjekto teises Jūs galite šiais būdais:</p>
    <ul>
        <li>susisiekdami su mumis el. paštu: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a>;</li>
        <li>susisiekdami su mumis telefonu: +370 52073998;</li>
    </ul>
    <p>Su žaidimu susijusių asmens duomenų tvarkymui yra taikomos Privatumo politikos nuostatos, su kuriomis galite susipažinti adresu <a href="https://pigu.lt/lt/t/privatumo-politika">https://pigu.lt/lt/t/privatumo-politika</a>.</p>
    <p>Mums svarbi Jūsų nuomonė bei pasiūlymai! Lauksime jų el. paštu: <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>


`
        : this.campaignUrlProp === 'https://pigu.lt' && this.language === 'EN'
        ? `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-03-25</p>

    <p><strong>GENERAL PROVISIONS</strong></p>
    <p>These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by UAB "Pigu" (company code 300866792, registered address Laisvės pr. 75, LT-06144 Vilnius) (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution, and other procedures.</p>
    <p>Game period: 25 March 2025 - 20 April 2025 (inclusive).</p>
    <p>The game participant must be a registered pigu.lt member and have agreed to receive game news and information about prizes.</p>
    <p>The game is played on the Pigu.lt mobile app. During the game, the player controls the hero of the game, whose goal is to jump up the steps as high as possible. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Each week, ten randomly selected game participants who have reached 1000 points or more will win €20 worth of gift vouchers.</p>
    <p>5.1.&nbsp;&nbsp;A Participant may only receive a Game Prize once within 28 days of the announcement of the winners of the Game, the dates of which are set out in clause 6.1. If a Game Participant who has already received a Game Prize in the last 28 days is among the ten selected players, their Game Prize will be transferred to another player by random selection.</p>

    <p>6.&nbsp;&nbsp;&nbsp;The procedure for informing about the game prize and its delivery:</p>
    <p>6.1.&nbsp;&nbsp;The game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by them. Information about winning the previous week's game is sent on Mondays, on the following dates: 25 March 2025, 24 March 2025, 31 March 2025, 7 April 2025, 14 April 2025, 22 April 2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Terms of use of game gift vouchers:</p>
    <ul>
        <li>7.1. The gift voucher is valid for 1 week from the date of its dispatch.</li>
        <li>7.2. The gift voucher is non-refundable and cannot be exchanged for cash.</li>
        <li>7.3. If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Pigu.lt.</li>
        <li>7.4. The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable.</li>
        <li>7.5. The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation.</li>
    </ul>

    <p><strong>FINAL PROVISIONS</strong></p>
    <p>9.&nbsp;&nbsp;&nbsp;Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>
    <p>10.&nbsp;&nbsp;&nbsp;All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in a Lithuanian court in accordance with the procedure established by the laws of the Republic of Lithuania according to the location of the Promotion Organizer's registered office.</p>
    <p>11.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>
    <p>12.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://pigu.lt/lt/t/zaidimo-taisykles">https://pigu.lt/lt/t/zaidimo-taisykles</a> page.</p>
    <p>13.&nbsp;&nbsp;&nbsp;The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>
    <p>14.&nbsp;&nbsp;&nbsp;You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>
    <ul>
        <li>by contacting us by e-mail: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a>;</li>
        <li>by contacting us by phone: +370 52073998;</li>
    </ul>
    <p>The provisions of the Privacy Policy, which you can find at <a href="https://pigu.lt/lt/t/privatumo-politika">https://pigu.lt/lt/t/privatumo-politika</a>, apply to the processing of personal data related to the game.</p>
    <p>We value your opinion and suggestions! We will be waiting for them at the e-mail address: <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'LV'
        ? `<div>
    <p><strong>Spēles noteikumi</strong></p>
    <p>Pārskatīts 2025. gada 25. martā</p>

    <p><strong>VISPĀRĪGI NOTEIKUMI</strong></p>
    <p>Šos spēles noteikumus (turpmāk tekstā “Spēles noteikumi”) nosaka SIA "Pigu Latvia" (uzņēmuma kods 43603025092, juridiskā adrese Krasta iela 52, Rīga, LV-1003, Latvija) (turpmāk tekstā “Akcijas organizētājs”) organizētās spēles norises kārtību, spēles balvas un to piegādi, strīdu risināšanu un citas procedūras.</p>
    <p>Spēles periods: 2025. gada 25. marts - 2025. gada 20. aprīlis (ieskaitot).</p>
    <p>Spēles dalībniekam jābūt reģistrētam 220.lv lietotājam un jāpiekrīt saņemt spēles jaunumus un informāciju par balvām.</p>
    <p>Spēle norisinās 220.lv mobilajā lietotnē. Spēles laikā spēles dalībnieks kontrolē spēles varoni, kura mērķis ir uzlēkt pēc iespējas augstāk pa pakāpieniem. Lai uzlabotu rezultātu, spēles dalībnieks var atkārtot spēli.</p>

    <p><strong>SPĒLES BALVAS UN TO PIEGĀDES PROCEDŪRA</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Katru nedēļu desmit nejauši izvēlēti spēles dalībnieki, kuri ir sakrājuši 1000 punktus vai vairāk, laimēs 220.lv dāvanu kartes 20 eiro vērtībā.</p>
    <p>5.1.&nbsp;&nbsp;Dalībnieks var saņemt Spēles balvu tikai vienu reizi 28 dienu laikā pēc Spēles uzvarētāju paziņošanas, noteiktajos datumos 6.1. punktā. Ja Spēlētājs, kurš pēdējo 28 dienu laikā jau ir saņēmis Spēles balvu, ir starp 10 nejauši izvēlētajiem spēlētājiem, viņa Spēles balva tiks nodota citam nejauši izvēlētam spēlētājam.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Informēšana par spēles balvu un tās piegādes procedūra:</p>
    <p>6.1.&nbsp;&nbsp;Par spēles balvu, kas norādīta Spēles noteikumu 5. punktā, spēles dalībnieks tiek informēts uz viņa norādīto e-pasta adresi. Informācija par iepriekšējās nedēļas spēles uzvarām tiek nosūtīta pirmdienās šādos datumos: 25. marts 2025, 24. marts 2025, 31. marts 2025, 7. aprīlis 2025, 14. aprīlis 2025, 22. aprīlis 2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Spēles dāvanu kartes izmantošanas noteikumi:</p>
    <ul>
        <li>7.1. Dāvanu karte ir derīga 1 nedēļu no tās nosūtīšanas dienas.</li>
        <li>7.2. Dāvanu karte nav atmaksājama un to nevar apmainīt pret skaidru naudu.</li>
        <li>7.3. Ja pasūtījuma, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa pārsniedz dāvanu kartes vērtību, trūkstošo summu var samaksāt, izvēloties vienu no 220.lv piedāvātajiem maksājumu veidiem.</li>
        <li>7.4. Dāvanu kartes kods var tikt piemērots tikai vienam pasūtījumam. Ja pasūtījumam, par kuru tiek veikts maksājums, piemērojot dāvanu karti, summa ir mazāka par dāvanu kartes vērtību, starpība netiek atmaksāta.</li>
        <li>7.5. Dāvanu karte nav izmantojama PVN maksātājiem norēķiniem par precēm, kurām tiek pielietots reversais PVN.</li>
    </ul>

    <p><strong>NOBEIGUMA NOTEIKUMI</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;Konstatējot negodīgu spēles dalībnieka rīcību, Akcijas organizētājs patur tiesības izslēgt spēles dalībnieku no spēles bez iepriekšēja brīdinājuma.</p>
    <p>9.&nbsp;&nbsp;&nbsp;Visi strīdi, kas izriet no spēles, tiek risināti sarunu ceļā. Ja sarunu ceļā neizdodas panākt vienošanos, strīdi tiek risināti Latvijas tiesā saskaņā ar Latvijas Republikas likumdošanā noteikto kārtību atbilstoši Akcijas organizētāja juridiskās adreses atrašanās vietai.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Akcijas organizētājam ir tiesības vienpusēji izbeigt spēli un atcelt balvas nepārvaramas varas apstākļu (force majeure) dēļ nekavējoties pēc tam, kad dalībnieki ir publiski informēti par spēles izbeigšanu.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Akcijas organizētājam ir tiesības vienpusēji mainīt vai papildināt šos Spēles noteikumus bez iepriekšēja brīdinājuma, par to informējot spēles dalībniekus tīmekļa vietnē <a href="https://220.lv/lv/t/game-rules-jump">https://220.lv/lv/t/game-rules-jump</a>.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Akcijas organizētājs apņemas nodrošināt tam nodoto personas datu drošību un nenodot tos trešajām personām, izņemot gadījumus, kad šādu datu sniegšana ir nepieciešama saskaņā ar normatīvo aktu prasībām.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Jūs varat ierobežot savu personas datu apstrādi un/vai izmantot savas kā datu subjekta tiesības šādos veidos:</p>
    <ul>
        <li>sazinoties ar mums pa e-pastu: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a>;</li>
        <li>sazinoties ar mums pa tālruni: +371 60001472.</li>
    </ul>
    <p>Spēles noteikumiem piemērojami Privātuma politikas noteikumi, ar kuriem varat iepazīties vietnē <a href="https://220.lv/lv/t/privatuma-politika">https://220.lv/lv/t/privatuma-politika</a>.</p>
    <p>Mēs novērtējam Jūsu viedokli un ieteikumus! Gaidīsim tos uz e-pasta adresi: <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'RU'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 25 марта 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>
    <p>Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры SIA "Pigu Latvia" (код компании 43603025092, юридический адрес Улица Краста, 52, Рига, LV-1003, Латвия) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>
    <p>Период проведения игры: 25 марта 2025 г. - 20 апреля 2025 г. (включительно).</p>
    <p>Участник игры должен быть зарегистрированным участником 220.lv и согласиться получать новости игры и информацию о призах.</p>
    <p>Игра проводится в мобильном приложении 220.lv. Во время игры участник управляет героем игры, цель которого — прыгать по ступеням как можно выше. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</p>
    <p>5.1.&nbsp;&nbsp;Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Порядок информирования об игровом призе и его доставке:</p>
    <p>6.1.&nbsp;&nbsp;Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 марта 2025 г., 24 марта 2025 г., 31 марта 2025 г., 7 апреля 2025 г., 14 апреля 2025 г., 22 апреля 2025 г.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Условия использования подарочных ваучеров игры:</p>
    <ul>
        <li>7.1. Подарочная карта действительна в течение 1 недели с даты ее отправки.</li>
        <li>7.2. Подарочная карта возврату не подлежит и не может быть обменена на наличные.</li>
        <li>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых 220.lv.</li>
        <li>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит.</li>
        <li>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом.</li>
    </ul>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>
    <p>9.&nbsp;&nbsp;&nbsp;Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в латвийском суде в соответствии с процедурой, установленной законодательством Латвийской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://220.lv/ru/t/game-rules-jump">https://220.lv/ru/t/game-rules-jump</a>.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>
    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a>;</li>
        <li>связавшись с нами по телефону: +371 60001472.</li>
    </ul>
    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://220.lv/ru/t/politika-konfidencialnosti">https://220.lv/ru/t/politika-konfidencialnosti</a>.</p>
    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес: <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>


`
        : this.campaignUrlProp === 'https://220.lv' && this.language === 'EN'
        ? `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-03-25</p>

    <p><strong>GENERAL PROVISIONS</strong></p>
    <p>These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by SIA "Pigu Latvia" (company code 43603025092, registered address Krasta iela 52, Rīga, LV-1003, Latvia) (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution, and other procedures.</p>
    <p>Game period: 25 March 2025 - 20 April 2025 (inclusive).</p>
    <p>The game participant must be a registered 220.lv member and have agreed to receive game news and information about prizes.</p>
    <p>The game is played on the 220.lv mobile app. During the game, the player controls the hero of the game, whose goal is to jump up the steps as high as possible. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Each week, ten randomly selected game participants who have reached 1000 points or more will win €20 worth of gift vouchers.</p>
    <p>5.1.&nbsp;&nbsp;A participant may only receive a game prize once within 28 days of the announcement of the winners of the game, the dates of which are set out in clause 6.1. If a game participant who has already received a game prize in the last 28 days is among the ten selected players, their game prize will be transferred to another player by random selection.</p>

    <p>6.&nbsp;&nbsp;&nbsp;The procedure for informing about the game prize and its delivery:</p>
    <p>6.1.&nbsp;&nbsp;The game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by them. Information about winning the previous week's game is sent on Mondays, on the following dates: 25 March 2025, 24 March 2025, 31 March 2025, 7 April 2025, 14 April 2025, 22 April 2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Terms of use of game gift vouchers:</p>
    <ul>
        <li>7.1. The gift voucher is valid for 1 week from the date of its dispatch.</li>
        <li>7.2. The gift voucher is non-refundable and cannot be exchanged for cash.</li>
        <li>7.3. If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by 220.lv.</li>
        <li>7.4. The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable.</li>
        <li>7.5. The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation.</li>
    </ul>

    <p><strong>FINAL PROVISIONS</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>
    <p>9.&nbsp;&nbsp;&nbsp;All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in a Latvian court in accordance with the procedure established by the laws of the Republic of Latvia according to the location of the Promotion Organizer's registered office.</p>
    <p>10.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>
    <p>11.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://220.lv/lv/t/game-rules-jump">https://220.lv/lv/t/game-rules-jump</a> page.</p>
    <p>12.&nbsp;&nbsp;&nbsp;The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>
    <p>13.&nbsp;&nbsp;&nbsp;You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>
    <ul>
        <li>by contacting us by e-mail: <a href="mailto:datuaizsardziba@220.lv">datuaizsardziba@220.lv</a>;</li>
        <li>by contacting us by phone: +371 60001472.</li>
    </ul>
    <p>The provisions of the Privacy Policy, which you can find at <a href="https://220.lv/lv/t/privatuma-politika">https://220.lv/lv/t/privatuma-politika</a>, apply to the processing of personal data related to the game.</p>
    <p>We value your opinion and suggestions! We will be waiting for them at the e-mail address: <a href="mailto:reklama220@220.lv">reklama220@220.lv</a>.</p>
</div>

`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'ET'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 25 марта 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>
    <p>Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры DLB Trading OÜ (код компании 11791329, юридический адрес Peterburi tee 2F, 11415 Таллинн, Эстония) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>
    <p>Период проведения игры: 25 марта 2025 г. - 20 апреля 2025 г. (включительно).</p>
    <p>Участник игры должен быть зарегистрированным участником Kaup24.ee и согласиться получать новости игры и информацию о призах.</p>
    <p>Игра проводится в мобильном приложении Kaup24.ee. Во время игры участник управляет героем игры, цель которого — прыгать по ступеням как можно выше. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</p>
    <p>5.1.&nbsp;&nbsp;Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Порядок информирования об игровом призе и его доставке:</p>
    <p>6.1.&nbsp;&nbsp;Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 марта 2025 г., 24 марта 2025 г., 31 марта 2025 г., 7 апреля 2025 г., 14 апреля 2025 г., 22 апреля 2025 г.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Условия использования подарочных карт игры:</p>
    <ul>
        <li>7.1. Подарочная карта действительна в течение 1 недели с даты ее отправки.</li>
        <li>7.2. Подарочная карта возврату не подлежит и не может быть обменена на наличные.</li>
        <li>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых Kaup24.ee.</li>
        <li>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит.</li>
        <li>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом.</li>
    </ul>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>
    <p>9.&nbsp;&nbsp;&nbsp;Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в эстонском суде в соответствии с процедурой, установленной законодательством Эстонской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://kaup24.ee/ru/t/game-rules-jump">https://kaup24.ee/ru/t/game-rules-jump</a>.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>
    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a>;</li>
        <li>связавшись с нами по телефону: +372 6 468 107.</li>
    </ul>
    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://kaup24.ee/ru/t/konfidencialnos">https://kaup24.ee/ru/t/konfidencialnos</a>.</p>
    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес: <a href="mailto:pood@kaup24.ee">pood@kaup24.ee</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://pigu.lt' && this.language === 'RU'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 25 марта 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>
    <p>Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры UAB «Pigu» (код компании 300866792, юридический адрес Laisvės pr. 75, LT-06144 Вильнюс) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</p>
    <p>Период проведения игры: 25 марта 2025 г. - 20 апреля 2025 г. (включительно).</p>
    <p>Участник игры должен быть зарегистрированным участником pigu.lt и согласиться получать новости игры и информацию о призах.</p>
    <p>Игра проводится в мобильном приложении Pigu.lt. Во время игры участник управляет героем игры, цель которого — прыгать по ступеням как можно выше. Чтобы улучшить результат, участник игры может повторить игру.</p>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</p>
    <p>5.1.&nbsp;&nbsp;Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Порядок информирования об игровом призе и его доставке:</p>
    <p>6.1.&nbsp;&nbsp;Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 25 марта 2025 г., 24 марта 2025 г., 31 марта 2025 г., 7 апреля 2025 г., 14 апреля 2025 г., 22 апреля 2025 г.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Условия использования подарочных карт игры:</p>
    <ul>
        <li>7.1. Подарочная карта действительна в течение 1 недели с даты отправки.</li>
        <li>7.2. Подарочная карта возврату не подлежит и не может быть обменена на наличные.</li>
        <li>7.3. Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых Pigu.lt.</li>
        <li>7.4. Подарочная карта может быть применена только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит.</li>
        <li>7.5. Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом.</li>
    </ul>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>
    <p>9.&nbsp;&nbsp;&nbsp;При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в литовском суде в соответствии с процедурой, установленной законодательством Литовской Республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://pigu.lt/lt/t/zaidimo-taisykles">https://pigu.lt/lt/t/zaidimo-taisykles</a>.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</p>
    <p>14.&nbsp;&nbsp;&nbsp;Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:</p>
    <ul>
        <li>связавшись с нами по электронной почте: <a href="mailto:duomenuapsauga@pigu.lt">duomenuapsauga@pigu.lt</a>;</li>
        <li>связавшись с нами по телефону: +370 52073998.</li>
    </ul>
    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://pigu.lt/lt/t/privatumo-politika">https://pigu.lt/lt/t/privatumo-politika</a>.</p>
    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес: <a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p>
</div>


`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'RU'
        ? `<div>
    <p><strong>Правила игры</strong></p>
    <p>Пересмотрено 3 февраля 2025 г.</p>

    <p><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>
    <ol>
        <li>Настоящие правила игры (далее — Правила игры) устанавливают порядок организации игры DLB Trading OÜ (код компании 11791329, юридический адрес Peterburi tee 2F, 11415 Таллинн, Эстония) (далее — Организатор акции), призы игры и их доставку, разрешение споров и другие процедуры.</li>
        <li>Период проведения игры: 3 февраля 2025 года - 16 марта 2025 года (включительно).</li>
        <li>Участник игры должен быть зарегистрированным участником Kaup24.ee и согласиться получать новости игры и информацию о призах.</li>
        <li>Игра проводится в мобильном приложении Kaup24.ee. Во время игры участник управляет игровым персонажем, цель которого — избегать препятствия во время поездки. Чтобы улучшить результат, участник игры может повторить игру.</li>
    </ol>

    <p><strong>ИГРОВЫЕ ПРИЗЫ И ПОРЯДОК ИХ ДОСТАВКИ</strong></p>
    <ol start="5">
        <li>Каждую неделю десять случайно выбранных участников игры, набравших 1000 или более очков, получат подарочные карты на сумму 20 евро.</li>
        <li>Участник может получить приз игры только один раз в течение 28 дней после объявления победителей, даты указаны в пункте 6.1. Если участник, который уже получил приз игры за последние 28 дней, входит в число десяти выбранных игроков, его приз будет передан другому участнику путем случайного выбора.</li>
        <li>Порядок информирования об игровом призе и его доставке:
            <ol>
                <li>Участник игры информируется об игровом призе, указанном в пункте 5 Правил игры, по предоставленному им адресу электронной почты. Информация о выигрыше в игре за предыдущую неделю отправляется по понедельникам в следующие даты: 3 февраля 2025 года, 10 февраля 2025 года, 25 февраля 2025 года, 24 февраля 2025 года, 3 марта 2025 года, 10 марта 2025 года.</li>
            </ol>
        </li>
        <li>Условия использования подарочных карт игры:
            <ul>
                <li>Подарочная карта действительна в течение 1 недели с даты его отправки;</li>
                <li>Подарочная карта возврату не подлежит и не может быть обмененa на наличные;</li>
                <li>Если сумма заказа, оплачиваемого с помощью подарочной карты, превышает стоимость подарочной карты, недостающую сумму можно оплатить, выбрав один из способов оплаты, предлагаемых Kaup24.ee;</li>
                <li>Подарочная карта может быть применен только к одному заказу. Если сумма заказа, оплачиваемого с помощью подарочной карты, меньше стоимости подарочной карты, образовавшаяся разница возврату не подлежит;</li>
                <li>Подарочные карты не могут быть использованы плательщиками PVN для оплаты товаров, облагаемых обратным налогом;</li>
            </ul>
        </li>
    </ol>

    <p><strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>
    <ol start="8">
        <li>При обнаружении недобросовестного поведения участника игры Организатор акции оставляет за собой право удалить участника игры из игры без предварительного уведомления.</li>
        <li>Все споры, возникающие в связи с игрой, разрешаются путем переговоров. Если в ходе переговоров не удается достичь соглашения, споры разрешаются в эстонском суде в соответствии с процедурой, установленной законодательством Эстонской республики, в соответствии с местонахождением зарегистрированного офиса Организатора акции.</li>
        <li>Организатор акции имеет право в одностороннем порядке прекратить игру и отменить призы в связи с обстоятельствами непреодолимой силы (форс-мажор) сразу же после того, как участники будут публично проинформированы о прекращении игры.</li>
        <li>Организатор акции имеет право в одностороннем порядке изменять или дополнять настоящие Правила игры без предварительного уведомления, информируя об этом участников игры на странице <a href="https://kaup24.ee/ru/t/game-rules-jump">https://kaup24.ee/ru/t/game-rules-jump</a>.</li>
        <li>Организатор акции обязуется обеспечивать безопасность переданных ему персональных данных и не передавать их третьим лицам, за исключением случаев, когда предоставление таких данных необходимо в соответствии с требованиями законодательных актов.</li>
        <li>Вы можете ограничить обработку своих персональных данных и/или осуществить свои права субъекта данных следующими способами:
            <ul>
                <li>Связавшись с нами по электронной почте: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a></li>
                <li>Связавшись с нами по телефону: +372 6 468 107.</li>
            </ul>
        </li>
    </ol>

    <p>К обработке персональных данных, связанных с игрой, применяются положения Политики конфиденциальности, с которой вы можете ознакомиться по адресу <a href="https://kaup24.ee/ru/t/konfidencialnos">https://kaup24.ee/ru/t/konfidencialnos</a>.</p>

    <p>Мы ценим ваше мнение и предложения! Ждем их на электронный адрес <a href="mailto:pood@kaup24.ee">pood@kaup24.ee</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://hobbyhall.fi' && this.language === 'FI'
        ? `<div>
    <p><strong>Pelisäännöt</strong></p>
    <p>Tarkistettu 25.3.2025</p>

    <p><strong>YLEISET MÄÄRÄYKSET</strong></p>
    <p>Nämä pelisäännöt (jäljempänä "pelisäännöt") määrittelevät Hobby Hall Suomi Oy (jäljempänä "kampanjan järjestäjä") järjestämän pelin järjestämismenettelyjä, pelin palkintoja ja niiden toimitusta, riitojen ratkaisua ja muita menettelyjä.</p>
    <p>Pelijakso: 25.3.2025 - 20.4.2025.</p>
    <p>Pelin osallistujan on oltava rekisteröitynyt Hobbyhall.fi-verkkokauppaan ja hänen on oltava hyväksynyt pelin tietojen ja palkintotietojen vastaanotto.</p>
    <p>Peliä pelataan Hobbyhall.fi-mobiilisovelluksessa. Pelin aikana pelaaja ohjaa pelin sankaria, jonka tavoitteena on hypätä portaita ylös mahdollisimman korkealle. Tuloksen parantamiseksi pelaaja voi pelata pelin uudelleen.</p>

    <p><strong>PELIN PALKINNOT JA NIIDEN TOIMITUSMENETTELY</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Joka viikko, kymmenen satunnaisesti valittua, 1000 pistettä tai yli saanutta pelaajaa voittaa 20 €:n lahjakortin.</p>
    <p>5.1.&nbsp;&nbsp;Osallistuja voi saada pelipalkinnon vain kerran 28 päivän kuluessa siitä, kun pelin voittajat on julkistettu, joiden päivämäärät on esitetty kohdassa 6.1. Jos peliin osallistuja, joka on jo saanut pelipalkinnon viimeisten 28 päivän aikana, on kymmenen valitun pelaajan joukossa, hänen pelipalkintonsa siirretään toiselle pelaajalle satunnaisotannalla.</p>

    <p>6.&nbsp;&nbsp;&nbsp;Pelipalkinnosta ja sen toimittamisesta tiedottaminen:</p>
    <p>6.1.&nbsp;&nbsp;Pelisääntöjen kohdassa 5 määritellystä pelipalkinnosta, 20 € arvoisesta lahjakortista, ilmoitetaan pelin osallistujalle hänen ilmoittamaansa sähköpostiosoitteeseen. Tiedot edellisen viikon pelin voittamisesta lähetetään maanantaisin seuraavina päivinä: 25.3.2025, 24.3.2025, 31.3.2025, 7.4.2025, 14.4.2025, 22.4.2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Pelissä voitettujen lahjakorttien käyttöehdot:</p>
    <ul>
        <li>7.1. Lahjakortin koodi on voimassa yhden viikon sen lähettämispäivästä.</li>
        <li>7.2. Lahjakorttia ei voi palauttaa eikä vaihtaa rahaksi.</li>
        <li>7.3. Jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa ylittää lahjakortin arvon, puuttuvan summan voi maksaa valitsemalla jonkin muun Hobbyhall.fi-verkkokaupan tarjoamista maksutavoista.</li>
        <li>7.4. Jos tilauksen, joka maksetaan lahjakorttia käyttämällä, summa on pienempi kuin lahjakortin arvo, erotusta ei palauteta.</li>
        <li>7.5. Lahjakorttia eivät voi käyttää arvonlisäverovelvolliset (luonnolliset henkilöt ja oikeushenkilöt, lukuun ottamatta julkisia organisaatioita ja laitoksia), kun maksetaan tuotteita, joihin sovelletaan käännettyä arvonlisäverovelvollisuutta.</li>
    </ul>

    <p><strong>LOPPUMÄÄRÄYKSET</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;Kampanjan järjestäjä pidättää oikeuden poistaa pelin osallistuja pelistä ilman ennakkoilmoitusta, jos havaitaan epärehellistä toimintaa.</p>
    <p>9.&nbsp;&nbsp;&nbsp;Kaikki pelistä johtuvat riidat ratkaistaan neuvottelemalla. Jos neuvotteluissa ei päästä sopimukseen, riidat ratkaistaan Suomen tuomioistuimessa Suomen tasavallan lakien mukaisesti kampanjan järjestäjän rekisteröidyn toimipaikan sijainnin mukaan.</p>
    <p>10.&nbsp;&nbsp;&nbsp;Kampanjan järjestäjällä on oikeus yksipuolisesti lopettaa peli ja peruuttaa palkinnot force majeure -olosuhteiden vuoksi välittömästi sen jälkeen, kun osallistujille on ilmoitettu julkisesti pelin päättymisestä.</p>
    <p>11.&nbsp;&nbsp;&nbsp;Kampanjan järjestäjällä on oikeus yksipuolisesti muuttaa tai täydentää näitä pelisääntöjä ilman ennakkoilmoitusta ilmoittamalla siitä pelin osallistujille osoitteessa <a href="https://hobbyhall.fi/fi/t/game-rules-jump">https://hobbyhall.fi/fi/t/game-rules-jump</a>.</p>
    <p>12.&nbsp;&nbsp;&nbsp;Kampanjan järjestäjä sitoutuu varmistamaan sille siirrettyjen henkilötietojen turvallisuuden eikä luovuta niitä kolmansille osapuolille, paitsi jos kyseisten tietojen toimittaminen on tarpeen lakisääteisten vaatimusten mukaisesti.</p>
    <p>13.&nbsp;&nbsp;&nbsp;Voit rajoittaa henkilötietojesi käsittelyä ja/tai käyttää oikeuksiasi rekisteröitynä seuraavasti:</p>
    <ul>
        <li>ottamalla meihin yhteyttä sähköpostitse: <a href="mailto:asiakaspalvelu@hobbyhall.fi">asiakaspalvelu@hobbyhall.fi</a>;</li>
        <li>ottamalla meihin yhteyttä puhelimitse: 09 8566 8000.</li>
    </ul>
    <p>Peliin liittyvien henkilötietojen käsittelyyn sovelletaan tietosuojakäytännön määräyksiä, jotka löytyvät osoitteesta <a href="https://hobbyhall.fi/fi/t/privacy-policy">https://hobbyhall.fi/fi/t/privacy-policy</a>.</p>
</div>

`
        : (this.campaignUrlProp === 'https://kaup.ee' ||
            this.campaignUrlProp === 'https://kaup24.ee') &&
          this.language === 'EN'
        ? `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-03-25</p>

    <p><strong>GENERAL PROVISIONS</strong></p>
    <p>These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by DLB Trading OÜ (company code 11791329, registered address Peterburi tee 2F, 11415 Tallinn, Estonia) (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution, and other procedures.</p>
    <p>Game period: 25 March 2025 - 20 April 2025 (inclusive).</p>
    <p>The game participant must be a registered Kaup24.ee member and have agreed to receive game news and information about prizes.</p>
    <p>The game is played on the Kaup24.ee mobile app. During the game, the player controls the hero of the game, whose goal is to jump up the steps as high as possible. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Each week, ten randomly selected game participants who have reached 1000 points or more will win €20 worth of gift vouchers.</p>
    <p>5.1.&nbsp;&nbsp;A participant may only receive a game prize once within 28 days of the announcement of the winners of the game, the dates of which are set out in clause 6.1. If a game participant who has already received a game prize in the last 28 days is among the ten selected players, their game prize will be transferred to another player by random selection.</p>

    <p>6.&nbsp;&nbsp;&nbsp;The procedure for informing about the game prize and its delivery:</p>
    <p>6.1.&nbsp;&nbsp;The game participant is informed about the game prize specified in clause 5 of the Game Rules at the e-mail address provided by them. Information about winning the previous week's game is sent on Mondays, on the following dates: 25 March 2025, 24 March 2025, 31 March 2025, 7 April 2025, 14 April 2025, 22 April 2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Terms of use of game gift vouchers:</p>
    <ul>
        <li>7.1. The gift voucher is valid for 1 week from the date of its dispatch.</li>
        <li>7.2. The gift voucher is non-refundable and cannot be exchanged for cash.</li>
        <li>7.3. If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Kaup24.ee.</li>
        <li>7.4. The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable.</li>
        <li>7.5. The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation.</li>
    </ul>

    <p><strong>FINAL PROVISIONS</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>
    <p>9.&nbsp;&nbsp;&nbsp;All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in an Estonian court in accordance with the procedure established by the laws of the Republic of Estonia according to the location of the Promotion Organizer's registered office.</p>
    <p>10.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>
    <p>11.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://kaup24.ee/et/t/game-rules-jump">https://kaup24.ee/et/t/game-rules-jump</a> page.</p>
    <p>12.&nbsp;&nbsp;&nbsp;The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>
    <p>13.&nbsp;&nbsp;&nbsp;You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>
    <ul>
        <li>by contacting us by e-mail: <a href="mailto:andmekaitse@kaup24.ee">andmekaitse@kaup24.ee</a>;</li>
        <li>by contacting us by phone: +372 6 468 107.</li>
    </ul>
    <p>The provisions of the Privacy Policy, which you can find at <a href="https://kaup24.ee/et/t/privaatsuspoliitika">https://kaup24.ee/et/t/privaatsuspoliitika</a>, apply to the processing of personal data related to the game.</p>
    <p>We value your opinion and suggestions! We will be waiting for them at the e-mail address: <a href="mailto:meedia@kaup24.ee">meedia@kaup24.ee</a>.</p>
</div>

`
        : this.campaignUrlProp === 'https://hobbyhall.fi' &&
          this.language === 'EN' &&
          `<div>
    <p><strong>Game Rules</strong></p>
    <p>Revision from 2025-03-25</p>

    <p><strong>GENERAL PROVISIONS</strong></p>
    <p>These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by Hobby Hall Suomi Oy (hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution, and other procedures.</p>
    <p>Game period: 25 March 2025 - 20 April 2025 (inclusive).</p>
    <p>The game participant must be a registered Hobbyhall.fi member and have agreed to receive game news and information about prizes.</p>
    <p>The game is played on the Hobbyhall.fi mobile app. During the game, the player controls the hero of the game, whose goal is to jump up the steps as high as possible. To improve the result, the game participant can repeat the game.</p>

    <p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>
    <p>5.&nbsp;&nbsp;&nbsp;Each week, ten randomly selected game participants who have reached 1000 points or more will win €20 worth of gift vouchers.</p>
    <p>5.1.&nbsp;&nbsp;A participant may only receive a game prize once within 28 days of the announcement of the winners of the game, the dates of which are set out in clause 6.1. If a game participant who has already received a game prize in the last 28 days is among the ten selected players, their game prize will be transferred to another player by random selection.</p>

    <p>6.&nbsp;&nbsp;&nbsp;The procedure for informing about the game prize and its delivery:</p>
    <p>6.1.&nbsp;&nbsp;The game participant is informed about winning a €20 gift voucher at the e-mail address provided by them. Information about winning the previous week's game is sent on Mondays, on the following dates: 25 March 2025, 24 March 2025, 31 March 2025, 7 April 2025, 14 April 2025, 22 April 2025.</p>

    <p>7.&nbsp;&nbsp;&nbsp;Terms of use of game gift vouchers:</p>
    <ul>
        <li>7.1. The gift voucher is valid for 1 week from the date of its dispatch.</li>
        <li>7.2. The gift voucher is non-refundable and cannot be exchanged for cash.</li>
        <li>7.3. If the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by Hobbyhall.fi.</li>
        <li>7.4. The gift voucher code can only be applied to one order. If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable.</li>
        <li>7.5. The gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation.</li>
    </ul>

    <p><strong>FINAL PROVISIONS</strong></p>
    <p>8.&nbsp;&nbsp;&nbsp;Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>
    <p>9.&nbsp;&nbsp;&nbsp;All disputes arising from the game shall be resolved through negotiation. If no agreement can be reached through negotiations, disputes shall be resolved in a Finnish court in accordance with the procedure established by the laws of the Republic of Finland according to the location of the Promotion Organizer's registered office.</p>
    <p>10.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>
    <p>11.&nbsp;&nbsp;&nbsp;The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the <a href="https://hobbyhall.fi/fi/t/game-rules-jump">https://hobbyhall.fi/fi/t/game-rules-jump</a> page.</p>
    <p>12.&nbsp;&nbsp;&nbsp;The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>
    <p>13.&nbsp;&nbsp;&nbsp;You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>
    <ul>
        <li>by contacting us by e-mail: <a href="mailto:asiakaspalvelu@hobbyhall.fi">asiakaspalvelu@hobbyhall.fi</a>;</li>
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
