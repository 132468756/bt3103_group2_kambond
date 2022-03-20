<template>
  <Filter1 />
  <Filter2 />
  <Filter4 />
</template>

<script>
import Filter1 from "@/components/Filter/Filter1.vue";
import Filter2 from "@/components/Filter/Filter2.vue";
import Filter4 from "@/components/Filter/Filter4.vue";
export default {
  name: "Lend",
  data() {
    return {
      checkedNames: [],
    };
  },
  components: {
    Filter1,
    Filter2,
    Filter4,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
