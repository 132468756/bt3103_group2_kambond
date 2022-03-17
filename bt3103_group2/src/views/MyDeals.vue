<template>
    <!-- <h1>This is a sample page for My Deals</h1> -->
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

export default {
    name: "MyDeals",
    components : {
        backBtn,
        dealTable
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