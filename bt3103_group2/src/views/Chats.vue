<template>
  <div v-if="fetched" class="app">
    <div class="app__body">
      <ChatSideBar :rooms="rooms" />
      <ChatView :room="firstRoom" />
    </div>
  </div>
  <div v-else>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
  <!-- <ListFriends />
  <ListUsers /> -->
</template>

<script>
import ChatView from "../components/Chat/ChatView.vue";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {database} from "../realfire";
import ChatSideBar from "../components/Chat/ChatSideBar";
// import ListFriends from "../components/Chat/ListFriends.vue";
// import ListUsers from "../components/Chat/ListUsers.vue";

export default {
  name: "Chat",
  //components: { ChatSideBar, ChatView, ListFriends, ListUsers },
  components: { ChatSideBar, ChatView,  },
  data() {
    return {
      fetched: false,
      friends: [],
      email: "",
      rooms: [],
      firstRoom: {},
      username: localStorage.getItem("username"),
      ref: database.ref("chatrooms/"),
    };
  },
  // methods: {
  //   listFriends() {
  //     axios
  //       .get(`${API_BASE_URL}private/listFriends`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("idToken"),
  //         },
  //       })
  //       .then((resp) => {
  //         this.fetched = true;
  //         if (resp.status === 200) {
  //           this.friends = resp.data;
  //           console.log("friends", this.friends);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("coming in error", err);
  //         this.$router.push("/");
  //       });
  //   },
  //   getRooms() {
  //     axios
  //       .get(`${API_BASE_URL}private/rooms`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("idToken"),
  //         },
  //       })
  //       .then((resp) => {
  //         this.fetched = true;
  //         if (resp.status === 200) {
  //           this.rooms = resp.data;
  //           console.log("rooms", this.rooms);
  //           if (this.rooms.length > 0) {
  //             //update chatview by first user
  //             console.log("update chatview by first room", this.rooms[0]);
  //             this.firstRoom = this.rooms[0];
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("coming in error", err);
  //         this.$router.push("/");
  //       });
  //   },
  // },
  // mounted() {
  //   if (!this.username) {
  //     this.$router.push("/");
  //   } else {
  //     this.getRooms();
  //   }
  // },
};
</script>

<style scoped>
.app {
  display: grid;
  place-items: center;
  background-color: #dadbd3;
  height: 100vh;
}

.app__body {
  display: flex;
  background-color: #ededed;
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.75);
}

.md-progress-spinner {
  place-self: center;
}
</style>