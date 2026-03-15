import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Product, ProductComment } from '../types/Product';
import { useAuth } from '../Domain/Identity/Auth/AuthContext';
import { useCart } from '../Domain/Store/Cart/CartContext';

interface ProductDetailsProps {
  product: Product;
  comments: ProductComment[];
  onBack: () => void;
  onAddComment: (text: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, comments, onBack, onAddComment }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [commentText, setCommentText] = useState('');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    onAddComment(commentText);
    setCommentText('');
    setSubmitMessage('Comment added.');
  };

  return (
    <Row className="g-4">
      <Col lg={7}>
        <Card>
          <Card.Img
            variant="top"
            src={product.imageUrl}
            alt={product.name}
            style={{ height: '360px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Button variant="link" className="px-0 mb-3" onClick={onBack}>
              Back to products
            </Button>
            <Card.Title as="h2">{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>
              <strong>${product.price.toFixed(2)}</strong>
            </Card.Text>
            {user && (
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col lg={5}>
        <Card>
          <Card.Body>
            <Card.Title as="h3">Comments</Card.Title>
            <ListGroup variant="flush" className="mb-3">
              {comments.length === 0 ? (
                <ListGroup.Item>No comments yet.</ListGroup.Item>
              ) : (
                comments.map((comment) => (
                  <ListGroup.Item key={comment.id}>
                    <strong>{comment.author}</strong>
                    <div>{comment.text}</div>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
            <Form onSubmit={handleSubmitComment}>
              <Form.Group className="mb-3" controlId="product-comment">
                <Form.Label>Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentText}
                  onChange={(event) => {
                    setCommentText(event.target.value);
                    if (submitMessage) {
                      setSubmitMessage(null);
                    }
                  }}
                  placeholder="Share your opinion about this product"
                />
              </Form.Group>
              <Button type="submit">Save Comment</Button>
            </Form>
            {submitMessage && (
              <Alert variant="success" className="mt-3 mb-0">
                {submitMessage}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetails;
