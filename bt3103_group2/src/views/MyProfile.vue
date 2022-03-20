<template>
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
</template>

<script>
import userInfo from "../components/profile/UserInfoDisplay.vue"
import settingChat from "../components/profile/SettingsChatsButton.vue"
import bottomEle from "../components/profile/MyProfileBottomEle.vue"

export default {
    name:"MyProfile",
    components:{
        userInfo,
        settingChat,
        bottomEle
    }
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
        font-size: 13px;
    }

    #BottomElement{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        margin-top:3%;
    }
</style>