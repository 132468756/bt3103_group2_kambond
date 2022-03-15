<template>
  <form id="post">
      
    <div class="flex-box">
      <h2>title:{{ title }}</h2>
      <button @click="toDetail" id="BorrowBtn">Borrow</button>
    </div>
    <hr />
    <div id="owner">
      <img id="profilePhoto" src="@/assets/profilephoto.jpeg" alt="cannotfind" />
      <h3>owner:{{ owner }}</h3>
    </div>
    
  </form>
  <Status />
</template>

<script>
import Status from "./Status.vue";
export default {
  component: {
    Status,
  },
  data() {
    return {
      title: "Charger",
      owner: "someone",
    };
  },
  methods: {
    toDetail() {
      console.log("Go to post detail page");
    },
  },
};
</script>

<style>
.flex-box {
  display: flex;
  justify-content: space-between;
}

#BorrowBtn {
  background-color: black;
  color: white;
  text-align: center;
  border: 10px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  position: relative;
  float: right;
}
#owner {
  display: inline-flex;
}

#post {
  display: inline-block;
  border: 2px solid rgb(243, 20, 20);
  border-radius: 10px;
  background-color: blue;
  width: 400px;
  height: 150px;
  padding: 10px;
}

.profilePhoto {
  width: 50px;
  height: 50px;
}
</style>