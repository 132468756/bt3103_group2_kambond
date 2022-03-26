<template>
  <!-- This is the table you see when you look at other people's profile -->
  <table id="OtherPosts">
        <tr class="OtherPostRow">
            <th class="OtherPostTitle">Post ID</th>
            <th class="OtherPostTitle">Title</th>
            <th class="OtherPostTitle">Location</th>
            <th class="OtherPostTitle">Post Date</th>
            <th class="OtherPostTitle">Status</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../firebase.js"
import {getFirestore} from "firebase/firestore"
import{getDoc, doc} from "firebase/firestore"
const db = getFirestore(firebaseApp)
export default {
    props:{
        id:String
    },
    
    mounted(){
        async function display(u){
            console.log(u)
            let user = await getDoc(doc(db, "Users", u))
            let ind = 1
            let records = user.data().posts
            // console.log(user.data())
            console.log(records)
            
            records.forEach(async (record) => {
                var table = document.getElementById("OtherPosts")
                var row = table.insertRow(ind)
                row.className="OtherPostRow"
                let postInfo = await findPostInfo(record)
                // console.log("postInfo", postInfo) 
                var cell1 = row.insertCell(0)
                cell1.className="OtherPostCol"
                var cell2 = row.insertCell(1)
                var cell3 = row.insertCell(2)
                var cell4 = row.insertCell(3)
                var cell5 = row.insertCell(4)
                cell1.innerHTML = postInfo[0]
                cell2.innerHTML = postInfo[1]
                cell3.innerHTML = postInfo[2]
                cell4.innerHTML = postInfo[3]
                cell5.innerHTML = postInfo[4]
            })
        }
        let tb = document.getElementById("OtherPosts")
        while(tb.rows.length > 1){
            tb.deleteRow(1)
        }
        display(this.id)
        async function findPostInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            let postID = thisPost.data().postID
            let title = thisPost.data().title
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status
            let postInfo = [postID,title,location,postDate,status]
            console.log(postInfo)
            return postInfo
        }
    }
}
</script>

<style>
    #OtherPosts {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }
    #OtherPosts,.OtherPostTitle {
        border: 3px rgb(255, 165, 179) solid;
        border-collapse: collapse;
        height: 30px;
    }
    .OtherPostCol {
        height:30px
    }
    .OtherPostRow:nth-child(odd) {
        background-color: rgb(255, 242, 244);
    }
    .OtherPostTitle {
        background-color: lightpink;
    }
    .requestFromOtherBtn {
        width: 80%;
        height: 80%;
        background-color: rgb(255, 121, 141);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }
    .requestFromOtherBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px rgb(194, 95, 109);
        transition: 0.5s;
    }
    .requestFromOtherBtn:active {
        background-color: rgb(194, 95, 109);
    }
</style>