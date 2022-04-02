<script>
export default {
  name: "filter2",
  data() {
    return {
      checkedNames: [],
    };
  },
  watch: {
    checkedNames() {
      this.$emit('change', this.checkedNames)
    }
  },
};
</script>

<template>
  <!-- <div id="checked">Checked names: {{ checkedNames }}</div> -->
  <div class="whole">
      <div id="name">
      <h3>Location</h3>
    </div>
  <div id="checkboxes">
    <input type="checkbox" id="pgp" value="PGP / PGPR" v-model="checkedNames" />
    <label for="pgp">PGP / PGPR</label>

    <input type="checkbox" id="ut" value="Utown" v-model="checkedNames" />
    <label for="ut">Utown</label>

    <input type="checkbox" id="rvrc" value="RVRC" v-model="checkedNames" />
    <label for="rvrc">RVRC</label>

    <input
      type="checkbox"
      id="temasek"
      value="Temasek Hall"
      v-model="checkedNames"
    />
    <label for="temasek">Temasek Hall</label>

    <input
      type="checkbox"
      id="sheares"
      value="Sheares Hall"
      v-model="checkedNames"
    />
    <label for="sheares">Sheares Hall</label>

    <input
      type="checkbox"
      id="kevii"
      value="KEVII Hall"
      v-model="checkedNames"
    />
    <label for="kevii">KEVII Hall </label>

    <input
      type="checkbox"
      id="eusoff"
      value="Eusoff Hall"
      v-model="checkedNames"
    />
    <label for="eusoff">Eusoff Hall</label>

    <input
      type="checkbox"
      id="raffles"
      value="Raffles Hall"
      v-model="checkedNames"
    />
    <label for="raffles">Raffles Hall</label>

    <input
      type="checkbox"
      id="kentridge"
      value="Kent Ridge Hall"
      v-model="checkedNames"
    />
    <label for="kentridge">Kent Ridge Hall</label>

    <input type="checkbox" id="others" value="Others" v-model="checkedNames" />
    <label for="others">Others</label>
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
  background-color: rgba(241, 187, 129, 0.9);
  text-align: center;
  width: 15vw;
  border: transparent;
  border-bottom-left-radius: 10px;
}

#checkboxes {
  background-color: rgba(244, 216, 187, 0.9);
  padding: 10px;
  width: 85vw;
  border: transparent;
  text-align: left;
  border-bottom-right-radius: 10px;
}

.whole {
  display: flex;
}

#checked {
  background-color: rgba(241, 238, 255, 0.582);
  padding: 5px;
  border: transparent;
}
</style>