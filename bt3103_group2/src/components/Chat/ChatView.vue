<template>
  <div class="chat">
    <div class="chat__header">
      <md-avatar class="md-large">
        <!-- https://avatars.githubusercontent.com/u/32813584?s=60&v=4 -->
        <img id ="chatimg" src="@/assets/profilephoto.jpeg" />
      </md-avatar>
      <div class="chat__headerInfo">
        <h3>{{ friend.email }}</h3>
        <p>Last seen at ...</p>
      </div>

      <div class="chat__headerRight">
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>attach_file</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </div>
    <div class="chat__body" id="container">
      <div v-for="chat in chats" :key="chat.key">
        <p :class="`chat__message ${isMe(chat) && 'chat__reciever'}`">
          {{ chat.message }}
        </p>
      </div>
    </div>
    <div class="chat__footer">
      <md-icon>insert_emoticon</md-icon>
      <form v-on:submit.prevent="onSubmit">
        <input type="text" id="inputMsg" />
        <button type="submit">send a message</button>
      </form>
      <md-icon>mic</md-icon>
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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "Chat",
  props: ["room"],
  data() {
    return {
      chats: [],
      roomid: null,
      avatar: null,
      friend: {},
      myemail:auth.currentUser.email,
    };
  },
  methods: {
    async onSubmit() {
      const msg = document.getElementById("inputMsg").value;
      console.log("msg on submit", msg);
      let newData = await updateDoc(doc(db, "Chats", this.roomid), {
        chats: arrayUnion(msg),
      });
      console.log(newData);
      document.getElementById("inputMsg").value = "";
    },
    isMe(chat) {
      return chat.user == this.email;
    },
    async getPreviousChats(roomId) {
      let docRef = await getDoc(doc(db, "Chats", roomId));
      let previous = docRef.data().chats;
      console.log(docRef);
      previous.forEach((doc) => {
        let item = doc.val();
        this.chats.push(item);
      });
      console.log("chats", this.chats);
    },

    async getRoomName(room) {
      console.log("room name is ", room);     
      this.getPreviousChats(room);
    },
    displayFirstRoom() {
      if (this.room.data().user1 != this.myemail) {
        this.friend = this.room.data().user2;
      } else {
        this.friend = this.room.data().user1;
      }
      this.getRoomName(this.room.data().chatRoomName);
      this.avatar = this.room.data().profile_picture;
    },
  },
  mounted() {
    console.log("Chatview",this.room);
    var container = this.$el.querySelector("#container");
    container.scrollTop = container.scrollHeight;
    this.$root.$on('updateChatViewEvent', room => {
          console.log("retriving", room);
          //this.room = room;
          this.friend = room.user;
          this.getRoomName(room.meetingRoom);
          this.avatar = this.friend.picture;
          var container = this.$el.querySelector("#container");
          container.scrollTop = container.scrollHeight;
      });
    this.displayFirstRoom();
    // this.email = auth.currentUser.email;
  },
};
</script>

<style scoped>
#chatimg {
  width:30px;
  height: 30px;
}
.chat {
  flex: 0.7;
  display: flex;
  flex-direction: column;
}

.chat__header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.chat__headerInfo {
  flex: 1;
  padding-left: 20px;
}

.chat__headerInfo > h3 {
  margin-bottom: 3px;
  font-weight: 500;
}

.chat__headerInfo > p {
  color: gray;
}

.chat__headerRight {
  display: flex;
  justify-content: space-between;
  min-width: 100px;
}

.chat__body {
  flex: 1;
  background: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")
    repeat center;
  padding: 30px;
  overflow-y: auto;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  width: fit-content;
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
  background-color: #b0ffb0;
}

.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
}

.chat__footer > form {
  flex: 1;
  display: flex;
}

.chat__footer > form > input {
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none;
}
.chat__footer > form > button {
  display: none;
}
.chat__footer > md-icon {
  padding: 10px;
  color: gray;
}
</style>