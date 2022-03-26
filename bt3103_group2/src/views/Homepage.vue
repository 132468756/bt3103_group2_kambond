<template>
  <div class="home" v-if="user">
    <NavBar />
    <br /><br />
    <SearchField />
  </div>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue";
import NavBar from "../components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, setDoc, doc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebaseApp);


export default {
  name: "Homepage",
  components: {
    NavBar,
    SearchField,
  },

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
        this.user = user.email;
    }
    );
        // console.log(auth)
        // console.log(auth.currentUser)
        // console.log(this.user)
    async function createUser(self) {
      // try {
        let data = {
          username:"this is random name",
          email:self.user,
          bio:"this is description",
          contactNumber:0,
          creditPoint:0,
          telegramHandle:'',
          likes:0,
          posts: [],
          deals: [],
          requests: [],
        };

        let userExits = false
        let userInfo = await getDocs(collection(db, "Users"))
        userInfo.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        if(doc.id == self.user){
          userExits=true
        }
        });
        if(!userExits){// Create user only if this is a new user
          const docNow = await setDoc(
            doc(db, "Users", self.user),
            data
          );
          console.log(docNow);
        }
      // } catch (error) {
      //   console.error("Error adding document:", error);
      // }
    }
    createUser(this);
  },
};
</script>

<style>
.home {
  /* The image used */
  background-image: url("~@/assets/search-bg.jpg");

  /* Control the height of the image */
  min-height: 380px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>