import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import 'dotenv/config';
import { socketAuthMiddleware } from '../middleware/socketAuthMiddleware.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = {};
const users = {};

export const getReceiverSocketId = (userId) => {
  return users[userId];
};

io.on('connection', (socket) => {
  console.log('A user connected', socket.user.fullName);

  const fullName = socket.user.fullName;
  onlineUsers[fullName] = socket.id;

  const userId = socket.userId;
  users[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(onlineUsers));

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.user.fullName);
    delete onlineUsers[fullName];
    io.emit('getOnlineUsers', Object.keys(onlineUsers));
  });
});

export { io, server, app };
