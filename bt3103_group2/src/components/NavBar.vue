<template>
  <div id ="logged" v-if="user">
   <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/borrow">Borrow</router-link> |
      <router-link to="/lend">Lend</router-link> |
      <!-- <router-link to="/login">Login</router-link> | -->
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/createpost"> CreatePost </router-link>
      <hr />
    </div>
</div>
</template>

<script>
import {getAuth,onAuthStateChanged} from "firebase/auth";

export default {
    name:"NavBar",

    data() {
        return {
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth,(user) => {
            if(user) {
                this.user = user;
            }
        })
    }

}
</script>

<style>

</style>