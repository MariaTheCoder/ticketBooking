const path = require("path");
const express = require("express");
const socket = require("socket.io");

// App setup
const config = require('./server.config.json');
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

io.on("connection", (socket) => {

    connectedClients.push({
        id: socket.id,
        name: "user", 
    });

    socket.on("joinedServer", () => {
        socket.emit("clientsConnected", connectedClients)
    });
});

server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
    console.log(`http://localhost:${config.port}`);
});