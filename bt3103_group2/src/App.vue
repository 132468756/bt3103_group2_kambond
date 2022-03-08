<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/borrow">Borrow</router-link>
    <router-link to="/profile">Profile</router-link>
  </div>
  <router-view/>
  <hr>
  <!-- <Homepage/>
  <Borrow/>
  <Profile/> -->
</template>

<script>
// import Homepage from './views/Homepage.vue'
// import Borrow from "./components/Borrow.vue"
// import Profile from "./views/Profile.vue"

export default {
  name: "App",
  components: {
    // Homepage,
    // Borrow,
    // Profile
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>