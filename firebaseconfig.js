// firebaseconfig.js
const firebaseConfig = {
  apiKey: "AIzaSyDyj1nr93dtoAgvsLbty6Xs2GCW1T54AO4",
  authDomain: "attic-4ae31.firebaseapp.com",
  projectId: "attic-4ae31",
  storageBucket: "attic-4ae31.appspot.com", 
  messagingSenderId: "259372678655",
  appId: "1:259372678655:web:df9c03e07e022392837bca",
  measurementId: "G-2WWH3YVXT5",
  databaseURL: "https://attic-4ae31-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized via firebaseconfig.js");
} else if (typeof firebase !== 'undefined' && firebase.apps.length) {
    console.log("Firebase was already running.");
}

