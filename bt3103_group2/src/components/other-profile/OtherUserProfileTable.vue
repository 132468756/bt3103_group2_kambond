<template>
    <!-- This is the table you see when you look at other people's profile -->
    <table id="OtherPosts">
        <tr class="OtherPostRow">
            <th class="OtherPostTitle">ID</th>
            <th class="OtherPostTitle">Title</th>
            <th class="OtherPostTitle">Location</th>
            <th class="OtherPostTitle">Post Date</th>
            <th class="OtherPostTitle">Status</th>
        </tr>
    </table>
    <Modal v-show="isModalVisible" @close="closeModal" :post = "modalData"/>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import { getFirestore} from "firebase/firestore"
import{getDoc, doc} from "firebase/firestore"
import Modal from "@/components/Modal.vue"

const db = getFirestore(firebaseApp)
export default {
    props:{
        id:String
    },

    components:{
        Modal,
    },

    data(){
        return{
            isModalVisible:false,
            modalData:{}
        }
    },
    mounted(){
        async function display(self, u){
            console.log(u)
            let user = await getDoc(doc(db, "Users", u))
            let ind = 1
            let records = user.data().posts
            // console.log(user.data())
            console.log(records)
            let reverseOrder = records.length
            
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

                cell1.innerHTML = reverseOrder
                // Create button for post modal
                var modalBtn = document.createElement("button")
                modalBtn.className = "modalBtn"
                modalBtn.id = postInfo.data().postID
                modalBtn.innerHTML = postInfo.data().title
                modalBtn.onclick = function(){
                    self.showModal(postInfo.data())
                    }
                cell2.appendChild(modalBtn)
                cell3.innerHTML = postInfo.data().location
                cell4.innerHTML = postInfo.data().postDate
                cell5.innerHTML = postInfo.data().status

                reverseOrder -= 1
            })
        }
        let tb = document.getElementById("OtherPosts")
        while(tb.rows.length > 1){
            tb.deleteRow(1)
        }
        display(this, this.id)
        async function findPostInfo(record){
            let thisPost = await getDoc(doc(db, "Posts", record))
            // let postID = thisPost.data().postID
            // let title = thisPost.data().title
            // let location = thisPost.data().location
            // let postDate = thisPost.data().postDate
            // let status = thisPost.data().status
            // let postInfo = [postID,title,location,postDate,status]
            // console.log(postInfo)
            return thisPost
        }
    },
    methods:{
        closeModal(){
            this.isModalVisible= false
        },

        showModal(data){
            this.isModalVisible = true;
            this.modalData = data;
            console.log("isopen")
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
    
    .modalBtn {
        width: 80%;
        height: 80%;
        background-color: transparent;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        font-size: 95%;
    }

    .modalBtn:hover {
        font-weight: bold;
        transition: 0.3s;
        color: lightpink;
    }
</style>