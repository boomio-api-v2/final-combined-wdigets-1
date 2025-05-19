import {
  startImageWidget,
  startPuzzleWidget,
  startStartWidget,
  startWheelWidget,
  iceWidget,
  startGuessWidget,
  startClawMachineWidget,
  startWhackWidget,
  startPenguinWidget,
  startMazeWidget,
  startSnakeWidget,
  startCatsWidget,
  startHedgehogWidget,
  startTestingWidget,
  startPacmanWidget,
  startFlappyBird,
  startDoodleWidget,
  startDriveWidget,
  startCatchWidget,
  startCrushWidget,
  startRunnerWidget,
} from '@/widgets';
import { localStoragePropertyName } from '@/config';

import { localStorageService, widgetHtmlService, UserService } from '@/services';

class BoomioService extends UserService {
  constructor() {
    super();
    localStorage.removeItem(localStoragePropertyName); // 💥 Fully remove config
    localStorageService.config = {}; // 💥 Reset in-memory copy too

    this._configInitialized = false;
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    const language = urlParams.get('language');

    this.current_page_url = campaignUrl
      ? campaignUrl === 'https://kaup.ee'
        ? 'https://kaup24.ee'
        : campaignUrl
      : currentPageUrl;

    // if (
    //   (language === 'ET' &&
    //     (campaignUrl === 'https://kaup.ee' || campaignUrl === 'https://kaup24.ee')) ||
    //   (language === 'RU' &&
    //     (campaignUrl === 'https://kaup.ee' || campaignUrl === 'https://kaup24.ee')) ||
    //   (language === 'EN' &&
    //     (campaignUrl === 'https://kaup.ee' || campaignUrl === 'https://kaup24.ee')) ||
    //   (language === 'EN' && campaignUrl === 'https://pigu.lt') ||
    //   (language === 'EN' && campaignUrl === 'https://hobbyhall.fi') ||
    //   (language === 'EN' && campaignUrl === 'https://220.lv') ||
    //   (language === 'LT' && campaignUrl === 'https://pigu.lt') ||
    //   (language === 'RU' && campaignUrl === 'https://pigu.lt') ||
    //   (language === 'FI' && campaignUrl === 'https://hobbyhall.fi') ||
    //   (language === 'LV' && campaignUrl === 'https://220.lv') ||
    //   (language === 'RU' && campaignUrl === 'https://220.lv') ||
    //   (!language && !campaignUrl) ||
    //   campaignUrl === 'https://boomio-web.webflow.io/demo-pigu-flap-through' ||
    //   campaignUrl === 'https://boomio-web.webflow.io/perlas-go' ||
    //   campaignUrl === 'https://www.perlasgo.lt/zaidimas' ||
    //   campaignUrl === 'https://www.perlasgo.lt/zaidimas_app' ||
    // )

    this.setInitialConfiguration();
  }

  getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  validateLocation(currentLat, currentLon) {
    const locations = this.config.locations;
    const delta = this.config.locations_delta;
    console.log('Current location:', currentLat, currentLon);

    const isValid = Object.values(locations).some((loc) => {
      const distance = this.getDistanceFromLatLonInMeters(currentLat, currentLon, loc.lat, loc.lon);
      return distance <= delta;
    });

    if (!isValid) {
      console.warn('User location is not within any valid location.');
      return false;
    }

    console.log('Location is valid.');
    return true;
  }

  loadWidget = (widget_type = 'puzzle') => {
    this.config = localStorageService.getDefaultConfig();

    if (this.config.locations && typeof this.config.locations === 'object') {
      const exists = Object.values(this.config.locations).some(
        (loc) => loc.lat === 54.675938 && loc.lon === 25.199246,
      );

      if (!exists) {
        this.config.locations['EXCEPTION: Vilnius Center'] = {
          lat: 54.675938,
          lon: 25.199246,
        };
      }
    }

    const createWidgetMap = {
      puzzle: startPuzzleWidget,
      wheel: startWheelWidget,
      start_widget: startStartWidget,
      image: startImageWidget,
      ice: iceWidget,
      guess: startGuessWidget,
      claw: startClawMachineWidget,
      whack: startWhackWidget,
      penguin: startPenguinWidget,
      testing: startTestingWidget,
      maze: startMazeWidget,
      snake: startSnakeWidget,
      cats: startCatsWidget,
      hedgehog: startHedgehogWidget,
      pacman: startPacmanWidget,
      flappy: startFlappyBird,
      doodle: startDoodleWidget,
      drive: startDriveWidget,
      catch: startCatchWidget,
      crush: startCrushWidget,
      runner: startRunnerWidget,
    };

    const hasLocationRestriction = this.config.locations && this.config.locations_delta;

    if (hasLocationRestriction) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLat = position.coords.latitude;
            const currentLon = position.coords.longitude;

            const isValid = this.validateLocation(currentLat, currentLon);
            if (!isValid) return; // ❌ TERMINATE if outside valid range

            const startWidget = createWidgetMap[widget_type];
            if (startWidget) {
              startWidget(); // ✅ Start widget if valid location
            }
          },
          (error) => {
            console.warn('Geolocation denied or unavailable. Widget will not start.');
            return; // ❌ TERMINATE on geolocation error
          },
        );
      } else {
        console.warn('Geolocation not supported. Widget will not start.');
        return; // ❌ TERMINATE if not supported
      }

      return; // ❌ Prevent continuing before async check
    }

    const startWidget = createWidgetMap[widget_type];
    if (startWidget) {
      startWidget();
    }
  };

  setInitialConfiguration() {
    if (this._configInitialized) return; // ✅ PREVENT DUPLICATE CALLS
    this._configInitialized = true; // ✅ SET FLAG ON FIRST CALL

    this.config = localStorageService.getDefaultConfig();
    const isTimeout = new Date(this.config.boomioStopTill).getTime() > new Date().getTime();
    if (!isTimeout) {
      localStorageService.removeByKey('boomioStopTill');
    }

    console.log(this.config);
    if (!isTimeout) {
      try {
        document.addEventListener('DOMContentLoaded', async () => {
          if (window.__boomioWidgetLoaded) return;

          const content = await this.sendBoomioData();
          if (content?.widget_type && content.instruction !== 'stop') {
            widgetHtmlService.createWidgetContainer(content.widget_type);
          } else {
            widgetHtmlService.createWidgetContainer();
          }
          window.__boomioWidgetLoaded = true;

          localStorageService.setConfigFromApi(content);
          if (content?.widget_type && content.instruction !== 'stop') {
            this.loadWidget(content.widget_type);
          } else if (localStorage.getItem('testing_Widgets')) {
            this.loadWidget('testing');
          } else if (
            localStorage.getItem('closing_button') &&
            localStorage.getItem('closing_button') !== 'false' &&
            localStorage.getItem('start_widget') &&
            localStorage.getItem('start_widget') !== 'false'
          ) {
            this.loadWidget('start_widget');
          }
          this.config = localStorageService.getDefaultConfig();
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  testing(testingWidget) {
    this.loadWidget(testingWidget);
  }

  checkIsRequestDenied() {
    const { boomioStopTill } = localStorageService?.config;
    if (!boomioStopTill) return false;
    const isTimeout = new Date(boomioStopTill).getTime() > new Date().getTime();
    if (!isTimeout) {
      localStorageService.removeByKey('boomioStopTill');
    }
    return isTimeout;
  }

  sendBoomioData(extra_data) {
    const isDenied = this.checkIsRequestDenied();
    if (isDenied) {
      setTimeout(() => {
        this.sendBoomioData(extra_data);
      }, 2000);
    }
    const { user_session, current_page_url } = this;

    const current_page_url_cleaned = current_page_url.includes('akropolis.lt')
      ? new URL(current_page_url).origin + new URL(current_page_url).pathname
      : current_page_url;

    const rawRequestBody = {
      user_session,
      current_page_url: current_page_url_cleaned, // Use cleaned URL
      extra_data,
    };

    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

    const encodeToBase64 = (str) => {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(str);
      return btoa(String.fromCharCode(...uint8Array));
    };

    const encodedBody = encodeToBase64(JSON.stringify(rawRequestBody));

    const finalRequestBody = { body: randomLetter + encodedBody };

    return new Promise(async (resolve) => {
      const rawResponse = await fetch(newLinkBoomio, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalRequestBody),
      });
      resolve(rawResponse.json());
    });
  }

  signal(signal_code, ev_type, additional_fields) {
    // Helper function to set a secure cookie
    if (ev_type === 'user_info') {
      const setSecureCookie = (name, value, months = 1) => {
        let expires = '';
        if (months) {
          const date = new Date();
          // Set the cookie expiration time to the specified number of months (default 1 month)
          date.setTime(date.getTime() + months * 30 * 24 * 60 * 60 * 1000);
          expires = '; expires=' + date.toUTCString();
        }
        document.cookie = `${name}=${encodeURIComponent(
          value,
        )}${expires}; path=/; Secure; SameSite=Strict`;
      };

      // Helper function to get a cookie by name
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
      };

      const pluginConfig = this.config?.boomioPluginConfig || {};

      // Retrieve existing boomio_game_credentials from cookies
      let credentials = {};
      const existingCookie = getCookie('boomio_game_credentials');
      if (existingCookie) {
        try {
          credentials = JSON.parse(existingCookie);
        } catch (e) {
          console.error('Error parsing boomio_game_credentials cookie:', e);
          credentials = {};
        }
      }

      // Add or update email and name in the credentials object
      if (additional_fields?.user_email) {
        pluginConfig.email = additional_fields.user_email;
        credentials.email = additional_fields.user_email;
      }

      if (additional_fields?.user_name) {
        pluginConfig.name = additional_fields.user_name;
        credentials.name = additional_fields.user_name;
      }

      // Store the updated credentials as a single cookie
      setSecureCookie('boomio_game_credentials', JSON.stringify(credentials));
    }
    return new Promise((resolve, reject) => {
      const requestData = {
        ev_type: ev_type ?? 'signal',
        signal_code,
        ...additional_fields,
      };
      if (this.config?.m) {
        requestData.m = this.config?.m;
      }

      this.sendBoomioData(requestData)
        .then((response) => {
          localStorageService.setConfigFromApi(response, ev_type);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const boomioInstance = new BoomioService(); // ✅ ENSURE SINGLE INSTANCE
export default boomioInstance;
