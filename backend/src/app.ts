import express from 'express';
import {credential} from "firebase-admin";
import {getFirestore} from "firebase-admin/lib/firestore";
const app = express();
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

// Firebase admin sdk
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_RT_DB
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// Example fetching the entire JSON tree:
var ref = db.ref("/");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    return console.log(`Server listening on port ${PORT}...`);
});
