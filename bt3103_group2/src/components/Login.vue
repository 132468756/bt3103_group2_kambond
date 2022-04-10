<template>
  <div class="login">
    <br><br><br><br><br>
    <div style="text-align: center" id="loginComponent">
      <br><br>
      <h1 id="login-title">LOG IN</h1>
      <div id="notice">Start your journey with KamBond!</div>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import firebase from "@/uifire.js"
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name:"Login",
    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        if(!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        
        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
        }   
        ui.start("#firebaseui-auth-container",uiConfig)
    }
}
</script>

<style scoped>
#firebaseui-auth-container {
  margin-top: 50px;
  margin-bottom: 50px;
  display: inline-block;
}

#login-title {
  text-align: center;
  color: rgb(25, 64, 80); /* black */
  text-align: center;
}

.login {
  text-align: center;
  height: 870px;
}

#notice {
  text-align: center;
  color: rgb(25, 64, 80);
  font-style: italic;
  font-weight: bold;
  margin-top: 30px;
}

#loginComponent {
  width: 30%;
  height: 520px;
  border-radius: 25px;
  margin-left: 35%;

  background-image: url("~@/assets/hand-paint.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;

  overflow-y: scroll;
}

#loginComponent::-webkit-scrollbar {
  display: none;
}
</style>