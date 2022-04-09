<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <p id="headerinfo"> Welcome to KamBond!</p>
    </div>
    
    <div class="sidebar__chat">
      <div v-for="room in rooms" :key="room.id">
        <SidebarChatUserRow :room="room" @update="update($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import SidebarChatUserRow from "./SidebarChatUserRow.vue";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "ChatSideBar",
  components: { SidebarChatUserRow },
  prop:["onUpdate"],
  emits:['emitRoom'],
  data() {
    return {
      rooms:[],
      emitRoom:"",
    }
  },
  methods: {
    async update(text) {
      //console.log("inSideBar",text);
      this.emitRoom = text;
      this.onUpdate = text;
      //console.log("sidebarupdate",this.onUpdate)
      this.$emit('update',this.emitRoom);
    },
  },
  mounted() {
    async function getRooms(self) {
      const docNow = await getDocs(query(collection(db, "Chats"),orderBy("timestamp","desc")));
      console.log(docNow)
      docNow.forEach((doc) => {
        // console.log(doc.data().user2 == String(auth.currentUser.displayName));
        if (
          (doc.data().user1 == String(auth.currentUser.email)) |
          (doc.data().user2 == String(auth.currentUser.email))
        ) {
          self.rooms.push(doc.data().chatRoomName);
        }
      });
      //console.log("rooms", self.rooms);
    }
    getRooms(this);
  },  
  
};
</script>

<style scoped>
#headerinfo {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  border-top-left-radius: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0.3;
  border-radius: 20px;
}

.sidebar__header {
  display: flex;
  justify-content: center;
  padding: 3px;
  border-right: 1px solid lightgrey;
  background-color: rgba(165, 208, 245, 0.359);
  border-top-left-radius: 20px;
}

.sidebar__headerRight {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
}

.sidebar__headerRight > i {
  margin-right: 2vw;
  font-size: 24px !important;
}

.sidebar__searchContainer > input {
  border: none;
  margin-left: 10px;
}

.sidebar__searchContainer > .md-icon {
  margin: unset;
  color: gray;
}

.sidebar__chat {
  flex: 1;
  background-color: white;
  overflow-y: hidden;
  border-bottom-left-radius: 20px;
}

.sidebar__chat:hover {
  overflow-y: auto;
}

#newChatInput {
  width: 100%;
  height: 30px;
  border-radius: 20px;
  /* border: transparent; */
  border:transparent;
  background-color: transparent;
  font-size: 20px
}

#newChatInput:focus{
  outline: none;
}

#searchImg {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}
</style>