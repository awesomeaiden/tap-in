import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as types from '../types';
import { db } from '../app'
import * as utils from '../utils'

const tokenErr: types.Error = {
    code: 401,
    message: "Invalid token!"
}

const accountNameErr: types.Error = {
    code: 400,
    message: "Account name missing or invalid!"
}

const verifyToken = async function(token: string): Promise<boolean> {
    return new Promise((resolve) => {
        let hashedToken = utils.hash(token);
        let tokenRef = db.ref("/tokens").on('value', (tokenSnapshot) => {
            resolve(tokenSnapshot.hasChild(hashedToken));
        });
    });
}

const getProfileIDFromToken = async function(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let hashedToken = utils.hash(token);
        let tokenRef = db.ref("/tokens/" + hashedToken).limitToFirst(1).on('value', (tokenSnapshot) => {
            resolve(tokenSnapshot.val());
        })
    })
}

// Get a profile by ID
const getProfileByID = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = req.params.id;
        if (profileID == null) {
            profileID = await getProfileIDFromToken(req.get("Authorization"));
        }

        // Get profile from database
        let profileRef = db.ref('/profiles/' + profileID);
        profileRef.on('value', (profileSnapshot) => {
            return res.status(200).json(profileSnapshot.val());
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Get a profile by Token only
const getProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    let tokenValid = await verifyToken(req.get("Authorization"));
    if (tokenValid) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));

        // Get profile from database
        let profileRef = db.ref('/profiles/' + profileID);
        profileRef.on('value', (profileSnapshot) => {
            return res.status(200).json(profileSnapshot.val());
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Add account to a profile by ID
const addToProfileByID = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = req.params.id;
        if (profileID == null) {
            profileID = await getProfileIDFromToken(req.get("Authorization"));
        }

        // Push new account to profile
        let accountsRef = db.ref('/profiles/' + profileID);
        let newAccount = req.body;
        await accountsRef.push(newAccount);
        return res.status(200).json(newAccount);
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Add account to a profile by Token only
const addToProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));

        // Push new account to profile
        let accountsRef = db.ref('/profiles/' + profileID);
        let newAccount = req.body;
        await accountsRef.push(newAccount);
        return res.status(200).json(newAccount);
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Remove account from a profile by ID
const removeFromProfileByID = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = req.params.id;
        if (profileID == null) {
            profileID = await getProfileIDFromToken(req.get("Authorization"));
        }
        let accountName = req.params.accountName;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }

        // Remove account with given name from profile
        let accountRef = db.ref('/profiles/' + profileID);
        accountRef.on('value', async (accountSnapshot) => {
            let accounts = accountSnapshot.val();
            const index = accounts.indexOf(accountName);
            if (index > -1) {
                accounts.splice(index, 1);
            }
            await accountRef.set(accounts);
            return res.status(200);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Remove account from a profile by Token only
const removeFromProfileByToken = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = await getProfileIDFromToken(req.get("Authorization"));
        let accountName = req.params.accountName;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }

        // Remove account with given name from profile
        let accountRef = db.ref('/profiles/' + profileID);
        accountRef.on('value', async (accountSnapshot) => {
            let accounts = accountSnapshot.val();
            const index = accounts.indexOf(accountName);
            if (index > -1) {
                accounts.splice(index, 1);
            }
            await accountRef.set(accounts);
            return res.status(200);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Update account in a profile by ID
const updateProfileByID = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get profile ID from query param
        let profileID = req.params.id;
        if (profileID == null) {
            profileID = await getProfileIDFromToken(req.get("Authorization"));
        }
        let accountName = req.params.accountName;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }
        let newAccount = req.body;

        // Update account with given name from profile
        let accountRef = db.ref('/profiles/' + profileID);
        accountRef.on('value', async (accountSnapshot) => {
            let accounts = accountSnapshot.val();
            const index = accounts.indexOf(accountName);
            if (index > -1) {
                accounts[index] = newAccount;
            }
            await accountRef.set(accounts);
            return res.status(200).json(newAccount);
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
        let accountName = req.params.accountName;
        if (accountName == null) {
            return res.status(accountNameErr.code).json(accountNameErr);
        }
        let newAccount = req.body;

        // Update account with given name from profile
        let accountRef = db.ref('/profiles/' + profileID);
        accountRef.on('value', async (accountSnapshot) => {
            let accounts = accountSnapshot.val();
            const index = accounts.indexOf(accountName);
            if (index > -1) {
                accounts[index] = newAccount;
            }
            await accountRef.set(accounts);
            return res.status(200).json(newAccount);
        });
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

export default { getProfileByID, getProfileByToken, addToProfileByID, addToProfileByToken, removeFromProfileByID,
                 removeFromProfileByToken, updateProfileByID, updateProfileByToken };
