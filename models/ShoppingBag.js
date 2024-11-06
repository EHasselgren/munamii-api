const mongoose = require('mongoose');

const shoppingBagSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        itemId: { type: String, required: true },
        itemType: {
            type: String,
            enum: ['Cupcake', 'WeddingCake'],
            required: true
        },
        quantity: { type: Number, required: true, default: 1 }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShoppingBag', shoppingBagSchema);