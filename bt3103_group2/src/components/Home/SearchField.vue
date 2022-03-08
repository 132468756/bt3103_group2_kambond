<template>
  <div class="container">
      <br>
      <h3 id='searchtitle'> KamBond Search </h3>
      <div class="inputbox">
          <br>
          <input type="text" id="search" required="" Placeholder="Search">
          
          <div class="search">
            <button id="searchbutton" type="button" v-on:click="search()">Search</button>
          </div>
          <br><br>
      </div>
  </div>
</template>

<script>
export default {
name: "SearchField",

methods: {
    // Search
    async search(){
        alert("Searching for...");
        console.log("searching");
    }
}
}
</script>

<style>
  .container {
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

  #searchtitle {
    color: floralwhite;
  }
</style>