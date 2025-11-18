
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('message', (msg) => {
      io.to(msg.receiverId).emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
