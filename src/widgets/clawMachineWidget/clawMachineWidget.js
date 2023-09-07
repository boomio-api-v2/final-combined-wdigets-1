import { widgetHtmlService, QrCodeModal, localStorageService } from '@/services';
import './styles.css';
import { clawImg, chainImg, buttonImg, ClawLineImg } from './constants';

class ClawMachineWidget {
  constructor() {
    this.startClawMachine();
  }

  startClawMachine() {
    this.config = localStorageService.getDefaultConfig();
    this.createContainer();
    this.clawDiv = document.querySelector('.claw-div');
    this.chainDiv = document.querySelector('.chain-div');
    this.clawDivPosition = { top: 0, left: 0 };
    this.setupClickHandler();
    this.animationInProgress = false; // Use a separate flag for animation

    // Store an array of grabbable present divs
    this.clawPresentDivs = document.querySelectorAll('.claw-present-div');

    // Initialize flags for each present div
    this.isHoldingclawPresentDivs = Array(this.clawPresentDivs.length).fill(false);
    this.shouldContinueAutomaticClawMovement = true;
    this.startAutomaticClawMovement();
    this.direction = -1;
    this.clawPosition = 0;
    this.setupControlButtonBackground();
    this.setupControlButton();
    this.setupClawLine();
    this.setupPole();
  }

  setupControlButtonBackground() {
    // Create a button element
    const controlButton = document.createElement('button');
    controlButton.classList.add('boomio-control-button');
    controlButton.style.backgroundImage = `url(${buttonImg})`; // Use the imported clawImg as the background image
    controlButton.style.backgroundSize = 'cover'; // Adjust as needed
    controlButton.style.width = '82px';
    controlButton.style.height = '88px';
    controlButton.style.marginTop = '60px';
    controlButton.style.marginLeft = '0px';
    controlButton.style.backgroundColor = 'transparent';
    controlButton.style.border = 'none';
    controlButton.setAttribute('id', 'boomio-control-button');
    // Append the button to the document body
    this.chainDiv.appendChild(controlButton);
  }

  setupClawLine() {
    this.clawLine = document.createElement('div');
    this.clawLine.classList.add('boomio-claw-line');
    this.clawLine.style.zIndex = 2;
    this.clawLine.style.backgroundImage = `url(${ClawLineImg})`; // Use the imported clawImg as the background image
    this.clawLine.style.backgroundSize = 'contain'; // Adjust as needed
    this.clawLine.style.width = '323px';
    this.clawLine.style.height = '138px';
    this.clawLine.style.marginTop = '-155px';
    this.clawLine.style.marginLeft = '-340px';
    this.clawLine.style.backgroundColor = 'transparent';
    this.clawLine.style.border = 'none';
    this.clawLine.setAttribute('id', 'boomio-claw-line');

    // Append the button to the document body
    this.chainDiv.appendChild(this.clawLine);
  }

  setupPole() {
    this.clawPole = document.createElement('div');
    this.clawPole.classList.add('boomio-claw-pole');
    this.clawPole.style.zIndex = 2;
    this.clawPole.style.background = `linear-gradient(180deg, #E89D9B 2.68%, #F17879 35.09%, #D85E99 63.96%, #C54AB5 99.91%)`; // Use the imported clawImg as the background image
    this.clawPole.style.backgroundSize = 'contain'; // Adjust as needed
    this.clawPole.style.width = '28px';
    this.clawPole.style.height = '62px';
    this.clawPole.style.marginTop = '1px';
    this.clawPole.style.marginLeft = '27px';
    this.clawPole.style.backgroundColor = 'transparent';
    this.clawPole.style.border = 'none';
    this.clawPole.setAttribute('id', 'boomio-claw-pole');
    this.chainDiv.appendChild(this.clawPole);
  }

  setupControlButton() {
    // Create a button element
    const controlButton = document.createElement('button');
    controlButton.classList.add('boomio-control-button');
    controlButton.style.borderRadius = '30px';
    controlButton.style.border = '2px solid #FFF';
    controlButton.style.boxShadow =
      '8px 8px 22px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset';
    controlButton.style.background =
      'linear-gradient(180deg, #E89D9B 2.68%, #F17879 35.09%, #D85E99 63.96%, #C54AB5 99.91%)';
    controlButton.style.width = '161px';
    controlButton.style.height = '53.281px';
    controlButton.style.flexShrink = 0;

    controlButton.style.position = 'absolute';
    controlButton.style.marginTop = '75px';
    controlButton.style.marginLeft = '-123px';
    controlButton.style.backgroundColor = 'transparent';
    controlButton.style.cursor = 'pointer';
    controlButton.style.zIndex = 999999;
    controlButton.setAttribute('id', 'boomio-control-button');

    // Add text and styling
    controlButton.style.color = '#FFF';
    controlButton.style.textAlign = 'center';
    controlButton.style.textShadow = '4px 4px 12px rgba(0, 0, 0, 0.15)';
    controlButton.style.fontFamily = 'Holtwood One SC';
    controlButton.style.fontSize = '26px';
    controlButton.style.fontStyle = 'normal';
    controlButton.style.fontWeight = 600;
    controlButton.style.lineHeight = 'normal';
    controlButton.innerText = 'START'; // Replace with your desired text

    controlButton.addEventListener('mouseenter', () => {
      controlButton.style.transform = 'scale(1.05)';
      controlButton.style.transition = 'transform 0.2s ease';
    });

    controlButton.addEventListener('mouseleave', () => {
      controlButton.style.transform = 'scale(1)';
      controlButton.style.transition = 'transform 0.2s ease';
    });

    controlButton.addEventListener('click', () => {
      this.activateGrabbing();

      // Apply "pressed in" styles
      controlButton.style.boxShadow = '0px 0px 10px 0px rgba(0, 0, 0, 0.8) inset';
      controlButton.style.backgroundColor = '#D85E99'; // Change the color if desired

      // Restore original styles after a short delay (e.g., 300 milliseconds)
      setTimeout(() => {
        controlButton.style.boxShadow =
          'inset 0px 0px 5px #c1c1c1, 8px 8px 22px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset';
        controlButton.style.backgroundColor =
          'linear-gradient(180deg, #E89D9B 2.68%, #F17879 35.09%, #D85E99 63.96%, #C54AB5 99.91%)';
      }, 3400);
    });

    // Append the button to the document body
    this.chainDiv.appendChild(controlButton);
  }
  activateGrabbing() {
    if (this.animationInProgress || this.isHoldingclawPresentDivs.some((held) => held)) {
      return;
    }
    const buttonElement = document.querySelector('.boomio-control-button');

    buttonElement.style.pointerEvents = 'none';

    this.animationInProgress = true;
    this.shouldContinueAutomaticClawMovement = false;
    // Add your logic to move the claw down here
    this.clawDiv.style.transition = 'top 1s';

    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

    this.clawDiv.style.top = `calc(100vh - ${isMobile ? '127px' : '127px'})`;
    this.clawPole.style.transition = 'height 1s, transform 1s';
    this.clawPole.style.height = `calc(100vh - ${isMobile ? '266px' : '266px'})`;

    setTimeout(() => {
      this.clawPresentDivs.forEach((clawPresentDiv, index) => {
        const clawDivRect = this.clawDiv.getBoundingClientRect();
        const clawPresentDivRect = clawPresentDiv.getBoundingClientRect();

        if (
          clawDivRect.left < clawPresentDivRect.right &&
          clawDivRect.right > clawPresentDivRect.left &&
          clawDivRect.top < clawPresentDivRect.bottom
        ) {
          if (!this.isHoldingclawPresentDivs[index]) {
            if (this.clawDiv.contains(clawPresentDiv)) {
              this.clawDiv.removeChild(clawPresentDiv);
            }
            this.isHoldingclawPresentDivs[index] = true;

            clawPresentDiv.style.transition = 'top 0s';
            clawPresentDiv.style.top = '50px';
            clawPresentDiv.style.left = '65px';
            this.clawDiv.appendChild(clawPresentDiv);
            this.gameTimer = setTimeout(() => {
              setTimeout(() => {
                this.clawDiv.removeChild(clawPresentDiv);
                this.isHoldingclawPresentDivs[index] = false;
              }, 1000);

              this.endGame(index);
            }, 1000);
          }
        }
      });

      setTimeout(() => {
        setTimeout(() => {
          const buttonElement = document.querySelector('.boomio-control-button');
          if (buttonElement) {
            buttonElement.style.pointerEvents = 'auto';
          }
        }, 600);
        this.clawDiv.style.transition = 'top 1s';
        this.clawDiv.style.top = '200px';

        this.clawPole.style.transition = 'height 1s, transform 1s';
        this.clawPole.style.height = '62px';
        this.clawPole.style.transform = 'translateY(0)';
        setTimeout(() => {
          this.animationInProgress = false;
          this.shouldContinueAutomaticClawMovement = true;
          this.startAutomaticClawMovement();
        }, 1000);
      }, 600);
    }, 2000);
  }
  startAutomaticClawMovement() {
    const clawSpeed = 10; // Adjust the speed as needed
    const maxX = window.innerWidth - this.clawDiv.clientWidth;

    const moveClaw = () => {
      // Check if automatic movement should continue
      if (!this.shouldContinueAutomaticClawMovement) {
        return;
      }

      this.clawPosition += this.direction * clawSpeed; // Update the stored claw position

      // Ensure the claw stays within the screen boundaries
      if (this.clawPosition >= maxX) {
        this.clawPosition = maxX;
        this.direction = -1; // Reverse direction when reaching the right edge
      } else if (this.clawPosition <= 0) {
        this.clawPosition = 0;
        this.direction = 1; // Reverse direction when reaching the left edge
      }

      // Update the claw's position
      this.clawDiv.style.left = `${this.clawPosition}px`;

      // Update the chain's position to move together with the claw
      const chainDivLeft = this.clawPosition + this.clawDiv.clientWidth / 2 - 40;
      this.chainDiv.style.left = `${chainDivLeft}px`;

      // Schedule the next movement
      setTimeout(moveClaw, 50); // Adjust the delay as needed for the desired speed
    };

    // Start the automatic movement
    moveClaw();
  }
  createContainer = () => {
    const clawMachineContainer = document.createElement('div');
    clawMachineContainer.setAttribute('id', 'clawMachine-container');
    clawMachineContainer.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    const clawLineDiv = document.createElement('div');
    clawLineDiv.classList.add('claw-line-div');

    // Set the width of the line div
    clawLineDiv.style.width = '100%'; // Set it to 100% to cover the entire container

    // Initially, position the line div 100px above the top of the viewport using transform
    clawLineDiv.style.transform = 'translateY(100px)';
    clawLineDiv.style.transition = 'transform 1s ease-in-out'; // Add a smooth transition effect for transform

    // Append the line div to the container
    clawMachineContainer.appendChild(clawLineDiv);

    // Calculate the width of the line div
    const lineWidth = window.innerWidth;
    const presentSpacing = 20; // Adjust as needed
    const presentWidth = 50; // Adjust as needed
    function isMobile() {
      const mobileThreshold = 768; // You can adjust this threshold as needed

      return window.innerWidth <= mobileThreshold;
    }

    let numberOfPresents;
    let presentColors;

    if (isMobile()) {
      numberOfPresents = 7;
    } else {
      numberOfPresents = 2;
    }

    // Array to store present positions
    const presentPositions = [];
    for (let i = 0; i < numberOfPresents; i++) {
      const clawPresentDiv = document.createElement('div');
      clawPresentDiv.classList.add('claw-present-div');

      let leftPosition;
      let attempts = 0;
      const maxAttempts = 100; // Maximum number of attempts to find a non-colliding position
      let collision;
      // Position the present randomly, avoiding collisions
      do {
        leftPosition = Math.random() * (lineWidth - presentWidth - 25);
        // Check for collisions with existing presents
        collision = presentPositions.some(
          (pos) => Math.abs(leftPosition - pos) < presentWidth + presentSpacing,
        );

        attempts++;

        // If too many attempts are made, skip this present
        if (attempts > maxAttempts) {
          console.warn(`Skipped present ${i} after ${attempts} attempts.`);
          break;
        }
      } while (collision);

      // If a valid position was found, add the present
      if (attempts <= maxAttempts) {
        presentPositions.push(leftPosition);

        clawPresentDiv.style.left = `${leftPosition}px`;
        clawPresentDiv.style.bottom = `${Math.random() * 15 + 25}px`;
        clawPresentDiv.style.backgroundColor = 'orange';

        clawLineDiv.appendChild(clawPresentDiv);
      }
    }

    // Create the existing Claw div
    const clawDiv = document.createElement('div');
    clawDiv.classList.add('claw-div');
    clawDiv.style.backgroundImage = `url(${clawImg})`; // Use the imported clawImg as the background image
    clawDiv.style.backgroundSize = 'cover'; // Adjust as needed

    clawDiv.style.transform = 'translateY(-100px)';
    clawDiv.style.transition = 'transform 1s ease-in-out'; // Add a smooth transition effect for transform

    clawMachineContainer.appendChild(clawDiv);

    const chainDiv = document.createElement('div');
    chainDiv.classList.add('chain-div');
    chainDiv.style.backgroundImage = `url(${chainImg})`; // Use the imported clawImg as the background image
    chainDiv.style.backgroundSize = 'cover'; // Adjust as needed

    // Set initial position of the chain div
    chainDiv.style.transform = 'translateY(-100px)'; // Adjust the initial position as needed
    chainDiv.style.transition = 'transform 1s ease-in-out'; // Add a smooth transition effect for transform

    clawMachineContainer.appendChild(chainDiv);

    setTimeout(() => {
      clawDiv.style.transform = 'translateY(0)';
      clawLineDiv.style.transform = 'translateY(0)';
      chainDiv.style.transform = 'translateY(0)';
    }, 100);

    widgetHtmlService.container.appendChild(clawMachineContainer);
  };

  setupClickHandler() {}

  endGame = () => {
    setTimeout(() => {
      const element = document.getElementById('clawMachine-container');
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        new QrCodeModal();
      }
    }, 700);
  };
}

export default () => {
  new ClawMachineWidget();
};
