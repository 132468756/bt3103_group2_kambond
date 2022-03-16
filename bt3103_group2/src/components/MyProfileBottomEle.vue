<template>
    <div id="OtherPages">
        <div id="MyPost">
            <a href="/mypost">
                <button class="MyBtn">
                    <h2 class="InnerText">My Posts</h2>
                </button>
            </a>
        </div>

        <div id="MyRequest">
            <a href="/myrequest">
                <button class="MyBtn">
                    <h2 class="InnerText">My Requests</h2>
                </button>
            </a>
        </div>

        <div id="MyDeal">
            <a href="/mydeal">
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
</template>

<script>
export default {

}
</script>

<style>
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

    #OtherPages{
        display:flex;
        flex-direction:row;
    }

    #CreateBtn {
        background-color: plum;
    }

    #CreateBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 3px rgb(214, 130, 214);
        transition: 0.5s;
    }

    #CreateBtn:active {
        background-color: rgb(214, 130, 214);
    }
</style>