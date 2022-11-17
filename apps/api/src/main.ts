import * as express from "express";
import { Server } from "socket.io";
import * as http from "http";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = new http.Server(app);
const socketIO = new Server(httpServer);

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.get("/api", (req, res) => {
    res.json({
      message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
