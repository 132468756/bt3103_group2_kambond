<template>
  <div class="home">
    <NavBar/>
    <br /><br />
    <SearchField />
    <Contact />
  </div>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue";
import Contact from "../components/Home/Contact.vue";
import NavBar from "../components/NavBar.vue";
export default {
  name: "Homepage",
  components: {
    SearchField,
    Contact,
    NavBar,
  },
};
</script>

<style>
.home {
  /* The image used */
  background-image: url("~@/assets/search-bg.jpg");

  /* Control the height of the image */
  min-height: 380px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>