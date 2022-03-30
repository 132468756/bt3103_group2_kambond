<template>
  <div v-if="fetched" class="app">
    <div class="app__body">
      <ChatSideBar :rooms="rooms"/>
      <ChatView :room="firstRoom" />
    </div>
  </div>
  <div v-else>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div> -->
</template>

<script>
import {ref} from 'vue'
import ChatView from "../components/Chat/ChatView.vue";
import ChatSideBar from "../components/Chat/ChatSideBar.vue";
// import ListFriends from "../components/Chat/ListFriends.vue";
// import ListUsers from "../components/Chat/ListUsers.vue";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "Chat",
  //components: { ChatSideBar, ChatView, ListFriends, ListUsers },
  components: { ChatView, ChatSideBar},
  data() {
    return {
      fetched: false,
      friends: [],
      rooms: [],
      firstRoom: {},
      user: "",
    };
  },
  methods: {
    async listFriends() {
      const docRef = await getDoc(doc(db, "Users", auth.currentUser.email));
      this.friends = docRef.data().chatrooms;
      console.log("friends", this.friends);
    },
    async getRooms() {
      this.fetched = true;
      const docNow = await getDocs(collection(db, "Chats"));
      
      docNow.forEach((doc) => {
        console.log(doc.data().user2 == String(auth.currentUser.displayName));
        if (
          (doc.data().user1 == String(auth.currentUser.email)) |
          (doc.data().user2 == String(auth.currentUser.email))
        ) {
          this.rooms.push(doc.data().chatRoomName);
        }
      });
      console.log("rooms", this.rooms);
      console.log(ref(this.rooms))
      if (this.rooms.length > 0) {
        console.log("update chatview by first room", this.rooms[0]);
        this.firstRoom = this.rooms[0];
      }
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.email;
        console.log(user.email);
        console.log(this.user);
        this.getRooms();
      }
    });
  },
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