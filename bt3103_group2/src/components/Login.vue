<template>
  <div class="login">
    <div style="text-align: center">
      <br /><br />
      <h1 id="login-title">LOG IN</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="notice">Do not have an account? Create an account first!</div>
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
  color: rgb(255, 247, 240); /* black */
  text-align: center;
  text-shadow: 1px 1px black;
}

.login {
  /* The image used */
  /* background-image: url("~@/assets/login-bg.jpg"); */

  /* Control the height of the image */
  /* min-height: 380px; */

  /* Center and scale the image nicely */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative; */
}

#notice {
  text-align: center;
  color: rgb(255, 247, 240);
  font-style: italic;
}
</style>