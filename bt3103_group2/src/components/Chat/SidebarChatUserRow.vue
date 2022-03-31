<template>
  <div class='sidebarChat'  @click="updateChatView()">
    <md-avatar>
      <img id ="chatimg" src="@/assets/profilephoto.jpeg" />
    </md-avatar>
    <div class='sidebarChat__info'>
      <h2>{{chatroom}}</h2>
      <p>Last message...</p>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {getAuth} from "firebase/auth"
import {
  getFirestore,
  doc,
  //collection,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "SidebarChatUserRow",
  props : ["room"],
  emits:["room"],
  data() {
    return {
      chatroom:null,
    }
  },
  methods : {
    updateChatView() {
      console.log("emit")
      this.$emit("update",this.room);
    }
  },
  mounted() {
    async function getChatRoom(self) {
      let chat = await getDoc(doc(db,"Chats",self.room));
      if (chat.data().user1 == auth.currentUser.email) {
        self.chatroom = chat.data().user2;
      } else {
        self.chatroom = chat.data().user1;
      }
       console.log("room details",self.chatroom)
    }
    getChatRoom(this);  
  }
}
</script>

<style scoped>
#chatimg {
  width:30px;
  height: 30px;
}
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