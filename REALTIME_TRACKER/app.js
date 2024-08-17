const express = require('express');
const app = express();
const PORT = 3005;

const path = require('path');

const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Set the static files directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("received-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
