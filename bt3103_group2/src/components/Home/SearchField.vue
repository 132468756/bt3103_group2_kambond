<template>
  <div class="search-area">
    <h1 id="search-title">KamBond</h1>
    <br><br>
    <div id="searchBar">
      <div id="searchBarContainer">
        <img src="../../assets/search.png" id="searchImg">
        <input
          type="text"
          id="inputbox"
          v-model.trim="searchText"
          required=""
          Placeholder="Enter to Search in KamBond"
          @keydown.enter="newSearch"
        />
        <!-- <button id="searchbutton" type="button" v-on:click="newSearch()">
          Search
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  components: {},
  // Emits to pass data from child to parent
  // Register what is emitting
  emits:["search"],
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    newSearch(){
      // this.$emit(the event which runs on parent, data to pass)
      this.$emit('search', this.searchText);
      console.log('emitting ', this.searchText)
    },
  },
};
</script>

<style>
.search-area {
  position:sticky;
  margin-top: 6%;
}

#search-title {
  color: rgb(25, 71, 85); /* black */
  margin: auto;
  text-align: center;
  text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.8);
  font-size: 80px;
}

#searchBar {
  display: flex;
  align-items: center;
  background-color: transparent;
  height: 30px;
  padding: 10px;
  width: 40%;
  margin-left: 30%;
}

#searchBarContainer {
  display: flex;
  align-items: center;
  background-color: white;
  width: 96.5%;
  height: 45px;
  border-radius: 50px;
  box-shadow: 0px 0px 25px rgba(27, 26, 26, 0.719);
}

#searchImg {
  height: 20px;
  width: 20px;
  margin-left: 10px;
}

#inputbox {
  margin: 10px;
  width: 40vw;
  height: 40px;
  border-radius: 50px;
  border: transparent; 
  background-color: rgba(255, 255, 255, 0.959);
  font-size: 16px
}

#inputbox:focus {
  outline: none;
}
#inputbox:-webkit-autofill,
#inputbox:-webkit-autofill:hover,
#inputbox:-webkit-autofill:focus,
#inputbox:-webkit-autofill:active {
  -webkit-transition-delay: 9999s;
  transition-delay: 9999s;
}

/* #searchbutton {
  margin: auto;
  border: 1px solid black;
  background-color: rgb(25, 64, 80);
  color: black;
  height: 45px;
  width: 80px;
  border-radius: 50px;
  border: transparent;
  color:white
}

#searchbutton:hover {
  font-weight: bold;
  outline: none;
} */
</style>