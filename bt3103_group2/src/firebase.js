// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIpw5m27hVCzO-OLtwZTM_hMHcX5jHoQc",
  authDomain: "demofiredev.firebaseapp.com",
  projectId: "demofiredev",
  storageBucket: "demofiredev.appspot.com",
  messagingSenderId: "75003976660",
  appId: "1:75003976660:web:13dd0e0b7c38bf1988d441"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;