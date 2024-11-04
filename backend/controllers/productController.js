const db = require('../firebase');
const { body, validationResult } = require('express-validator');

exports.createProduct = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('size').isString().notEmpty().withMessage('Size is required'),
    body('color').isString().notEmpty().withMessage('Color is required'),
    body('category').isString().notEmpty().withMessage('Category is required'),

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
            res.status(400).json({ message: error.message });
        }
    }
];

exports.getAllProducts = async (req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateProduct = [
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await db.collection('products').doc(id).update(req.body);
            res.json({ message: 'Product updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('products').doc(id).delete();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
