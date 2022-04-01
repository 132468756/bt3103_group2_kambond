<template>
  <div id="Like">
      <button id="likeBtn" @click="like(this)">Like</button>
  </div>
</template>

<script>
// import {getAuth} from "firebase/auth"
import firebaseApp from "@/firebase.js";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
// const auth = getAuth();

export default {
    name:"Like",
    props:{
        user:String
    },
    methods:{
        async like(self) {
            await updateDoc(doc(db,"Users", self.user), {
                likes: this.likes++
            });
            // console.log("Number"+user_info.data().likes);
            // let number = await user_info.data().likes+1;
            console.log("Likes++");
        }
    }
}
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