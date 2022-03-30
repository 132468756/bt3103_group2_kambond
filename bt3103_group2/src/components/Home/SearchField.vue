<template>
  <div class="search-area">
    <h1 id="search-title">KamBond</h1>
    <div class="search-bar">
      <input
        type="text"
        id="inputbox"
        v-model.lazy="searchText"
        required=""
        Placeholder="Search in KamBond"
      />
      <button id="searchbutton" type="button" v-on:click="newSearch()">
        Search
      </button>
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
}

#search-title {
  color: rgb(0, 0, 0); /* black */
  margin: auto;
  text-align: center;
  text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.4)
}

.search-bar {
  display: inline-block;
  text-align: center;
  align-items: center;
  width: 100%;
}
#inputbox {
  margin: 10px;
  width: 60%;
  height: 30px;
}

#searchbutton {
  margin: auto;
  border: 1px solid black;
  background-color: rgb(255, 255, 255);
  color: black;
  height: 37px;
  width: 80px;
  border-radius: 3px;
}

#searchbutton:hover {
  background-color: rgb(183, 237, 255);
  box-shadow: 1px 1px black;
}
</style>