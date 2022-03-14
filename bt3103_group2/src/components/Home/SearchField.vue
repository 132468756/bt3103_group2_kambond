<template>
  <div class="search-area">
      <h1 id='searchtitle'> KamBond Search </h1>
      <div class="icon">
        <img src="@/assets/search.jpg" width="" height="">
      </div>
      <div class="search-bar">
          <input type="text" id="inputbox" v-model="searchText" required="" Placeholder="Search">
          <button id="searchbutton" type="button" v-on:click="search()">Search</button>
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

  h1 {
    color: aliceblue; /* black */
    text-align: center;
    text-shadow: 1px 1px black;
  }

  .icon {
    width: 100%;
    /* background-color: aquamarine; */
    text-align: center;
  }

  .search-bar {
    display: inline-block;
    text-align: center;
    align-items: center;
    width:100%;
  }
  #inputbox{
    margin: 10px;
    width: 60%;
    height:30px;
  }

  #searchbutton{
    margin: 15px 100px 10px 0px;
    background-color:aliceblue;
    color:black;
    height:30px;
  }


  #searchbutton:hover{
    background-color:lightblue;
    box-shadow: 1px 1px black;
  }
</style>