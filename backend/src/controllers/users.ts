import {NextFunction, Request, Response} from 'express';
import * as types from '../types';
import {AccountName} from '../types';
import {db} from '../app'
import * as utils from '../utils'

// Registers a new user in the database and initializes empty profile.
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    // Parse user registration info
    let regInfo: types.UserRegistrationInfo = req.body;
    let newUser: types.User = {
        email: "mailto:" + regInfo.auth.email,
        passHash: utils.hash(regInfo.auth.pass),
        bio: regInfo.bio
    };
    // Add user to database
    let usersRef = await db.ref("/users");
    let newUserRef = await usersRef.push(newUser);
    // Get unique user ID generated by firebase (base64 encode for URL purposes!!)
    let userID = utils.b64enc(newUserRef.key);

    // Create initial profile for new user
    let profileRef = await db.ref("/profiles");
    let emailAcc: types.Account = {
        name: AccountName[AccountName.email],
        link: newUser.email
    };
    await profileRef.update({
        [userID]: [emailAcc]
    });

    // Generate new API token
    let token = utils.hash(userID + Date.now().toString());
    let hashedToken = utils.hash(token);

    // Store hashedToken in database
    let tokensRef = await db.ref("/tokens");
    await tokensRef.update({
        [hashedToken]: userID
    });

    // Return token to user
    let tokenResponse: types.ClientAuthToken = {
        token: token
    };

    return res.status(201).json(tokenResponse);
};

// Authenticates an existing user
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    // Parse user authentication info
    let userAuth: types.UserAuthenticationInfo = req.body;
    let passHash = utils.hash(userAuth.pass);

    // Check info against database
    const usersRef = await db.ref('/users');
    usersRef.orderByChild('email').equalTo(userAuth.email).limitToFirst(1).on('child_added', (userSnapshot) => {
        // Check if passHash equals stored passHash
        const passRef = db.ref('/users/' + userSnapshot.key + '/passHash');
        passRef.on('value', (passSnapshot) => {
            if (passHash != passSnapshot.val()) {
                let err: types.Error = {
                    code: 401,
                    message: "invalid password!"
                }
                return res.status(err.code).json(err);
            } else {
                // Matches, issue NEW token
                let userID = utils.b64enc(userSnapshot.key);
                let token = utils.hash(userID + Date.now().toString());
                let hashedToken = utils.hash(token);

                // Store hashedToken in database
                let tokensRef = db.ref("/tokens");
                tokensRef.update({
                    [hashedToken]: userID
                });

                // Return token to user
                let tokenResponse: types.ClientAuthToken = {
                    token: token
                };

                return res.status(200).json(tokenResponse);
            }
        });
    });
};

export default { registerUser, authenticateUser };
