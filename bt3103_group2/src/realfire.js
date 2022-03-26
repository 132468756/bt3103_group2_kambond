// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ZhuHao's database
const firebaseConfig = {
  apiKey: "AIzaSyDIpw5m27hVCzO-OLtwZTM_hMHcX5jHoQc",
  authDomain: "demofiredev.firebaseapp.com",
  databaseURL: "https://demofiredev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "demofiredev",
  storageBucket: "demofiredev.appspot.com",
  messagingSenderId: "75003976660",
  appId: "1:75003976660:web:142737505cbd375a88d441"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export{ firebase, auth, database}
