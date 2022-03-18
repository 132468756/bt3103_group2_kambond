// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ZhuHao's database
const firebaseConfig = {
  apiKey: "AIzaSyDIpw5m27hVCzO-OLtwZTM_hMHcX5jHoQc",
  authDomain: "demofiredev.firebaseapp.com",
  projectId: "demofiredev",
  storageBucket: "demofiredev.appspot.com",
  messagingSenderId: "75003976660",
  appId: "1:75003976660:web:13dd0e0b7c38bf1988d441",
};

// Ruiqian's database
// const firebaseConfig = {
//   apiKey: "AIzaSyBf8mMG5FCe52mZQuvffsNHPDbfvhOgAOU",
//   authDomain: "democpp-6ab11.firebaseapp.com",
//   projectId: "democpp-6ab11",
//   storageBucket: "democpp-6ab11.appspot.com",
//   messagingSenderId: "99881103653",
//   appId: "1:99881103653:web:9e20d2029a65f0aab12acc",
// };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
