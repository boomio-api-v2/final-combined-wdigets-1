class AnimationService {
  animation = function () {
    function init() {
      switchToImage1();
    }
    function switchToImage1() {
      if (handle.isIdle == false) {
        handle.image = handle.img1;
      }
    }
    function switchToImage2() {
      handle.image = handle.img2;
    }
    var rad = 1.0;
    function switchToActive() {
      handle.isIdle = false;
      //handle.releaseHandleFunction();
      handle.image = handle.img1;
    }
    function switchToIdle() {
      handle.isIdle = true;
      rad = 1;
      handle.releaseHandleFunction();
      handle.image = handle.img3;
    }

    function updateRadians() {
      rad = rad - 0.0071;
      if (rad < 0) {
        switchToActive();
        rad = 0;
      }
      return rad;
    }
    function nullFunct() {}

    var handle = {
      image: null,
      img1: null,
      img2: null,
      img3: null,
      init: init,
      isTurning: false,
      isIdle: false,
      updateRadians: updateRadians,
      releaseHandleFunction: nullFunct,
      switchToImage1: switchToImage1,
      switchToImage2: switchToImage2,
      switchToIdle: switchToIdle,
    };
    return handle;
  };
}
export default new AnimationService();
