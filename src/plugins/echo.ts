import { Message } from "../model/message";
import { ICommandPlugin } from "../model/plugin";

const echo = (session: any, message: Message): boolean => {
    session.send(message);
    return true;
};

const plugin: ICommandPlugin = {
    command_name: "echo",
    description: "echo all you sent",
    name: "echo",
    runner: echo,
};

export default plugin;
