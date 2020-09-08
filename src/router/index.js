import Vue from "vue";
import VueRouter from "vue-router";
import Registration from "../pages/Registration";

Vue.use(VueRouter);

const DEFAULT_TITLE = "RAISLEY";
const routes = [
  {
    path: "/",
    component: Registration,
    meta: {
      title: DEFAULT_TITLE
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
