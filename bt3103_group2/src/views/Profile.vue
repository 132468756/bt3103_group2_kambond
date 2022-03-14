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
        <tr>
          <th>Post ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Purpose</th>
          <th>Catogory</th>
          <th>Location</th>
          <th>Post Date</th>
          <th>Status</th>
          <th>Post ID</th>
          <th>Request</th>
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

  table, tr, th {
    border: 5px pink solid;
    border-collapse: collapse;
  }

  #userPosts {
    width: 100%;
  }
</style>