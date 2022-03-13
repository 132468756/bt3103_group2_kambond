<template>
  <div class="search-area">
      <h3 id='searchtitle'> KamBond Search </h3>
      <div class="icon">
        <img src="@/assets/search.jpg" width="" height="">
      </div>
      <div class="search-bar">
        <div class="inputbox">
          <input type="text" id="search" v-model="searchText" required="" Placeholder="Search">
        </div>
        <div class="button">
          <button id="searchbutton" type="button" v-on:click="search()">Search</button>
        </div>
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
  .search-area {
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
    color: floralwhite; /* floralwhite */
    text-align: center;
  }

  .icon {
    width: 100%;
    /* background-color: aquamarine; */
    text-align: center;
  }

  .search-bar {
    display:inline-block;
    text-align: center;
    width:100%;
  }

  .inputbox {
    text-align: center;
    /* background-color: aqua; */
    padding: 5%;
  }
  #search {
    width: 80%;
    height:30px;
  }

  .button {
    /* background-color: blue; */
    text-align: justify;
    padding:5%;
  }

  #searchbutton {
    background-color: floralwhite;
    color: black;
    height: 100%;
  }

  .button:hover {
  }
</style>