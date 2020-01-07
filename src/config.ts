interface IConfig {
    // server that kitsunebi to connect
    host: string;
    port: number;

    // configs about command
    command_start_character: string | string[];
}

const config = {
    command_start_character: ["/", "!"],
    host: "",
    port: 8080,
};

export {
    IConfig as config,
};
