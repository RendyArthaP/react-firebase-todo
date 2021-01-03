import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBG6etUoaSOnCOYgNheBkQEful8zbcwJEg",
  authDomain: "react-todo-app-d1ba9.firebaseapp.com",
  projectId: "react-todo-app-d1ba9",
  storageBucket: "react-todo-app-d1ba9.appspot.com",
  messagingSenderId: "506720396757",
  appId: "1:506720396757:web:390d6f4029dbf7f5dfc95c",
  measurementId: "G-511R7T6ZTR"
});

const db = firebaseApp.firestore();

export default db;