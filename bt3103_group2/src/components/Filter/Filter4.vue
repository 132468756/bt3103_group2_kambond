<script>
export default {
  name: "filter4",
  data() {
    return {
      checkedNames: [],
    };
  },
};
</script>

<template>
  <div>Checked names: {{ checkedNames }}</div>
  <div class="checkboxes">
    <input type="checkbox" id="wtb" value="Want to borrower" v-model="checkedNames" />
    <label for="wtb">Want to lend</label>

    <input type="checkbox" id="hb" value="Has borrowed" v-model="checkedNames" />
    <label for="hb">Has borrowed</label>
  </div>
</template>

<style scoped>
.checkboxes input {
  margin: 10px 1px 10px 10px;
}

.checkboxes label {
  margin: 10px 20px 10px 5px;
}
</style>