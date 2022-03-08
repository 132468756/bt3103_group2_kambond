<template>
  <div class="container">
      <h3> KamBond Search </h3>
      <div class="inputbox">
          <img src="https://th.bing.com/th/id/R.cef27e43aef5566cae6c959a243577d6?rik=lMjUqiqjS1xgQg&riu=http%3a%2f%2fwww.mallorca.org%2fmedia%2fimage%2f21%2fsunset-in-mallorca.jpg&ehk=8g4W5GafSFULjIJeyqmjV62S2PtpcLSiHVlMxzqIBEg%3d&risl=&pid=ImgRaw&r=0" alt="image">
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