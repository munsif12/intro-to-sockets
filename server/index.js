const express = require("express");
const http = require("http");
const CORS = require("cors");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const path = require("path");

const app = express();
app.use(CORS())
app.use(index);


// -------------- socket.io Implemtnation ------------------- //
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

let interval;
let realTimeChatInterval;
io.on("connection", (socket) => {
    console.log("New client connected");

    //live chart 
    socket.on('getChartValuesXY', function (data) {
        if (realTimeChatInterval) {
            clearInterval(realTimeChatInterval);
        }
        realTimeChatInterval = setInterval(() => {
            socket.emit('result', { X: Math.floor(Math.random() * 100), Y: Math.floor(Math.random() * 100) })
        }, 2000);
    });

    socket.on('stopLiveData', () => {
        clearInterval(realTimeChatInterval);
    })

    //real time chat
    // socket.on('UserName', function (data) {
    //     io.emit('welcomeNewMember', { notificationType: 'newMember', message: `${data.userName} has joined the chat` });

    // });
    // socket.on('sendNewMessage', (data) => {
    //     io.emit('recieveNewMessage', { notificationType: 'message', message: data });
    // })

    //
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
    // Emitting a new message. Will be consumed by the client
    socket.emit("getCurrentTime", response);
};

// ------------ DEPLOYMENT ------------- //
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

server.listen(port, () => console.log(`Server :: istening on port ${port}`));