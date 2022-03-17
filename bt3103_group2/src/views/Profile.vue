<template>
  <div id="profile">
    <!-- <h1>This is a sample user_name's profile</h1> -->
    <!-- <Logout/> -->
    <div class="profilePicDiv">
      <img src="@/assets/profilephoto.jpeg" id="profilePic">
    </div>
    <h1 id="username">User Name</h1>
    <div class="userInfo">
      <h2 id="Kambond">I like Kambond</h2>
      <h3 id="creditPoint">Credbility Point: 10</h3>
    </div>

    <div class="table">
      <table id="userPosts">
        <tr class="UserPostRow">
          <th class="UserPostTitle">Post ID</th>
          <th class="UserPostTitle">Title</th>
          <th class="UserPostTitle">Description</th>
          <th class="UserPostTitle">Purpose</th>
          <th class="UserPostTitle">Catogory</th>
          <th class="UserPostTitle">Location</th>
          <th class="UserPostTitle">Post Date</th>
          <th class="UserPostTitle">Status</th>
          <th class="UserPostTitle">Post ID</th>
          <th class="UserPostTitle">Request</th>
        </tr>
        <tr class="UserPostRow">
          <td class="UserPostCol">1</td>
          <td class="UserPostCol">Charger</td>
          <td class="UserPostCol">Windows laptop charger</td>
          <td class="UserPostCol">Borrowing</td>
          <td class="UserPostCol">Electronics</td>
          <td class="UserPostCol">PGP</td>
          <td class="UserPostCol">15/03/2022</td>
          <td class="UserPostCol">Available</td>
          <td class="UserPostCol">3216546</td>
          <td class="UserPostCol">Request</td>
        </tr>
        <tr class="UserPostRow">
          <td class="UserPostCol">2</td>
          <td class="UserPostCol">Charger</td>
          <td class="UserPostCol">Windows laptop charger</td>
          <td class="UserPostCol">Lending</td>
          <td class="UserPostCol">Electronics</td>
          <td class="UserPostCol">PGP</td>
          <td class="UserPostCol">15/03/2022</td>
          <td class="UserPostCol">Available</td>
          <td class="UserPostCol">3216546</td>
          <td class="UserPostCol">Request</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import Logout from "../components/Logout.vue"

export default {
  name: "Profile",
  components : {
    // Logout,
  }
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

  #creditPoint {
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

  #userPosts {
    text-align: center;
    width: 80%;
    margin-left: 10%;
  }

  #userPosts,.UserPostTitle,.UserPostCol {
    border: 3px rgb(255, 165, 179) solid;
    border-collapse: collapse;
    height: 30px;
  }

  .UserPostRow:nth-child(odd) {
    background-color: rgb(255, 242, 244);
  }

  .UserPostTitle {
    background-color: lightpink;
  }
</style>