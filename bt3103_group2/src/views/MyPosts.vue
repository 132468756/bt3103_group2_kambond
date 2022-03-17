<template>
    <!-- <h1>This is a sample page for My Posts</h1> -->
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

export default {
    name:"MyPosts",
    components:{
        backBtn,
        postTable
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