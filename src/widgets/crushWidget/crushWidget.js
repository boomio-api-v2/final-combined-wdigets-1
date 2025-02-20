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
  yellowSpecial,
} from './constants';

class CrushGame {
  constructor() {
    this.gridSize = 8;
    this.tileSize = 40;
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
      this.setupCanvas();
      this.generateValidGrid();
      this.addEventListeners();
      this.startGameLoop();
    });
  }

  // 1. Update preloadImages to load the special tile image.
  preloadImages(callback) {
    const colorKeys = Object.keys(this.colors);
    let loadedImages = 0;
    const totalImages = colorKeys.length + 1; // +1 for special image

    // Load normal candy images.
    colorKeys.forEach((color) => {
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

    // Load the special tile image.
    const specialImg = new Image();
    specialImg.src = 'special.png'; // Change to your special tile image URL.
    specialImg.onload = () => {
      this.images['special'] = specialImg;
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  }

  createContainer() {
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'boomio-catch-container');
    gameContainer.classList.add('boomio--animation__wrapper', 'box');
    gameContainer.innerHTML = `
      <div class="game-container" id="game-container">
        <canvas id="canvas" width="${this.gridSize * this.tileSize}" height="${
      this.gridSize * this.tileSize
    }"></canvas>
        <div id="score">Score: 0</div>
      </div>
    `;
    document.body.appendChild(gameContainer);
  }

  setupCanvas() {
    this.canvas = document.getElementById('canvas');
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

        if (candy && candy === this.grid[row][col + 1] && candy === this.grid[row][col + 2]) {
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

        if (candy && candy === this.grid[row + 1][col] && candy === this.grid[row + 2][col]) {
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
          // Check if there is a falling tile scheduled for this cell.
          const fallingTile = fallingTiles.find((tile) => tile.toRow === row && tile.col === col);
          if (fallingTile) {
            // Calculate the current pixel Y position using linear interpolation.
            const startY = fallingTile.fromRow * this.tileSize;
            const targetY = fallingTile.toRow * this.tileSize;
            const currentY = startY + (targetY - startY) * progress;
            // The offset relative to the final position:
            const yOffset = currentY - targetY;

            // Determine which color to draw:
            const tileColor = fallingTile.isNew ? fallingTile.color : this.grid[row][col];
            // Draw only the falling tile (do not draw a static tile in this cell).
            this.drawTile(row, col, tileColor, yOffset);
          } else {
            // If no falling tile for this cell, draw the static grid tile (if not null).
            if (this.grid[row][col]) {
              this.drawTile(row, col, this.grid[row][col]);
            }
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Once complete, invoke the callback.
        callback();
      }
    };

    requestAnimationFrame(animate);
  }

  animateMatchEffect(matches, callback) {
    // Create particles for each matched cell.
    const particles = [];
    const duration = 500; // Duration of the effect in ms.
    const startTime = performance.now();

    matches.forEach((match) => {
      // Calculate the center position of the cell.
      const centerX = match.col * this.tileSize + this.tileSize / 2;
      const centerY = match.row * this.tileSize + this.tileSize / 2;
      // Create several particles per matched cell.
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

    // Animation loop
    const animateParticles = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      // Clear the canvas and redraw grid as background.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();

      // Draw and update each particle.
      particles.forEach((p) => {
        // Update particle position.
        p.x += p.vx;
        p.y += p.vy;
        // Fade out particle over time.
        p.alpha = 1 - progress;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        this.ctx.fill();
      });

      if (elapsed < duration) {
        requestAnimationFrame(animateParticles);
      } else {
        // End of effect, clear particles and call callback.
        callback();
      }
    };

    requestAnimationFrame(animateParticles);
  }

  // 2. Modify drawTile so that if the tile is "special", it draws a red background.
  drawTile(row, col, color, yOffset = 0, xOffset = 0) {
    // If this tile is special, draw a red background and then the special image.
    if (color === 'special') {
      // Draw red background.
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(
        col * this.tileSize + xOffset,
        row * this.tileSize + yOffset,
        this.tileSize,
        this.tileSize,
      );
      // Draw the special tile image if available.
      const specialImg = this.images['special'];
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

      // Remove the immediate swap; let animateTileSwap perform the swap.
      this.animateTileSwap(tile1, tile2, () => {
        console.log('🔎 Checking for matches after swap...');
        const matches = this.findMatches();

        if (matches.length > 0) {
          console.log('✅ Matches found, processing...');
          this.selectedTile = null;
          this.processMatches();
        } else {
          console.log('❌ No matches found, swapping back.');
          // For swap-back, again let animateTileSwap handle the swap.
          this.animateTileSwap(tile2, tile1, () => {
            this.selectedTile = null;
            this.drawGrid();
          });
        }
      });
    }
  }

  hasMatchesAfterSwap(tile1, tile2) {
    console.log(
      `Checking matches after swapping (${tile1.row}, ${tile1.col}) and (${tile2.row}, ${tile2.col})`,
    );

    const matches = this.findMatches(); // Now finds matches with swapped tiles
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

    // Check horizontal match to the left
    for (let i = col - 1; i >= 0 && this.grid[row][i] === color; i--) {
      horizontalMatch++;
    }
    // Check horizontal match to the right
    for (let i = col + 1; i < this.gridSize && this.grid[row][i] === color; i++) {
      horizontalMatch++;
    }

    // Check vertical match upwards
    for (let i = row - 1; i >= 0 && this.grid[i][col] === color; i--) {
      verticalMatch++;
    }
    // Check vertical match downwards
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
  findMatches() {
    console.log('🔍 Checking matches in updated grid:', JSON.parse(JSON.stringify(this.grid)));

    let matches = new Set();

    // Horizontal check
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        let candy = this.grid[row][col];

        if (candy && candy === this.grid[row][col + 1] && candy === this.grid[row][col + 2]) {
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

        if (candy && candy === this.grid[row + 1][col] && candy === this.grid[row + 2][col]) {
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

  swapTiles(tile1, tile2) {
    console.log(`Swapping (${tile1.row}, ${tile1.col}) with (${tile2.row}, ${tile2.col})`);

    const temp = this.grid[tile1.row][tile1.col];
    this.grid[tile1.row][tile1.col] = this.grid[tile2.row][tile2.col];
    this.grid[tile2.row][tile2.col] = temp;

    console.log('✅ Updated Grid After Swap:', JSON.parse(JSON.stringify(this.grid)));
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

  drawTile(row, col, color, yOffset = 0, xOffset = 0) {
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
  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.drawTile(row, col, this.grid[row][col]);
      }
    }
  }

  // 3. Modify processMatches to randomly convert one matched candy into a special tile
  //    and to trigger an explosion if a special tile is found.
  processMatches(chain = 0) {
    // Set a maximum chain reaction limit to avoid infinite loops.
    if (chain > 10) {
      console.log('Chain reaction limit reached. Stopping further processing.');
      return;
    }

    const matches = this.findMatches();
    if (matches.length > 0) {
      // First, check if any matched tile is already special.
      let specialFound = null;
      matches.forEach(({ row, col }) => {
        if (this.grid[row][col] === 'special') {
          specialFound = { row, col };
        }
      });

      if (specialFound) {
        console.log('Special tile triggered! Exploding surrounding area.');
        this.explodeTile(specialFound);
        return;
      }

      // Otherwise, randomly convert one of the matched candies into a special tile (20% chance).
      if (Math.random() < 0.2) {
        const randomIndex = Math.floor(Math.random() * matches.length);
        const specialCell = matches[randomIndex];
        console.log(
          `Converting cell (${specialCell.row}, ${specialCell.col}) into a special tile.`,
        );
        this.grid[specialCell.row][specialCell.col] = 'special';
      }

      // Increase score based on the number of matched candies.
      this.score += matches.length;
      document.getElementById('score').innerText = `Score: ${this.score}`;

      // Animate the match effect before removing candies.
      this.animateMatchEffect(matches, () => {
        // Once the effect is complete, clear the matched candies (except special ones).
        matches.forEach(({ row, col }) => {
          if (this.grid[row][col] !== 'special') {
            this.grid[row][col] = null;
          }
        });
        // Then apply gravity to let candies fall and new ones appear.
        this.applyGravity(() => {
          // Recursively check for new matches after gravity is applied,
          // and increase the chain count.
          this.processMatches(chain + 1);
        });
      });
    }
  }
  explodeTile(centerTile) {
    // centerTile is an object with {row, col}
    const radius = 1; // 1 radius = clear surrounding 8 cells + center (3x3 area)
    let affectedTiles = [];

    for (let r = centerTile.row - radius; r <= centerTile.row + radius; r++) {
      for (let c = centerTile.col - radius; c <= centerTile.col + radius; c++) {
        // Make sure we’re within grid bounds.
        if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
          affectedTiles.push({ row: r, col: c });
        }
      }
    }

    // Trigger an explosion animation on these tiles.
    this.animateExplosion(affectedTiles, () => {
      // Once the animation completes, clear the tiles.
      affectedTiles.forEach(({ row, col }) => {
        this.grid[row][col] = null;
      });
      // Apply gravity so that remaining candies fall down and new ones come in.
      this.applyGravity(() => {
        // After gravity, check for new matches.
        this.processMatches();
      });
    });
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
