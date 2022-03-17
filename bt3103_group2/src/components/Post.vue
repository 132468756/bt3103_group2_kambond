<template>
  <form id="post">
      
    <div class="flex-box">
      <div id = "title">{{ title }}</div>
      <div id = "statusbar">{{status}}</div>
      <button @click="toDetail" id= "borrowBtn">Borrow</button>
    </div>
    <hr />
    <div id="owner">
      <img src="@/assets/profilephoto.jpeg" alt="cannotfind" />
      <div id = "user">{{ owner }}</div>
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
    toBorrow() {
      console.log("Go to post detail page");
    },
  },
};
</script>

<style>
.flex-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:40%;
}

#borrowBtn {
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
  width:40%;
  font-weight:bold;
  font-size:150%;
}

#owner {
  display: inline-flex;
  justify-content:left;
  align-items:center;
  margin-top: 2%;
}

#user{
  margin-left: 3%;
  font-size:3vw;
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
  vertical-align:middle;
  padding-top: 5%;
  background-color:#FFB7BB;
  border-radius:10px;
  border:2px solid;
  height:40px;
  width: 30%;
}

img {
  width: 50px;
  height: 50px;
}
</style>