//importing firebase databse required packages
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; //getFirestore is imported to establish the connection with the database;

const firebaseConfig = { // firebase configuration copied from project sdk settings on firebase control
  apiKey: "AIzaSyDVypqf4PB7HdkFLkmhSYmILD6qT75TBgs",
  authDomain: "crud-demo-23aeb.firebaseapp.com",
  projectId: "crud-demo-23aeb",
  storageBucket: "crud-demo-23aeb.appspot.com",
  messagingSenderId: "857972409077",
  appId: "1:857972409077:web:154ce99a94021d35697bbc"
};

  
const firebaseApp = initializeApp(firebaseConfig); //initializing app with firebase

const db = getFirestore(); // establishing connection with firestore i.e firebase database

export {db};
