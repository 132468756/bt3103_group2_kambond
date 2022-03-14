<script>
export default {
  name: "filter1",
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
      <h3>Category</h3>
    </div>

    <div id="checkboxes">
      <input
        type="checkbox"
        id="BP"
        value="Beauty & Personal Care"
        v-model="checkedNames"
      />
      <label for="BP">Beauty & Personal Care</label>

      <input
        type="checkbox"
        id="BB"
        value="Bulletin Board"
        v-model="checkedNames"
      />
      <label for="BB">Bulletin Board</label>

      <input
        type="checkbox"
        id="CT"
        value="Computers & Tech"
        v-model="checkedNames"
      />
      <label for="CT">Computers & Tech</label>

      <input
        type="checkbox"
        id="FD"
        value="Food & Drinks"
        v-model="checkedNames"
      />
      <label for="FD">Food & Drinks</label>

      <input
        type="checkbox"
        id="HN"
        value="Health & Nutrition"
        v-model="checkedNames"
      />
      <label for="HN">Health & Nutrition</label>

      <input
        type="checkbox"
        id="HT"
        value="Hobbies & Toys"
        v-model="checkedNames"
      />
      <label for="HT">Hobbies & Toys</label>

      <input
        type="checkbox"
        id="MG"
        value="Mobile Phones & Gadgets"
        v-model="checkedNames"
      />
      <label for="MG">Mobile Phones & Gadgets</label>

      <input
        type="checkbox"
        id="PG"
        value="Photography"
        v-model="checkedNames"
      />
      <label for="PG">Photography</label>

      <input
        type="checkbox"
        id="SE"
        value="Sports Equipment"
        v-model="checkedNames"
      />
      <label for="SE">Sports Equipment</label>
      <br />
      <input
        type="checkbox"
        id="TV"
        value="Tickets & Vouchers"
        v-model="checkedNames"
      />
      <label for="TV">Tickets & Vouchers</label>

      <input
        type="checkbox"
        id="LE"
        value="Learning & Enrichment"
        v-model="checkedNames"
      />
      <label for="LE">Learning & Enrichment</label>

      <input
        type="checkbox"
        id="VG"
        value="Video Gaming"
        v-model="checkedNames"
      />
      <label for="VG">Video Gaming</label>

      <input type="checkbox" id="FS" value="Fashion" v-model="checkedNames" />
      <label for="FS">Fashion</label>

      <input
        type="checkbox"
        id="EC"
        value="Exchange Currency"
        v-model="checkedNames"
      />
      <label for="EC">Exchange Currency</label>

      <input
        type="checkbox"
        id="MI"
        value="Musical Instrument"
        v-model="checkedNames"
      />
      <label for="MI">Musical Instrument</label>

      <input
        type="checkbox"
        id="others"
        value="Others"
        v-model="checkedNames"
      />
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