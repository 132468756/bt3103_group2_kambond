<template>
    <!-- This is a sample of the user info table to be shown in the setting page -->
    <table id="SettingTable" border=1 frame=void rules=rows>
        <tr class="settingRow">
            <td class="leftCol">User Name</td>
            <td id="usernameContent">{{username}}</td>
            <td class="rightCol" id="changeUsernameBtn" v-if="this.usernameStatus == 'static'"><changeBtn @click="changeUsername()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeUsername" @click="confirmChangeUsername()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Email</td>
            <td id="emailContent">{{email}}</td>
            <td class="rightCol" v-if="this.emailStatus == 'static'"><changeBtn @click="changeEmail()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeEmail" @click="confirmChangeEmail()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Password</td>
            <td id="passwordContent">{{password}}</td>
            <td class="rightCol" v-if="this.passwordStatus == 'static'"><changeBtn @click="changePassword()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangePassword" @click="confirmChangePassword()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Bio</td>
            <td id="bioContent">{{bio}}</td>
            <td class="rightCol" v-if="this.bioStatus == 'static'"><changeBtn @click="changeBio()"/></td>
            <td v-else><button class="changeSettingBtn" id="confirmChangeBio" @click="confirmChangeBio()">Confirm Change</button></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Contact Number</td>
            <td id="contactContent">{{contactNumber}}</td>
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
const db = getFirestore(firebaseApp)
const id = "jiangnuoyi1999@gmail.com"

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
            emailStatus:"static",
            password:'',
            passwordStatus:"static",
            bio:'',
            bioStatus:"static",
            contactNumber:'',
            contactStatus:"static"
        }
    },
    mounted(){
        async function displayUserInfo(self){
            let user = await getDoc(doc(db, "Users", "10086"))
            
            //let user = await getDoc(doc(db, "Users", id))
            // console.log(typeof(user))
            // console.log(user.data())
            self.username = user.data().username
            self.email = user.data().email
            self.password = user.data().password
            self.bio = user.data().bio
            self.contactNumber = user.data().contactNumber
        }
        displayUserInfo(this)
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
                    const docRef = await updateDoc(doc(db, "Users",id), {
                        username: newUsername
                    })
                    console.log(docRef)
                }
                catch(error){
                    console.log("Failed updating username")
                }
            } else {
                alert("Username Cannot Be Empty!")
            }
        },
        changeEmail: function(){
            document.getElementById("emailContent").innerHTML="<input type='text' id='newEmail'>"
            this.emailStatus="changing"
        },
        confirmChangeEmail: async function(){
            var newEmail = document.getElementById("newEmail").value
            var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            var ok = regExp.test(newEmail)
            if(ok){
                this.email = newEmail
                document.getElementById("emailContent").innerHTML="'{{email}}'"
                this.emailStatus="static"
                try{
                    const docRef = await updateDoc(doc(db, "Users",id), {
                        email: newEmail
                    })
                    console.log(docRef)
                }
                catch(error){
                    console.log("Failed updating email")
                }
            } else {
                alert("Invalid Email Format!")
            }
        },
        changePassword: function(){
            document.getElementById("passwordContent").innerHTML="<input type='text' id='newPassword'>"
            this.passwordStatus="changing"
        },
        confirmChangePassword: async function(){
            var newPassword = document.getElementById("newPassword").value
            var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            var ok = regExp.test(newPassword)
            if(ok){
                this.password = newPassword
                document.getElementById("passwordContent").innerHTML="'{{password}}'"
                this.passwordStatus="static"
                try{
                    const docRef = await updateDoc(doc(db, "Users",id), {
                        password: newPassword
                    })
                    console.log(docRef)
                }
                catch(error){
                    console.log("Failed updating password")
                }
            } else {
                alert("Invalid Password Format! \nMinimum eight characters, at least one letter and one number.")
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
                    const docRef = await updateDoc(doc(db, "Users",id), {
                        bio: newBio
                    })
                    console.log(docRef)
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
                    const docRef = await updateDoc(doc(db, "Users",id), {
                        contactNumber: newContact
                    })
                    console.log(docRef)
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
        background-color: rgb(223, 255, 251);
    }
    .settingRow {
        border-collapse: collapse;
        border-width: 1px 0;
    }
    #confirmChangeUsername,#confirmChangeEmail,#confirmChangePassword,#confirmChangeBio,#confirmChangeContact {
        margin-left: 10%;
    }
    #usernameContent,#emailContent,#passwordContent,#bioContent,#contactContent {
        width: 60%;
    }
</style>