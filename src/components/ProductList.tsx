import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  onSelect: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Our Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="d-flex justify-content-center">
            <ProductCard product={product} onSelect={onSelect} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
