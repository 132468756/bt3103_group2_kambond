<template>
    <!-- <h1>This is a sample of My_Profile</h1> -->
    <div id="TopElement">
        <span id="TopLeft">
            <div id="MyInfo">
                <div class="profilePicDiv">
                    <img src="@/assets/profilephoto.jpeg" id="profilePic">
                </div>
                <h1 id="username">My Name</h1>
                <div class="userInfo">
                    <h2 id="Kambond">I like Kambond</h2>
                    <h4 id="MyCreditPoint">Credbility Point: 10</h4>
                    <h4 id="Likes">Likes: 66</h4>
                </div>
            </div>
        </span>

        <span id="TopRight">
            <div id="RightFunction">
                <div id="Settings">
                    <h2><a href="" class="InnerText">Settings</a></h2>
                </div>
                <br><br>
                <div id="Chats">
                    <h2><a href="" class="InnerText">Chats</a></h2>
                </div>
            </div>
        </span>
    </div>

    <br><br><br>    

    <div id="BottomElement">
        <div id="OtherPages">
            <div id="MyPost">
                <!-- <h2><a href="" class="InnerText">My Posts</a></h2> -->
                <!-- <button class="MyBtn"> -->
                    <h2><a href="" class="InnerText">My Posts</a></h2>
                <!-- </button> -->
            </div>

            <div id="MyRequest">
                <h2><a href="" class="InnerText">My Requests</a></h2>
            </div>

            <div id="MyDeal">
                <h2><a href="" class="InnerText">My Deals</a></h2>
            </div>
        </div>
        <br><br>
        <div id="Create">
            <h2><a href="/createpost" class="InnerText">Create</a></h2>
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

    #MyCreditPoint, #Likes {
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

    .MyBtn {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
    }

    #MyPost {
        background-color: aquamarine;
        border-radius: 25px;
        text-align: center;
        width: 25%;
        height: 100px;
        margin-left: 10%;
        margin-right: 5%;
        line-height: 60px;
    }

    #MyRequest {
        background-color: aquamarine;
        border-radius: 25px;
        text-align: center;
        width: 25%;
        height: 100px;
        margin-left: 5%;
        margin-right: 5%;
        line-height: 60px;
    }

    #MyDeal {
        background-color: aquamarine;
        border-radius: 25px;
        text-align: center;
        width: 25%;
        height: 100px;
        margin-left: 5%;
        margin-right: 10%;
        line-height: 60px;
    }

    #Create {
        background-color: plum;
        border-radius: 25px;
        text-align: center;
        width: 20%;
        height: 100px;
        margin-left: 40%;
        line-height: 100px;
    }

    #Settings {
        background-color: orange;
        border-radius: 25px;
        text-align: center;
        width: 72.73%;
        height: 100px;
        line-height: 100px;
    }

    #Chats {
        background-color: orange;
        border-radius: 25px;
        text-align: center;
        width: 72.73%;
        height: 100px;
        line-height: 100px;
    }

    .InnerText {
        color: gray;
    }

    #OtherPages{
        display:flex;
        flex-direction:row;
    }
</style>