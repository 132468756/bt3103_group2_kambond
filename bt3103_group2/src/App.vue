<template>
<div class="app">
  <router-view />
  <!-- <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>  -->
</div> 
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
    /* The image used */
  background-image: url("~@/assets/Swapping-1.jpg");

  /* Control the height of the image */
  min-height: 500px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
  background-attachment: fixed;

  height: 950px;
}
</style>