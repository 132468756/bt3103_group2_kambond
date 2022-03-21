<template>
    <!-- <h1>This is a sample page for My Posts</h1> -->
    <nav-bar/>
    <backBtn/>
    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Posts</h1>

    <div class="table">
        <postTable/>
    </div>
</template>

<script>
import backBtn from "../components/profile/BackButton.vue"
import postTable from "../components/profile/MyPostsTable.vue"
import NavBar from "../components/NavBar.vue"

export default {
    name:"MyPosts",
    components:{
        backBtn,
        postTable,
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