import './index.css';
import { localStorageService, boomioService } from '@/services';
import { Elements } from '../../helpers/HtmlElementsHelper';
import { isLifeCustomer } from '../utils';
import { InputRegisterContainerValidation } from '../../helpers/InputRegisterContainerValidation.js';
import {
  brickWallImageData,
  carImageData,
  goldImageData,
  mailboxImageData,
  city1ImageData,
  city2ImageData,
  city3ImageData,
  envelopeImageData,
  cloudsImageData,
  treeImageData,
  checkIcon,
  uncheckIcon,
  line,
  background,
  backgroundBarbora,
  backgroundBarbora2,
  goldImageDataBarbora,
  envelopeImageDataBarbora,
  carImageDataBarbora,
  city1ImageDataBarbora,
  city2ImageDataBarbora,
  city3ImageDataBarbora,
  cloudsImageDataBarbora,
  brickWallImageDataBarbora,
  mailboxImageDataBarbora,
  lineBarbora,
  BarboraTree1,
  BarboraTree2,
  BarboraTree3,
  backgroundIkea,
  goldImageDataIkea,
  envelopeImageDataIkea,
  carImageDataIkea,
  mailboxImageDataIkea,
  city1ImageDataIkea,
  city2ImageDataIkea,
  city3ImageDataIkea,
  brickWallImageDataIkea,
  cloudsImageDataIkea,
  lineIkea,
  IkeaTree1,
  IkeaTree2,
  IkeaTree3,
  backgroundUnisend,
  goldImageDataUnisend,
  goldImageDataUnisendES,
  envelopeImageDataUnisend,
  carImageDataUnisend,
  mailboxImageDataUnisend,
  city1ImageDataUnisend,
  city2ImageDataUnisend,
  city3ImageDataUnisend,
  brickWallImageDataUnisend,
  cloudsImageDataUnisend,
  lineUnisend,
  treeUnisend,
  goldImageDataUnisendLV2,
  goldImageDataUnisendLV1,
  Pigubackground,
  Pigusign,
  PiguBags2,
  PigubagsEE1,
  PigubagsFI1,
  PigubagsLV1,
  PigubagsLT1,
  PiguBikeEE,
  PigubikeLV,
  PigubikeFI,
  PigubikeLT,
  Pigutree,
  city1ImageDataPigu,
  city2ImageDataPigu,
  city3ImageDataPigu,
  city1ImageDataPiguFI,
  city2ImageDataPiguFI,
  city3ImageDataPiguFI,
  background1Pigu,
  linePigu,
  linePiguFI,
  life,
  background1PiguFI,
  PigubackgroundFI,
  backgroundGamtosAteitis,
  goldImageDataGamtosAteitisPopierius,
  goldImageData2GamtosAteitisPopierius,
  envelopeImageDataGamtosAteitisPopierius,
  envelopeImageData2GamtosAteitisPopierius,
  carImageDataGamtosAteitisPopierius,
  mailboxImageDataGamtosAteitisPopierius,
  city1ImageDataGamtosAteitis,
  city2ImageDataGamtosAteitis,
  city3ImageDataGamtosAteitis,
  brickWallImageDataGamtosAteitis,
  cloudsImageDataGamtosAteitis,
  lineGamtosAteitis,
  treeGamtosAteitis1,
  treeGamtosAteitis2,
  treeGamtosAteitis3,
  treeGamtosAteitis4,
  treeGamtosAteitis5,
  treeGamtosAteitis6,
  backgroundFullGamtosAteitis,
  goldImageDataGamtosAteitisStiklas,
  envelopeImageDataGamtosAteitisStiklas,
  goldImageData2GamtosAteitisStiklas,
  envelopeImageData2GamtosAteitisStiklas,
  carImageDataGamtosAteitisStiklas,
  goldImageDataGamtosAteitisPlastikas,
  envelopeImageDataGamtosAteitisPlastikas,
  goldImageData2GamtosAteitisPlastikas,
  envelopeImageData2GamtosAteitisPlastikas,
  carImageDataGamtosAteitisPlastikas,
  envelopeImageData3GamtosAteitisStiklas,
  envelopeImageData4GamtosAteitisStiklas,
  goldImageData3GamtosAteitisStiklas,
  envelopeImageData3GamtosAteitisPopierius,
  envelopeImageData4GamtosAteitisPopierius,
  goldImageData3GamtosAteitisPopierius,
  envelopeImageData3GamtosAteitisPlastikas,
  envelopeImageData4GamtosAteitisPlastikas,
  goldImageData3GamtosAteitisPlastikas,
  backgroundOrlen,
  city1ImageDataOrlen,
  city2ImageDataOrlen,
  city3ImageDataOrlen,
  brickWallImageDataOrlen,
  cloudsImageDataOrlen,
  lineOrlen,
  treeOrlen1,
  treeOrlen2,
  treeOrlen3,
  backgroundFullOrlen,
  carOrlen,
  signOrlen,
  goldImageDataOrlen,
  envelopeImageDataOrlen,
  backgroundNovaturas,
  city1ImageDataNovaturas,
  city2ImageDataNovaturas,
  city3ImageDataNovaturas,
  cloudsImageDataNovaturas,
  lineNovaturas,
  treeNovaturas1,
  backgroundFullNovaturas,
  carNovaturas,
  signNovaturas,
  goldImageDataNovaturas,
  envelopeImageDataNovaturas,
  backgroundToni,
  city1ImageDataToni,
  city2ImageDataToni,
  city3ImageDataToni,
  cloudsImageDataToni,
  lineToni,
  treeToni1,
  treeToni2,
  backgroundFullToni,
  carToni,
  signToni,
  goldImageDataToni,
  envelopeImageDataToni1,
  envelopeImageDataToni2,
  envelopeImageDataToni3,
  envelopeImageDataToni4,
  envelopeImageDataToni5,
  backgroundBoomio,
  city1ImageDataBoomio,
  city2ImageDataBoomio,
  city3ImageDataBoomio,
  cloudsImageDataBoomio,
  lineBoomio,
  treeBoomio1,
  treeBoomio2,
  backgroundFullBoomio,
  carBoomio,
  signBoomio,
  goldImageDataBoomio,
  envelopeImageDataBoomio1,
  // envelopeImageDataBoomio2,
  // envelopeImageDataBoomio3,
  // envelopeImageDataBoomio4,
  // envelopeImageDataBoomio5,
  backgroundKakeMake,
  city1ImageDataKakeMakeMaxima,
  city2ImageDataKakeMakeMaxima,
  city3ImageDataKakeMakeMaxima,
  city1ImageDataKakeMakeLidl,
  city2ImageDataKakeMakeLidl,
  city3ImageDataKakeMakeLidl,
  city1ImageDataKakeMakeRimi,
  city2ImageDataKakeMakeRimi,
  city3ImageDataKakeMakeRimi,
  cloudsImageDataKakeMake,
  lineKakeMake,
  treeKakeMake1,
  treeKakeMake2,
  backgroundFullKakeMake,
  carKakeMake,
  signKakeMake,
  goldImageDataKakeMake,
  envelopeImageDataKakeMake1,
  envelopeImageDataKakeMake2,
  envelopeImageDataKakeMake3,
} from './constants';

function startGame(scoreTableContainerInstance, didYouKnowContainer, competitionCodeScoreTableContainerPigu, type) {
  let config = localStorageService.getDefaultConfig();
  let checkboxChange = false;
  let checkboxChange2 = false;
  let checkboxChange3 = false;

  const isMobileHeightSmall = window.innerHeight <= 600;

  const applyCanvasBlur = (customer) => {
    const canvas = document.getElementById('boomio-drive-canvas');
    canvas.style.transition = 'filter 0.6s ease';

    if (customer === 'Toni') {
      canvas.style.filter = '';
    } else {
      canvas.style.filter = 'blur(2px)';
    }
  };

  const customer = config.business_name;

  const teams = config.teams;
  let showCompetitiveRegistration = config?.game_type !== '' ? config.game_type : 'competition';

  let language = config.language;

  // Create validator instance with current customer and language
  const InputValidator = new InputRegisterContainerValidation(customer, language);

  const campaignUrl = config.campaignUrl ? config.campaignUrl : '';
  const campaignUrlProp = campaignUrl ? campaignUrl : '';
  const campaignUrlOrCurrentPage = config.campaignUrlOrCurrentPage;

  let scoreTable = {};
  let gameCount = 0;
  let bestScore = 0;

  const { random, floor, round, min, max, sin } = Math;

  const canvasWrapper = document.querySelector('#canvas-wrapper');
  const canvas = document.querySelector('#boomio-drive-canvas');
  const ctx = canvas.getContext('2d');

  let width = 418;
  let height = 668;
  let aspectRatio = width / height;

  canvas.height = height;
  canvas.width = width;
  const SPRITE_DIMENSIONS = 32;
  const BIG_SPRITE_DIMENSIONS = 64;
  const BIG_SPRITE_DIMENSIONS_85 = 85;
  const HOUSE_BIG_SPRITE_DIMENSIONS = 128;
  const JUMP_VELOCITY = -4;
  const GRAVITY = 0.3;
  const MAX_NEGATIVE_VEL = JUMP_VELOCITY;
  const MAX_POSITIVE_VEL = -JUMP_VELOCITY;
  const GROUND_PERCENT = 0.5;
  const ROAD_WIDTH_PERCENT = 1.3;
  const ZERO_POS = { x: 0, y: 0, z: 0 };
  const ZERO_POS_TREE = { x: 0, y: 50, z: 0 };
  const DEFAULT_LIFE = customer === 'Gamtos Ateitis' || customer === 'Orlen' || customer === 'Novaturas' ? 1 : 3;
  let LOST_LIFE = 0;
  const UI_PADDING = 4;
  const FONT_SIZE = 20;
  const WALL_PARTICLES = 55;
  const WALL_DIMENSIONS = 4;
  const WALL_PARTICLE_Y_VEL = -2;
  const WALL_PARTICLE_X_VEL = 1;
  const WALL_PARTICLE_DELAY = 5;
  const TRUCK_SPARKS = 25;
  const TRUCK_SPARKS_DIMENSIONS = 2;
  const TRUCK_SPARK_Y_VEL = -1;
  const TRUCK_SPARK_X_VEL = 1;
  const TRUCK_SPARK_DELAY = 5;
  const SECOND_ROW_Y = UI_PADDING * 2 + FONT_SIZE;
  const MAX_FUNDING_BAR = width - UI_PADDING * 2;
  const HIT_TIME = 1.5;
  const FLASH_TIME = 0.25;
  const ANIMATION_TIME = 0.25;
  const INSTRUCTIONS_FLASH_TIME = 5;
  const MAILBOX_HIT_AMOUNT = 5;
  const GOLD_HIT_AMOUNT = 5;
  const PLAYER_EDGE = width / 2.2;
  const GAME_UPDATE_TIME = 5;
  const MAX_ROAD_WIDTH = width * ROAD_WIDTH_PERCENT;
  const SHAKE_CLASS_NAME = 'shake';
  const LAND_CLASS_NAME = 'land';
  const ALPHA_INCREASE_AMOUNT = 0.09;
  const COLLECTABLE_DIMENSION = 16;
  const ENVELOPE_TIME = 5;
  const ENVELOPE_DELAY = 100;
  const ROAD_SPRITE_SPAWN_X = width / 10;
  let randomNumber = 0;
  const RESTART_TIMEOUT_TIME = 1000;
  const START_TIME = isLifeCustomer(customer) ? 999999 : 90; //time
  const START_FUNDING = 100;
  const TOUCH_TIME = 300;
  const SPARK_COLOR = '#fc9003';
  const MAILBOX_CHANCE_SPAWN = 0.02;
  const MAILBOX_TIME_OFFSCREEN = 1;
  const INITIAL_WALLS = 2;
  const INTRO_TIME = 3;
  const GAME_START_DELAY = 4;
  const CURVE_AMPLITUDE = 0.0007;
  const CURVE_FREQUENCY = 10;
  const NUM_TREES = 10;
  const TREE_CHANCE_SPAWN = 0.05;
  const TREE_TIME_OFFSCREEN = 1;
  const SPRITE_HORIZON_OFFSET = 12;
  const MAX_FPS = (1 / 60) * 1000;
  const VISIBILE_FUNDING_INCREASE = 0.5;
  const WARNING_FUNDING_LIMIT = 50;
  const TERRIBLE_FUNDING_LIMIT = 25;
  let textColor = 'white';
  let displayText = '';
  const fadeDuration = 1000;
  let fadeStartTime = 0;
  let isFading = false;
  let textShouldBeVisible = false; // Flag to determine if text should be displayed

  let startHandler = true;
  let angle = 0;

  let dx = 0;
  let ddx = 0;
  let instructionsAlpha = 1.0;
  let restartTimeout = null;

  let gameVars = {
    started: false,
    funding: START_FUNDING,
    visibleFunding: START_FUNDING,
    timeLeft: START_TIME,
    currentScore: 0,
    countdownBeepsPlayed: [],
    gameOver: false,
    readyToRestart: false,
    playedGameOverSound: false,
    gameOverAt: null,
    startedAt: null,
    lastHitAt: null,
    lastFlashedAt: null,
    lastTimeDecrementedAt: null,
    lastFlashedInstructionsAt: null,
    rulesShow: false,
    rulesHide: false,
  };

  const OVLERLAP_MAP = {
    wall: handleWallOverlap,
    gold: handleGoldOverlap,
    mailbox: handleMailboxOverlap,
  };

  const TIME_WALLS = [
    { time: START_TIME, walls: 2 },
    { time: 60, walls: 3 },
    { time: 30, walls: 4 },
    { time: 10, walls: 3 },
  ];

  const carImage = new Image();
  carImage.src =
    customer === 'Barbora'
      ? carImageDataBarbora
      : customer === 'Ikea'
        ? carImageDataIkea
        : customer === 'Unisend'
          ? carImageDataUnisend
          : campaignUrlProp === 'https://pigu.lt'
            ? PigubikeLT
            : campaignUrlProp === 'https://220.lv'
              ? PigubikeLV
              : campaignUrlProp === 'https://kaup.ee' || campaignUrlProp === 'https://kaup24.ee'
                ? PiguBikeEE
                : campaignUrlProp === 'https://hobbyhall.fi'
                  ? PigubikeFI
                  : customer === 'Orlen'
                    ? carOrlen
                    : customer === 'Novaturas'
                      ? carNovaturas
                      : customer === 'Toni'
                        ? carToni
                        : customer === 'KakeMake'
                          ? carKakeMake
                          : customer === 'Boomio'
                            ? carBoomio
                            : customer === 'Gamtos Ateitis'
                              ? type === 1
                                ? carImageDataGamtosAteitisPopierius
                                : type === 2
                                  ? carImageDataGamtosAteitisStiklas
                                  : carImageDataGamtosAteitisPlastikas
                              : carImageData;

  // const rightMailboxImage = new Image();
  // rightMailboxImage.src =
  //   customer === 'Barbora'
  //     ? mailboxImageDataBarbora
  //     : customer === 'Ikea'
  //       ? mailboxImageDataIkea
  //       : customer === 'Unisend'
  //         ? mailboxImageDataUnisend
  //         : customer === 'Pigu.lt'
  //           ? PiguBags2
  //           : customer === 'Gamtos Ateitis'
  //             ? mailboxImageDataGamtosAteitisPopierius
  //             : customer === 'Orlen'
  //               ? goldImageDataOrlen
  //               : customer === 'Novaturas'
  //                 ? goldImageDataNovaturas
  //                 : customer === 'Toni'
  //                   ? goldImageDataToni
  //                   : mailboxImageData;

  //This image is used for good road hits
  const leftMailboxImage = new Image();
  leftMailboxImage.src =
    customer === 'Barbora'
      ? mailboxImageDataBarbora
      : customer === 'Ikea'
        ? mailboxImageDataIkea
        : customer === 'Unisend'
          ? mailboxImageDataUnisend
          : customer === 'Pigu.lt'
            ? PiguBags2
            : customer === 'Gamtos Ateitis'
              ? mailboxImageDataGamtosAteitisPopierius
              : customer === 'Orlen'
                ? envelopeImageDataOrlen
                : customer === 'Novaturas'
                  ? envelopeImageDataNovaturas
                  : customer === 'Toni'
                    ? envelopeImageDataToni1
                    : customer === 'KakeMake'
                      ? envelopeImageDataKakeMake1
                      : customer === 'Boomio'
                        ? envelopeImageDataBoomio1
                        : mailboxImageData;

  const goldImageUnisendLV1 = new Image();
  goldImageUnisendLV1.src = goldImageDataUnisendLV1;
  const goldImageUnisendLV2 = new Image();
  goldImageUnisendLV2.src = goldImageDataUnisendLV2;

  const goldImageGamtosAteitis = new Image();
  goldImageGamtosAteitis.src = type === 1 ? goldImageDataGamtosAteitisPopierius : type === 2 ? goldImageDataGamtosAteitisStiklas : goldImageDataGamtosAteitisPlastikas;
  const goldImage2GamtosAteitis = new Image();
  goldImage2GamtosAteitis.src = type === 1 ? goldImageData2GamtosAteitisPopierius : type === 2 ? goldImageData2GamtosAteitisStiklas : goldImageData2GamtosAteitisPlastikas;
  const goldImage3GamtosAteitis = new Image();
  goldImage3GamtosAteitis.src = type === 1 ? goldImageData3GamtosAteitisPopierius : type === 2 ? goldImageData3GamtosAteitisStiklas : goldImageData3GamtosAteitisPlastikas;

  // Helper function to create image from source
  const createImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
  };

  // Create envelope images array per customer
  const envelopeImagesStrings =
    customer === 'Gamtos Ateitis'
      ? [
          type === 1 ? envelopeImageDataGamtosAteitisPopierius : type === 2 ? envelopeImageDataGamtosAteitisStiklas : envelopeImageDataGamtosAteitisPlastikas,
          type === 1 ? envelopeImageData2GamtosAteitisPopierius : type === 2 ? envelopeImageData2GamtosAteitisStiklas : envelopeImageData2GamtosAteitisPlastikas,
          type === 1 ? envelopeImageData3GamtosAteitisPopierius : type === 2 ? envelopeImageData3GamtosAteitisStiklas : envelopeImageData3GamtosAteitisPlastikas,
          type === 1 ? envelopeImageData4GamtosAteitisPopierius : type === 2 ? envelopeImageData4GamtosAteitisStiklas : envelopeImageData4GamtosAteitisPlastikas,
        ]
      : customer === 'Toni'
        ? [envelopeImageDataToni1, envelopeImageDataToni2, envelopeImageDataToni3, envelopeImageDataToni4, envelopeImageDataToni5]
        : customer === 'KakeMake'
          ? [envelopeImageDataKakeMake1, envelopeImageDataKakeMake2, envelopeImageDataKakeMake3]
          : [];
  const envelopeImages = envelopeImagesStrings.map(createImage);

  const goldImage = new Image();
  goldImage.src =
    customer === 'Barbora'
      ? goldImageDataBarbora
      : customer === 'Ikea'
        ? goldImageDataIkea
        : customer === 'Unisend' && language === 'ET'
          ? goldImageDataUnisendES
          : customer === 'Unisend'
            ? goldImageDataUnisend
            : customer === 'Orlen'
              ? goldImageDataOrlen
              : campaignUrlProp === 'https://pigu.lt'
                ? PigubagsLT1
                : campaignUrlProp === 'https://220.lv'
                  ? PigubagsLV1
                  : campaignUrlProp === 'https://kaup.ee' || campaignUrlProp === 'https://kaup24.ee'
                    ? PigubagsEE1
                    : campaignUrlProp === 'https://hobbyhall.fi'
                      ? PigubagsFI1
                      : customer === 'Novaturas'
                        ? goldImageDataNovaturas
                        : customer === 'Toni'
                          ? goldImageDataToni
                          : customer === 'KakeMake'
                            ? goldImageDataKakeMake
                            : customer === 'Boomio'
                              ? goldImageDataBoomio
                              : goldImageData;

  const wallImage = new Image();
  wallImage.src =
    customer === 'Barbora'
      ? brickWallImageDataBarbora
      : customer === 'Ikea'
        ? brickWallImageDataIkea
        : customer === 'Unisend'
          ? brickWallImageDataUnisend
          : customer === 'Pigu.lt'
            ? Pigusign
            : customer === 'Orlen'
              ? signOrlen
              : customer === 'Novaturas'
                ? signNovaturas
                : customer === 'Toni'
                  ? signToni
                  : customer === 'KakeMake'
                    ? signKakeMake
                    : customer === 'Boomio'
                      ? signBoomio
                      : customer === 'Gamtos Ateitis'
                        ? brickWallImageDataGamtosAteitis
                        : customer === 'Orlen'
                          ? brickWallImageDataOrlen
                          : brickWallImageData;

  //This image is falling from the sky
  const envelopeImage = new Image();
  envelopeImage.src =
    customer === 'Barbora'
      ? envelopeImageDataBarbora
      : customer === 'Ikea'
        ? envelopeImageDataIkea
        : customer === 'Unisend'
          ? envelopeImageDataUnisend
          : customer === 'Pigu.lt'
            ? PiguBags2
            : customer === 'Orlen'
              ? envelopeImageDataOrlen
              : customer === 'Novaturas'
                ? envelopeImageDataNovaturas
                : customer === 'Toni'
                  ? envelopeImageDataToni1
                  : customer === 'KakeMake'
                    ? envelopeImageDataKakeMake1
                    : customer === 'Boomio'
                      ? envelopeImageDataBoomio1
                      : envelopeImageData;

  const cloudsImage = new Image();
  cloudsImage.src =
    customer === 'Barbora'
      ? cloudsImageDataBarbora
      : customer === 'Ikea'
        ? cloudsImageDataIkea
        : customer === 'Unisend'
          ? cloudsImageDataUnisend
          : customer === 'Gamtos Ateitis'
            ? cloudsImageDataGamtosAteitis
            : customer === 'Orlen'
              ? cloudsImageDataOrlen
              : customer === 'Novaturas'
                ? cloudsImageDataNovaturas
                : customer === 'Toni'
                  ? cloudsImageDataToni
                  : customer === 'KakeMake'
                    ? cloudsImageDataKakeMake
                    : customer === 'Boomio'
                      ? cloudsImageDataBoomio
                      : cloudsImageData;

  const treeImage =
    customer === 'Barbora'
      ? [
          (() => {
            const img = new Image();
            img.src = BarboraTree1;
            return img;
          })(),
          (() => {
            const img = new Image();
            img.src = BarboraTree2;
            return img;
          })(),
          (() => {
            const img = new Image();
            img.src = BarboraTree3;
            return img;
          })(),
        ]
      : customer === 'Gamtos Ateitis'
        ? [
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis1;
              return img;
            })(),
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis2;
              return img;
            })(),
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis3;
              return img;
            })(),
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis4;
              return img;
            })(),
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis5;
              return img;
            })(),
            (() => {
              const img = new Image();
              img.src = treeGamtosAteitis6;
              return img;
            })(),
          ]
        : customer === 'Orlen'
          ? [
              (() => {
                const img = new Image();
                img.src = treeOrlen1;
                return img;
              })(),
              (() => {
                const img = new Image();
                img.src = treeOrlen2;
                return img;
              })(),
              (() => {
                const img = new Image();
                img.src = treeOrlen3;
                return img;
              })(),
            ]
          : customer === 'Ikea'
            ? [
                (() => {
                  const img = new Image();
                  img.src = IkeaTree1;
                  return img;
                })(),
                (() => {
                  const img = new Image();
                  img.src = IkeaTree2;
                  return img;
                })(),
                (() => {
                  const img = new Image();
                  img.src = IkeaTree3;
                  return img;
                })(),
              ]
            : customer === 'Pigu.lt'
              ? [
                  (() => {
                    const img = new Image();
                    img.src = Pigutree;
                    return img;
                  })(),
                ]
              : customer === 'Novaturas'
                ? [
                    (() => {
                      const img = new Image();
                      img.src = treeNovaturas1;
                      return img;
                    })(),
                  ]
                : customer === 'Toni'
                  ? [
                      (() => {
                        const img = new Image();
                        img.src = treeToni1;
                        return img;
                      })(),
                      (() => {
                        const img = new Image();
                        img.src = treeToni2;
                        return img;
                      })(),
                    ]
                  : customer === 'KakeMake'
                    ? [
                        (() => {
                          const img = new Image();
                          img.src = treeKakeMake1;
                          return img;
                        })(),
                        (() => {
                          const img = new Image();
                          img.src = treeKakeMake2;
                          return img;
                        })(),
                      ]
                    : customer === 'Boomio'
                      ? [
                          (() => {
                            const img = new Image();
                            img.src = treeBoomio1;
                            return img;
                          })(),
                          (() => {
                            const img = new Image();
                            img.src = treeBoomio2;
                            return img;
                          })(),
                        ]
                      : [
                          (() => {
                            const img = new Image();
                            img.src = customer === 'Unisend' ? treeUnisend : treeImageData;
                            return img;
                          })(),
                        ];

  const lineImg = new Image();
  const backgroundImg = new Image();
  const backgroundImg2 = new Image();

  lineImg.src =
    customer === 'Barbora'
      ? lineBarbora
      : customer === 'Ikea'
        ? lineIkea
        : customer === 'Unisend'
          ? lineUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? linePiguFI
            : customer === 'Gamtos Ateitis'
              ? lineGamtosAteitis
              : customer === 'Pigu.lt'
                ? linePigu
                : customer === 'Orlen'
                  ? lineOrlen
                  : customer === 'Novaturas'
                    ? lineNovaturas
                    : customer === 'Toni'
                      ? lineToni
                      : customer === 'KakeMake'
                        ? lineKakeMake
                        : customer === 'Boomio'
                          ? lineBoomio
                          : line;

  backgroundImg.src =
    customer === 'Barbora'
      ? backgroundBarbora
      : customer === 'Ikea'
        ? backgroundIkea
        : customer === 'Unisend'
          ? backgroundUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? PigubackgroundFI
            : customer === 'Pigu.lt'
              ? Pigubackground
              : customer === 'Gamtos Ateitis'
                ? backgroundGamtosAteitis
                : customer === 'Orlen'
                  ? backgroundOrlen
                  : customer === 'Novaturas'
                    ? backgroundNovaturas
                    : customer === 'Toni'
                      ? backgroundToni
                      : customer === 'KakeMake'
                        ? backgroundKakeMake
                        : customer === 'Boomio'
                          ? backgroundBoomio
                          : background;
  backgroundImg2.src =
    customer === 'Barbora'
      ? backgroundBarbora2
      : customer === 'Ikea'
        ? backgroundIkea
        : customer === 'Unisend'
          ? backgroundUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? PigubackgroundFI
            : customer === 'Pigu.lt'
              ? Pigubackground
              : customer === 'Gamtos Ateitis'
                ? backgroundGamtosAteitis
                : customer === 'Orlen'
                  ? backgroundOrlen
                  : customer === 'Novaturas'
                    ? backgroundNovaturas
                    : customer === 'Toni'
                      ? backgroundToni
                      : customer === 'KakeMake'
                        ? backgroundKakeMake
                        : customer === 'Boomio'
                          ? backgroundBoomio
                          : background;

  const backgroundImage = new Image();
  backgroundImage.src =
    customer === 'Gamtos Ateitis'
      ? backgroundFullGamtosAteitis
      : campaignUrlProp === 'https://hobbyhall.fi'
        ? background1PiguFI
        : customer === 'Orlen'
          ? backgroundFullOrlen
          : customer === 'Novaturas'
            ? backgroundFullNovaturas
            : customer === 'Toni'
              ? backgroundFullToni
              : customer === 'KakeMake'
                ? backgroundFullKakeMake
                : customer === 'Boomio'
                  ? backgroundFullBoomio
                  : background1Pigu;

  let backgroundImageLoaded = false;
  backgroundImage.onload = () => {
    backgroundImageLoaded = true;
  };

  const city1 = new Image();
  const city2 = new Image();
  const city3 = new Image();
  city1.src =
    customer === 'Barbora'
      ? city1ImageDataBarbora
      : customer === 'Ikea'
        ? city1ImageDataIkea
        : customer === 'Unisend'
          ? city1ImageDataUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? city1ImageDataPiguFI
            : customer === 'Pigu.lt'
              ? city1ImageDataPigu
              : customer === 'Gamtos Ateitis'
                ? city1ImageDataGamtosAteitis
                : customer === 'Orlen'
                  ? city1ImageDataOrlen
                  : customer === 'Novaturas'
                    ? city1ImageDataNovaturas
                    : customer === 'Toni'
                      ? city1ImageDataToni
                      : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('maxima')
                        ? city1ImageDataKakeMakeMaxima
                        : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('lidl')
                          ? city1ImageDataKakeMakeLidl
                          : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('rimi')
                            ? city1ImageDataKakeMakeRimi
                            : customer === 'Boomio'
                              ? city1ImageDataBoomio
                              : city1ImageData;
  city2.src =
    customer === 'Barbora'
      ? city2ImageDataBarbora
      : customer === 'Ikea'
        ? city2ImageDataIkea
        : customer === 'Unisend'
          ? city2ImageDataUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? city2ImageDataPiguFI
            : customer === 'Pigu.lt'
              ? city2ImageDataPigu
              : customer === 'Gamtos Ateitis'
                ? city2ImageDataGamtosAteitis
                : customer === 'Orlen'
                  ? city2ImageDataOrlen
                  : customer === 'Novaturas'
                    ? city2ImageDataNovaturas
                    : customer === 'Toni'
                      ? city2ImageDataToni
                      : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('maxima')
                        ? city2ImageDataKakeMakeMaxima
                        : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('lidl')
                          ? city2ImageDataKakeMakeLidl
                          : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('rimi')
                            ? city2ImageDataKakeMakeRimi
                            : customer === 'Boomio'
                              ? city2ImageDataBoomio
                              : city2ImageData;
  city3.src =
    customer === 'Barbora'
      ? city3ImageDataBarbora
      : customer === 'Ikea'
        ? city3ImageDataIkea
        : customer === 'Unisend'
          ? city3ImageDataUnisend
          : campaignUrlProp === 'https://hobbyhall.fi'
            ? city3ImageDataPiguFI
            : customer === 'Pigu.lt'
              ? city3ImageDataPigu
              : customer === 'Gamtos Ateitis'
                ? city3ImageDataGamtosAteitis
                : customer === 'Orlen'
                  ? city3ImageDataOrlen
                  : customer === 'Novaturas'
                    ? city3ImageDataNovaturas
                    : customer === 'Toni'
                      ? city3ImageDataToni
                      : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('maxima')
                        ? city3ImageDataKakeMakeMaxima
                        : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('lidl')
                          ? city3ImageDataKakeMakeLidl
                          : customer === 'KakeMake' && campaignUrlOrCurrentPage.includes('rimi')
                            ? city3ImageDataKakeMakeRimi
                            : customer === 'Boomio'
                              ? city3ImageDataBoomio
                              : city3ImageData;

  const whStartPos = width / 2 - (BIG_SPRITE_DIMENSIONS * 3) / 2 + BIG_SPRITE_DIMENSIONS / 2;
  // resize();

  const sky = customer === 'Barbora' ? '#E84B4B' : customer === 'Ikea' ? '#959595' : '#F9F1DD';
  const grass2 = customer === 'Barbora' ? '#A9C734' : '#F9F1DD';
  const GOOD_FUNDING_COLOR = grass2;
  const BAD_FUNDING_COLOR =
    customer === 'Barbora'
      ? '#545151'
      : customer === 'Ikea'
        ? '#DEB47C'
        : customer === 'Unisend'
          ? '#545151'
          : customer === 'Pigu.lt'
            ? 'white'
            : customer === 'Gamtos Ateitis'
              ? '#FFFFFF'
              : customer === 'Novaturas'
                ? '#814C63'
                : '#FFFFFF';
  const BAD_FUNDING_COLOR1 =
    customer === 'Barbora'
      ? '#FFCA00'
      : customer === 'Ikea'
        ? '#B58E5B'
        : customer === 'Unisend'
          ? '#FFCA00'
          : customer === 'Pigu.lt'
            ? '#F24434'
            : customer === 'Gamtos Ateitis'
              ? '#F24434'
              : customer === 'Novaturas'
                ? '#FFB572'
                : customer === 'Toni'
                  ? '#5E2B17'
                  : customer === 'KakeMake'
                    ? '#7CAC32'
                    : '#F24434';
  let currentFillColor = BAD_FUNDING_COLOR1;

  const road1 =
    customer === 'Barbora'
      ? '#959595'
      : customer === 'Ikea'
        ? '#959595'
        : customer === 'Unisend'
          ? '#959595'
          : customer === 'Pigu.lt'
            ? '#A2B0B4'
            : customer === 'Gamtos Ateitis'
              ? '#A1AAAB'
              : customer === 'Orlen'
                ? '#263238'
                : customer === 'Novaturas'
                  ? '#32A1DA'
                  : customer === 'Toni'
                    ? '#ECDCC1'
                    : customer === 'KakeMake'
                      ? '#BEBDC3'
                      : '#F9F1DD';

  const road2 =
    customer === 'Barbora'
      ? 'white'
      : customer === 'Ikea'
        ? 'white'
        : customer === 'Unisend'
          ? 'white'
          : customer === 'Pigu.lt'
            ? '#FFFAE6'
            : customer === 'Gamtos Ateitis'
              ? '#FFFAE6'
              : customer === 'Orlen'
                ? 'white'
                : customer === 'Novaturas'
                  ? '#32A1DA'
                  : customer === 'Toni'
                    ? '#ECDCC1'
                    : customer === 'KakeMake'
                      ? '#BEBDC3'
                      : 'black';

  const maxWhiteLineWidthPercent = 0.01;
  const sideLineWidth = 1;

  let maxWhiteLineWidth = width * maxWhiteLineWidthPercent;
  let skyHeight = height * (1.0 - GROUND_PERCENT);
  let groundHeight = floor(height * GROUND_PERCENT);
  let roadStartX = (width - width * ROAD_WIDTH_PERCENT) / 2;
  let realTime = null;
  let gameTime = 0;
  let gameTimeAbsolute = 0;
  let newHighScoreReached = false;
  const curveOffsets = [];
  const cameraY = 30;
  const zMap = [];
  for (let i = 0; i < height; i++) {
    const worldY = cameraY;
    const d = i - (height - groundHeight);
    const z = d === 0 ? 0 : worldY / d;
    zMap.push(z);
  }

  for (let i = 0; i < floor(height - skyHeight); i++) {
    curveOffsets[i] = 0;
  }

  const roadSegments = range(zMap.length * 1).map((i) => {
    return {
      id: i,
      i: i % zMap.length,
      dx: dxForI(i),
    };
  });

  let movingSegment = {
    id: roadSegments[0].i,
    i: roadSegments[0].i,
    dx: roadSegments[0].dx,
  };

  let bottomSegment = {
    id: roadSegments[zMap.length - 1].i,
    i: roadSegments[zMap.length - 1].i,
    dx: roadSegments[zMap.length - 1].dx,
  };

  const roadWidths = [];
  for (let i = 0; i < zMap.length; i++) {
    const percent = i / height;
    const width = MAX_ROAD_WIDTH * percent;
    const startX = roadStartX + (MAX_ROAD_WIDTH - width) / 2;
    roadWidths.push({ x1: startX, x2: startX + width });
  }

  const whiteLineWidths = [];
  for (let i = 0; i < zMap.length; i++) {
    const percent = i / height;
    const width = maxWhiteLineWidth * percent;
    const startX = roadStartX + (MAX_ROAD_WIDTH - width) / 2;
    whiteLineWidths.push({ x1: startX, x2: startX + width });
  }

  const horizonI = skyHeight;
  const xCenter = floor(width / 2);

  let playerIForGround50 = 50;
  const playerI = playerIForGround50 + horizonI;
  const player = {
    image: carImage,
    pos: { x: 0, y: 0, z: zMap[playerI] },
    vel: { x: 0, y: 0, z: 0 },
    alpha: 1,
    active: true,
    activatedAt: 1,
    animatedAt: 1,
    frame: 0,
    dimensions: BIG_SPRITE_DIMENSIONS,
  };

  const envelopes = range(MAILBOX_HIT_AMOUNT * 10).map((_) => {
    randomNumber = (randomNumber + 1) % 4;
    return {
      image:
        customer === 'Gamtos Ateitis'
          ? randomNumber === 0
            ? envelopeImageGamtosAteitis
            : randomNumber === 1
              ? envelopeImage2GamtosAteitis
              : randomNumber === 2
                ? envelopeImage3GamtosAteitis
                : envelopeImage4GamtosAteitis
          : envelopeImage,
      pos: {
        x: randomIntBetween(0, width),
        y: randomIntBetween(-height, 0),
        z: 0,
      },
      vel: { x: randomFloatBetween(-1, 1), y: 1, z: 0 },
      alpha: 1,
      active: false,
      activatedAt: 0,
      animatedAt: 0,
      frame: 0,
      dimensions: SPRITE_DIMENSIONS,
    };
  });

  const clouds = range(10).map((_) => {
    return {
      image: cloudsImage,
      pos: {
        x: randomIntBetween(-width, width + BIG_SPRITE_DIMENSIONS),
        y: randomIntBetween(0, skyHeight - BIG_SPRITE_DIMENSIONS),
        z: 0,
      },
      vel: { x: randomFloatBetween(-0.6, -0.2), y: 0, z: 0 },
      alpha: 1,
      active: true,
      activatedAt: 0,
      animatedAt: 0,
      frame: randomIntBetween(0, 1),
      dimensions: BIG_SPRITE_DIMENSIONS,
    };
  });

  // These golds are the ones that are for the UI, not for picking up in the road
  const golds2 = range(GOLD_HIT_AMOUNT * 10).map((_) => {
    return {
      image: goldImage,
      pos: {
        x: randomIntBetween(0, width),
        y: randomIntBetween(-height, 0),
        z: 0,
      },
      vel: { x: randomFloatBetween(-1, 1), y: 1, z: 0 },
      alpha: 1,
      active: false,
      activatedAt: 0,
      animatedAt: 0,
      frame: 0,
      dimensions: SPRITE_DIMENSIONS,
    };
  });

  const wallParts = range(WALL_PARTICLES * 10).map(() => {
    return {
      image: null,
      pos: {
        x: 0,
        y: 0,
        z: 0,
      },
      vel: {
        x: randomFloatBetween(-WALL_PARTICLE_X_VEL, WALL_PARTICLE_X_VEL),
        y: WALL_PARTICLE_Y_VEL,
        z: 0,
      },
      alpha: 1,
      active: false,
      activatedAt: 0,
      animatedAt: 0,
      frame: 0,
      dimensions: WALL_DIMENSIONS,
    };
  });

  const truckSparks = range(TRUCK_SPARKS * 10).map(() => {
    return {
      image: null,
      pos: {
        x: 0,
        y: 0,
        z: 0,
      },
      vel: {
        x: randomFloatBetween(-TRUCK_SPARK_X_VEL, TRUCK_SPARK_X_VEL),
        y: TRUCK_SPARK_Y_VEL,
        z: 0,
      },
      alpha: 1,
      active: false,
      activatedAt: 0,
      animatedAt: 0,
      frame: 0,
      dimensions: TRUCK_SPARKS_DIMENSIONS,
    };
  });

  const trees = range(NUM_TREES).map(() => {
    const randomTreeImage = treeImage[Math.floor(Math.random() * treeImage.length)];
    const i = randomIntBetween(skyHeight, height);
    return {
      image: randomTreeImage,
      pos: {
        x: randomIntBetween(-width, -ROAD_SPRITE_SPAWN_X),
        y: 0,
        z: 0,
      },
      rect: { x: -1, y: -1, width: -1, height: -1 },
      i: i,
      iCoord: i,
      alpha: 1,
      name: 'tree',
      percentChanceOfSpawning: TREE_CHANCE_SPAWN,
      minTimeOffScreen: TREE_TIME_OFFSCREEN,
      lastOnScreenAt: null,
      roadPercent: random(),
      active: random() > 0.5 ? true : false,
      dimensions: BIG_SPRITE_DIMENSIONS,
      debug: false,
    };
  });

  function createLeftMailbox() {
    return {
      image: envelopeImages.length > 0 ? envelopeImages[Math.floor(Math.random() * envelopeImages.length)] : leftMailboxImage,
      pos: {
        x: randomIntBetween(-ROAD_SPRITE_SPAWN_X, ROAD_SPRITE_SPAWN_X),
        y: 0,
        z: 0,
      },
      rect: { x: -1, y: -1, width: -1, height: -1 },
      i: floor(skyHeight),
      iCoord: skyHeight,
      alpha: 1,
      name: 'mailbox',
      percentChanceOfSpawning: MAILBOX_CHANCE_SPAWN,
      minTimeOffScreen: MAILBOX_TIME_OFFSCREEN,
      lastOnScreenAt: null,
      roadPercent: random(),
      active: false,
      dimensions: customer === 'Toni' || customer === 'KakeMake' ? BIG_SPRITE_DIMENSIONS_85 : BIG_SPRITE_DIMENSIONS,
      debug: false,
    };
  }
  const leftMailboxes = range(4).map(() => createLeftMailbox());

  // RIGHT MAILBOXES DISABLED because they are not displayed correctly in game
  const rightMailboxes = [];
  // const rightMailboxes = range(customer === 'Unisend' ? 2 : 1).map(() => {
  //   return {
  //     image: rightMailboxImage,
  //     pos: {
  //       x: randomIntBetween(-ROAD_SPRITE_SPAWN_X, ROAD_SPRITE_SPAWN_X),
  //       y: 0,
  //       z: 0,
  //     },
  //     rect: { x: -1, y: -1, width: -1, height: -1 },
  //     i: floor(skyHeight),
  //     iCoord: skyHeight,
  //     alpha: 1,
  //     name: 'mailbox',
  //     percentChanceOfSpawning: MAILBOX_CHANCE_SPAWN,
  //     minTimeOffScreen: MAILBOX_TIME_OFFSCREEN,
  //     lastOnScreenAt: null,
  //     roadPercent: random(),
  //     active: false,
  //     dimensions: BIG_SPRITE_DIMENSIONS,
  //     debug: false,
  //   };
  // });

  const golds = range(customer === 'Unisend' ? 4 : 2).map(() => {
    randomNumber = randomNumber + 1;
    if (customer === 'Gamtos Ateitis') randomNumber = (randomNumber + 1) % 3;

    return {
      image:
        customer === 'Unisend' && language === 'LV'
          ? randomNumber % 2 === 1
            ? goldImageUnisendLV1
            : goldImageUnisendLV2
          : customer === 'Gamtos Ateitis'
            ? randomNumber === 0
              ? goldImageGamtosAteitis
              : randomNumber === 1
                ? goldImage2GamtosAteitis
                : goldImage3GamtosAteitis
            : goldImage,
      pos: {
        x: randomIntBetween(-ROAD_SPRITE_SPAWN_X, ROAD_SPRITE_SPAWN_X),
        y: 0,
        z: 0,
      },
      rect: { x: -1, y: -1, width: -1, height: -1 },
      i: floor(skyHeight),
      iCoord: skyHeight,
      alpha: 1,
      name: 'gold',
      percentChanceOfSpawning: 0.01,
      minTimeOffScreen: 10,
      lastOnScreenAt: null,
      roadPercent: random(),
      active: false,
      dimensions: customer === 'Toni' || customer === 'KakeMake' ? BIG_SPRITE_DIMENSIONS_85 : BIG_SPRITE_DIMENSIONS,
      debug: false,
    };
  });

  function createWall() {
    return {
      image: wallImage,
      pos: {
        x: randomIntBetween(-ROAD_SPRITE_SPAWN_X, ROAD_SPRITE_SPAWN_X),
        y: 0,
        z: 0,
      },
      rect: { x: -1, y: -1, width: -1, height: -1 },
      i: floor(skyHeight),
      iCoord: skyHeight,
      alpha: 1,
      name: 'wall',
      percentChanceOfSpawning: 0.05,
      minTimeOffScreen: 5,
      roadPercent: random() + 5,
      lastOnScreenAt: null,
      active: false,
      dimensions: BIG_SPRITE_DIMENSIONS,
      debug: false,
    };
  }

  const walls = range(INITIAL_WALLS).map(() => createWall());

  const roadSprites = [];

  const MAX_TEX = 2;
  const TEX_DEN = MAX_TEX * 10;
  const TURNING_SPEED = 4.8;

  const SLOW_MULTIPLIER = 4;
  const normalTime = 70;
  const SIDE_SPRITE_INCREASE = 1.4;
  const slowTime = normalTime * SLOW_MULTIPLIER;
  const boundUpdateGame = gameLoop(MAX_FPS, updateGame, this);
  const boundUpdateTitleScreen = gameLoop(MAX_FPS, updateTitleScreen, this);
  let turningSpeed = TURNING_SPEED;
  let spriteIncrease = SIDE_SPRITE_INCREASE;
  let xOffset = 0;
  let graceMultiplier = 1;

  function tick(t) {
    realTime = t;
    ctx.globalAlpha = 1.0;
    if (document.getElementById('boomio-widget-content')) {
      requestAnimationFrame(tick);
    }
    const divisor = inGracePeriod() ? slowTime : normalTime;
    gameTime += 10 / divisor;
    gameTimeAbsolute += 10 / normalTime;
    graceMultiplier = inGracePeriod() ? 1 / SLOW_MULTIPLIER : 1;

    turningSpeed = TURNING_SPEED * graceMultiplier;

    function getSpeedMultiplier(score) {
      return Math.min(1 + score / 5000, 4);
    }

    spriteIncrease = SIDE_SPRITE_INCREASE * graceMultiplier * getSpeedMultiplier(gameVars.currentScore);

    if (gameVars.started) {
      initGame(t);
    } else {
      runTitleScreen(t);
      gameVars.rulesShow = true;
    }

    if (!instructionsFlashedRecently()) {
      gameVars.lastFlashedInstructionsAt = gameTime;
      instructionsAlpha = instructionsAlpha === 1.0 ? 0.0 : 1.0;
    }
  }

  function isButtonPressed() {
    const touchPressed = pointerState.upAt && gameTime - pointerState.upAt < TOUCH_TIME;
    return inputState.left || inputState.right || inputState.jump || touchPressed;
  }

  function runTitleScreen(t) {
    boundUpdateTitleScreen(t);

    if (!gameVars.rulesShow) {
      setTimeout(
        () => {
          document.getElementById('background_intro').style.transition = 'opacity 1s ease';
          document.getElementById('background_intro').style.opacity = 0;
          if (gameCount === 0) {
            document.getElementById('background_blur').style.display = 'block';
            document.getElementById('background_blur').style.transition = 'opacity 0.8s ease';
          }
          showRulesOrRegistration();

          // Hide intro after fade completes (1000ms transition duration)
          setTimeout(() => {
            document.getElementById('background_intro').style.display = 'none';
            createHandlers(t);
          }, 1000);
        },
        customer === 'Toni' ? 0 : 2000,
      ); //intro speed
    }
    drawTitleScreen();
  }

  async function clickEventHandlerShowRules() {
    if (gameCount === 0) {
      setTimeout(async () => {
        const nameInput = Elements.nameInput;
        const phoneInput = Elements.phoneInput;
        const schoolInput = document.querySelector('.boomio-competition-school-select');

        const checkboxImgChange = document.getElementById('privacyCheckboxImg');
        const checkboxImgChange2 = document.getElementById('privacyCheckboxImg2');

        const checkboxImgSrc = checkboxImgChange.src; // Get the 'src' attribute of the image
        const checkboxImgSrc2 = checkboxImgChange2.src; // Get the 'src' attribute of the image

        const checkboxChange = checkboxImgSrc.includes('Uncheck') ? false : true;
        const checkboxChange2 = checkboxImgSrc2.includes('Uncheck') ? false : true;

        if (!InputValidator.validateRegistrationInputs()) {
          return;
        }

        if (showCompetitiveRegistration && checkboxChange) {
          if (customer === 'Gamtos Ateitis') {
            didYouKnowContainer.updateProps();
          }
          boomioService
            .signal('', 'user_info', {
              emails_consent: checkboxChange2,
              user_email: Elements.isVisible(Elements.emailInput) && Elements.getEmailValue(),
              user_name:
                customer === 'Toni'
                  ? nameInput?.value.trimEnd() + phoneInput?.value
                  : (Elements.isVisible(Elements.nameInput) && Elements.nameInput?.value?.trim()) || (Elements.isVisible(Elements.emailInput) && Elements.getEmailValue()),
              ...(customer.includes('Gamtos Ateitis') && {
                team: schoolInput.value,
              }),
              ...(phoneInput?.value?.trim() ? { phone: phoneInput?.value } : {}),
            })
            .then((response) => {
              if (response.success === false) {
                if (response.res_code === 'EMAIL_EXIST') {
                  InputValidator.toggleValidationError(Elements.emailError, true, InputValidator.getEmailExistsErrorMessage());
                } else if (response.res_code === 'NICKNAME_EXIST') {
                  InputValidator.toggleValidationError(Elements.nameError, true, InputValidator.getNicknameExistsErrorMessage());
                }
              } else {
                bestScore = response.user_best_score ?? 0;
                const inpuRegisterContainer = document.querySelector('.input-register-container');
                inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
                setTimeout(() => {
                  inpuRegisterContainer.style.height = '10px';
                  inpuRegisterContainer.style.top = 'calc(50% + 330px)';
                  inpuRegisterContainer.style.opacity = 0;
                }, 100);
                setTimeout(() => {
                  inpuRegisterContainer.style.display = 'none';
                }, 1000);
                setTimeout(() => {
                  document.getElementById('background_blur').style.opacity = 0.37;
                  document.getElementById('background_blur').style.zIndex = 3;
                  const inputContainer = document.querySelector('.input-container');
                  document.getElementById('control-button').style.transition = 'opacity 2s ease';
                  document.getElementById('control-button').style.opacity = 1;
                  document.getElementById('control-button').style.display = 'flex';
                  inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
                  inputContainer.style.display = 'block';
                  setTimeout(() => {
                    inputContainer.style.height = '332px';
                    inputContainer.style.top = 'calc(50% + 170px)';
                    inputContainer.style.opacity = 1;
                  }, 100);
                }, 300);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }, 300);
    }
  }

  function createHandlers(t) {
    const start = document.getElementById('control-button');
    start.addEventListener('click', function () {
      removeRules(t);
    });

    const competitionConfirmField = document.getElementById('boomio-competition-confirm-field');
    competitionConfirmField.addEventListener('click', clickEventHandlerShowRules);
    if (customer === 'Pigu.lt') {
      const competitionRestart = document.getElementById('boomio-game-play-again-pigu');
      competitionRestart.addEventListener('click', showRulesPigu);
    }
    const competitionRestart = document.getElementById('boomio-game-play-again');
    competitionRestart.addEventListener('click', clickEventHandlerResetGame);

    if (customer === 'Pigu.lt' || customer === 'Gamtos Ateitis') {
      const competitionDidYouKnow = document.getElementById('boomio-close-did-you-know');
      competitionDidYouKnow.addEventListener('click', clickEventHandlerDidYouKnow);
    }
  }

  function hideScore() {
    const new_highscore = document.querySelector('.new_highscore');
    const new_highscore_stars = document.querySelector('.new_highscore_stars');
    const numbers = document.querySelector('.numbers');

    numbers.style.transition = 'opacity 0.5s ease';
    numbers.style.opacity = 0;
    new_highscore.style.transition = 'opacity 0.5s ease';
    new_highscore.style.opacity = 0;
    new_highscore_stars.style.transition = 'opacity 0.5s ease';
    new_highscore_stars.style.opacity = 0;

    setTimeout(() => {
      new_highscore.style.display = 'none';
      new_highscore_stars.style.display = 'none';
      numbers.style.display = 'none';
    }, 500);
  }

  const clickEventHandlerDidYouKnow = () => {
    const didYouKnowTableContainer = document.querySelector('.did-you-know-container');

    didYouKnowTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      didYouKnowTableContainer.style.height = '10px';
      didYouKnowTableContainer.style.top = 'calc(50% + 330px)';
      didYouKnowTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      didYouKnowTableContainer.style.display = 'none';
    }, 1000);
    const competitionTableContainer = document.querySelector('.competition-table-container');
    document.getElementById('background_blur').style.display = 'block';
    competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    competitionTableContainer.style.display = 'block';

    setTimeout(() => {
      competitionTableContainer.style.height = '680px';
      competitionTableContainer.style.top = 'calc(50%)';
      competitionTableContainer.style.opacity = 1;
    }, 100);
  };

  const clickEventHandlerResetGame = () => {
    const competitionRestart = document.getElementById('boomio-game-play-again');
    competitionRestart.removeEventListener('click', clickEventHandlerResetGame);
    setTimeout(() => {
      competitionRestart.addEventListener('click', clickEventHandlerResetGame);
    }, 2000);

    const controlButton = document.querySelector('.control-button1');
    const competitionTableContainer = document.querySelector('.competition-table-container');

    competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      competitionTableContainer.style.height = '10px';
      competitionTableContainer.style.top = 'calc(50% + 330px)';
      competitionTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      competitionTableContainer.style.display = 'none';
    }, 1000);

    setTimeout(() => {
      if (showCompetitiveRegistration) {
        boomioService
          .signal('ROUND_STARTED', 'signal')
          .then((response) => {
            if (customer === 'Pigu.lt') {
              if (window.Boomio) {
                window.Boomio.logEvent('game_started', JSON.stringify(response));
              } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Boomio) {
                var message = {
                  command: 'logEvent',
                  name: 'game_started',
                  parameters: { response },
                };
                window.webkit.messageHandlers.Boomio.postMessage(message);
              } else {
                console.log('No native APIs found.');
              }
            }
            document.getElementById('background_blur').style.display = 'none';
            const canvas = document.getElementById('boomio-drive-canvas');
            canvas.style.transition = 'filter 1s ease';
            canvas.style.filter = 'none';

            restartGame();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }, 400);
  };

  function showRulesOrRegistration() {
    const user_id = config.userId;

    if (customer === 'Pigu.lt' && bestScore <= 0) {
      const checkboxImg3 = document.querySelector('.boomio-rules-privacyCheckbox');
      checkboxImg3?.addEventListener('click', () => {
        checkboxChange3 = !checkboxChange3;
        const checkboxImgChange3 = document.getElementById('boomio-rules-privacyCheckbox-img');
        checkboxImgChange3.src = checkboxChange3 ? checkIcon : uncheckIcon;
      });
    }
    if (showCompetitiveRegistration && campaignUrl === '') {
      const citySelect = document.getElementById('city-select');
      const schoolSelect = document.getElementById('school-select');
      if (citySelect && schoolSelect) {
        citySelect.addEventListener('change', () => {
          const selectedCity = citySelect.value;
          // Clear previous options
          schoolSelect.innerHTML = '';

          if (!selectedCity || selectedCity === 'Miestas ar rajonas') {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Pirmiau pasirink miestą ar rajoną';
            schoolSelect.appendChild(defaultOption);
            return;
          }

          const schools = (teams[selectedCity] || []).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
          if (schools.length === 0) {
            const noSchoolOpt = document.createElement('option');
            noSchoolOpt.value = '';
            noSchoolOpt.textContent = 'Mokyklu saraše nėra';
            schoolSelect.appendChild(noSchoolOpt);
          } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Tavo atstovaujama mokykla';
            schoolSelect.appendChild(defaultOption);
            schools.forEach((school) => {
              const opt = document.createElement('option');
              opt.value = school;
              opt.textContent = school;
              schoolSelect.appendChild(opt);
            });
          }
        });
      }

      const checkboxImg = document.querySelector('.boomio-privacyCheckbox');
      checkboxImg.addEventListener('click', () => {
        checkboxChange = !checkboxChange;
        const checkboxImgChange = document.getElementById('privacyCheckboxImg');
        checkboxImgChange.src = checkboxChange ? checkIcon : uncheckIcon;
      });

      const checkboxImg2 = document.querySelector('.boomio-privacyCheckbox2');
      checkboxImg2.addEventListener('click', () => {
        checkboxChange2 = !checkboxChange2;
        const checkboxImgChange2 = document.getElementById('privacyCheckboxImg2');
        checkboxImgChange2.src = checkboxChange2 ? checkIcon : uncheckIcon;
      });

      const emailInput = Elements.emailInput;

      if (customer === 'Toni' && emailInput) {
        emailInput.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/(?!^\+)[^0-9]/g, '');
        });
      }

      if (Elements.phoneInput) {
        Elements.phoneInput.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/(?!^\+)[^0-9]/g, '');
        });
      }

      if (customer === 'Orlen' && emailInput) {
        emailInput.value = '+370';

        emailInput.addEventListener('input', () => {
          if (!emailInput.value.startsWith('+370')) {
            emailInput.value = '+370' + emailInput.value.replace(/\D/g, '').slice(0, 8);
          } else {
            emailInput.value = '+370' + emailInput.value.slice(4).replace(/\D/g, '').slice(0, 8);
          }
        });

        emailInput.addEventListener('keydown', (e) => {
          // Prevent deleting or navigating into the +370 part
          if (emailInput.selectionStart <= 4 && (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft')) {
            e.preventDefault();
          }
        });

        emailInput.addEventListener('paste', (e) => {
          e.preventDefault(); // Block pasting
        });
      }

      setTimeout(() => {
        if (customer !== 'SaludSA') {
          document.getElementById('background_blur').style.opacity = language === 'LV' ? 0.4 : 0.37;
          applyCanvasBlur(customer);

          const inpuRegisterContainer = document.querySelector('.input-register-container');
          document.getElementById('control-button').style.transition = 'opacity 2s ease';
          document.getElementById('control-button').style.opacity = 1;
          inpuRegisterContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
          inpuRegisterContainer.style.display = 'block';
          setTimeout(() => {
            inpuRegisterContainer.style.height = '528px';
            inpuRegisterContainer.style.top = 'calc(50% + 74px)';
            inpuRegisterContainer.style.opacity = 1;
          }, 100);
        }
      }, 300);
    } else if (customer === 'Pigu.lt' && user_id !== '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          bestScore = response.user_best_score;
          didYouKnowContainer.updateProps();

          if (customer === 'Pigu.lt' && campaignUrlProp === 'https://hobbyhall.fi' && response.coupon_code) {
            competitionCodeScoreTableContainerPigu.updateProps(customer, scoreTable);

            const competitionTableContainer = document.querySelector('.competition-table-container-pigu');
            competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
            competitionTableContainer.style.display = 'block';
            setTimeout(() => {
              competitionTableContainer.style.height = '680px';
              competitionTableContainer.style.top = 'calc(50%)';
              competitionTableContainer.style.opacity = 1;
            }, 100);
          } else {
            bestScore = response.user_best_score;

            showRulesPigu();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if (customer === 'Pigu.lt' && user_id === '') {
      boomioService
        .signal('', 'user_info', {
          emails_consent: false,
          user_email: user_id,
          user_name: user_id,
        })
        .then((response) => {
          bestScore = response.user_best_score;

          showRulesPigu();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setTimeout(() => {
        document.getElementById('background_blur').style.opacity = language === 'LV' ? 0.4 : 0.37;
        applyCanvasBlur(customer);
        const inputContainer = document.querySelector('.input-container');
        document.getElementById('control-button').style.transition = 'opacity 2s ease';
        document.getElementById('control-button').style.opacity = 1;
        inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
        inputContainer.style.display = 'block';
        setTimeout(() => {
          inputContainer.style.height = customer === 'Pigu.lt' ? '400px' : '332px';
          inputContainer.style.top = `calc(50% + ${isMobileHeightSmall ? '110px' : '170px'})`;
          inputContainer.style.opacity = 1;
        }, 100);
      }, 300);
    }
  }

  function showRulesPigu() {
    config = localStorageService.getDefaultConfig();
    bestScore = config.bestScore ? config.bestScore : 0;

    if (bestScore > 0) {
      document.getElementById('boomio-rules-privacyCheckbox').style.display = 'none';
    }
    const competitionTableContainer = document.querySelector('.competition-table-container-pigu');

    competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    setTimeout(() => {
      competitionTableContainer.style.height = '10px';
      competitionTableContainer.style.top = 'calc(50% + 330px)';
      competitionTableContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      competitionTableContainer.style.display = 'none';
    }, 1000);
    setTimeout(() => {
      document.getElementById('background_blur').style.opacity = language === 'LV' ? 0.4 : 0.37;
      applyCanvasBlur(customer);
      const inputContainer = document.querySelector('.input-container');
      document.getElementById('control-button').style.transition = 'opacity 2s ease';
      document.getElementById('control-button').style.opacity = 1;
      inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
      inputContainer.style.display = 'block';
      setTimeout(() => {
        inputContainer.style.height = customer === 'Pigu.lt' ? '400px' : '332px';
        inputContainer.style.top = `calc(50% + ${isMobileHeightSmall ? '110px' : '170px'})`;
        inputContainer.style.opacity = 1;
      }, 100);
    }, 300);
  }

  function initGame(t) {
    eventHandler();
    runGame(t);
  }

  function removeRules(t) {
    const inputContainer = document.querySelector('.input-container');
    const controlButton = document.querySelector('.control-button');

    inputContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';
    controlButton.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
      inputContainer.style.height = '10px';
      inputContainer.style.top = 'calc(50% + 330px)';
      inputContainer.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      inputContainer.style.display = 'none';
    }, 1000);

    if (gameCount === 0) {
      const controlButton = document.querySelector('.control-button');
      controlButton.style.display = 'none';
    }

    setTimeout(() => {
      const canvas = document.getElementById('boomio-drive-canvas');
      canvas.style.transition = 'filter 1s ease';
      canvas.style.filter = 'none';
    }, 400);
    gameVars.rulesHide = true;
    initGame(t);
  }

  function updateTitleScreen() {
    if (isButtonPressed()) {
      gameVars.startedAt = gameTime;
      gameVars.started = true;
    }
  }

  function drawTitleScreen() {
    xOffset = xCenter;

    drawSky();
    let textureCoord = 0;
    drawGround(road1);
    for (let i = zMap.length - 1; i > skyHeight; i--) {
      textureCoord += MAX_TEX / TEX_DEN;
      drawRoad(i, textureCoord);
    }
    drawCityHouse();

    envelopes.forEach((envelope) => {
      if (envelope.pos.y > height) {
        envelope.pos.x = randomIntBetween(0, width);
        envelope.pos.y = randomIntBetween(-height, 0);
      }
      envelope.pos.x += envelope.vel.x;
      envelope.pos.y += envelope.vel.y;

      const { x, y } = envelope.pos;
      ctx.globalAlpha = 1.0;
      ctx.drawImage(envelope.image, x, y, COLLECTABLE_DIMENSION, COLLECTABLE_DIMENSION);
    });

    if (gameVars.rulesHide) {
      if (gameCount === 0) {
        const tutorial = document.querySelector('.tutorial');
        tutorial.style.display = 'block';
        document.getElementById('background_blur').style.display = 'block';
      }
    }
  }

  function drawInstructions() {
    const tutorial = document.querySelector('.tutorial');
    tutorial.style.display = 'none';
    document.getElementById('background_blur').style.display = 'none';
    boomioService
      .signal('ROUND_STARTED', 'signal')
      .then((response) => {
        if (customer === 'Pigu.lt') {
          if (window.Boomio) {
            window.Boomio.logEvent('game_started', JSON.stringify(response));
          } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Boomio) {
            var message = {
              command: 'logEvent',
              name: 'game_started',
              parameters: { response },
            };
            window.webkit.messageHandlers.Boomio.postMessage(message);
          } else {
            console.log('No native APIs found.');
          }
        }
        document.getElementById('background_blur').style.display = 'none';
        const canvas = document.getElementById('boomio-drive-canvas');
        canvas.style.transition = 'filter 1s ease';
        canvas.style.filter = 'none';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function advanceRoadSprites(sprites) {
    if (gameVars.timeLeft >= START_TIME) return;
    sprites.forEach((sprite) => {
      const increase = spriteIncrease;
      sprite.iCoord = clamp(sprite.iCoord + increase, skyHeight - sprite.dimensions - SPRITE_HORIZON_OFFSET, height - 1);
      sprite.i = round(sprite.iCoord);
    });
  }

  function dxForI(i) {
    return CURVE_AMPLITUDE * sin(CURVE_FREQUENCY * i);
  }

  function runGame(t) {
    boundUpdateGame(t);
    drawGame();
  }

  function restartGame() {
    LOST_LIFE = 0;
    gameCount++;
    // Stop playing the song from the previous game over
    gameVars.gameOver = false;
    gameVars = {
      started: true,
      funding: START_FUNDING,
      visibleFunding: START_FUNDING,
      timeLeft: START_TIME,
      currentScore: 0,
      gameOver: false,
      playedGameOverSound: false,
      readyToRestart: false,
      countdownBeepsPlayed: [],
      startedAt: gameTime,
      gameOverAt: null,
      lastHitAt: null,
      lastFlashedAt: null,
      lastTimeDecrementedAt: null,
      lastFlashedInstructionsAt: null,
    };

    inputState.left = false;
    inputState.right = false;
    inputState.jump = false;

    pointerState.down = false;
    pointerState.downAt = null;
    pointerState.upAt = null;
    pointerState.playerX = null;
    pointerState.x = null;
    pointerState.y = null;

    restartTimeout = null;
    golds.forEach((s) => resetRoadSprite(s));
    clearArray(leftMailboxes);
    range(4).forEach(() => leftMailboxes.push(createLeftMailbox()));

    leftMailboxes.forEach((s) => resetRoadSprite(s));
    clearArray(walls);
    range(INITIAL_WALLS).forEach(() => walls.push(createWall()));
    buildUpRoadSprites();
  }

  function updateGame() {
    if (readyToDecrementTime()) updateTimeLeft();

    if (gameVars.gameOver) {
      // if (gameVars.readyToRestart && isButtonPressed()) restartGame();
    } else {
      handlePlayerInput(turningSpeed);
      advanceRoadSprites(roadSprites);
      addWall();
    }

    if (isLifeCustomer(customer)) {
      if (DEFAULT_LIFE <= LOST_LIFE) gameOverLifeZero();
    }

    if (gameVars.funding <= 0) gameOverFundingZero();
    if (gameVars.timeLeft <= 0) gameOverTimeZero();
  }

  function drawGame() {
    drawSky();
    drawGround(road1);
    drawClouds();

    let textureCoord = 0;
    movingSegment.i -= spriteIncrease;

    if (!inGracePeriod()) unsetShake();

    xOffset = xCenter + player.pos.x;
    dx = 0;
    ddx = 0;

    for (let i = zMap.length - 1; i > skyHeight; i--) {
      textureCoord += MAX_TEX / TEX_DEN;
      //Handle curves
      if (i < movingSegment.i) {
        dx = bottomSegment.dx;
      } else if (i >= movingSegment.i) {
        dx = movingSegment.dx;
      }

      ddx += dx;
      curveOffsets[i - skyHeight] += ddx;

      drawRoad(i, textureCoord);
    }

    //Moving segment reached horizon
    if (movingSegment.i <= 0) {
      bottomSegment.dx = movingSegment.dx;
      bottomSegment.i = movingSegment.i;

      movingSegment.i = zMap.length - 1;
      const movingSegmentIndex = roadSegments.indexOf(roadSegments.find((segment) => segment.id === movingSegment.id));
      let segmentIndex = movingSegmentIndex + 1;
      if (segmentIndex > roadSegments.length - 1) segmentIndex = 0;

      movingSegment.dx = roadSegments[segmentIndex].dx;
      movingSegment.id = roadSegments[segmentIndex].id;
    }

    if (document.getElementById('boomio-widget-content')) {
      drawRoadSprites();
      drawTrees();
      drawEnvelopes();
      drawTruck();
      drawTruckSparks();
      drawUi();
      drawGameOver();
    }

    const clickHandler = function () {
      startHandler = false;
      gameCount = 1;
      const canvas = document.getElementById('boomio-drive-canvas');
      canvas.removeEventListener('click', clickHandler);
      drawInstructions();
    };

    if (startHandler) {
      const canvas = document.getElementById('boomio-drive-canvas');
      canvas.addEventListener('click', clickHandler);
    }
    const keyHandler = function (event) {
      if (startHandler && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        // Trigger clickHandler on arrow key press
        clickHandler();
      }
    };

    // Add the event listener for keydown events
    window.addEventListener('keydown', keyHandler);

    drawCity();
  }

  function drawRoadSprites() {
    if (gameVars.timeLeft >= START_TIME) return;
    roadSprites.forEach((sprite) => {
      if (sprite.i === -1) return;
      if (!sprite.active && !gameVars.gameOver) {
        if (!spriteReadyToBeOnScreen(sprite)) return;
        if (!isLucky(sprite.percentChanceOfSpawning)) return;
        activateSprite(sprite);
      }

      if (sprite.alpha < 1) sprite.alpha += ALPHA_INCREASE_AMOUNT;
      if (overlaps(sprite) && !gameVars.gameOver) handleOverlap(sprite);

      drawImage(sprite.image, ZERO_POS, spriteOffset(sprite), sprite.i, sprite.dimensions, false, sprite.alpha, 0, 0, sprite.debug);

      if (sprite.i > zMap.length - 2) deactivateSprite(sprite);
    });
  }

  function roadWidthForI(i) {
    const totalPercent = i / height;
    const currentRoadWidth = MAX_ROAD_WIDTH * totalPercent;
    return currentRoadWidth;
  }

  function drawRoad(i, textureCoord) {
    const zWorld = zMap[i];
    const index = (textureCoord + gameTime + zWorld) % MAX_TEX;

    const whiteLineWidth = whiteLineWidths[i];
    const roadWidth = roadWidths[i];
    const percent = Math.max(i / groundHeight, 0.3);
    const curve = curveOffsets[i - skyHeight];

    const currentRoadWidth = roadWidthForI(i);

    // Draw grass image or color
    ctx.strokeStyle =
      index < MAX_TEX / 2
        ? customer === 'Ikea' || customer === 'Unisend'
          ? '#489B2D'
          : customer === 'Gamtos Ateitis'
            ? '#609966'
            : customer === 'Pigu.lt'
              ? '#9ECEFF'
              : customer === 'Orlen'
                ? '#7AC723'
                : customer === 'Novaturas'
                  ? '#2299DA'
                  : customer === 'Toni'
                    ? '#5E2B17'
                    : customer === 'KakeMake'
                      ? '#7CAC32'
                      : '#85B62D'
        : customer === 'Ikea' || customer === 'Unisend'
          ? '#489B2D'
          : customer === 'Pigu.lt'
            ? '#c8e1ff'
            : customer === 'Gamtos Ateitis'
              ? '#609966'
              : customer === 'Barbora'
                ? '#85B62D'
                : customer === 'Orlen'
                  ? '#7AC723'
                  : customer === 'Novaturas'
                    ? '#2299DA'
                    : customer === 'Toni'
                      ? '#7D3D1B'
                      : customer === 'KakeMake'
                        ? '#7CAC32'
                        : '#A9C734';
    ctx.beginPath();
    ctx.moveTo(round(0), i);
    const x1 = floor((width - currentRoadWidth) / 2 - xOffset + xCenter + curve) - 10;
    ctx.lineTo(x1, i);
    ctx.closePath();
    ctx.stroke();

    const x2 = floor(currentRoadWidth + x1) + 20;
    ctx.beginPath();
    ctx.moveTo(x2, i);
    ctx.lineTo(width, i);
    ctx.closePath();
    ctx.stroke();

    // Draw road lines
    ctx.strokeStyle = road2;
    ctx.beginPath();
    ctx.moveTo(Math.round(roadWidth.x1 - xOffset + xCenter + curve) + 20, i);
    ctx.lineTo(Math.round(roadWidth.x1 + sideLineWidth * percent - xOffset + xCenter + curve) + 20, i);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = road2;
    ctx.beginPath();
    ctx.moveTo(Math.round(roadWidth.x2 - xOffset + xCenter + curve) - 20, i);
    ctx.lineTo(Math.round(roadWidth.x2 - sideLineWidth * percent - xOffset + xCenter + curve) - 20, i);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = index < MAX_TEX / 2 ? road1 : road2;
    ctx.beginPath();
    ctx.moveTo(Math.round(whiteLineWidth.x1 - xOffset + xCenter + curve), i);
    ctx.lineTo(Math.round(whiteLineWidth.x2 - xOffset + xCenter + curve), i);
    ctx.closePath();
    ctx.stroke();

    textureCoord %= MAX_TEX;
  }

  function curveOffsetForSprite(sprite) {
    let i = floor(sprite.i + sprite.dimensions);
    i = clamp(i, height - 1, skyHeight + 1);

    let curveOffset = curveOffsets[i - skyHeight];
    return curveOffset;
  }

  function spriteOffset(sprite) {
    const roadWidth = roadWidths[sprite.i];
    let curveOffset = curveOffsetForSprite(sprite);
    return roadWidth.x1 + (roadWidth.x2 - roadWidth.x1) * sprite.roadPercent - player.pos.x + curveOffset;
  }

  function drawGameOver() {
    if (!gameVars.gameOver) return;
    player.alpha = 1;
    unsetShake();
  }

  function gameOverLifeZero() {
    configureGameOver();
    if (!gameVars.playedGameOverSound) {
      gameVars.playedGameOverSound = true;
    }
  }
  function gameOverFundingZero() {
    configureGameOver();
    if (!gameVars.playedGameOverSound) {
      gameVars.playedGameOverSound = true;
    }
  }

  function gameOverTimeZero() {
    configureGameOver();
    if (!gameVars.playedGameOverSound) {
      gameVars.playedGameOverSound = true;
    }
  }

  function configureGameOver() {
    gameVars.gameOver = true;

    if (!gameVars.gameOverAt) gameVars.gameOverAt = gameTime;
    if (!restartTimeout) {
      restartTimeout = window.setTimeout(() => {
        setTimeout(() => {
          if (newHighScoreReached) {
            const numbers = document.querySelector('.numbers');
            const new_highscore = document.querySelector('.new_highscore');
            const new_highscore_stars = document.querySelector('.new_highscore_stars');
            new_highscore_stars.style.display = 'block';

            new_highscore.style.display = 'block';
            numbers.style.display = 'block';

            setTimeout(() => {
              new_highscore.style.opacity = 1;
              new_highscore_stars.style.opacity = 1;

              numbers.style.opacity = 1;
            }, 200);

            const scoreDigits = document.querySelectorAll('.numbers__window__digit');

            // Update the score digits content
            const scoreString = gameVars.currentScore.toString();

            const initialMargin = 170;
            const scoreLength = gameVars.currentScore?.toString().length;
            if (scoreLength) {
              const newMarginLeft = initialMargin - 30 * scoreLength;
              numbers.style.marginLeft = `${newMarginLeft}px`;
            }

            // Determine the number of leading zeros to hide
            let leadingZeros = 0;
            while (leadingZeros < scoreString.length && scoreString[leadingZeros] === '0') {
              leadingZeros++;
            }

            // Hide all digits initially
            scoreDigits.forEach((digit) => {
              digit.style.display = 'none';
            });

            // Display each digit individually, starting from the first non-zero digit
            for (let i = leadingZeros; i < scoreString.length; i++) {
              scoreDigits[i - leadingZeros].textContent = scoreString[i];
              scoreDigits[i - leadingZeros].style.display = 'block';
              scoreDigits[i - leadingZeros].classList.add('boomio-counting-animation');
            }

            // Remove the counting class after a short delay
            setTimeout(() => {
              setTimeout(() => {
                newHighScoreReached = false;
              }, 2000);
              scoreDigits.forEach((digit) => {
                digit.classList.remove('boomio-counting-animation');
              });
            }, 1000);
          } else {
            const canvas = document.getElementById('boomio-drive-canvas');
            document.getElementById('background_blur').style.display = 'block';
          }
          setTimeout(() => {
            if (newHighScoreReached) {
              hideScore();
            }
            boomioService
              .signal('ROUND_FINISHED', 'signal', {
                score: gameVars.currentScore,
              })
              .then((response) => {
                if (customer === 'Pigu.lt') {
                  if (window.Boomio) {
                    window.Boomio.logEvent('game_finished', JSON.stringify(response));
                  } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Boomio) {
                    var message = {
                      command: 'logEvent',
                      name: 'game_finished',
                      parameters: { response },
                    };
                    window.webkit.messageHandlers.Boomio.postMessage(message);
                  } else {
                    console.log('No native APIs found.');
                  }
                }
                hideScore();

                scoreTable = response;
                scoreTableContainerInstance.updateProps(customer, scoreTable, gameVars.currentScore);
                const competitionRestart = document.getElementById('boomio-game-play-again');
                competitionRestart.addEventListener('click', clickEventHandlerResetGame);

                if (showCompetitiveRegistration === 'competition') {
                  scoreTable = response;
                  scoreTableContainerInstance.updateProps(customer, scoreTable, gameVars.currentScore);
                }
                if (showCompetitiveRegistration === 'collectable') {
                  const scoreDiv = document.getElementById('boomio-your-score');
                  scoreDiv.textContent = `TAVO REZULTATAS: ${gameVars.currentScore}`;

                  scoreTable = response;
                  scoreTableContainerInstance.updateProps(customer, scoreTable, gameVars.currentScore);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });

            let competitionTableContainer = '';
            if (customer === 'Pigu.lt' || customer === 'Gamtos Ateitis') {
              competitionTableContainer = document.querySelector('.did-you-know-container');
            } else {
              competitionTableContainer = document.querySelector('.competition-table-container');
            }
            const canvas = document.getElementById('boomio-drive-canvas');
            document.getElementById('background_blur').style.display = 'block';
            competitionTableContainer.style.transition = 'height 1s ease, top 1s ease, opacity 1s ease';

            competitionTableContainer.style.display = 'block';
            setTimeout(() => {
              competitionTableContainer.style.height = '680px';
              competitionTableContainer.style.top = 'calc(50%)';
              competitionTableContainer.style.opacity = 1;
            }, 100);
          }, 2000);

          let currentTimeDiv;
          if (isLifeCustomer(customer)) {
            currentTimeDiv = Elements.lifeInputContainer;
          } else {
            currentTimeDiv = document.getElementsByClassName('boomio-time-input-container')[0];
          }
          currentTimeDiv.style.opacity = 0;
          const currentScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
          currentScoreDiv.style.opacity = 0;
          setTimeout(() => {
            currentTimeDiv.style.display = 'none';
            currentScoreDiv.style.display = 'none';
          }, 300);
        }, 100);
        gameVars.readyToRestart = true;
      }, RESTART_TIMEOUT_TIME);
    }
  }

  function updateTimeLeft() {
    if (gameVars.gameOver) return;
    gameVars.timeLeft = max(gameVars.timeLeft - 1, 0);
    gameVars.lastTimeDecrementedAt = gameTimeAbsolute;
  }

  function handlePlayerInput(turningSpeed) {
    if (inputState.left) {
      player.pos.x -= turningSpeed;
    }

    if (inputState.right) {
      player.pos.x += turningSpeed;
    }

    // if (inputState.jump) jump();

    if (player.pos.y < 0) player.vel.y = clamp(graceMultiplier * (player.vel.y + GRAVITY), MAX_NEGATIVE_VEL, MAX_POSITIVE_VEL);

    if (player.pos.y > 0) {
      player.vel.y = 0;
      player.pos.y = 0;
      unsetLand();
      window.setTimeout(() => setLand(), 0);
      activateTruckSparks();
    }

    player.pos.y += clamp(player.vel.y, MAX_NEGATIVE_VEL, MAX_POSITIVE_VEL);
    player.pos.x = clamp(player.pos.x, -PLAYER_EDGE, PLAYER_EDGE);

    updatePlayerPos(player.pos.x, player.pos.y);
  }

  function activateTruckSparks() {
    const halfWidth = floor(player.dimensions / 2);
    const inactive = truckSparks.filter((spark) => spark.active !== true);
    const toActivate = truckSparks.slice(Math.max(inactive.length - TRUCK_SPARKS, 0));

    toActivate.forEach((spark, i) => {
      const left = random() > 0.5 ? -1 : 1;
      setTimeout(() => {
        spark.active = true;
        spark.activatedAt = gameTime;
        spark.pos.y = playerI + player.dimensions + 120;
        spark.pos.x = xCenter + left * halfWidth;
      }, TRUCK_SPARK_DELAY * i);
    });
  }

  function handleOverlap(sprite) {
    if (OVLERLAP_MAP[sprite.name]) OVLERLAP_MAP[sprite.name](sprite);
    deactivateSprite(sprite);
  }

  function handleWallOverlap(sprite) {
    if (inGracePeriod()) return;
    const halfWidth = player.dimensions / 3;
    gameVars.lastHitAt = gameTime;
    if (isLifeCustomer(customer)) {
      LOST_LIFE++;

      showScoreEffect('-1', true);
    } else {
      if (gameVars.currentScore > 100) {
        gameVars.currentScore -= min(100, 999);
      }

      document.getElementById('currentScore').innerHTML = `${gameVars.currentScore}`;
    }
    setShake();
    const inactive = wallParts.filter((part) => part.active !== true);
    const toActivate = wallParts.slice(Math.max(inactive.length - WALL_PARTICLES, 0));
    toActivate.forEach((part, i) => {
      setTimeout(() => {
        part.active = true;
        part.activatedAt = gameTime;
        part.pos.y = playerI + randomFloatBetween(-halfWidth, halfWidth);
        part.pos.x = spriteOffset(sprite) + randomFloatBetween(-halfWidth, halfWidth);
      }, WALL_PARTICLE_DELAY * i);
    });
  }

  function handleGoldOverlap(sprite) {
    const inactive = golds2.filter((gold) => gold.active !== true);
    const toActivate = golds2.slice(Math.max(inactive.length - GOLD_HIT_AMOUNT, 0));
    toActivate.forEach((gold, i) => {
      setTimeout(() => {
        gold.active = true;
        gold.activatedAt = gameTime;
        gold.pos.y = playerI;
        gold.pos.x = spriteOffset(sprite);
      }, ENVELOPE_DELAY * i);
    });
    gameVars.currentScore += min(100, 999);

    if (gameVars.currentScore > 1) {
      const currentScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
      currentScoreDiv.style.transition = 'opacity 0.8s ease';
      currentScoreDiv.style.display = 'block';
      currentScoreDiv.style.opacity = 1;
    }

    if (bestScore < gameVars.currentScore) {
      newHighScoreReached = true;
    }
    bestScore = Math.max(bestScore, gameVars.currentScore);
    document.getElementById('currentScore').innerHTML = `${gameVars.currentScore}`;
  }

  function handleMailboxOverlap(sprite) {
    const inactive = envelopes.filter((envelope) => envelope.active !== true);
    const toActivate = inactive.slice(Math.max(inactive.length - MAILBOX_HIT_AMOUNT, 0));
    toActivate.forEach((envelope, i) => {
      setTimeout(() => {
        envelope.active = true;
        envelope.activatedAt = gameTime;
        envelope.pos.y = playerI;
        envelope.pos.x = spriteOffset(sprite);
      }, ENVELOPE_DELAY * i);
    });
    gameVars.currentScore += min(50, 999);
    if (gameVars.currentScore > 1) {
      const currentScoreDiv = document.getElementsByClassName('boomio-score-input-container')[0];
      currentScoreDiv.style.transition = 'opacity 0.8s ease';
      currentScoreDiv.style.display = 'block';
      currentScoreDiv.style.opacity = 1;
    }
    if (bestScore < gameVars.currentScore) {
      newHighScoreReached = true;
    }
    bestScore = Math.max(bestScore, gameVars.currentScore);
    document.getElementById('currentScore').innerHTML = `${gameVars.currentScore}`;
  }

  function isLucky(percentChance) {
    return random() < percentChance;
  }

  function flashTruck() {
    if (!inGracePeriod()) {
      player.alpha = 1;
      return;
    }

    if (flashedRecently()) return;
    const alpha = player.alpha === 1 ? 0.5 : 1;
    gameVars.lastFlashedAt = gameTime;
    player.alpha = alpha;
  }

  function deactivateSprite(sprite) {
    sprite.active = false;
    sprite.lastOnScreenAt = gameTime;
  }

  function activateSprite(sprite) {
    sprite.active = true;
    let i = round(skyHeight - sprite.dimensions) - SPRITE_HORIZON_OFFSET;
    sprite.i = i;
    sprite.iCoord = i;
    sprite.roadPercent = random();
    sprite.alpha = 0;
  }

  function readyToDecrementTime() {
    return timeSinceLastTimeDecrement() > GAME_UPDATE_TIME && gameStartDelayHasPast();
  }

  function inGracePeriod() {
    return !!gameVars.lastHitAt && timeSinceLastHit() < HIT_TIME && !gameVars.gameOver;
  }

  function gameStartDelayHasPast() {
    return !!gameVars.startedAt && gameTime > gameVars.startedAt + GAME_START_DELAY;
  }

  function flashedRecently() {
    return timeSinceLastFlash() < FLASH_TIME;
  }

  function readyToAnimate(sprite) {
    return timeSinceLastAnimated(sprite) > ANIMATION_TIME && !gameVars.gameOver;
  }

  function instructionsFlashedRecently() {
    return timeSinceLastInstructionFlash() < INSTRUCTIONS_FLASH_TIME;
  }

  function timeSinceLastAnimated(sprite) {
    return gameTime - sprite.animatedAt;
  }

  function timeSinceLastTimeDecrement() {
    return gameTimeAbsolute - gameVars.lastTimeDecrementedAt;
  }

  function timeSinceLastHit() {
    return gameTime - gameVars.lastHitAt;
  }

  function timeSinceLastFlash() {
    return gameTime - gameVars.lastFlashedAt;
  }

  function timeSinceLastInstructionFlash() {
    return gameTime - gameVars.lastFlashedInstructionsAt;
  }

  function spriteReadyToBeOnScreen(sprite) {
    return timeSinceSpriteOnScreen(sprite) > sprite.minTimeOffScreen;
  }

  function timeSinceSpriteOnScreen(sprite) {
    return gameTime - sprite.lastOnScreenAt;
  }

  function drawTruck() {
    flashTruck();

    const { frame } = player;
    let nextFrame = frame;
    if (readyToAnimate(player)) {
      nextFrame = (frame + 1) % 2;
      player.animatedAt = gameTime;
    }

    const frameOffset = nextFrame * player.dimensions;
    player.frame = nextFrame;

    drawImage(
      player.image,
      player.pos,
      // Want car to be at the middle so start there and subtract off the player position
      xCenter - player.pos.x,
      playerI - getIntroOffset() + 120,
      player.dimensions,
      true,
      player.alpha,
      frameOffset,
      0,
    );
  }

  function drawSky() {
    if (customer === 'Ikea') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);

      gradient.addColorStop(0, '#48BCFD'); // Start color at 0%
      gradient.addColorStop(0.585, '#A1D4E0'); // End color at 58.5%

      ctx.fillStyle = gradient;

      ctx.fillRect(0, 0, width, height);
    } else if (customer === 'Unisend') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);

      gradient.addColorStop(0, '#FFF7CC'); // Start color at 0%
      gradient.addColorStop(0.396, '#FFDC00'); // End color at 58.5%

      ctx.fillStyle = gradient;

      ctx.fillRect(0, 0, width, height);
    } else if (isLifeCustomer(customer)) {
      if (backgroundImageLoaded) {
        ctx.drawImage(backgroundImage, 0, 0, width, height);
      }
    } else {
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function drawGround(fillStyle) {
    if (customer === 'Barbora') {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      // Add color stops to the gradient
      gradient.addColorStop(0.1457, '#707070');
      gradient.addColorStop(0.5042, '#959595');
      gradient.addColorStop(0.8626, '#707070');

      // Set the fill style to the gradient
      ctx.fillStyle = gradient;
      // Draw the rectangle with the gradient fill
      ctx.fillRect(0, skyHeight, width, groundHeight);
    } else if (customer === 'Ikea') {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      // Add color stops to the gradient
      gradient.addColorStop(0.1457, '#AAAAAA');
      gradient.addColorStop(0.5042, '#959595');
      gradient.addColorStop(0.8626, '#AAAAAA');

      // Set the fill style to the gradient
      ctx.fillStyle = gradient;
      // Draw the rectangle with the gradient fill
      ctx.fillRect(0, skyHeight, width, groundHeight);
    } else if (customer === 'Unisend') {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      // Add color stops to the gradient
      gradient.addColorStop(0.1457, '#959595');
      gradient.addColorStop(0.5042, '#AAA');
      gradient.addColorStop(0.8626, '#959595');
      // Set the fill style to the gradient
      ctx.fillStyle = gradient;
      // Draw the rectangle with the gradient fill
      ctx.fillRect(0, skyHeight, width, groundHeight);
    } else {
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, skyHeight, width, groundHeight);
    }
  }

  function drawCityHouse() {
    if (customer === 'Barbora') {
      ctx.save();
      ctx.translate(100 + 130 / 2, 200 + 130 / 2); // Move to the center of the image
      ctx.rotate(angle); // Rotate the image
      ctx.drawImage(backgroundImg2, -130 / 2, -130 / 2, 130, 130); // Draw the image, centered at the origin
      ctx.restore();

      ctx.drawImage(backgroundImg, -15, 229, 455, 115);
    }

    if (customer !== 'Barbora') {
      if (customer === 'Unisend') {
        ctx.drawImage(backgroundImg, -50, 148, 476, 185);
      } else if (isLifeCustomer(customer)) {
        ctx.drawImage(
          backgroundImg,
          0,
          0,
          432,
          279, // Use the full image as the source
          -3,
          108,
          426,
          225, // Destination: position (-3, 228), size (426x105)
        );
      } else {
        ctx.drawImage(backgroundImg, -3, 228, 426, 105);
      }
      drawImage(city1, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whStartPos, 200, HOUSE_BIG_SPRITE_DIMENSIONS);

      drawImage(city2, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whStartPos + HOUSE_BIG_SPRITE_DIMENSIONS, 200, HOUSE_BIG_SPRITE_DIMENSIONS);

      drawImage(city3, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whStartPos + 2 * HOUSE_BIG_SPRITE_DIMENSIONS, 200, HOUSE_BIG_SPRITE_DIMENSIONS);
    }
    angle += 0.01;
  }

  function drawCity() {
    if (customer === 'Barbora') {
      ctx.save();
      ctx.translate(100 + 130 / 2, 200 + 130 / 2); // Move to the center of the image
      ctx.rotate(angle); // Rotate the image
      ctx.drawImage(backgroundImg2, -130 / 2, -130 / 2, 130, 130); // Draw the image, centered at the origin
      ctx.restore();

      ctx.drawImage(backgroundImg, -15, 229, 455, 115);
    }
    if (customer !== 'Ikea') {
      ctx.drawImage(lineImg, 0, customer === 'Barbora' ? 340 : 330, 426, customer === 'Barbora' ? 7 : 8);
    }
    const whOffset = xCenter - xOffset;
    if (customer !== 'Barbora') {
      if (customer === 'Unisend') {
        ctx.drawImage(backgroundImg, -50, 148, 476, 185);
      } else if (isLifeCustomer(customer)) {
        ctx.drawImage(
          backgroundImg,
          0,
          0,
          432,
          279, // Use the full image as the source
          -3,
          108,
          426,
          225, // Destination: position (-3, 228), size (426x105)
        );
      } else {
        ctx.drawImage(backgroundImg, -3, 228, 426, 105);
      }
      drawImage(city1, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whOffset + whStartPos, 200, HOUSE_BIG_SPRITE_DIMENSIONS);
      drawImage(city2, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whOffset + whStartPos + HOUSE_BIG_SPRITE_DIMENSIONS, 200, HOUSE_BIG_SPRITE_DIMENSIONS);
      drawImage(city3, { x: -60, y: customer === 'Barbora' ? 10 : 5, z: 1 }, whOffset + whStartPos + 2 * HOUSE_BIG_SPRITE_DIMENSIONS, 200, HOUSE_BIG_SPRITE_DIMENSIONS);
    }
    angle += 0.01;
  }
  function drawUi() {
    if (gameVars.gameOver) return;
    const timeColor = gameVars.timeLeft > 20 ? 'white' : SPARK_COLOR;

    if (!isLifeCustomer(customer)) {
      document.getElementById('currentTime').innerHTML = `${gameVars.timeLeft}`;
      document.getElementById('currentTime').style.color = timeColor;

      const currectScoreDiv = document.getElementsByClassName('boomio-time-input-container')[0];
      currectScoreDiv.style.transition = 'opacity 0.8s ease';
      currectScoreDiv.style.display = 'block';
      currectScoreDiv.style.opacity = 1;
    } else {
      setLife();
    }

    drawFundingMeter();
  }

  function setLife() {
    const currectScoreDiv = document.getElementsByClassName('boomio-life-input-container')[0];
    currectScoreDiv.style.transition = 'opacity 0.8s ease';
    currectScoreDiv.style.display = 'block';
    document.getElementById('currentLife').innerHTML = `${Math.max(0, DEFAULT_LIFE - LOST_LIFE)}/${DEFAULT_LIFE}`;
    currectScoreDiv.style.opacity = 1;
  }

  function addWall() {
    const { timeLeft } = gameVars;
    const timeWalls = TIME_WALLS.filter((tw) => timeLeft <= tw.time);
    if (!timeWalls.length) return;
    const timeWall = timeWalls[timeWalls.length - 1];
    if (walls.length < timeWall.walls) {
      const wall = createWall();
      walls.push(wall);
      roadSprites.push(wall);
    }
  }

  function resetRoadSprite(sprite) {
    let x = randomIntBetween(-ROAD_SPRITE_SPAWN_X, ROAD_SPRITE_SPAWN_X);
    sprite.pos = {
      x,
      y: 0,
      z: 0,
    };
    sprite.roadPercent = random();
    sprite.lastOnScreenAt = null;
    sprite.alpha = 1;
    sprite.active = false;
  }

  function drawFundingMeter() {
    let fundingColor = GOOD_FUNDING_COLOR;

    if (gameVars.funding < TERRIBLE_FUNDING_LIMIT) {
      fundingColor = SPARK_COLOR;
    } else if (gameVars.funding < WARNING_FUNDING_LIMIT) {
      fundingColor = BAD_FUNDING_COLOR;
    }

    ctx.fillStyle = fundingColor;

    if (gameVars.funding > gameVars.visibleFunding) {
      gameVars.visibleFunding = min(gameVars.visibleFunding + VISIBILE_FUNDING_INCREASE, gameVars.funding);
    } else {
      gameVars.visibleFunding = max(gameVars.visibleFunding - VISIBILE_FUNDING_INCREASE, gameVars.funding);
    }

    // const width = floor((MAX_FUNDING_BAR * gameVars.visibleFunding) / 100);
    // ctx.fillRect(UI_PADDING, SECOND_ROW_Y + introOffset, width, FONT_SIZE + 1);
    // drawText(canvas, 'POWER', UI_PADDING, SECOND_ROW_Y + introOffset, FONT_SIZE);
  }

  function getWallParticlePosition(particle) {
    particle.pos.x += particle.vel.x;
    particle.pos.y += particle.vel.y;
    particle.vel.y += GRAVITY;
    const { x, y } = particle.pos;
    return { x, y };
  }

  function getIntroOffset() {
    const { startedAt } = gameVars;
    const t = clamp((gameTime - startedAt) / INTRO_TIME, 0, 1);
    const y = lerp(-height / 4, 0, t);
    return y;
  }

  function getCollectablePosition(sprite, yEndPosition = 0) {
    const { x, y } = sprite.pos;
    const { activatedAt } = sprite;
    const t = clamp((gameTime - activatedAt) / ENVELOPE_TIME, 0, 1);
    const x2 = lerp(x, 50, t);
    const y2 = lerp(y + 100, yEndPosition, t);
    return { x: x2, y: y2 };
  }

  function drawTruckSparks() {
    truckSparks
      .filter((sprite) => sprite.active)
      .forEach((part) => {
        const { x, y } = getWallParticlePosition(part);

        if (y >= height) {
          part.active = false;
          part.vel.y = WALL_PARTICLE_Y_VEL;
          return;
        }

        ctx.fillStyle = SPARK_COLOR;
        ctx.fillRect(x, y, part.dimensions, part.dimensions);
      });
  }

  function drawEnvelopes() {
    let triggerText = false;

    // Reset `triggerText` to ensure we only trigger text once
    // Handle wall parts
    wallParts
      .filter((sprite) => sprite.active)
      .forEach((part) => {
        const { x, y } = getWallParticlePosition(part);
        if (y >= height) {
          part.active = false;
          part.vel.y = WALL_PARTICLE_Y_VEL;
          return;
        }
        ctx.fillStyle = currentFillColor;
        ctx.fillRect(x, y + 100, part.dimensions * 2, part.dimensions);
        currentFillColor = currentFillColor === BAD_FUNDING_COLOR1 ? BAD_FUNDING_COLOR : BAD_FUNDING_COLOR1;
        if (customer !== 'Pigu.lt' && customer !== 'Gamtos Ateitis') {
          if (!isFading && !triggerText) {
            displayText = '-100'; // Set text
            textColor = 'red';
            fadeStartTime = performance.now(); // Start fade effect
            isFading = true; // Mark as fading
            textShouldBeVisible = true; // Flag to ensure text visibility
            triggerText = true; // Mark that text has been triggered
          }
        }
      });

    // Handle golds2
    golds2
      .filter((sprite) => sprite.active)
      .forEach((gold) => {
        const { x, y } = getCollectablePosition(gold, SECOND_ROW_Y);
        if (y === SECOND_ROW_Y) {
          gold.active = false;
          return;
        }

        if (!isFading && !triggerText) {
          displayText = '+100'; // Set text
          textColor = 'white';
          fadeStartTime = performance.now(); // Start fade effect
          isFading = true; // Mark as fading
          textShouldBeVisible = true; // Flag to ensure text visibility
          triggerText = true; // Mark that text has been triggered
        }
      });

    // Handle envelopes
    envelopes
      .filter((sprite) => sprite.active)
      .forEach((envelope) => {
        const { x, y } = getCollectablePosition(envelope, SECOND_ROW_Y);
        if (y === SECOND_ROW_Y) {
          envelope.active = false;
          return;
        }

        if (!isFading && !triggerText) {
          displayText = '+50'; // Set text
          textColor = 'white';
          fadeStartTime = performance.now(); // Start fade effect
          isFading = true; // Mark as fading
          textShouldBeVisible = true; // Flag to ensure text visibility
          triggerText = true; // Mark that text has been triggered
        }
      });

    // Draw the text with fading effect if it's visible
    if (textShouldBeVisible) {
      const elapsedTime = performance.now() - fadeStartTime;
      const fadeProgress = Math.min(elapsedTime / fadeDuration, 1);
      const opacity = 1 - fadeProgress; // Calculate opacity (fading out)

      ctx.globalAlpha = opacity; // Set text opacity

      ctx.font = '900 20px Georama';
      ctx.fillStyle = textColor;
      ctx.fillText(displayText, width / 2 - 20, 430); // Adjust the position as needed

      // Reset globalAlpha for other drawing operations
      ctx.globalAlpha = 1.0;

      // Clear text and reset state after fade effect is completed
      if (fadeProgress >= 1) {
        textShouldBeVisible = false; // Hide text
        isFading = false; // Reset fading flag
        displayText = ''; // Clear text
      }
    }
  }

  function showScoreEffect(score, showLife) {
    const canvas = document.getElementById('boomio-drive-canvas');
    const canvasRect = canvas.getBoundingClientRect();
    const x = canvasRect.left + canvasRect.width / 2 - 25;
    const y = canvasRect.top + canvasRect.height / 2 + 50;

    const gameContainer = document.querySelector('.game-container');

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('float-score');
    scoreContainer.style.left = `${x}px`;
    scoreContainer.style.top = `${y}px`;
    scoreContainer.style.position = 'absolute';
    scoreContainer.style.display = 'flex';

    if (showLife) {
      const scoreText = document.createElement('div');
      scoreText.innerHTML = `-`;
      scoreText.style.color = '#fff';
      scoreText.style.fontSize = '24px';
      scoreText.style.fontWeight = 'bold';
      scoreText.style.marginRight = '10px';
      scoreText.style.marginTop = '25px';

      const lifeImg = document.createElement('img');
      lifeImg.src = life;
      lifeImg.alt = 'Image Description';
      lifeImg.style.width = '70px';
      lifeImg.style.height = '50px';
      lifeImg.style.marginTop = '15px';
      lifeImg.style.marginLeft = '-20px';
      scoreContainer.appendChild(scoreText);
      scoreContainer.appendChild(lifeImg);
    } else {
      const scoreText = document.createElement('div');
      scoreText.innerHTML = `${score}`;
      scoreText.style.color = '#fff';
      scoreText.style.fontSize = '24px';
      scoreText.style.fontWeight = 'bold';
      scoreText.style.marginRight = '10px'; // Add space between text and image
      scoreContainer.appendChild(scoreText);
    }
    gameContainer.appendChild(scoreContainer);

    setTimeout(() => {
      scoreContainer.remove();
    }, 1000);
  }

  function drawTrees() {
    if (gameVars.timeLeft >= START_TIME) return;
    advanceRoadSprites(trees);
    trees.forEach((sprite) => {
      if (sprite.i === -1) return;
      if (!sprite.active && !gameVars.gameOver) {
        if (!spriteReadyToBeOnScreen(sprite)) return;
        if (!isLucky(sprite.percentChanceOfSpawning)) return;
        activateSprite(sprite);
      }

      if (sprite.alpha < 1) sprite.alpha += ALPHA_INCREASE_AMOUNT;

      const sign = sprite.roadPercent > 0.5 ? 1 : -1;

      drawImage(sprite.image, ZERO_POS_TREE, spriteOffset(sprite) + roadWidthForI(sprite.i) * sign, sprite.i, sprite.dimensions, false, sprite.alpha, 0, 0, sprite.debug);

      if (sprite.i > zMap.length - 2) deactivateSprite(sprite);
    });
  }

  function drawClouds() {
    clouds
      .filter((sprite) => sprite.active)
      .forEach((cloud) => {
        if (cloud.pos.x < -width) {
          cloud.pos.x = width + cloud.dimensions * 3;
          cloud.pos.y = randomIntBetween(0, skyHeight - BIG_SPRITE_DIMENSIONS);
        } else {
          cloud.pos.x += cloud.vel.x;
        }

        ctx.drawImage(cloud.image, 0, (cloud.frame * cloud.dimensions) / 2, cloud.dimensions, cloud.dimensions / 2, cloud.pos.x, cloud.pos.y, cloud.dimensions, cloud.dimensions / 2);
      });
  }

  function drawImage(image, pos, xOffset = 0, yOffset = 0, dimensions = SPRITE_DIMENSIONS, dontScale = true, alpha = 1, srcXOffset = 0, srcYOffset = 0, debug = false) {
    let scale = min(yOffset / height, 1) || 1;
    scale = dontScale ? 1 : scale;
    let xScaleOffset = dimensions / 2;
    if (!dontScale) xScaleOffset = (scale * dimensions) / 2;
    const yScaleOffset = dontScale ? 0 : scale * dimensions;

    const oldAlpha = ctx.globalAlpha;

    ctx.globalAlpha = alpha;
    ctx.drawImage(
      image,
      srcXOffset,
      srcYOffset,
      dimensions,
      dimensions,
      round(xOffset + pos.x - xScaleOffset),
      round(yOffset + pos.y + pos.z + yScaleOffset),
      round(dimensions * scale),
      round(dimensions * scale),
    );
    ctx.globalAlpha = oldAlpha;
  }

  async function load() {
    const imageData = await flipImage(mailboxImageData);
    requestAnimationFrame(tick);

    const image = new Image();
    image.src = imageData;

    rightMailboxes.forEach((mb) => (mb.image = image));
    buildUpRoadSprites();
  }

  function buildUpRoadSprites() {
    clearArray(roadSprites);
    roadSprites.push(...rightMailboxes, ...leftMailboxes, ...golds, ...walls);
  }

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function jump() {
    unsetLand();
    if (getIntroOffset() !== 0) return;
    if (player.pos.y !== 0) return;
    player.vel.y = JUMP_VELOCITY;
  }

  function updatePlayerPos(x, y) {
    player.pos.x = x;
    player.pos.y = y;
  }

  function resize() {
    const rect = canvasWrapper.getBoundingClientRect();

    const { width: canvasWidth, height: canvasHeight } = rect;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    if (canvasAspectRatio > aspectRatio) {
      canvas.style.height = `${canvasHeight}px`;
      const w = floor(canvasHeight * aspectRatio);
      canvas.style.width = `${w}px`;
    } else {
      canvas.style.width = `${canvasWidth}px`;
      const h = canvasWidth / aspectRatio;
      canvas.style.height = `${h}px`;
    }
  }

  const inputState = {
    left: false,
    right: false,
    jump: false,
  };

  const pointerState = {
    down: false,
    downAt: null,
    upAt: null,
    playerX: null,
    x: null,
    y: null,
  };

  function eventHandler() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          inputState.left = true;
          break;
        case 'ArrowRight':
          inputState.right = true;
          break;
        // case 'ArrowUp':
        //   inputState.jump = true;
        //   break;
        // case ' ':
        //   inputState.jump = true;
        //   break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          inputState.left = false;
          break;
        case 'ArrowRight':
          inputState.right = false;
          break;
        // case 'ArrowUp':
        //   inputState.jump = false;
        //   break;
        // case ' ':
        //   inputState.jump = false;
        //   break;
      }
    });
    document.getElementById('boomio-drive-canvas')?.addEventListener('touchstart', (e) => {
      pointerDown(e.touches[0].clientX);
    });

    document.getElementById('boomio-drive-canvas')?.addEventListener('touchend', () => {
      pointerUp();
    });

    document.getElementById('boomio-drive-canvas')?.addEventListener('mousedown', (e) => {
      pointerDown(e.clientX);
    });

    document.getElementById('boomio-drive-canvas')?.addEventListener('mousemove', (e) => {
      if (!pointerState.down) return;
      pointerMove(e.clientX);
    });

    document.getElementById('boomio-drive-canvas')?.addEventListener('touchmove', (e) => {
      pointerMove(e.touches[0].clientX);
    });

    document.getElementById('boomio-drive-canvas')?.addEventListener('mouseup', () => {
      pointerUp();
    });
  }

  function pointerDown(pointerX) {
    pointerState.down = true;
    pointerState.downAt = realTime;
    pointerState.upAt = null;
    const xPercentage = pointerX / width;
    const x = width * xPercentage;
    pointerState.x = x;
    pointerState.playerX = player.pos.x;
  }

  function pointerUp() {
    pointerState.down = false;
    if (realTime - pointerState.downAt < TOUCH_TIME) {
      // jump();
      pointerState.upAt = gameTime;
    }
    pointerState.downAt = null;
  }

  function pointerMove(pointerX) {
    const xPercentage = pointerX / width;
    const x = width * xPercentage;

    const diff = x - pointerState.x;

    if (gameVars.gameOver) return;
    player.pos.x = pointerState.playerX + diff;
  }

  load();

  async function flipImage(imageData) {
    const imgCanvas = document.createElement('canvas');
    const imgCtx = imgCanvas.getContext('2d');

    const image = new Image();
    // Convert the file path to a Blob URL
    const imageURL = URL.createObjectURL(await fetch(imageData).then((res) => res.blob()));
    image.src = imageURL;

    image.onload = () => {
      imgCtx.translate(image.width, 0);
      imgCtx.scale(-1, 1);
      imgCtx.drawImage(image, 0, 0);
    };

    image.onerror = (error) => {
      console.error('Error loading image:', error);
    };

    return new Promise((resolve) => {
      resolve(imgCanvas.toDataURL());
    });
  }
  function scaleForI(i) {
    return min(i / height, 1);
  }

  function overlaps(sprite) {
    const scale = scaleForI(sprite.i);
    const scaledSpriteDimensions = scale * sprite.dimensions;
    const r2y = sprite.i + scaledSpriteDimensions;
    const notThereYet = r2y < playerI;
    const collisionDivisor = sprite.name === 'wall' ? 3 : 1;

    const past = r2y - 120 > playerI + BIG_SPRITE_DIMENSIONS / collisionDivisor;

    if (notThereYet || past) return;

    const playerOffset = xCenter;

    const r1x = playerOffset - player.dimensions / 2;
    const r2x = spriteOffset(sprite) - (scale * sprite.dimensions) / 2;
    const r1w = player.dimensions;
    const r2w = sprite.dimensions * scale;

    // Adjusted player position and height for increased height
    const r1y = playerI + player.pos.y + 120; // Adding 120 to account for increased height
    const r1h = player.dimensions + 120; // Adding 120 to account for increased height
    const r2h = scaledSpriteDimensions;

    const h = r1y < r2y + r2h && r1y + r1h > r2y ? true : false;
    const w = r1x < r2x + r2w && r1x + r1w > r2x ? true : false;

    if (h && w) {
      return true;
    } else {
      return false;
    }
  }
  function range(number) {
    return Array.from(Array(number).keys());
  }

  function randomFloatBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomIntBetween(min, max) {
    return Math.floor(randomFloatBetween(min, max + 1));
  }

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function setShake() {
    if (canvas.classList.contains(SHAKE_CLASS_NAME)) return;
    canvas.classList.add(SHAKE_CLASS_NAME);
  }

  function unsetShake() {
    if (!canvas.classList.contains(SHAKE_CLASS_NAME)) return;
    canvas.classList.remove(SHAKE_CLASS_NAME);
  }

  function setLand() {
    if (canvas.classList.contains(LAND_CLASS_NAME)) return;
    canvas.classList.add(LAND_CLASS_NAME);
  }

  function unsetLand() {
    if (!canvas.classList.contains(LAND_CLASS_NAME)) return;
    canvas.classList.remove(LAND_CLASS_NAME);
  }

  function clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

  function gameLoop(frameRate, gameLogicFunction, context) {
    let lag = 0;
    let previousTimestamp = 0;

    return (timestamp) => {
      lag += Math.min(timestamp - previousTimestamp, frameRate);
      previousTimestamp = timestamp;

      while (lag >= frameRate) {
        gameLogicFunction.call(context, timestamp);
        lag -= frameRate;
      }
    };
  }
}

export default startGame;
