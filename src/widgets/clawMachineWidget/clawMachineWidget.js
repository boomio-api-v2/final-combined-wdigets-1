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
  clawClosed,
  GiftOpened,
  ClawClose,
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
      clawClosed,
      GiftOpened,
      ClawClose,
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
    controlButton.classList.add('boomio-control-button-background');
    controlButton.style.backgroundImage = `url(${buttonImg})`; // Use the imported clawImg as the background image
    controlButton.style.backgroundSize = 'cover';
    // Adjust as needed
    controlButton.style.width = this.isMobile ? '74px' : '82px';
    controlButton.style.height = this.isMobile ? '76px' : '84px';
    controlButton.style.marginTop = '60px';
    controlButton.style.marginLeft = '0px';
    controlButton.style.backgroundColor = 'transparent';
    controlButton.style.border = 'none';
    controlButton.setAttribute('id', 'boomio-control-button-background');
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
    this.clawLine.style.marginLeft = this.isMobile ? '-303px' : '-340px';
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
    this.clawPole.style.width = this.isMobile ? '24px' : '28px';
    this.clawPole.style.height = this.isMobile ? '60px' : '65px';
    const isFirefox = typeof InstallTrigger !== 'undefined';

    this.clawPole.style.marginTop = isFirefox ? '10px' : '3px';
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
    controlButton.style.border =
      '2px solid linear-gradient(206.25deg, #9652E1 -0.12%, #CA4FAE 30.68%, #CD52AA 50.7%, #E16690 70.72%)';
    controlButton.style.boxShadow =
      '8px 8px 22px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset';
    controlButton.style.background =
      'linear-gradient(180deg, #E89D9B 2.68%, #F17879 35.09%, #D85E99 63.96%, #C54AB5 99.91%)';

    controlButton.style.width = this.isMobile ? '150px' : '104.61px';
    controlButton.style.height = this.isMobile ? '45px' : '103px';
    controlButton.style.flexShrink = 0;

    controlButton.style.position = 'absolute';
    const isFirefox = typeof InstallTrigger !== 'undefined';
    controlButton.style.marginTop = this.isMobile ? (isFirefox ? '73px ' : '-67px') : '75px';
    controlButton.style.marginLeft = this.isMobile ? (isFirefox ? '-115px ' : '-74px') : '-123px';
    controlButton.style.backgroundColor = 'transparent';
    controlButton.style.cursor = 'pointer';
    controlButton.style.zIndex = 999999;
    controlButton.setAttribute('id', 'boomio-control-button');

    const textSpan = document.createElement('span');
    textSpan.innerText = 'PLAY'; // Replace with your desired text
    textSpan.style.padding = '5px 10px'; // Add some padding for better appearance
    textSpan.style.display = 'inline-block';

    // Add text styling
    textSpan.style.color = 'white'; // Hide the text color
    textSpan.style.fontFamily = 'sans-serif';
    textSpan.style.fontSize = this.isMobile ? '24px' : '28px';
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
      }, 2600);
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
    const isFirefox = typeof InstallTrigger !== 'undefined';

    this.clawDiv.style.top = `calc(100vh - ${this.isMobile ? '204px' : '290px'})`;
    this.clawPole.style.transition = 'height 1s, transform 1s';
    this.clawPole.style.height = `calc(100vh - ${
      this.isMobile ? (isFirefox ? '315px' : '320px') : '405px'
    })`;
    setTimeout(() => {
      function restartGif(animationElement) {
        const release = `url(${clawPick})`;

        setTimeout(() => {
          animationElement.style.backgroundImage = release;
          setTimeout(() => {
            const gifUrl = `url(${clawClosed})`;
            animationElement.style.backgroundImage = gifUrl;
          }, 500);
        }, 10);
      }
      restartGif(this.clawDiv);
    }, 400);

    setTimeout(() => {
      this.clawPresentDivs.forEach((clawPresentDiv, index) => {
        const clawDivRect = this.clawDiv.getBoundingClientRect();
        const clawPresentDivRect = clawPresentDiv.getBoundingClientRect();
        if (
          clawDivRect.left + (this.isMobile ? 70 : 105) < clawPresentDivRect.right &&
          clawDivRect.right - (this.isMobile ? 70 : 105) > clawPresentDivRect.left &&
          clawDivRect.top < clawPresentDivRect.bottom
        ) {
          if (!this.isHoldingclawPresentDivs[index]) {
            this.isHoldingclawPresentDivs[index] = true;
            clawPresentDiv.style.transition = 'top 0s';
            clawPresentDiv.style.top = '60px';
            clawPresentDiv.style.left = `${clawDivRect.width / 2 - clawPresentDivRect.width / 2}px`;
            this.clawPresentDiv = clawPresentDiv;
            this.clawDiv.appendChild(clawPresentDiv);
            this.gameTimer = setTimeout(() => {
              setTimeout(() => {
                const presentType = this.clawPresentDiv.style.backgroundImage;
                if (presentType.includes('GiftTwo')) {
                  function restartGif(animationElement) {
                    const Opened = `url(${GifTwo})`;
                    setTimeout(() => {
                      animationElement.style.backgroundImage = Opened;
                      setTimeout(() => {
                        const gifUrl = `url(${GiftOpened})`;
                        animationElement.style.backgroundImage = gifUrl;
                      }, 500);
                    }, 10);
                  }
                  restartGif(clawPresentDiv);
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
                    }, 500);
                  }, 500);
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
        }, 500);

        setTimeout(() => {
          if (this.clawPresentDiv) {
            const presentType = this.clawPresentDiv.style.backgroundImage;
            if (
              this.isHoldingclawPresentDivs.some((item) => item === true) &&
              presentType.includes('GiftTwo')
            ) {
              function restartGif(animationElement) {
                const randomQueryParam = `?a=${Math.random()}`;
                const release = `url(${clawRelease})`;

                setTimeout(() => {
                  animationElement.style.backgroundImage = release;
                  setTimeout(() => {
                    const gifUrl = `url(${clawImg})`;
                    animationElement.style.backgroundImage = gifUrl;
                    animationElement.classList.add('claw-div-transition');
                  }, 400);
                }, 10);
              }
              restartGif(this.clawDiv);
            }
          }
        }, 600);

        setTimeout(() => {
          this.clawDiv.style.transition = 'top 1s';
          this.clawDiv.style.top = this.isMobile ? '175px' : '182px';

          this.clawPole.style.transition = 'height 1s, transform 1s';
          this.clawPole.style.height = this.isMobile ? '60px' : '65px';

          setTimeout(() => {
            if (!this.isHoldingclawPresentDivs.some((item) => item === true)) {
              this.clawDiv.style.backgroundImage = `url(${clawImg})`;
            }
            if (this.clawPresentDiv) {
              const presentType = this.clawPresentDiv.style.backgroundImage;

              if (!presentType.includes('GiftOne')) {
                this.animationInProgress = false;
                this.shouldContinueAutomaticClawMovement = true;
                this.startAutomaticClawMovement();
              }
            } else {
              this.animationInProgress = false;
              this.shouldContinueAutomaticClawMovement = true;
              this.startAutomaticClawMovement();
            }
          }, 400);
        }, 400);
      }, 200);
    }, 1500);
  }
  startAutomaticClawMovement() {
    const clawSpeed = this.isMobile ? 1 : 2; // Adjust the speed as needed
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
      requestAnimationFrame(moveClaw, 50); // Adjust the delay as needed for the desired speed
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

    const clawClose = document.createElement('div');
    clawClose.classList.add('boomio-claw-close');
    clawClose.style.zIndex = 2;
    clawClose.style.backgroundSize = 'contain'; // Adjust as needed
    clawClose.style.width = '52px';
    clawClose.style.height = '50px';
    clawClose.style.backgroundImage = `url(${ClawClose})`; // Use the imported clawImg as the background image
    clawClose.style.top = '0px';
    clawClose.style.right = '5%';
    clawClose.style.cursor = 'pointer';
    clawClose.style.position = 'fixed';
    clawClose.style.border = 'none';

    clawClose.style.zIndex = '9999999'; // Set a higher z-index value
    clawClose.addEventListener('click', () => {
      this.closeGame();
    });

    clawClose.setAttribute('id', 'boomio-claw-close');
    clawMachineContainer.appendChild(clawClose);

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
      presentSpacing = 20;
      minHeight = 77;
      maxHeight = 130;
      leftPosition = 20;
      containerWidth = window.innerWidth - 15;
    } else {
      numberOfPresents = 30;
      presentSpacing = 30;
      minHeight = 149;
      maxHeight = 241;
      leftPosition = 100;
      containerWidth = window.innerWidth - 80;
    }

    const totalPresents = this.isMobile ? 6 : 12;

    const presents = [];
    for (let i = 0; i < totalPresents; i++) {
      presents.push(i < (this.isMobile ? 2 : 4) ? GiftTwo : GiftOne);
    }
    shuffleArray(presents);
    // Create and display the presents
    for (let i = 0; i < totalPresents; i++) {
      const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      const aspectRatio = 504 / 704; // Aspect ratio of the original size (width / height)
      const randomWidth = Math.floor(randomHeight * aspectRatio);

      if (leftPosition + randomWidth < containerWidth) {
        const newClawPresentDiv = document.createElement('div');

        newClawPresentDiv.classList.add('claw-present-div');
        newClawPresentDiv.style.width = `${randomWidth}px`;
        newClawPresentDiv.style.height = `${randomHeight}px`;
        newClawPresentDiv.style.left = `${leftPosition}px`;
        newClawPresentDiv.style.bottom = `2000px`;
        newClawPresentDiv.style.opacity = 0.5;
        const styleBottom = `${
          Math.random() * (this.isMobile ? 5 : 15) + (this.isMobile ? 20 : 35)
        }px`;

        newClawPresentDiv.style.backgroundImage = `url(${presents[i]})`;
        newClawPresentDiv.style.backgroundSize = 'cover';
        if (this.isMobile) {
          if (newClawPresentDiv) {
            newClawPresentDiv.style.zIndex = '9999'; // Set a higher z-index value
            newClawPresentDiv.style.cursor = 'pointer';
            newClawPresentDiv.addEventListener('click', () => {
              this.activateGrabbing();
            });
          } else {
            console.log('newClawPresentDiv not found in the DOM'); // Check if this is logged
          }
        }
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

  closeGame = () => {
    const element = document.getElementById('clawMachine-container');
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  endGame = () => {
    const presentType = this.clawPresentDiv.style.backgroundImage;

    if (!presentType.includes('GiftTwo')) {
      setTimeout(() => {
        const element = document.getElementById('clawMachine-container');
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
          new QrCodeModal();
        }
      }, 1000);
    }
  };
}

export default () => {
  new ClawMachineWidget();
};
