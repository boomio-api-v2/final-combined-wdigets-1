class AnimationService {
  animation = function () {
    function init() {
      jar.image = jar.images[0];
      jar.fillAmount = 0.07;
      jar.shouldPlay = true;
    }
    function selectImage() {
      if (jar.currentImage < jar.images.length) jar.image = jar.images[jar.currentImage];
    }
    function updateFill(amount) {
      jar.fillAmount = jar.fillAmount + amount;

      if (jar.fillAmount < 0.09) {
        jar.currentImage = 0;
      } else if (jar.fillAmount > 0.09 && jar.fillAmount < 0.19 && jar.currentImage != 1) {
        jar.currentImage = 1;
        selectImage();
      } else if (jar.fillAmount > 0.19 && jar.fillAmount < 0.29 && jar.currentImage != 2) {
        jar.currentImage = 2;
        selectImage();
      } else if (jar.fillAmount > 0.29 && jar.fillAmount < 0.39 && jar.currentImage != 3) {
        jar.currentImage = 3;
        selectImage();
      } else if (jar.fillAmount > 0.39 && jar.fillAmount < 0.49 && jar.currentImage != 4) {
        jar.currentImage = 4;
        selectImage();
      } else if (jar.fillAmount > 0.49 && jar.fillAmount < 0.59 && jar.currentImage != 5) {
        jar.currentImage = 5;
        selectImage();
      } else if (jar.fillAmount > 0.59 && jar.fillAmount < 0.69 && jar.currentImage != 6) {
        jar.currentImage = 6;
        selectImage();
      } else if (jar.fillAmount > 0.69 && jar.fillAmount < 0.79 && jar.currentImage != 7) {
        jar.currentImage = 7;
        selectImage();
      } else if (jar.fillAmount > 0.79 && jar.fillAmount < 0.89 && jar.currentImage != 8) {
        jar.currentImage = 8;
        selectImage();
      } else if (jar.fillAmount > 0.89 && jar.fillAmount < 0.99 && jar.currentImage != 9) {
        jar.currentImage = 9;
        selectImage();
      } else if (jar.fillAmount > 0.99 && jar.fillAmount < 1.09 && jar.currentImage != 10) {
        jar.currentImage = 10;
        selectImage();
        jar.juiceDrip.isLocked = true;
        jar.juiceDrip.stopPlaying();
        jar.myDelay.functionToFire = jarBacameFull;
        jar.myDelay.startDelay(100);
        jar.myHandle.switchToIdle();
      }
    }
    function jarBacameFull() {
      jar.fireTranslationWhenJarIsFilled();
      jar.shouldPlay = false;
    }

    function nullFunction() {}
    var jar = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      scale: 0.0,
      juiceDrip: null,
      myDelay: null,
      myHandle: null,
      init: init,
      fullJars: 0,
      emptyJars: 3,
      images: [], // array of frames (images)
      image: null,
      currentImage: 0,
      updateFill: updateFill,
      fireTranslationWhenJarIsFilled: nullFunction,
      fillAmount: 0.07,
      shouldPlay: false,
    };
    return jar;
  };
}
export default new AnimationService();
