// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ZhuHao's database
// const firebaseConfig = {
//   apiKey: "AIzaSyDIpw5m27hVCzO-OLtwZTM_hMHcX5jHoQc",
//   authDomain: "demofiredev.firebaseapp.com",
//   projectId: "demofiredev",
//   storageBucket: "demofiredev.appspot.com",
//   messagingSenderId: "75003976660",
//   appId: "1:75003976660:web:13dd0e0b7c38bf1988d441",
// };

// Ruiqian's database
const firebaseConfig = {
  apiKey: "AIzaSyBjoPJfAHa29ZI1qUWLoiH5FOubMhmMPwE",
  authDomain: "kambond-2515f.firebaseapp.com",
  projectId: "kambond-2515f",
  storageBucket: "kambond-2515f.appspot.com",
  messagingSenderId: "754107833957",
  appId: "1:754107833957:web:469f855f057ad71069308c",
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
// const storage = getStorage(App);

// export default { App, storage } ;
export default App;
