import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home";
import Login from "../views/Login";
import Posts from "../views/Post";
import Student from "../views/Student";
// import Register from "../views/Register";
// import Companies from "../views/Companies";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/home", component: Home, },
    { path: "/login", component: Login },
    { path: "/posts", component: Posts, meta: { requiresAuth: true } },
    { path: "/students", component: Student, meta: { requiresAuth: true } },
    { path: "*", redirect: "/home" }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // console.log(store.getters["security/isAuthenticated"]);
    if (store.getters["security/isAuthenticated"]) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;