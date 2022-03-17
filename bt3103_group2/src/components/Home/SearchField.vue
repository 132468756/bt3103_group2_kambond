<template>
  <div class="search-area">
      <h1 id='search-title'> KamBond Search </h1>
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

  #search-title {
    color: aliceblue; /* black */
    text-align: center;
    text-shadow: 1px 1px black;
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
    border: 1.5px solid black;
    background-color:aliceblue;
    color:black;
    height:37px;
    width: 80px;
    border-radius: 3px;
  }


  #searchbutton:hover{
    background-color:lightblue;
    box-shadow: 1px 1px black;
  }
</style>