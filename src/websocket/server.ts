import EventEmitter from "events";
import WebSocket from "ws";


/**
 * websocket server
 *
 * @class Server
 * @extends {EventEmitter}
 */
class Server extends EventEmitter {
    public token: string | null;
    public secret: string | null;
    private server: WebSocket.Server;

    constructor(
        host: string = "0.0.0.0",
        port: number = 8080,
        ...otherOptions: any[]
    ) {
        super();
        this.token = null;
        this.secret = null;
        this.server = new WebSocket.Server({
            host,
            port,
            ...otherOptions
        });

        this.server.on("connection", (socket, request) => {
            socket.on("message", (data) => {
                this.emit("meta.ws.message", data);
                let message = data as any;
                try {
                    message = JSON.parse(data as string);
                    if (message?.token !== this.token) {
                        return;
                    }
                } catch (error) {
                    message = data;
                }
                this.emit("meta.ws.message.json", message?.data);
            });
        });
    }
}

export {
    Server,
};
