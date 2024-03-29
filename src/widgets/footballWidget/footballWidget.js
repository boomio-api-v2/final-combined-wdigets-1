import { widgetHtmlService } from '@/services';
import CMain from './js/CMain.js';

class FootballWidget {
  static ctx;

  constructor() {
    this.createContainer();
  }

  createContainer = () => {
    const myCanvas = document.createElement('div');
    myCanvas.setAttribute('id', 'boomio-NewGame-container');
    myCanvas.classList.add(
      'boomio--animation__wrapper',
      'boomio--animation__wrapper--initial',
      'box',
    );

    myCanvas.innerHTML = `

    <div id="parent" style="width:100%;height:100%;position:fixed;top:0px;left:0px;">
      <div id="canvas-wrapper">  <canvas id="canvas" class='ani_hack' width="1360" height="640"></canvas></div>
    </div>

    `;
    widgetHtmlService.container.appendChild(myCanvas);
    this.loadScripts(
      [
        'js/jquery-3.2.1.min.js',
        'js/easeljs-NEXT.min.js',
        'js/tweenjs.js',
        'js/screenfull.js',
        'js/howler.min.js',
        'js/platform.js',
        'js/ios_fullscreen.js',
        'js/ctl_utils.js',
        'js/sprite_lib.js',
        'js/settings.js',
        'js/CLang.min.js',
        'js/CPreloader.js',
        'js/CMain.js',
        'js/CTextButton.js',
        'js/CToggle.js',
        'js/CGfxButton.js',
        'js/CMenu.js',
        'js/CGame.js',
        'js/CInterface.js',
        'js/cannon.js',
        'js/cannon.demo.js',
        'js/CBall.js',
        'js/CScenario.js',
        'js/Three.js',
        'js/Detector.js',
        'js/smoothie.js',
        'js/Stats.js',
        'js/TrackballControls.js',
        'js/dat.gui.js',
        'js/CWinPanel.js',
        'js/CAreYouSurePanel.js',
        'js/CCreditsPanel.js',
        'js/CPause.js',
        'js/CGoalKeeper.js',
        'js/CStartBall.js',
        'js/CVector2.js',
        'js/CPlayer.js',
        'js/CScoreBoard.js',
        'js/CRollingScore.js',
        'js/CLaunchBoard.js',
        'js/CHandSwipeAnim.js',
        'js/CHelpText.js',
        'js/CGoal.js',
        'js/CCTLText.js',
      ],
      () => {
        // Scripts loaded callback
        this.initFootballGame();
      },
    );
  };

  loadScripts(sources, callback) {
    let loadedScripts = 0;

    sources.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false; // Ensure scripts are loaded in order
      script.onload = () => {
        loadedScripts++;
        if (loadedScripts === sources.length) {
          callback();
        }
      };
      document.head.appendChild(script);
    });
  }

  initFootballGame() {
    // Now that all scripts are loaded, you can initialize your game
    // For example:
    const oMain = new CMain({
      area_goal: [
        { id: 0, probability: 100 },
        { id: 1, probability: 80 },
        { id: 2, probability: 60 },
        { id: 3, probability: 80 },
        { id: 4, probability: 100 },
        { id: 5, probability: 75 },
        { id: 6, probability: 60 },
        { id: 7, probability: 50 },
        { id: 8, probability: 60 },
        { id: 9, probability: 75 },
        { id: 10, probability: 80 },
        { id: 11, probability: 65 },
        { id: 12, probability: 70 },
        { id: 13, probability: 65 },
        { id: 14, probability: 80 },
      ],
      num_of_penalty: 15,
      multiplier_step: 0.1,
      audio_enable_on_startup: false,
      fullscreen: true,
      check_orientation: true,
      num_levels_for_ads: 2,
    });
    $(oMain).on('start_session', function (evt) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeStartSession();
      }
    });

    $(oMain).on('end_session', function (evt) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeEndSession();
      }
    });

    $(oMain).on('start_level', function (evt, iLevel) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeStartLevel({ level: iLevel });
      }
    });

    $(oMain).on('restart_level', function (evt, iLevel) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeRestartLevel({ level: iLevel });
      }
    });

    $(oMain).on('end_level', function (evt, iLevel) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeEndLevel({ level: iLevel });
      }
    });

    $(oMain).on('save_score', function (evt, iScore, szMode) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeSaveScore({ score: iScore, mode: szMode });
      }
    });

    $(oMain).on('show_interlevel_ad', function (evt) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeShowInterlevelAD();
      }
    });

    $(oMain).on('share_event', function (evt, iScore) {
      if (getParamValue('ctl-arcade') === 'true') {
        parent.__ctlArcadeShareEvent({
          img: TEXT_SHARE_IMAGE,
          title: TEXT_SHARE_TITLE,
          msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
          msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1,
        });
      }
    });

    if (isIOS()) {
      setTimeout(function () {
        sizeHandler();
      }, 200);
    } else {
      sizeHandler();
    }
  }
}

export default () => {
  new FootballWidget();
};
