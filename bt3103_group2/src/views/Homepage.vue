<template>
  <div class="home">
    <br><br>
    <SearchField/>
  </div>
</template>

<script>
import SearchField from "../components/Home/SearchField.vue"

export default {
  name: "Homepage",
  components: {
    SearchField,
  }
}
</script>

<style>
.home {
    /* The image used */
    background-image: url('~@/assets/search-bg.jpg');

    /* Control the height of the image */
    min-height: 380px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
</style>