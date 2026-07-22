// socket.js - WebSocket client wrapper
let socket = null;

function initSocket() {
    if (typeof io !== 'undefined') {
        socket = io('http://localhost:3000');
        
        socket.on('connect', () => {
            console.log('Connected to real-time server with ID:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from real-time server');
        });
    } else {
        console.warn('Socket.io script not loaded');
    }
}

function joinRoom(roomName) {
    if (socket) {
        socket.emit('join_room', roomName);
    }
}

function subscribeToOrders(callback) {
    if (socket) {
        socket.on('order_notification', callback);
    }
}

function emitOrderStatusChange(data) {
    if (socket) {
        socket.emit('order_status_change', data);
    }
}
