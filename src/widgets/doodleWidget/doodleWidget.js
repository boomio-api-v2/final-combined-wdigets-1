import {
  widgetHtmlService,
  QrCodeModal,
  AnimationService,
  boomioService,
  localStorageService,
} from '@/services';
import './styles.css';
import {
  scoreImage,
  couponBackground,
  intro,
  howToPlay,
  backgroundRed,
  mainImage,
  useButton,
  checkIcon,
  uncheckIcon,
} from './constants';
import { InputRegisterContainer } from '../helpers/InputRegisterContainer';
import { InputContainer } from '../helpers/InputContainer';
import { GameOverContainer } from '../helpers/GameOverContainer';
import { CompetitionScoreTableContainer } from '../helpers/CompetitionScoreTableContainer';

class DoodleWidget {
  static ctx;

  constructor() {
    this.config = localStorageService.getDefaultConfig();
    this.checkboxChange = true;

    this.isMobile = window.innerWidth <= 1280;
    this.customer = this.config.business_name ? this.config.business_name : 'Barbora';
    this.showCompetitiveRegistration = this.config.game_type ?? 'competitive';
    this.userBestPlace = 0;
    this.scoreTable = {};
    this.scoreTableContainerInstance;

    this.createContainer();
    this.platformCount = 10; // Define platformCount here
    this.width = document.body.offsetWidth < 418 ? document.body.offsetWidth : 418;
    this.height = 668;
    this.player;
    this.tutorial = true;
    this.image = new Image();
    this.image.src = mainImage;
    this.image.onload = () => {
      this.startDoodle();
    };
  }

  startDoodle() {
    // RequestAnimFrame: a browser API for getting smooth animations
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 10);
        }
      );
    })();

    document.querySelector('.game-container').style.backgroundColor =
      window.innerWidth <= 768 ? 'black' : 'none';

    this.config = localStorageService.getDefaultConfig();

    this.createHandlers();

    this.doodle = document.getElementById('boomio-doodle-container');
    const canvas = document.getElementById('boomio-doodle-canvas');
    canvas.style.background = `url(${backgroundRed}) center`;

    // Updated here

    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }

    DoodleWidget.ctx = canvas.getContext('2d');

    this.animation = new AnimationService({
      elem: this.doodle,
      posx: 0,
      posy: 0,
    });

    DoodleWidget.ctx.canvas.width = this.width; // Update here
    DoodleWidget.ctx.canvas.height = this.height; // Update here
    DoodleWidget.broken = 0;
    DoodleWidget.position = 0;

    //Variables for game
    this.platforms = [];
    this.player;
    this.animloop;
    this.flag = 0;
    this.menuloop;
    this.dir;
    this.currentScore = 0;
    this.bestScore = 0;
    this.discount = '0%';
    this.newHighScoreReached = false;
    this.firstRun = true;
    this.gravity = 0.1;
    this.gameCount = 0;

    setTimeout(() => {
      document.getElementById('background_intro').style.transition = 'opacity 1s ease';
      document.getElementById('background_intro').style.opacity = 0;
      if (this.gameCount === 0) {
        document.getElementById('background_blur').style.display = 'block';
        document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
      }
      this.showRulesOrRegistration();

      setTimeout(() => {
        document.getElementById('background_intro').style.display = 'none';
      }, 2000);
    }, 3000); //intro speed
  }

  createHandlers = () => {
    const restart = document.getElementById('startButtonClick1');
    restart.addEventListener('click', this.resetGame);

    const start = document.getElementById('control-button');
    start.addEventListener('click', this.initGame);

    const reward = document.getElementById('claimReward');
    reward.addEventListener('click', this.claimReward);

    if (this.showCompetitiveRegistration) {
      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', this.clickEventHandlerShowRules);

      const competitionRestart = document.getElementById('boomio-competition-play-again');
      competitionRestart.addEventListener('click', this.resetGame);
    }
  };

  showRulesOrRegistration = () => {
    if (this.showCompetitiveRegistration) {
      const checkboxImg = document.querySelector('.boomio-privacyCheckbox');
      checkboxImg.addEventListener('click', () => {
        this.checkboxChange = !this.checkboxChange;
        const checkboxImgChange = document.getElementById('privacyCheckboxImg');
        checkboxImgChange.src = this.checkboxChange ? checkIcon : uncheckIcon;
      });

      const emailInput = document.querySelector('.boomio-competition-email-input-field');
      const playerNameInput = document.querySelector('.boomio-competition-name-input-field');
      emailInput.addEventListener('input', () => {});
      playerNameInput.addEventListener('input', () => {});

      setTimeout(() => {
        const canvas = document.getElementById('boomio-doodle-canvas');
        document.getElementById('background_blur').style.opacity = 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'blur(2px)';

        const inpuRegisterContainer = document.querySelector('.input-register-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inpuRegisterContainer.style.display = 'block';
        setTimeout(() => {
          inpuRegisterContainer.style.height = '528px';
          inpuRegisterContainer.style.top = 'calc(50% + 74px)';
          inpuRegisterContainer.style.opacity = 1;
        }, 100);
      }, 300);
    } else {
      setTimeout(() => {
        const canvas = document.getElementById('boomio-doodle-canvas');
        document.getElementById('background_blur').style.opacity = 0.37;
        canvas.style.transition = 'filter 0.6s ease';
        canvas.style.filter = 'blur(2px)';
        const inputContainer = document.querySelector('.input-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inputContainer.style.display = 'block';
        setTimeout(() => {
          inputContainer.style.height = '332px';
          inputContainer.style.top = 'calc(50% + 170px)';
          inputContainer.style.opacity = 1;
        }, 100);
      }, 300);
    }
  };

  initGame = () => {
    this.removeRules();
    if (!this.tutorial || !this.isMobile) {
      setTimeout(() => {
        if (this.showCompetitiveRegistration) {
          boomioService
            .signal('ROUND_STARTED', 'signal')
            .then((response) => {})
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }, 50);
      this.player = new Player(this.image);
      this.hideMenu();
      this.resetGame();
      this.gameLoop();
      this.Spring = new Spring(this.image);
    } else {
      this.showTutorialArrows();
    }
  };

  showTutorialArrows = () => {
    if (this.tutorial) {
      document.getElementById('tutorialArrows').style.transition = 'opacity 1s ease';
      document.getElementById('tutorialArrows').style.opacity = 1;
      document.getElementById('tutorialArrows').style.display = 'block';
      this.tutorial = false;
      setTimeout(() => {
        const canvas = document.getElementById('boomio-doodle-canvas');
        canvas.addEventListener('click', this.removeTutorialArrows);
      }, 100);
    }
  };

  removeTutorialArrows = () => {
    const canvas = document.getElementById('boomio-doodle-canvas');
    canvas.removeEventListener('click', this.removeTutorialArrows);

    document.getElementById('tutorialArrows').style.transition = 'opacity 1s ease';
    document.getElementById('tutorialArrows').style.opacity = 0;
    document.getElementById('tutorialArrows').style.display = 'none';

    setTimeout(() => {
      this.initGame();
    }, 100);
  };

  claimReward = () => {
    const inputContainer = document.querySelector('.input-container1');
    inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      inputContainer.style.height = '10px';
      inputContainer.style.top = 'calc(50% + 330px)';
      inputContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      inputContainer.style.display = 'none';
    }, 400);

    setTimeout(() => {
      document.getElementById('useCuponImage').style.display = 'block';
      document.getElementById('background_blur').style.transition = 'opacity 1s ease';
      document.getElementById('ending_background').style.display = 'block';

      setTimeout(() => {
        document.getElementById('background_blur').style.opacity = 0;
        document.getElementById('ending_background').style.transition = 'opacity 1s ease';
        document.getElementById('ending_background').style.opacity = 1;
      }, 100);

      this.gameEnded = true;
      setTimeout(() => {
        new QrCodeModal(true, this.discount);
      }, 200);
    }, 500);
  };

  removeRules = () => {
    const inputContainer = document.querySelector('.input-container');
    const controlButton = document.querySelector('.control-button');

    inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    controlButton.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
      inputContainer.style.height = '10px';
      inputContainer.style.top = 'calc(50% + 330px)';
      inputContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      inputContainer.style.display = 'none';
    }, 1000);

    if (this.gameCount === 0) {
      const controlButton = document.querySelector('.control-button');
      controlButton.style.display = 'none';
      this.index = 0;
    }
  };

  resetGame = () => {
    this.gameCount++;
    this.index = 0;
    this.currentScore = 0;

    if (this.showCompetitiveRegistration) {
      const competitionTableContainer = document.querySelector('.competition-table-container');
      competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      setTimeout(() => {
        competitionTableContainer.style.height = '10px';
        competitionTableContainer.style.top = 'calc(50% + 330px)';
        competitionTableContainer.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        competitionTableContainer.style.display = 'none';
      }, 1000);
    } else {
      const inputContainer = document.querySelector('.input-container1');

      inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      setTimeout(() => {
        inputContainer.style.height = '10px';
        inputContainer.style.top = 'calc(50% + 330px)';
        inputContainer.style.opacity = 0;
      }, 100);
      setTimeout(() => {
        inputContainer.style.display = 'none';
      }, 1000);
    }

    setTimeout(() => {
      document.getElementById('background_blur').style.display = 'none';
      const canvas = document.getElementById('boomio-doodle-canvas');
      canvas.style.transition = 'filter 1s ease';
      canvas.style.filter = 'none';
      this.gamePlaying = true;
    }, 400);

    this.hideGoMenu();
    this.player.isDead = false;
    this.flag = 0;
    DoodleWidget.position = 0;
    this.currentScore = 0;

    this.base = new Base(this.image);
    this.player = new Player(this.image);

    this.platform_broken_substitute = new Platform_broken_substitute(this.image);

    this.platforms = [];
    for (let i = 0; i < this.platformCount; i++) {
      this.platforms.push(new Platform(this.image, this.currentScore));
    }
    this.Spring = new Spring(this.image);
  };

  updateScore = () => {
    document.getElementById('bestScoreField').textContent = this.currentScore;
    document.getElementById('currentScoreField').textContent = this.bestScore;
    document.getElementById('bestScoreFieldConverted').textContent =
      this.config.discountType !== 'percentage'
        ? this.bestScore / 100 + '€'
        : this.bestScore > 5000
        ? '30%'
        : this.bestScore > 3000
        ? '20%'
        : this.bestScore > 1000
        ? '10%'
        : this.bestScore > 1
        ? '5%'
        : this.bestScore;

    this.discount =
      this.config.discountType !== 'percentage'
        ? this.bestScore / 100 + '€'
        : this.bestScore > 5000
        ? '30%'
        : this.bestScore > 3000
        ? '20%'
        : this.bestScore > 1000
        ? '10%'
        : this.bestScore > 1
        ? '5%'
        : this.bestScore;
  };
  hideMenu = () => {
    // var menu = document.getElementById('boomio-doodle-mainMenu');
    // menu.style.zIndex = -1;
  };
  showGoMenu = () => {
    if (this.newHighScoreReached) {
      const numbers = document.querySelector('.numbers');
      const new_highscore = document.querySelector('.new_highscore');
      const new_highscore_stars = document.querySelector('.new_highscore_stars');
      new_highscore_stars.style.display = 'block';

      new_highscore.style.display = 'block';
      numbers.style.display = 'block';

      setTimeout(() => {
        new_highscore.style.opacity = 1;
        new_highscore_stars.style.opacity = 1;

        numbers.style.opacity = 1;
      }, 200);

      const scoreDigits = document.querySelectorAll('.numbers__window__digit');

      // Update the score digits content
      const scoreString = this.currentScore.toString();

      // Determine the number of leading zeros to hide
      let leadingZeros = 0;
      while (leadingZeros < scoreString.length && scoreString[leadingZeros] === '0') {
        leadingZeros++;
      }

      // Hide all digits initially
      scoreDigits.forEach((digit) => {
        digit.style.display = 'none';
      });

      // Display each digit individually, starting from the first non-zero digit
      for (let i = leadingZeros; i < scoreString.length; i++) {
        scoreDigits[i - leadingZeros].textContent = scoreString[i];
        scoreDigits[i - leadingZeros].style.display = 'block';
        scoreDigits[i - leadingZeros].classList.add('boomio-counting-animation');
      }

      // Remove the counting class after a short delay
      setTimeout(() => {
        setTimeout(() => {
          this.newHighScoreReached = false;
        }, 2000);
        scoreDigits.forEach((digit) => {
          digit.classList.remove('boomio-counting-animation');
        });
      }, 1000);
    }

    setTimeout(
      () => {
        if (this.showCompetitiveRegistration) {
          boomioService
            .signal('ROUND_FINISHED', 'signal', {
              score: this.currentScore,
            })
            .then((response) => {
              this.userBestPlace = response.user_best_place;

              this.scoreTable = response;

              this.scoreTableContainerInstance.updateProps(this.customer, this.scoreTable);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        if (this.showCompetitiveRegistration) {
          const competitionTableContainer = document.querySelector('.competition-table-container');
          const canvas = document.getElementById('boomio-doodle-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'blur(2px)';
          document.getElementById('background_blur').style.display = 'block';
          competitionTableContainer.style.transition =
            'height 1s ease, top 1s ease, opacity 1s ease';
          competitionTableContainer.style.display = 'block';
          setTimeout(() => {
            competitionTableContainer.style.height = '680px';
            competitionTableContainer.style.top = 'calc(50%)';
            competitionTableContainer.style.opacity = 1;
          }, 100);
        } else {
          const inputContainer = document.querySelector('.input-container1');
          const canvas = document.getElementById('boomio-doodle-canvas');
          canvas.style.transition = 'filter 0.6s ease';
          canvas.style.filter = 'blur(2px)';
          document.getElementById('background_blur').style.display = 'block';
          inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          inputContainer.style.display = 'block';
          setTimeout(() => {
            inputContainer.style.height = '332px';
            inputContainer.style.top = 'calc(50% + 170px)';
            inputContainer.style.opacity = 1;
          }, 100);
        }
        const currectScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
        this.hideScore();
        currectScoreDiv.style.opacity = 0;
        setTimeout(() => {
          currectScoreDiv.style.display = 'none';
        }, 300);
      },

      this.newHighScoreReached ? 2500 : 100,
    );
  };
  gameOver = () => {
    this.platforms.forEach((p, i) => {
      p.y -= 12;
    });

    if (this.player.y > this.height / 2 && this.flag === 0) {
      this.player.y -= 8;
      this.player.vy = 0;
    } else if (this.player.y < this.height / 2) this.flag = 1;
    else if (this.player.y + this.player.height > this.height) {
      this.showGoMenu();

      this.player.isDead = 'lol';
    }
  };

  hideScore = () => {
    const new_highscore = document.querySelector('.new_highscore');
    const new_highscore_stars = document.querySelector('.new_highscore_stars');
    const numbers = document.querySelector('.numbers');

    numbers.style.transition = 'opacity 0.5s ease';
    numbers.style.opacity = 0;
    new_highscore.style.transition = 'opacity 0.5s ease';
    new_highscore.style.opacity = 0;
    new_highscore_stars.style.transition = 'opacity 0.5s ease';
    new_highscore_stars.style.opacity = 0;

    setTimeout(() => {
      new_highscore.style.display = 'none';
      new_highscore_stars.style.display = 'none';
      numbers.style.display = 'none';
    }, 500);
  };

  hideGoMenu = () => {
    // var menu = document.getElementById('boomio-doodle-gameOverMenu');
    // menu.style.zIndex = -1;
    // menu.style.visibility = 'hidden';
  };

  paintCanvas = () => {
    const canvas = document.getElementById('boomio-doodle-canvas'); // Updated here
    DoodleWidget.ctx = canvas.getContext('2d');
  };

  gameLoop = () => {
    this.update();

    setTimeout(() => {
      requestAnimationFrame(this.gameLoop);
    }, 1000 / 120);
  };
  collides = () => {
    this.platforms.forEach((p, i) => {
      if (
        this.player.vy > 0 &&
        p.state === 0 &&
        this.player.x + 15 < p.x + p.width &&
        this.player.x + this.player.width - 15 > p.x &&
        this.player.y + this.player.height > p.y &&
        this.player.y + this.player.height < p.y + p.height
      ) {
        if (p.type == 3 && p.flag === 0) {
          p.flag = 1;
          this.jumpCount = 0;
          return;
        } else if (p.type == 4 && p.state === 0) {
          this.player.jump();
          p.state = 1;
        } else if (p.flag == 1) return;
        else {
          this.player.jump();
        }
      }
    });

    //Springs
    var s = this.Spring;
    if (
      this.player.vy > 0 &&
      s.state === 0 &&
      this.player.x + 15 < s.x + s.width &&
      this.player.x + this.player.width - 15 > s.x &&
      this.player.y + this.player.height > s.y &&
      this.player.y + this.player.height < s.y + s.height
    ) {
      s.state = 1;
      this.player.jumpHigh();
    }
  };

  platformCalc = () => {
    var subs = this.platform_broken_substitute;

    this.platforms.forEach((p, i) => {
      if (p.type == 2) {
        if (p.x < 0 || p.x + p.width > this.width) p.vx *= -1;

        p.x += p.vx;
      }

      if (p.flag == 1 && subs.appearance === false && this.jumpCount === 0) {
        subs.x = p.x;
        subs.y = p.y;
        subs.appearance = true;

        this.jumpCount++;
      }

      p.draw();
    });

    if (subs.appearance === true) {
      subs.draw();
      subs.y += 8;
    }

    if (subs.y > this.height) subs.appearance = false;
  };

  springCalc = () => {
    var s = this.Spring;
    var p = this.platforms[0];
    if (p.type == 1 || p.type == 2) {
      s.x = p.x + p.width / 2 - s.width / 2;
      s.y = p.y - p.height - 10;
      if (s.y > this.height / 1.1) s.state = 0;
      s.draw(this.image);
    } else {
      s.x = 0 - s.width;
      s.y = 0 - s.height;
    }
  };

  playerCalc = () => {
    if (this.dir == 'left') {
      this.player.dir = 'left';
      if (this.player.vy < -7 && this.player.vy > -15) this.player.dir = 'left_land';
    } else if (this.dir == 'right') {
      this.player.dir = 'right';
      if (this.player.vy < -7 && this.player.vy > -15) this.player.dir = 'right_land';
    }

    //Adding keyboard controls
    document.onkeydown = (e) => {
      var key = e.keyCode;

      if (key == 37) {
        this.dir = 'left';
        this.player.isMovingLeft = true;
      } else if (key == 39) {
        this.dir = 'right';
        this.player.isMovingRight = true;
      }

      // if (key == 32) {
      //   this.resetGame();
      // }
    };

    document.onkeyup = (e) => {
      var key = e.keyCode;
      if (key == 37) {
        this.dir = 'left';
        this.player.isMovingLeft = false;
      } else if (key == 39) {
        this.dir = 'right';
        this.player.isMovingRight = false;
      }
    };
    if (this.isMobile) {
      document.addEventListener('touchstart', (e) => {
        const touchX = e.touches[0].clientX;
        const screenWidth = window.innerWidth;
        // Adjust the sensitivity value based on your needs
        const sensitivity = 0.1;

        if (touchX < screenWidth / 2) {
          // Left side of the screen is touched
          this.dir = 'left';
          this.player.isMovingLeft = true;
          this.player.isMovingRight = false;
        } else {
          // Right side of the screen is touched
          this.dir = 'right';
          this.player.isMovingLeft = false;
          this.player.isMovingRight = true;
        }
      });

      document.addEventListener('touchend', () => {
        // Reset direction when touch is released
        this.dir = '';
        this.player.isMovingLeft = false;
        this.player.isMovingRight = false;
      });
    }
    this.speed = 0.16;
    if (this.currentScore >= 5000) {
      this.speed = 0.4;
    } else if (this.currentScore >= 1500 && this.currentScore < 5000) {
      this.speed = 0.35;
    } else if (this.currentScore >= 700 && this.currentScore < 1500) {
      this.speed = 0.3;
    } else if (this.currentScore >= 500 && this.currentScore < 700) {
      this.speed = 0.2;
    } else if (this.currentScore >= 100 && this.currentScore < 500) this.speed = 0.16;
    //Accelerations produces when the user hold the keys
    if (this.player.isMovingLeft === true) {
      this.player.x += this.player.vx;
      this.player.vx -= this.speed;
    } else {
      this.player.x += this.player.vx;
      if (this.player.vx < 0) this.player.vx += this.speed;
    }

    if (this.player.isMovingRight === true) {
      this.player.x += this.player.vx;
      this.player.vx += this.speed;
    } else {
      this.player.x += this.player.vx;
      if (this.player.vx > 0) this.player.vx -= this.speed;
    }

    // Speed limits!

    if (this.currentScore >= 5000) {
      if (this.player.vx > 7) this.player.vx = 7;
      else if (this.player.vx < -7) this.player.vx = -7;
    } else if (this.currentScore >= 1500 && this.currentScore < 5000) {
      if (this.player.vx > 6) this.player.vx = 6;
      else if (this.player.vx < -6) this.player.vx = -6;
    } else if (this.currentScore >= 700 && this.currentScore < 1500) {
      if (this.player.vx > 5) this.player.vx = 5;
      else if (this.player.vx < -5) this.player.vx = -5;
    } else if (this.currentScore >= 500 && this.currentScore < 700) {
      if (this.player.vx > 4) this.player.vx = 4;
      else if (this.player.vx < -4) this.player.vx = -4;
    } else if (this.currentScore >= 100 && this.currentScore < 500) {
      if (this.player.vx > 3) this.player.vx = 3;
      else if (this.player.vx < -3) this.player.vx = -3;
    }
    console;
    //Jump the player when it hits the base
    if (this.player.y + this.player.height > this.base.y && this.base.y < this.height)
      this.player.jump();

    //Gameover if it hits the bottom
    if (
      this.base.y > this.height &&
      this.player.y + this.player.height > this.height &&
      this.player.isDead != 'lol'
    )
      this.player.isDead = true;

    //Make the player move through walls
    if (this.player.x > this.width) this.player.x = 0 - this.player.width;
    else if (this.player.x < 0 - this.player.width) this.player.x = this.width;

    //Movement of player affected by gravity
    if (this.player.y >= this.height / 2 - this.player.height / 2) {
      this.player.y += this.player.vy;

      this.player.vy += this.gravity;
    }

    //When the player reaches half height, move the platforms to create the illusion of scrolling and recreate the platforms that are out of viewport...
    else {
      this.platforms.forEach((p, i) => {
        if (this.player.vy < 0) {
          p.y -= this.player.vy;
        }

        if (p.y > this.height) {
          this.platforms[i] = new Platform(this.image, this.currentScore);
          this.platforms[i].y = p.y - this.height;
        }
      });

      this.base.y -= this.player.vy;
      this.player.vy += this.gravity;

      if (this.player.vy >= 0) {
        this.player.y += this.player.vy;
        this.player.vy += this.gravity;
      }

      this.currentScore++;
      document.getElementById('currentScore').innerHTML = `${this.currentScore}`;

      if (this.currentScore > 1) {
        const currectScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
        currectScoreDiv.style.transition = 'opacity 0.8s ease';
        currectScoreDiv.style.display = 'block';
        currectScoreDiv.style.opacity = 1;
      }

      if (this.bestScore < this.currentScore) {
        this.newHighScoreReached = true;
      }
      this.bestScore = Math.max(this.bestScore, this.currentScore);
    }

    this.collides();

    if (this.player.isDead === true) this.gameOver();
  };

  playerJump = () => {
    this.player.y += this.player.vy;
    this.player.vy += this.gravity;

    if (
      this.player.vy > 0 &&
      this.player.x + 15 < 260 &&
      this.player.x + this.player.width - 15 > 155 &&
      this.player.y + this.player.height > 475 &&
      this.player.y + this.player.height < 500
    )
      this.player.jump();

    if (this.dir == 'left') {
      this.player.dir = 'left';
      if (this.player.vy < -7 && this.player.vy > -15) this.player.dir = 'left_land';
    } else if (this.dir == 'right') {
      this.player.dir = 'right';
      if (this.player.vy < -7 && this.player.vy > -15) this.player.dir = 'right_land';
    }

    document.onkeydown = (e) => {
      var key = e.keyCode;

      if (key == 37) {
        this.dir = 'left';
        this.player.isMovingLeft = true;
      } else if (key == 39) {
        this.dir = 'right';
        this.player.isMovingRight = true;
      }
    };

    document.onkeyup = (e) => {
      var key = e.keyCode;

      if (key == 37) {
        this.dir = 'left';
        this.player.isMovingLeft = false;
      } else if (key == 39) {
        this.dir = 'right';
        this.player.isMovingRight = false;
      }
    };

    if (this.isMobile) {
      document.addEventListener('click', (e) => {
        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        // Adjust the sensitivity value based on your needs
        const sensitivity = 0.1;

        if (clickX < screenWidth / 2) {
          // Left side of the screen is clicked
          this.dir = 'left';
          this.player.isMovingLeft = true;
          this.player.isMovingRight = false;
        } else {
          // Right side of the screen is clicked
          this.dir = 'right';
          this.player.isMovingLeft = false;
          this.player.isMovingRight = true;
        }
      });

      // Add event listener for releasing the click
      document.addEventListener('mouseup', () => {
        // Reset direction when click is released
        this.dir = '';
        this.player.isMovingLeft = false;
        this.player.isMovingRight = false;
      });
    }

    //Accelerations produces when the user hold the keys
    if (this.player.isMovingLeft === true) {
      this.player.x += this.player.vx;
      this.player.vx -= 0.3;
    } else {
      this.player.x += this.player.vx;
      if (this.player.vx < 0) this.player.vx += 0.2;
    }

    if (this.player.isMovingRight === true) {
      this.player.x += this.player.vx;
      this.player.vx += 0.3;
    } else {
      this.player.x += this.player.vx;
      if (this.player.vx > 0) this.player.vx -= 0.2;
    }

    //Jump the player when it hits the base
    if (this.player.y + this.player.height > this.base.y && this.base.y < this.height)
      this.player.jump();

    //Make the player move through walls
    if (this.player.x > this.width) this.player.x = 0 - this.player.width;
    else if (this.player.x < 0 - this.player.width) this.player.x = width;

    this.player.draw();
  };

  update = () => {
    DoodleWidget.ctx.clearRect(0, 0, this.width, this.height);
    this.paintCanvas();
    this.base.draw();
    this.playerCalc();
    this.updateScore();
    this.platformCalc();
    this.springCalc();

    this.player.draw();
  };

  createContainer = () => {
    const blurImage = new Image();
    blurImage.src = 'https://i.ibb.co/wrHgcn1/Blur-game-rules.png';
    const newHighscoreImage = new Image();
    newHighscoreImage.src = 'https://i.ibb.co/fdFppDg/New-best-score.png';
    const playAgain = new Image();
    playAgain.src = 'https://i.ibb.co/0Bqvttk/PLAY-AGAIN.png';

    const okImage = new Image();
    okImage.src = 'https://i.ibb.co/nL70YWF/OK.png';

    const newHighscoreStarsImage = new Image();
    newHighscoreStarsImage.src = 'https://i.ibb.co/P43Lwwz/New-demo-best-score.gif';

    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-doodle-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `
    <div class="game-container" id="game-container">

    ${
      this.showCompetitiveRegistration
        ? new InputRegisterContainer(this.customer).createInputRegisterContainer().outerHTML
        : ''
    }

		<canvas id="boomio-doodle-canvas" class="boomio-doodle-canvas" style="${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }">
		</canvas>

    <img src=${howToPlay} alt="Image Description" style="z-index:4;width:${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:none;opacity:0" id="tutorialArrows">


    <img src=${intro} alt="Image Description" style="z-index:4;width:${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 674px;position:absolute;pointer-events: none; display:block;" id="background_intro">

    <img src=${blurImage.src} alt="Image Description" style="z-index:1;width: ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    }; height: 668px;position:absolute;opacity:0;pointer-events: none; display:none;" id="background_blur">


    <img src=${couponBackground} alt="Image Description" style="z-index:1;width:    ${
      document.body.offsetWidth < 418 ? document.body.offsetWidth + 'px' : '418px'
    };
    ; height: 670px;position:absolute;opacity:0; pointer-events: none; display:none;" id="ending_background">
      </img>

    <a href="https://www.barbora.lt/" style="position:absolute;margin-top:380px;margin-left:-340px">
    <img src="${useButton}" alt="Image Description" style="z-index:4;width: 335px;max-width:335px; height: 86px; position:absolute; display:none; " id="useCuponImage">
  </a>



    <img class="new_highscore_stars" src=${
      newHighscoreStarsImage.src
    } alt="Image Description" style="overflow: hidden;z-index:4;margin-top:-300px;display:none; height: 95px;position:absolute;pointer-events:none;" >
    </img>
    <div class="new_highscore"><img src=${
      newHighscoreImage.src
    } alt="Image Description" style="width: 100%; height: 100%;">
    </div>


    ${new InputContainer(this.customer, 'doodle').createInputContainerDiv().outerHTML}


    <div class="numbers">
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--1" data-fake="8642519073" id="bestScore1"></span>
  </span>
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--2" data-fake="5207186394" id="bestScore2"></span>
  </span>
  <span class="numbers__window">
      <span class="numbers__window__digit numbers__window__digit--3" data-fake="8395216407" id="bestScore3"></span>
  </span>
  <span class="numbers__window">
  <span class="numbers__window__digit numbers__window__digit--4" data-fake="8395216407" id="bestScore4"></span>
</span>
<span class="numbers__window">
<span class="numbers__window__digit numbers__window__digit--5" data-fake="8395216407" id="bestScore5"></span>
</span>
</div>


          <div class="boomio-score-input-container" style="display:none;width:148px;height;left:calc(50% - 110px);top:calc(50% - 270px);">
          <div style="width: 100%; height: 100%; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex;">
        <img src=${scoreImage} alt="Image Description" style="width: 100%; height: 100%;"></img>
        <div style="text-align: center; color: white; font-size: 20px; font-family: Poppins; font-weight: 900; word-wrap: break-word;position:absolute;left:85px;top:10px;z-index:3;line-height:30px;" id="currentScore"></div>
</div></div>


${new GameOverContainer().createGameOverContainerDiv().outerHTML}




	</div>
    `;
    widgetHtmlService.container.appendChild(myCanvas);

    if (this.showCompetitiveRegistration) {
      const gameContainer = document.querySelector('.game-container');

      this.scoreTableContainerInstance = new CompetitionScoreTableContainer(
        this.customer,
        this.scoreTable,
      );
      gameContainer.appendChild(this.scoreTableContainerInstance.containerDiv);
    }

    if (this.showCompetitiveRegistration) {
      const clickEventHandlerShowRules = () => {
        if (this.gameCount === 0) {
          setTimeout(() => {
            const emailInput = document.querySelector('.boomio-competition-email-input-field');
            const playerNameInput = document.querySelector('.boomio-competition-name-input-field');

            if (this.showCompetitiveRegistration && this.checkboxChange) {
              boomioService
                .signal('', 'user_info', {
                  user_email: emailInput?.value,
                  user_name: playerNameInput?.value,
                })
                .then((response) => {
                  if (response.success === false) {
                    if (response.res_code === 'EMAIL_EXIST') {
                      document.getElementById('competition-email-error').innerText =
                        'Šis el. pašto adresas jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-email-error').style.backgroundColor =
                        '#FFBABA';
                      document.getElementById('competition-email-error').style.border =
                        '1px solid red';

                      document.getElementById('competition-name-error').innerText = '';

                      document.getElementById('competition-name-error').style.backgroundColor =
                        'transparent';
                      document.getElementById('competition-name-error').style.border = 'none';
                    } else if (response.res_code === 'NAME_EXIST') {
                      document.getElementById('competition-name-error').innerText =
                        'Šis slapyvardis jau egzistuoja. Naudokite kitą.';
                      document.getElementById('competition-name-error').style.backgroundColor =
                        '#FFBABA';
                      document.getElementById('competition-name-error').style.border =
                        '1px solid red';

                      document.getElementById('competition-email-error').innerText = '';
                      document.getElementById('competition-email-error').style.backgroundColor =
                        'transparent';
                      document.getElementById('competition-email-error').style.border = 'none';
                    }
                  } else {
                    this.bestScore = response.user_best_score;
                    const inpuRegisterContainer = document.querySelector(
                      '.input-register-container',
                    );
                    inpuRegisterContainer.style.transition =
                      'height 1s ease, top 1s ease, opacity 1s ease';
                    setTimeout(() => {
                      inpuRegisterContainer.style.height = '10px';
                      inpuRegisterContainer.style.top = 'calc(50% + 330px)';
                      inpuRegisterContainer.style.opacity = 0;
                    }, 100);
                    setTimeout(() => {
                      inpuRegisterContainer.style.display = 'none';
                    }, 1000);
                    setTimeout(() => {
                      const canvas = document.getElementById('boomio-doodle-canvas');
                      document.getElementById('background_blur').style.opacity = 0.37;
                      canvas.style.transition = 'filter 0.6s ease';
                      canvas.style.filter = 'blur(2px)';
                      const inputContainer = document.querySelector('.input-container');
                      document.getElementById('control-button').style.transition =
                        'opacity 2s ease';
                      document.getElementById('control-button').style.opacity = 1;
                      document.getElementById('control-button').style.display = 'flex';
                      inputContainer.style.transition =
                        'height 1s ease, top 1s ease, opacity 1s ease';
                      inputContainer.style.display = 'block';
                      setTimeout(() => {
                        inputContainer.style.height = '332px';
                        inputContainer.style.top = 'calc(50% + 170px)';
                        inputContainer.style.opacity = 1;
                      }, 100);
                    }, 300);
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            }
          }, 300);
        }
      };

      const clickEventHandlerResetGame = () => {
        const competitionRestart = document.getElementById('boomio-competition-play-again');
        competitionRestart.removeEventListener('click', clickEventHandlerResetGame);
        setTimeout(() => {
          competitionRestart.addEventListener('click', clickEventHandlerResetGame);
        }, 2000);

        const controlButton = document.querySelector('.control-button1');
        this.index = 0;
        this.currentScore = 0;
        const competitionTableContainer = document.querySelector('.competition-table-container');

        competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        setTimeout(() => {
          competitionTableContainer.style.height = '10px';
          competitionTableContainer.style.top = 'calc(50% + 330px)';
          competitionTableContainer.style.opacity = 0;
        }, 100);
        setTimeout(() => {
          competitionTableContainer.style.display = 'none';
        }, 1000);

        setTimeout(() => {
          if (this.showCompetitiveRegistration) {
            boomioService
              .signal('ROUND_STARTED', 'signal')
              .then((response) => {
                document.getElementById('background_blur').style.display = 'none';
                const canvas = document.getElementById('boomio-doodle-canvas');
                canvas.style.transition = 'filter 1s ease';
                canvas.style.filter = 'none';
                this.gamePlaying = true;
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }, 400);
        // controlButton.style.display = 'none';
        // controlButton.style.opacity = 0;
      };

      const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
      competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);

      const competitionRestart = document.getElementById('boomio-competition-play-again');
      competitionRestart.addEventListener('click', clickEventHandlerResetGame);
    }
  };
}

class Platform {
  constructor(image, score) {
    this.image = image;
    this.currentScore = score;
    this.width = 100;
    if (this.currentScore >= 5000) {
      this.width = 40;
    } else if (this.currentScore >= 1500 && this.currentScore < 5000) {
      this.width = 60;
    } else if (this.currentScore >= 700 && this.currentScore < 1500) {
      this.width = 70;
    } else if (this.currentScore >= 500 && this.currentScore < 700) {
      this.width = 80;
    } else if (this.currentScore >= 100 && this.currentScore < 500) this.width = 100;

    this.height = 20;
    this.x = Math.random() * (DoodleWidget.ctx.canvas.width - this.width);
    this.y = DoodleWidget.position;
    this.flag = 0;
    this.state = 0;

    DoodleWidget.position += DoodleWidget.ctx.canvas.height / 10;

    //Sprite clipping
    this.cx = 0;
    this.cy = 0;
    this.cwidth = 110;
    this.cheight = 30;

    this.moved = 0;
    this.vx = 1;

    this.types = [];
    this.type = 1;

    this.reset();
  }
  draw() {
    try {
      if (this.type == 1) this.cy = 0;
      else if (this.type == 2) this.cy = 61;
      else if (this.type == 3 && this.flag === 0) this.cy = 31;
      else if (this.type == 3 && this.flag == 1) this.cy = 1000;
      else if (this.type == 4 && this.state === 0) this.cy = 90;
      else if (this.type == 4 && this.state == 1) this.cy = 1000;
      DoodleWidget.ctx.drawImage(
        this.image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    } catch (e) {}
  }

  reset() {
    this.x = Math.random() * (DoodleWidget.ctx.canvas.width - this.width);

    //Platform types
    //1: Normal
    //2: Moving
    //3: Breakable (Go through)
    //4: Vanishable

    // Set initial platform types
    if (this.currentScore >= 7000) {
      this.types = [2, 2, 2, 3, 3, 4, 4, 4, 4];
      this.gravity = 0.3;
      this.vx = 6;
    } else if (this.currentScore >= 5000 && this.currentScore < 7000) {
      this.types = [2, 3, 2, 3, 4, 4, 4, 4];
      this.gravity = 0.2;
      this.vx = 5;
    } else if (this.currentScore >= 1500 && this.currentScore < 5000) {
      this.types = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
      this.gravity = 0.18;
      this.vx = 4;
    } else if (this.currentScore >= 700 && this.currentScore < 1500) {
      this.types = [2, 2, 2, 3, 3, 3, 3, 3];
      this.gravity = 0.16;
      this.vx = 3;
    } else if (this.currentScore >= 500 && this.currentScore < 700) {
      this.types = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
      this.gravity = 0.14;
      this.vx = 2;
    } else if (this.currentScore >= 100 && this.currentScore < 500) {
      this.gravity = 0.12;
      this.types = [1, 1, 1, 1, 2, 2];
      this.vx = 1.5;
    } else {
      this.gravity = 0.1;
      this.types = [1];
      this.vx = 1;
    }
    // Choose a random type from the available types
    this.type = this.types[Math.floor(Math.random() * this.types.length)];

    //We can't have two consecutive breakable platforms otherwise it will be impossible to reach another platform sometimes!
    if (this.type == 3 && DoodleWidget.broken < 1) {
      DoodleWidget.broken++;
    } else if (this.type == 3 && DoodleWidget.broken >= 1) {
      this.type = 1;
      DoodleWidget.broken = 0;
    }

    this.moved = 0;
  }
}

class Platform_broken_substitute {
  constructor(image) {
    this.image = image;
    this.height = 30;
    this.width = 70;

    this.x = 0;
    this.y = 0;

    //Sprite clipping
    this.cx = 0;
    this.cy = 554;
    this.cwidth = 105;
    this.cheight = 60;

    this.appearance = false;
  }

  draw = () => {
    try {
      if (this.appearance === true) {
        DoodleWidget.ctx.drawImage(
          this.image,
          this.cx,
          this.cy,
          this.cwidth,
          this.cheight,
          this.x,
          this.y,
          this.width,
          this.height,
        );
      }
    } catch (e) {}
  };
}

class Spring {
  constructor(image) {
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.moved = 0;
    this.vx = 1;
    this.cx = 5;
    this.cy = 475;
    this.cwidth = 110;
    this.cheight = 60;
    this.state = 0;
    this.width = 65;
    this.height = 38;
  }

  draw() {
    try {
      DoodleWidget.ctx.drawImage(
        this.image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    } catch (e) {}
  }
}

class Base {
  constructor(image) {
    this.image = image;
    this.height = 10;
    this.width = document.body.offsetWidth < 418 ? document.body.offsetWidth : 418; // Adjust the width value accordingly
    this.cx = 0;
    this.cy = 614;
    this.cwidth = 100;
    this.cheight = 5;
    this.moved = 0;
    this.x = 0;
    this.y = 668 - this.height;
  }

  draw() {
    try {
      DoodleWidget.ctx.drawImage(
        this.image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    } catch (e) {}
  }
}

class Player {
  constructor(image) {
    this.image = image;
    this.vy = 11;
    this.vx = 0;
    this.width = 99;
    this.height = 72;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isDead = false;
    this.cx = 0;
    this.cy = 0;
    this.cwidth = 110;
    this.cheight = 75;
    this.dir = 'left';
    this.x =
      (document.body.offsetWidth < 418 ? document.body.offsetWidth : 418) / 2 - this.width / 2;
    this.y = 666;
  }
  draw() {
    try {
      if (this.dir == 'right') this.cy = 124;
      else if (this.dir == 'left') this.cy = 204;
      else if (this.dir == 'right_land') this.cy = 282;
      else if (this.dir == 'left_land') this.cy = 364;

      DoodleWidget.ctx.drawImage(
        this.image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
    } catch (e) {}
  }

  jump = () => {
    this.vy = -7;
  };

  jumpHigh = () => {
    this.vy = -14;
  };
}

export default () => {
  new DoodleWidget();
};
