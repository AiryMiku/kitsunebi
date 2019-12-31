import Assert from "assert";

import websocket from "ws";
import { Client } from "../src/client";

describe("websocket", () => {
    describe("#ctor", () => {
        const ws = new Client('wss://echo.websocket.org/', {
            origin: 'https://websocket.org'
        });

        it("websocket is not null", () => {
            Assert.notEqual(ws, null, "ws is null");
        });

        it("websocket connected", () => {
            ws.on("meta.ws.open", () => {
                Assert.equal(ws.websocket.readyState, websocket.OPEN);
                ws.send("message");
            });
        });

        it("message sent and received", () => {
            ws.on("meta.ws.message", (data: any) => {
                Assert.equal(data, "message", "message lost");
            });
        });
        
        it("websocket close", () => {
            setTimeout(() => {
                ws.close();
            }, 1000);
            ws.on("meta.ws.close", () => {
                Assert.equal(ws.websocket.readyState, websocket.CLOSED);
            });
        });
    });
})