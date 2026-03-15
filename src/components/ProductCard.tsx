import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../Domain/Identity/Auth/AuthContext';
import { useCart } from '../Domain/Store/Cart/CartContext';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title data-testid="product-name">{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong data-testid="product-price">${product.price.toFixed(2)}</strong>
        </Card.Text>
        <Button variant="outline-secondary" className="me-2" onClick={() => onSelect(product.id)}>
          View Details
        </Button>
        {user && ( // Only show "Add to Cart" if user is logged in
          <Button variant="primary" onClick={handleAddToCart} data-testid="add-to-cart">
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
