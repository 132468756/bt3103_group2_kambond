<template>
  <div class="chat">
    <div class="chat__header">
      <md-avatar class="md-large">
        <!-- https://avatars.githubusercontent.com/u/32813584?s=60&v=4 -->
      </md-avatar>
      <div class="chat__headerInfo">
        <h3>{{ this.friend }}</h3>
      </div>

      <div class="chat__headerRight">
        <!-- <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>attach_file</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button> -->
      </div>
    </div>
    <div id="content">
      <div class="chat__body" v-if="fetched">
        <div v-for="chat in previouschats" :key="chat.id">
          <p :class="`chat__message ${isMe(chat) && 'chat__reciever'}`">
            {{ chat.message }}  <br/>  
          </p>
          <small id="time">{{chat.time}}</small>
        </div>
      </div>
    </div>
    <div class="chat__footer">
      <!-- <md-icon>insert_emoticon</md-icon> -->
      <form v-on:submit.prevent="onSubmit">
        <input type="text" id="inputMsg" autocomplete="off" />
        <button type="submit" id="submitBtn">Send</button>
      </form>
      <!-- <md-icon>mic</md-icon> -->
    </div>
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  //collection,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "Chat",
  props: ["room"],
  data() {
    return {
      fetched: false,
      previouschats: [],
      roomid: null,
      avatar: null,
      friend: "",
      timer: "",
    };
  },
  created() {
    //this.getPreviousChats();
    this.timer = setInterval(this.getPreviousChats, 5000);
    // this.scrollToEnd();
  },
  methods: {
    async onSubmit() {
      const msg = document.getElementById("inputMsg").value;
      console.log("msg on submit", msg);
      const mychat = { user: auth.currentUser.email, 
      message: msg,
      time:Timestamp.now().toDate().toLocaleDateString() +" " + Timestamp.now().toDate().toLocaleTimeString(),
      timestamp:Timestamp.now()};
      await updateDoc(doc(db, "Chats", this.room), {
        chats: arrayUnion(mychat),
        timestamp:Timestamp.now(),
      });

      document.getElementById("inputMsg").value = "";
      this.getPreviousChats();
      this.timer = setInterval(this.getPreviousChats, 5000);
    },

    isMe(chat) {
      //console.log(chat.user);
      return chat.user == auth.currentUser.email;
    },

    async getPreviousChats() {
      let docRef = await getDoc(doc(db, "Chats", this.room));
      let previous = docRef.data().chats;
      //console.log(this.previouschats.length);
      this.previouschats.splice(0);
      //console.log(this.previouschats.length);
      if (previous.length != 0) {
        previous.forEach((doc) => {
          if (!this.previouschats.includes(doc)) {
            this.previouschats.push(doc);
          }
        });
        //console.log("chats", this.previouschats);
      }
      self.fetched = true;
    },

    async listFriends() {
      const docRef = await getDoc(doc(db, "Chats", this.room));
      if (docRef.data().user1 == String(auth.currentUser.email)) {
        this.friend = docRef.data().user2;
      } else {
        this.friend = docRef.data().user1;
      }
      //console.log(this.friend);
    },
  },
  mounted() {
    //console.log("Chatview", this.room);
    async function getPreviousChats(roomId, self) {
      let docRef = await getDoc(doc(db, "Chats", roomId));
      let previous = docRef.data().chats;
      //console.log(previous.length);
      if (previous.length != 0) {
        previous.forEach((doc) => {
          self.previouschats.push(doc);
        });
        //console.log("chats", self.previouschats);
      }
      self.fetched = true;
    }
    getPreviousChats(this.room, this);

    async function listFriends(self) {
      const docRef = await getDoc(doc(db, "Chats", self.room));
      let friendName = "";
      if (docRef.data().user1 == String(auth.currentUser.email)) {
        friendName = docRef.data().user2;
      } else {
        friendName = docRef.data().user1;
      }
      const docNow = await getDoc(doc(db, "Users", friendName));
      self.friend = docNow.data().username;
      //console.log(self.friend);
    }
    listFriends(this);
  },

  updated(){
    const theElement = document.getElementById('content');

    const scrollToBottom = (node) => {
      console.log("to bottom triggered")
      node.scrollTop = node.scrollHeight;
      console.log(node.scrollHeight)
      console.log(node.scrollTop)
    }
    scrollToBottom(theElement);
  }
};
</script>

<style scoped>
.chat {
  flex: 0.7;
  display: flex;
  flex-direction: column;
}

.chat__header {
  padding: 0 20px 7px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.chat__headerInfo {
  flex: 1;
  padding-left: 20px;
}

.chat__headerInfo > h3 {
  margin-bottom: 3px;
  font-weight: 500;
  margin-left: 50px;
}

.chat__headerInfo > p {
  color: gray;
}

.chat__headerRight {
  display: flex;
  justify-content: space-between;
  min-width: 100px;
}
#content {
  flex: 1;
  background: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")
    repeat center;
  padding: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#content::-webkit-scrollbar {
  display: none;
}
/* .chat__body {
  flex: 1;
  background: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")
    repeat center;
  padding: 30px;
  overflow-y: scroll;
}
.chat__body::-webkit-scrollbar {
  display: none;
  bottom: 0;
} */

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 30px;
}
#time {
  position: relative;
  font-size: 8px;
  font-family: Arial, Helvetica, sans-serif;
  color:darkgray;
  margin-bottom: 30px;
}
.chat__name {
  position: absolute;
  top: -15px;
  font-weight: 800;
  font-size: xx-small;
}

.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
}

.chat__reciever {
  margin-left: auto;
  background-color: #95EC69;
}

.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
  width: 88%;
  margin-left: 8%;
}

.chat__footer > form {
  flex: 1;
  display: flex;
}

.chat__footer > form > input {
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  border: none;
}
.chat__footer > form > button {
  display: flex;
}
.chat__footer > md-icon {
  padding: 10px;
  color: gray;
}

#inputMsg:focus {
  outline: none;
}

#submitBtn {
  display: block;
  height: 40px;
  width: 80px;
  border-radius: 10px;
  border: transparent;
  background-color: #07C160;
  text-align: center;
  margin-left: 3%;
  color: white;
}

#submitBtn:hover {
  cursor: pointer;
}

#submitBtn:active {
  background-color: #7bb67d;
}


</style>