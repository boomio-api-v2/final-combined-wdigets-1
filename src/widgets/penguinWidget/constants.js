import { isMobileDevice } from '@/config';

export const iceBackgroundImage =
  'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice_background.png?raw=true';

export const iceExplosionImage =
  'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice-explosion.gif?raw=true';

export const penguinParams = [
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/penguin1.gif?raw=true',
    x: isMobileDevice ? 46 : 82,
    y: isMobileDevice ? 27 : 62,
    size: isMobileDevice ? 32 : 50,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/penguin2.gif?raw=true',
    x: isMobileDevice ? 22 : 89,
    y: isMobileDevice ? 49 : 115,
    size: isMobileDevice ? 26 : 40,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/penguin3.gif?raw=true',
    x: isMobileDevice ? 48 : 38,
    y: isMobileDevice ? 62 : 102,
    size: isMobileDevice ? 22 : 40,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/penguin4.gif?raw=true',
    x: isMobileDevice ? 66 : 116,
    y: isMobileDevice ? 73 : 135,
    size: isMobileDevice ? 27 : 55,
  },
];

export const iceBlocksParams = [
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice-cubes/ice-watermelon.png?raw=true',
    fruitImg:
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/fruits/watermelon.png?raw=true',
    size: isMobileDevice ? 38 : 75,
    x: isMobileDevice ? 102 : 175,
    y: isMobileDevice ? 37 : 62,
    moveX: isMobileDevice ? 47 : 82,
    moveY: isMobileDevice ? 37 : 62,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice-cubes/ice-pine-apple.png?raw=true',
    fruitImg:
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/fruits/pine-apple.png?raw=true',
    size: isMobileDevice ? 38 : 75,
    x: isMobileDevice ? 130 : 230,
    y: isMobileDevice ? 40 : 67,
    moveX: isMobileDevice ? 50 : 89,
    moveY: isMobileDevice ? 61 : 115,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice-cubes/ice-cherry.png?raw=true',
    fruitImg:
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/fruits/cherry.png?raw=true',
    size: isMobileDevice ? 40 : 70,
    x: isMobileDevice ? 101 : 180,
    y: 10,
    moveX: isMobileDevice ? 20 : 38,
    moveY: isMobileDevice ? 48 : 102,
  },
  {
    img: 'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/ice-cubes/ice-banana.png?raw=true',
    fruitImg:
      'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/da8bb2c3063250997ef061433a5558d0f48faaef/images/penguinWidget/fruits/banana.png?raw=true',
    size: isMobileDevice ? 40 : 70,
    x: isMobileDevice ? 131 : 238,
    y: isMobileDevice ? 13 : 20,
    moveX: isMobileDevice ? 63 : 116,
    moveY: isMobileDevice ? 76 : 135,
  },
];
