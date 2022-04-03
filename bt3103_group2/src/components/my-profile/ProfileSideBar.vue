<template>
<NavBar/>
<div id="overall">
    <div id="sideBar">
        <br>
        <button class="sideBarBtn" @click="openProfile()" id="userBtn">
            <h2 class="sideBarText">User</h2>
        </button>
        <button class="sideBarBtn" @click="openPosts()" id="postBtn">
            <h2 class="sideBarText">Posts</h2>
        </button>
        <button class="sideBarBtn" @click="openRequests()" id="requestBtn">
            <h2 class="sideBarText">Requests</h2>
        </button>
        <button class="sideBarBtn" @click="openDeals()" id="dealBtn">
            <h2 class="sideBarText">Deals</h2>
        </button>
        <button class="sideBarBtn" @click="openSettings()" id="settingBtn">
            <h2 class="sideBarText">Settings</h2>
        </button>
        <button class="sideBarBtn" @click="openChats()" id="openChatBtn">
            <h2 class="sideBarText">Chats</h2>
        </button>
        <button class="sideBarBtn" @click="openCreate()" id="createBtn">
            <h2 class="sideBarText">Create</h2>
        </button>
        <h5></h5>
    </div>

    <div id="displayInfo">
        <br><br>
        <div id="infoInnerBox">
            <SettingsTable id="settingTable" v-if="this.showSettingTable" />
            <MyPostTable id="MyPosts" v-if="this.showPosts" @showPost="openPosts"/>
            <MyRequestTable id="MyRequests" v-if="this.showRequests" />
            <MyDealTable id="MyDeals" v-if="this.showDeals" />
            <UserInfoDisplay id="userInfo" v-if="this.showProfile" />
            <CreatePost id="createpostform" v-if="this.showCreate" @showPost="openPosts"/>
            <Chats id="chats" v-if="this.showChats" />
            <LogOut v-if="this.showProfile"/>
        </div>
    </div>
</div>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import{getDoc, doc} from "firebase/firestore"
import NavBar from "../NavBar.vue"
import SettingsTable from "../my-profile/SettingsTable.vue"
import MyPostTable from "../my-profile/MyPostsTable.vue"
import MyRequestTable from "../my-profile/MyRequestsTable.vue"
import MyDealTable from "../my-profile/MyDealsTable.vue"
import UserInfoDisplay from "../my-profile/UserInfoDisplay.vue"
import CreatePost from "../my-profile/CreatePostForm.vue"
import Chats from '../../views/Chats.vue'
// import Chats from "../Chat/chat_alternative.vue";
import LogOut from "../Logout.vue"

const db = getFirestore(firebaseApp)

export default {
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:rgb(233, 233, 233)')},
    components:{
        NavBar,
        SettingsTable,
        MyPostTable,
        MyRequestTable,
        MyDealTable,
        UserInfoDisplay,
        CreatePost,
        LogOut,
        Chats
    },
    data(){
        return{
            user:false,
            username:'',
            showProfile:true,
            showSettingTable:false,
            showPosts:false,
            showRequests:false,
            showDeals:false,
            showChats:false,
            showCreate:false
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
            getUserInfo(this)
        })

        async function getUserInfo(self){
            console.log(self.user)
            let userInfo = await getDoc(doc(db, "Users", self.user.email))
            self.username = userInfo.data().username
        }
    },

    methods:{
        openSettings(){
            this.showProfile=false
            this.showPosts=false
            this.showCreate=false
            this.showRequests=false
            this.showDeals=false
            this.showChats=false
            this.showSettingTable=true

            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("settingBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openPosts(){
            this.showRequests=false
            this.showProfile=false
            this.showDeals=false
            this.showCreate=false
            this.showChats=false
            this.showSettingTable=false
            this.showPosts=true

            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openRequests(){
            this.showDeals=false
            this.showProfile=false
            this.showChats=false
            this.showSettingTable=false
            this.showCreate=false
            this.showPosts=false
            this.showRequests=true

            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openDeals(){
            this.showChats=false
            this.showProfile=false
            this.showSettingTable=false
            this.showCreate=false
            this.showPosts=false
            this.showRequests=false
            this.showDeals=true

            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openProfile(){
            this.showChats=false
            this.showSettingTable=false
            this.showPosts=false
            this.showRequests=false
            this.showCreate=false
            this.showDeals=false
            this.showProfile=true

            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("userBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openChats(){
            this.showSettingTable=false
            this.showPosts=false
            this.showRequests=false
            this.showCreate=false
            this.showDeals=false
            this.showProfile=false
            this.showChats=true

            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="transparent"
            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(233, 233, 233)"
        },

        openCreate(){
            this.showSettingTable=false
            this.showPosts=false
            this.showRequests=false
            this.showDeals=false
            this.showProfile=false
            this.showChats=false
            this.showCreate=true

            document.getElementById("settingBtn").style.backgroundColor="transparent"
            document.getElementById("postBtn").style.backgroundColor="transparent"
            document.getElementById("requestBtn").style.backgroundColor="transparent"
            document.getElementById("dealBtn").style.backgroundColor="transparent"
            document.getElementById("userBtn").style.backgroundColor="transparent"
            document.getElementById("openChatBtn").style.backgroundColor="transparent"
            document.getElementById("createBtn").style.backgroundColor="rgb(233, 233, 233)"
        }


    }
}
</script>

<style>
#sideBar {
    height: 100%;
    width: 15vw;
    background-color: rgba(255, 255, 255, 0.8);
    float: left;
    border-radius: 10px;
    margin-top: 30px;
}

.sideBarText{
    color: rgb(87, 180, 194);
}

.sideBarBtn {
    width: 100%;
    height: 100px;
    background-color: transparent;
    border: transparent;
}

.sideBarBtn:hover {
    transition: 0.5s;
    cursor: pointer;
}

#userBtn {
    background-color: rgb(255, 255, 255);
}

#sideProfilePic {
    width: 3vw;
    height: 3vw;
}

#userInfo {
    margin-left: 3%;
}

#usernameSpan {
    margin-left: 14%;
    text-align: center;

}

#displayInfo {
    float: right;
    width: 75%;
    height: 742px;
    margin-top: 30px;
    margin-right: 5%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;

    background-image: url("~@/assets/hand-paint.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size:cover;
}

#infoInnerBox {
    height: 650px;
    overflow-y:scroll;
}

#infoInnerBox::-webkit-scrollbar {
  display: none;
}

#settingTable {
    width: 70%;
    height: 350px;
    margin-left: 15%;
}

#MyPosts {
    width: 80%;
}

#btn{
    margin-left: 3%;
    width: 10%;
    height: 4%;
    background-color:rgb(230, 230, 230);
    border: transparent;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 5px rgb(66, 64, 62);
}

#btn:hover{
    background-color: rgba(199, 199, 199);
    transition: 0.3s;
}

#btn:active{
    background-color: rgb(107, 107, 107);
}

#chats {
    width: 90%;
    margin-left: 2.5%;
}

</style>