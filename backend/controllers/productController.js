const db = require('../firebase');
const { validationResult } = require('express-validator');
const { validateProduct } = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

const getAllProducts = async (req, res) => {
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


const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, price, size, color, category, gender } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 
        
        const productRef = db.collection('products').doc();
        await productRef.set({
            name,
            description,
            price,
            size,
            color,
            category,
            gender,
            available: true,
            imageUrl
        });
        
        res.status(201).json({ 
            id: productRef.id, 
            name, 
            description, 
            price, 
            size, 
            color, 
            category, 
            available: true, 
            imageUrl 
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};


const updateProduct = [
    validateProduct.map((validation) => validation.optional()),
    upload.single('image'), 
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

            if (req.file) {
                updates.imageUrl = `/uploads/${req.file.filename}`; 
            }

            await productRef.update(updates);
            res.json({ message: 'Product updated successfully', updates });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product', error: error.message });
        }
    }
];


const deleteProduct = async (req, res) => {
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


module.exports = {
    createProduct: [validateProduct, upload.single('image'), createProduct], 
    getAllProducts, 
    updateProduct,
    deleteProduct,
};
