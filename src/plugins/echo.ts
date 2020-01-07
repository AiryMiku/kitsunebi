import { Message } from "../model/message";
import { IPlugin } from "../model/plugin";

const echo = (session: any, message: Message): boolean => {
    session.send(message);
    return true;
};

const obj: IPlugin = {
    command_name: "echo",
    description: "echo all you sent",
    name: "echo",
    runner: echo,
};

export default obj;
