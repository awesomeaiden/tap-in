export interface Error {
    code: number;
    message: string;
}

export interface ClientAuthToken {
    token: string;
}

export interface UserAuthenticationInfo {
    pass: string;
    email: string;
}

export interface UserBio {
    first: string;
    last: string;
}

export interface UserRegistrationInfo {
    auth: UserAuthenticationInfo;
    bio: UserBio;
}

export interface User {
    email: string;
    passHash: string;
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

let AccountColors = new Map<string, string>([
    ["key1", "value1"],
    ["key2", "value2"]
]);

export interface Account {
    name: string;
    link: string;
    color?: string;
}

export interface Profile {
    id: string;
    accounts: Array<Account>;
}
