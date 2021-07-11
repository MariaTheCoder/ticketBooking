const path = require("path");
const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const server = require("http").createServer(app);

// Static files
app.use(express.static("public"));

// socket setup 
const io = socket(server);

// array containing connected clients
const connectedClients = [];

app.get("/", function (req, res) {
    res.sendFile(path.resolve("./public/clients.html"));
})

io.on("connection", socket => {

    connectedClients.push({
        id: socket.id,
        name: "user", 
    });

    socket.on("joinedServer", connectedClients);
});

server.listen(3000);