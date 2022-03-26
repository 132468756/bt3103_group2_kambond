<template>
  <div class="search-area">
    <h1 id="search-title">KamBond Search</h1>
    <div class="search-bar">
      <input
        type="text"
        id="inputbox"
        v-model="searchText"
        required=""
        Placeholder="Search"
      />
      <button id="searchbutton" type="button" v-on:click="search()">
        Search
      </button>
    </div>
     
    <div className = "postList">
    <button type="button"
          id = "postModal"
          @click="showModal">
      <Post className = "posts"
      v-for= "post in postlist"
      :key = "post.id"
      :owner = "post.userName"
      :title = "post.title"
      :status = "post.status"/>
      
    </button>
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
        v-for= "post in postlist"
        :key = "post.id"
        :owner = "post.userName"
        :title = "post.title"
        :description = "post.description"
        :postID = "post.postID"
        :post = "post"
      />
    
  </div>

  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import Modal from "../Modal.vue";
import Post from "../Post.vue"
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  name: "SearchField",
  components: {Modal,Post},
  data() {
    return { postlist: [], searchText: "" };
  },
  methods: {
    // Search
    async search() {
      alert("Searching for...");
      console.log("searching");
      const qTitle = query(collection(db, "Posts"), where("title", "==", this.searchText));
      const queryTitle = await getDocs(qTitle);
      console.log(queryTitle);
      queryTitle.forEach((doc) => {
        this.postlist.push(doc.data());
        console.log(doc);
      });
      console.log(this.postlist);
      const qUser = query(collection(db, "Posts"), where("user", "==", this.searchText));
      const queryUser = await getDocs(qUser);
      console.log(queryUser);
      queryUser.forEach((doc) => {
        this.postlist.push(doc.data());
        console.log(doc);
      });
      console.log(this.postlist);
    },
  },
};
</script>

<style>
#search-title {
  color: aliceblue; /* black */
  text-align: center;
  text-shadow: 1px 1px black;
}

.search-bar {
  display: inline-block;
  text-align: center;
  align-items: center;
  width: 100%;
}
#inputbox {
  margin: 10px;
  width: 60%;
  height: 30px;
}

#searchbutton {
  margin: 15px 100px 10px 0px;
  border: 1.5px solid black;
  background-color: aliceblue;
  color: black;
  height: 37px;
  width: 80px;
  border-radius: 3px;
}

#searchbutton:hover {
  background-color: lightblue;
  box-shadow: 1px 1px black;
}
</style>