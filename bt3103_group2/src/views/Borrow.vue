<template>
<div style="text-align:center;" v-if="user"> 
  <NavBar/>
  <backBtn/>
  <form @submit.prevent="onSubmit" method="post" id="createpostform">

    <div className ="row">
    <label className = "postlabel"> Status </label>
    <select required v-model="post.status" id = "post.status">
      <option>Wants to lend</option>
      <option>Requested</option>
      <option>Completed</option>
    </select>
    </div>

    <div className ="row">
    <label className = "postlabel"> Category </label>
    <select required v-model="post.category" id = "post.category">
      <option>Beauty & Personal Care</option>
      <option>Bulletin Board</option>
      <option>Computers & Tech</option>
      <option>Food & Drinks</option>
      <option>Health & Nutrition</option>
      <option>Hobbies & Toys</option>
      <option>Mobile Phones & Gadgets</option>
      <option>Photography</option>
      <option>Sports Equipment</option>
      <option>Tickets & Vouchers</option>
      <option>Learning & Enrichment</option>
      <option>Video Gaming</option>
      <option>Fashion</option>
      <option>Exchange Currency</option>
      <option>Musical Instrument</option>
      <option>Others</option>
    </select>
    </div>

    <div className ="row">
    <label className = "postlabel"> Location </label>
    <select required v-model="post.location" id = "post.location">
      <option>PGP / PGPR</option>
      <option>Utown</option>
      <option>RVRC</option>
      <option>Temasek Hall</option>
      <option>Sheares Hall</option>
      <option>KEVII Hall</option>
      <option>Eusoff Hall</option>
      <option>Raffles Hall</option>
      <option>Kent Ridge Hall</option>
      <option>Others</option>
    </select>
    </div>
    <div className = "showRow">
      <button className="show" @click = "showpost()"> Show </button>
    </div>
    
  
  </form>
</div>
  <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :post = "modalData"
      />
  <div className = "postList" 
    v-for= "post in filteredProducts"
    :key = "post.id"
    v-show ="showdata">>
    <button type="button"
          id = "postModal"
          @click="showModal(post)">
      <Post className = "posts"
      :owner = "post.userName"
      :title = "post.title"
      :status = "post.status"/>
      
    </button> 
  </div>
  
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore} from "firebase/firestore";
import { doc} from "firebase/firestore";
import Post from "@/components/Post.vue"
import NavBar from "../components/NavBar.vue"
import Modal from "../components/Modal.vue"
import backBtn from "../components/profile/BackButton.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection, getDocs, getDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "CreatePost",
  components:{
    NavBar,
    backBtn,
    Post,
    Modal,
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
      isModalVisible:false,
      showdata: false,
      modalData:{},
      posts:[],
      filteredProducts:[],
      selectedstatus: "",
      selectedcategory: "",
      selectedlocation: "",
    };
  },
  mounted() {
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
      let docRef = await getDoc(doc(db, "Users", "12345"));
      console.log(docRef.data().username);
      posts.forEach(async (post)=>{
        docRef = await getDoc(doc(db, "Users", post.user));
        console.log(docRef.data().username)
        post.userName = docRef.data().username
       
      });
      return posts;
    }
    collectData(this.posts)

  },
methods: {
   
  showModal(data) {
        this.isModalVisible = true;
        this.modalData = data;
        console.log("isopen")
  },
  showpost() {
    this.selectedcategory = document.getElementById("post.category").value;
    this.selectedstatus = document.getElementById("post.status").value;
    this.selectedlocation = document.getElementById("post.location").value;
    this.filteredProducts = this.posts.filter(post => post.purpose === "Lending").filter(post =>  post.category === this.selectedcategory).filter(post => post.location = this.selectedlocation).filter(post => post.status === this.selectedstatus);
    this.showdata = true;  
  },
  closeModal() {
        this.isModalVisible = false;
 }

},
};
</script>

<style scoped>
#postModal{
  justify-content:center;
}

.postList{
  display:inline-block;
}
#createpostform {
  background: rgb(205, 243, 213);
  padding-bottom: 80px;
  border-radius: 10px;
  justify-content:center;
}
.postlabel {
  color: rgb(31, 34, 34);
  display: flex;
  justify-content:left;
  margin-top:2%;
  margin-bottom:2%;
  width:100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,select {
  display: flex;
  justify-content:center;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.row{
    display:flex;
    flex-direction:column;
    width:40%;
    margin-left:30%;
}
.submitRow{
    margin-left:60%;
    padding:1%;
}
.submit {
    position:absolute;
    text-align: center;
    background-color: blue;
    border:0;
    padding:10px 20px;
    margin-top:20px;
    color:aliceblue;
    border-radius: 20px;
    width:10%;
    height:7%;
    cursor: pointer;
}
.submit:hover{
  outline-color: transparent;
  outline-style: solid;
  box-shadow: 0 0 0 1px lightblue;
  transition: 0.5s;
}
.submit:active{
  background-color: lightblue;
}
</style>


