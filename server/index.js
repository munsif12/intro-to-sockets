const express = require("express");
const http = require("http");
const CORS = require("cors");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
// const { request } = require("https");

const app = express();
app.use(CORS())
app.use(index);


//socket.io Implemtnation
const server = http.createServer(app);
const request = require("request");
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const apiUrl = 'https://dummyjson.com/users';
let interval;
let realTimeChatInterval;
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on('getChartValuesXY', function (data) {
        console.log(`${apiUrl}/${data?.id}`);
        if (realTimeChatInterval) {
            clearInterval(realTimeChatInterval);
        }
        realTimeChatInterval = setInterval(() => {
            socket.emit('result', { X: Math.floor(Math.random() * 100), Y: Math.floor(Math.random() * 100) })
        }, 3000);
    });
    socket.on('stopLiveData', () => {
        clearInterval(realTimeChatInterval);
    })
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
        clearInterval(realTimeChatInterval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("getCurrentTime", response); // Emitting a new message. Will be consumed by the client
};

server.listen(port, () => console.log(`Server :: istening on port ${port}`));