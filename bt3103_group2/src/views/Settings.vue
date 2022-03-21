<template>
<div style="text-align:center;" v-if="user">
    <NavBar/>
    <!-- <h1>This is a sample page for settings</h1> -->
    <backBtn/>
    <br><br>
    <span id="left">
        <userInfo/>
    </span>

    <span id="right">
        <settingTable/>
    </span>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <LogOut/>
</div>
</template>

<script>
import backBtn from "../components/profile/BackButton.vue"
import userInfo from "../components/profile/UserInfoDisplay.vue"
import settingTable from "../components/profile/SettingsTable.vue"
import NavBar from "../components/NavBar.vue"
import LogOut from "../components/Logout.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default {
  name: "Settings",
  components: {
    NavBar,
    LogOut,
    backBtn,
    userInfo,
    settingTable
  },

  data(){
        return{
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style>
#left {
    display: inline-block;
    width: 40%;
}

#right {
    display: inline-block;
    width: 60%;
}
</style>