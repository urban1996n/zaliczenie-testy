import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../Domain/Identity/Auth/AuthContext';
import { useCart } from '../Domain/Store/Cart/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>${product.price.toFixed(2)}</strong>
        </Card.Text>
        {user && ( // Only show "Add to Cart" if user is logged in
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
