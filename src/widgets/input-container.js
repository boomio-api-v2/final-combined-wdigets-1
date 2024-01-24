class InputContainer {
  constructor() {
    this.gameCount = 0;
  }

  initialize() {
    const inputContainer = document.querySelector('.input-container');
    const controlButton = document.querySelector('.control-button');

    inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    controlButton.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
      inputContainer.style.height = '10px';
      inputContainer.style.top = 'calc(50% + 330px)';
      inputContainer.style.opacity = 0;

      if (this.gameCount === 0) {
        const tutorial = document.querySelector('.tutorial');
        tutorial.style.display = 'block';
      }
    }, 100);

    setTimeout(() => {
      inputContainer.style.display = 'none';
    }, 1000);

    if (this.gameCount === 0) {
      controlButton.style.display = 'none';
      this.index = 0;

      this.clickEventHandler = () => {
        const tutorial = document.querySelector('.tutorial');
        tutorial.style.display = 'none';
        const numbers = document.querySelector('.numbers');
        const new_highscore = document.querySelector('.new_highscore');

        new_highscore.style.display = 'none';

        const new_highscore_stars = document.querySelector('.new_highscore_stars');
        new_highscore_stars.style.display = 'none';

        numbers.style.display = 'none';
        FlappyBirdInstance.gamePlaying = true; // Assuming FlappyBirdInstance is an instance of FlappyBird class
        document.getElementById('background_blur').style.display = 'none';
        const canvas = document.getElementById('flappy-canvas');
        canvas.style.transition = 'filter 1s ease';
        canvas.style.filter = 'none';

        controlButton.style.opacity = 0;

        setTimeout(() => {
          canvas.onclick = () => {
            FlappyBirdInstance.flight = FlappyBirdInstance.jump;
            FlappyBirdInstance.isJumping = true;
            FlappyBirdInstance.gameStarted = true;
            setTimeout(() => {
              FlappyBirdInstance.isJumping = false;
            }, 300);
          };
        }, 50);
      };

      document.getElementById('flappy-canvas').addEventListener('click', this.clickEventHandler);
    }
    this.gameCount++;
  }
}
