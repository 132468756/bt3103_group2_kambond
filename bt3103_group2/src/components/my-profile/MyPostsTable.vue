<template>
    <table id="MyPosts">
        <tr class="MyPostRow">
            <th class="MyPostTitle">ID</th>
            <th class="MyPostTitle">Title</th>
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
import{getDoc, doc,  updateDoc, arrayRemove, deleteDoc} from "firebase/firestore"
import {getAuth, onAuthStateChanged} from "firebase/auth"
const db = getFirestore(firebaseApp)
export default {
    data(){
        return{
            userID:''
        }
    },
    emits:["showPost"],
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
                let reverseID = records.length
                
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

                    cell1.innerHTML = reverseID
                    cell2.innerHTML = postInfo[1]
                    cell3.innerHTML = postInfo[2]
                    cell4.innerHTML = postInfo[3]
                    cell5.innerHTML = postInfo[4]
                    cell6.innerHTML = postInfo[5]
                    cell7.innerHTML = postInfo[6]

                    
                    if(postInfo[6] == "Completed" || postInfo[6] == "Want to lend" || postInfo[6] == "Want to borrow"){
                        var deleteBtn = document.createElement("button")
                        deleteBtn.className = "deletePostBtn"
                        deleteBtn.id = String(postInfo[0])
                        deleteBtn.innerHTML="Delete"
                        deleteBtn.onclick=function(){
                            deletePost(record, self)
                        }
                        cell8.appendChild(deleteBtn)
                    }else{
                        var divBlk = document.createElement("div")
                        divBlk.innerHTML = "In Transaction"
                        divBlk.className = "emptyDiv"
                        divBlk.id = String(postInfo[0])
                        cell8.appendChild(divBlk)
                    }
                    reverseID -= 1
                })
            } else {
                console.log("User need to login")
            }
        }

        async function findPostInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            let postID = thisPost.data().postID
            let title = thisPost.data().title
            let purpose = thisPost.data().purpose
            let category = thisPost.data().category
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status
            let postInfo = [postID,title,purpose,category,location,postDate,status]
            console.log(postInfo)
            return postInfo
        }

        async function deletePost(record, self){
            if(confirm("Please confirm that you want to delete this post." )){
                // Delete from user table
                let user = doc(db, "Users", auth.currentUser.email)
                await updateDoc(user, {
                    posts:arrayRemove(record)
                })
                // Remove all rows from table
                var table = document.getElementById("MyPosts")
                while (table.rows.length > 1) {
                    table.deleteRow(1)
                }
                // Delete post from Posts
                await deleteDoc(doc(db, "Posts", record))
                // Re-render the page
                display(self)
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
    .MyPostRow:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.9);
    }
    .MyPostTitle {
        background-color: rgb(194, 240, 255);
    }
    .deletePostBtn {
        width: 50px;
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