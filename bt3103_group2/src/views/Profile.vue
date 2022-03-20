<template>
<div>
  <userInfo/>
</div>

<div>
  <otherUserProfileTable/>
</div>
</template>

<script>
// import Logout from "../components/Logout.vue"
import otherUserProfileTable from "../components/OtherUserProfileTable.vue"
import userInfo from "../components/profile/UserInfoDisplay.vue"

export default {
  name: "Profile",
  components : {
    // Logout,
    userInfo,
    otherUserProfileTable
  }
}
</script>

<style>
  
</style>