import * as express from 'express';
import * as path from 'path';
import { Server } from "socket.io";
import { createServer } from 'http'

const app = express();

const httpServer = createServer(app);
const socketIO = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200"
  }
});

const users = [];

socketIO.on('connection', (socket) => {
  users.push({ name: socket.id, date: new Date() });
  console.log(`⚡: ${socket.id} user just connected!`);
  socketIO.sockets.emit('users', users);
  console.log(users);

  socket.on('disconnect', (reason) => {
    const indexOfObject = users.findIndex(el => el.name === socket.id);
    users.splice(indexOfObject, 1);
    console.log(`🔥: A user disconnected: ${reason}`);
    socketIO.sockets.emit('users', users);
    console.log(users);
  });

  socket.on('ping', () => {
    // socket.emit('pong', { user: socket.id, date: new Date()});
    socketIO.sockets.emit('pong', { user: socket.id, date: new Date()});
    //socket.broadcast.emit('pong', { user: socket.id, date: new Date()});
    console.log(`A ${socket.id} said 'ping' and got pong`);
  });
});

httpServer.listen(4001);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
