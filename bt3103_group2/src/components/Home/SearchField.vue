<template>
  <div class="search-area">
    <h1 id="search-title">KamBond</h1>
    <br><br>
    <div class="search-bar">
      <input
        type="text"
        id="inputbox"
        v-model.lazy="searchText"
        required=""
        Placeholder="Search in KamBond"
      />
      <button id="searchbutton" type="button" v-on:click="search()">
        Search
      </button>
    </div>
  </div>

  <div className="postList" v-if="searchText">
     <Modal v-show="isModalVisible" @close="closeModal" :post="modalData" />
    <div className="postList" v-for="post in postlist" :key="post.id">
      <button type="button" id="postModal" @click="showModal(post)">
        <Post
          className="posts"
          :owner="post.userName"
          :title="post.title"
          :status="post.status"
        />
      </button>
    </div>
   
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import Modal from "../Modal.vue";
import Post from "../Post.vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  name: "SearchField",
  components: { Modal, Post },
  data() {
    return {
      postlist: [],
      searchText: "",
      isModalVisible: false,
      modalData: {},
    };
  },
  methods: {
    // Search
    async search() {
      console.log("searching");
      this.postlist = [];
      var regEx = new RegExp(this.searchText + "*", "i");
      const querySnapshotTitle = await getDocs(collection(db, "Posts"));
      const querySnapshotUser = await getDocs(collection(db, "Users"));
      querySnapshotTitle.forEach((post) => {
        if (regEx.test(post.data().title)) {
          this.postlist.push(post.data());
        }
      });

      querySnapshotUser.forEach((post) => {
        if (regEx.test(post.data().username)) {
          this.postlist.push(post.data());
        }
        if (regEx.test(post.data().email)) {
          this.postlist.push(post.data());
        }
      });
      console.log(this.postlist);
    },
    showModal(data) {
      this.isModalVisible = true;
      this.modalData = data;
      console.log("isopen");
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
.search-area {
  position:sticky;
  margin-top: 6%;
}

#search-title {
  color: rgb(26, 70, 87); /* black */
  margin: auto;
  text-align: center;
  font-size: 80px;
}

.search-bar {
  display: inline-block;
  text-align: center;
  align-items: center;
  width: 100%;
}
#inputbox {
  margin: 10px;
  width: 35%;
  height: 45px;
  border-radius: 50px;
  border: transparent;
  background-color: rgba(255, 255, 255, 0.9);
}

#inputbox:focus {
  outline: none;
}

#searchbutton {
  margin: auto;
  border: 1px solid black;
  background-color: rgb(25, 64, 80);
  color: black;
  height: 45px;
  width: 80px;
  border-radius: 50px;
  border: transparent;
  color:white
}

#searchbutton:hover {
  font-weight: bold;
  outline: none;
}

#postModal {
  justify-content: center;
    
  /* The image used */
  background-image: url("~@/assets/modal-bg3.jpg");

  /* Control the height of the image */
  min-height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;

  border: 1px solid  rgba(0, 0, 0, 0.4);
  padding: 0%;
  margin: 1%;
}

.postList {
  display: inline-block;
  width: 45vw;
  /* border: 3px solid black; */
}
</style>