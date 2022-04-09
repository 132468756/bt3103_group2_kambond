<template>
<NavBar/>
<div class="otherUserProfile">
    <div class="otherInfoDisUp">
        <userInfo id="otherUserInfo" :user="this.id" @interface="getUpdate($event)" />
        <div id="otherUserBtns">
            <!-- <button class="Btn" id="chatBtn" @click="$router.push({name: 'Chats', params: { receiver: this.id }});createChatRoom()">Chat</button> -->
            <button class="Btn" id="chatBtn" @click="createChatRoom()">Chat</button>
            <br>
            <likeBtn class="Btn" id="likeBtn" :user="this.id" @updateAfterLike="update"/>
            <br>
            <backBtn class="Btn" id="backBtn"/>
        </div>
    </div>
    <div id="otherUserTableContainer">
      <otherUserProfileTable id="otherUserTable" :userid="this.id" />
    </div>
</div>
</template>

<script>
// import Logout from "../components/Logout.vue"
import backBtn from "../components/other-profile/BackButton.vue";
import otherUserProfileTable from "../components/other-profile/OtherUserProfileTable.vue";
import userInfo from "../components/other-profile/OtherUserInfoDisplay.vue";
import likeBtn from "../components/other-profile/LikeButton.vue";
import NavBar from "../components/NavBar.vue";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,Timestamp
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
      user: '',
    };
  },

  childInterface:{
    update: () => {}
  },

  // getUpdate(childInterface) {
  //   this.$options.childInterface = childInterface;
  //   console.log("child interface got")
  // },

  // update(){
  //   this.$options.childInterface.update(this);
  //   console.log("updated");
  // },

  methods: {
    getUpdate(childInterface) {
    this.$options.childInterface = childInterface;
    console.log("child interface got")
  },

  update(){
    this.$options.childInterface.update(this);
    console.log("updated");
  },
  
    async createChatRoom() {
      const userId = auth.currentUser.email;
      const chatUserId = this.id;
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
          timestamp:Timestamp.now(),
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
      this.$router.push({name: 'sideBar', query: {q:"showChats"}});
    },

    updateDisplay(){

    }

    // chatWithUser(){
    //   console.log("profile page: ",this.user)
    //   this.$router.push({ name:"Chats", params:{id: this.user}})
    // },

  },

  mounted() {
    console.log(this.id);
    this.user = this.id
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
.otherInfoDisUp{
  display:flex;
}
#otherUserInfo{
  float:left;
  width:60vw;
  background-image: url("~@/assets/grey.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
  
  margin-left:4vw;

  border-radius:10px;
}
#otherUserBtns{
  float:right;
  width:10vw;
  margin-top:14vh;
  margin-left:2vw;
}
#backBtn, #likeBtn, #chatBtn {
  width: 7vw;
  border: 1.5px solid rgba(159, 204, 183);
  border-radius: 10px;
  background-color:rgb(214, 241, 238);
  margin: 5px;
}
#backBtn:hover, #likeBtn:hover, #chatBtn:hover{
  background-color:rgba(159, 204, 183);
  transition:0.5s;
}

#otherUserTable{

}
.otherUserProfile{
  width: 80vw;
  height: 742px;
  margin-top: 30px;
  margin-left: 10%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;

  background-image: url("~@/assets/hand-paint.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
}
/* #otherUserInfo, #otherUserBtns{
  float: left;
} */
#otherUserTableContainer {
  overflow-y: scroll;
  width: 100%;
  height: 385px;
  text-align: center;
}

#otherUserTableContainer::-webkit-scrollbar {
  display: none;
}
</style>