import { Message } from "../model/message";
import { ICommandPlugin } from "../model/plugin";

const help = (session: any, message: Message): boolean => {

    return true;
};

const obj: ICommandPlugin = {
    command_name: "help",
    description: "help",
    name: "help",
    runner: help
};
