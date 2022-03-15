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
                    <a href="">
                        <button class="MyBtn" id="SettingsBtn" onmouseover="cursor:hand">
                            <h2 class="InnerText">Settings</h2>
                        </button>
                    </a>
                </div>
                <br><br>
                <div id="Chats">
                    <a href="">
                        <button class="MyBtn" id="ChatsBtn">
                            <h2 class="InnerText">Chats</h2>
                        </button>
                    </a>
                </div>
            </div>
        </span>
    </div>

    <br><br><br>    

    <div id="BottomElement">
        <div id="OtherPages">
            <div id="MyPost">
                <a href="">
                    <button class="MyBtn">
                        <h2 class="InnerText">My Posts</h2>
                    </button>
                </a>
            </div>

            <div id="MyRequest">
                <a href="">
                    <button class="MyBtn">
                        <h2 class="InnerText">My Requests</h2>
                    </button>
                </a>
            </div>

            <div id="MyDeal">
                <a href="">
                    <button class="MyBtn">
                        <h2 class="InnerText">My Deals</h2>
                    </button>
                </a>
            </div>
        </div>
        <br><br>
        <div id="Create">
            <a href="/createpost">
                <button class="MyBtn" id="CreateBtn">
                    <h2 class="InnerText">Create</h2>
                </button>
            </a>
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
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .MyBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 3px lightblue;
        transition: 0.5s;
    }

    .MyBtn:active {
        background-color: lightblue;
    }

    #CreateBtn {
        background-color: plum;
    }

    #CreateBtn:hover {
        box-shadow: 0 0 0 3px rgb(240, 145, 240);
        transition: 0.5s;
    }

    #CreateBtn:active {
        background-color: rgb(240, 145, 240);
    }

    #SettingsBtn, #ChatsBtn {
        background-color: orange;
    }

    #SettingsBtn:hover, #ChatsBtn:hover {
        box-shadow: 0 0 0 3px lightcoral;
        transition: 0.5s;
    }

    #SettingsBtn:active, #ChatsBtn:active {
        background-color: lightcoral;
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