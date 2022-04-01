<template>
  <div v-if="fetched" class="app">
    <div class="app__body">
      <ChatSideBar  @update="update($event)"/>
      <ChatView v-if="showChats" :room="emitRoom" :key="refresh"/>
    </div>
  </div>
  <!-- <div v-else>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div> -->
</template>

<script>
import ChatView from "../components/Chat/ChatView.vue";
import ChatSideBar from "../components/Chat/ChatSideBar.vue";
// import ListFriends from "../components/Chat/ListFriends.vue";
// import ListUsers from "../components/Chat/ListUsers.vue";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  getDoc,
  doc,
  //collection,
  //getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "Chat",
  //components: { ChatSideBar, ChatView, ListFriends, ListUsers },
  components: { ChatView, ChatSideBar},
  prop:["onUpdate"],
  data() {
    return {
      fetched: false,
      friends: [],
      rooms: [],
      firstRoom: {},
      user: "",
      emitRoom:"",
      showChats:false,
      refresh:0,
    };
  },
  methods: {
    async listFriends() {
      const docRef = await getDoc(doc(db, "Users", auth.currentUser.email));
      this.friends = docRef.data().chatrooms;
      console.log("friends", this.friends);
    },
    async update(text) {
      console.log("inChats",text);
      this.emitRoom = text;
      this.onUpdate = text;
      console.log("inChatsupdate",this.onUpdate)
      this.onUpdateFunction()
    },
     async onUpdateFunction() {
      this.refresh +=1;
      //console.log("fresh",this.refresh)
      this.showChats = false;
      //console.log("turn show chats false")
      this.emitRoom = this.onUpdate;
      this.showChats=true;
      //console.log("turn show chats true")
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.email;
        this.fetched=true;
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
  height: 700px;
}

.app__body {
  display: flex;
  background-color: #ededed;
  height: 90vh;
  width: 70vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.75);
}

</style>