// import { widgetHtmlService, DragElement } from '@/services';
// import { DragElement } from '@/services';
// import { closeIcon } from '@/сonstants/icons';
import './styles.css';
import { QrCodeModal } from '@/services';
import { giftImage } from '@/сonstants/icons';


class PackmanWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    let maze = new Maze(50, 50, false)
    document.getElementById('maze').innerHTML = '';
    maze.drawMaze();

  };
}
class Maze {

  constructor(row = 0, col = 0) {
    this.coordinates = [Math.floor(Math.random() * 45) + 3, 2];
    // this.coordinates = [2, 2];
    // this.goal = [2, 40]
    this.goal = [Math.floor(Math.random() * 45) + 3, 40]
    this.row = row;
    this.col = col;
    this.rows = [];
    this.size = this.row * this.col;
    this.direction = 'none'
    this.prize = false
    this.speed = 300
    this.cells = [];
    this.html();
  }
  drawMaze() {
    for (let r = 0; r < this.row; r++) {
      this.rows[r] = new Row(r, this);
    }
    this.pickYou(this.coordinates[0], this.coordinates[1]);
    setTimeout(() => {
      this.pickGoal(this.goal[0], this.goal[1])
    }, 1000);
    setTimeout(() => { this.pickDots(this.coordinates[0], this.coordinates[1] + 1, this.goal[0] - 1, this.goal[1]) }, 1500)
    this.enableMovement();
  }

  arrowsToMaze = (e) => {
    const key = e.key;

    if (key === "ArrowLeft" || key === "a") {
      e.preventDefault()
      this.direction = 'left'
      let i = setInterval(() => { this.moveLeft(); if (this.direction != 'left') clearInterval(i) }, this.speed)
    }

    if (key === "ArrowRight" || key === "d") {
      e.preventDefault()
      this.direction = 'right'
      let i = setInterval(() => {
        this.moveRight(); if (this.direction != 'right') clearInterval(i)
      }, this.speed)
    }

    if (key === "ArrowUp" || key === "w") {
      e.preventDefault()
      this.direction = 'up'
      let i = setInterval(() => { this.moveUp(); if (this.direction != 'up') clearInterval(i) }, this.speed)
    }

    if (key === "ArrowDown" || key === "s") {
      e.preventDefault()
      this.direction = 'down'
      let i = setInterval(() => { this.moveDown(); if (this.direction != 'down') clearInterval(i) }, this.speed)
    }


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
          {
            this.direction = 'left'
            let i = setInterval(() => { this.moveLeft(); if (this.direction != 'left') clearInterval(i) }, this.speed)
          }
        } else {
          {
            this.direction = 'right'
            let i = setInterval(() => {
              this.moveRight(); if (this.direction != 'right') clearInterval(i)
            }, this.speed)
          }
        }
      } else {
        if (yDiff > 0) {
          {
            this.direction = 'up'
            let i = setInterval(() => { this.moveUp(); if (this.direction != 'up') clearInterval(i) }, this.speed)
          }
        } else {
          {
            this.direction = 'down'
            let i = setInterval(() => { this.moveDown(); if (this.direction != 'down') clearInterval(i) }, this.speed)
          }
        }
      }
      xDown = null;
      yDown = null;
    });
  }
  pickYou(r, c) {
    if (!document.getElementById('maze')) return
    this.you = this.cells.find((cell) => cell.row === r && cell.col === c);
    // this.you.visited = true
    this.you.setPacman();
    // this.you.removeClass('dotted')
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        this.eaten = this.cells.find((cell) => cell.row === r + y && cell.col === c + x)
        if (this.eaten) this.eaten.removeClass('dotted')
      }
    }
    if ((this.goal[0] - r < 3 && this.goal[0] - r > -3) && (this.goal[1] - c < 3 && this.goal[1] - c > -3)) {
      const element = document.getElementById('maze-container');
      if (element) {
        document.removeEventListener('keydown', this.arrowsToMaze);
        element.remove();
      }
      new QrCodeModal();
    }
  }
  unpickYou(r, c) {
    this.you = this.cells.find((cell) => cell.row === r && cell.col === c);
    // this.you.removeClass('you');
    this.you.removePacman()
  }
  pickGoal(r, c) {
    if (!document.getElementById('maze-container')) return
    this.cells.find(cell => cell.row === r && cell.col === c).setPrize()
  }

  pickDots(rStart, cStart, rEnd, cEnd) {
    const rand = Math.floor(Math.random() * 5) + 2
    const direction = (rStart < rEnd) ? 1 : -1
    let r = rStart
    let c = cStart
    let i = setInterval(() => {
      this.dot = this.cells.find((cell) => cell.row === r && cell.col === c);

      if (!document.getElementById('maze-container'))
        clearInterval(i)
      this.dot.addClass('dotted');
      if (c < Math.floor((cEnd - cStart) / rand)) {
        c++
      } else if (direction * (r - rStart) < direction * Math.floor((rEnd - rStart) / (rand))) {
        r += direction
      } else if (c < Math.floor((cEnd - cStart) / (rand - 1))) {
        c++
      } else if (direction * (r - rStart) < direction * Math.floor((rEnd - rStart) / (rand - 1))) {
        r += direction
      } else if (c < cEnd) {
        c++
      } else {
        debugger
        r += direction
      }
      if (c === cEnd & r === rEnd) clearInterval(i)
    }, 50)
  }

  moveRight() {
    if (!document.getElementById('maze-container')) return
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-right'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-right'
    if (this.coordinates[1] >= this.col - 1) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-right'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-right'
  }
  moveLeft() {
    if (!document.getElementById('maze-container')) return
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-left'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-left'
    if (this.coordinates[1] <= 0) return
    // if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('left') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] - 1).style.includes('right')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-left'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-left'
  }
  moveUp() {
    if (!document.getElementById('maze-container')) return
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-up'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-up'
    if (this.coordinates[0] <= 0) return
    // if (this.cells.find(cell => cell.row === this.coordinates[0] - 1 && cell.col === this.coordinates[1]).style.includes('bottom')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-up'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-up'
  }
  moveDown() {
    if (!document.getElementById('maze-container')) return
    let mouthEl = document.getElementById('mouth')
    let eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-down'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-down'
    if (this.coordinates[0] >= this.row - 1) return
    // if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('bottom')) return
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
    mouthEl = document.getElementById('mouth')
    eyeEl = document.getElementById('eye')
    if (eyeEl) eyeEl.classList = 'pacman__eye eye-down'
    if (mouthEl) mouthEl.classList = 'pacman__mouth mouth-down'
  }

  html(name) {
    const animEl = document.createElement('div');
    animEl.style.position = 'absolute';
    animEl.style.top = `20px`;
    animEl.style.left = `20px`;
    animEl.style.width = `100%`;
    animEl.style.height = `100%`;
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
    // this.style = styles[this.row][this.col];
    this.style = 'free';
  }

  html(style) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    if (!cell) {
      cell = document.createElement('td');
      cell.id = 'cell_' + this.row + '.' + this.col;
      cell.className = this.style;

      // if (!style) {
      //   cell.style.width = '12px';
      //   cell.style.height = '12px';
      // } else {
      //   cell.className = cell.className + ' ' + style;
      //   cell.style.width = '12px';
      //   cell.style.height = '12px';
      // }
    }
    // if (style) {
    //   cell.className = cell.className + ' ' + style;
    //   cell.style.width = '12px';
    //   cell.style.height = '12px';
    // }
    // cell.className = cell.className + " " + 'dotted';
    return cell;
  }
  setPacman() {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    if (cell.classList.contains('dotted')) {

      cell.innerHTML = `  <div class="pacman">
      <div class="pacman__eye red" id="eye"></div>
      <div class="pacman__mouth" id="mouth"></div>
    
    </div>`
    } else {
      cell.innerHTML = `  <div class="pacman">
      <div class="pacman__eye" id="eye"></div>
      <div class="pacman__mouth" id="mouth"></div>
    
    </div>`
    }

  }

  removePacman() {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    cell.innerHTML = ``
  }

  setPrize() {
    if (!document.getElementById('maze-container')) return
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    cell.innerHTML = `  <img class="prize" src=${giftImage} >`
  }

  addClass(cls) {
    if (!document.getElementById('maze-container')) return
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    cell.classList.add(cls);
    return cell;
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
