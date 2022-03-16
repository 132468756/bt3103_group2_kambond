<template>
    <!-- This is a sample of the user info table to be shown in the setting page -->
    <table id="SettingTable" border=1 frame=void rules=rows>
        <tr class="settingRow">
            <td class="leftCol">User Name</td>
            <td>Peter Parker</td>
            <td class="rightCol"><changeBtn/></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Email</td>
            <td>perterparkerisnotspiderman@gmail.com</td>
            <td class="rightCol"><changeBtn/></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Password</td>
            <td>aklsdjflkadsjf</td>
            <td class="rightCol"><changeBtn/></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Bio</td>
            <td>I am not your neighborhood spiderman</td>
            <td class="rightCol"><changeBtn/></td>
        </tr>
        <tr class="settingRow">
            <td class="leftCol">Contact Number</td>
            <td>8888 8888</td>
            <td class="rightCol"><changeBtn/></td>
        </tr>
    </table>
</template>

<script>
import changeBtn from "../components/ChangeSettingButton.vue"

export default {
    names:"SettingsTable",
    components:{
        changeBtn
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
</style>