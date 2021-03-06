import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as types from '../types';
import { db } from '../app'
import * as utils from '../utils'

export const tokenErr: types.Error = {
    code: 401,
    message: "Invalid token!"
}

export const accountNameErr: types.Error = {
    code: 400,
    message: "Account name missing or invalid!"
}

export const verifyToken = async function(token: string): Promise<boolean> {
    return new Promise((resolve) => {
        let hashedToken = utils.hash(token);
        let tokenRef = db.ref("/tokens");
        tokenRef.on('value', (tokenSnapshot) => {
            resolve(tokenSnapshot.hasChild(hashedToken));
        });
    });
}

export const getProfileIDFromToken = async function(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let hashedToken = utils.hash(token);
        let tokenRef = db.ref("/tokens/" + hashedToken).on('value', (tokenSnapshot) => {
            resolve(tokenSnapshot.val());
        });
    });
}

// Get a profile by Token
const getProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    let tokenValid = await verifyToken(req.get("Authorization"));
    if (tokenValid) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));

        // Get profile from database
        let profileRef = db.ref('/profiles/' + profileID);
        profileRef.on('value', (profileSnapshot) => {
            let profileAccounts = profileSnapshot.val();
            let profile: types.Profile = {
                id: profileID,
                accounts: profileAccounts
            }
            return res.status(200).json(profile);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Add account to a profile by Token
const addToProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));

        // Add new account to profile
        let newAccount = req.body;
        let accountsRef = await db.ref('/profiles/' + profileID);
        await accountsRef.transaction((currentAccounts) => {
            if (currentAccounts != null) {
                currentAccounts.push(newAccount);
            } else {
                currentAccounts = [newAccount];
            }
            return currentAccounts;
        }).then(() => {
            return res.status(200).json(newAccount);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Remove account from a profile by Token
const removeFromProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));
        let accountName = req.query.name;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }

        // Remove account with given name from profile
        let accountsRef = db.ref('/profiles/' + profileID);
        await accountsRef.transaction((currentAccounts) => {
            if (currentAccounts != null) {
               let index = -1;
               for (let i = 0; i < currentAccounts.length; i++) {
                   if (currentAccounts[i].name == accountName) {
                       index = i;
                       break;
                   }
               }
               if (index > -1) {
                   currentAccounts.splice(index, 1);
               }
               return currentAccounts
            }
            return currentAccounts;
        }).then(() => {
            return res.status(200).end();
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Update account in a profile by Token only
const updateProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));req.params.id;
        let accountName = req.query.name;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }
        let newAccount = req.body;

        // Update account with given name from profile
        let accountsRef = db.ref('/profiles/' + profileID);
        await accountsRef.transaction((currentAccounts) => {
            if (currentAccounts != null) {
                let index = -1;
                for (let i = 0; i < currentAccounts.length; i++) {
                    if (currentAccounts[i].name == accountName) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    currentAccounts[index] = newAccount;
                }
            }
            return currentAccounts;
        }).then(() => {
            return res.status(200).json(newAccount);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

export default { getProfileByToken, addToProfileByToken, removeFromProfileByToken, updateProfileByToken };
