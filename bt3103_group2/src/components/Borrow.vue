<template>
  <div id="filter">
    <Filter1 />

    <Filter2 />

    <Filter3 />
  </div>
</template>

<script>
import Filter1 from "./Filter1.vue";
import Filter2 from "./Filter2.vue";
import Filter3 from "./Filter3.vue";
export default {
  name: "Borrow",
  data() {
    return {
      checkedNames: [],
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter3,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
