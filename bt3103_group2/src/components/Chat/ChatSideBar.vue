<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <md-avatar />
      <div class="sidebar__headerRight">
        <!-- <md-button class="md-icon-button">
          <md-icon>donut_large</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>chat</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button> -->
      </div>
    </div>
    <!-- <div class='sidebar__search'>
      <div class='sidebar__searchContainer'>
        <md-icon>search</md-icon>
        <input placeholder="start new chat"/>
      </div>c
    </div> -->
    <div class="sidebar__chat">
      <div v-for="room in rooms" :key="room.id">
        <!-- <p> room </p> -->
        <!-- <p>onupate:{{onUpdate}}</p> -->
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
      console.log("inSideBar",text);
      this.emitRoom = text;
      this.onUpdate = text;
      console.log("sidebarupdate",this.onUpdate)
      //this.getRooms();
      this.$emit('update',this.emitRoom);
    },

    // async getRooms() {
    //   if(this.rooms.length != 0) {
    //     this.rooms.splice(0);
    //   }
    //   const docNow = await getDocs(collection(db, "Chats"));
      
    //   docNow.forEach((doc) => {
    //     console.log(doc.data().user2 == String(auth.currentUser.displayName));
    //     if (
    //       (doc.data().user1 == String(auth.currentUser.email)) |
    //       (doc.data().user2 == String(auth.currentUser.email))
    //     ) {
    //       this.rooms.push(doc.data().chatRoomName);
    //     }
    //   });
    //   console.log("rooms", this.rooms);
    // }
  },
  mounted() {
   async function getRooms(self) {
      const docNow = await getDocs(collection(db, "Chats"));
      
      docNow.forEach((doc) => {
        console.log(doc.data().user2 == String(auth.currentUser.displayName));
        if (
          (doc.data().user1 == String(auth.currentUser.email)) |
          (doc.data().user2 == String(auth.currentUser.email))
        ) {
          self.rooms.push(doc.data().chatRoomName);
        }
      });
      console.log("rooms", self.rooms);
    }
    getRooms(this);
  },  
  
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0.3;
  width:10vh;
}
.sidebar__header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgrey;
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
.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 30px;
  padding: 10px;
}
.sidebar__searchContainer {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
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
}
.sidebar__chat:hover {
  overflow-y: auto;
}
</style>