const db = require('../firebase');
const { validationResult } = require('express-validator');
const { validateProduct } = require('../middlewares/validation');

exports.createProduct = [
    validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, description, price, size, color, category } = req.body;
            const productRef = db.collection('products').doc();
            await productRef.set({
                name,
                description,
                price,
                size,
                color,
                category,
                available: true,
            });
            res.status(201).json({ id: productRef.id, name, description, price, size, color, category, available: true });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create product', error: error.message });
        }
    }
];


exports.getAllProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const lastDocId = req.query.lastDocId || null;

    try {
        let productsRef = db.collection('products').limit(limit);

        if (lastDocId) {
            const lastDoc = await db.collection('products').doc(lastDocId).get();
            productsRef = productsRef.startAfter(lastDoc);
        }

        const snapshot = await productsRef.get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

exports.updateProduct = [
    validateProduct.map((validation) => validation.optional()), 
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const productRef = db.collection('products').doc(id);
            const product = await productRef.get();

            if (!product.exists) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const updates = {};
            if (req.body.name) updates.name = req.body.name;
            if (req.body.description) updates.description = req.body.description;
            if (req.body.price) updates.price = req.body.price;
            if (req.body.size) updates.size = req.body.size;
            if (req.body.color) updates.color = req.body.color;
            if (req.body.category) updates.category = req.body.category;
            if (req.body.available !== undefined) updates.available = req.body.available;

            await productRef.update(updates);
            res.json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product', error: error.message });
        }
    }
];

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productRef = db.collection('products').doc(id);
        const product = await productRef.get();

        if (!product.exists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await productRef.delete();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};
