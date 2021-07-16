// Make socket connection back-end
const socket = io();

// List of connected clients
const listOfConnectedClients = document.getElementById("listOfConnectedClients");

socket.emit("joinedServer", {
    id: socket.id,
    name: "user",
});

socket.on("clientsConnected", (data) => {
    console.log(data);

    data.forEach(element => {
        const client = document.createElement("li");
        client.innerHTML = element.id;
        listOfConnectedClients.appendChild(client);
    });
});