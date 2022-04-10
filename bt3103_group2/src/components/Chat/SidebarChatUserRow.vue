<template>
  <div class="sidebarChat" @click="updateChatView()">
    <md-avatar>
      <div class="profilePicDiv" v-if="this.showIcon">
        <img :src= "url" alt="Preview" id="IconImg"/>
      </div>
      <div v-else class="profilePicDiv">
        <img src="@/assets/profile.png" id="IconImg">
      </div>
    </md-avatar>
    <div class="sidebarChat__info">
      <h2 id="name">{{ otherName }}</h2>
      <p id="message">{{ lastmessage }}</p>
      <p id="time">{{ lasttime }}</p>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
      lasttime: "",      
      userID: "",
      url: '',
      path:'',
      profileiconURL: '', 
      showIcon:false,
      postuserID: "",
    };
  },

  methods: {
    
    updateChatView() {
      this.emitRoom = this.room;
      this.$emit("update", this.emitRoom);
    },

    async updateInfo(room) {
      let chat = await getDoc(doc(db, "Chats", room));
      const chatcontent = chat.data().chats;
      if (chatcontent.length != 0) {
        this.lastmessage = chatcontent[chatcontent.length - 1].message;
      }
    },
  },

  mounted() {
    async function getURL(self){
            let chat = await getDoc(doc(db, "Chats", self.room));
            if (chat.data().user1 == auth.currentUser.email) {
              self.chatroom = chat.data().user2;
            } else {
              self.chatroom = chat.data().user1;
            } 
            let user = await getDoc(doc(db, "Users", self.chatroom));
            self.userID = user.data().email;
            self.profileiconURL = user.data().profileiconURL;
            setTimeout(() => {
            console.log(self.profileiconURL)
            self.path = self.userID
            console.log("getURL triggered")
            console.log(self.path)
            // Get URL for the image inside the storage
            const storage = getStorage();
            const starsRef = ref(storage, 'icons/'+ self.path);
            // const starsRef = ref(storage, 'posts/lrqian2000@gmail.comlalala1649237027381');
            getDownloadURL(starsRef)
            .then((url) => {
            self.url = url
            self.showIcon=true
            })
          }, 500);
      }
      getURL(this);


    async function getChatRoom(self) {
      let chat = await getDoc(doc(db, "Chats", self.room));
      if (chat.data().user1 == auth.currentUser.email) {
        self.chatroom = chat.data().user2;
      } else {
        self.chatroom = chat.data().user1;
      }
      const chatcontent = chat.data().chats;
      if (chatcontent.length != 0) {
        self.lastmessage = chatcontent[chatcontent.length - 1].message;
        self.lastmessage = self.lastmessage.substring(0,30)
        self.lasttime = chatcontent[chatcontent.length - 1].time;
      }
      let user = await getDoc(doc(db, "Users", self.chatroom));
      self.otherName = user.data().username;
    }
    getChatRoom(this);
  },
};
</script>

<style scoped>
#chatimg {
  width: 40px;
  height: 40px;
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
  margin-left: 10px;
  justify-content: center;
  place-items: center;
}

#IconImg {
  width: 50px;
  height: 50px;
}


#message,
#time{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  color: darkgray;
}
p {
  display: flex;

}
h2 {
  display: flex;
}
#profilePic {
  height: 50px;
  width: 50px;
}
</style>