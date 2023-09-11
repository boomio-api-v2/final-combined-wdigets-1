import { widgetHtmlService, QrCodeModal, localStorageService } from '@/services';
import './styles.css';
import {
  clawImg,
  chainImg,
  buttonImg,
  ClawLineImg,
  clawRelease,
  clawPick,
  GiftOne,
  GiftTwo,
  ClawLineBackground,
  GifTwo,
} from './constants';

class ClawMachineWidget {
  constructor() {
    this.preloadImages().then(() => {
      this.startClawMachine();
    });
  }

  async preloadImages() {
    const imageUrls = [
      clawImg,
      chainImg,
      buttonImg,
      ClawLineImg,
      clawRelease,
      clawPick,
      GiftOne,
      GiftTwo,
      ClawLineBackground,
      GifTwo,
    ];

    const imagePromises = imageUrls.map((imageUrl) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    try {
      await Promise.all(imagePromises);
      console.log('All images preloaded successfully.');
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }

  startClawMachine() {
    this.isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

    this.config = localStorageService.getDefaultConfig();
    this.createContainer();
    this.clawDiv = document.querySelector('.claw-div');
    this.chainDiv = document.querySelector('.chain-div');
    this.clawDivPosition = { top: 0, left: 0 };
    this.setupClickHandler();
    this.animationInProgress = false; // Use a separate flag for animation
    this.clawPresentDiv = null;
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
    this.clawPole.style.height = '65px';
    this.clawPole.style.marginTop = '3px';
    this.clawPole.style.marginLeft = '28px';
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

    const textSpan = document.createElement('span');
    textSpan.innerText = 'START'; // Replace with your desired text
    textSpan.style.padding = '5px 10px'; // Add some padding for better appearance
    textSpan.style.display = 'inline-block';

    // Add text styling
    textSpan.style.color = 'white'; // Hide the text color
    textSpan.style.fontFamily = 'sans-serif';
    textSpan.style.fontSize = '28px';
    textSpan.style.fontStyle = 'normal';
    textSpan.style.fontWeight = 600;
    textSpan.style.lineHeight = 'normal';
    textSpan.style.textAlign = 'center';

    // Apply text stroke (border) to each letter
    textSpan.style.webkitTextStroke = '1px #b8b8b8'; // Webkit browsers (Safari)
    textSpan.style.mozTextStroke = '1px #b8b8b8'; // Firefox
    textSpan.style.textStroke = '1px #b8b8b8'; // Standard

    // Append the text span to the button
    controlButton.appendChild(textSpan);

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

    this.clawDiv.style.top = `calc(100vh - ${this.isMobile ? '240px' : '290px'})`;
    this.clawPole.style.transition = 'height 1s, transform 1s';
    this.clawPole.style.height = `calc(100vh - ${this.isMobile ? '345px' : '395px'})`;
    setTimeout(() => {
      // Add the CSS class to trigger the transition
      this.clawDiv.classList.add('claw-div-transition');

      // Change the background image
      this.clawDiv.style.backgroundImage = `url(${clawPick})`;

      // After a short delay, remove the CSS class to stop the transition
      setTimeout(() => {
        this.clawDiv.classList.remove('claw-div-transition');
      }, 500); // Adjust the delay to match the transition duration
    }, 1000);

    setTimeout(() => {
      this.clawPresentDivs.forEach((clawPresentDiv, index) => {
        const clawDivRect = this.clawDiv.getBoundingClientRect();
        const clawPresentDivRect = clawPresentDiv.getBoundingClientRect();
        if (
          clawDivRect.left + 80 < clawPresentDivRect.right - clawPresentDivRect.width / 4 &&
          clawDivRect.right - 80 > clawPresentDivRect.left + clawPresentDivRect.width / 8 &&
          clawDivRect.top < clawPresentDivRect.bottom
        ) {
          if (!this.isHoldingclawPresentDivs[index]) {
            this.isHoldingclawPresentDivs[index] = true;
            clawPresentDiv.style.transition = 'top 0s';
            clawPresentDiv.style.top = '70px';
            clawPresentDiv.style.left = `${clawDivRect.width / 2 - clawPresentDivRect.width / 2}px`;
            this.clawPresentDiv = clawPresentDiv;
            this.clawDiv.appendChild(clawPresentDiv);
            this.gameTimer = setTimeout(() => {
              setTimeout(() => {
                const presentType = this.clawPresentDiv.style.backgroundImage;
                if (presentType.includes('GiftTwo')) {
                  clawPresentDiv.style.backgroundImage = `url(${GifTwo})`;
                  setTimeout(() => {
                    clawPresentDiv.style.opacity = 1;
                    setTimeout(() => {
                      animateFalling(clawPresentDiv);
                    }, 10);
                    const animateFalling = (element) => {
                      element.style.transition = 'top 2s ,opacity 1s';
                      element.style.top = '1500px';
                      element.style.opacity = 0;
                    };
                    setTimeout(() => {
                      this.clawDiv.removeChild(clawPresentDiv);
                      this.isHoldingclawPresentDivs[index] = false;
                    }, 700);
                  }, 700);
                }
              }, 100);

              this.endGame();
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

        setTimeout(() => {
          if (this.clawPresentDiv) {
            const presentType = this.clawPresentDiv.style.backgroundImage;
            if (
              this.isHoldingclawPresentDivs.some((item) => item === true) &&
              presentType.includes('GiftTwo')
            ) {
              const gifPath = clawRelease;

              this.clawDiv.style.backgroundImage = `url(${gifPath})`;
            }
          }
        }, 700);

        setTimeout(() => {
          this.clawDiv.style.transition = 'top 1s';
          this.clawDiv.style.top = '182px';

          this.clawPole.style.transition = 'height 1s, transform 1s';
          this.clawPole.style.height = '65px';

          setTimeout(() => {
            if (!this.isHoldingclawPresentDivs.some((item) => item === true)) {
              this.clawDiv.style.backgroundImage = `url(${clawImg})`;
            }
            this.animationInProgress = false;
            this.shouldContinueAutomaticClawMovement = true;
            this.startAutomaticClawMovement();
          }, 500);
        }, 500);
      }, 200);
    }, 2000);
  }
  startAutomaticClawMovement() {
    const clawSpeed = this.isMobile ? 6 : 10; // Adjust the speed as needed
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
    clawLineDiv.style.backgroundImage = `url(${ClawLineBackground})`; // Use the imported clawImg as the background image

    // Initially, position the line div 100px above the top of the viewport using transform
    clawLineDiv.style.transform = 'translateY(200px)';
    clawLineDiv.style.transition = 'transform 1s ease-in-out'; // Add a smooth transition effect for transform
    clawLineDiv.style.backgroundRepeat = 'no-repeat'; // Add a smooth transition effect for transform

    // Append the line div to the container
    clawMachineContainer.appendChild(clawLineDiv);

    // Calculate the width of the line div
    let presentSpacing; // Adjust as needed
    let numberOfPresents;

    let containerWidth = 0;
    let leftPosition = 0;
    let minHeight = 0;
    let maxHeight = 0;

    if (this.isMobile) {
      numberOfPresents = 8;
      presentSpacing = 10;
      minHeight = 67;
      maxHeight = 87;
      leftPosition = 60;
      containerWidth = window.innerWidth - 40;
    } else {
      numberOfPresents = 20;
      presentSpacing = 20;
      minHeight = 129;
      maxHeight = 271;
      leftPosition = 90;
      containerWidth = window.innerWidth - 80;
    }

    const totalPresents = this.isMobile ? 8 : 10;

    const presents = [];
    for (let i = 0; i < totalPresents; i++) {
      presents.push(i < 4 ? GiftTwo : GiftOne);
    }
    shuffleArray(presents);
    // Create and display the presents
    for (let i = 0; i < totalPresents; i++) {
      const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      const aspectRatio = 623 / 704; // Aspect ratio of the original size (width / height)
      const randomWidth = Math.floor(randomHeight * aspectRatio);

      if (leftPosition + randomWidth < containerWidth) {
        const newClawPresentDiv = document.createElement('div');
        newClawPresentDiv.classList.add('claw-present-div');
        newClawPresentDiv.style.width = `${randomWidth}px`;
        newClawPresentDiv.style.height = `${randomHeight}px`;
        newClawPresentDiv.style.left = `${leftPosition}px`;
        newClawPresentDiv.style.bottom = `2000px`;
        newClawPresentDiv.style.opacity = 0.5;
        const styleBottom = `${Math.random() * 15 + 25}px`;

        newClawPresentDiv.style.backgroundImage = `url(${presents[i]})`;
        newClawPresentDiv.style.backgroundSize = 'cover';

        clawLineDiv.appendChild(newClawPresentDiv);
        const randomTimeout = Math.random() * 500;

        setTimeout(() => {
          animateFalling(newClawPresentDiv, styleBottom);
        }, randomTimeout);
        leftPosition += randomWidth + presentSpacing;
      }
      function animateFalling(element, bottom) {
        element.style.transition = 'bottom 1.5s, opacity 1s';
        element.style.opacity = 1; // Ensure the final position is exactly 10px
        element.style.bottom = bottom; // Ensure the final position is exactly 10px
      }
    }

    // Function to shuffle an array using the Fisher-Yates algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
    const presentType = this.clawPresentDiv.style.backgroundImage;
    if (!presentType.includes('GiftTwo')) {
      setTimeout(() => {
        const element = document.getElementById('clawMachine-container');
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
          new QrCodeModal();
        }
      }, 250);
    }
  };
}

export default () => {
  new ClawMachineWidget();
};
