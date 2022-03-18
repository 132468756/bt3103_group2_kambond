import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Borrow from "../components/Borrow.vue";
import Lend from "../components/Lend.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/MyProfile.vue";
import CreatePost from "../components/CreatePost.vue";
import MyPost from "../views/MyPosts.vue";
import MyRequest from "../views/MyRequests.vue";
import MyDeal from "../views/MyDeals.vue";
import Settings from "../views/Settings.vue";
import Chats from "../views/Chats.vue";
import NotFound from "../views/NotFound.vue";

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

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

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

  {
    path: "/mypost",
    name: "MyPost",
    component: MyPost,
  },

  {
    path: "/myrequest",
    name: "MyRequest",
    component: MyRequest,
  },

  {
    path: "/mydeal",
    name: "MyDeal",
    component: MyDeal,
  },

  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },

  {
    path: "/chats",
    name: "Chats",
    component: Chats,
  },

  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound,
  }
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
