<template>
    <table id="MyRequests">
        <tr class="MyRequestRow">
            <th class="MyRequestTitle">Post ID</th>
            <th class="MyRequestTitle">Title</th>
            <th class="MyRequestTitle">Description</th>
            <th class="MyRequestTitle">Purpose</th>
            <th class="MyRequestTitle">Category</th>
            <th class="MyRequestTitle">Location</th>
            <th class="MyRequestTitle">Post Date</th>
            <th class="MyRequestTitle">Status</th>
            <th class="MyRequestTitle">Action</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import{getDoc, doc, deleteDoc, updateDoc, arrayRemove} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export default {
    mounted(){
        async function display(){
            let user = await getDoc(doc(db, "Users", "10086"))
            let ind = 1
            let records = user.data().requests
            // console.log(user.data())
            // console.log(records)
            
            records.forEach(async (record) => {
                var table = document.getElementById("MyRequests")
                var row = table.insertRow(ind)
                row.className="MyRequestRow"

                let requestInfo = await findRequestInfo(record)
                // console.log("requestInfo", requestInfo) 
                var cell1 = row.insertCell(0)
                cell1.className="MyRequestCol"
                var cell2 = row.insertCell(1)
                var cell3 = row.insertCell(2)
                var cell4 = row.insertCell(3)
                var cell5 = row.insertCell(4)
                var cell6 = row.insertCell(5)
                var cell7 = row.insertCell(6)
                var cell8 = row.insertCell(7)
                var cell9 = row.insertCell(8)

                cell1.innerHTML = requestInfo[0]
                cell2.innerHTML = requestInfo[1]
                cell3.innerHTML = requestInfo[2]
                cell4.innerHTML = requestInfo[3]
                cell5.innerHTML = requestInfo[4]
                cell6.innerHTML = requestInfo[5]
                cell7.innerHTML = requestInfo[6]
                cell8.innerHTML = requestInfo[7]
                
                var deleteBtn = document.createElement("button")
                deleteBtn.className = "completeRequestBtn"
                deleteBtn.id = String(requestInfo[0])
                deleteBtn.innerHTML="Complete"
                deleteBtn.onclick=function(){
                    deletePost(record)
                }
                cell9.appendChild(deleteBtn)
            })
        }
        display()

        async function findRequestInfo(record){
            let thisPost = await getDoc(doc(db, "Requests", record))
            let postID = thisPost.data().requestID
            let title = thisPost.data().title
            let description = thisPost.data().description
            let purpose = thisPost.data().purpose
            let category = thisPost.data().category
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status

            let requestInfo = [postID,title,description,purpose,category,location,postDate,status]
            console.log(requestInfo)
            return requestInfo
        }

        async function deletePost(record){
            if(confirm("Please confirm that " + record + " is completed." )){
                // Delete from request table
                await deleteDoc(doc(db, "Requests", record))
                console.log(record, " successfully deleted!")
                // Still need to delete from the user table
                const docRef = doc(db, "Users", "10086")
                await updateDoc(docRef, {
                    requests: arrayRemove(record)
                })

                let tb = document.getElementById("MyRequests")
                while(tb.rows.length > 1){
                    tb.deleteRow(1)
                }
                display()
            }
        }
    }
}
</script>

<style>
    #MyRequests {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyRequests,.MyRequestTitle{
        border: 3px rgba(124, 199, 124, 0.699) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyRequestCol {
        height: 30px;
    }

    .MyRequestRow:nth-child(odd) {
        background-color: rgb(223, 255, 223);
    }

    .MyRequestTitle {
        background-color: rgb(212, 240, 212);
    }

    .completeRequestBtn {
        width: 80%;
        height: 80%;
        background-color: rgba(117, 255, 117, 0.822);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .completeRequestBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightgreen;
        transition: 0.5s;
    }

    .completeRequestBtn:active {
        background-color: lightgreen;
    }
</style>