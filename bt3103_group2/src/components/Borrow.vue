<template>
  <div id="filter">
    <Filter1 />

    <Filter2 />

    <Filter3 />

  </div>
  <Post v-for= "post in postcontent"
  :key = "post.id"
   :owner = "post.owner"
  :title = "post.title"/>
  <div className = "Postlist">
  </div>
</template>

<script>
import Filter1 from "./Filter/Filter1.vue";
import Filter2 from "./Filter/Filter2.vue";
import Filter3 from "./Filter/Filter3.vue";
import Post from "./Post.vue"

import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  name: "Borrow",
  data() {
    return {
      checkedNames: [],
      title:"charger",
      owner:"someone",
      postcontent:[
        { id: 1,
          title:"handphone",
        owner:"person1"},
        { id:2,
          title:"egg", 
        owner:"person2"}
      ]
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter3,
    Post,
  },
  methods:{
    async collectData(){
      let z = await getDocs(collection(db,"Posts"))
      return z;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
