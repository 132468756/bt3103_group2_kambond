<template>
  <filter1 />
  <filter2 />
  <filter4 />
</template>

<script>
import filter1 from "./filter1.vue";
import filter2 from "./filter2.vue";
import filter4 from "./filter4.vue";
export default {
  name: "borrower",
  data() {
    return {
      checkedNames: [],
    };
  },
  components: {
    filter1,filter2,filter4
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
