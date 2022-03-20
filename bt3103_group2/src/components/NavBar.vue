<template>
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/borrow">Borrow</router-link> |
      <router-link to="/lend">Lend</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/createpost"> CreatePost </router-link>
      <hr />
    </div>
</template>

<script>
export default {
 name:"NavBar"
}
</script>

<style>
#nav {
  padding: 30px;
  text-align: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>