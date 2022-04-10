import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import Borrow from "../views/Borrow.vue";
import Lend from "../views/Lend.vue";
import Login from "../components/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import MyPost from "../views/MyPosts.vue";
import MyRequest from "../views/MyRequests.vue";
import MyDeal from "../views/MyDeals.vue";
import MyProfile from "../components/my-profile/ProfileSideBar.vue";
// import MyProfile from "../views/MyProfile.vue";
import Settings from "../views/Settings.vue";
import Chats from "../views/Chats.vue";
// import Chats from "../components/Chat/chat_alternative.vue";
import Profile from "../views/Profile.vue";
import SideBar from "../components/my-profile/ProfileSideBar.vue";

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
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/myprofile",
    name: "MyProfile",
    component: MyProfile,
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
    props: true,
  },

  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    props: true,
  },

  {
    path: "/sideBar",
    name: "sideBar",
    component: SideBar,
    props: route => ({ query: route.query.q })
  },
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
