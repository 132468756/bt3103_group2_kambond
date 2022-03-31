<template>
  <div class='sidebarChat' v-if="!addNewChat"  @click="updateChatView()">
    <md-avatar>
      <img src="@/assets/profilephoto.jpeg" />
    </md-avatar>
    <div class='sidebarChat__info'>
      <h2>{{room.user.email}}</h2>
      <p>Last message...</p>
    </div>
  </div>

  <div class='sidebarChat' v-else onClick={createChat()} >
    <h2>Add new chat</h2>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {
  getFirestore,
  doc,
  //collection,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "SidebarChatUserRow",
  props : ['addNewChat', "room"],
  emits:["chatroom"],
  data() {
    return {
      chatroom:null,
    }
  },
  methods : {
    updateChatView() {
      this.$emit('viewroom', this.chatroom);
    }
  },
  mounted() {
    async function getChatRoom(self) {
       self.chatroom = await getDoc(doc(db,"Chats",self.room));
       console.log("room details",self.room)
    }
    getChatRoom(this);  
  }
}
</script>

<style scoped>
.sidebarChat {
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
}

.sidebarChat > .md-avatar {
  margin: unset;
}

.sidebarChat:hover {
  background-color: #ebebeb;
}

.sidebarChat__info > h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

.sidebarChat__info {
  margin-left: 15px;
}

</style>