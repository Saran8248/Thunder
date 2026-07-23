const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for dev
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Thunder Food API is running' });
});

const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurant');
const menuRoutes = require('./routes/menu');
const ordersRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);

// Socket.IO
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Forcing port 5001 to bypass global Windows PORT=5000 environment variables
const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
