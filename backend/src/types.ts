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

export const AccountColor = new Map<string, string>([
    [AccountName[AccountName.facebook], "4267B2"],
    [AccountName[AccountName.instagram], "8A3AB9"],
    [AccountName[AccountName.snapchat], "FFFC00"],
    [AccountName[AccountName.twitter], "00ACEE"],
    [AccountName[AccountName.linkedin], "0E76A8"],
    [AccountName[AccountName.discord], "5865F2"],
    [AccountName[AccountName.youtube], "FF0000"],
    [AccountName[AccountName.phone], "349BEB"],
    [AccountName[AccountName.email], "002D4F"]
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
