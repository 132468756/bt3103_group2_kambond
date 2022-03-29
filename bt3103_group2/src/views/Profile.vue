<template>
<div>
  <NavBar/>
  <backBtn/>
  <userInfo :user = this.id />
</div>

<div>
  <otherUserProfileTable :id = this.user />
  <button id="chatBtn">Chat</button>
  <likeBtn />
</div>
</template>

<script>
// import Logout from "../components/Logout.vue"
import backBtn from "../components/profile/BackButton.vue"
import otherUserProfileTable from "../components/OtherUserProfileTable.vue"
import userInfo from "../components/profile/OtherUserInfoDisplay.vue"
import likeBtn from "../components/profile/LikeButton.vue"
import NavBar from "../components/NavBar.vue"

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
    async createChatRoom(user,self) {
      const userId = auth.currentUser.email;
      const chatUserId = self.id;
      console.log(userId);
      console.log(chatUserId);
      console.log(chatRoomId);
      const chatRoomId = userId + chatUserId;
      const docNow = await setDoc(doc(db, "Chats", String(chatRoomId)), 
      {
        username: String(user.displayName),
        email: String(user.email),
        profile_picture: String(user.photoURL),
        meetingrooms: '',
      });
      console.log(docNow);
      const docRef = await updateDoc(doc(db,"Users",String(userId)), {
        chatrooms:arrayUnion(String(chatUserId))
      });
      console.log(docRef);
      const docNew = await updateDoc(doc(db,"Users",String(chatUserId)), {
        chatrooms:arrayUnion(String(userId))
      })
      console.log(docNew);
    },
  data(){
    return{
      user: this.id
      }
  },
  mounted(){
    console.log(this.id)
  },

  components : {
    // Logout,
    backBtn,
    userInfo,
    otherUserProfileTable,
    likeBtn,
    NavBar
  },

}
</script>

<style>
  #chatBtn{
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