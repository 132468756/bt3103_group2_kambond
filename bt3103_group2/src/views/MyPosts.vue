<template>
    <!-- <h1>This is a sample page for My Posts</h1> -->

    <div class="profilePicDiv">
        <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">My Posts</h1>

    <div class="table">
        <table id="MyPosts">
            <tr class="MyPostRow">
                <th class="MyPostTitle">Post ID</th>
                <th class="MyPostTitle">Title</th>
                <th class="MyPostTitle">Description</th>
                <th class="MyPostTitle">Purpose</th>
                <th class="MyPostTitle">Catogory</th>
                <th class="MyPostTitle">Location</th>
                <th class="MyPostTitle">Post Date</th>
                <th class="MyPostTitle">Status</th>
                <th class="MyPostTitle">Post ID</th>
                <th class="MyPostTitle">Request</th>
            </tr>
            <tr class="MyPostRow">
                <td class="MyPostCol">1</td>
                <td class="MyPostCol">Charger</td>
                <td class="MyPostCol">Windows laptop charger</td>
                <td class="MyPostCol">Borrowing</td>
                <td class="MyPostCol">Electronics</td>
                <td class="MyPostCol">PGP</td>
                <td class="MyPostCol">15/03/2022</td>
                <td class="MyPostCol">Available</td>
                <td class="MyPostCol">3216546</td>
                <td class="MyPostCol"><button class="DeletePost">Delete</button></td>
            </tr>
            <tr class="MyPostRow">
                <td class="MyPostCol">2</td>
                <td class="MyPostCol">Charger</td>
                <td class="MyPostCol">Windows laptop charger</td>
                <td class="MyPostCol">Lending</td>
                <td class="MyPostCol">Electronics</td>
                <td class="MyPostCol">PGP</td>
                <td class="MyPostCol">15/03/2022</td>
                <td class="MyPostCol">Available</td>
                <td class="MyPostCol">3216546</td>
                <td class="MyPostCol"><button class="DeletePost">Delete</button></td>
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

    #MyPosts {
        text-align: center;
        width: 80%;
        margin-left: 10%;
    }

    #MyPosts,.MyPostTitle,.MyPostCol {
        border: 3px rgb(164, 219, 238) solid;
        border-collapse: collapse;
        height: 30px;
    }

    .MyPostRow:nth-child(odd) {
        background-color: rgb(227, 247, 253);
    }

    .MyPostTitle {
        background-color: rgb(194, 240, 255);
    }

    .DeletePost {
        width: 60%;
        height: 80%;
        background-color: rgb(136, 223, 252);
        cursor: pointer;
        border-radius: 12px;
        border: none;
    }

    .DeletePost:hover {
        outline-color: transparent;
        outline-style: solid;
        box-shadow: 0 0 0 1px lightblue;
        transition: 0.5s;
    }

    .DeletePost:active {
        background-color: lightblue;
    }
</style>