import Assert from "assert";
import websocket from "ws";
import { Client } from "../src/websocket/client";

describe("websocket", () => {


    /**
     * start a echo server at port 8080,
     * and shutdown in 5 seconds.
     *
     * @returns {void} void
     */
    const startEchoServer = () => {
        const websocketServer = new websocket.Server({
            port: 8080
        });
        websocketServer.on("connection", (socket) => {
            socket.on("message", (data) => {
                socket.send(data);
            });
            setTimeout(() => {
                websocketServer.close();
            }, 3000);
        });
    };

    startEchoServer();

    describe("basic feature", () => {

        /**
         * connect to the echo server mentioned above.
         *
         * @returns {void} void
         */
        const getEchoServer = () => {
            const ws = new Client("ws://localhost:8080/");
            return ws;
        };

        it("echo websocket server connected", (done) => {
            const ws = getEchoServer();
            ws.on("meta.ws.open", () => {
                ws.websocket.ping("this is a ping message");
                Assert.equal(ws.state, websocket.OPEN, "not equal");
                ws.close();
            });

            ws.websocket.on("pong", (data) => {
                Assert.equal(data, "this is a ping message");
                ws.close();
            });

            ws.on("meta.ws.close", () => {
                done();
            });
        });

        it("message sent and received", (done) => {
            const ws = getEchoServer();
            ws.on("meta.ws.open", () => {
                ws.send("message");
            });
            ws.on("meta.ws.message", (data: any) => {
                Assert.equal(data, "message", "message lost");
                ws.close();
            });
            ws.on("meta.ws.close", () => {
                done();
            });
        });

        it("send a json object", (done) => {
            const ws = getEchoServer();
            const obj = {
                data: "this is a complex object.",
                message: {
                    a: "a",
                    b: true,
                    c: 123
                }
            };
            ws.on("meta.ws.open", () => {
                ws.send(JSON.stringify(obj));
            });
            ws.on("meta.ws.message", (data: any) => {
                Assert.deepEqual(JSON.parse(data), obj, "message lost");
            });
            ws.on("meta.message.json", (data: any) => {
                Assert.deepEqual(data, obj, "json parse error");
                ws.close();
            });
            ws.on("meta.ws.close", () => {
                done();
            });
        });

    });
});
