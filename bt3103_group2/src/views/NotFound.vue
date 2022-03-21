<template>
<div style="text-align:center;" v-if="user">
  <NavBar/>
  <h1>Not Found</h1>
  <h2>Please click on above available buttons</h2>
  <LogOut/>
  <br>
</div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import LogOut from "../components/Logout.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default {
  name: "NotFound",
  components: {
    NavBar,
    LogOut,
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
    },
}

</script>

<style>

</style>