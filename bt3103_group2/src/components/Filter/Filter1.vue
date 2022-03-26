<script>
import firebaseApp from "../../firebase.js";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  name: "filter1",
  data() {
    return {
      checkedNames: [],
      postlist:[],
    };
  },
  watch: {
    async checkedNames() {
      const qTitle = query(
        collection(db, "Posts"),
        where("category", "in", this.checkedNames),where("status","not-in",["Want to lend","Has lent"]),where("purpost","==","Lending")
      );
      const queryTitle = await getDocs(qTitle);
      console.log(queryTitle);
      queryTitle.forEach((doc) => {
        this.postlist.push(doc.data());
        console.log(doc);
      });
      console.log(this.postlist);
    }
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
}

#checked {
  background-color: rgba(241, 238, 255, 0.582);
  padding: 5px;
  border: 1px solid black;
}
</style>