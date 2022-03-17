<template>
    <!-- <h1>This is a sample page for settings</h1> -->
    <backBtn/>
    <br><br>
    <span id="left">
        <userInfo/>
    </span>

    <span id="right">
        <settingTable/>
    </span>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</template>

<script>
import backBtn from "../components/BackButton.vue"
import userInfo from "../components/UserInfoDisplay.vue"
import settingTable from "../components/SettingsTable.vue"

export default {
    name:"Settings",
    components:{
        backBtn,
        userInfo,
        settingTable
    }
}
</script>

<style>
#left {
    display: inline-block;
    width: 40%;
}

#right {
    display: inline-block;
    width: 60%;
}
</style>