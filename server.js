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

// array containing connected and disconnected clients
const connectedClients = [];
const disconnectedClients = [];

app.get("/", function (req, res) {
    res.sendFile(path.resolve("./public/clients.html"));
})

io.on("connection", (socket) => {

    socket.on("disconnect", () => {

        // firstly, remove disconnected client from list of connected users
        let disconnectedUser;

        for (let i = 0; i < connectedClients.length; i++) {
            const user = connectedClients[i];
            
            if(user.id === socket.id) {
                disconnectedUser = connectedClients.splice(i, 1);
            }
        }

        // push disconnected user to list of disconnected clients
        disconnectedClients.push(disconnectedUser);

        // emit both lists to socket
        socket.emit("userDisconnect", (connectedClients, disconnectedClients));

        console.log("a user disconnected: ", disconnectedUser);
        console.log("disconnected users: ", disconnectedClients); 
        console.log("connected users: ", connectedClients);
    });

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