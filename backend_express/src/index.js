import app from './app.js'
import {Server} from 'socket.io'
import http from 'http'
import { connectDb } from './lib/db/connectDb.js'
import { env_config } from './lib/configs/env.config.js'

const server = http.createServer(app)

const io = new Server(server
  , {
  cors: {
    origin: '*', // frontend se allow
    // methods: ['GET', 'POST']
  }
}
)

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);
  // io.emit('newMessage', data); //// Send to all

  socket.emit('yourSocketId', socket.id); // return the id of socket to user who connected
  
  //  // Send to all others 
  // socket.broadcast.emit('newMessage', data); 
  
  socket.on('sendMessage', ({ to, from, message }) => {
    console.log(`📩 Message from ${from} to ${to}:`, message);
    io.to(to).emit("newMessage", { from, message });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => {
      console.log('Closed remaining connections gracefully.');
      process.exit(1); 
    });
  });

connectDb()
    .then(() => {
        server.listen(env_config.port, () => {
            console.log("app running on port "+env_config.port);              
        })
    })
    .catch((e) => {
        console.log("Failed to connect DB", error);
        
    })