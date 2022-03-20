<template>
<div class="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/borrow">Borrow</router-link> |
      <router-link to="/lend">Lend</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/createpost"> CreatePost </router-link>
      <hr />
    </div>
  <router-view />
  <Contact/>
</div> 
</template>

<script>
import Contact from "./components/Home/Contact.vue"
export default {
  name: "App",
  components: {
    Contact
  },
};
</script>

<style>
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
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