const express = require('express');
const router = express.Router();
const Cupcake = require('../models/Cupcake');
const WeddingCake = require('../models/WeddingCake');
const ShoppingBag = require('../models/ShoppingBag');

router.get('/cupcakes', async (req, res) => {
    try {
        const cupcakes = await Cupcake.find();
        res.json(cupcakes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/weddingcakes', async (req, res) => {
    try {
        const weddingCakes = await WeddingCake.find();
        res.json(weddingCakes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/shoppingbag', async (req, res) => {
    try {
        const { userId, items } = req.body;
        let shoppingBag = await ShoppingBag.findOne({ userId });
        
        if (!shoppingBag) {
            shoppingBag = new ShoppingBag({ userId, items });
        } else {
            shoppingBag.items = items;
        }
        
        await shoppingBag.save();
        res.status(201).json(shoppingBag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;