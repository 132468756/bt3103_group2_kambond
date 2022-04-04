<script>

export default {
  name: "filter1",
  data() {
    return {
      checkedNames: [],
      allSelected: false,
      optionlist: [
        {id: "Beauty & Personal Care"},
        {id: "Bulletin Board"},
        {id: "Computers & Tech"},
        {id: "Tickets & Vouchers"},
        {id: "Food & Drinks"},
        {id: "Fashion"},
        {id: "Health & Nutrition"},
        {id: "Hobbies & Toys"},
        {id: "Photography"},
        {id: "Mobile Phones & Gadgets"},
        {id: "Sports Equipment"},
        {id: "Learning & Enrichment"},
        {id: "Video Gaming"},
        {id: "Exchange Currency"},
        {id: "Musical Instrument"},
        {id: "Others"},
      ],

    };
  },
  methods: {
  async selectAll() {
    if(this.allSelected) {
      const checkedNames = this.optionlist.map((option)=> (option.id));
      this.checkedNames = checkedNames;
    }
    else {
      this.checkedNames = [];
    }
  },

  updateCheckall: function(){
    if(this.optionlist.length == this.checkedNames.length){
        this.allSelected= true;
    }else{
        this.allSelected = false;
    }
  },

  },
  watch: {
    async checkedNames() {
      this.$emit('change', this.checkedNames)
      /*const qTitle = query(
        collection(db, "Posts"),
        where("category", "in", this.checkedNames),where("purpose","==","Lending")
      );
      const queryTitle = await getDocs(qTitle);
      console.log(queryTitle);
      queryTitle.forEach((doc) => {
        this.postlist.push(doc.data());
        console.log(doc);
      });
      console.log(this.postlist);*/
    }
  },
};
</script>

<template>
  <!-- <div id="checked">Checked names: {{ checkedNames }}</div> -->
  <div class="whole">
    <div id="name">
      <h3>Category</h3>
    </div>
  <div id = "checkboxes">
  <input type="checkbox" @change="selectAll" v-model= "allSelected">Select All
  <class v-for = "option of optionlist" :key = "option.id">
          <label><input type = "checkbox" v-model = "checkedNames" :value = "option.id" @change="updateCheckall()" />{{option.id}}</label>
      </class>
    </div>
  </div>
</template>

<style scoped>
#checkboxes input {
  margin: 10px 15px 10px 10px;
}

#checkboxes label {
  margin: 10px 10px 10px 0;
}

#name {
  background-color: rgba(180, 219, 237, 0.9);
  text-align: center;
  width: 15vw;
  border: transparent;
  border-top-left-radius: 10px;
}

#checkboxes {
  background-color: rgba(209, 226, 234, 0.9);
  padding: 10px;
  width: 85vw;
  border: transparent;
  text-align: left;
  border-top-right-radius: 10px;
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