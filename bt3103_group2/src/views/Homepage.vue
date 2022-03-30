<template>
  <div class="home" v-if="user">
  <NavBar />
  <div class="box">
    <div class="search">
    <SearchField/>
    </div>
  </div>
  </div>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue";
import NavBar from "../components/NavBar.vue";
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
  },

  data() {
    return {
      user: "",
    };
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
.box {
  /* The image used */
  background-image: url("~@/assets/search-bg.png");

  /* Control the height of the image */
  min-height: 500px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;

  height: 500px;
}

</style>