import { Message } from "./message";

export interface IPlugin {
    name: string;
    command_name?: string;
    description?: string | string[];
    runner: (session: any, message: Message) => boolean;
}
