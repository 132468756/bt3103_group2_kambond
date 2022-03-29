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
        <SettingsTable id="settingTable" v-if="this.showSettingTable" />
        <MyPostTable id="MyPosts" v-if="this.showPosts" />
        <MyRequestTable id="MyRequests" v-if="this.showRequests" />
        <MyDealTable id="MyDeals" v-if="this.showDeals" />
        <UserInfoDisplay id="userInfo" v-if="this.showProfile" />
        <CreatePost id="createpostform" v-if="this.showCreate" />
        <LogOut v-if="this.showProfile"/>
    </div>
</div>
</template>

<script>
import  firebaseApp from "../../firebase.js"
import {getFirestore} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import{getDoc, doc} from "firebase/firestore"
import NavBar from "../NavBar.vue"
import SettingsTable from "../profile/SettingsTable.vue"
import MyPostTable from "../profile/MyPostsTable.vue"
import MyRequestTable from "../profile/MyRequestsTable.vue"
import MyDealTable from "../profile/MyDealsTable.vue"
import UserInfoDisplay from "../profile/UserInfoDisplay.vue"
import CreatePost from "../profile/CreatePostForm.vue"
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
        LogOut
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

            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
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

            document.getElementById("settingBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("postBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("requestBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("dealBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("userBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("openChatBtn").style.backgroundColor="rgb(70, 70, 70)"
            document.getElementById("createBtn").style.backgroundColor="rgb(233, 233, 233)"
        }


    }
}
</script>

<style>
#sideBar {
    height: 100%;
    width: 15vw;
    background-color: rgb(70, 70, 70);
    float: left;
    border-radius: 10px;
}

.sideBarText{
    color: rgb(106, 149, 243);
}

.sideBarBtn {
    width: 100%;
    height: 100px;
    background-color: transparent;
    border: transparent;
}

.sideBarBtn:hover {
    cursor: pointer;
}

#userBtn {
    background-color: rgb(233, 233, 233);
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
    height: 400px;
    margin-top: 5%;
    margin-right: 5%;
    text-align: center;
}

#settingTable {
    width: 100%;
    height: 100%;
}

#MyPosts {
    width: 80%;
}

#btn{
    margin-left: 3.5%;
    width: 10%;
    height: 10%;
    background-color:rgb(233, 233, 233);
    border: 1px gray solid;
    border-radius: 10px;
    cursor: pointer;
}

#btn:hover{
    background-color: gray;
    font-weight: bold;
    transition: 0.3s;
}

#btn:active{
    background-color: rgb(107, 107, 107);
}
</style>