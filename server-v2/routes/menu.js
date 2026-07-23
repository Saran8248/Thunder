const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all restaurants and their menus
router.get('/', async (req, res) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                menuItems: true
            }
        });
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
});

module.exports = router;
