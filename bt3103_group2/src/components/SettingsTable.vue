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
import changeBtn from "../components/ChangeSettingButton.vue"

export default {
    names:"SettingsTable",
    components:{
        changeBtn
    },
    data(){
        return{
            username:"Peter Parker",
            usernameStatus:"static",
            email:"peterparkerisnotspiderman@gmail.com",
            emailStatus:"static",
            password:"peterparker123",
            passwordStatus:"static",
            bio:"I am not your friendly neighborhood spiderman",
            bioStatus:"static",
            contactNumber:"88888888",
            contactStatus:"static"
        }
    },

    methods:{
        changeUsername: function(){
            document.getElementById("usernameContent").innerHTML="<input type='text' id='newUsername'>"
            this.usernameStatus="changing"
        },

        confirmChangeUsername: function(){
            var newUsername = document.getElementById("newUsername").value
            if (newUsername != '') {
                this.username = newUsername
                document.getElementById("usernameContent").innerHTML="'{{username}}'"
                this.usernameStatus="static"
            } else {
                alert("Username Cannot Be Empty!")
            }
        },

        changeEmail: function(){
            document.getElementById("emailContent").innerHTML="<input type='text' id='newEmail'>"
            this.emailStatus="changing"
        },

        confirmChangeEmail: function(){
            var newEmail = document.getElementById("newEmail").value
            var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            var ok = regExp.test(newEmail)
            if(ok){
                this.email = newEmail
                document.getElementById("emailContent").innerHTML="'{{email}}'"
                this.emailStatus="static"
            } else {
                alert("Invalid Email Format!")
            }
        },

        changePassword: function(){
            document.getElementById("passwordContent").innerHTML="<input type='text' id='newPassword'>"
            this.passwordStatus="changing"
        },

        confirmChangePassword: function(){
            var newPassword = document.getElementById("newPassword").value
            var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            var ok = regExp.test(newPassword)
            if(ok){
                this.password = newPassword
                document.getElementById("passwordContent").innerHTML="'{{password}}'"
                this.passwordStatus="static"
            } else {
                alert("Invalid Password Format! \nMinimum eight characters, at least one letter and one number.")
            }
        },

        changeBio: function(){
            document.getElementById("bioContent").innerHTML="<input type='text' id='newBio'>"
            this.bioStatus="changing"
        },

        confirmChangeBio: function(){
            var newBio = document.getElementById("newBio").value
            if (newBio != '') {
                this.bio = newBio
            } else {
                this.bio = ' '
            }
            document.getElementById("bioContent").innerHTML="'{{bio}}'"
            this.bioStatus="static"
        },

        changeContact: function(){
            document.getElementById("contactContent").innerHTML="<input type='text' id='newContact'>"
            this.contactStatus="changing"
        },

        confirmChangeContact: function(){
            var newContact = document.getElementById("newContact").value
            var regExp = /[0-9]{8}$/
            var ok = regExp.test(newContact)
            if(ok){
                this.contactNumber = newContact
                document.getElementById("contactContent").innerHTML="'{{contactNumber}}'"
                this.contactStatus="static"
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