<template>
<div style="text-align:center;" v-if="user">
  <NavBar/>
  <div id="filter">
    <Filter1 />

    <Filter2 />

    <Filter3 />

  </div>
  <Post v-for= "post in posts"
  :key = "post.id"
  :owner = "post.owner"
  :title = "post.title"
  :status = "post.status"/>
  <div className = "Postlist">
  </div>
</div>
</template>

<script>
import Filter1 from "@/components/Filter/Filter1.vue";
import Filter2 from "@/components/Filter/Filter2.vue";
import Filter3 from "@/components/Filter/Filter3.vue";
import Post from "@/components/Post.vue"
import NavBar from "../components/NavBar.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import firebaseApp from "@/firebase.js";
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  name: "Borrow",
  data() {
    return {
      user: false,
      checkedNames: [],
      title:"charger",
      owner:"someone",
      postcontent:[
        { id: 1,
          title:"handphone",
        owner:"person1",
        status:"want to borrow"},
        { id:2,
          title:"egg", 
        owner:"person2",
        status:"want to borrow"}
      ],
      posts:[],
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter3,
    Post,
    NavBar,
  },
  mounted(){
    const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
        
    async function collectData(posts){
      let z = await getDocs(collection(db,"Posts"))
      z.forEach((doc)=> 
      posts.push(doc.data()))
      console.log(posts)
      return posts;
    }
    collectData(this.posts)
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
