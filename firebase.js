import firebase from 'firebase/app'; 
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCxZWmS1cQxrL2R5-7kOYM2DlU6qogV_Kc",
    authDomain: "dharia-chat.firebaseapp.com",
    projectId: "dharia-chat",
    storageBucket: "dharia-chat.appspot.com",
    messagingSenderId: "983340445780",
    appId: "1:983340445780:web:285fa74343301b935dfdc1"
  };


let app;

if (firebase.apps.length === 0 ){

  app = firebase.initializeApp(firebaseConfig); 

} else{
  app = firebase.app(); 
}

const db = app.firestore();
const auth = firebase.auth();
export {db,auth}; 
