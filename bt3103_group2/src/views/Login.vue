<template>
  <div style="text-align:center;">
    <h1 id="mainHead">LOG IN</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="pagecontent">
      Do not have an account? Create an account first!
    </div>
  </div>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: "Login",

  mounted() {
    //Calling the ui instance
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui){
      //Only create the instance once
      //Intialize the FirebaseUI Widget using Firebase.
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiConfig = {
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    };

    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style scoped>
#firebaseui-auth-container{
  margin-top: 50px;
  margin-bottom: 50px;
  display:inline-block;
}

#mainHead{
  text-align: center;
}

</style>