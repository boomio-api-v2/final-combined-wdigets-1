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
    // Normal candy colors.
    this.colors = { red, blue, green, yellow, purple, orange };
    this.grid = [];
    this.selectedTile = null;
    this.images = {};
    this.score = 0;
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
    });
  }

  // Returns all connected cells (only up, down, left, right) of the given base color.
  getConnectedCells(row, col, color) {
    const stack = [{ row, col }];
    const connected = new Set();
    while (stack.length) {
      const cell = stack.pop();
      const key = `${cell.row}-${cell.col}`;
      if (connected.has(key)) continue;
      connected.add(key);
      // Only check the 4 cardinal directions.
      const neighbors = [
        { row: cell.row - 1, col: cell.col }, // Up
        { row: cell.row + 1, col: cell.col }, // Down
        { row: cell.row, col: cell.col - 1 }, // Left
        { row: cell.row, col: cell.col + 1 }, // Right
      ];
      neighbors.forEach(({ row: newRow, col: newCol }) => {
        if (
          newRow >= 0 &&
          newRow < this.gridSize &&
          newCol >= 0 &&
          newCol < this.gridSize &&
          this.getBaseColor(this.grid[newRow][newCol]) === color
        ) {
          stack.push({ row: newRow, col: newCol });
        }
      });
    }
    return [...connected].map((pos) => {
      const [r, c] = pos.split('-').map(Number);
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
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    return colorKeys[randomIndex];
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
        let candy = this.grid[row][col];
        if (
          candy &&
          this.getBaseColor(candy) === this.getBaseColor(this.grid[row][col + 1]) &&
          this.getBaseColor(candy) === this.getBaseColor(this.grid[row][col + 2])
        ) {
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
        let candy = this.grid[row][col];
        if (
          candy &&
          this.getBaseColor(candy) === this.getBaseColor(this.grid[row + 1][col]) &&
          this.getBaseColor(candy) === this.getBaseColor(this.grid[row + 2][col])
        ) {
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
    return color.replace('Special', '');
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
        const newColor = this.getRandomColor();
        newTilesMap[col].push(newColor);
        newFalling.push({
          fromRow: -emptySpaces + i, // start above the grid (e.g. -3, -2, -1)
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

  animateFallingTiles(fallingTiles, callback) {
    const duration = 500; // Duration of the animation in milliseconds.
    const startTime = performance.now();

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
      } else {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(
          'S',
          col * this.tileSize + this.tileSize / 3,
          row * this.tileSize + this.tileSize / 1.5,
        );
      }
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
  }

  handleTileSelection(event) {
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
    if (!this.selectedTile) return;
    const { row, col } = this.getTilePosition(event);
    if (
      (Math.abs(row - this.selectedTile.row) === 1 && col === this.selectedTile.col) ||
      (Math.abs(col - this.selectedTile.col) === 1 && row === this.selectedTile.row)
    ) {
      const tile1 = this.selectedTile;
      const tile2 = { row, col };
      console.log(`🔄 Swapping (${tile1.row}, ${tile1.col}) with (${tile2.row}, ${tile2.col})`);
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

  processMatches(chain = 0) {
    if (chain > 10) {
      console.log('Chain reaction limit reached. Stopping further processing.');
      return;
    }
    const initialMatches = this.findMatches();
    if (initialMatches.length > 0) {
      // Use a set to build the union of all connected cells.
      let extendedMatches = new Set();
      initialMatches.forEach(({ row, col }) => {
        // Add the current matched cell.
        extendedMatches.add(`${row}-${col}`);
        // Get its base color.
        const baseColor = this.getBaseColor(this.grid[row][col]);
        // If the color is, say, yellow (or any color for that matter), extend with connected cells.
        const connected = this.getConnectedCells(row, col, baseColor);
        connected.forEach((cell) => {
          extendedMatches.add(`${cell.row}-${cell.col}`);
        });
      });

      const matchArray = [...extendedMatches].map((pos) => {
        const [row, col] = pos.split('-').map(Number);
        return { row, col };
      });

      // (Your special tile logic can remain here; for example, if a special tile is present, trigger explosion.)
      let specialFound = null;
      matchArray.forEach(({ row, col }) => {
        const tile = this.grid[row][col];
        if (typeof tile === 'string' && tile.endsWith('Special')) {
          specialFound = { row, col };
        }
      });
      if (specialFound) {
        console.log('Special tile triggered! Exploding matched group and adjacent area.');
        let explosionArea = new Set();
        // Add the 3x3 area around the special tile.
        for (let r = specialFound.row - 1; r <= specialFound.row + 1; r++) {
          for (let c = specialFound.col - 1; c <= specialFound.col + 1; c++) {
            if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
              explosionArea.add(`${r}-${c}`);
            }
          }
        }
        // Also add all cells in the extended match.
        matchArray.forEach(({ row, col }) => explosionArea.add(`${row}-${col}`));
        const explosionArray = [...explosionArea].map((key) => {
          const [row, col] = key.split('-').map(Number);
          return { row, col };
        });
        this.animateExplosion(explosionArray, () => {
          explosionArray.forEach(({ row, col }) => {
            this.grid[row][col] = null;
          });
          this.applyGravity(() => {
            this.processMatches();
          });
        });
        return;
      }

      // Otherwise, optionally convert one matched cell to a special tile (e.g., with a 20% chance)
      if (Math.random() < 0.2) {
        const randomIndex = Math.floor(Math.random() * matchArray.length);
        const specialCell = matchArray[randomIndex];
        let currentColor = this.grid[specialCell.row][specialCell.col];
        let specialKey = currentColor === 'yellow' ? 'redSpecial' : currentColor + 'Special';
        console.log(
          `Converting cell (${specialCell.row}, ${specialCell.col}) into a special tile (${specialKey}).`,
        );
        this.grid[specialCell.row][specialCell.col] = specialKey;
      }

      this.score += matchArray.length;
      document.getElementById('score').innerText = `Score: ${this.score}`;

      this.animateMatchEffect(matchArray, () => {
        matchArray.forEach(({ row, col }) => {
          if (
            !(typeof this.grid[row][col] === 'string' && this.grid[row][col].endsWith('Special'))
          ) {
            this.grid[row][col] = null;
          }
        });
        this.applyGravity(() => {
          this.processMatches(chain + 1);
        });
      });
    }
  }

  explodeTile(centerTile) {
    const radius = 1;
    let affectedTiles = [];
    for (let r = centerTile.row - radius; r <= centerTile.row + radius; r++) {
      for (let c = centerTile.col - radius; c <= centerTile.col + radius; c++) {
        if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
          affectedTiles.push({ row: r, col: c });
        }
      }
    }
    this.animateExplosion(affectedTiles, () => {
      affectedTiles.forEach(({ row, col }) => {
        this.grid[row][col] = null;
      });
      this.applyGravity(() => {
        this.processMatches();
      });
    });
  }

  animateExplosion(tiles, callback) {
    const duration = 300;
    const startTime = performance.now();
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
      requestAnimationFrame(gameLoop);
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
