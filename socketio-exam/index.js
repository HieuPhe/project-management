const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.emit("SERVER_SEND_SOCKET_ID", socket.id);

    socket.on('CLIENT_SEND_MESSAGE', (msg) => {
        console.log('message: ' + msg);
        //A gửi lên server, server sẽ chỉ phản hồi về cho A
        // Ví dụ: gửi tin nhắn bị lỗi, thì thông báo lỗi chỉ trả về cho A
        // socket.emit("SERVER_RETURN_MESSAGE", msg);

        //A gửi lên server, server sẽ chỉ phản hồi về cho A, B, C, ...
        // Ví dụ: tính năng chat theo nhóm
        io.emit("SERVER_RETURN_MESSAGE", msg);

        //A gửi lên server, server sẽ chỉ phản hồi về cho B, C, ....
        // Ví dụ: Hôm nay là sinh nhật của A, server chỉ gửi thông báo cho B, C, ...
        // socket.broadcast.emit("SERVER_RETURN_MESSAGE", msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});