import { widgetHtmlService, QrCodeModal, localStorageService } from '@/services';
import './styles.css';

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
    this.moveDivWithArrows();
    this.setupClickHandler();
    this.setupSwipeHandler();
    this.animationInProgress = false; // Use a separate flag for animation

    // Store an array of grabbable present divs
    this.clawPresentDivs = document.querySelectorAll('.claw-present-div');

    // Initialize flags for each present div
    this.isHoldingclawPresentDivs = Array(this.clawPresentDivs.length).fill(false);
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
    const presentSpacing = 30; // Adjust as needed
    const presentWidth = 50; // Adjust as needed
    function isMobile() {
      const mobileThreshold = 768; // You can adjust this threshold as needed

      return window.innerWidth <= mobileThreshold;
    }

    let numberOfPresents;
    let presentColors;

    if (isMobile()) {
      numberOfPresents = 3;
      presentColors = ['black', 'black', 'purple'];
    } else {
      numberOfPresents = 4;
      presentColors = ['black', 'black', 'black', 'purple'];
    }

    for (let i = presentColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [presentColors[i], presentColors[j]] = [presentColors[j], presentColors[i]];
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
        clawPresentDiv.style.backgroundColor = presentColors[i];

        clawLineDiv.appendChild(clawPresentDiv);
      }
    }

    // Create the existing Claw div
    const clawDiv = document.createElement('div');
    clawDiv.classList.add('claw-div');

    clawDiv.style.transform = 'translateY(-100px)';
    clawDiv.style.transition = 'transform 1s ease-in-out'; // Add a smooth transition effect for transform

    clawMachineContainer.appendChild(clawDiv);

    const chainDiv = document.createElement('div');
    chainDiv.classList.add('chain-div');

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

  moveDivWithArrows() {
    if (this.animationInProgress) {
      console.log('return');
      return;
    }
    // Add event listener for keydown events
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.clawDivPosition.left -= 10; // Move left
          break;
        case 'ArrowRight':
          this.clawDivPosition.left += 10; // Move right
          break;
      }

      // Calculate the maximum positions to stay within the viewport
      const maxX = window.innerWidth - this.clawDiv.clientWidth;
      const maxY = window.innerHeight - this.clawDiv.clientHeight;

      // Ensure the claw-div stays within the screen boundaries
      this.clawDivPosition.left = Math.min(Math.max(this.clawDivPosition.left, 0), maxX);

      // Update the position of the .claw-div
      this.clawDiv.style.left = `${this.clawDivPosition.left}px`;

      // Update the position of the .chain-div to move together with the claw-div
      const chainDivLeft = this.clawDivPosition.left + this.clawDiv.clientWidth / 2; // Adjust as needed
      this.chainDiv.style.left = `${chainDivLeft}px`;
    });
  }

  setupClickHandler() {
    console.log('click');
    const startAnimation = () => {
      if (this.animationInProgress || this.isHoldingclawPresentDivs.some((held) => held)) {
        console.log('return');
        return;
      }
      this.animationInProgress = true;
      setTimeout(() => {
        this.animationInProgress = false;
        this.clawDiv.style.pointerEvents = 'auto';
      }, 2000);
      this.clawDiv.style.pointerEvents = 'none';

      // Move the Claw div down
      this.clawDiv.style.transition = 'top 1s';
      function isMobile() {
        const mobileThreshold = 768; // You can adjust this threshold as needed

        return window.innerWidth <= mobileThreshold;
      }

      this.clawDiv.style.top = `calc(100vh - ${isMobile() ? '60px' : '110px'})`;

      // Extend the chain-div height and transform it down as the Claw div goes down
      this.chainDiv.style.transition = 'height 1s, transform 1s'; // Add transitions for height and transform change
      this.chainDiv.style.height = `calc(100vh - ${isMobile() ? '60px' : '110px'})`;

      // Delay the collision detection until after the animation
      console.log('2', this.animationInProgress);

      setTimeout(() => {
        this.clawPresentDivs.forEach((clawPresentDiv, index) => {
          const clawDivRect = this.clawDiv.getBoundingClientRect();
          const clawPresentDivRect = clawPresentDiv.getBoundingClientRect();

          if (
            clawDivRect.left < clawPresentDivRect.right &&
            clawDivRect.right > clawPresentDivRect.left &&
            clawDivRect.top < clawPresentDivRect.bottom &&
            clawDivRect.bottom > clawPresentDivRect.top
          ) {
            console.log(`Collision detected with Present Div ${index}`);

            // Check if the present div is already being held
            if (!this.isHoldingclawPresentDivs[index]) {
              // The Claw div is touching the claw Present Div
              if (this.clawDiv.contains(clawPresentDiv)) {
                this.clawDiv.removeChild(clawPresentDiv);
              }
              this.isHoldingclawPresentDivs[index] = true;

              // Adjust the styles for the claw Present Div
              clawPresentDiv.style.transition = 'top 0s';
              clawPresentDiv.style.top = '10px';
              clawPresentDiv.style.left = '10px';
              this.clawDiv.appendChild(clawPresentDiv);

              // Add a timeout for the game timer for this present div
              this.gameTimer = setTimeout(() => {
                const presentColor = clawPresentDiv.style.backgroundColor;
                if (presentColor === 'black') {
                  setTimeout(() => {
                    this.clawDiv.removeChild(clawPresentDiv);
                    this.isHoldingclawPresentDivs[index] = false;
                  }, 1000);
                } else {
                  this.endGame(index);
                }
              }, 1000);
            }
          }
        });

        setTimeout(() => {
          this.clawDiv.style.transition = 'top 1s';
          this.clawDiv.style.top = '50px';

          // Shrink the chain-div height and transform it up as the Claw div goes back up
          this.chainDiv.style.transition = 'height 1s, transform 1s'; // Add transitions for height and transform change
          this.chainDiv.style.height = '50px';
          this.chainDiv.style.transform = 'translateY(0)'; // Reset the chain-div's vertical position

          // Reset the global flag to allow the next animation
        }, 600); // Delay for 1 second
      }, 1000); // Delay for 1 second
    };

    // Add the click event listener initially

    this.clawDiv.addEventListener('click', startAnimation);
  }

  endGame = () => {
    setTimeout(() => {
      const element = document.getElementById('clawMachine-container');
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
        new QrCodeModal();
      }
    }, 700);
  };

  setupSwipeHandler() {
    if (this.animationInProgress) {
      console.log('return');
      return;
    }
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const startDrag = (clientX) => {
      isDragging = true;
      startX = clientX;
      currentX = clientX;
    };

    const moveDrag = (clientX) => {
      if (!isDragging) return;

      const deltaX = clientX - currentX;
      currentX = clientX;

      const maxX = window.innerWidth - this.clawDiv.clientWidth;

      // Calculate the new position while keeping it within screen boundaries
      this.clawDivPosition.left += deltaX;
      this.clawDivPosition.left = Math.min(Math.max(this.clawDivPosition.left, 0), maxX);

      // Update the position of the .claw-div
      this.clawDiv.style.transition = 'left 0s'; // Disable vertical transition during dragging
      this.clawDiv.style.left = `${this.clawDivPosition.left}px`;

      // Update the position of the .chain-div to move together with the claw-div
      const chainDivLeft = this.clawDivPosition.left + this.clawDiv.clientWidth / 2; // Adjust as needed
      this.chainDiv.style.left = `${chainDivLeft}px`;
    };

    const endDrag = () => {
      if (isDragging) {
        isDragging = false;
        this.clawDiv.style.transition = 'left 1s'; // Add transition when releasing
      }
    };

    this.clawDiv.addEventListener('mousedown', (e) => startDrag(e.clientX));
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    document.addEventListener('mouseup', () => endDrag());

    this.clawDiv.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    document.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    document.addEventListener('touchend', () => endDrag());
  }
}

export default () => {
  new ClawMachineWidget();
};
