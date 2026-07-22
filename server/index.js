const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Basic API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// WebSocket Connection Handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example event: Join a specific room (e.g., customer, restaurant, admin, or order-specific)
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Example event: Order status update
  socket.on('order_status_change', (data) => {
    // Broadcast to relevant parties (e.g., room for the specific order or restaurant)
    console.log('Order status update received:', data);
    io.emit('order_notification', data); // For demo, broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
