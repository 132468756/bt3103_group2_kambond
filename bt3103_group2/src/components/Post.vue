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
  color: white;
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
  font-size: 2.3vw;
  font-weight: bold;
  text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.4);;
}

#owner {
  display: inline-flex;
  justify-content:left;
  align-items:center;
  margin-top: 2%;
}

#user{
  margin-left: 3%;
  font-size:2vw;
}

#post {
  display: inline-block;
  border: 0px;
  width: 40vw;
  height: 15vh;
  padding: 10px;
  margin: 10px;
}
#statusbar {
  text-align:center;
  font-size: 13px;
  background-color:#ffecda;
  border-radius:3px;
  border:1.5px solid;
  height:15px;
  width: 100px;
  
}

#profilePicture {
  width: 20%;
  height: 20%;
}
</style>