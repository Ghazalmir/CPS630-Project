const express = require("express");
const { Application, Request, Response } = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require('dotenv');


const app = express();
app.use(cors());
app.use(express.static('public'));

dotenv.config();

const PORT = 8080;

// Create an express applicaiton
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const profileRoutes = require('./endpoints/profile'); 
const messagesRoutes = require('./endpoints/messages');
const postingRoutes = require('./endpoints/posts');
const categoryRoutes = require('./endpoints/categories');
const adminRoutes = require('./endpoints/admin');


app.use('/api/profile', profileRoutes); 
app.use('/api/messages', messagesRoutes); 
app.use('/api/ads', postingRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);

// Create a Socket.io server with the express application
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// wait for new connection
io.on("connection", (socket) => {
  console.log("New client is connected"); 

  const userId = socket.handshake.query.userId;
  socket.join(userId)

  console.log(userId)

  socket.on("message", (msg) => {
    console.log(msg)
    io.to(msg.receiver_id).emit("newMessage", msg)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});






// Run the server
try {
  server.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}

