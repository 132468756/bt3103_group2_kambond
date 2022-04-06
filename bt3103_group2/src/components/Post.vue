<template>
  <form id="post">
      
    <div class="flex-box">
      <div id = "title">{{ title }}</div>
      <div id = "statusbar">{{ status }}</div>
    </div>

    <div id = "description"> {{ description }} </div>
    <div id = "category"> {{category}}</div>
    <hr />
    <div id="owner">
      <img src="@/assets/profilephoto.jpeg" alt="cannotfind" id = "profilePicture"/>
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
  background-color: rgba(233,233,233,0.8);
  border-radius: 10px;
  text-align: right;
  font-size: 11px;
  border: 10px;
  border-radius: 10px;
  width: 60px;
  height: 20px;
  position: relative;
  float: right;
}

#title{
  text-align:left;
  margin-right: 10%;
  font-size: 1.8vw;
  font-weight: bold;
  text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.4);;
  width: 50%;
}

#owner {
  display: inline-flex;
  justify-content:left;
  align-items:center;
  margin-top: 2%;
}

#user{
  margin-left: 3%;
  font-size:1.6vw;
}

#post {
  display: inline-block;
  border: 0px;
  width: 35vw;
  height: 13.2vh;
  padding: 10px;
  margin: 20px;
}
#statusbar {
  text-align:center;
  font-size: 13px;
  background-color:#ffecda;
  border: transparent;
  box-shadow: 1px 1px 1px 1px rgba(53, 55, 57, 0.525);
  height:15px;
  width: 100px;
  border-radius: 5px;
}

#profilePicture {
  width: 20%;
  height: 20%;
}
</style>