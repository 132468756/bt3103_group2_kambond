<template>

  <div class="home" v-if="user">
    <NavBar />
    <div class="box">
      <div class="search">
        <br><br><br><br><br><br><br><br>
      <SearchField @search="search($event)"/>
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
      </div> <!-- class postList --> 
    </div> <!-- class postList -->
  </div> <!-- class home -->
</template>

<script>
import SearchField from "../components/Home/SearchField.vue";
import NavBar from "../components/NavBar.vue";
import Modal from "@/components/Modal.vue";
import Post from "@/components/Post.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "Homepage",
  components: {
    NavBar,
    SearchField,
    Modal,
    Post,
  },

  data() {
    return {
      user: "",
      postlist: [],
      isModalVisible: false,
      modalData: {},
      searchText:"",
    };
  },

  methods:{
    // Search
    async search(text) {
      console.log("searching"+ text);
      this.postlist = [];
      var regEx = new RegExp(text + "*", "i");
      const querySnapshotTitle = await getDocs(collection(db, "Posts"));
      const querySnapshotUser = await getDocs(collection(db, "Users"));
      try{
        querySnapshotTitle.forEach((post) => {
        if (regEx.test(post.data().title)) {
          this.postlist.push(post.data());
        }
      });

      querySnapshotUser.forEach((post) => {
        if (regEx.test(post.data().username)) {
          this.postlist.push(post.data());
        } else if (regEx.test(post.data().email)) {
          this.postlist.push(post.data());
        }
      });
      console.log(this.postlist[0].status);
      console.log(this.searchText)
      }
      catch(error){
        console.error("Error searching:", error);
      }
      this.searchText = text;
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

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.email;
        console.log(user.email);
        console.log(this.user);
        createUser(this)
      }
    });

    async function createUser(self) {
      try {
        let data = {
          username: "this is random name",
          email: self.user,
          bio: "this is description",
          contactNumber: 0,
          creditPoint: 0,
          telegramHandle: "",
          likes: 0,
          posts: [],
          deals: [],
          requests: [],
          chatrooms:[],
          photoURL:"some photos"
        };

        let userExits = false;
        let userInfo = await getDocs(collection(db, "Users"));
        userInfo.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          if (doc.id == self.user) {
            userExits = true;
          }
        });
        if (!userExits) {
          // Create user only if this is a new user
          const docNow = await setDoc(doc(db, "Users", self.user), data);
          console.log(docNow);
          self.$router.push({ path:"/settings"})
        }
        // } catch (error) {
        //   console.error("Error adding document:", error);
        // }
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  },
};
</script>

<style scoped>
.home {
  background-image: url("~@/assets/search-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
  height: 880px;
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