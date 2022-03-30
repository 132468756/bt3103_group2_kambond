<template>
    <!-- This is a sample of the user info table to be shown in the setting page -->
    <table id="SettingTable" border=1 frame=void rules=rows>
        <tr class="settingRow">
            <td class="leftCol">User Name</td>
            <td id="usernameContent" class="midCol">{{username}}</td>
            <td class="rightCol" id="changeUsernameBtn" v-if="this.usernameStatus == 'static'"><changeBtn @click="changeUsername()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeUsername" @click="confirmChangeUsername()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Email</td>
            <td id="emailContent" class="midCol">{{email}}</td>
            <td class="rightCol"></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Telegram</td>
            <td id="telegramContent" class="midCol">{{telegram}}</td>
            <td class="rightCol" v-if="this.telegramStatus == 'static'"><changeBtn @click="changeTelegram()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeTelegram" @click="confirmChangeTelegram()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Bio</td>
            <td id="bioContent" class="midCol">{{bio}}</td>
            <td class="rightCol" v-if="this.bioStatus == 'static'"><changeBtn @click="changeBio()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeBio" @click="confirmChangeBio()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Contact Number</td>
            <td id="contactContent" class="midCol">{{contactNumber}}</td>
            <td class="rightCol" v-if="this.contactStatus == 'static'"><changeBtn @click="changeContact()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeContact" @click="confirmChangeContact()">Confirm Change</button></td>
        </tr>
    </table>
</template>

<script>
import changeBtn from "./ChangeSettingButton.vue"
import firebaseApp from '../../firebase.js'
import {getFirestore} from "firebase/firestore"
import{getDoc, doc, updateDoc} from "firebase/firestore"
import {getAuth, onAuthStateChanged} from "firebase/auth"
const db = getFirestore(firebaseApp)
// const auth = getAuth()
export default {
    names:"SettingsTable",
    components:{
        changeBtn
    },
    // No database connection testing code
    data(){
        return{
            username:'',
            usernameStatus:"static",
            email:'',
            telegram:'',
            telegramStatus:"static",
            bio:'',
            bioStatus:"static",
            contactNumber:'',
            contactStatus:"static",
            userID:''
        }
    },
    mounted(){
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                displayUserInfo(this, user.email)
            }else{
                displayUserInfo(this,"10086")
            }
        })
        async function displayUserInfo(self, userID){
            // console.log(auth.currentUser.email)
            let user_info = await getDoc(doc(db, "Users", userID))
            // console.log(typeof(user))
            // console.log(user.data())
            self.userID = userID
            self.username = user_info.data().username
            self.email = user_info.data().email
            self.telegram = user_info.data().telegramHandle
            self.bio = user_info.data().bio
            self.contactNumber = user_info.data().contactNumber
        }
    },
    methods:{
        changeUsername: function(){
            document.getElementById("usernameContent").innerHTML="<input type='text' id='newUsername' ref='newUsername'>"
            this.usernameStatus="changing"
        },
        confirmChangeUsername: async function(){
            var newUsername = document.getElementById("newUsername").value
            if (newUsername != '') {
                this.username = newUsername
                document.getElementById("usernameContent").innerHTML="'{{username}}'"
                this.usernameStatus="static"
                try{
                    const docRef = await updateDoc(doc(db, "Users", this.userID), {
                        username: newUsername
                    })
                    console.log(docRef)
                    location.reload()
                }
                catch(error){
                    console.log("Failed updating username")
                }
            } else {
                alert("Username Cannot Be Empty!")
            }
        },
        changeTelegram: function(){
            document.getElementById("telegramContent").innerHTML="<input type='text' id='newTelegram'>"
            this.telegramStatus="changing"
        },
        confirmChangeTelegram: async function(){
            var newTelegram = document.getElementById("newTelegram").value
            var regExp = /^@/
            var ok = regExp.test(newTelegram)
            if(ok){
                this.telegram = newTelegram
                document.getElementById("telegramContent").innerHTML="'{{telegram}}'"
                this.passwordStatus="static"
                try{
                    const docRef = await updateDoc(doc(db, "Users",this.userID), {
                        telegramHandle: newTelegram
                    })
                    console.log(docRef)
                    location.reload()
                }
                catch(error){
                    console.log("Failed updating telegram handle")
                }
            } else {
                alert("Invalid Password Format! \nPlease remember the @ in front of your handle.")
            }
        },
        changeBio: function(){
            document.getElementById("bioContent").innerHTML="<input type='text' id='newBio'>"
            this.bioStatus="changing"
        },
        confirmChangeBio: async function(){
            var newBio = document.getElementById("newBio").value
            if (newBio != '') {
                this.bio = newBio
            } else {
                this.bio = ' '
            }
            document.getElementById("bioContent").innerHTML="'{{bio}}'"
            this.bioStatus="static"
            try{
                const docRef = await updateDoc(doc(db, "Users",this.userID), {
                    bio: newBio
                })
                console.log(docRef)
                location.reload()
                }
                catch(error){
                    console.log("Failed updating bio")
                }
        },
        changeContact: function(){
            document.getElementById("contactContent").innerHTML="<input type='text' id='newContact'>"
            this.contactStatus="changing"
        },
        confirmChangeContact: async function(){
            var newContact = document.getElementById("newContact").value
            var regExp = /[0-9]{8}$/
            var ok = regExp.test(newContact)
            if(ok){
                this.contactNumber = newContact
                document.getElementById("contactContent").innerHTML="'{{contactNumber}}'"
                this.contactStatus="static"
                try{
                    const docRef = await updateDoc(doc(db, "Users",this.userID), {
                        contactNumber: newContact
                    })
                    console.log(docRef)
                    location.reload()
                }
                catch(error){
                    console.log("Failed updating contactNumber")
                }
            } else {
                alert("Invalid Contact Number! Please use a Singapore phone number.")
            }
        }
    }
}
</script>

<style>
    #SettingTable, .settingRow, .leftCol, .rightCol, .midCol{
        border: 1px solid rgba(255, 255, 255, 0.9);
        border-collapse: collapse;
    }

    .leftCol {
        width: 150px;
        height: 50px;
        font-weight: bold;
    }
    .rightCol {
        width: 75px;
        text-align: center;
    }
    .settingRow:nth-child(odd) {
        background-color: rgba(200, 238, 255, 0.9);
    }
    .settingRow:nth-child(even) {
        background-color: rgba(253, 231, 208, 0.9);
    }
    .settingRow {
        border-collapse: collapse;
        border-width: 1px 0;
    }
    #confirmChangeUsername,#confirmChangeTelegram,#confirmChangeBio,#confirmChangeContact {
        margin-left: 10%;
    }
    #usernameContent,#emailContent,#telegramContent,#bioContent,#contactContent {
        width: 60%;
    }
</style>