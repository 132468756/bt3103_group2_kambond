<template>
  <div id="filter">
    <Filter1 />

    <Filter2 />

    <Filter3 />

  </div>
  <div className = "postList">
    <button type="button"
          id = "postModal"
          @click="showModal">
      <Post v-for= "post in posts"
      :key = "post.id"
      :owner = "post.userName"
      :title = "post.title"
      :status = "post.status"/>
      
    </button>
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
        v-for= "post in posts"
        :key = "post.id"
        :owner = "post.userName"
        :title = "post.title"
        :description = "post.description"
      />
    
  </div>
  <div>
    
  </div>
</template>

<script>
import Filter1 from "./Filter/Filter1.vue";
import Filter2 from "./Filter/Filter2.vue";
import Filter3 from "./Filter/Filter3.vue";
import Post from "./Post.vue"
import Modal from "./Modal.vue"

import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore";
import {collection, getDocs, getDoc, doc} from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  name: "Borrow",
  data() {
    return {
      checkedNames: [],
      isModalVisible:false,
      posts:[],
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter3,
    Post,
    Modal,
  },
  mounted(){
    async function collectData(posts){
      let z = await getDocs(collection(db,"Posts"))
      z.forEach((doc)=> 
      posts.push(doc.data()))
      console.log(posts)
      let docRef = await getDoc(doc(db, "Users", "12345"));
      console.log(docRef.data().userName)

      posts.forEach(async (post)=>{
        docRef = await getDoc(doc(db, "Users", post.user));
        console.log(docRef.data().userName)
        post.userName = docRef.data().userName
       
      })
      return posts;
    }
    collectData(this.posts)

    
  },
  methods:{
     showModal() {
        this.isModalVisible = true;
      },
  closeModal() {
        this.isModalVisible = false;
      },
      
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#postModal{
  justify-content:center;
}

</style>
