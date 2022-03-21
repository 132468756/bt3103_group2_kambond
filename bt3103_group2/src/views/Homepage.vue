<template>
  <div class="home" v-if="user">
    <NavBar/>
    <br><br>
    <SearchField/>
  </div>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue"
import NavBar from "../components/NavBar.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default {
  name: "Homepage",
  components: {
    NavBar,
    SearchField,
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
.home {
    /* The image used */
    background-image: url('~@/assets/search-bg.jpg');

    /* Control the height of the image */
    min-height: 380px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
</style>