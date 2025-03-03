import {
  blue,
  green,
  orange,
  purple,
  red,
  yellow,
  blueSpecial,
  greenSpecial,
  orangeSpecial,
  purpleSpecial,
  redSpecial,
} from './constants';
import { widgetHtmlService, localStorageService, boomioService } from '@/services';

class CrushGame {
  constructor() {
    this.config = localStorageService.getDefaultConfig();

    this.gridSize = 8;
    this.tileSize = 50;
    this.colors = { red, blue, green, yellow, purple, orange };
    this.grid = [];
    this.selectedTile = null;
    this.images = {};
    this.score = 0;
    this.multiplier = 1;
    this.isAnimating = false; // Add this flag
    this.timer = 60; // Add timer property
    this.timerInterval = null; // Add timer interval property
    this.init();
  }

  init() {
    this.preloadImages(() => {
      this.createContainer();

      document.getElementById('crash-canvas').style.background = true
        ? 'gray'
        : `url(${redSpecial}) center`;
      this.setupCanvas();
      this.generateValidGrid();
      this.addEventListeners();
      this.startGameLoop();
      this.startTimer(); // Start the timer when the game starts
    });
  }

  startTimer() {
    const timerElement = document.getElementById('timer');
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear any existing timer intervals
    }
    this.timer = 60; // Reset the timer to 60 seconds
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerElement.innerText = `Time: ${this.timer}s`;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.isAnimating = true; // Prevent any further actions
    alert(`Game Over! Your score is ${this.score}`);
    // Optionally, you can add logic to restart the game or show a game over screen
  }

  getConnectedCells(row, col, color) {
    const stack = [{ row, col }];
    const connected = new Set();
    while (stack.length) {
      const cell = stack.pop();
      const key = `${cell.row}-${cell.col}`;
      if (connected.has(key)) continue;
      connected.add(key);
      // Check only 4 cardinal directions.
      const neighbors = [
        { row: cell.row - 1, col: cell.col }, // Up
        { row: cell.row + 1, col: cell.col }, // Down
        { row: cell.row, col: cell.col - 1 }, // Left
        { row: cell.row, col: cell.col + 1 }, // Right
      ];
      neighbors.forEach(({ row: nRow, col: nCol }) => {
        if (
          nRow >= 0 &&
          nRow < this.gridSize &&
          nCol >= 0 &&
          nCol < this.gridSize &&
          this.getBaseColor(this.grid[nRow][nCol]) === color
        ) {
          stack.push({ row: nRow, col: nCol });
        }
      });
    }
    return [...connected].map((key) => {
      const [r, c] = key.split('-').map(Number);
      return { row: r, col: c };
    });
  }

  // Preload both normal and special images.
  preloadImages(callback) {
    const normalColorKeys = Object.keys(this.colors);
    const specialKeys = [
      'blueSpecial',
      'greenSpecial',
      'orangeSpecial',
      'purpleSpecial',
      'redSpecial',
    ];
    let loadedImages = 0;
    const totalImages = normalColorKeys.length + specialKeys.length;

    // Load normal candy images.
    normalColorKeys.forEach((color) => {
      const img = new Image();
      img.src = this.colors[color];
      img.onload = () => {
        this.images[color] = img;
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      };
    });

    // Load special candy images.
    const specialSources = {
      blueSpecial,
      greenSpecial,
      orangeSpecial,
      purpleSpecial,
      redSpecial,
    };
    specialKeys.forEach((key) => {
      const img = new Image();
      img.src = specialSources[key];
      img.onload = () => {
        this.images[key] = img;
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      };
    });
  }

  createContainer() {
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'boomio-crush-container');
    gameContainer.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );
    gameContainer.innerHTML = `
      <div class="game-container game-container-catch">
        <div id="crush-game-background"></div>
        <canvas id="crash-canvas" width="${this.gridSize * this.tileSize}" height="${
      this.gridSize * this.tileSize
    }"></canvas>
        <div id="score">Score: 0</div>
        <div id="timer">Time: 60s</div> <!-- Add timer display -->
        <!-- Start overlay -->
        <div id="start-screen">
          <button id="start-button">Start Game</button>
        </div>
        <!-- Restart button (initially hidden) -->
        <button id="restart-button" class="hidden">Restart Game</button>
      </div>
    `;
    widgetHtmlService.container.appendChild(gameContainer);
  }

  setupCanvas() {
    this.canvas = document.getElementById('crash-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  generateValidGrid() {
    do {
      this.generateGrid();
    } while (this.hasInitialMatches());
  }

  generateGrid() {
    for (let row = 0; row < this.gridSize; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        let color;
        do {
          color = this.getRandomColor();
        } while (
          (col > 1 && this.grid[row][col - 1] === color && this.grid[row][col - 2] === color) ||
          (row > 1 && this.grid[row - 1][col] === color && this.grid[row - 2][col] === color)
        );
        this.grid[row][col] = color;
      }
    }
  }

  getRandomColor() {
    const colorKeys = Object.keys(this.colors);
    const baseColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];

    // Let's say 10% chance to create a "3Points" tile:
    const threePointColors = ['blue', 'green', 'orange', 'purple', 'red'];
    if (Math.random() < 0.1 && threePointColors.includes(baseColor)) {
      return baseColor + '3Points';
    }

    // Otherwise return a normal color
    return baseColor;
  }

  hasInitialMatches() {
    return this.findMatches().length > 0;
  }

  findMatches() {
    console.log('🔍 Checking matches in updated grid:', JSON.parse(JSON.stringify(this.grid)));
    let matches = new Set();

    // Horizontal check
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row][col + 1]);
        const c3 = this.getBaseColor(this.grid[row][col + 2]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row}-${col + 1}`);
          matches.add(`${row}-${col + 2}`);
          console.log(`✅ Horizontal match at (${row}, ${col})`);
        }
      }
    }

    // Vertical check
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        const c1 = this.getBaseColor(this.grid[row][col]);
        const c2 = this.getBaseColor(this.grid[row + 1][col]);
        const c3 = this.getBaseColor(this.grid[row + 2][col]);

        if (c1 && c1 === c2 && c1 === c3) {
          matches.add(`${row}-${col}`);
          matches.add(`${row + 1}-${col}`);
          matches.add(`${row + 2}-${col}`);
          console.log(`✅ Vertical match at (${row}, ${col})`);
        }
      }
    }

    let matchArray = [...matches].map((pos) => {
      const [row, col] = pos.split('-').map(Number);
      return { row, col };
    });

    console.log('🎯 Matches Found:', matchArray);
    return matchArray;
  }

  getBaseColor(color) {
    if (typeof color !== 'string') return color;
    return color.replace('Special', '').replace('Multiplier', '').replace('3Points', ''); // <-- This ensures "red3Points" => "red"
  }

  applyGravity(callback) {
    let existingFalling = [];
    let newFalling = [];
    let newTilesMap = {}; // will store new colors for each column

    // Process each column for downward gravity.
    for (let col = 0; col < this.gridSize; col++) {
      let emptySpaces = 0;
      // Iterate from bottom to top.
      for (let row = this.gridSize - 1; row >= 0; row--) {
        if (!this.grid[row][col]) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          // Schedule this candy to fall down by emptySpaces rows.
          existingFalling.push({ fromRow: row, toRow: row + emptySpaces, col });
          // Update the grid: move the candy down.
          this.grid[row + emptySpaces][col] = this.grid[row][col];
          this.grid[row][col] = null;
        }
      }
      // For each empty space at the top, create a new candy falling in.
      newTilesMap[col] = [];
      for (let i = 0; i < emptySpaces; i++) {
        // Get a random color.
        let newColor = this.getRandomColor();
        // With a 10% chance, convert it to its special variant.
        if (Math.random() < 0.1) {
          // If the color is yellow and you don't have yellowSpecial, use redSpecial as default.
          newColor = newColor === 'yellow' ? 'redSpecial' : newColor + 'Special';
        }
        newTilesMap[col].push(newColor);
        newFalling.push({
          fromRow: -emptySpaces + i, // start above the grid (e.g. -emptySpaces, ... -1)
          toRow: i, // target row is i (0, 1, 2, etc.)
          col,
          isNew: true,
          color: newColor,
        });
        // Note: DO NOT update this.grid[i][col] here—leave it null so nothing shows.
      }
    }

    // Animate existing candies falling first.
    this.animateFallingTiles(existingFalling, () => {
      // Then animate new candies falling in.
      this.animateFallingTiles(newFalling, () => {
        // Now that the animation is complete, update the grid with new candies.
        for (let col = 0; col < this.gridSize; col++) {
          if (newTilesMap[col]) {
            for (let i = 0; i < newTilesMap[col].length; i++) {
              this.grid[i][col] = newTilesMap[col][i];
            }
          }
        }
        this.drawGrid();
        callback();
      });
    });
  }

  animateFallingExplosion(specialTile, callback) {
    // Determine the target row (for example, the bottom of the grid).
    const targetRow = this.gridSize - 1;
    // Create a falling tile object for the special tile.
    const fallingTile = [
      {
        fromRow: specialTile.row,
        toRow: targetRow,
        col: specialTile.col,
        isNew: false,
        color: this.grid[specialTile.row][specialTile.col],
      },
    ];
    // Animate this falling tile.
    this.animateFallingTiles(fallingTile, () => {
      // Remove the special tile from its original location.
      this.grid[specialTile.row][specialTile.col] = null;
      // Place it at the target location.
      this.grid[targetRow][specialTile.col] = fallingTile[0].color;
      // Call the callback, passing the landing row.
      callback(targetRow);
    });
  }
  animateFallingTiles(fallingTiles, callback) {
    const duration = 500; // Duration of the animation in milliseconds.
    const startTime = performance.now();
    this.isAnimating = true; // Set flag to true at the start of animation

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Loop over each cell in the grid.
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          const fallingTile = fallingTiles.find((tile) => tile.toRow === row && tile.col === col);
          if (fallingTile) {
            const startY = fallingTile.fromRow * this.tileSize;
            const targetY = fallingTile.toRow * this.tileSize;
            const currentY = startY + (targetY - startY) * progress;
            const yOffset = currentY - targetY;
            const tileColor = fallingTile.isNew ? fallingTile.color : this.grid[row][col];
            this.drawTile(row, col, tileColor, yOffset);
          } else {
            if (this.grid[row][col]) {
              this.drawTile(row, col, this.grid[row][col]);
            }
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();
        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };

    requestAnimationFrame(animate);
  }

  animateMatchEffect(matches, callback) {
    const particles = [];
    const duration = 500;
    const startTime = performance.now();

    matches.forEach((match) => {
      const centerX = match.col * this.tileSize + this.tileSize / 2;
      const centerY = match.row * this.tileSize + this.tileSize / 2;
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 1,
        });
      }
    });

    const animateParticles = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - progress;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        this.ctx.fill();
      });

      if (elapsed < duration) {
        requestAnimationFrame(animateParticles);
      } else {
        callback();
      }
    };

    requestAnimationFrame(animateParticles);
  }

  // In drawTile, check if the tile key ends with "Special" to draw it with a red background.
  drawTile(row, col, color, yOffset = 0, xOffset = 0) {
    if (typeof color === 'string' && color.endsWith('Special')) {
      // Draw red background.
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(
        col * this.tileSize + xOffset,
        row * this.tileSize + yOffset,
        this.tileSize,
        this.tileSize,
      );
      const specialImg = this.images[color];
      if (specialImg) {
        this.ctx.drawImage(
          specialImg,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }
      return;
    }
    if (typeof color === 'string' && color.endsWith('3Points')) {
      // 1) Draw the base color’s normal image, if you have it
      const base = color.replace('3Points', ''); // e.g. "blue3Points" => "blue"
      const img = this.images[base];
      if (img) {
        this.ctx.drawImage(
          img,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      } else {
        // fallback fill if no image
        this.ctx.fillStyle = base;
        this.ctx.fillRect(
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }

      // 2) Overlay “+3”
      this.ctx.fillStyle = 'white';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(
        '+3',
        col * this.tileSize + xOffset + this.tileSize * 0.25,
        row * this.tileSize + yOffset + this.tileSize * 0.6,
      );
      return; // done drawing
    }
    if (typeof color === 'string' && color.endsWith('Multiplier')) {
      // Get the base color from the name, e.g. "blueMultiplier" -> "blue"
      const base = color.replace('Multiplier', '');

      // If you have an image for the base color, draw that image:
      const img = this.images[base];
      if (img) {
        this.ctx.drawImage(
          img,
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      } else {
        // Otherwise fill with your base color
        this.ctx.fillStyle = base;
        this.ctx.fillRect(
          col * this.tileSize + xOffset,
          row * this.tileSize + yOffset,
          this.tileSize,
          this.tileSize,
        );
      }

      // Draw "x2" text to indicate multiplier
      this.ctx.fillStyle = 'white';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(
        'x2',
        col * this.tileSize + xOffset + this.tileSize * 0.3,
        row * this.tileSize + yOffset + this.tileSize * 0.6,
      );
      return;
    }
    // Normal tile drawing.
    const img = this.images[color];
    if (img) {
      this.ctx.drawImage(
        img,
        col * this.tileSize + xOffset,
        row * this.tileSize + yOffset,
        this.tileSize,
        this.tileSize,
      );
    }
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.handleTileSelection(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleTileSwap(e));

    const startButton = document.getElementById('start-button');
    if (startButton) {
      startButton.addEventListener('click', () => {
        // Hide the start screen overlay
        document.getElementById('start-screen').classList.add('hidden');
        // Show the restart button
        document.getElementById('restart-button').classList.remove('hidden');
        // Start the game loop if not already running
        this.startGameLoop();
      });
    }

    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
      restartButton.addEventListener('click', () => {
        this.restartGame();
      });
    }
  }

  restartGame() {
    // Reset score and update display
    this.score = 0;
    document.getElementById('score').innerText = 'Score: 0';
    // Re-generate a valid grid
    this.generateValidGrid();
    // Reset selected tile
    this.selectedTile = null;
    // Redraw the grid
    this.drawGrid();
    // Restart the timer
    this.startTimer();
  }

  handleTileSelection(event) {
    if (this.isAnimating) return; // Prevent tile selection during animations
    const { row, col } = this.getTilePosition(event);
    this.selectedTile = { row, col };
  }

  getTilePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { col: Math.floor(x / this.tileSize), row: Math.floor(y / this.tileSize) };
  }

  handleTileSwap(event) {
    if (this.isAnimating) return; // Prevent tile swap during animations
    if (!this.selectedTile) return;
    const { row, col } = this.getTilePosition(event);
    if (
      (Math.abs(row - this.selectedTile.row) === 1 && col === this.selectedTile.col) ||
      (Math.abs(col - this.selectedTile.col) === 1 && row === this.selectedTile.row)
    ) {
      const tile1 = this.selectedTile;
      const tile2 = { row, col };
      console.log(`🔄 Swapping (${tile1.row}, ${tile1.col}) with (${tile2.row}, ${tile2.col})`);
      this.isAnimating = true; // Set flag to true at the start of animation
      this.animateTileSwap(tile1, tile2, () => {
        console.log('🔎 Checking for matches after swap...');
        const matches = this.findMatches();
        if (matches.length > 0) {
          console.log('✅ Matches found, processing...');
          this.selectedTile = null;
          this.processMatches();
        } else {
          console.log('❌ No matches found, swapping back.');
          this.animateTileSwap(tile2, tile1, () => {
            this.selectedTile = null;
            this.drawGrid();

            setTimeout(() => {
              this.isAnimating = false;
            }, 500);
          });
        }
      });
    }
  }
  animateTileSwap(tile1, tile2, callback) {
    const duration = 200; // duration of the animation in milliseconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let row = 0; row < this.gridSize; row++) {
        for (let col = 0; col < this.gridSize; col++) {
          let xOffset = 0;
          let yOffset = 0;
          if (row === tile1.row && col === tile1.col) {
            xOffset = (tile2.col - tile1.col) * this.tileSize * progress;
            yOffset = (tile2.row - tile1.row) * this.tileSize * progress;
          } else if (row === tile2.row && col === tile2.col) {
            xOffset = (tile1.col - tile2.col) * this.tileSize * progress;
            yOffset = (tile1.row - tile2.row) * this.tileSize * progress;
          }
          this.drawTile(row, col, this.grid[row][col], yOffset, xOffset);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.swapTiles(tile1, tile2); // Ensure tiles are swapped before checking for matches
        this.drawGrid();
        callback();
        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };

    requestAnimationFrame(animate);
  }
  swapTiles(tile1, tile2) {
    const temp = this.grid[tile1.row][tile1.col];
    this.grid[tile1.row][tile1.col] = this.grid[tile2.row][tile2.col];
    this.grid[tile2.row][tile2.col] = temp;
  }

  hasMatchesAfterSwap(tile1, tile2) {
    console.log(
      `Checking matches after swapping (${tile1.row}, ${tile1.col}) and (${tile2.row}, ${tile2.col})`,
    );
    const matches = this.findMatches();
    const hasMatches = matches.length > 0;
    if (!hasMatches) {
      console.log('No matches found after swap, reverting swap.');
    } else {
      console.log('Matches found after swap.');
    }
    return hasMatches;
  }

  checkForMatches(tile) {
    const { row, col } = tile;
    const color = this.grid[row][col];
    let horizontalMatch = 1;
    let verticalMatch = 1;
    for (let i = col - 1; i >= 0 && this.grid[row][i] === color; i--) {
      horizontalMatch++;
    }
    for (let i = col + 1; i < this.gridSize && this.grid[row][i] === color; i++) {
      horizontalMatch++;
    }
    for (let i = row - 1; i >= 0 && this.grid[i][col] === color; i--) {
      verticalMatch++;
    }
    for (let i = row + 1; i < this.gridSize && this.grid[i][col] === color; i++) {
      verticalMatch++;
    }
    const hasMatch = horizontalMatch >= 3 || verticalMatch >= 3;
    if (hasMatch) {
      console.log(`Match found at (${row}, ${col}) with color ${color}`);
    } else {
      console.log(`No match found at (${row}, ${col}) with color ${color}`);
    }
    console.log(`Horizontal match length: ${horizontalMatch}`);
    console.log(`Vertical match length: ${verticalMatch}`);
    return hasMatch;
  }

  activateMultiplier() {
    this.multiplier = 2;

    // OPTIONAL: If you have an on-screen element to show multiplier status
    const multEl = document.getElementById('multiplier-indicator');
    if (multEl) {
      multEl.innerText = 'x2 MULTIPLIER (10s)';
    }

    setTimeout(() => {
      this.multiplier = 1;
      if (multEl) {
        multEl.innerText = '';
      }
    }, 10000);
  }

  processMatches(chain = 0) {
    // Prevent infinite loops / handle large chain reactions
    if (chain > 10) {
      console.log('Chain reaction limit reached. Stopping further processing.');
      return;
    }

    // Find initial matches in the grid
    const initialMatches = this.findMatches();
    if (initialMatches.length > 0) {
      // Expand matches to include all connected cells of the same base color
      let extendedMatches = new Set();
      initialMatches.forEach(({ row, col }) => {
        extendedMatches.add(`${row}-${col}`);
        const baseColor = this.getBaseColor(this.grid[row][col]);
        const connected = this.getConnectedCells(row, col, baseColor);
        connected.forEach((cell) => {
          extendedMatches.add(`${cell.row}-${cell.col}`);
        });
      });

      // Convert the Set into an array of {row, col} objects
      const matchArray = [...extendedMatches].map((pos) => {
        const [r, c] = pos.split('-').map(Number);
        return { row: r, col: c };
      });

      // Prepare to handle special tiles or extra point tiles
      let specialFound = null;
      let totalBasePoints = 0;

      // Loop through matched tiles to find:
      // 1) Special tiles (e.g., "redSpecial") to explode
      // 2) 3-Point tiles (ends with "3Points") to add 3 points
      //    otherwise each tile is worth 1 point
      matchArray.forEach(({ row, col }) => {
        const tileVal = this.grid[row][col];

        // If the tile is a special bomb/explosive
        if (typeof tileVal === 'string' && tileVal.endsWith('Special')) {
          specialFound = { row, col };
        }

        // Tally points:
        if (typeof tileVal === 'string' && tileVal.endsWith('3Points')) {
          // This tile is worth 3 points
          totalBasePoints += 3;
        } else {
          // Normal tile is worth 1 point
          totalBasePoints += 1;
        }
      });

      // If a special tile is found, explode it and exit this function
      if (specialFound) {
        console.log('Special tile triggered! Exploding matched group and adjacent area.');
        this.explodeTile(specialFound);
        return; // Once we trigger explodeTile, we let that flow handle gravity, etc.
      }

      // Otherwise, just add the calculated points (use multiplier if you have one)
      // e.g. this.score += totalBasePoints * this.multiplier;
      // If you don't have a multiplier, just do:
      this.score += totalBasePoints;

      // Update score display
      document.getElementById('score').innerText = `Score: ${this.score}`;

      // Animate the match effect, then clear matched tiles, apply gravity, and check for new matches
      this.animateMatchEffect(matchArray, () => {
        matchArray.forEach(({ row, col }) => {
          // Clear matched tiles, unless it's some other special logic you want to skip
          this.grid[row][col] = null;
        });

        // Gravity will drop new tiles in; then we recursively call processMatches to check for combos
        this.applyGravity(() => {
          this.processMatches(chain + 1);
        });
      });
    }
  }

  explodeTile(centerTile, callback) {
    const specialKey = this.grid[centerTile.row][centerTile.col];
    const targetRow = centerTile.row;
    const targetCol = centerTile.col;

    // Remove the special tile from the grid immediately.
    this.grid[targetRow][targetCol] = null;

    // Define the explosion area as a 3×3 block around the special tile's position.
    let explosionArea = [];
    const radius = 1;
    for (let r = targetRow - radius; r <= targetRow + radius; r++) {
      for (let c = targetCol - radius; c <= targetCol + radius; c++) {
        if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
          explosionArea.push({ row: r, col: c });
        }
      }
    }

    // Award points for each tile in the explosion area.
    // (You could adjust the points logic as needed.)
    this.score += explosionArea.length * this.multiplier;
    document.getElementById('score').innerText = `Score: ${this.score}`;

    // Animate the explosion over that area.
    this.animateExplosion(explosionArea, () => {
      // Before clearing the area, collect any special cells in it.
      let additionalSpecials = [];
      explosionArea.forEach(({ row, col }) => {
        const tileVal = this.grid[row][col];
        if (typeof tileVal === 'string' && tileVal.endsWith('Special')) {
          additionalSpecials.push({ row, col });
        }
      });

      // Clear all cells in the explosion area.
      explosionArea.forEach(({ row, col }) => {
        this.grid[row][col] = null;
      });

      // Process additional special explosions sequentially.
      const processAdditionalExplosions = (specials, done) => {
        if (specials.length === 0) {
          done();
          return;
        }
        // Explode the first special cell.
        const next = specials.shift();
        this.explodeTile(next, () => {
          // After that explosion, process the remaining specials.
          processAdditionalExplosions(specials, done);
        });
      };

      processAdditionalExplosions(additionalSpecials, () => {
        // After processing all additional explosions, if a callback was provided, call it.
        if (callback) {
          callback();
        } else {
          // Otherwise, apply gravity and process further matches.
          this.applyGravity(() => {
            this.processMatches();
          });
        }
      });
    });
  }

  animateExplosion(tiles, callback) {
    const duration = 300;
    const startTime = performance.now();
    this.isAnimating = true; // Set flag to true at the start of animation

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
      tiles.forEach(({ row, col }) => {
        const centerX = col * this.tileSize + this.tileSize / 2;
        const centerY = row * this.tileSize + this.tileSize / 2;
        const maxRadius = this.tileSize;
        const currentRadius = maxRadius * progress;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(255, 0, 0, ${1 - progress})`;
        this.ctx.fill();
      });
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();

        setTimeout(() => {
          this.isAnimating = false;
        }, 500); // Set flag to false after animation is complete
      }
    };
    requestAnimationFrame(animate);
  }
  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.drawTile(row, col, this.grid[row][col]);
      }
    }
  }

  startGameLoop() {
    const gameLoop = () => {
      this.update();
      this.drawGrid();
      if (this.timer > 0) {
        requestAnimationFrame(gameLoop);
      }
    };
    requestAnimationFrame(gameLoop);
  }

  update() {
    // Update game state here
  }
}

export default () => {
  new CrushGame();
};
