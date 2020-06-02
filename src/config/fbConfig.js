import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBeCoVkWQmxRNgXf1WjXMqGAIzPNuX5AtQ",
    authDomain: "myprojectdemo-ae846.firebaseapp.com",
    databaseURL: "https://myprojectdemo-ae846.firebaseio.com",
    projectId: "myprojectdemo-ae846",
    storageBucket: "myprojectdemo-ae846.appspot.com",
    messagingSenderId: "68781107222",
    appId: "1:68781107222:web:44b7084fd0d1c22020ad37",
    measurementId: "G-S3YLG0CDBH"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;