class AnimationService {
  animation = function () {
    function lerp(a, b, t) {
      return (1 - t) * a + t * b;
    }
    function drawMovement() {
      if (transform.image == null || transform.shouldPlay == false) {
        return;
      }
      let _width, _height;
      _width = transform.image.width * transform.scale;
      _height = transform.image.height * transform.scale;

      transform.canvasContext.drawImage(transform.image, transform.x, transform.y, _width, _height);
      transform.update();
    }
    function update() {
      transform.x = lerp(transform.x, transform.x2, 0.12);
      transform.y = lerp(transform.y, transform.y2, 0.12);
      transform.scale = lerp(transform.scale, transform.scale2, 0.12);

      if (
        Math.abs(transform.x - transform.x2) < 0.05 &&
        Math.abs(transform.y - transform.y2) < 0.05 &&
        Math.abs(transform.scale - transform.scale2) < 0.05
      ) {
        stopAndResetTransform();
        transform.functionToFireWhenDone();
      }
    }
    function stopAndResetTransform() {
      transform.shouldPlay = false;
    }
    function nullFunction() {}
    var transform = {
      drawMovement: drawMovement,
      shouldPlay: false,
      update: update,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      scale: 0.0,
      x2: 0,
      y2: 0,
      scale2: 0.0,
      image: null,
      canvasContext: null,
      nullFunction: nullFunction,
      functionToFireWhenDone: nullFunction,
    };
    return transform;
  };
}
export default new AnimationService();
