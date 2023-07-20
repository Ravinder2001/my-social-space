import config from "./Utils/config";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
};
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(app);

const googleAuth = new firebase.auth.GoogleAuthProvider();

export { firebase, app, googleAuth, auth };
