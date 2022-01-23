"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Controllers
const users_1 = __importDefault(require("./controllers/users"));
const profiles_1 = __importDefault(require("./controllers/profiles"));
// Import validator middleware
const OpenApiValidator = __importStar(require("express-openapi-validator"));
// Set up body parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: false }));
// Serve openapi spec
const spec = path_1.default.join(__dirname, 'tap_in.yaml');
// Register openapi validator
app.use(OpenApiValidator.middleware({
    apiSpec: spec,
    validateRequests: true, // (default)
    //validateResponses: true, // false by default
}));
// Register error handler
app.use((err, req, res, next) => {
    // format error
    console.error(err); // dump error to console for debug
    res.status(err.status || 500).json({
        message: err.message,
        code: (err.status || 500)
    });
});
// User routes
app.post('/register', users_1.default.registerUser);
app.post('/authenticate', users_1.default.authenticateUser);
// Profile routes
app.get('/profile', profiles_1.default.getProfileByToken);
app.post('/profile/add', profiles_1.default.addToProfileByToken);
app.post('/profile/remove', profiles_1.default.removeFromProfileByToken);
app.post('/profile/update', profiles_1.default.updateProfileByToken);
app.get('/', (req, res) => {
    res.send("ok");
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    return console.log(`Server listening on port ${PORT}...`);
});
// Firebase stuff
// Firebase admin sdk
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_RT_DB
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.db = firebase_admin_1.default.database();
//# sourceMappingURL=app.js.map