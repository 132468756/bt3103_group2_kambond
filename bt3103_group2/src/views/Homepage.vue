<template>

 <div class="home" v-if="user">
    <NavBar />
    <div class="box">
      <div class="search">
      <SearchField @search="search($event)"/>
      </div>
    </div>
    <div v-if="searchText" id="postView">
      <Modal v-show="isModalVisible" @close="closeModal" :post="modalData" ref="modal"/>
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
  <Contact />
</template>

<script>
import Contact from "@/components/Home/Contact.vue"
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
  getDoc,
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
    Contact
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
      // var regEx = new RegExp(text + "*", "i");
      var regEx = new RegExp(text, 'i')
      const querySnapshotTitle = await getDocs(collection(db, "Posts"));
      //const querySnapshotUser = await getDocs(collection(db, "Users"));
      try{
        querySnapshotTitle.forEach((post) => {
        if (regEx.test(post.data().title)) {
          this.postlist.push(post.data());
        }
      });
      
      this.postlist.forEach(async (post)=>{
        let docRef = await getDoc(doc(db, "Users", post.user));
        post.userName = docRef.data().username
      });

      
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
      this.$refs.modal.getURL()
      this.$refs.modal.open()
      this.$refs.modal.getURL2()
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
          self.$router.push({name: 'sideBar', query: {q:"showSettings"}});
          alert("Please update your personal information in Settings before proceeding.")
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
  height: 880px;
}


#postModal {
  justify-content:center;
  border-radius: 10px;
  background-color: rgba(233,233,233,0.8);
  margin: 5px 5px 5px 5px;
  border: transparent;
  box-shadow: 1px 1px 1px 1px rgba(53, 55, 57, 0.525);
  width: 97.5%;
}

.postList {
  display: inline-block;
  width:45vw;
  justify-content:center;
  /* border: 3px solid black; */
}

#postView{
  overflow-y: scroll;
  width: 100%;
  height: 440px;
  margin-top: 20px;
  text-align: center;
}

#postView::-webkit-scrollbar {
  display: none;
}

</style>