<template>
    <table id="MyRequests">
        <tr class="MyRequestRow">
            <th class="MyRequestTitle">ID</th>
            <th class="MyRequestTitle">Title</th>
            <th class="MyRequestTitle">Location</th>
            <th class="MyRequestTitle">Post Date</th>
            <th class="MyRequestTitle">Lender</th>
            <th class="MyRequestTitle">Status</th>
            <th class="MyRequestTitle">Action</th>
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
            let records = user.data().requests
            // console.log(user.data())
            // console.log(records)
            console.log(records.length)
            let reverseID = records.length
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

                cell1.innerHTML = reverseID
                cell2.innerHTML = requestInfo[1]
                cell3.innerHTML = requestInfo[2]
                cell4.innerHTML = requestInfo[3]
                cell5.innerHTML = requestInfo[4]
                cell6.innerHTML = requestInfo[5]
                
                // Create request button
                var requestBtn = document.createElement("button")
                requestBtn.className = "requestActionBtn"
                requestBtn.id = String(requestInfo[0])

                if(requestInfo[5] == "Requested"){
                    requestBtn.innerHTML="Delete"
                    requestBtn.onclick=function(){
                        deleteRequest(record)
                    }
                    cell7.appendChild(requestBtn)
                }else if(requestInfo[5] == "Sent Out"){
                    requestBtn.innerHTML="Receive"
                    requestBtn.onclick=function(){
                        receiveRequest(record)
                    }
                    cell7.appendChild(requestBtn)
                }else if(requestInfo[5] == "Received"){
                    requestBtn.innerHTML="Return"
                    requestBtn.onclick=function(){
                        returnRequest(record)
                    }
                    cell7.appendChild(requestBtn)
                }else if(requestInfo[5] == "Returned"){
                    var info_div = document.createElement("div")
                    info_div.className="requestInfoReturned"
                    info_div.id = String(requestInfo[0])
                    info_div.innerHTML = "Waiting to Complete"
                    cell7.appendChild(info_div)
                }else{
                    requestBtn.innerHTML="Delete"
                    requestBtn.onclick=function(){
                        deleteRequestAfterComplete(record)
                    }
                    cell7.appendChild(requestBtn)
                }
                reverseID -= 1
            })
        }

        async function findRequestInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            let postID = thisPost.data().postID
            let title = thisPost.data().title
            let location = thisPost.data().location
            let postDate = thisPost.data().postDate
            let status = thisPost.data().status
            let user = thisPost.data().user

            let requestInfo = [postID,title,location,postDate,user,status]
            console.log(requestInfo)
            return requestInfo
        }

    
        async function deleteRequest(record){
            var userID = auth.currentUser.email
            if(confirm("You are going to delete " + record)){
                // Delete the record from the user table
                const docRef = doc(db, "Users", userID)
                await updateDoc(docRef, {
                    requests: arrayRemove(record)
                })
                // Delete record from the poster's table and Deals table
                let post = doc(db, "Posts", record)
                let post_info = await getDoc(post)
                let posterID = post_info.data().user
                await deleteDeal(posterID, record)
                //Change the post status back to previous state
                if(post_info.data().purpose == "Borrowing"){
                    await updateDoc(post, {
                        status:"Want to Borrow"
                    })
                } else {
                    await updateDoc(post, {
                        status:"Want to Lend"
                    })
                }
                // Re-render the request table
                location.reload()
            }
        }

        async function deleteDeal(userID, postID){
            if(confirm("Please confirm that you are going to delete this request.")){
                // Remove the record in the user's own table
                const docRef = doc(db, "Users", userID)
                await updateDoc(docRef, {
                    deals: arrayRemove(postID)
                })
                // Remove the deal in the Deals table
                await deleteDoc(doc(db, "Deals", postID))
                console.log("Deal successfully deleted!")
            }
        }

        async function receiveRequest(record){
            if(confirm("Please confirm that you have returned this item.")){
                // Update the post status
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Received"
                })
                // Re-render the page
                location.reload()
            }
        }

        async function returnRequest(record){
            if(confirm("Please confirm that you have returned this item.")){
                // Update the post status
                const docRef = doc(db, "Posts", record)
                await updateDoc(docRef, {
                    status: "Returned"
                })
                // Re-render the page
                location.reload()
            }
        }

        async function deleteRequestAfterComplete(record){
            if(confirm("Please confirm that you want to delete this transaction history from your Request record.")){
                // Delete from user table
                let myID = auth.currentUser.email
                const myInfo = doc(db, "Users", myID)
                await updateDoc(myInfo, {
                    requests:arrayRemove(record)
                })
                // Re-render the page
                location.reload()
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

    .requestActionBtn {
        width: 80%;
        height: 80%;
        background-color: rgba(117, 255, 117, 0.822);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .requestActionBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightgreen;
        transition: 0.5s;
    }

    .requestActionBtn:active {
        background-color: lightgreen;
    }
</style>