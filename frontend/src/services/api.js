import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; 

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; 
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error; 
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error; 
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${productId}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
        throw error; 
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error; 
    }
};  
