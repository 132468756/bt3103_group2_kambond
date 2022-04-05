<template>
  <button id="likeBtn" @click.once="like(this)">Like</button>
</template>

<script>
import { getAuth } from "firebase/auth";
import firebaseApp from "@/firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "Like",
  props: {
    user: String,
  },
  emits: ["updateAfterLike"],
  methods: {
    async like(self) {
      if (self.user != auth.currentUser.email) {
        let user = await getDoc(doc(db, "Users", self.user));
        let nolikes = user.data().likes;
        console.log(user);
        console.log("B4 Self likes = " + nolikes);
        updateDoc(doc(db, "Users", self.user), {
          likes: nolikes + 1,
        });
        // console.log("Number"+user_info.data().likes);
        // let number = await user_info.data().likes+1;
        console.log("After Self likes = ");
        let newuser = await getDoc(doc(db, "Users", self.user));
        console.log(newuser.data().likes);
        this.$emit("updateAfterLike", newuser.data().likes);
      } else {
        alert("Cannot like yourself ah!");
      }
    },
  },
};
</script>

<style>
/* #likeBtn {
        width: 60px;
        height: 30px;
        background-color: rgb(240, 184, 221);
        color: white;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        margin-left: 10%;
    } */
</style>