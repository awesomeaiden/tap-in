export interface Error {
    code: Number;
    message: String;
}

export interface ClientAuthToken {
    token: String;
}

export interface UserAuthenticationInfo {
    pass: String;
    email: String;
}

export interface UserBio {
    first: String;
    last: String;
}

export interface UserRegistrationInfo {
    auth: UserAuthenticationInfo;
    bio: UserBio;
}

export interface User {
    id: Number;
    email: String;
    passHash: String;
    bio: UserBio;
}

export enum AccountName {
    facebook,
    instagram,
    snapchat,
    twitter,
    linkedin,
    discord,
    youtube,
    phone,
    email
}

export interface Account {
    name: AccountName;
    link: String;
}

export interface Profile {
    id: Number;
    accounts: Array<Account>;
}
