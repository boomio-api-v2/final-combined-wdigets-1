const EPSILON = 0.0001;
const RAMP_TIME = 0.1;
const AUDIO_TIME_CONSTANT = 0.01;
const MAX_ENGINE = 0.2;
const TRIANGLE = 'triangle';

const audioContext = new window.AudioContext() || window.webkitAudioContext();

const compressor = audioContext.createDynamicsCompressor();
compressor.connect(audioContext.destination);

const gain = audioContext.createGain();
gain.connect(compressor);
gain.gain.value = 0.05;
//gain.gain.value = 0.00;

const groundEngineHz = [50, 70];
const airEngineHz = [80, 100];
const groundEngine = createEngine(groundEngineHz);
const airEngine = createEngine(airEngineHz);

let enginesStarted = false;
export const playHitWall = () => createSound([120, 100], [0.2, 0.4], TRIANGLE);
export const playHitMailbox = () => createSound([200, 220], [0.2, 0.3], TRIANGLE);
export const playHitGold = () => createSound([250, 250], [0.2, 0.3], TRIANGLE);

const p0 = () => createSound([0], [0.1], TRIANGLE);
const p1 = () => createSound([500], [0.3], TRIANGLE);
const p2 = () => createSound([475], [0.2], TRIANGLE);
const p3 = () => createSound([450], [0.1], TRIANGLE);
const p4 = () => createSound([425], [0.1], TRIANGLE);
const p5 = () => createSound([400], [0.1], TRIANGLE);
const p6 = () => createSound([375], [0.1], TRIANGLE);
const p7 = () => createSound([350], [0.1], TRIANGLE);
const p8 = () => createSound([325], [0.1], TRIANGLE);
const p9 = () => createSound([300], [0.1], TRIANGLE);
const p10 = () => createSound([275], [0.1], TRIANGLE);

export const countdownBeeps = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

const Al = 233.08;
const Bf = 246.94;
const C = 261.63;
const D = 293.66;
const E = 329.63;
const F = 349.23;
const G = 392.0;
const A = 440.0;
const R = 1.0;

// https://www.youtube.com/watch?v=PjwsAWomTFI
// https://pages.mtu.edu/~suits/notefreqs.html
//                      glo ry   glo   ry   ha   le  lu  ja   x    glo  ry   glo  ry   ha   le   lu  ja    x    glo ry   glo  ry  ha  le  lu   ja   x   his  tr  is    ma   chn  on
// prettier-ignore
const battleNotes   = [ C,  Bf,  Al,   C,   F,   G,   A,  F,  R,   D,   E,   F,   E,   F,   D,   C,  Al,   R,   C,  Bf,  Al,  C,  F,  G,   A,   F,  R,   F,  G,   G,   F,   E,   F];
// prettier-ignore
const notesDuration = [.4,  .1,  .1,  .1,  .1,  .1,  .4, .2, .03, .2,  .1,  .1,  .1,  .1,  .1,  .4,  .2,  .03, .1,  .1,  .1, .1, .1, .1,  .1,  .1,  .1, .2, .2,  .2,  .2,  .2,  .2];

export const playElectionDay = () => createSound(battleNotes, notesDuration, TRIANGLE);

export const playNoFunds = () => createSound([250, 200, 150, 100], [0.4, 0.4, 0.4, 2.5], TRIANGLE);

// https://blog.j-labs.pl/2017/02/Creating-game-for-android-using-JavaScript-4-Sounds-Web-Audio-Api
function createSound(notes, times, type) {
  const noteGain = audioContext.createGain();
  noteGain.connect(gain);

  let sound = {
    oscillatorNodes: [],
    gainNode: noteGain,
  };

  let oscillators = [];
  notes.forEach((note, index) => {
    let oscillator = audioContext.createOscillator();
    oscillator.connect(noteGain);
    oscillator.type = type || TRIANGLE;
    oscillator.frequency.value = note;
    oscillator.onended = () => playNote(index + 1, sound, times);
    oscillators.push(oscillator);
  });

  sound.oscillatorNodes = oscillators;

  playNote(0, sound, times);
  return sound;
}

function playNote(index, sound, times) {
  const oscillators = sound.oscillatorNodes;
  const gainNode = sound.gainNode;
  if (index < oscillators.length) {
    const o = oscillators[index];
    const startTime = audioContext.currentTime;
    const endTime = audioContext.currentTime + times[index];

    gainNode.gain.setValueAtTime(EPSILON, startTime);
    o.start(startTime);
    gainNode.gain.setTargetAtTime(1, startTime + EPSILON, AUDIO_TIME_CONSTANT);
    gainNode.gain.setTargetAtTime(EPSILON, endTime, AUDIO_TIME_CONSTANT);
    o.stop(endTime + RAMP_TIME);
  }
}

function createEngine(frequencies) {
  const engineGain = audioContext.createGain();
  engineGain.connect(gain);
  const oscillatorNodes = frequencies.map((hz) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = TRIANGLE;
    oscillator.frequency.value = hz;
    oscillator.connect(engineGain);
    return oscillator;
  });

  return {
    oscillatorNodes,
    gainNode: engineGain,
  };
}

export function playGroundEngine() {
  const t = audioContext.currentTime;
  groundEngine.gainNode.gain.setValueAtTime(groundEngine.gainNode.gain.value, t);
  groundEngine.gainNode.gain.setTargetAtTime(MAX_ENGINE, t, AUDIO_TIME_CONSTANT);
  airEngine.gainNode.gain.setValueAtTime(airEngine.gainNode.gain.value, t);
  airEngine.gainNode.gain.setTargetAtTime(EPSILON, t, AUDIO_TIME_CONSTANT);
}

export function playAirEngine() {
  const t = audioContext.currentTime;
  groundEngine.gainNode.gain.setValueAtTime(groundEngine.gainNode.gain.value, t);
  groundEngine.gainNode.gain.setTargetAtTime(EPSILON, t, AUDIO_TIME_CONSTANT);
  airEngine.gainNode.gain.setValueAtTime(airEngine.gainNode.gain.value, t);
  airEngine.gainNode.gain.setTargetAtTime(MAX_ENGINE, t, AUDIO_TIME_CONSTANT);
}

export function quietAllEngines() {
  groundEngine.gainNode.gain.setValueAtTime(
    groundEngine.gainNode.gain.value,
    audioContext.currentTime,
  );
  groundEngine.gainNode.gain.exponentialRampToValueAtTime(
    EPSILON,
    audioContext.currentTime + RAMP_TIME,
  );

  airEngine.gainNode.gain.setValueAtTime(airEngine.gainNode.gain.value, audioContext.currentTime);
  airEngine.gainNode.gain.exponentialRampToValueAtTime(
    EPSILON,
    audioContext.currentTime + RAMP_TIME,
  );
}

export function startEngines() {
  if (enginesStarted) return;
  airEngine.gainNode.gain.setValueAtTime(EPSILON, audioContext.currentTime);
  groundEngine.gainNode.gain.setValueAtTime(EPSILON, audioContext.currentTime);
  airEngine.oscillatorNodes.forEach((node) => node.start());
  groundEngine.oscillatorNodes.forEach((node) => node.start());
  enginesStarted = true;
}

export function engineAlreadyStarted() {
  return enginesStarted;
}
