<template>
<div style="text-align:center;" v-if="user"> 
  <NavBar/>
  <backBtn/>
  <div class = "filter" id="createpostform">

    <div className ="row">
    <label className = "postlabel"> Status </label>
    <select required v-model="post.status" id = "post.status">
      <option>Want to lend</option>
      <option>Requested</option>
      <option>Completed</option>
    </select>
    </div>

<div id="checked">Filtered status: {{ this.selectedstatus }}</div>
  <div class="whole">
    <div id="name">
      <h3>Status</h3>
    </div>
    <div id="checkboxes">
      <input
        type="checkbox"
        id="wtl"
        value="Want to lend"
        v-model="selectedstatus"
      />
      <label for="wtl">Want to lend</label>

      <input type="checkbox" id="rq" value="Requested" v-model="selectedstatus" />
      <label for="rq">Requested</label>

      <input type="checkbox" id="cl" value="Completed" v-model="selectedstatus" />
      <label for="cl">Completed</label>
    </div>
  </div>

  <div id="checked">Filtered category: {{ this.selectedcategory }}</div>
   
  <div class="whole">
    <div id="name">
      <h3>Category</h3>
    </div>

    <div id="checkboxes">
      <input
        type="checkbox"
        id="BP"
        value = "Beauty & Personal Care"
        v-model="selectedcategory"
      />

      <label for="BP">Beauty & Personal Care</label>

      <input
        type="checkbox"
        id="BB"
        value="Bulletin Board"
        v-model="selectedcategory"
      />
      <label for="BB">Bulletin Board</label>

      <input
        type="checkbox"
        id="CT"
        value="Computers & Tech"
        v-model="selectedcategory"
      />
      <label for="CT">Computers & Tech</label>

      <input
        type="checkbox"
        id="FD"
        value="Food & Drinks"
        v-model="selectedcategory"
      />
      <label for="FD">Food & Drinks</label>

      <input
        type="checkbox"
        id="HN"
        value="Health & Nutrition"
        v-model="selectedcategory"
      />
      <label for="HN">Health & Nutrition</label>

      <input
        type="checkbox"
        id="HT"
        value="Hobbies & Toys"
        v-model="selectedcategory"
      />
      <label for="HT">Hobbies & Toys</label>

      <input
        type="checkbox"
        id="MG"
        value="Mobile Phones & Gadgets"
        v-model="selectedcategory"
      />
      <label for="MG">Mobile Phones & Gadgets</label>

      <input
        type="checkbox"
        id="PG"
        value="Photography"
        v-model="selectedcategory"
      />
      <label for="PG">Photography</label>

      <input
        type="checkbox"
        id="SE"
        value="Sports Equipment"
        v-model="selectedcategory"
      />
      <label for="SE">Sports Equipment</label>
      <br />
      <input
        type="checkbox"
        id="TV"
        value="Tickets & Vouchers"
        v-model="selectedcategory"
      />
      <label for="TV">Tickets & Vouchers</label>

      <input
        type="checkbox"
        id="LE"
        value="Learning & Enrichment"
        v-model="selectedcategory"
      />
      <label for="LE">Learning & Enrichment</label>

      <input
        type="checkbox"
        id="VG"
        value="Video Gaming"
        v-model="selectedcategory"
      />
      <label for="VG">Video Gaming</label>

      <input type="checkbox" id="FS" value="Fashion" v-model="selectedcategory" />
      <label for="FS">Fashion</label>

      <input
        type="checkbox"
        id="EC"
        value="Exchange Currency"
        v-model="selectedcategory"
      />
      <label for="EC">Exchange Currency</label>

      <input
        type="checkbox"
        id="MI"
        value="Musical Instrument"
        v-model="selectedcategory"
      />
      <label for="MI">Musical Instrument</label>

      <input
        type="checkbox"
        id="others"
        value="Others"
        v-model="selectedcategory"
      />
      <label for="others">Others</label>
    </div>
  </div>

  <div id="checked">Filtered locations: {{ this.selectedlocation }}</div>
  <div class="whole">
      <div id="name">
      <h3>Location</h3>
    </div>
  <div id="checkboxes">
    <input type="checkbox" id="pgp" value="PGP / PGPR" v-model="selectedlocation" />
    <label for="pgp">PGP / PGPR</label>

    <input type="checkbox" id="ut" value="Utown" v-model="selectedlocation" />
    <label for="ut">Utown</label>

    <input type="checkbox" id="rvrc" value="RVRC" v-model="selectedlocation" />
    <label for="rvrc">RVRC</label>

    <input
      type="checkbox"
      id="temasek"
      value="Temasek Hall"
      v-model="selectedlocation"
    />
    <label for="temasek">Temasek Hall</label>

    <input
      type="checkbox"
      id="sheares"
      value="Sheares Hall"
      v-model="selectedlocation"
    />
    <label for="sheares">Sheares Hall</label>

    <input
      type="checkbox"
      id="kevii"
      value="KEVII Hall"
      v-model="selectedlocation"
    />
    <label for="kevii">KEVII Hall </label>

    <input
      type="checkbox"
      id="eusoff"
      value="Eusoff Hall"
      v-model="selectedlocation"
    />
    <label for="eusoff">Eusoff Hall</label>

    <input
      type="checkbox"
      id="raffles"
      value="Raffles Hall"
      v-model="selectedlocation"
    />
    <label for="raffles">Raffles Hall</label>

    <input
      type="checkbox"
      id="kentridge"
      value="Kent Ridge Hall"
      v-model="selectedlocation"
    />
    <label for="kentridge">Kent Ridge Hall</label>

    <input type="checkbox" id="others" value="Others" v-model="selectedlocation" />
    <label for="others">Others</label>
  </div>
  </div>
 
    <div className = "showRow">
      <button className="show" @click = "showpost()"> Show </button>
    </div>
    
  
  </div>
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
import backBtn from "../components/other-profile/BackButton.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection, getDocs, getDoc, query, where} from "firebase/firestore";
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
      selectedstatus: [],
      selectedcategory: [],
      selectedlocation: [],
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
      console.log(docRef.data().username);
      posts.forEach(async (post)=>{
        docRef = await getDoc(doc(db, "Users", post.user));
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
    this.filteredProducts = this.posts.filter(post => post.purpose === "Lending").filter(post => this.selectedcategory.includes(post.category)).filter(post => this.selectedstatus.includes(post.status)).filter(post => this.selectedlocation.includes(post.location));

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
    
  /* The image used */
  background-image: url("~@/assets/modal-bg3.jpg");

  /* Control the height of the image */
  min-height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
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
#checkboxes input {
  margin: 10px 1px 10px 10px;
}

#checkboxes label {
  margin: 10px 20px 10px 5px;
}

#name {
  background-color: rgba(177, 178, 248, 0.699);
  text-align: center;
  width: 180px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}

#checkboxes {
  background-color: rgba(218, 217, 245, 0.911);
  padding: 10px;
  width: 2000px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  display: flexbox;
}

.whole {
  display: flex;
}

#checked {
  background-color: rgba(241, 238, 255, 0.582);
  padding: 5px;
  border: 1px solid black;
}
</style>


