import EventEmitter from "events";
import WebSocket from "ws";

class Client extends EventEmitter {
    public websocket: WebSocket;
    private address: string | URL;

    constructor(address: string | URL, options?: WebSocket.ClientOptions) {
        super();

        this.address = address;
        this.websocket = new WebSocket(address, options);

        this.websocket.on("open", this.openedWebSocketEmitter?.bind(this));
        this.websocket.on("close", this.closedWebSocketEmitter?.bind(this));
        this.websocket.on("message", this.receivedMessageEmitter?.bind(this));

        this.websocket.on("ping", (data: Buffer) => {
            this.emit("meta.ws.ping", data);
        });
        this.websocket.on("pong", (data: Buffer) => {
            this.emit("meta.ws.pong", data);
        });
    }

    get state() {
        return this.websocket.readyState;
    }

    public send(data: any, callback?: (err: Error | undefined) => void | undefined) {
        return this.websocket.send(data, callback);
    }

    public ping(data?: any, mask?: boolean, cb?: (err: Error) => void) {
        return this.websocket.ping(data, mask, cb);
    }

    public pong(data?: any, mask?: boolean, cb?: (err: Error) => void) {
        return this.websocket.pong(data, mask, cb);
    }

    public close(code?: number, data?: string) {
        return this.websocket.close(code, data);
    }

    protected openedWebSocketEmitter() {
        return this.emit("meta.ws.open");
    }

    protected closedWebSocketEmitter(...data: any[]) {
        return this.emit("meta.ws.close", ...data);
    }

   protected receivedMessageEmitter(...data: any[]) {
        return this.emit("meta.ws.message", ...data);
    }
}

export {
    Client,
};
