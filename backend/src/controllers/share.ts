import { Request, Response, NextFunction } from 'express';
import * as types from '../types';
import { db } from '../app';
import * as utils from '../utils';
import { verifyToken, getProfileIDFromToken, tokenErr, accountNameErr }from './profiles';

// Generate share link with requested accounts
const generateShareLink = async (req: Request, res: Response, next: NextFunction) => {
    // Verify token
    if (await verifyToken(req.get("Authorization"))) {
        // Get requested accounts
        let reqAccounts = req.body;
        if (!reqAccounts.length || reqAccounts.length == 0) {
            return res.status(accountNameErr.code).json(accountNameErr);
        } else {
            // Get userID
            let profileID = await getProfileIDFromToken(req.get("Authorization"));
            // Generate unique connect page ID
            let pageID = utils.hash(reqAccounts.toString() + Date.now().toString());
            // Full url:
            let fullUrl = req.protocol + '://' + req.get('host') + "/connect/" + pageID;
            // Store page in database
            let connectRef = await db.ref("/connections/" + pageID);
            // pageID leads you to a list of accounts and what profile to get them from.
            // use this to generate the page when needed!
            await connectRef.set({
                accounts: reqAccounts,
                profile: profileID
            });
            return res.status(200).json(fullUrl);
        }
    } else {
        return res.status(tokenErr.code).json(tokenErr);
    }
};

// Serve profile sharing page to requesting user
const getConnectPage = async (req: Request, res: Response, next: NextFunction) => {
   // No token verification involved - just generate a page with the information needed and serve
    let pageID = req.params.id;
    // Get page details from the database, gather the necessary profile information, and generate the page
};

export default { generateShareLink, getConnectPage };
