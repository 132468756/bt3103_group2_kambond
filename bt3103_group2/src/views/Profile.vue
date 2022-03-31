<template>
  <div>
    <NavBar />
    <backBtn />
    <userInfo :user="this.id" />
  </div>

  <div>
    <otherUserProfileTable :id="this.user" />
    <button id="chatBtn" @click="createChatRoom(this)">Chat</button>
    <likeBtn />
  </div>
</template>

<script>
// import Logout from "../components/Logout.vue"
import backBtn from "../components/profile/BackButton.vue";
import otherUserProfileTable from "../components/OtherUserProfileTable.vue";
import userInfo from "../components/profile/OtherUserInfoDisplay.vue";
import likeBtn from "../components/profile/LikeButton.vue";
import NavBar from "../components/NavBar.vue";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default {
  name: "Profile",
  props: {
    id: String,
  },
  data() {
    return {
      user: this.id,
    };
  },
  methods: {
    async createChatRoom(self) {
      const userId = auth.currentUser.email;
      const chatUserId = self.id;
      const queryCheck = await getDoc(doc(db, "Users", userId));
      const chatrooms = queryCheck.data().chatrooms;
      const haveOrNot = chatrooms.includes(String(chatUserId));
      console.log(haveOrNot);
      if (!haveOrNot) {
        const chatUser = await getDoc(doc(db, "Users", String(chatUserId)));
        const chatRoomId = userId + chatUserId;
        const docNow = await setDoc(doc(db, "Chats", String(chatRoomId)), {
          user1:String(chatUserId),
          user2:String(userId),
          profile_picture: String(chatUser.data().photoURL),
          chats: [],
          chatRoomName:String(chatRoomId),
        });
        console.log(docNow);
        const docRef = await updateDoc(doc(db, "Users", String(userId)), {
          chatrooms: arrayUnion(String(chatUserId)),
        });
        console.log(docRef);
        const docNew = await updateDoc(doc(db, "Users", String(chatUserId)), {
          chatrooms: arrayUnion(String(userId)),
        });
        console.log(docNew);
      }
      this.$router.push({name:'MyProfile'});
    },
  },
  mounted() {
    console.log(this.id);
  },

  components: {
    // Logout,
    backBtn,
    userInfo,
    otherUserProfileTable,
    likeBtn,
    NavBar,
  },
};
</script>

<style>
#chatBtn {
  width: 60px;
  height: 30px;
  background-color: rgb(184, 240, 192);
  color: white;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  margin-left: 10%;
}
</style>