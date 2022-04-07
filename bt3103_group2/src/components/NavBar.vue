<template>
    <div id="nav">
      <img src = "@/assets/logo.png" id= "navImg"/>
      <router-link to="/home">Home</router-link> &nbsp; | &nbsp;
      <router-link to="/borrow">Borrow</router-link> &nbsp; | &nbsp;
      <router-link to="/lend">Lend</router-link> &nbsp; | &nbsp;
      <router-link to="/myprofile">Profile</router-link>
      <br><br>
    </div>
</template>

<script>
export default {
 name:"NavBar"
}
</script>

<style>
#nav {
  padding-top: 30px;
  padding-bottom: 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

#navImg {
  height: 13vh;
  width: 9vw;
  position:absolute;
  left: 1vw;
  top: 2vh;
}
</style>