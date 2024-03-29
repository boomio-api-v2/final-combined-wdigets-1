const { floor } = Math;

// From https://github.com/PaulBGD/PixelFont/blob/master/script.js
// prettier-ignore
const letters = {
        'A': [
            [, 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1]
        ],
        'B': [
            [1, 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, 1]
        ],
        'C': [
            [1, 1, 1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'D': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1]
        ],
        'E': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [1],
            [1, 1, 1]
        ],
        'F': [
            [1, 1, 1],
            [1],
            [1, 1],
            [1],
            [1]
        ],
        'G': [
            [, 1, 1],
            [1],
            [1, , 1, 1],
            [1, , , 1],
            [, 1, 1]
        ],
        'H': [
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, , 1]
        ],
        'I': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [1, 1, 1]
        ],
        'J': [
            [1, 1, 1],
            [, , 1],
            [, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'K': [
            [1, , , 1],
            [1, , 1],
            [1, 1],
            [1, , 1],
            [1, , , 1]
        ],
        'L': [
            [1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'M': [
            [1, 1, 1, 1, 1],
            [1, , 1, , 1],
            [1, , 1, , 1],
            [1, , , , 1],
            [1, , , , 1]
        ],
        'N': [
            [1, , , 1],
            [1, 1, , 1],
            [1, , 1, 1],
            [1, , , 1],
            [1, , , 1]
        ],
        'O': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'P': [
            [1, 1, 1],
            [1, , 1],
            [1, 1, 1],
            [1],
            [1]
        ],
        'Q': [
            [0, 1, 1],
            [1, , , 1],
            [1, , , 1],
            [1, , 1, 1],
            [1, 1, 1, 1]
        ],
        'R': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, 1],
            [1, , 1]
        ],
        'S': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [, , 1],
            [1, 1, 1]
        ],
        'T': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'U': [
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'V': [
            [1, , , , 1],
            [1, , , , 1],
            [, 1, , 1],
            [, 1, , 1],
            [, , 1]
        ],
        'W': [
            [1, , , , 1],
            [1, , , , 1],
            [1, , , , 1],
            [1, , 1, , 1],
            [1, 1, 1, 1, 1]
        ],
        'Y': [
            [1, , 1],
            [1, , 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'Z': [
            [1, 1, 1, 1, 1],
            [, , , 1],
            [, , 1],
            [, 1],
            [1, 1, 1, 1, 1]
        ],
        '0': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        '1': [
            [, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        '2': [
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [1,0,0],
            [1,1,1]
        ],
        '3':[
            [1,1,1],
            [0,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '4':[
            [1,0,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [0,0,1]
        ],
        '5':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        '6':[
            [1,1,1],
            [1,0,0],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '7':[
            [1,1,1],
            [0,0,1],
            [0,0,1],
            [0,0,1],
            [0,0,1]
        ],
        '8':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ],
        '9':[
            [1,1,1],
            [1,0,1],
            [1,1,1],
            [0,0,1],
            [1,1,1]
        ],
        ' ': [
            [, ,],
            [, ,],
            [, ,],
            [, ,],
            [, ,]
        ],
        ':':[
            [0,1,0],
            [0,1,0],
            [0,0,0],
            [0,1,0],
            [0,1,0]
        ],
        '!':[
            [0,1,0],
            [0,1,0],
            [0,1,0],
            [0,0,0],
            [0,1,0]
        ]
};

const FONT_UNIT_HEIGHT = 5;
export function drawText(
  canvas,
  string,
  startX = 0,
  startY = 0,
  pixelHeight = 1,
  color = '#000',
  bgColor = '#CCC',
  alpha = 1.0,
) {
  const size = pixelHeight / FONT_UNIT_HEIGHT;
  const context = canvas.getContext('2d');
  const oldAlpha = context.globalAlpha;
  context.globalAlpha = alpha;

  var needed = [];
  string = string.toUpperCase(); // because I only did uppercase letters
  for (var i = 0; i < string.length; i++) {
    var letter = letters[string.charAt(i)];
    if (letter) {
      // because there's letters I didn't do
      needed.push(letter);
    }
  }

  var currX = 0;
  for (i = 0; i < needed.length; i++) {
    letter = needed[i];
    var currY = 0;
    var addX = 0;
    for (var y = 0; y < letter.length; y++) {
      var row = letter[y];
      for (var x = 0; x < row.length; x++) {
        if (row[x]) {
          const x1 = floor(startX + currX + x * size);
          const y1 = floor(startY + currY);
          const x2 = floor(startX + currX + x * size + 1);
          const y2 = floor(startY + currY + 1);

          context.fillStyle = bgColor;
          context.fillRect(x2, y2, size, size);
          context.fillStyle = color;
          context.fillRect(x1, y1, size, size);
        }
      }
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    currX += size + addX;
  }

  context.globalAlpha = oldAlpha;
}
