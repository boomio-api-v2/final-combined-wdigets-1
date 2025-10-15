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
  startPopWidget,
  startRunnerWidget,
} from '@/widgets';
import { localStoragePropertyName } from '@/config';
import { localStorageService, widgetHtmlService, UserService } from '@/services';

class BoomioService extends UserService {
  constructor() {
    super();
    localStorage.removeItem(localStoragePropertyName);
    localStorageService.config = {};

    this._configInitialized = false;
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');
    //const language = urlParams.get('language');

    this.current_page_url = campaignUrl || currentPageUrl;

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
    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  validateLocation(currentLat, currentLon) {
    const locations = this.config.restrictions.location_restrictions.locations;
    const delta = this.config.restrictions.location_restrictions.locations_delta;

    let passed = false;

    Object.entries(locations).forEach(([name, loc]) => {
      const distance = this.getDistanceFromLatLonInMeters(currentLat, currentLon, loc.lat, loc.lon);
      console.log(`📍 Checking location "${name}" at (${loc.lat}, ${loc.lon})`);
      console.log(`   ↪️ Distance: ${Math.round(distance)} meters`);

      if (distance <= delta) {
        console.log(`✅ Within range of "${name}"`);
        passed = true;
      } else {
        console.log(`❌ Too far from "${name}"`);
      }
    });

    if (!passed) {
      console.warn('❌ User location is not within any valid location.');
      return false;
    }

    console.log('✅ At least one location matched. Access granted.');
    return true;
  }

  validateDate() {
    const allowedDates = this.config.restrictions.date_restrictions?.dates || [];
    const today = new Date().toISOString().split('T')[0];
    const isValid = allowedDates.includes(today);

    if (!isValid) {
      console.warn(`❌ Date ${today} is not in allowed dates.`);
    } else {
      console.log(`✅ Date ${today} is valid.`);
    }

    return isValid;
  }

  validateTime() {
    const timeRestriction = this.config.restrictions.time_restrictions?.time;
    if (!timeRestriction) return true;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [fromH, fromM] = timeRestriction.from.split(':').map(Number);
    const [toH, toM] = timeRestriction.to.split(':').map(Number);

    const fromMinutes = fromH * 60 + fromM;
    const toMinutes = toH * 60 + toM;

    const isValid = currentMinutes >= fromMinutes && currentMinutes <= toMinutes;

    if (!isValid) {
      console.warn(`❌ Time now (${now.toTimeString().slice(0, 5)}) is outside allowed range (${timeRestriction.from}–${timeRestriction.to}).`);
    } else {
      console.log(`✅ Time ${now.toTimeString().slice(0, 5)} is within the allowed range.`);
    }

    return isValid;
  }

  loadWidget = (widget_type = 'puzzle') => {
    this.config = localStorageService.getDefaultConfig();

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
      pop: startPopWidget,
      runner: startRunnerWidget,
    };

    const hasLocationRestriction = this.config.restrictions.location_restrictions?.locations && this.config.restrictions.location_restrictions?.locations_delta;

    const hasDateRestriction = this.config.restrictions.date_restrictions?.dates?.length > 0;
    const hasTimeRestriction = this.config.restrictions.time_restrictions?.time;

    const alertReasons = [];

    const handleAccessValidation = (currentLat, currentLon) => {
      const isLocationValid = hasLocationRestriction ? this.validateLocation(currentLat, currentLon) : true;

      const isDateValid = hasDateRestriction ? this.validateDate() : true;
      const isTimeValid = hasTimeRestriction ? this.validateTime() : true;

      if (!isLocationValid) alertReasons.push('Your location is not within the allowed area.');
      if (!isDateValid) alertReasons.push('Today is not an allowed date.');
      if (!isTimeValid) alertReasons.push('The current time is outside the allowed window.');

      if (isLocationValid && isDateValid && isTimeValid) {
        const startWidget = createWidgetMap[widget_type];
        if (startWidget) startWidget();
      } else {
        alert('Access denied:\n' + alertReasons.join('\n'));
      }
    };

    if (hasLocationRestriction && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleAccessValidation(position.coords.latitude, position.coords.longitude);
        },
        (_error) => {
          alert('Geolocation access denied or unavailable. Cannot verify location.');
          return;
        },
      );

      return;
    }

    handleAccessValidation(null, null);
  };

  setInitialConfiguration() {
    if (this._configInitialized) return;
    this._configInitialized = true;

    this.config = localStorageService.getDefaultConfig();
    const isTimeout = new Date(this.config.boomioStopTill).getTime() > new Date().getTime();
    if (!isTimeout) {
      localStorageService.removeByKey('boomioStopTill');
    }

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
    const boomioStopTill = localStorageService?.config?.boomioStopTill;
    if (!boomioStopTill) return false;

    const isTimeout = new Date(boomioStopTill).getTime() > Date.now();
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

    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    let current_page_url_cleaned = current_page_url;

    if (!isLocalhost) {
      try {
        const u = new URL(current_page_url);
        current_page_url_cleaned = `${u.origin}${u.pathname}`.replace(/\/$/, '').trim();
      } catch {}
    }

    const rawRequestBody = {
      user_session,
      current_page_url: current_page_url_cleaned,
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
    if (ev_type === 'user_info') {
      const setSecureCookie = (name, value, months = 1) => {
        let expires = '';
        if (months) {
          const date = new Date();
          date.setTime(date.getTime() + months * 30 * 24 * 60 * 60 * 1000);
          expires = '; expires=' + date.toUTCString();
        }
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; Secure; SameSite=Strict`;
      };

      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
      };

      const pluginConfig = this.config?.boomioPluginConfig || {};

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

      if (additional_fields?.user_email) {
        pluginConfig.email = additional_fields.user_email;
        credentials.email = additional_fields.user_email;
      }

      if (additional_fields?.user_name) {
        pluginConfig.name = additional_fields.user_name;
        credentials.name = additional_fields.user_name;
      }

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

const boomioInstance = new BoomioService();
export default boomioInstance;
