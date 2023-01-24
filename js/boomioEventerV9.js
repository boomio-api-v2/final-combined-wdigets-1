const localStoragePropertyName = 'boomioPluginConfig';

/////////// Scripts ////////
const puzzleScript = 'https://cdn.jsdelivr.net/gh/boomio-api-v2/final-combined-wdigets-1@main/js/puzzlePlugin.js';
const wheelScript = 'https://cdn.jsdelivr.net/gh/boomio-api-v2/final-combined-wdigets@main/js/wheelOfFortunePluginV6.js';
///////////////////////////

const appStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/appstore.png?raw=true';
const playStoreImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/playstore.png?raw=true';
const dotImage =
    'https://github.com/boomio-api-v2/easter-egg-styles/blob/main/img/dot.png?raw=true';

const apiLink = 'https://api.mars.boomio.com/easter-service/get-qr-code';

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
        const qrcode = `${config?.qrcode}` ?? '';
        const app_url = config?.app_url ?? '';
        const custom_text = config?.custom_text ?? '';
        const puzzles_collected = config?.puzzles_collected ?? 0;
        const appearing_puzzle_nr = config?.appearing_puzzle_nr ?? 0;

        return {
            success,
            qrcode,
            animation,
            app_url,
            custom_text,
            puzzles_collected,
            appearing_puzzle_nr,
            render_count: 0
        };
    };
};

const getScriptUrl = (widget_type) => {
    if (widget_type === 'puzzle') {
        return puzzleScript;
    } else if (widget_type === 'wheel') {
        return wheelScript;
    }
}


const createScript = (url) => {
    const script = document.createElement('script');
    script.setAttribute('src', url)
    document.head.appendChild(script)
};

class Boomio {
    constructor() {
        this.url = window.location.href;
        this.user_session = this.session();
    }
    session(){
        let session = this.getCookie('boomio_session');
        if(!session){
            session = this.uuidv4();
            this.setCookie('boomio_session',session,120);
        }
        return session;
    }
    setCookie(name,value,days) {
        let expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    eraseCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    send(data){
        let request_data = {
            "user_session": this.user_session,
            "current_page_url": this.url,
            "extra_data": data
        };
        (async (request_data) => {
            const rawResponse = await fetch(apiLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_data)
            });
            const content = await rawResponse.json();
            localStorage.setItem(localStoragePropertyName, JSON.stringify(content));
            const scriptUrl = getScriptUrl(content.widget_type);
            createScript(scriptUrl)
        })(request_data);
    }
}


new Boomio().send({
    go_hunt: "true"
});


