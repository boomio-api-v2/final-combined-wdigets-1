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
    const content = `<div><p><strong>GENERAL PROVISIONS</strong></p>
<p>1.&nbsp; &nbsp; &nbsp;&nbsp;These game rules (hereinafter referred to as the Game Rules) establish the procedures for organizing the game by&nbsp;UAB "Pigu" (company code 300866792, registered address Laisvės pr.&nbsp;75, LT-06144 Vilnius)&nbsp;(hereinafter referred to as the Promotion Organizer), the game prizes and their delivery, dispute resolution and other procedures.</p>

<p>2.&nbsp; &nbsp; &nbsp;&nbsp;Game period: November 15, 2024 - December 22, 2024 (inclusive)</p>

<p>3.&nbsp; &nbsp; &nbsp;&nbsp;The game participant must be a registered&nbsp;pigu.lt&nbsp;member and have agreed to receive game news and information about prizes.</p>

<p>4.&nbsp; &nbsp; &nbsp;&nbsp;The game is played on the&nbsp;Pigu.lt&nbsp;mobile app.&nbsp;During the game, the game participant controls the game hero, whose goal is to jump on platforms to jump as high as possible without falling.&nbsp;Platforms can break.&nbsp;Each platform jumped on gives points.&nbsp;To improve the result, the game participant can repeat the game.</p>

<p><strong>GAME PRIZES AND THEIR DELIVERY PROCEDURE</strong></p>

<p>5.&nbsp; &nbsp;Game prizes consist of:</p>

<p>5.1.&nbsp;&nbsp;2€ discount codes for baskets over 20€, when shopping in the&nbsp;Pigu.lt&nbsp;app, which are valid only on the day of winning until midnight</p>

<p>5.2.&nbsp;ten gift vouchers worth 20€, which are won by the 10 game participants who have scored the most points each week.</p>

<p>6.&nbsp; &nbsp;Every day, game participants who score more than 1500 points receive a 2€ discount code for baskets over 20€.</p>

<p>7.&nbsp; &nbsp;Every week, the ten game participants who score the most points will win gift vouchers worth 20€.</p>

<p>8.&nbsp; &nbsp;The procedure for informing about the game prize and its delivery:</p>

<p>8.1.&nbsp;&nbsp;the game participant is informed about the game prize specified in clause 5.1 of the Game Rules in the results window, immediately after winning the game.</p>

<p>8.2.&nbsp;the game participant is informed about the game prize specified in clause 5.2 of the Game Rules at the e-mail address provided by him.&nbsp;Information about winning the previous week's game is sent on Mondays, on the following dates: November 25, 2024, December 2, 2024, December 9, 2024, December 16, 2024, December 23, 2024.</p>

<p>9.&nbsp; &nbsp; &nbsp;&nbsp;Terms of use of game gift vouchers:</p>

<p>9.1.&nbsp;the gift voucher is valid for 1 week from the date of its dispatch;</p>

<p>9.2.&nbsp;the gift voucher is non-refundable and cannot be exchanged for cash;</p>

<p>9.3.&nbsp;if the amount of the order for which payment is made by applying the gift voucher exceeds the value of the gift voucher, the missing amount can be paid by choosing one of the payment methods offered by&nbsp;Pigu.lt;</p>

<p>9.4.&nbsp;the gift voucher code can only be applied to one order.&nbsp;If the amount of the order for which payment is made by applying the gift voucher is less than the value of the gift voucher, the resulting difference is non-refundable;</p>

<p>9.5.&nbsp;the gift voucher is not valid for VAT payers - natural and legal persons (except for budgetary institutions), when trying to pay for goods subject to reverse VAT taxation;</p>

<p>9.6.&nbsp;the gift voucher can only be used in the&nbsp;Pigu.lt&nbsp;app.</p>

<p><strong>FINAL PROVISIONS</strong></p>

<p>10.&nbsp; &nbsp;Upon detecting unfair behavior of the game participant, the Promotion Organizer reserves the right to remove the game participant from the game without prior notice.</p>

<p>11.&nbsp; &nbsp;All disputes arising from the game shall be resolved through negotiation.&nbsp;If no agreement can be reached through negotiations, disputes shall be resolved in a&nbsp;Lithuanian&nbsp;court in accordance with the procedure established by the laws of the&nbsp;Republic of Lithuania&nbsp;according to the location of the Promotion Organizer's registered office.</p>

<p>12.&nbsp;The Promotion Organizer has the right to unilaterally terminate the game and cancel the prizes due to force majeure circumstances immediately after the participants are informed about the termination of the game publicly.</p>

<p>13. The Promotion Organizer has the right to unilaterally change or supplement these Game Rules without prior notice, informing the game participants about it on the<a href="https://www.google.com/url?q=https://pigu.lt/lt/t/zaidimo-taisykles&amp;sa=D&amp;source=editors&amp;ust=1731333715597620&amp;usg=AOvVaw0oR8G69DwTH7Cc2qBDZf8m">&nbsp;</a><a href="https://www.google.com/url?q=https://pigu.lt/lt/t/zaidimo-taisykles&amp;sa=D&amp;source=editors&amp;ust=1731333715597886&amp;usg=AOvVaw2Xp0PvZt_99ieg2g3ZvnKY">https://pigu.lt/lt/t/zaidimo-taisykles</a>&nbsp;page</p>

<p>14. The Promotion Organizer undertakes to ensure the security of personal data transferred to it and not to transfer it to third parties, except in cases where the provision of such data is necessary in accordance with the requirements of legal acts.</p>

<p>15.&nbsp;You can limit the processing of your personal data and/or exercise your rights as a data subject in the following ways:</p>

<ul>
	<li>by contacting us by e-mail:&nbsp;duomenuapsauga@pigu.lt;</li>
	<li>by contacting us by phone:&nbsp;+370 52073998.</li>
</ul>

<p>The provisions of the Privacy Policy, which you can find at<a href="https://www.google.com/url?q=https://pigu.lt/lt/t/privatumo-politika&amp;sa=D&amp;source=editors&amp;ust=1731333715598526&amp;usg=AOvVaw210WEK7ivjUTaijAzVUOx-">&nbsp;</a><a href="https://www.google.com/url?q=https://pigu.lt/lt/t/privatumo-politika&amp;sa=D&amp;source=editors&amp;ust=1731333715598649&amp;usg=AOvVaw39-8qZob3yYgKNL6-RGbPZ">https://pigu.lt/lt/t/privatumo-politika</a>, apply to the processing of personal data related to the game.</p>

<p>We value your opinion and suggestions! We will be waiting for them at the e-mail address&nbsp;<a href="mailto:rinkodara@pigu.lt">rinkodara@pigu.lt</a>.</p></div><br/><br/><br/>`;
    const containerDiv = document.querySelector('.rules-table-container');
    containerDiv.innerHTML += `
              </div>
              <div class="close-rules-container" id="close-rules-container" style="display:block;width:32px;height:32px;">
<img src=${close} alt="Image Description" style="width: 100%; height: 100%;"></img>
</div>
              <div  class="boomio-custom-scrollbar-rules" style="overflow-x:hidden;overflow-y: scroll;height: calc(100% - 20px);text-align:start;padding-left:10px;font-size:10px;margin-top:50px;">
${content}
              <div >
              </div>
    `;

    this.containerDiv = containerDiv;

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

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('rules-table-container');
    containerDiv.setAttribute('id', 'rules-table-container');
    containerDiv.style.background = '#DDDDDD';
    containerDiv.style.borderRadius = '10px';
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
