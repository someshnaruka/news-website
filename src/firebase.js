// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfkSowdw7iDziv12H2q44rn-N1Z1DvW3Y",
  authDomain: "news-website-f1e01.firebaseapp.com",
  projectId: "news-website-f1e01",
  storageBucket: "news-website-f1e01.appspot.com",
  messagingSenderId: "976017782068",
  appId: "1:976017782068:web:b9802504939beb23ffa161",
  databaseURL:"https://news-website-f1e01-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);
export {auth,app,database};