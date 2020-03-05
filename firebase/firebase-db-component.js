import * as firebase from "firebase";    
import "firebase/auth";
import "firebase/firestore";
 
 const firebaseConfig = {
    apiKey: "AIzaSyDdC4GSyLi01EnW83jZ_aPWrCQoWXOCLgE",
    authDomain: "expense-tracker-a1ebf.firebaseapp.com",
    databaseURL: "https://expense-tracker-a1ebf.firebaseio.com",
    projectId: "expense-tracker-a1ebf",
    storageBucket: "expense-tracker-a1ebf.appspot.com",
    messagingSenderId: "309314183970",
    appId: "1:309314183970:web:712bcf965f4b6c33b37b7b",
    measurementId: "G-13JLZEQ2V6"
  };
  
  // Initialize Firebase
  let app = firebase.initializeApp(firebaseConfig)
  
  export default app;
  