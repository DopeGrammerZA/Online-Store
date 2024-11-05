import { useState } from 'react';
import { createProduct } from '../services/api';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        size: '',
        color: '',
        category: '',
        gender: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] }); 
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = 'your_auth_token';e

        const formDataToSend = new FormData(); 
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        setLoading(true); 

        try {
            await createProduct(formDataToSend, token);
            setMessage('Product successfully added!');
            setFormData({
                name: '',
                description: '',
                price: '',
                size: '',
                color: '',
                category: '',
                gender: '',
                image: null,
            });
        } catch (error) {
            console.error("Error adding product:", error);
            setMessage('Failed to add product. Please try again.');
        } finally {
            setLoading(false); 
        }

        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="container mt-5">
            <h2>Add New Product</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <select
                        name="size"
                        className="form-select"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input
                        type="text"
                        name="color"
                        className="form-control"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Shorts">Shorts</option>
                        <option value="Skirts">Skirts</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>       
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
