import EventEmitter from "events";
import WebSocket from "ws";


/**
 * client handles all the messages
 *
 * ```typescript
 * let client = new Client("ws://localhost:8080/")
 * ```
 *
 * @class Client
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
    public websocket: WebSocket;
    private address: string;

    /**
     * Creates an instance of Client.
     *
     * see {@link WebSocket} for more details.
     *
     * @param {string} address
     * @param {WebSocket.ClientOptions} [options]
     * @memberof Client
     */
    constructor(address: string, options?: WebSocket.ClientOptions) {
        super();

        this.address = address;
        this.websocket = new WebSocket(this.address, options);

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

    /**
     * get the websocket state
     *
     * @readonly
     * @memberof Client
     */
    get state() {
        return this.websocket.readyState;
    }

    /**
     * send data
     *
     * @param {*} data data to be sent
     * @param {((err: Error | undefined) => void | undefined)} [callback] callback when failed
     * @returns
     * @memberof Client
     */
    public send(data: any, callback?: (err: Error | undefined) => void | undefined) {
        return this.websocket.send(data, callback);
    }

    /**
     * send a ping message
     *
     * @param {*} [data]
     * @param {boolean} [mask]
     * @param {(err: Error) => void} [cb] callback when failed
     * @returns void
     * @memberof Client
     */
    public ping(data?: any, mask?: boolean, cb?: (err: Error) => void) {
        return this.websocket.ping(data, mask, cb);
    }

    /**
     * send a pong message
     *
     * @param {*} [data]
     * @param {boolean} [mask]
     * @param {(err: Error) => void} [cb] callback when failed
     * @returns void
     * @memberof Client
     */
    public pong(data?: any, mask?: boolean, cb?: (err: Error) => void) {
        return this.websocket.pong(data, mask, cb);
    }

    /**
     * close connection
     *
     * @param {number} [code] code of reason
     * @param {string} [data] message that human readable
     * @returns void
     * @memberof Client
     */
    public close(code?: number, data?: string) {
        return this.websocket.close(code, data);
    }

    /**
     * emit when websocket opened
     *
     * @protected
     * @returns boolean
     * @memberof Client
     *
     * see the [[Websocket]] for more details
     */
    protected openedWebSocketEmitter() {
        return this.emit("meta.ws.open");
    }

    /**
     * emit when websocket closed
     *
     * @protected
     * @param {number} code
     * @param {string} reason
     * @returns boolean
     * @memberof Client
     *
     * see the {@link Websocket} for more details
     */
    protected closedWebSocketEmitter(code: number, reason: string) {
        return this.emit("meta.ws.close", code, reason);
    }

   /**
    * emit when websocket received message
    *
    * @protected
    * @param {WebSocket.Data} data
    * @returns
    * @memberof Client
    */
    protected receivedMessageEmitter(data: WebSocket.Data) {
        let message: object | string | null = null;
        if (data.toString) {
            data = data.toString();
        }
        try {
            message = JSON.parse(data as string);
        } catch (error) {
            message = null;
        }

        this.emit("meta.ws.message", data);
        if (message) {
            this.emit("meta.message.json", message);
        }
        return true;
    }
}

export {
    Client,
};
