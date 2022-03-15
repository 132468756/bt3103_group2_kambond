<template> 
    <!-- <h1>This is a sample page for My Request</h1> -->
    <div id="Back">
        <input type="button" id="BackBtn" value="Back" onclick="window.history.back()">
    </div>

    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Requests</h1>

    <div class="table">
        <table id="MyRequests">
            <tr class="MyRequestRow">
                <th class="MyRequestTitle">Post ID</th>
                <th class="MyRequestTitle">Title</th>
                <th class="MyRequestTitle">Description</th>
                <th class="MyRequestTitle">Purpose</th>
                <th class="MyRequestTitle">Catogory</th>
                <th class="MyRequestTitle">Location</th>
                <th class="MyRequestTitle">Post Date</th>
                <th class="MyRequestTitle">Status</th>
                <th class="MyRequestTitle">Post ID</th>
                <th class="MyRequestTitle">Request</th>
            </tr>
            <tr class="MyRequestRow">
                <td class="MyRequestCol">1</td>
                <td class="MyRequestCol">Charger</td>
                <td class="MyRequestCol">Windows laptop charger</td>
                <td class="MyRequestCol">Borrowing</td>
                <td class="MyRequestCol">Electronics</td>
                <td class="MyRequestCol">PGP</td>
                <td class="MyRequestCol">15/03/2022</td>
                <td class="MyRequestCol">Available</td>
                <td class="MyRequestCol">3216546</td>
                <td class="MyRequestCol"><button class="RequestAction">Complete</button></td>
            </tr>
            <tr class="MyRequestRow">
                <td class="MyRequestCol">2</td>
                <td class="MyRequestCol">Charger</td>
                <td class="MyRequestCol">Windows laptop charger</td>
                <td class="MyRequestCol">Lending</td>
                <td class="MyRequestCol">Electronics</td>
                <td class="MyRequestCol">PGP</td>
                <td class="MyRequestCol">15/03/2022</td>
                <td class="MyRequestCol">Available</td>
                <td class="MyRequestCol">3216546</td>
                <td class="MyRequestCol"><button class="RequestAction">Complete</button></td>
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

    #MyRequests {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyRequests,.MyRequestTitle,.MyRequestCol {
        border: 3px rgb(161, 255, 161) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyRequestRow:nth-child(odd) {
        background-color: rgb(223, 255, 223);
    }

    .MyRequestTitle {
        background-color: rgb(183, 255, 183);
    }

    .RequestAction {
        width: 60%;
        height: 80%;
        background-color: rgb(111, 255, 111);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .RequestAction:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightgreen;
        transition: 0.5s;
    }

    .RequestAction:active {
        background-color: lightgreen;
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