<template>
<div style="text-align:center;" v-if="user">
    <NavBar/>
    <!-- <h1>This is a sample of My_Profile</h1> -->
    <div id="TopElement">
        <div id = "emptyDiv">        
        </div>
        <div id="TopLeft">
            <userInfo id="MyInfo"/>
        </div>

        <div id="TopRight">
            <div id="RightFunction">
                <settingChat/>
            </div>
        </div>
    </div>  

    <div id="BottomElement">
        <bottomEle/>
    </div>
    <LogOut/>
</div>
</template>

<script>
import userInfo from "../components/profile/UserInfoDisplay.vue"
import settingChat from "../components/profile/SettingsChatsButton.vue"
import bottomEle from "../components/profile/MyProfileBottomEle.vue"
import NavBar from "../components/NavBar.vue"
import LogOut from "../components/Logout.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
    name:"MyProfile",
    components:{
        NavBar,
        LogOut,
        userInfo,
        settingChat,
        bottomEle
    },

    data(){
        return{
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },
}
</script>

<style>
    #TopElement{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-around;
        width:100%;
    }

    #emptyDiv{
        width:20vw;
    }

    #Topleft{
        width:20vw;
    }


    #RightFunction {
        width:20vw;
        margin-right:1.9vw;
    }

    .InnerText {
        color: rgb(0, 0, 0);
        font-size: 20px;
    }

    #BottomElement{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        margin-top:3%;
    }
</style>