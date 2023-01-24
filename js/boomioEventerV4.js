const localStoragePropertyName = 'boomioPluginConfig';

const appStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/appstore.png?raw=true';
const playStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/playstore.png?raw=true';
const dotImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/dot.png?raw=true';

const scripts = [
    'https://cdn.jsdelivr.net/gh/boomio-api-v2/final-combined-wdigets@main/js/wheelOfFortunePluginV6.js'
];
const url = 'https://api.mars.boomio.com/easter-service/get-qr-code';
const requestBody = {
    user_session: "0818e86681915e375ac408d1f1",
    current_page_url: "https://wheel-of-fortune1234.myshopify.com/products/prodct-3",
    extra_data: {
        go_hunt: "true"
    }
};

class LocalStorageConfig {
    constructor() {
        this.config = this.getLocalStorageStringToObject()
    }
    getLocalStorageStringToObject() {
        const config = localStorage.getItem(localStoragePropertyName);
        return JSON.parse(config);
    }

    updateConfig (property) {
        this.config = { ...this.config, ...property }
        const objToString = JSON.stringify(this.config)
        localStorage.setItem(localStoragePropertyName, objToString)
    }

    getDefaultConfig() {
        const config = this.config;
        const success = config?.success ?? false;
        const animation = config?.ani ?? 0;
        const qrcode = config?.qrcode ?? '';
        const app_url = config?.app_url ?? '';

        return {
            success,
            qrcode,
            animation,
            app_url
        };
    };
};

const createScript = (url) => {
    const script = document.createElement('script');
    script.setAttribute('src', url)
    document.head.appendChild(script)
};

fetch(url, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(requestBody)
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.setItem(localStoragePropertyName, JSON.stringify(data));
        scripts.forEach((script) => {
            createScript(script);
        })
    }).catch(err => {
        console.log(err)
    })

