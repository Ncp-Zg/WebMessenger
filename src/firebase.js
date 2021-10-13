import firebase from "firebase"


const firebaseConfig = {
    apiKey: "SECRET",
    authDomain: "chat-app-805fa.firebaseapp.com",
    projectId: "chat-app-805fa",
    storageBucket: "chat-app-805fa.appspot.com",
    messagingSenderId: "452433303847",
    appId: "1:452433303847:web:b3632d96dc6370da393102"
  };

 const fireBase = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = fireBase.firestore()


export {auth,db}