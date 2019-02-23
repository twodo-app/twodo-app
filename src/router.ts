import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";

Vue.use(Router);

export default new Router({
  base: "/todo-app",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/:id",
      name: "user",
      component: Home,
    },
  ],
});
