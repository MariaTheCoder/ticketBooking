// Make socket connection back-end
const socket = io();

socket.emit("joinedServer", {
    id: socket.id,
    name: "user",
});

socket.on("clientsConnected", (data) => {
    console.log(data);
});