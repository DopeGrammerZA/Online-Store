const db = require('../firebase');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const productRef = db.collection('products').doc();
        await productRef.set({
            name,
            description,
            price,
            available: true,
        });
        res.status(201).json({ id: productRef.id, name, description, price, available: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('products').doc(id).update(req.body);
        res.json({ message: 'Product updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('products').doc(id).delete();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
