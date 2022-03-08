<template>
  <div id="filter">
    <filter1 />

    <filter2 />

    <filter3 />
  </div>
</template>

<script>
import filter1 from "./filter1.vue";
import filter2 from "./filter2.vue";
import filter3 from "./filter3.vue";
export default {
  name: "borrower",
  data() {
    return {
      checkedNames: [],
    };
  },
  components: {
    filter1,
    filter2,
    filter3,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
