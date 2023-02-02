import { localStorageConfig } from "./modules";
import {
    startPuzzleWidget,
    startStartWidget,
    startWheelWidget,
    startImageWidget
} from "./wdgets";

class Boomio  {
    constructor() {
        this.url = window.location.href;
        this.user_session = this.session();
        this.setInitialConfiguration()
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
            let date = new Date();
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
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    loadWidget = (widget_type = 'puzzle') => {
        const createWidgetPlugin = {
            'puzzle': startPuzzleWidget,
            'wheel': startWheelWidget,
            'start_widget': startStartWidget,
            'image': startImageWidget
        }
        createWidgetPlugin[widget_type]();
        // if (widget_type === 'puzzle') {
        //     startPuzzleWidget();
        // } else if (widget_type === 'wheel') {
        //     startWheelWidget();
        // } else if (widget_type === 'start_widget') {
        //     startStartWidget();
        // } else if (widget_type === 'image') {
        //     startImageWidget();
        // }
    };

    async setInitialConfiguration() {
        try {
            window.onload = () => {
                localStorageConfig.updateConfig({
                    success: true,
                    appearing_puzzle_nr: 4,
                    puzzles_collected: 3,
                    animation: 1,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg'
                })
                this.loadWidget()

            }
            // const content = await this.send({ go_hunt: "true"});

            // super.setConfigFromApi(content);
            // if (content?.widget_type && content.instruction !== 'stop') {
            //     const scriptUrl = this.getScriptUrl(content.widget_type)
            //     createScript(scriptUrl)
            // }

        } catch (err) {
            console.log(err)
        }

    }

    checkIsRequestDenied() {
        const boomioStopTill = this.config?.boomioStopTill
        if (!boomioStopTill) return false;
        const isTimeout = new Date(boomioStopTill).getTime() > new Date().getTime();
        if (!isTimeout) {
            super.removeByKey('boomioStopTill');
        }
        return isTimeout;
    }

    send(data){
        const isDenied = this.checkIsRequestDenied();
        if (isDenied) return {success: false};
        const request_data = {
            "user_session": this.user_session,
            "current_page_url": this.url,
            "extra_data": data
        };

        return new Promise(async (resolve) => {
            const rawResponse = await fetch(newLinkBoomio, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_data)
            });
            resolve(rawResponse.json())
        })
    }

    signal(signal_code) {
        this.send({
            go_hunt: "true",
            ev_type: 'signal',
            signal_code
        })
    }
};


export const boomio = new Boomio();