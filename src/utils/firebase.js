import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCy0N9LXfy-BG2uwqQpklJ50oJEGD0OskM",
  authDomain: "tp-music-store.firebaseapp.com",
  projectId: "tp-music-store",
  storageBucket: "tp-music-store.appspot.com",
  messagingSenderId: "518741161316",
  appId: "1:518741161316:web:5193576cc95e6930fc7671",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db };
