import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Card, Spinner, Button } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-wrap">
            {products.map((product) => (
                <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            <strong>Description:</strong> {product.description}<br />
                            <strong>Price:</strong> ${(Number(product.price) || 0).toFixed(2)}<br />
                            <strong>Size:</strong> {product.size}<br />
                            <strong>Color:</strong> {product.color}<br />
                            <strong>Category:</strong> {product.category}
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ProductList;
