const express = require('express');
const multer = require('multer');
const path = require('path');

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            size: req.body.size,
            color: req.body.color,
            category: req.body.category,
            gender: req.body.gender,
            image: req.file ? req.file.path : null,
        };

        const newProduct = await createProduct(productData); 
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);  
        res.status(500).json({ message: 'Failed to create product.', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts(req, res);  
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Failed to fetch products.', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body; 

        const updatedProduct = await updateProduct(productId, updatedProductData); 
        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Failed to update product.', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteProduct(productId); 
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Failed to delete product.', error: error.message });
    }
});

module.exports = router;
