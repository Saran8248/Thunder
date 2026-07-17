const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory database mocks (in production, connect to MongoDB / Postgres)
let usersCredit = {
    "default_user": {
        balance: 3000,
        loanUsed: 0,
        repayAmount: 0,
        dueDate: null
    }
};

const pincodeDB = {
    "560102": "Sector 4, HSR Layout, Bengaluru",
    "560034": "Koramangala 5th Block, Bengaluru",
    "560038": "Indiranagar 100 Feet Rd, Bengaluru",
    "560066": "Whitefield Main Rd, Bengaluru",
    "560041": "Jayanagar 4th Block, Bengaluru"
};

// Route: Get Food Menu
app.get('/api/menu', (req, res) => {
    res.json({
        success: true,
        data: {
            "ovenstory": [
                { name: "Semisoft Margherita Pizza", price: 299, img: "assets/images/p-3.jpg", category: "Pizza" },
                { name: "Double Cheese Pizza", price: 399, img: "assets/images/p-3.jpg", category: "Pizza" }
            ],
            "faasos": [
                { name: "Classic Veg Wrap", price: 149, img: "assets/images/s-1.png", category: "Chinese" },
                { name: "Paneer Tikka Roll", price: 199, img: "assets/images/s-1.png", category: "North Indian" }
            ]
        }
    });
});

// Route: Pincode Location Resolution
app.get('/api/location/:pincode', (req, res) => {
    const pin = req.params.pincode;
    const address = pincodeDB[pin];
    if (address) {
        res.json({ success: true, pincode: pin, address });
    } else {
        res.json({ success: true, pincode: pin, address: `Sector 1, Pin ${pin}, Bengaluru` });
    }
});

// Route: Get Credit Info
app.get('/api/credit/:userId', (req, res) => {
    const userId = req.params.userId;
    const userWallet = usersCredit[userId] || { balance: 3000, loanUsed: 0, repayAmount: 0, dueDate: null };
    res.json({ success: true, data: userWallet });
});

// Route: Checkout & Use Credit
app.post('/api/orders/checkout', (req, res) => {
    const { userId, cart, useCredit, billAmount } = req.body;
    
    let creditUsed = 0;
    let repayDue = 0;
    
    if (useCredit) {
        const userWallet = usersCredit[userId] || { balance: 3000, loanUsed: 0, repayAmount: 0, dueDate: null };
        const possibleCredit = Math.round(billAmount * 0.5);
        
        creditUsed = possibleCredit <= userWallet.balance ? possibleCredit : userWallet.balance;
        
        if (creditUsed > 0) {
            userWallet.balance -= creditUsed;
            userWallet.loanUsed += creditUsed;
            
            // 5% interest fee based on bill amount
            const interest = Math.round(billAmount * 0.05);
            userWallet.repayAmount += creditUsed + interest;
            
            // Set due date to exactly 7 days from now
            const due = new Date();
            due.setDate(due.getDate() + 7);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            userWallet.dueDate = `${due.getDate()} ${months[due.getMonth()]} ${due.getFullYear()}`;
            
            usersCredit[userId] = userWallet;
            repayDue = userWallet.repayAmount;
        }
    }
    
    res.json({
        success: true,
        message: "Order placed successfully!",
        creditUsed,
        repayDue,
        remainingBalance: usersCredit[userId] ? usersCredit[userId].balance : 3000
    });
});

// Route: Repay Credit
app.post('/api/credit/repay', (req, res) => {
    const { userId } = req.body;
    const userWallet = usersCredit[userId] || { balance: 3000, loanUsed: 0, repayAmount: 0, dueDate: null };
    
    userWallet.balance = 3000;
    userWallet.loanUsed = 0;
    userWallet.repayAmount = 0;
    userWallet.dueDate = null;
    
    usersCredit[userId] = userWallet;
    
    res.json({
        success: true,
        message: "Repayment successful! Limits restored.",
        data: userWallet
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Tasty Bites Backend running on http://localhost:${PORT}`);
});
