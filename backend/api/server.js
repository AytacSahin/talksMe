const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const morgan = require('morgan');

const UsersRouter = require('../api/users/users-router');
const MessagesRouter = require('../api/messages/messages-router');
const MessageModel = require('../api/messages/messages-model');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
});

// Global Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Bu bağlantılar için değişebilir
}));
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/api/users", UsersRouter);
app.use("/api/messages", MessagesRouter);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (message) => {
        try {
            const newMessage = await MessageModel.createMessage(message.chatId, message.userId, message.content, message.type);
            io.emit('receiveMessage', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Global Error Middleware
app.use((err, req, res, next) => {
    // eslint-disable-line
    res
        .status(err.status || 500)
        .json({ message: err.message || "SERVER ERROR!...." });
});

module.exports = server;
