import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Card, Spinner, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '1rem', width: '300px' }}
            />
            <div className="d-flex justify-content-center align-items-center flex-wrap">
                {filteredProducts.map((product) => (
                    <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                <strong>Description:</strong> {product.description}<br />
                                <strong>Price:</strong> R {(Number(product.price) || 0).toFixed(2)}<br />
                                <strong>Size:</strong> {product.size}<br />
                                <strong>Color:</strong> {product.color}<br />
                                <strong>Gender:</strong> {product.gender}<br />
                                <strong>Category:</strong> {product.category}
                            </Card.Text>
                            <Link to={`/productDetails/${product.id}`}>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
