import express from 'express';
import admin from 'firebase-admin';
import path from 'path';
const app = express();

// Import validator middleware
import * as OpenApiValidator from 'express-openapi-validator';

// Set up body parsers
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// Serve openapi spec
const spec = path.join(__dirname, 'tap_in.yaml');

// Register openapi validator
app.use(
    OpenApiValidator.middleware({
        apiSpec: './tap_in.yaml',
        validateRequests: true, // (default)
        validateResponses: true, // false by default
    }),
);

// Register error handler
app.use((err, req, res, next) => {
    // format error
    console.error(err);  // dump error to console for debug
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    return console.log(`Server listening on port ${PORT}...`);
});

// Firebase stuff - for later

// Firebase admin sdk
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_RT_DB
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
export let db = admin.database();

// Example fetching the entire JSON tree:
let ref = db.ref("/");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});
