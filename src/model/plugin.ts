import { Message } from "./message";

export interface ICommandPlugin {
    name: string;
    command_name?: string;
    description?: string | string[];
    runner: (session: any, message: Message) => boolean;
}

export interface IRegexPlugin {
    name: string;
    regex: RegExp;
    description: string | string[];
    runner: (session: any, message: Message) => boolean;
}