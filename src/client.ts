import EventEmitter from "events";
import WebSocket from "ws";

class Client extends EventEmitter{
    websocket: WebSocket;
    address: string | URL;

    constructor(address: string | URL, options?: WebSocket.ClientOptions) {
        super();

        this.address = address;
        this.websocket = new WebSocket(address, options);

        this.websocket.on('open', this.openedWebSocketEmitter?.bind(this));
        this.websocket.on('close', this.closedWebSocketEmitter?.bind(this));
        this.websocket.on('message', this.receivedMessageEmitter?.bind(this));
    }

    get state() {
        return this.websocket.readyState;
    }

    send(data: any, callback?: (err: Error | undefined) => void | undefined) {
        return this.websocket.send(data, callback)
    }

    close() {
        return this.websocket.close();
    }

    openedWebSocketEmitter() {
        return this.emit('meta.ws.open');
    }

    closedWebSocketEmitter() {
        return this.emit('meta.ws.close');
    }

    receivedMessageEmitter(data: any) {
        return this.emit('meta.ws.message', data);
    }
}

export {
    Client,
};