<template>
  <div id="Like">
      <button id="likeBtn" @click="like(this)">Like</button>
  </div>
</template>

<script>
// import {getAuth} from "firebase/auth"
import firebaseApp from "@/firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
// const auth = getAuth();

export default {
    name:"Like",
    methods:{
        async like(self) {
            let user_info = await getDoc(doc(db,"Users",String(self.user)))
            console.log(user_info.data());
            let number = user_info.data().likes+1;
            updateDoc(user_info,{
                likes: number
            });
            console.log("Likes++");
        }
    }
}
</script>

<style>
    #likeBtn {
        width: 60px;
        height: 30px;
        background-color: rgb(240, 184, 221);
        color: white;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        margin-left: 10%;
    }
</style>