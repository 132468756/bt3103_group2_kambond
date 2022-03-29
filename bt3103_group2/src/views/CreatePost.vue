<template>
<div style="text-align:center;" v-if="user"> 
  <NavBar/>
  <backBtn/>
  <createPostForm/>
</div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import backBtn from "../components/profile/BackButton.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import createPostForm from "../components/profile/CreatePostForm.vue"

export default {
  name: "CreatePost",
  components:{
    NavBar,
    backBtn,
    createPostForm
  },
  data() {
    return {
      user: false,
      post:{
      title: "",
      purpose: "",
      desription: "",
      category: "",
      location: "",
      },
    };
  },
  mounted() {
    const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
  },
};
</script>

<style scoped>

</style>