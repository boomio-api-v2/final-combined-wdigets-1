import { isMobileDevice } from '@/config';

export const puzzlesCoordinateForMobile = [
  {
    top: 0,
    left: 1,
    width: '27.84px',
    height: '34.33px',
  },
  {
    top: 0,
    left: 21,
    width: '35.3px',
    height: '26.86px',
  },
  {
    top: 27,
    left: 1,
    width: '35.3px',
    height: '27.86px',
  },
  {
    top: 20,
    left: 28,
    width: '28px',
    height: '35.3px',
  },
];

export const puzzlesCoordinateForDesktop = [
  {
    top: 0,
    left: 3,
    width: '89.84px',
    height: '111.33px',
  },

  {
    top: 0,
    left: 69,
    width: '111.3px',
    height: '88.86px',
  },
  {
    top: 87,
    left: 3,
    width: '110.3px',
    height: '89.86px',
  },
  {
    top: 65,
    left: 90,
    width: '89.84px',
    height: '111.33px',
  },
];

export const puzzlesCoordinate = isMobileDevice
  ? puzzlesCoordinateForMobile
  : puzzlesCoordinateForDesktop;

export const puzzleWidgetSize = isMobileDevice ? 58 : 185;
