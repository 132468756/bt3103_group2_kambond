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
  background-color: rgba(177, 178, 248, 0.699);
  text-align: center;
  width: 180px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}

#checkboxes {
  background-color: rgba(218, 217, 245, 0.911);
  padding: 10px;
  width: 2000px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

.whole {
  display: flex;
  font-family: ;
}

#checked {
  background-color: rgba(241, 238, 255, 0.582);
  padding: 5px;
  border: 1px solid black;
  border-top: 0px;
}
</style>