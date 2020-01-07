export interface IUser {
    uid: string | number;
    loginOptions?: ILoginOptions;
    username: string;
    nickname?: string;
    alias?: string;
    gender?: "male" | "female" | "notknown" | "others";
    age?: number;
    others?: object;
}

export interface ILoginOptions {
    email?: string | string[];
    phone?: string | string[];
}
