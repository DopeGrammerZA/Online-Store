import  { useState } from 'react';
import { createProduct } from '../services/api';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        size: '',
        color: '',
        category: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = 'your_auth_token'; 
        await createProduct(formData, token);
        // Optionally reset the form or redirect
    };

    return (
        <div className="container mt-5">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" name="price" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input type="text" name="size" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input type="text" name="color" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" name="category" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
