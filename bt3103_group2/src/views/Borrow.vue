<template>
<div style="text-align:center;" v-if="user"> 
  <NavBar/>
  <div class = "filter" id="createpostform">


  <div class="whole">
    <div id="categoryname">
      <h3>Category</h3>
    </div>
  <div id = "categorycheckboxes">
  <input type="checkbox" @change="categoryselectAll" v-model="categoryallSelected">Select All
  <class v-for = "category of categories" :key = "category.id">
          <label><input type = "checkbox" v-model = "selectedcategory" :value = "category.id" @change="categoryupdateCheckall()" />{{category.id}}</label>
      </class>
    </div>
  </div>
  </div>

  <div class="whole">
    <div id="locationname">
      <h3>Location</h3>
    </div>
<div id = "locationcheckboxes">
  <input type="checkbox" @change="locationselectAll" v-model="locationallSelected">Select All
      <class  id = "checkboxes" v-for = "location of locations" :key = "location.id">
          <label><input type = "checkbox" v-model = "selectedlocation" :value = "location.id" @change="locationupdateCheckall()"/>{{location.id}}</label>
      </class>
    </div>
  </div>
  </div>
 
  <div className = "showRow">
    <button className="show" @click = "showpost()"> Filter all items for Borrowing</button>
    </div>

    
  <div id = "postView">
  <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :post = "modalData"
      />

  <div className = "postList" 
    v-for= "post in filteredPosts"
    :key = "post.id"
    v-show ="showdata">
    <button type= "button"
          id = "postModal"
          @click="showModal(post)">
      <Post className = "posts"
      :owner = "post.userName"
      :title = "post.title"
      :status = "post.status"/>
      </button>
    </div>

   <div className = "postList" 
    v-for= "post in posts"
    :key = "post.id"
    v-show = "originalshow">
    <button type="button"
          id = "postModal"
          @click="showModal(post)">
      <Post className = "posts"
      :owner = "post.userName"
      :title = "post.title"
      :status = "post.status"/>
      
    </button> 
  </div>

  </div>
  
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore} from "firebase/firestore";
import { doc} from "firebase/firestore";
import Post from "@/components/Post.vue"
import NavBar from "../components/NavBar.vue"
import Modal from "../components/Modal.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import {collection, getDocs, getDoc, where, query} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "CreatePost",
  components:{
    NavBar,
    Post,
    Modal,
  },
  data() {
    return {
      user: false,
      isModalVisible:false,
      showdata: false,
      originalshow: true,
      modalData:{},
      posts:[],
      filteredPosts:[],
      selectedstatus: [],
      selectedcategory: [],
      selectedlocation: [],
      statusallSelected: false,
      locationallSelected: false,
      categoryallSelected: false,
      statuses: [
        {id: "Want to lend"},
        {id: "Requested"},
        {id: "Completed"},
      ],
      categories: [
        {id: "Beauty & Personal Care"},
        {id: "Bulletin Board"},
        {id: "Computers & Tech"},
        {id: "Food & Drinks"},
        {id: "Health & Nutrition"},
        {id: "Hobbies & Toys"},
        {id: "Mobile Phones & Gadgets"},
        {id: "Photography"},
        {id: "Sports Equipment"},
        {id: "Tickets & Vouchers"},
        {id: "Learning & Enrichment"},
        {id: "Video Gaming"},
        {id: "Fashion"},
        {id: "Exchange Currency"},
        {id: "Musical Instrument"},
        {id: "Others"},
      ],
      locations: [
        {id: "PGP/PGPR"},
        {id: "Utown"},
        {id: "RVRC"},
        {id: "Temasek Hall"},
        {id: "Shears Hall"},
        {id: "KEVII Hall"},
        {id: "Eusoff Hall"},
        {id: "Raffles Hall"},
        {id: "Kent Ridge Hall"},
        {id: "Others"},
      ]

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
        where("status","==","Want to lend")
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
methods: {
  async locationselectAll() {
    if(this.locationallSelected) {
      const selectedlocation = this.locations.map((location) => (location.id));
      this.selectedlocation = selectedlocation;
    }
    else {
      this.selectedlocation = [];
    }
  },

  locationupdateCheckall: function(){
    if(this.locations.length == this.selectedlocation.length){
        this.locationallSelected= true;
    }else{
        this.locationallSelected = false;
    }
  },
  categoryupdateCheckall: function(){
    if(this.categories.length == this.selectedcategory.length){
        this.categoryallSelected= true;
    }else{
        this.categoryallSelected = false;
    }
  },
  async categoryselectAll() {
    if(this.categoryallSelected) {
      const selectedcategory = this.categories.map((category) => (category.id));
      this.selectedcategory = selectedcategory;
    }
    else {
      this.selectedcategory = [];
    }
  },
   
  showModal(data) {
        this.isModalVisible = true;
        this.modalData = data;
        console.log("isopen")
  },
  showpost() {

    this.filteredPosts = this.posts.filter(post => this.selectedcategory.includes(post.category)).filter(post => post.status === "Want to lend").filter(post => this.selectedlocation.includes(post.location))

    
    this.originalshow = false;
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
  margin-left:12%;
  border-radius: 10px;
  background-color: rgba(233,233,233,0.8);
  margin: 5px 5px 5px 5px;
  border: solid 1px gray;
}
.postList{
  display:inline-block;
  /* overflow-y: scroll; */
}
#postView{
  overflow-y: scroll;
  width: 100%;
  height: 490px;
  margin-top: 20px;
}
#postView::-webkit-scrollbar {
  display: none;
}
#filter{
  border-radius: 10px;
}

.showrRow {
  align-self: center;
}


#locationcheckboxes input {
  margin: 10px 1px 10px 10px;
}

#locationcheckboxes label {
  margin: 10px 20px 10px 5px;
}

#locationname {
  background-color: rgba(239, 220, 198, 0.9);
  text-align: center;
  width: 180px;
  border: transparent;
  border-top-left-radius: 10px;
}
.whole {
  display: flex;
}

#locationcheckboxes {
  background-color: rgba(253, 231, 208, 0.7);
  padding: 10px;
  width: 2000px;
  border: transparent;
  text-align: left;
  border-top-right-radius: 10px;
}

#categorycheckboxes input {
  margin: 10px 1px 10px 10px;
}

#categorycheckboxes label {
  margin: 10px 20px 10px 5px;
}

#categoryname {
  background-color: rgba(188, 221, 236, 0.9);
  text-align: center;
  width: 180px;
  border: transparent;
  border-bottom-left-radius: 10px;
}

#categorycheckboxes {
  background-color: rgba(200, 238, 255, 0.7);
  padding: 10px;
  width: 2000px;
  border: transparent;
  text-align: left;
  border-bottom-right-radius: 10px;
}

</style>

