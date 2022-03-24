<template>
<div style="text-align:center;" v-if="user"> 
  <NavBar/>
  <backBtn/>
  <form @submit.prevent="onSubmit" method="post" id="createpostform">
      <div className ="row">
    <label className = "postlabel"> Title </label>
    <input type="title" required v-model="post.title" id = "post.title"/>
    </div>

    <div className ="row">
    <label className = "postlabel"> Purpose </label>
    <select required v-model="post.purpose" id = "post.purpose">
      <option>Borrowing</option>
      <option>Lending</option>
    </select>
    </div>

    <div className ="row">
    <label className = "postlabel"> Description </label>
    <input type="desription" required v-model="post.description" id = "post.description"/>
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

    <div className = "submitRow">
      <button className="submit" @click = "createPost()"> Create Post </button>
    </div>
  
  </form>
</div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {arrayUnion, getFirestore} from "firebase/firestore";
import { doc, setDoc, updateDoc} from "firebase/firestore";
import NavBar from "../components/NavBar.vue"
import backBtn from "../components/profile/BackButton.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore(firebaseApp);
const auth = getAuth()
export default {
  name: "CreatePost",
  components:{
    NavBar,
    backBtn,
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
methods: {
  async createPost() {
    var a = document.getElementById("post.title").value
    var b = document.getElementById("post.purpose").value
    var c = document.getElementById("post.description").value
    var d = document.getElementById("post.category").value
    var f = document.getElementById("post.location").value
    var email = auth.currentUser.email
    var status = b
    if(b == "Borrowing"){
        status = "Wants to borrow"
    }
    else{
        status = "Wants to lend"
    }
    var sysTime = new Date()
    var timeStamp = sysTime.getTime()
    var postID = email + a + timeStamp
    if (confirm("creating post : " + a) == true){
      try{
          const docRef = await setDoc(doc(db, "Posts", postID), {
              title:a,
              purpose:b,
              description:c,
              category:d,
              location:f,
              status: status,
              user:email,
              postID:postID
          })
          console.log(docRef);
      }
      catch(error){
        console.error("Error adding document:", error);
      }
      let user_info = doc(db, "Users", this.user.email)
      await updateDoc(user_info, {
        posts: arrayUnion(postID)
      })
    }
  }
}
};
</script>

<style scoped>
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