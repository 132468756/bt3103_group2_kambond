<template>
    <!-- <h1>This is a sample of My_Profile</h1> -->
    <div id="TopElement">
        <span id="TopLeft">
            <userInfo id="MyInfo"/>
        </span>

        <span id="TopRight">
            <div id="RightFunction">
                <settingChat/>
            </div>
        </span>
    </div>

    <br><br><br>    

    <div id="BottomElement">
        <bottomEle/>
    </div>
</template>

<script>
import userInfo from "../components/UserInfoDisplay.vue"
import settingChat from "../components/SettingsChatsButton.vue"
import bottomEle from "../components/MyProfileBottomEle.vue"

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
    #TopLeft {
        display: inline-block;
        width: 63.625%;
    }

    #MyInfo {
        margin-left: 57.5%;
    }

    #TopRight {
        display: inline-block;
        width: 34.375%;
    }

    #RightFunction {
        margin-left: 18%;
    }

    .InnerText {
        color: rgb(0, 0, 0);
        font-size: 13px;
    }
</style>