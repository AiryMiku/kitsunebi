import { Client } from "./client";

const ws = new Client('wss://echo.websocket.org/', {
    origin: 'https://websocket.org'
});
ws.on('meta.ws.open', () => {
    console.log('opened');
    ws.send('this is a message');
    setTimeout(() => {
        ws.close();
    }, 3000);
});


ws.on('meta.ws.message', console.log);
