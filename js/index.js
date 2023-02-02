const localStoragePropertyName = 'boomioPluginConfig';

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


/////////// Modules Scripts ////////
const qrCodeScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/31e4e15bef157c67ef66db1e5767f9e003e3b24b/js/qrcode.min.js';

const localStorageScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/31e4e15bef157c67ef66db1e5767f9e003e3b24b/js/modules/localStorage.js';

const stylesEnviroimentScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/1921e9edcb923486c8401465121c1afb9564bf65/js/modules/stylesEnviroiment.js';

const animationScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/31e4e15bef157c67ef66db1e5767f9e003e3b24b/js/modules/animation.js';

const draggableScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/31e4e15bef157c67ef66db1e5767f9e003e3b24b/js/modules/draggable.js';

const boomioEventerScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/31e4e15bef157c67ef66db1e5767f9e003e3b24b/js/modules/boomioEventer.js';
/////////////////////////////////

///////////// Widgets Script ///////////////
const imageWidgetScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/8e352f90cfadb73c4afb4e4133e3a3af742937f2/js/imagePlugin.js?min=1';

const puzzleScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/1921e9edcb923486c8401465121c1afb9564bf65/js/puzzlePlugin.js';

const wheelScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/ac0aa0f495ebfe03af3a1579a60dbb33b25e6f45/js/wheelOfFortunePlugin.js';

const startWidgetScript = 'https://rawcdn.githack.com/boomio-api-v2/final-combined-wdigets-1/8e352f90cfadb73c4afb4e4133e3a3af742937f2/js/startWidget.js?min=1';
///////////////////////////

/////////Images  /////////
const appStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/appstore.png?raw=true';
const playStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/playstore.png?raw=true';
const dotImage =
    'https://github.com/boomio-api-v2/final-combined-wdigets-1/blob/DK/development/new-puzzle-widget-ui/images/boomio-app.png?raw=true';
//////////////////////////
const createScript = (url) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = "text/javascript";
    script.async = false;                                 // <-- this is important
    document.getElementsByTagName('head')[0].appendChild(script);
    return script;
};

const scriptsList = [
    qrCodeScript, localStorageScript, stylesEnviroimentScript, animationScript, draggableScript, boomioEventerScript
];

scriptsList.forEach((script) => createScript(script))