<template>
    <table id="MyPosts">
        <tr class="MyPostRow">
            <th class="MyPostTitle">Post ID</th>
            <th class="MyPostTitle">Title</th>
            <th class="MyPostTitle">Description</th>
            <th class="MyPostTitle">Purpose</th>
            <th class="MyPostTitle">Category</th>
            <th class="MyPostTitle">Location</th>
            <th class="MyPostTitle">Post Date</th>
            <th class="MyPostTitle">Status</th>
            <th class="MyPostTitle">Action</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import{getDoc, doc,  updateDoc, deleteDoc, arrayRemove} from "firebase/firestore"
import {getAuth, onAuthStateChanged} from "firebase/auth"
const db = getFirestore(firebaseApp)
export default {
    data(){
        return{
            userID:''
        }
    },
    mounted(){
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                this.userID=user.email
            }else{
                this.userID="10086"
            }
            display(this)
        })
        async function display(self){
            if (auth != null) {
                console.log(auth)
                let user = await getDoc(doc(db, "Users", self.userID))
                let ind = 1
                let records = user.data().posts
                console.log(user.data())
                console.log(records)
                
                records.forEach(async (record) => {
                    var table = document.getElementById("MyPosts")
                    var row = table.insertRow(ind)
                    row.className="MyPostRow"
                    let postInfo = await findPostInfo(record)
                    // console.log("postInfo", postInfo) 
                    var cell1 = row.insertCell(0)
                    cell1.className="MyPostCol"
                    var cell2 = row.insertCell(1)
                    var cell3 = row.insertCell(2)
                    var cell4 = row.insertCell(3)
                    var cell5 = row.insertCell(4)
                    var cell6 = row.insertCell(5)
                    var cell7 = row.insertCell(6)
                    var cell8 = row.insertCell(7)
                    var cell9 = row.insertCell(8)
                    cell1.innerHTML = postInfo[0]
                    cell2.innerHTML = postInfo[1]
                    cell3.innerHTML = postInfo[2]
                    cell4.innerHTML = postInfo[3]
                    cell5.innerHTML = postInfo[4]
                    cell6.innerHTML = postInfo[5]
                    cell7.innerHTML = postInfo[6]
                    cell8.innerHTML = postInfo[7]
                    
                    if(postInfo[7] == "Completed" || postInfo[7] == "Want to Lend" || postInfo[7] == "Want to Borrow"){
                        var deleteBtn = document.createElement("button")
                        deleteBtn.className = "deletePostBtn"
                        deleteBtn.id = String(postInfo[0])
                        deleteBtn.innerHTML="Delete"
                        deleteBtn.onclick=function(){
                            deletePost(record)
                        }
                        cell9.appendChild(deleteBtn)
                    }else{
                        var divBlk = document.createElement("div")
                        divBlk.innerHTML = "In Transaction"
                        divBlk.className = "emptyDiv"
                        divBlk.id = String(postInfo[0])
                        cell9.appendChild(divBlk)
                    }
                })
            } else {
                console.log("User need to login")
            }
        }
        async function findPostInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            let postID = thisPost.data().postID
            let title = thisPost.data().title
            let description = thisPost.data().description
            let purpose = thisPost.data().purpose
            let category = thisPost.data().category
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status
            let postInfo = [postID,title,description,purpose,category,location,postDate,status]
            console.log(postInfo)
            return postInfo
        }
        async function deletePost(record){
            if(confirm("Please confirm that you want to delete " + record)){
                // Delete from user table
                let user = doc(db, "Users", auth.currentUser.email)
                await updateDoc(user, {
                    posts:arrayRemove(record)
                })
                // Delete from Posts table
                await deleteDoc(doc(db, "Posts", record))
                // Re-render the page
                location.reload()
            }
        }
    }
}
</script>

<style>
    #MyPosts {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }
    #MyPosts,.MyPostTitle {
        border: 3px rgb(164, 219, 238) solid;
        border-collapse: collapse;
        height: 30px;
    }
    .MyPostCol {
        height:30px
    }
    .MyPostRow:nth-child(odd) {
        background-color: rgb(227, 247, 253);
    }
    .MyPostTitle {
        background-color: rgb(194, 240, 255);
    }
    .deletePostBtn {
        width: 80%;
        height: 80%;
        background-color: rgb(136, 223, 252);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }
    .deletePostBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightblue;
        transition: 0.5s;
    }
    .deletePostBtn:active {
        background-color: lightblue;
    }
</style>