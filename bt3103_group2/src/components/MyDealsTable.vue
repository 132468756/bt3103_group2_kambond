<template>
    <table id="MyDeals">
        <tr class="MyDealRow">
            <th class="MyDealTitle">Post ID</th>
            <th class="MyDealTitle">Title</th>
            <th class="MyDealTitle">Description</th>
            <th class="MyDealTitle">Purpose</th>
            <th class="MyDealTitle">Category</th>
            <th class="MyDealTitle">Location</th>
            <th class="MyDealTitle">Post Date</th>
            <th class="MyDealTitle">Status</th>
            <th class="MyDealTitle">Action</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../firebase.js"
import {getFirestore} from "firebase/firestore"
import{getDoc, doc, deleteDoc} from "firebase/firestore"

const db = getFirestore(firebaseApp)

export default {
    mounted(){
        async function display(){
            let user = await getDoc(doc(db, "Users", "10086"))
            let ind = 1
            let records = user.data().deals
            // console.log(user.data())
            // console.log(records)
            
            records.forEach(async (record) => {
                var table = document.getElementById("MyDeals")
                var row = table.insertRow(ind)
                row.className="MyDealRow"

                let dealInfo = await findDealInfo(record)
                // console.log("dealInfo", dealInfo) 
                var cell1 = row.insertCell(0)
                cell1.className="MyDealCol"
                var cell2 = row.insertCell(1)
                var cell3 = row.insertCell(2)
                var cell4 = row.insertCell(3)
                var cell5 = row.insertCell(4)
                var cell6 = row.insertCell(5)
                var cell7 = row.insertCell(6)
                var cell8 = row.insertCell(7)
                var cell9 = row.insertCell(8)

                cell1.innerHTML = dealInfo[0]
                cell2.innerHTML = dealInfo[1]
                cell3.innerHTML = dealInfo[2]
                cell4.innerHTML = dealInfo[3]
                cell5.innerHTML = dealInfo[4]
                cell6.innerHTML = dealInfo[5]
                cell7.innerHTML = dealInfo[6]
                cell8.innerHTML = dealInfo[7]
                
                var deleteBtn = document.createElement("button")
                deleteBtn.className = "completeDealBtn"
                deleteBtn.id = String(dealInfo[0])
                deleteBtn.innerHTML="Complete"
                deleteBtn.onclick=function(){
                    deletePost(record)
                }
                cell9.appendChild(deleteBtn)
            })
        }
        display()

        async function findDealInfo(record){
            let thisPost = await getDoc(doc(db, "Deals", record))
            let postID = thisPost.data().dealID
            let title = thisPost.data().title
            let description = thisPost.data().description
            let purpose = thisPost.data().purpose
            let category = thisPost.data().category
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status

            let dealInfo = [postID,title,description,purpose,category,location,postDate,status]
            console.log(dealInfo)
            return dealInfo
        }

        async function deletePost(record){
            alert("Please confirm that " + record + " is completed." )
            // console.log(doc(db, "Users", "PeterParker", "posts"))
            await deleteDoc(doc(db, "Deals", record))
            console.log(record, " successfully deleted!")
            let tb = document.getElementById("MyDeals")
            while(tb.rows.length > 1){
                tb.deleteRow(1)
            }
            display()
        }
    }
}
</script>

<style>
    #MyDeals {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyDeals,.MyDealTitle {
        border: 3px rgba(223, 169, 198, 0.767) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyDealCol {
        height: 30px;
    }

    .MyDealRow:nth-child(odd) {
        background-color: rgb(255, 219, 255);
    }

    .MyDealTitle {
        background-color: rgba(241, 205, 225, 0.767);
    }

    .completeDealBtn {
        width: 80%;
        height: 80%;
        background-color: rgb(216, 8, 216);
        cursor: pointer;
        border-radius: 12px;
        border: none;
        margin-right: 10%;
    }

    .completeDealBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px rgb(141, 26, 141);
        transition: 0.5s;
    }

    .completeDealBtn:active {
        background-color: rgb(141, 26, 141);
    }
</style>