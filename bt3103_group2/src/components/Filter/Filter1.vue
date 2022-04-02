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
        {id: "Food & Drinks"},
        {id: "Health & Nutrition"},
        {id: "Hobbies & Toys"},
        {id: "Mobile Phones & Gadgets"},
        {id: "Photography"},
        {id: "Sports Equipment"},
        {id: "Tickets & Vouchers"},
        {id: "Learning & Enrichment"},
        {id: "Video Gaming"},
        {id: "Fashion"},
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
  margin: 10px 1px 10px 10px;
}

#checkboxes label {
  margin: 10px 20px 10px 5px;
}

#name {
  background-color: rgba(239, 220, 198, 0.9);
  text-align: center;
  width: 180px;
  border: transparent;
  border-top-left-radius: 10px;
}

#checkboxes {
  background-color: rgba(253, 231, 208, 0.7);
  padding: 10px;
  width: 2000px;
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