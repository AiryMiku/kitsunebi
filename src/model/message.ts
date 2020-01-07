import { IUser } from "./user";

export type MessageType = "text" | "at" | "image" | "audio" | "link" | "others";

export interface IBaseMassage {
    type: string;
    call_me: boolean;
    sender: IUser;
    raw?: any;
}

export interface ITextMessage extends IBaseMassage {
    type: "text";
    text: string;
}

export interface IAtMessage extends IBaseMassage {
    type: "at";
    uid: string | number;
    user?: IUser;
}

export interface IImageMessage extends IBaseMassage {
    type: "image";
    url?: string;
    data?: BinaryType;
    base64?: string;
}

export interface IAudioMessage extends IBaseMassage {
    type: "audio";
    url?: string;
    data?: BinaryType;
    base64?: string;
}

export interface ILinkMessage extends IBaseMassage {
    type: "link";
    url: string | URL;
}

export interface IOthersMessage extends IBaseMassage {
    type: "others";
    data: any;
}

export type Message = ITextMessage | IAtMessage | IImageMessage | IAudioMessage | ILinkMessage | IOthersMessage;
