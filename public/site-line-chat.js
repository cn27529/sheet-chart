let config = {
    apiKey: "AIzaSyAg0tGWsKqtjZcRnFPrBroVn8r111Q4EKY",
    authDomain: "bkappdb.firebaseapp.com",
    databaseURL: "https://bkappdb.firebaseio.com",
    projectId: "bkappdb",
    storageBucket: "bkappdb.appspot.com",
    messagingSenderId: "1087681092838"
};
firebase.initializeApp(config);

let urlinfo = new URL(window.location.href)
console.log(urlinfo)