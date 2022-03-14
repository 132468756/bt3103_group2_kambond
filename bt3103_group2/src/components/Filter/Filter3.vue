<script>
export default {
  name: "filter3",
  data() {
    return {
      checkedNames: [],
    };
  },
};
</script>

<template>
  <div id="checked">Checked names: {{ checkedNames }}</div>
  <div class="whole">
    <div id="name">
      <h3>Status</h3>
    </div>
    <div id="checkboxes">
      <input
        type="checkbox"
        id="wtl"
        value="Want to lend"
        v-model="checkedNames"
      />
      <label for="wtl">Want to lend</label>

      <input type="checkbox" id="hl" value="Has lent" v-model="checkedNames" />
      <label for="hl">Has lent</label>
    </div>
  </div>
</template>

<style scoped>
#checkboxes input {
  margin: 10px 1px 10px 10px;
}

#checkboxes label {
  margin: 10px 20px 10px 5px;
}

#name {
  background-color: blueviolet;
  text-align: center;
  width: 100px;
}

#checkboxes {
  background-color: rgba(210, 179, 240, 0.911);
  padding: 10px;
  width:2000px
}

.whole {
  display: flex;
}

#checked {
  background-color: rgb(187, 189, 188);
  padding:5px;
  border-radius: 15px;
}
</style>