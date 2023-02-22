import {
  startImageWidget,
  startPuzzleWidget,
  startStartWidget,
  startWheelWidget,
  startStoneWidget,
  iceWidget,
  startPenguinWidget,
} from '@/widgets';

import { localStorageService, UserService } from '@/services';

class BoomioService extends UserService {
  constructor() {
    super();
    this.url = window.location.href;
    this.user_session = this.session();
    this.setInitialConfiguration();
  }

  createWidgetContainer = () => {
    const widgetScreenWrapper = document.createElement('div');
    widgetScreenWrapper.classList.add('boomio-widget-screen-wrapper');
    const widgetContent = document.createElement('div');
    widgetContent.setAttribute('id', 'boomio-widget-content');
    widgetScreenWrapper.appendChild(widgetContent);
    document.body.appendChild(widgetScreenWrapper);
  };

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
        this.createWidgetContainer();
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

  send(data) {
    const isDenied = this.checkIsRequestDenied();
    if (isDenied) return { success: false };
    const request_data = {
      user_session: this.user_session,
      current_page_url: this.url,
      extra_data: data,
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
