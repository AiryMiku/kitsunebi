import { Message } from "../model/message";

export const parse = (message: any): Message | Message[] | undefined => {
    try {
        const result = JSON.parse(message?.data);
        if (Array.isArray(result)) {
            return result;
        }
        return result;
    } catch (error) {
        return undefined;
    }
};
