import express from 'express';
import admin from 'firebase-admin';
import path from 'path';
import { engine } from 'express-handlebars';
const app = express();
import * as types from './types';

// Firebase admin sdk
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_RT_DB
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
export let db = admin.database();

// Controllers
import userController from "./controllers/users";
import profileController from "./controllers/profiles";
import sharingController from "./controllers/share";

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
        apiSpec: spec,
        validateRequests: true, // (default)
        //validateResponses: true, // false by default
    })
);

// Register error handler
app.use((err, req, res, next) => {
    // format error
    console.error(err);  // dump error to console for debug
    res.status(err.status || 500).json({
        message: err.message,
        code: (err.status || 500)
    });
});

// Pug view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// User routes
app.post('/register', userController.registerUser);
app.post('/authenticate', userController.authenticateUser);

// Profile routes
app.get('/profile', profileController.getProfileByToken);
app.post('/profile/add', profileController.addToProfileByToken);
app.post('/profile/remove', profileController.removeFromProfileByToken);
app.post('/profile/update', profileController.updateProfileByToken)

// Sharing routes
app.post('/share', sharingController.generateShareLink);
app.get('/connect/:id', sharingController.getConnectPage);

app.get('/', (req, res) => {
    res.send("ok");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    return console.log(`Server listening on port ${PORT}...`);
});
