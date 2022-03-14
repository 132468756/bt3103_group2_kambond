<template>
  <Filter1 />
  <Filter2 />
  <Filter4 />
</template>

<script>
import Filter1 from "./Filter1.vue";
import Filter2 from "./Filter2.vue";
import Filter4 from "./Filter4.vue";
export default {
  name: "Lend",
  data() {
    return {
      checkedNames: [],
    };
  },
  components: {
    Filter1,Filter2,Filter4
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
