// import { widgetHtmlService, DragElement } from '@/services';
// import { DragElement } from '@/services';
// import { closeIcon } from '@/сonstants/icons';
import './styles.css';
import { QrCodeModal } from '@/services';
const styles = ['bottom', 'right', 'left'];
const rand = (t) => {
  return Math.floor(Math.random() * t);
};
let solved = false;

class MazeWidget {
  constructor() {
    this.startAnimation();
  }

  startAnimation = () => {
    while (!solved) {
      let maze = new Maze(5, 5, false);
      document.getElementById('maze').innerHTML = '';
      maze.drawMaze();
    }
  };
}
class Maze {
  //1. creates a random maze given width and height of the board and displays it. we have a default value
  constructor(row = 0, col = 0, can_be_solved = false, head = 0, tail = 0) {
    this.coordinates = [0, 0];
    this.row = row;
    this.col = col;
    this.rows = [];
    this.steps = 0;
    this.route = [];
    this.visited = [];
    this.size = this.row * this.col;
    this.cells = [];
    this.cbs = can_be_solved;
    this.solved = false;
    this.head = head; //the start point to the maze
    this.tail = tail; //the exit point from a maze
    this.html();
  }
  drawMaze() {
    for (let r = 0; r < this.row; r++) {
      this.rows[r] = new Row(r, this);
    }
    this.pickHeadTail();
    solved = this.solved;
    if (solved) {
      this.pickYou(this.coordinates[0], this.coordinates[1]);
      this.enableMovement();
    }
  }
  pickHeadTail() {
    this.head = this.rows[0].cells[0];
    this.head = this.cells.find((cell) => cell.row === this.head.row && cell.col === this.head.col);
    this.head.style = 'head';
    this.head.html('head');
    this.tail = this.rows[this.row - 1].cells[this.col - 1];
    this.tail = this.cells.find((cell) => cell.row === this.tail.row && cell.col === this.tail.col);
    this.tail.style = 'tail';
    this.tail.html('tail');
    this.solved = this.drawRoute(this.head);
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
    this.you.setClass('you');

    if ((r === this.row - 1) & (c === this.col - 1)) {
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
    this.you.removeClass('you');
  }
  moveRight() {
    if (this.coordinates[1] >= this.col - 1) return;
    if (
      this.cells
        .find((cell) => cell.row === this.coordinates[0] && cell.col === this.coordinates[1])
        .style.includes('right') ||
      this.cells
        .find((cell) => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] + 1)
        .style.includes('left')
    )
      return;
    this.unpickYou(this.coordinates[0], this.coordinates[1]);
    this.coordinates[1]++;
    this.pickYou(this.coordinates[0], this.coordinates[1]);
  }
  moveLeft() {
    if (this.coordinates[1] <= 0) return;
    if (
      this.cells
        .find((cell) => cell.row === this.coordinates[0] && cell.col === this.coordinates[1])
        .style.includes('left') ||
      this.cells
        .find((cell) => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] - 1)
        .style.includes('right')
    )
      return;
    this.unpickYou(this.coordinates[0], this.coordinates[1]);
    this.coordinates[1]--;
    this.pickYou(this.coordinates[0], this.coordinates[1]);
  }
  moveUp() {
    if (this.coordinates[0] <= 0) return;
    if (
      this.cells
        .find((cell) => cell.row === this.coordinates[0] - 1 && cell.col === this.coordinates[1])
        .style.includes('bottom')
    )
      return;
    this.unpickYou(this.coordinates[0], this.coordinates[1]);
    this.coordinates[0]--;
    this.pickYou(this.coordinates[0], this.coordinates[1]);
  }
  moveDown() {
    if (this.coordinates[0] >= this.row - 1) return;
    if (
      this.cells
        .find((cell) => cell.row === this.coordinates[0] && cell.col === this.coordinates[1])
        .style.includes('bottom')
    )
      return;
    this.unpickYou(this.coordinates[0], this.coordinates[1]);
    this.coordinates[0]++;
    this.pickYou(this.coordinates[0], this.coordinates[1]);
  }
  drawRoute(cell) {
    if (this.steps > this.row * this.col) {
      //this to minimize an overstack error possiblity
      console.log('exceeded our intentions');
      return false;
    }
    if (cell.style === 'tail') {
      return true;
    }

    let visited = this.visited.find((cell_) => cell_ === cell);

    if (visited) {
      return false;
    }

    this.visited.push(cell);

    let bottom_cell = this.cells.find(
      (cell_) => cell_.row === cell.row + 1 && cell_.col === cell.col,
    ); //indicates an available bottom route
    let visited_bottom_cell = this.visited.find((cell_) => cell_ === bottom_cell); //indicates a visited bottom route

    let left_cell = this.cells.find(
      (cell_) => cell_.row === cell.row && cell_.col === cell.col - 1,
    );
    let visited_left_cell = this.visited.find((cell_) => cell_ === left_cell);
    let right_cell = this.cells.find(
      (cell_) => cell_.row === cell.row && cell_.col === cell.col + 1,
    );
    let visited_right_cell = this.visited.find((cell_) => cell_ === right_cell);
    let top_cell = this.cells.find((cell_) => cell_.row === cell.row - 1 && cell_.col === cell.col);
    let visited_top_cell = this.visited.find((cell_) => cell_ === top_cell);

    if (
      cell.style !== 'bottom' &&
      bottom_cell &&
      bottom_cell.col === cell.col &&
      visited_bottom_cell === undefined &&
      this.drawRoute(bottom_cell)
    ) {
      this.route.push(cell);
      //  console.log("cell is not bottom:", cell);
      // console.log("and we checked on ", bottom_cell);
      return true;
    }

    if (cell.col >= this.tail.col) {
      //this check here helps in finding a shorter path to tail. Smarter vs Faster, your call :)
      if (left_cell && left_cell.style !== 'right' && cell.style !== 'left') {
        if (visited_left_cell === undefined && this.drawRoute(left_cell)) {
          this.route.push(cell);
          //          console.log("cell is not left:", cell);
          //          console.log("and we checked on ", left_cell);
          return true;
        }
      }
      if (right_cell && right_cell.style !== 'left' && cell.style !== 'right') {
        if (visited_right_cell === undefined && this.drawRoute(right_cell)) {
          this.route.push(cell);
          //          console.log("cell is not right:", cell);
          //          console.log("and we checked on ", right_cell);
          return true;
        }
      }
    } else {
      if (right_cell && right_cell.style !== 'left' && cell.style !== 'right') {
        if (visited_right_cell === undefined && this.drawRoute(right_cell)) {
          this.route.push(cell);
          //          console.log("cell is not right:", cell);
          //          console.log("and we checked on ", right_cell);
          return true;
        }
      }
      if (left_cell && left_cell.style !== 'right' && cell.style !== 'left') {
        if (visited_left_cell === undefined && this.drawRoute(left_cell)) {
          this.route.push(cell);
          //          console.log("cell is not left:", cell);
          //          console.log("and we checked on ", left_cell);
          return true;
        }
      }
    }

    if (
      top_cell &&
      top_cell.style !== 'bottom' &&
      visited_top_cell === undefined &&
      this.drawRoute(top_cell)
    ) {
      this.route.push(cell);
      //      console.log("cell is not bottom:", cell);
      //      console.log("and we checked on ", top_cell );
      return true;
    }
    return false;
  }
  routeStyle() {
    for (let i = 0; i < this.route.length; i++) {
      this.route[i].html('route ' + i.toString());
      // console.log(this.route[i])
    }
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
      table.className = 'maze-field'
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
    //we want our head/start cell to be in 0 row, but a random cell
    for (let c = 0; c < this.maze.col; c++) {
      let cell = new Cell(this.row, c);
      this.cells.push({ col: cell.col, row: cell.row });
      this.maze.cells.push(cell);
      this.html().appendChild(cell.html());
      // console.log(this.cells)
      // console.log(this.maze)
    }
  }
}
class Cell {
  constructor(row = 0, col = 0) {
    this.row = row;
    this.col = col;
    this.blocked = false;
    this.style = styles[rand(styles.length)];
  }

  html(style) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    if (!cell) {
      cell = document.createElement('td');
      cell.id = 'cell_' + this.row + '.' + this.col;
      if (!style) {
        cell.className = this.style;
        cell.style.width = '10px';
        cell.style.height = '10px';
      } else {
        cell.className = cell.className + ' ' + style;
        cell.style.width = '10px';
        cell.style.height = '10px';
      }
    }
    if (style) {
      cell.className = cell.className + ' ' + style;
      cell.style.width = '10px';
      cell.style.height = '10px';
    }
    return cell;
  }
  setClass(cls) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    if (!cell.classList.contains(cls)) cell.className = cell.className + ' ' + cls;
  }
  removeClass(cls) {
    let cell = document.getElementById('cell_' + this.row + '.' + this.col);
    cell.classList.remove(cls);
    return cell;
  }
}

let mazeWidget = null;

export default () => {
  if (!mazeWidget) {
    mazeWidget = new MazeWidget();
  }
};
