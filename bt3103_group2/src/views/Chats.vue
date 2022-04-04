<template>
  <div v-if="fetched" class="app">
    <div class="app__body">
      <ChatSideBar @update="update($event)" />
      <ChatView v-if="showChats" :room="emitRoom" :key="refresh"/>
    </div>
  </div>
</template>

<script>
import ChatView from "../components/Chat/ChatView.vue";
import ChatSideBar from "../components/Chat/ChatSideBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "Chat",
  components: { ChatView, ChatSideBar },
  prop: ["onUpdate"],
  data() {
    return {
      fetched: false,
      rooms: [],
      user: "",
      emitRoom: "",
      showChats: false,
      refresh: 0,
    };
  },
  methods: {
    async update(text) {
      //console.log("inChats", text);
      this.emitRoom = text;
      this.onUpdate = text;
      //console.log("inChatsupdate", this.onUpdate);
      this.onUpdateFunction();
    },
    async onUpdateFunction() {
      this.refresh += 1;
      //console.log("fresh",this.refresh)
      this.showChats = false;
      //console.log("turn show chats false")
      this.emitRoom = this.onUpdate;
      this.showChats = true;
      //console.log("turn show chats true")
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.email;
        this.fetched = true;
      }
    });
  },
};
</script>

<style scoped>
.app {
  display: grid;
  place-items: center;
  /* background-color: #c7dd1f; */
  height: 67vh;
}

.app__body {
  display: flex;
  background-color: #dedbdb;
  height: 82vh;
  width: 70vw;
  box-shadow: -1px 4px 20px -6px rgba(111, 153, 226, 0.75);
  border-radius: 20px;
}
</style>