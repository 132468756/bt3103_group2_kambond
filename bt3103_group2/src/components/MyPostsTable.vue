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
// import  firebaseApp from "../firebase.js"
// import {getFirestore} from "firebase/fireStore"
// import{collection, getDocs, doc, deleteDoc} from "firebase/fireStore"

// const db = getFirestore(firebaseApp)

export default {
    // mounted(){
    //     async function display(){
    //         let records = await getDocs(collection(db, "username"))
    //         let ind = 1
            
    //         records.forEach((docs) => {
    //             let record = docs.data()
    //             var table = document.getElementById("MyPosts")
    //             var row = table.insertRow(ind)

    //             var postID = record.postID
    //             var title = record.title
    //             var description = record.description
    //             var purpose = record.purpose
    //             var category = record.category
    //             var location = record.location
    //             var postDate = record.postDate
    //             var status = record.status

    //             var cell1 = row.insertCell(0)
    //             var cell2 = row.insertCell(1)
    //             var cell3 = row.insertCell(2)
    //             var cell4 = row.insertCell(3)
    //             var cell5 = row.insertCell(4)
    //             var cell6 = row.insertCell(5)
    //             var cell7 = row.insertCell(6)
    //             var cell8 = row.insertCell(7)
    //             var cell9 = row.insertCell(8)

    //             cell1.innerHTML = postID
    //             cell2.innerHTML = title
    //             cell3.innerHTML = description
    //             cell4.innerHTML = purpose
    //             cell5.innerHTML = category
    //             cell6.innerHTML = location
    //             cell7.innerHTML = postDate
    //             cell8.innerHTML = status
    //             cell9.innerHTML = "Delete Button"

    //         })
    //     }
    //     display()

    //     async function deletePost(postID){
    //         alert("You are going to delete PostID " + postID)
    //         await deleteDoc(doc(db, "username", postID))
    //         console.log("Document successfully deleted!" + postID)
    //         let tb = document.getElementById("MyPosts")
    //         while(tb.rows.length > 1){
    //             tb.deleteRow(1)
    //         }
    //         display()
    //     }
    // }
}
</script>

<style>
    #MyPosts {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyPosts,.MyPostTitle,.MyPostCol {
        border: 3px rgb(164, 219, 238) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyPostRow:nth-child(odd) {
        background-color: rgb(227, 247, 253);
    }

    .MyPostTitle {
        background-color: rgb(194, 240, 255);
    }

    .DeletePost {
        width: 60%;
        height: 80%;
        background-color: rgb(136, 223, 252);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .DeletePost:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightblue;
        transition: 0.5s;
    }

    .DeletePost:active {
        background-color: lightblue;
    }
</style>