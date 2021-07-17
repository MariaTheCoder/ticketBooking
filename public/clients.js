// Make socket connection back-end
const socket = io();

// List of connected clients
const listOfConnectedClients = document.getElementById("listOfConnectedClients");
const listedDisconnectedClients = document.getElementById("listOfDisconnectedClients");

socket.emit("joinedServer", {
    id: socket.id,
    name: "user",
});

socket.on("clientsConnected", (data) => {
    console.log("connected users", data);

    data.forEach(user => {
        if(user.id === socket.id) {
            user.name = "You";
        }
    });

    displayUsers(data, listOfConnectedClients);

});

socket.on("userDisconnect", (connectedUsers, disconnectedUsers) => {

    displayUsers(connectedUsers, listOfConnectedClients);
    displayUsers(disconnectedUsers, listedDisconnectedClients);

    console.log("Hello World");
});

function displayUsers(arrayOfUsers, htmlListElement) {

    htmlListElement.innerHTML = "";

    arrayOfUsers.forEach(user => {
        const client = document.createElement("li");
        client.innerHTML = user.id;
        htmlListElement.appendChild(client);
    })
}
