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
      :owner = "post.user"
      :title = "post.title"
      :status = "post.status"/>
      
    </button>
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
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
      title:"charger",
      owner:"someone",
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
      let docRef = doc(db, "Users", posts[1].user);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
  // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      posts.forEach((post)=>{
        docRef = doc(db, "Users", post.user);
        docSnap = getDoc(docRef);
        console.log(docSnap.data())
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
