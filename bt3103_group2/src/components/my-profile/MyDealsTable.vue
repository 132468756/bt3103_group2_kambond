<template>
    <table id="MyDeals">
        <tr class="MyDealRow">
            <th class="MyDealTitle">ID</th>
            <th class="MyDealTitle">Title</th>
            <th class="MyDealTitle">Location</th>
            <th class="MyDealTitle">Post Date</th>
            <th class="MyDealTitle">Borrower</th>
            <th class="MyDealTitle">Status</th>
            <th class="MyDealTitle">Action</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore, increment} from "firebase/firestore"
import{getDoc, doc, updateDoc, arrayRemove} from "firebase/firestore"
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
            let user = await getDoc(doc(db, "Users", self.userID))
            let ind = 1
            let records = user.data().deals
            // console.log(user.data())
            // console.log(records)
            let reverseID=records.length
            
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

                cell1.innerHTML = reverseID
                cell2.innerHTML = dealInfo[1]
                cell3.innerHTML = dealInfo[2]
                cell4.innerHTML = dealInfo[3]
                // Create button for other user profile
                var otherUserBtn = document.createElement("button")
                otherUserBtn.className = "otherBorrowerBtn"
                otherUserBtn.id = String(dealInfo[0])
                otherUserBtn.innerHTML = dealInfo[4]
                otherUserBtn.onclick = function(){
                    self.$router.push({ name:"Profile", params:{id: dealInfo[6]}})
                }
                cell5.appendChild(otherUserBtn)
                cell6.innerHTML = dealInfo[5]

                // Create deal button
                var dealBtn = document.createElement("button")
                dealBtn.className = "dealActionBtn"
                dealBtn.id = String(dealInfo[0])

                //Create Info block
                var info_div = document.createElement("div")
                info_div.className="dealInfoLent"
                info_div.id = String(dealInfo[0])

                if(dealInfo[5]=="Requested"){
                    dealBtn.innerHTML="Send"
                    dealBtn.onclick=function(){
                        confirmDeal(record, self)
                    }
                    cell7.appendChild(dealBtn)
                }else if(dealInfo[5]=="Sent Out"){
                    info_div.innerHTML = "Lent"
                    cell7.appendChild(info_div)
                }else if(dealInfo[5]=="Received"){
                    info_div.innerHTML = "Waiting for Return"
                    cell7.appendChild(info_div)
                }else if(dealInfo[5]=="Returned"){
                    dealBtn.innerHTML="Complete"
                    dealBtn.onclick=function(){
                        completeDeal(record, self)
                    }
                    cell7.appendChild(dealBtn)
                }else{
                    dealBtn.innerHTML="Delete"
                    dealBtn.onclick=function(){
                        deleteDeal(record, self)
                    }
                    cell7.appendChild(dealBtn)
                }
                reverseID -= 1
            })
        }
        display(this)

        async function findDealInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            let postID = thisPost.data().postID
            let title = thisPost.data().title
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status

            let deal_info = await getDoc(doc(db, "Deals", record))
            let owner = deal_info.data().owner
            let owner_info  = await getDoc(doc(db, "Users", owner))
            let borrowerName = owner_info.data().username

            let dealInfo = [postID,title,location,postDate,borrowerName,status,owner]
            console.log(dealInfo)
            return dealInfo
        }

        async function confirmDeal(record, self){
            if(confirm("Please confirm that you want to lend the item in this post." )){
                // Update status in both Deals and Posts tables
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Sent Out"
                })
                // Remove all rows from table
                var table = document.getElementById("MyDeals")
                while (table.rows.length > 1) {
                    table.deleteRow(1)
                }
                // Re-render the page
                display(self)
            }
        }

        async function completeDeal(record, self){
            if(confirm("Please confirm the borrower has returned your item.")){
                // Update the post status to completed
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Completed"
                })

                // Get my info and borrower info
                let myID = auth.currentUser.email
                const myInfo = doc(db, "Users", myID)
                let deal = await getDoc(doc(db, "Deals", record))
                let owner = deal.data().owner
                const ownerInfo = doc(db, "Users", owner)
                // Increase the credit point of both parties
                await updateDoc(myInfo, {
                    creditPoint: increment(10)
                })
                await updateDoc(ownerInfo, {
                    creditPoint: increment(10)
                })
                // Remove all rows from table
                var table = document.getElementById("MyDeals")
                while (table.rows.length > 1) {
                    table.deleteRow(1)
                }
                // Re-render the page
                display(self)
            }
        }

        async function deleteDeal(record, self){
            if(confirm("Please confirm that you want to delete this transaction history from your Deal record.")){
                // Delete from user table
                let myID = auth.currentUser.email
                const myInfo = doc(db, "Users", myID)
                await updateDoc(myInfo, {
                    deals:arrayRemove(record)
                })
                // Remove all rows from table
                var table = document.getElementById("MyDeals")
                while (table.rows.length > 1) {
                    table.deleteRow(1)
                }
                // Re-render the page
                display(self)
            }
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
    .MyDealRow:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.9);
    }

    .MyDealTitle {
        background-color: rgba(241, 205, 225, 0.767);
    }

    .dealActionBtn, .dealCancelBtn {
        width: 80%;
        height: 80%;
        background-color: rgba(255, 55, 255, 0.623);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .dealActionBtn:hover, .dealActionBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px rgb(185, 32, 185);
        transition: 0.5s;
    }

    .dealActionBtn:active, .dealActionBtn:active {
        background-color: rgb(141, 26, 141);
    }

    .otherBorrowerBtn {
        width: 80%;
        height: 80%;
        background-color: transparent;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        font-size: 95%;
    }

    .otherBorrowerBtn:hover {
        font-weight: bold;
        transition: 0.3s;
        color: rgb(141, 26, 141);
    }
</style>