<template>
    <!-- <h1>This is a sample page for My Deals</h1> -->
    <nav-bar/>
    <backBtn/>
    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Deals</h1>

    <div class="table">
        <dealTable/>
    </div>
</template>

<script>
import backBtn from "../components/profile/BackButton.vue"
import dealTable from "../components/profile/MyDealsTable.vue"
import NavBar from "../components/NavBar.vue"
export default {
    name: "MyDeals",
    components : {
        backBtn,
        dealTable,
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