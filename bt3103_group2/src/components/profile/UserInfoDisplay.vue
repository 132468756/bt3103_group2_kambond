<template>
    <div id="userInfo">
        <div class="profilePicDiv">
            <img src="@/assets/profilephoto.jpeg" id="profilePic">
        </div>
        <h1 id="username">User Name</h1>
        <div class="userInfoDetail">
            <h4 id="Kambond">I like Kambond</h4>
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
    color: rgb(0, 0, 0);
    font-style: italic;
    }

    #myCreditPoint, #likes {
    text-align: center;
    color: rgb(106, 202, 170);
    }

    .profilePicDiv {
    text-align: center;
    }

    #profilePic {
    width: 100px;
    height: 100px;
    }
</style>