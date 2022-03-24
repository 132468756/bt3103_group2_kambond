<template>
  <form id="post">
      
    <div class="flex-box">
      <div id = "title">{{ title }}</div>
      <div id = "statusbar">{{ status }}</div>
      
    </div>
    <div id = "description"> {{ description }} </div>
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
      description: String,
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

.borrow-button {
  background-color: black;
  color: white;
  text-align: center;
  font-size: 11px;
  border: 10px;
  border-radius: 10px;
  width: 60px;
  height: 20px;
  position: relative;
  float: right;
}

#title{
  margin:0px;
  font-size: 30px;
  font-weight: 700;
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
  border: 2px solid rgb(0, 0, 0);
  width: 30%;
  height: 150px;
  padding: 10px;
  margin: 10px;
}
#statusbar {
  text-align:center;
  font-size: 10px;
  background-color:#ffecda;
  border-radius:3px;
  border:2px solid;
  height:15px;
  width: 100px;
}

img {
  width: 50px;
  height: 50px;
}
</style>