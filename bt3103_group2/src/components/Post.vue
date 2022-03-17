<template>
  <form id="post">
      
    <div class="flex-box">
      <div id = "title">title:{{ title }}</div>
      <div id = "statusbar">{{status}}</div>
      <button @click="toDetail">Borrow</button>
    </div>
    <hr />
    <div id="owner">
      <img src="@/assets/profilephoto.jpeg" alt="cannotfind" />
      <h3>owner:{{ owner }}</h3>
    </div>
    
  </form>
  
</template>

<script>

export default {
  props:{
      title: String,
      owner: String,
      status:String,
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
  align-items: center;
  height:40%;
}

button {
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

#title{
  margin:0px;
  font-size: 36px;
}

#owner {
  display: inline-flex;
}

#post {
  display: inline-block;
  border: 2px solid rgb(243, 20, 20);
  border-radius: 10px;
  width: 400px;
  height: 150px;
  padding: 10px;
  margin: 10px;
}
#statusbar {
  text-align:center;
  background-color:#FFB7BB;
  border-radius:10px;
  border:2px solid;
  height:50px;
  width: 100px;
}

img {
  width: 50px;
  height: 50px;
}
</style>