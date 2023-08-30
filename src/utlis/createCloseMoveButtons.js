export const createCloseMoveButtons = (element, width) => {
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.position = 'absolute';
  btnContainer.style.marginLeft = `${width ?? element.offsetWidth}px`;

  btnContainer.style.flexDirection = 'column';
  btnContainer.style.justifyContent = 'center';
  const dragBtn = document.createElement('div');
  dragBtn.classList.add('round-close-icon');
  dragBtn.innerHTML =
    '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/131cda78a7d6d48ddfcd6475ccd5a61a66c2f2af/images/wheelOfFortuneWidget/icon-drag.svg"></img>';
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('round-close-icon');
  closeBtn.innerHTML =
    '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/131cda78a7d6d48ddfcd6475ccd5a61a66c2f2af/images/wheelOfFortuneWidget/round-close.svg"></img>';
  closeBtn.addEventListener(
    'click',
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      element.remove();
    },
    { once: true },
  );
  btnContainer.appendChild(closeBtn);
  btnContainer.appendChild(dragBtn);
  element.appendChild(btnContainer);
};
