<template>
  <form @submit.prevent="createPost" method="post" id="createpostform">
    <label> Title </label>
    <input type="title" required v-model="post.title" />

    <label> Purpose </label>
    <select required v-model="post.purpose">
      <option>Borrowing</option>
      <option>Lending</option>
    </select>

    <label> Description </label>
    <input type="desription" required v-model="post.desription" />

    <label> Category </label>
    <select required v-model="post.category">
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
    <select required v-model="post.location">
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

    <div class="submit">
    <button> Create Post </button>
  </div>
  </form>
  <p>Title {{ title }}</p>
  <p>Purpose {{ purpose }}</p>
  <p>Description {{ desription }}</p>
  <p>Category {{ category }}</p>
  <p>Location {{ location }}</p>

  
</template>

<script>
import axios from 'axios'
export default {
  name: "CreatePost",
  data() {
    return {
      post:{
      title: "",
      purpose: "",
      desription: "",
      category: "",
      location: "",
      }
    };
  },
methods: {
  createPost(e) {
    axios.post("/createpost",this.post)
    .then((result) => {
      console.warn(result)
    })
    .catch(function (error) {
      console.log(error)
      console.warn("Create Post error")
    })
    e.preventDefault()
  }
}
};
</script>

<style scoped>
#createpostform {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(205, 243, 213);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: rgb(31, 34, 34);
  display: inline-block;
  margin: 25px 0 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

button {
  background-color: blue;
  border:0;
  padding:10px 20px;
  margin-top:20px;
  color:aliceblue;
  border-radius: 20px;
}

.submit {
  text-align: center;
}
</style>