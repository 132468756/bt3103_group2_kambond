<template>
  <div class="search-area">
    <h1 id="search-title">KamBond</h1>
    <br><br>
    <div class="search-bar">
      <input
        type="text"
        id="inputbox"
        v-model.lazy="searchText"
        required=""
        Placeholder="    Enter to Search in KamBond"
        @keydown.enter="newSearch"
      />
      <!-- <button id="searchbutton" type="button" v-on:click="newSearch()">
        Search
      </button> -->
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

.search-bar {
  display: inline-block;
  text-align: center;
  align-items: center;
  width: 100%;
}
#inputbox {
  margin: 10px;
  width: 40vw;
  height: 40px;
  border-radius: 50px;
  /* border: transparent; */
  border: 0.5px solid rgba(0, 0, 0, 0.37);
  background-color: rgba(255, 255, 255, 0.959);
  font-size: 16px
}

#inputbox:focus {
  outline: none;
}

#searchbutton {
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
}
</style>