<template>
    <div id = "navigation">
        <b-navbar variant="faded" type="light">
            <b-navbar-brand href="#">
                <img src = "@/assets/logo.jpeg" class="d-inline-block align-top" alt="cannotfind" />
                <div class = "firstnavis">
                <a href= "/">Home</a>
                <a href= "/borrow">Borrow</a>
                <a href = "/lend">Home</a>
                <a href= "/signup">Sign in</a>
                <a class = "secondnavis" href = "/login">Log in</a>
                <a>
                </div>
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>

export default{};
</script>
<style>
.firstnavis {
  overflow: hidden;
  background-color: white;
}
.firstnavis a {
  float: left;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.firstnavis a.hover {
  background-color: white;
  color:blue;
}
.firstnavis a.secondnavis {
  background-color: black;
  color: white;
}
</style>