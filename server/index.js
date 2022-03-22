const express = require("express");
const http = require("http");
const CORS = require("cors");
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(CORS())
app.use(index);

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    console.log('socket_id', socket.id);
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Server :: istening on port ${port}`));