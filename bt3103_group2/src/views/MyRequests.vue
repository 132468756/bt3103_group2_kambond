<template> 
    <!-- <h1>This is a sample page for My Request</h1> -->
    <nav-bar/>
    <backBtn/>
    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Requests</h1>

    <div class="table">
        <requestTable/>
    </div>
</template>

<script>
import backBtn from "../components/other-profile/BackButton.vue"
import requestTable from "../components/my-profile/MyRequestsTable.vue"
import NavBar from "../components/NavBar.vue"

export default {
    name:"MyRequests",
    components:{
        backBtn,
        requestTable,
        NavBar
    }
}
</script>

<style>
    #username {
        text-align: center;
        color: black;
    }

    .profilePicDiv {
        text-align: center;
    }

    #profilePic {
        width: 100px;
        height: 100px;
    }
</style>