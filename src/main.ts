import { createApp, App } from "vue";
import {
  createRouter,
  createWebHistory,
  RouterHistory,
  Router,
} from "vue-router";
import AppCom from "./App.vue";
import routes from "./router";

import "@/style/index.scss";
import "@/style/element/index.scss";

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
  }
}

interface IRenderProps {
  container: Element | string;
  data?: Record<string, any>;
}

let router: Router;
let instance: App<Element>;
let history: RouterHistory;

function render(props: IRenderProps) {
  const { container, data: propsData } = props;
  history = createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? "/app-vue3/" : "/app-vue3-default/"
  );
  console.log("window.__POWERED_BY_QIANKUN__ :", window.__POWERED_BY_QIANKUN__);
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(AppCom, {
    data: function() {
      return {
          aaa: propsData
        };
      }
  });
  instance.config.globalProperties.$store = propsData;
  // instance.provide('parentVuex', propsData);
  instance.use(router);
  instance.mount(
    typeof container === "string"
      ? container
      : (container.querySelector("#app") as Element)
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: "#app" });
}

export async function bootstrap() {
  console.log("%c ", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props: IRenderProps) {
  render(props);
}

export async function unmount() {
  instance.unmount();
  if (instance._container) {
    instance._container.innerHTML = "";
  }
  history.destroy();
}
