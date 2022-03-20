<template>
    <div id="OtherPages">
        <div className = "row">
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
        <div className = "row">
            <div id="Create">
                <a href="/createpost">
                    <button class="MyBtn" id="CreateBtn">
                        <h2 class="InnerText">Create</h2>
                    </button>
                </a>
            </div>
        </div>
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
        background-color: rgb(186, 218, 224);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .MyBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 3px rgb(139, 193, 218);
        transition: 0.5s;
    }

    .MyBtn:active {
        background-color: rgb(139, 193, 218);
    }

    #MyPost {
        border-radius: 25px;
        text-align: center;
        width: 25%;
        height: 100px;
        margin-left: 10%;
        margin-right: 5%;
        line-height: 60px;
    }

    #MyRequest {
        border-radius: 25px;
        text-align: center;
        width: 25%;
        height: 100px;
        margin-left: 5%;
        margin-right: 5%;
        line-height: 60px;
    }

    #MyDeal {
        border-radius: 25px;
        text-align: center;
        width: 25vw;
        height: 100px;
        margin-left: 5%;
        margin-right: 10%;
        line-height: 60px;
    }

    #Create {
        border-radius: 25px;
        text-align: center;
        width: 20%;
        height: 100px;
        line-height: 100px;
        margin-top:3%;
    }

    #OtherPages{
        display:flex;
        flex-direction:column;
        width:100%;
    }

    .row{
        display: flex;
        flex-direction:row;
        justify-content:space-around;

    }

    #CreateBtn {
        background-color: rgb(231, 201, 231);
    }

    #CreateBtn:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 3px rgb(241, 133, 174);
        transition: 0.5s;
    }

    #CreateBtn:active {
        background-color: rgb(214, 130, 214);
    }
</style>