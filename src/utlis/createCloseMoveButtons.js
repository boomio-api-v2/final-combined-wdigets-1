export const createCloseMoveButtons = (element, deleteElement, width) => {
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.flexDirection = 'column';
  btnContainer.style.justifyContent = 'center';
  const dragBtn = document.createElement('div');
  if (window.matchMedia('(min-width: 600px)').matches) {
    dragBtn.classList.add('action-icon', 'move');
    dragBtn.innerHTML =
      '<img src="https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/quessWidget-new-design/src/widgets/guessWidget/x-move.png?raw=true"></img>';
  }
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('action-icon', 'close');
  closeBtn.innerHTML =
    '<img src="https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/quessWidget-new-design/src/widgets/guessWidget/x-circle.png?raw=true"></img>';
  closeBtn.addEventListener(
    'click',
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      deleteElement.remove(); // Remove the specified deleteElement
    },
    { once: true },
  );
  btnContainer.appendChild(closeBtn);
  if (window.matchMedia('(min-width: 600px)').matches) {
    btnContainer.appendChild(dragBtn);
  }
  element.appendChild(btnContainer);
};
