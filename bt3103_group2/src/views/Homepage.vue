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
import { getFirestore, setDoc, doc } from "firebase/firestore";

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
      user: false,
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    async function createUser() {
      try {
        let data = {
          username:"this is random name",
          email:auth.currentUser.email,
          password:0,
          bio:"this is description",
          contactNumber:auth.currentUser.phoneNumber,
          credibitliy:0,
          likes:0,
          posts: [],
          deals: [],
          requests: [],
        };

        const docNow = await setDoc(
          doc(db, "Users", String(auth.currentUser.email)),
          data
        );
        console.log(docNow);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
    createUser();
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