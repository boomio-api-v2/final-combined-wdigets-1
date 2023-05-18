class AnimationService {
  animation = function () {
    function startDelay(counterAmount) {
      if (delay.shouldCount == false) {
        delay.shouldCount = true;
        delay.counter = counterAmount;
      }
    }
    function update() {
      if (delay.shouldCount == false) {
        return;
      }
      delay.counter--;
      if (delay.counter <= 0) {
        delay.counter = 0;
        delay.shouldCount = false;
        delay.functionToFire();
        delay.functionToFire = firethis;
      }
    }
    function firethis() {}
    var delay = {
      startDelay: startDelay,
      update: update,
      shouldCount: false,
      counter: 0,
      functionToFire: firethis,
    };
    return delay;
  };
}
export default new AnimationService();
