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

    data.forEach(element => {
        const client = document.createElement("li");

        if(element.id === socket.id) {
            client.innerHTML = element.id + ' (You)';
            listOfConnectedClients.appendChild(client);
        } else {
            client.innerHTML = element.id;
            listOfConnectedClients.appendChild(client);
        }
    });
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
