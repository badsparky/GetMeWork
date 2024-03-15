const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://badsparky.github.io/GetMeWork/", "http://localhost:3001"], // This allows all origins. For production, specify your client app's URL.
        methods: ["GET", "POST"], // Methods allowed from the client
        allowedHeaders: ["content-type"], // Custom headers you want to allow
        credentials: true // This is important if your client sends credentials like cookies
    }
});

io.on('connection', (socket) => {
    console.log('A user connected, socket id:', socket.id);
    // Your Socket.IO logic here
    io.emit('connect-approved', Array.from(io.sockets.adapter.rooms.keys()).join(',')); // Broadcast to all clients the total number of clients connected
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
    socket.on('sendMessage', (data) => {
        // Normally, you'd decode your message here based on your protocol
        const message = data.message; // Placeholder for decoding logic
        const to = data.to; // Placeholder for decoding logic
        console.log('Received message:', message);
        console.log('to:', to);
        io.to(to).emit('receiveMessage', {message:message,from:socket.id}); // Broadcast message to all clients
    });
});
// io.on('connection', (socket) => {
//     console.log('A user connected');

// });

const PORT = parseInt(process.env.PORT) || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
