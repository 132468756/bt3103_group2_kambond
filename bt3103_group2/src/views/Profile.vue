<template>
<div>
  <userInfo/>
</div>

<div>
  <otherUserProfileTable :id = this.user />
  <button>Chat</button>
</div>
</template>

<script>
// import Logout from "../components/Logout.vue"
import otherUserProfileTable from "../components/OtherUserProfileTable.vue"
import userInfo from "../components/profile/UserInfoDisplay.vue"

export default {
  name: "Profile",
  props:{
        id:String
    },
  data(){
    return{user: "lrqian2000@gmail.com"}
    
  },

  components : {
    // Logout,
    userInfo,
    otherUserProfileTable
  },

}
</script>

<style>
  
</style>