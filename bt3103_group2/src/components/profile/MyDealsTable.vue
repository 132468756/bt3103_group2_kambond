<template>
    <table id="MyDeals">
        <tr class="MyDealRow">
            <th class="MyDealTitle">Post ID</th>
            <th class="MyDealTitle">Title</th>
            <th class="MyDealTitle">Location</th>
            <th class="MyDealTitle">Post Date</th>
            <th class="MyDealTitle">Borrower</th>
            <th class="MyDealTitle">Status</th>
            <th class="MyDealTitle">Action</th>
            <th class="MyDealTitle">Cancel</th>
        </tr>
    </table>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import{getDoc, doc, deleteDoc, updateDoc, arrayRemove} from "firebase/firestore"
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

                cell1.innerHTML = dealInfo[0]
                cell2.innerHTML = dealInfo[1]
                cell3.innerHTML = dealInfo[2]
                cell4.innerHTML = dealInfo[3]
                cell5.innerHTML = dealInfo[4]
                cell6.innerHTML = dealInfo[5]

                var dealBtn = document.createElement("button")
                dealBtn.className = "dealActionBtn"
                dealBtn.id = String(dealInfo[0])
                if(dealInfo[5]=="Requested"){
                    dealBtn.innerHTML="Confirm"
                    dealBtn.onclick=function(){
                        confirmDeal(record)
                    }
                    cell7.appendChild(dealBtn)
                }else if(dealInfo[5]=="Sent Out"){
                    var info_div = document.createElement("div")
                    info_div.className="dealInfoLent"
                    info_div.id = String(dealInfo[0])
                    info_div.innerHTML = "Lent"
                    cell7.appendChild(info_div)
                }else{
                    dealBtn.innerHTML="Complete"
                    dealBtn.onclick=function(){
                        completeDeal(record)
                    }
                    cell7.appendChild(dealBtn)
                }
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

            let dealInfo = [postID,title,location,postDate,owner,status]
            console.log(dealInfo)
            return dealInfo
        }

        async function confirmDeal(record){
            if(confirm("Please confirm that you want to lend the item in this post to the poster." )){
                // Update status in both Deals and Posts tables
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Sent Out"
                })
                // Re-render the page
                location.reload()
            }
        }

        async function completeDeal(record){
            if(confirm("Please confirm the borrower has returned your item.")){
                // Update the post status to completed
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Completed"
                })

                // Delete record from own table
                let myID = auth.currentUser.email
                const myInfo = doc(db, "Users", myID)
                await updateDoc(myInfo, {
                    deals: arrayRemove(record)
                })
                // Delete record from owner's requests
                let deal = await getDoc(doc(db, "Deals", record))
                let owner = deal.data().owner
                const ownerInfo = doc(db, "Users", owner)
                await updateDoc(ownerInfo, {
                    requests: arrayRemove(record)
                })
                // Delete from Deals table
                await deleteDoc(doc(db, "Deals", record))
                console.log("Deal successfully deleted!")
                // Re-render the page
                location.reload()
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

    .MyDealTitle {
        background-color: rgba(241, 205, 225, 0.767);
    }

    .dealActionBtn {
        width: 80%;
        height: 80%;
        background-color: rgba(255, 55, 255, 0.623);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .dealActionBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px rgb(185, 32, 185);
        transition: 0.5s;
    }

    .dealActionBtn:active {
        background-color: rgb(141, 26, 141);
    }
</style>