<template>
    <!-- <h1>This is a sample page for My Deals</h1> -->

    <div id="Back">
        <input type="button" id="BackBtn" value="Back" onclick="window.history.back()">
    </div>
    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Deals</h1>

    <div class="table">
        <table id="MyDeals">
            <tr class="MyDealRow">
                <th class="MyDealTitle">Post ID</th>
                <th class="MyDealTitle">Title</th>
                <th class="MyDealTitle">Description</th>
                <th class="MyDealTitle">Purpose</th>
                <th class="MyDealTitle">Catogory</th>
                <th class="MyDealTitle">Location</th>
                <th class="MyDealTitle">Post Date</th>
                <th class="MyDealTitle">Status</th>
                <th class="MyDealTitle">Post ID</th>
                <th class="MyDealTitle">Request</th>
            </tr>
            <tr class="MyDealRow">
                <td class="MyDealCol">1</td>
                <td class="MyDealCol">Charger</td>
                <td class="MyDealCol">Windows laptop charger</td>
                <td class="MyDealCol">Borrowing</td>
                <td class="MyDealCol">Electronics</td>
                <td class="MyDealCol">PGP</td>
                <td class="MyDealCol">15/03/2022</td>
                <td class="MyDealCol">Available</td>
                <td class="MyDealCol">3216546</td>
                <td class="MyDealCol"><button class="DealAction">Confirm</button></td>
            </tr>
            <tr class="MyDealRow">
                <td class="MyDealCol">2</td>
                <td class="MyDealCol">Charger</td>
                <td class="MyDealCol">Windows laptop charger</td>
                <td class="MyDealCol">Lending</td>
                <td class="MyDealCol">Electronics</td>
                <td class="MyDealCol">PGP</td>
                <td class="MyDealCol">15/03/2022</td>
                <td class="MyDealCol">Available</td>
                <td class="MyDealCol">3216546</td>
                <td class="MyDealCol"><button class="DealAction">Confirm</button></td>
            </tr>
        </table>
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

    .profilePicDiv {
        text-align: center;
    }

    #profilePic {
        width: 100px;
        height: 100px;
    }

    #MyDeals {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyDeals,.MyDealTitle,.MyDealCol {
        border: 3px rgb(255, 160, 255) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyDealRow:nth-child(odd) {
        background-color: rgb(255, 219, 255);
    }

    .MyDealTitle {
        background-color: rgb(255, 143, 255);
    }

    .DealAction {
        width: 60%;
        height: 80%;
        background-color: rgb(243, 104, 243);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .DealAction:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px rgb(204, 63, 204);
        transition: 0.5s;
    }

    .DealAction:active {
        background-color: rgb(204, 63, 204);
    }

    #BackBtn {
        width: 60px;
        height: 40px;
        background-color: rgb(39, 46, 65);
        color: white;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        margin-left: 10%;
    }
</style>