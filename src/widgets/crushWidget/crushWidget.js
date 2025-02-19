import { blue, green, orange, purple, red, yellow } from './constants';

class CrushGame {
  constructor() {
    this.gridSize = 8;
    this.tileSize = 40;
    this.colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    this.grid = [];
    this.selectedTile = null;
    this.init();
  }

  init() {
    this.createContainer();
    this.setupCanvas();
    this.generateGrid();
    this.drawGrid();
    this.addEventListeners();
  }

  createContainer() {
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'boomio-catch-container');
    gameContainer.classList.add('boomio--animation__wrapper', 'box');
    gameContainer.innerHTML = `
      <div class="game-container" id="game-container">
        <h1>Candy Crush</h1>
        <canvas id="canvas" width="${this.gridSize * this.tileSize}" height="${
      this.gridSize * this.tileSize
    }"></canvas>
      </div>
    `;
    document.body.appendChild(gameContainer);
  }

  setupCanvas() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  generateGrid() {
    for (let row = 0; row < this.gridSize; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        this.grid[row][col] = this.getRandomColor();
      }
    }
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  drawGrid() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.drawTile(row, col, this.grid[row][col]);
      }
    }
  }

  drawTile(row, col, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
    this.ctx.strokeStyle = '#fff';
    this.ctx.strokeRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.handleTileSelection(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleTileSwap(e));
  }

  getTilePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { col: Math.floor(x / this.tileSize), row: Math.floor(y / this.tileSize) };
  }

  handleTileSelection(event) {
    const { row, col } = this.getTilePosition(event);
    this.selectedTile = { row, col };
  }

  handleTileSwap(event) {
    if (!this.selectedTile) return;
    const { row, col } = this.getTilePosition(event);

    if (
      (Math.abs(row - this.selectedTile.row) === 1 && col === this.selectedTile.col) ||
      (Math.abs(col - this.selectedTile.col) === 1 && row === this.selectedTile.row)
    ) {
      this.swapTiles(this.selectedTile, { row, col });
      this.checkMatches();
    }
    this.selectedTile = null;
  }

  swapTiles(tile1, tile2) {
    const temp = this.grid[tile1.row][tile1.col];
    this.grid[tile1.row][tile1.col] = this.grid[tile2.row][tile2.col];
    this.grid[tile2.row][tile2.col] = temp;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }

  checkMatches() {
    let matches = [];

    // Check for horizontal matches
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize - 2; col++) {
        if (
          this.grid[row][col] === this.grid[row][col + 1] &&
          this.grid[row][col] === this.grid[row][col + 2]
        ) {
          matches.push({ row, col }, { row, col: col + 1 }, { row, col: col + 2 });
        }
      }
    }

    // Check for vertical matches
    for (let col = 0; col < this.gridSize; col++) {
      for (let row = 0; row < this.gridSize - 2; row++) {
        if (
          this.grid[row][col] === this.grid[row + 1][col] &&
          this.grid[row][col] === this.grid[row + 2][col]
        ) {
          matches.push({ row, col }, { row: row + 1, col }, { row: row + 2, col });
        }
      }
    }

    if (matches.length > 0) {
      matches.forEach(({ row, col }) => (this.grid[row][col] = this.getRandomColor()));
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
    }
  }
}

export default () => {
  new CrushGame();
};
