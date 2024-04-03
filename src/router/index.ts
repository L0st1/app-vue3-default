import { RouteRecordRaw } from "vue-router";
import AboutView from "../views/AboutView.vue";
import UseIntersectionObserver from "@/views/UseIntersectionObserver.vue";
import AnchorByElement from "@/views/AnchorByElement.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/about",
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/useInterserctionOb",
    name: "useInterserctionOb",
    component: UseIntersectionObserver,
  },
  {
    path: "/AnchorByElement",
    name: "AnchorByElement",
    component: AnchorByElement,
  }
];

export default routes;
