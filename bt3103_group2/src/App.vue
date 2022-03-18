<template>
<div class="app">
  <NavBar/>
  <router-view />
  <Contact/>
</div> 
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Contact from "./components/Home/Contact.vue";

console.log("in App")
export default {
  name: "App",
  components: {
    NavBar,
    Contact
  },
};
</script>

<style>
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>