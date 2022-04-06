<template>
<div  v-if="user">
  <NavBar/>
  <div id="filter">
    <Filter1 @change = "newFilter1" />

    <Filter2 @change = "newFilter2"/>

  </div>
    <div id="postView">
      <Modal
        v-show="isModalVisible"
        @close="closeModal" :post = "modalData"/>
      <div className = "postList" v-for= "post in posts" :key = "post.id">
        <button 
          type="button"
          id = "postModal"
          @click="showModal(post)"
        >
        <Post 
          className = "posts"
          :owner = "post.userName"
          :title = "post.title"
          :status = "post.status"
        />
        </button>
      </div>
    </div>
  <div>
    
  </div>
</div>
</template>

<script>
import Filter1 from "@/components/Filter/Filter1.vue";
import Filter2 from "@/components/Filter/Filter2.vue";
import Post from "@/components/Post.vue"
import NavBar from "../components/NavBar.vue"
import Modal from "../components/Modal.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "@/firebase.js";
import {getFirestore} from "firebase/firestore";
import {collection, getDocs, getDoc, doc, where, query} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  name: "Borrow",
  data() {
    return {
      user: false,
      isModalVisible:false,
      modalData:{},
      posts:[],
      filter:{},
      filter2:{},
      checkedLocation: [],
    };
  },
  components: {
    Filter1,
    Filter2,
    Post,
    NavBar,
    Modal,
  },
  mounted(){
    const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
        
    async function collectData(posts){
      /*let z = await getDocs(collection(db,"Posts"))
      z.forEach((doc)=> 
      { if(doc.data().status == "Want to borrow" ){
          posts.push(doc.data()) }
      }
      )*/
      var qTitle = query(
        collection(db, "Posts"),
        where("status","==","Want to borrow")
        );
        
      const queryTitle = await getDocs(qTitle)
      queryTitle.forEach((doc) => {
          posts.push(doc.data())
        })
      
      console.log(posts)
      let docRef = await getDoc(doc(db, "Users", "12345"));
      posts.forEach(async (post)=>{
        docRef = await getDoc(doc(db, "Users", post.user));
        post.userName = docRef.data().username
      
      });
      return posts;
    }
    collectData(this.posts)
  },
  methods:{
    showModal(data){
      this.isModalVisible = true;
      this.modalData = data;
      console.log("isopen")
    },
    closeModal(){
      this.isModalVisible = false;
    },  
    newFilter1(value){
      this.filter = value
      console.log(this.filter)
      this.posts= [];
      this.collectData()
    },
    newFilter2(value){
      this.filter2 = value
      console.log(value);
      this.posts= [];
      this.collectData()
    },
    async collectData(){
      var f1 = Object.keys(this.filter).length
      var f2 = Object.keys(this.filter2).length
      console.log("filter change "+ f2)
      if (f2 != 0){
        var qTitle = query(
        collection(db, "Posts"),
        where("location", "in", this.filter2),where("status","==","Want to borrow")
        );
        
      }
      else {
        qTitle = query(
        collection(db, "Posts"),
        where("status","==","Want to borrow")
        );
        console.log("detect no filter")
      }
      
      const queryTitle = await getDocs(qTitle)
      queryTitle.forEach((doc) => {
          this.posts.push(doc.data())
        })
      
      if(f1!= 0){
        const categoryFilter = Object.values(this.filter)
        console.log(categoryFilter)
        this.posts = this.posts.filter(post => categoryFilter.includes(post.category))
      }
      
      let docRef = await getDoc(doc(db, "Users", "12345"));
      this.posts.forEach(async (post)=>{
        docRef = await getDoc(doc(db, "Users", post.user));
        post.userName = docRef.data().username
      
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#postModal{
  justify-content:center;
  border-radius: 10px;
  background-color: rgba(233,233,233,0.8);
  margin: 5px 10px 5px 10px;
  border: transparent;
  box-shadow: 1px 1px 1px 1px rgba(53, 55, 57, 0.525);
}
.postList{
  display:inline-block;
  /* overflow-y: scroll; */
}
#postView{
  overflow-y: scroll;
  width: 100%;
  height: 570px;
  margin-top: 20px;
  text-align: center;
}
#postView::-webkit-scrollbar {
  display: none;
}
#filter{
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
  width: 90%;
  margin-left: 5%;
}
</style>