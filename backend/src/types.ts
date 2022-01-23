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

export const AccountColors = new Map<number, string>([
    [AccountName.facebook, "4267B2"],
    [AccountName.instagram, "8A3AB9"],
    [AccountName.snapchat, "FFFC00"],
    [AccountName.twitter, "00ACEE"],
    [AccountName.linkedin, "0E76A8"],
    [AccountName.discord, "5865F2"],
    [AccountName.youtube, "FF0000"],
    [AccountName.phone, "349BEB"],
    [AccountName.email, "002D4F"]
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
