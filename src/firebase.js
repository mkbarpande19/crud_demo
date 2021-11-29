import firebase from "firebase/app";
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCYA3xgDITkdgDU3Vv-7GTesJQq2uU1HVI",
    authDomain: "crud-demo-16cb8.firebaseapp.com",
    projectId: "crud-demo-16cb8",
    storageBucket: "crud-demo-16cb8.appspot.com",
    messagingSenderId: "510481127912",
    appId: "1:510481127912:web:362acda9a058581b69ac5d"
  };

const firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();
