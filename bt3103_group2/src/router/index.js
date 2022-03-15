import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Borrow from "../components/Borrow.vue";
import Lend from "../components/Lend.vue";
// import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/MyProfile.vue";
import CreatePost from "../components/CreatePost.vue";
const routes = [
  {
    path: "/home",
    name: "Homepage",
    component: Homepage,
  },

  {
    path: "/borrow",
    name: "Borrow",
    component: Borrow,
  },

  {
    path: "/lend",
    name: "Lend",
    component: Lend,
  },

  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  // },

  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost,
  },
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
