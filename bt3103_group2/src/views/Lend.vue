<template>
<div style="text-align:center;" v-if="user">
  <NavBar/>
  <Filter1 />
  <Filter2 />
  <Filter4 />
</div>
</template>

<script>
import Filter1 from "@/components/Filter/Filter1.vue";
import Filter2 from "@/components/Filter/Filter2.vue";
import Filter4 from "@/components/Filter/Filter4.vue";
import NavBar from "../components/NavBar.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  name: "Lend",
  data() {
    return {
      user: false,
      checkedNames: [],
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter4,
    NavBar,
  },

  mounted() {
      const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user;
          }
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
