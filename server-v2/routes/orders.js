const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order (with Tasty Credit logic)
router.post('/', async (req, res) => {
    try {
        const { customerId, items, totalAmount, isCreditOrder, creditUsed, repaymentDue } = req.req_body || req.body;
        
        let targetCustomerId = customerId;
        
        // Mock user creation if none exists (for testing)
        if (!targetCustomerId) {
           let guest = await prisma.user.findFirst({ where: { email: 'guest@tastybites.com' } });
           if (!guest) {
               guest = await prisma.user.create({
                   data: { name: 'Guest User', email: 'guest@tastybites.com', password: 'password', role: 'CUSTOMER', creditBalance: 3000 }
               });
           }
           targetCustomerId = guest.id;
        }

        // We assume items belong to the first restaurant in the list for simplicity in this MVP
        const restaurant = await prisma.restaurant.findFirst();

        const order = await prisma.order.create({
            data: {
                customerId: targetCustomerId,
                restaurantId: restaurant.id,
                status: 'PREPARING',
                totalAmount: totalAmount,
                deliveryFee: 40,
                tax: totalAmount * 0.05,
                deliveryAddr: 'Sector 4, 19th Main, HSR Layout RK, Bengaluru',
                isCreditOrder: isCreditOrder || false,
                creditUsed: creditUsed || 0,
                paidAmount: totalAmount - (creditUsed || 0),
                repaymentDue: repaymentDue || 0,
                repaymentDueDate: repaymentDue > 0 ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
            }
        });

        // Update User Credit Balance if used
        if (isCreditOrder && creditUsed > 0) {
            const user = await prisma.user.findUnique({ where: { id: targetCustomerId } });
            await prisma.user.update({
                where: { id: targetCustomerId },
                data: {
                    creditBalance: user.creditBalance - creditUsed,
                    loanUsed: user.loanUsed + creditUsed,
                    repayAmount: user.repayAmount + repaymentDue,
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }
            });
        }

        res.json({ success: true, orderId: order.id, message: 'Order placed successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

module.exports = router;
