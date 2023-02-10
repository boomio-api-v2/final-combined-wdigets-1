import { isMobileDevice } from '@/config';

export const puzzlesCoordinateForMobile = [
  {
    top: 0,
    left: 0,
    width: '49.84px',
    height: '61.33px',
  },
  {
    top: 0,
    left: 37,
    width: '60.3px',
    height: '50.86px',
  },
  {
    top: 49,
    left: 0,
    width: '61.3px',
    height: '47.86px',
  },
  {
    top: 44,
    left: 62,
    width: '50.84px',
    height: '63.3px',
  },
];

export const puzzlesCoordinateForDesktop = [
  {
    top: 0,
    left: 0,
    width: '89.84px',
    height: '112.33px',
  },

  {
    top: 0,
    left: 66,
    width: '114.3px',
    height: '87.86px',
  },
  {
    top: 87,
    left: 0,
    width: '112.3px',
    height: '89.86px',
  },
  {
    top: 65,
    left: 88,
    width: '90.84px',
    height: '113.33px',
  },
];

export const puzzlesCoordinate = isMobileDevice
  ? puzzlesCoordinateForMobile
  : puzzlesCoordinateForDesktop;

export const puzzleWidgetSize = isMobileDevice ? 100 : 185;
