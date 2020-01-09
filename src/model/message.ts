import { IUser } from "./user";

export type MessageType = "text" | "at" | "image" | "audio" | "link" | "others";

export interface IBaseMassage {
    type: MessageType;
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
    url: string;
}

export interface IImageMessage extends IBaseMassage {
    type: "image";
    data: BinaryType;
}

export interface IImageMessage extends IBaseMassage {
    type: "image";
    base64: string;
}

export interface IAudioMessage extends IBaseMassage {
    type: "audio";
    url: string;
}

export interface IAudioMessage extends IBaseMassage {
    type: "audio";
    data: BinaryType;
}

export interface IAudioMessage extends IBaseMassage {
    type: "audio";
    base64: string;
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
