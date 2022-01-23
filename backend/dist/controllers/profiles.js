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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const utils = __importStar(require("../utils"));
const tokenErr = {
    code: 401,
    message: "Invalid token!"
};
const accountNameErr = {
    code: 400,
    message: "Account name missing or invalid!"
};
const verifyToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let hashedToken = utils.hash(token);
            let tokenRef = app_1.db.ref("/tokens").on('value', (tokenSnapshot) => {
                resolve(tokenSnapshot.hasChild(hashedToken));
            });
        });
    });
};
const getProfileIDFromToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let hashedToken = utils.hash(token);
            let tokenRef = app_1.db.ref("/tokens/" + hashedToken).on('value', (tokenSnapshot) => {
                resolve(tokenSnapshot.val());
            });
        });
    });
};
// Get a profile by Token
const getProfileByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token
    let tokenValid = yield verifyToken(req.get("Authorization"));
    if (tokenValid) {
        // Get profile ID from query param
        let profileID = yield getProfileIDFromToken(req.get("Authorization"));
        // Get profile from database
        let profileRef = app_1.db.ref('/profiles/' + profileID);
        profileRef.on('value', (profileSnapshot) => {
            let profileAccounts = profileSnapshot.val();
            let profile = {
                id: profileID,
                accounts: profileAccounts
            };
            return res.status(200).json(profile);
        });
    }
    else {
        return res.status(tokenErr.code).json(tokenErr);
    }
});
// Add account to a profile by Token
const addToProfileByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token
    if (yield verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = yield getProfileIDFromToken(req.get("Authorization"));
        // Add new account to profile
        let newAccount = req.body;
        let accountsRef = app_1.db.ref('/profiles/' + profileID);
        accountsRef.on('value', (accountSnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            let accounts = accountSnapshot.val();
            if (accounts != null) {
                accounts.push(newAccount);
            }
            else {
                accounts = [newAccount];
            }
            accountsRef.set([newAccount]);
            return res.status(200).json(newAccount);
        }));
    }
    else {
        return res.status(tokenErr.code).json(tokenErr);
    }
});
// Remove account from a profile by Token
const removeFromProfileByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token
    if (yield verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = yield getProfileIDFromToken(req.get("Authorization"));
        let accountName = req.query.name;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }
        // Remove account with given name from profile
        let accountRef = app_1.db.ref('/profiles/' + profileID);
        accountRef.on('value', (accountSnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            let accounts = accountSnapshot.val();
            if (accounts == null) {
                return res.status(accountNameErr.code).json(accountNameErr);
            }
            let index = -1;
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].name == accountName) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                accounts.splice(index, 1);
            }
            if (!accounts.length) {
                yield accountRef.set(null);
            }
            else {
                yield accountRef.set(accounts);
            }
            return res.status(200);
        }));
    }
    else {
        return res.status(tokenErr.code).json(tokenErr);
    }
});
// Update account in a profile by Token only
const updateProfileByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token
    if (yield verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = yield getProfileIDFromToken(req.get("Authorization"));
        req.params.id;
        let accountName = req.query.name;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }
        let newAccount = req.body;
        // Update account with given name from profile
        let accountRef = app_1.db.ref('/profiles/' + profileID);
        accountRef.on('value', (accountSnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            let accounts = accountSnapshot.val();
            const index = accounts.indexOf(accountName);
            if (index > -1) {
                accounts[index] = newAccount;
            }
            yield accountRef.set(accounts);
            return res.status(200).json(newAccount);
        }));
    }
    else {
        return res.status(tokenErr.code).json(tokenErr);
    }
});
exports.default = { getProfileByToken, addToProfileByToken, removeFromProfileByToken, updateProfileByToken };
//# sourceMappingURL=profiles.js.map