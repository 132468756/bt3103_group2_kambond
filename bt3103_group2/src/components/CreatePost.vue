<template>
  <form @submit.prevent="createPost" method="post" id="createpostform">
      <div className ="row">
    <label> Title </label>
    <input type="title" required v-model="post.title" id = "post.title"/>
    </div>

    <div className ="row">
    <label> Purpose </label>
    <select required v-model="post.purpose" id = "post.purpose">
      <option>Borrowing</option>
      <option>Lending</option>
    </select>
    </div>

    <div className ="row">
    <label> Description </label>
    <input type="desription" required v-model="post.description" id = "post.description"/>
    </div>

    <div className ="row">
    <label> Category </label>
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
    <label> Location </label>
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
    <button className="submit" v-on:click = "createPost()"> Create Post </button>

  </div>
  </form>
  
</template>

<script>
import firebaseApp from "../firebase.js";
import {getFirestore} from "firebase/firestore";
import { doc, setDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  name: "CreatePost",
  data() {
    return {
      post:{
      title: "",
      purpose: "",
      desription: "",
      category: "",
      location: "",
      }
    };
  },
methods: {
  async createPost() {
    var a = document.getElementById("post.title").value
    var b = document.getElementById("post.purpose").value
    var c = document.getElementById("post.description").value
    var d = document.getElementById("post.category").value
    var f = document.getElementById("post.location").value

    alert("creating post : " + a)
    try{
        const docRef = await setDoc(doc(db, "Posts", a),
        {
            title:a,
            purpose:b,
            description:c,
            category:d,
            location:f
        }
        )
        console.log(docRef);
    }
    catch(error){
                console.error("Error adding document:", error);
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
label {
  color: rgb(31, 34, 34);
  display: flex;
  justify-content:center;
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
    height:5%;
}
</style>