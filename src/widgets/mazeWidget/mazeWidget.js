import { widgetHtmlService, DragElement } from '@/services';
import { closeIcon } from '@/сonstants/icons';
import './styles.css';
// import Maze from './maze';

// let maze = new Maze(6, 6, true);
const styles = ["bottom", "right", "left"]; //you can change the level difficulty by changing the styles 
// var colors = ["red", "green", "orange", "gray", "purple", "blue", "yellow"];
// //global functions
const rand = (t) => {
  return Math.floor((Math.random() * t));
}

class MazeWidget {
  constructor() {
    this.startAnimation();
  }


  startAnimation = () => {

    let maze = new Maze(8, 8, true)
    maze.drawMaze()
    const width = 600;
    const height = 372;
    const { clientWidth, clientHeight } = document.documentElement;
    const posx = ((clientWidth - width) / 2).toFixed();
    const posy = ((clientHeight - height) / 2).toFixed();
    const animationEl = document.createElement('div');
    animationEl.style.position = 'absolute';
    animationEl.style.top = `${posy}px`;
    animationEl.style.left = `${posx}px`;
    animationEl.style.width = `${width}px`;
    animationEl.style.height = `${height}px`;
    animationEl.id = 'maze-container';

    // animationEl.appendChild(table)
    // document.body.appendChild(animationEl);
    new DragElement(animationEl);

    function closeModalDiscount() {
      removeWidgets();

      animationEl.remove();
    }


    function removeWidgets() {
      const element = document.getElementById('boomio-widget-screen-wrapper-content');
      if (element) {
        element.remove();
      }
      widgetHtmlService.createWidgetContainer();
    }

    animationEl.innerHTML = `
    <div  class='position-relative product-design-bg-2 Preview-select' style='z-index:10000000000000; min-width: 260px;min-height: 320px; padding: 20px 0px;position:relative;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border: 1px solid #ddd' id='widget_test'>
    <div class='close_button align-right'>
    <img src='${closeIcon}' width='30' height='30' alt='' id="close_div_img">

        </div>
        <h2>Widžeta dėti čia</h2>
            </div>
   
      
    `;


    document.getElementById('close_div_img').onclick = closeModalDiscount;
    // document.getElementById('remove_div_btn').onclick = removeWidgets;

  };


}
class Maze {
  //1. creates a random maze given width and height of the board and displays it. we have a default value
  constructor(row = 0, col = 0, can_be_solved = false, head = 0, tail = 0) {
    this.coordinates = [0, 0]
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

    // this.showHTML()

  }
  //3. shows the shortest route between starting point and destination 
  drawMaze() {
    for (let r = 0; r < this.row; r++) {
      this.rows[r] = new Row(r, this);
    }
    this.pickHeadTail();
    this.pickYou(this.coordinates[0], this.coordinates[1]);
    this.enableMovement()


    console.log('can be solved', this.cbs)
    //now pick head and tail
    //work to detect success path, this can be done in different ways
    //          this.routeStyle();
    // this.you()
    if (!this.solved) {
      if (this.cbs) {
        console.log("Drawing a maze now");
        maze = new Maze(this.row, this.col, true);
        document.getElementById("maze").innerHTML = "";
        maze.drawMaze();
      } else {
        alert("This maze can't be solved, refresh the page or set can_be_solved to true when you create a maze instance");
      }
    }
    console.log(this.solved);
  }

  pickHeadTail() {
    // this.head = this.rows[0].cells[rand(this.col)];
    this.head = this.rows[0].cells[0];
    this.head = this.cells.find(cell => cell.row === this.head.row && cell.col === this.head.col);
    this.head.style = "head";
    this.head.html("head");

    // this.tail = this.rows[this.row - 1].cells[rand(this.col)];
    this.tail = this.rows[this.row - 1].cells[this.col - 1];
    this.tail = this.cells.find(cell => cell.row === this.tail.row && cell.col === this.tail.col);
    this.tail.style = "tail";
    this.tail.html("tail");
    //not a good idea to try to catch range error of memory stack size exceeded, perforamnce degradation 
    //try {
    this.solved = this.drawRoute(this.head);
    console.log('solved', this.solved)
    //just to make sure head and tail were set when we call this guy
    //}catch(e){
    // console.log("I will generated another one now");
    // }
  }
  enableMovement() {

    let counter = 0
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === "ArrowLeft" || key === "a") this.moveLeft()
      if (key === "ArrowRight" || key === "d") {
        counter++
        console.log(counter); this.moveRight()
      }
      if (key === "ArrowUp" || key === "w") this.moveUp()
      if (key === "ArrowDown" || key === "s") this.moveDown()
    });

    let xDown = null;
    let yDown = null;

    document.addEventListener('touchstart', (e) => {
      xDown = e.touches[0].clientX
      yDown = e.touches[0].clientY

    });

    document.addEventListener('touchend', (e) => {
      if (!xDown || !yDown) {
        return;
      }
      const xUp = e.changedTouches[0].pageX
      const yUp = e.changedTouches[0].pageY
      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.moveLeft()
        } else {
          this.moveRight()
        }
      } else {
        if (yDiff > 0) {
          this.moveUp()
        } else {
          this.moveDown()
        }
      }
      xDown = null;
      yDown = null;
    });
  }

  pickYou(r, c) {
    this.you = this.cells.find(cell => cell.row === r && cell.col === c);
    this.you.html("you");
  }
  unpickYou(r, c) {
    this.you = this.cells.find(cell => cell.row === r && cell.col === c);
    this.you.removeClass("you");
  }
  moveRight() {
    if (this.coordinates[1] >= this.col - 1) return
    // console.log(this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('right') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] + 1).style.includes('left'))
    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('right') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] + 1).style.includes('left')) return
    // console.log('right')
    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
  }
  moveLeft() {
    // console.log(this.coordinates)
    if (this.coordinates[1] <= 0) return
    // console.log(this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('left') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]-1).style.includes('right'))
    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('left') || this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1] - 1).style.includes('right')) return

    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[1]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
  }
  moveUp() {
    if (this.coordinates[0] <= 0) return
    // console.log(this.coordinates)
    console.log(this.cells.find(cell => cell.row === this.coordinates[0] - 1 && cell.col === this.coordinates[1]).style.includes('bottom'))
    if (this.cells.find(cell => cell.row === this.coordinates[0] - 1 && cell.col === this.coordinates[1]).style.includes('bottom')) return

    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]--
    this.pickYou(this.coordinates[0], this.coordinates[1])
  }
  moveDown() {
    if (this.coordinates[0] >= this.row - 1) return

    console.log(this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('bottom'))

    if (this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]).style.includes('bottom')) return

    console.log(this.cells.find(cell => cell.row === this.coordinates[0] && cell.col === this.coordinates[1]))

    this.unpickYou(this.coordinates[0], this.coordinates[1])
    this.coordinates[0]++
    this.pickYou(this.coordinates[0], this.coordinates[1])
  }


  drawRoute(cell) {

    console.log(this.steps++);
    //      console.log("cell in call", cell);
    if (this.steps > this.row * this.col) { //this to minimize an overstack error possiblity 
      console.log("exceeded our intentions");
      return false;
    }

    if (cell.style === "tail") {
      return true;
    }

    let visited = this.visited.find(cell_ => cell_ === cell);

    if ((visited)) {
      return false;
    }

    this.visited.push(cell);

    let bottom_cell = this.cells.find(cell_ => cell_.row === (cell.row + 1) && cell_.col === (cell.col)); //indicates an available bottom route
    let visited_bottom_cell = this.visited.find(cell_ => cell_ === bottom_cell); //indicates a visited bottom route

    let left_cell = this.cells.find(cell_ => cell_.row === cell.row && cell_.col === (cell.col - 1));
    let visited_left_cell = this.visited.find(cell_ => cell_ === left_cell);
    let right_cell = this.cells.find(cell_ => cell_.row === cell.row && cell_.col === (cell.col + 1));
    let visited_right_cell = this.visited.find(cell_ => cell_ === right_cell);
    let top_cell = this.cells.find(cell_ => cell_.row === (cell.row - 1) && cell_.col === (cell.col));
    let visited_top_cell = this.visited.find(cell_ => cell_ === top_cell);


    if (cell.style !== "bottom" && bottom_cell && bottom_cell.col === cell.col && visited_bottom_cell === undefined && this.drawRoute(bottom_cell)) {
      this.route.push(cell);
      //        console.log("cell is not bottom:", cell);
      //       console.log("and we checked on ", bottom_cell);
      return true;
    }

    if (cell.col >= this.tail.col) { //this check here helps in finding a shorter path to tail. Smarter vs Faster, your call :)
      if (left_cell && left_cell.style !== "right" && cell.style !== "left") {
        if (visited_left_cell === undefined && this.drawRoute(left_cell)) {
          this.route.push(cell);
          //          console.log("cell is not left:", cell);
          //          console.log("and we checked on ", left_cell);
          return true;
        }
      }
      if (right_cell && right_cell.style !== "left" && cell.style !== "right") {
        if (visited_right_cell === undefined && this.drawRoute(right_cell)) {
          this.route.push(cell);
          //          console.log("cell is not right:", cell);
          //          console.log("and we checked on ", right_cell);
          return true;
        }
      }
    } else {
      if (right_cell && right_cell.style !== "left" && cell.style !== "right") {
        if (visited_right_cell === undefined && this.drawRoute(right_cell)) {
          this.route.push(cell);
          //          console.log("cell is not right:", cell);
          //          console.log("and we checked on ", right_cell);
          return true;
        }
      }
      if (left_cell && left_cell.style !== "right" && cell.style !== "left") {
        if (visited_left_cell === undefined && this.drawRoute(left_cell)) {
          this.route.push(cell);
          //          console.log("cell is not left:", cell);
          //          console.log("and we checked on ", left_cell);
          return true;
        }
      }
    }

    if (top_cell && top_cell.style !== "bottom" && visited_top_cell === undefined && this.drawRoute(top_cell)) {
      this.route.push(cell);
      //      console.log("cell is not bottom:", cell);
      //      console.log("and we checked on ", top_cell );
      return true;
    }
    return false;
  }

  routeStyle() {
    for (let i = 0; i < this.route.length; i++) {
      this.route[i].html("route " + i.toString());
    }
  }
  html() {
    let table = document.getElementById("maze");
    if (!table) {

      table = document.createElement("table");
      table.id = "maze";
      table.style.position = 'absolute';
      table.style.top = `100px`;
      table.style.left = `100px`;
      if (document && document.body) {
        document.body.appendChild(table);

      }
      else {
        alert("Make sure to run maze.js inside an html page, with a present body tag");
      }
    }
    console.log(table)
    return table;

  }

};
class Row {
  constructor(row = 0, maze) {
    this.row = row;
    this.maze = maze;
    this.cells = [];
    this.route = [];
    this.html();
    this.createCells();
    //  this.headAndTail();
  }

  html() {
    let row = document.getElementById("row_" + this.row.toString());
    if (!row) {
      row = document.createElement("tr");
      row.id = "row_" + this.row.toString();
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
    }

  }
};
class Cell {
  constructor(row = 0, col = 0) {
    this.row = row;
    this.col = col;
    //  this.head = false;
    // this.tail = false;
    this.blocked = false;
    // this.position = {row,col};
    this.style = styles[rand(styles.length)];
  }

  html(style) {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    if (!cell) {
      cell = document.createElement("td");
      cell.id = "cell_" + this.row + "." + this.col;
      if (!style) {
        cell.className = this.style;
      }
      else {
        cell.className = cell.className + " " + style;
      }
    }
    if (style) {
      cell.className = cell.className + " " + style;
    }
    return cell;
  }
  removeClass(cls) {
    let cell = document.getElementById("cell_" + this.row + "." + this.col);
    cell.classList.remove(cls);
    return cell;
  }

};

let mazeWidget = null;

export default () => {
  if (!mazeWidget) {
    mazeWidget = new MazeWidget();
  }
};
