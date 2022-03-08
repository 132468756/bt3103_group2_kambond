<template>
  <div class="container">
      <h3> KamBond Search </h3>
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

</style>