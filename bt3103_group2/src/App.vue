<template>
<div class="app">
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
</style>