import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api'; 
import { Card, Spinner } from 'react-bootstrap';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
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
            </Card.Body>
        </Card>
    );
};

export default ProductDetails;
