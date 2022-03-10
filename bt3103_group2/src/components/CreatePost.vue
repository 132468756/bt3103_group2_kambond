<template>
  <form>
    <label> Title </label>
    <input type="title" required v-model="title" />

    <label> Purpose </label>
    <select required v-model="purpose">
      <option>Borrowing</option>
      <option>Lending</option>
    </select>

    <label> Description </label>
    <input type="desription" required v-model="desription" />

    <label> Category </label>
    <select required v-model="category">
      <option>Beauty & Personal Care</option>
      <option>Bulletin Board</option>
      <option>Computers & Tech</option>
      <option>Food & Drinks</option>
      <option>Health & Nutrition</option>
      <option>Hobbies & Toys</option>
      <option>Mobile Phones & Gadgets</option>
      <option>Photography</option>
      <option>Sports Equipment</option>
      <option>Tickets & Vouchers</option>
      <option>Learning & Enrichment</option>
      <option>Video Gaming</option>
      <option>Fashion</option>
      <option>Exchange Currency</option>
      <option>Musical Instrument</option>
      <option>Others</option>
    </select>


    <label> Location </label>
    <select required v-model="location">
      <option>PGP / PGPR</option>
      <option>Utown</option>
      <option>RVRC</option>
      <option>Temasek Hall</option>
      <option>Sheares Hall</option>
      <option>KEVII Hall</option>
      <option>Eusoff Hall</option>
      <option>Raffles Hall</option>
      <option>Kent Ridge Hall</option>
      <option>Others</option>
    </select>
  </form>
  <p>Title {{ title }}</p>
  <p>Purpose {{ purpose }}</p>
  <p>Description {{ desription }}</p>
  <p>Category {{ category }}</p>
   <p>Location {{ location }}</p>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      purpose: "",
      desription: "",
      category:"",
      location:""
    };
  },
};
</script>

<style>
</style>