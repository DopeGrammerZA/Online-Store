import { useEffect, useState } from 'react';
import { fetchProducts } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Clothing Collection</h1>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <img src="placeholder-image-url" className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Price: ${product.price}</p>
                                <p className="card-text">Size: {product.size}</p>
                                <p className="card-text">Color: {product.color}</p>
                                <p className="card-text">Category: {product.category}</p>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
