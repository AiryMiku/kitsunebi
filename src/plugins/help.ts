import { Message } from "../model/message";
import { IPlugin } from "../model/plugin";

const help = (session: any, message: Message): boolean => {

    return true;
};

const obj: IPlugin = {
    command_name: "help",
    description: "help",
    name: "help",
    runner: help
};
