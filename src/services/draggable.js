import { localStorageService } from '@/services';
import { assignStyleOnElement } from '@/utlis';
import { isMobileDevice } from '@/config';

const defaultArguments = {
  x_position: null,
  y_position: null,
};

export class DragElement {
  constructor(elmnt, { x_position = null, y_position = null } = defaultArguments) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.elmnt = elmnt;
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;

    if (isMobileDevice) {
      this.addMobileListener();
      return;
    }

    const heder = document.getElementById(`${elmnt.id}header`);

    if (heder) {
      // if present, the header is where you move the DIV from:
      heder.onmousedown = this.dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = this.dragMouseDown;
    }
  }

  addMobileListener() {
    let mobileX = 0;
    let mobileY = 0;
    this.elmnt.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const { clientX, clientY } = e.touches[0];
      const isBlocking = this.checkIsMoveBlocking(clientX, clientY);
      if (isBlocking) return;
      const x_position = clientX - mobileX;
      const y_position = clientY - mobileY;
      localStorageService.updateConfig({ x_position, y_position });
      this.x_position = x_position;
      this.y_position = y_position;
      assignStyleOnElement(this.elmnt.style, {
        left: `${x_position}px`,
        top: `${y_position}px`,
      });
    });
    this.elmnt.addEventListener('touchstart', (e) => {
      const { clientX, clientY } = e.touches[0];
      const { left, top } = e.target.getBoundingClientRect();
      mobileX = clientX - left - 10;
      mobileY = clientY - top - 10;
    });
  }

  closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  checkIsMoveBlocking = (x, y) => {
    return x <= 0 || y <= 0;
  };

  elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    // Determine the maximum allowable x and y coordinates
    const maxX = window.innerWidth - this.elmnt.offsetWidth;
    const maxY = window.innerHeight - this.elmnt.offsetHeight;

    // Calculate the new position
    let x_position = this.elmnt.offsetLeft - this.pos1;
    let y_position = this.elmnt.offsetTop - this.pos2;

    // Ensure the new position stays within bounds
    x_position = Math.min(maxX, Math.max(0, x_position));
    y_position = Math.min(maxY, Math.max(0, y_position));

    localStorageService.updateConfig({ x_position, y_position });

    assignStyleOnElement(this.elmnt.style, {
      top: `${y_position}px`,
      left: `${x_position}px`,
    });
  };

  dragMouseDown = (e) => {
    e = e || window.event;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  };
}
