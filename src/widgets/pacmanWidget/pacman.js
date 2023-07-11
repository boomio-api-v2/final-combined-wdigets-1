// import { widgetHtmlService, DragElement } from '@/services';
// import { DragElement } from '@/services';
// import { closeIcon } from '@/сonstants/icons';
import './styles.css';
// import { QrCodeModal } from '@/services';
const styles = [['free', 'bottomb', 'free', 'bottomb', 'free'], ['free', 'free', 'free', 'free', 'free'], ['rightb', 'bottomb', 'free', 'bottomb', 'leftb'], ['free', 'free', 'free', 'free', 'free']];
// const styles = [['free', 'bottomb', 'free', 'bottomb', 'free'], ['rightb', 'free', 'free', 'rightb', 'free'], ['free', 'free', 'free', 'free', 'free'], ['rightb', 'bottomb', 'free', 'bottomb', 'leftb'], ['free', 'free', 'free', 'free', 'free']];


class PackmanWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    let maze = new Maze(styles.length, styles[0].length, false)
    document.getElementById('maze').innerHTML = '';
    maze.drawMaze();

  };
}
class Maze {

  constructor(row = 0, col = 0) {
    this.coordinates = [2, 2];
    this.row = row;
    this.col = col;
    this.rows = [];
    this.size = this.row * this.col;
    this.cells = [];
    this.html();
  }
  drawMaze() {
    for (let r = 0; r < this.row; r++) {
      this.rows[r] = new Row(r, this);
    }
    this.pickYou(this.coordinates[0], this.coordinates[1]);
    this.enableMovement();
  }

  arrowsToMaze = (e) => {
    const key = e.key;
    if (key === 'ArrowLeft' || key === 'a') { e.preventDefault(); this.moveLeft(); }
    if (key === 'ArrowRight' || key === 'd') { e.preventDefault(); this.moveRight(); }
    if (key === 'ArrowUp' || key === 'w') { e.preventDefault(); this.moveUp(); }
    if (key === 'ArrowDown' || key === 's') { e.preventDefault(); this.moveDown(); }
  }
  enableMovement() {
    const mazeEl = document.getElementById('maze')
    document.addEventListener('keydown', this.arrowsToMaze)
    let xDown = null;
    let yDown = null;
    mazeEl.addEventListener('touchstart', (e) => {
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    });
    mazeEl.addEventListener('touchend', (e) => {
      if (!xDown || !yDown) {
        return;
      }
      const xUp = e.changedTouches[0].pageX;
      const yUp = e.changedTouches[0].pageY;
      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      } else {
        if (yDiff > 0) {
          this.moveUp();
        } else {
          this.moveDown();
        }
      }
      xDown = null;
      yDown = null;
    });
  }
  pickYou(r, c) {
    this.you = this.cells.find((cell) => cell.row === r && cell.col === c);
    this.you.visited = true
    this.you.setPacman();
    this.you.removeClass('dotted')
    if (!this.cells.some(e => e.visited === false)) {
      alert('you made it')
      // const element = document.getElementById('maze-container');
      // if (element) {
      //   document.removeEventListener('keydown', this.arrowsToMaze);
      //   element.remove();
      // }
      // new QrCodeModal();
    }
  }
  unpickYou(r, c) {
    this.you = this.cells.find((cell) => cell.row === r && cell.col === c);
    // this.you.removeClass('you');
    this.you.removePacman()
  }
  moveRight() {
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    eyeEl.style.right = '4px'
    eyeEl.style.top = '2px'
    mouthEl.style.animationName = 'eat-right'
    if (this.coordinates[1] >= this.col - 1) return
    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('right') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] + 1).style.includes('left')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    mouthEl.style.animationName = 'eat-right'
    eyeEl.style.right = '4px'
    eyeEl.style.top = '2px'
  }
  moveLeft() {
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    eyeEl.style.right = '6px'
    eyeEl.style.top = '2px'
    mouthEl.style.animationName = 'eat-left'
    if (this.coordinates[1] <= 0) return
    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('left') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] - 1).style.includes('right')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    mouthEl.style.animationName = 'eat-left'
    eyeEl.style.right = '6px'
    eyeEl.style.top = '2px'
  }
  moveUp() {
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    eyeEl.style.right = '2px'
    eyeEl.style.top = '4px'
    mouthEl.style.animationName = 'eat-up'
    if (this.coordinates[0] <= 0) return
    if (this.cells.find(cell => cell.row === this.coordinates[0] - 1 && cell.col === this.coordinates[1]).style.includes('bottom')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    mouthEl.style.animationName = 'eat-up'
    eyeEl.style.right = '2px'
    eyeEl.style.top = '4px'
  }
  moveDown() {
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    eyeEl.style.right = '2px'
    eyeEl.style.top = '4px'
    mouthEl.style.animationName = 'eat-down'
    if (this.coordinates[0] >= this.row - 1) return
    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('bottom')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    mouthEl.style.animationName = 'eat-down'
    eyeEl.style.right = '2px'
    eyeEl.style.top = '4px'
  }

  html(name) {
    const animEl = document.createElement('div');
    animEl.style.position = 'absolute';
    animEl.style.top = `100px`;
    animEl.style.left = `100px`;
    animEl.style.width = `200px`;
    animEl.style.height = `200px`;
    animEl.id = 'maze-container';
    let table = document.getElementById('maze');
    if (!table) {
      table = document.createElement('table');
      table.id = 'maze';
      table.className = 'pacman-field'
      table.style.position = 'absolute';
      table.style.top = `20px`;
      table.style.left = `20px`;
      if (document && document.body) {
        this.addCloseIconToElement(animEl);
        animEl.appendChild(table);
        document.body.appendChild(animEl);
      } else {
        alert('Make sure to run maze.js inside an html page, with a present body tag');
      }
    }

    return table;
  }
  addCloseIconToElement = (element) => {
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-icon');
    closeBtn.innerHTML = '&#x2715; ';
    closeBtn.addEventListener(
      'click',
      (e) => {
        document.removeEventListener('keydown', this.arrowsToMaze)
        e.stopPropagation();
        e.preventDefault();
        element.remove();
      },
      { once: true },
    );
    element.appendChild(closeBtn);
  };
}
class Row {
  constructor(row = 0, maze) {
    this.row = row;
    this.maze = maze;
    this.cells = [];
    this.route = [];
    this.html();
    this.createCells();
  }

  html() {
    let row = document.getElementById('row_' + this.row.toString());
    if (!row) {
      row = document.createElement('tr');
      row.id = 'row_' + this.row.toString();
      this.maze.html().appendChild(row);
    }
    return row;
  }

  createCells() {
    for (let c = 0; c < this.maze.col; c++) {
      let cell = new Cell(this.row, c);
      this.cells.push({ col: cell.col, row: cell.row });
      this.maze.cells.push(cell);
      this.html().appendChild(cell.html());
    }
  }
}
class Cell {
  constructor(row = 0, col = 0) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.style = styles[this.row][this.col];
  }

  html(style) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    if (!cell) {
      cell = document.createElement('td');
      cell.id = 'cell_' + this.row + '.' + this.col;
      if (!style) {
        cell.className = this.style;
        cell.style.width = '12px';
        cell.style.height = '12px';
      } else {
        cell.className = cell.className + ' ' + style;
        cell.style.width = '12px';
        cell.style.height = '12px';
      }
    }
    if (style) {
      cell.className = cell.className + ' ' + style;
      cell.style.width = '12px';
      cell.style.height = '12px';
    }
    cell.className = cell.className + " " + 'dotted';
    return cell;
  }
  setPacman() {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    cell.innerHTML = `  <div class="pacman">
    <div class="pacman__eye" id="eye"></div>
    <div class="pacman__mouth" id="mouth"></div>
  
  </div>`
  }

  removePacman() {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    cell.innerHTML = ``
  }

  removeClass(cls) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    cell.classList.remove(cls);
    return cell;
  }
}

let packmanWidget = null;

export default () => {
  if (!packmanWidget) {
    packmanWidget = new PackmanWidget();
  }
};
