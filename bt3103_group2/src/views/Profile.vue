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
  props:{
        id:String
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