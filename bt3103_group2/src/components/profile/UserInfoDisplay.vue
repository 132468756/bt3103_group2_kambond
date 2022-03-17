<template>
    <div id="userInfo">
        <div class="profilePicDiv">
            <img src="@/assets/profilephoto.jpeg" id="profilePic">
        </div>
        <h1 id="username">User Name</h1>
        <div class="userInfoDetail">
            <h2 id="Kambond">I like Kambond</h2>
            <h4 id="myCreditPoint">Credbility Point: 10</h4>
            <h4 id="likes">Likes: 66</h4>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #username {
    text-align: center;
    color: black;
    }

    #Kambond {
    text-align: center;
    color: aqua;
    }

    #myCreditPoint, #likes {
    text-align: center;
    color: mediumseagreen;
    }

    .profilePicDiv {
    text-align: center;
    }

    #profilePic {
    width: 100px;
    height: 100px;
    }
</style>