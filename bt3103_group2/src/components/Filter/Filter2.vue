<template>
  <div id="checked">Checked names: {{ checkedLocation }}</div>
  <div class="whole">
    <div id="name">
      <h3>Location</h3>
    </div>
    <div id="checkboxes">
      <input type="checkbox" @change="selectAll" v-model="allSelected" />Select
      All
      <class v-for="option of optionlist" :key="option.id">
        <label
          ><input
            type="checkbox"
            v-model="checkedLocation"
            :value="option.id"
            @change="updateCheckall()"
          />{{ option.id }}</label
        >
      </class>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter2",
  data() {
    return {
      checkedLocation: [],
      allSelected: false,
      optionlist: [
        { id: "PGP/PGPR" },
        { id: "Utown" },
        { id: "RVRC" },
        { id: "Temasek Hall" },
        { id: "Shears Hall" },
        { id: "KEVII Hall" },
        { id: "Eusoff Hall" },
        { id: "Raffles Hall" },
        { id: "Kent Ridge Hall" },
        { id: "Others" },
      ],
    };
  },
  methods: {
    async selectAll() {
      if (this.allSelected) {
        const checkedNames = this.optionlist.map((option) => option.id);
        this.checkedLocation = checkedNames;
      } else {
        this.checkedLocation = [];
      }
    },

    updateCheckall: function () {
      if (this.optionlist.length == this.checkedLocation.length) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
    },
  },
  watch: {
    checkedLocation() {
      this.$emit("change", this.checkedLocation);
    },
  },
};
</script>



<style scoped>
#checkboxes input {
  margin: 10px 12px 10px 10px;
}

#checkboxes label {
  margin: 10px 10px 10px 0;
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
  border: transparent;
  height: 0px;
  color: transparent;
}
</style>