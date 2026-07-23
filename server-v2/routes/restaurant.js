const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            where: { isVerified: true }
        });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get restaurant by ID with menu
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: { menuItems: true }
        });
        if (!restaurant) return res.status(404).json({ error: 'Not found' });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
