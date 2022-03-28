<template>
  <div class="search-area">
    <h1 id="search-title">KamBond Search</h1>
    <div class="search-bar">
      <input
        type="text"
        id="inputbox"
        v-model.lazy="searchText"
        required=""
        Placeholder="Search"
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
      alert("Searching for...");
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
  position:1500px;
}

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

#postModal {
  justify-content: center;
}

.postList {
  display: inline-block;
}
</style>