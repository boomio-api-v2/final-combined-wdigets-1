class AnimationService {
  animation = function () {
    function play() {
      if (drip.shouldPlay == false && drip.isLocked == false) {
        drip.shouldPlay = true;
      }
    }
    function stopPlaying() {
      if (drip.shouldPlay == true) {
        drip.shouldPlay = false;
      }
    }
    function updateScale() {
      drip.verticalScale = drip.verticalScale * 1.03;
      if (drip.verticalScale > 1.2) {
        drip.verticalScale = 0.9;
        drip.isPouring = true;
      }
    }
    function resetScale() {
      drip.verticalScale = 0.09;
      drip.isPouring = false;
    }
    var drip = {
      image: null,
      isLocked: false,
      shouldPlay: false, //
      play: play,
      isPouring: false,
      stopPlaying: stopPlaying,
      updateScale: updateScale,
      resetScale: resetScale,
      verticalScale: 0.09,
    };
    return drip;
  };
}
export default new AnimationService();
