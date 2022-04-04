<template>
  <div class="sidebarChat" @click="updateChatView()">
    <md-avatar>
      <img id="chatimg" src="@/assets/profilephoto.jpeg" />
    </md-avatar>
    <div class="sidebarChat__info">
      <h2 id="name">{{ otherName }}</h2>
      <p id="message">{{ lastmessage }}</p>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "SidebarChatUserRow",
  props: ["room"],
  emits: ["emitRoom"],
  data() {
    return {
      chatroom: null,
      otherName: "",
      lastmessage: "",
      emitRoom: "",
    };
  },
  methods: {
    updateChatView() {
      //console.log("emit",this.room)
      this.emitRoom = this.room;
      this.$emit("update", this.emitRoom);
    },
  },
  mounted() {
    async function getChatRoom(self) {
      let chat = await getDoc(doc(db, "Chats", self.room));
      if (chat.data().user1 == auth.currentUser.email) {
        self.chatroom = chat.data().user2;
      } else {
        self.chatroom = chat.data().user1;
      }
      const chatcontent = chat.data().chats;
      //console.log(chatcontent[chatcontent.length-1]);
      if (chatcontent.length != 0) {
        self.lastmessage = chatcontent[chatcontent.length - 1].time;
      }
      let user = await getDoc(doc(db, "Users", self.chatroom));
      self.otherName = user.data().username;
      //self.otherEmail = user.data().email;
    }
    getChatRoom(this);
  },
};
</script>

<style scoped>
#chatimg {
  width: 30px;
  height: 30px;
}
.sidebarChat {
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #c5b8f1f0;
  height: 80px;
}

.sidebarChat > .md-avatar {
  margin: unset;
}

.sidebarChat:hover {
  background-color: #d9d0f7d6;
}

.sidebarChat__info > h2 {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 8px;
  margin-left: 0px;
}

.sidebarChat__info {
  margin-left: 15px;
}

#message {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
</style>