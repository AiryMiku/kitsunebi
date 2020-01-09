interface IConfig {
    // server that kitsunebi to connect
    address: string | URL;

    // configs about command
    command_start_character: string | string[];
}

const config: IConfig = {
    address: "",
    command_start_character: ["/", "!"],
};

export {
    IConfig as config,
};
