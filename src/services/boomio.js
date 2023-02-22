import {
  startImageWidget,
  startPuzzleWidget,
  startStartWidget,
  startWheelWidget,
  startStoneWidget,
  iceWidget,
  startPenguinWidget,
} from '@/widgets';

import { localStorageService, UserService, widgetHtmlService } from '@/services';

class BoomioService extends UserService {
  constructor() {
    super();
    this.current_page_url = window.location.href;
    this.user_session = this.session();
    this.setInitialConfiguration();
  }

  loadWidget = (widget_type = 'puzzle') => {
    const createWidgetPlugin = {
      puzzle: startPuzzleWidget,
      wheel: startWheelWidget,
      start_widget: startStartWidget,
      image: startImageWidget,
      stone: startStoneWidget,
      ice: iceWidget,
      penguin: startPenguinWidget,
    };
    createWidgetPlugin[widget_type]();
  };

  setInitialConfiguration() {
    try {
      window.onload = async () => {
        widgetHtmlService.createWidgetContainer();
        const content = await this.send({ go_hunt: 'true' });
        localStorageService.setConfigFromApi(content);
        if (content?.widget_type && content.instruction !== 'stop') {
          this.loadWidget(content.widget_type);
        }
      };
    } catch (err) {
      console.log(err);
    }
  }

  checkIsRequestDenied() {
    const boomioStopTill = this.config?.boomioStopTill;
    if (!boomioStopTill) return false;
    const isTimeout = new Date(boomioStopTill).getTime() > new Date().getTime();
    if (!isTimeout) {
      localStorageService.removeByKey('boomioStopTill');
    }
    return isTimeout;
  }

  send(extra_data) {
    const isDenied = this.checkIsRequestDenied();
    if (isDenied) return { success: false };
    const { user_session, current_page_url } = this;
    const request_data = {
      user_session,
      current_page_url,
      extra_data,
    };

    return new Promise(async (resolve) => {
      const rawResponse = await fetch(newLinkBoomio, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request_data),
      });
      resolve(rawResponse.json());
    });
  }

  signal(signal_code) {
    this.send({
      go_hunt: 'true',
      ev_type: 'signal',
      signal_code,
    });
  }
}

export default new BoomioService();
