import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useAuth } from '../Domain/Identity/Auth/AuthContext';
import { useProducts } from '../Domain/Store/Product/ProductContext';
import ProductDetails from './ProductDetails';
import ProductList from './ProductList';

const ProductCatalog: React.FC = () => {
  const { user } = useAuth();
  const {
    products,
    error,
    selectedProduct,
    selectedProductComments,
    selectProduct,
    clearSelectedProduct,
    addComment,
  } = useProducts();

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          comments={selectedProductComments}
          onBack={clearSelectedProduct}
          onAddComment={(text) => addComment(text, user ?? 'Guest')}
        />
      ) : (
        <ProductList products={products} onSelect={selectProduct} />
      )}
    </Container>
  );
};

export default ProductCatalog;
