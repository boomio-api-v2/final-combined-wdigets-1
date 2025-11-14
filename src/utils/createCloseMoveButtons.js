import './styles.css';

export const createCloseMoveButtons = (element, deleteElement, position, moveButton) => {
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.flexDirection = 'column';
  btnContainer.style.justifyContent = 'center';
  btnContainer.style.position = 'absolute';
  btnContainer.style.zIndex = 1000000000000000;
  localStorage.setItem('closing_button', false);
  if (position) {
    btnContainer.style.top = position[0] + 'px';
    btnContainer.style.left = position[1] + 'px';
  }
  const dragBtn = document.createElement('div');

  if (moveButton) {
    if (window.matchMedia('(min-width: 600px)').matches) {
      dragBtn.classList.add('action-icon', 'move');
      dragBtn.style.cursor = 'grab';
      dragBtn.innerHTML = '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/main/src/widgets/guessWidget/x-move.png"></img>';
    }
  }
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('action-icon', 'close');
  btnContainer.style.cursor = 'pointer';
  closeBtn.innerHTML = '<img src="https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/main/src/widgets/guessWidget/x-circle.png"></img>';
  closeBtn.addEventListener('click', (e) => {
    localStorage.setItem('closing_button', deleteElement.id);
    e.stopPropagation();
    e.preventDefault();
    deleteElement.classList.add('fade-out');

    setTimeout(() => {
      if (deleteElement) {
        deleteElement.style.opacity = '0';
      }
    }, 10);

    setTimeout(() => {
      if (deleteElement) {
        deleteElement.style.display = 'none';
      }
    }, 510);
  });

  btnContainer.appendChild(closeBtn);
  if (window.matchMedia('(min-width: 600px)').matches && moveButton) {
    btnContainer.appendChild(dragBtn);
  }
  element.appendChild(btnContainer);
};
