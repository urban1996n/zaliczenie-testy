import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../Domain/Identity/Auth/AuthContext';
import { useCart } from '../Domain/Store/Cart/CartContext';

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      login(username);
      handleClose();
    }
  };

  return (
    <Modal
        data-testid="login-modal"
        show={show}
        onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              data-testid="login-username"
            />
          </Form.Group>
          <Button variant="primary" type="submit" data-testid="login-submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

interface CartModalProps {
  show: boolean;
  handleClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, handleClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); // Check if user is logged in to manage cart

  if (!user) {
    return null; // Cart modal should not be shown if user is not logged in
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal show={show} onHide={handleClose} data-testid="cart-modal">
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center" data-testid={`cart-item-${item.id}`}>
                <div>
                  {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)} data-testid={`remove-from-cart-${item.id}`}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <strong data-testid="cart-total">Total: ${total.toFixed(2)}</strong>
          {cart.length > 0 && (
            <Button variant="warning" onClick={clearCart} data-testid="clear-cart">
              Clear Cart
            </Button>
          )}
        </div>
        <Button variant="secondary" onClick={handleClose} data-testid="close-cart">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


const AppNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

  const handleCartClick = () => setShowCartModal(true);
  const handleCartClose = () => setShowCartModal(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Simple Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Navbar.Text className="me-3" data-testid="user-info">
                    Signed in as: <strong>{user}</strong>
                  </Navbar.Text>
                  <Button variant="outline-light" className="me-2" onClick={handleCartClick} data-testid="nav-cart">
                    Cart
                  </Button>
                  <Button variant="outline-light" onClick={logout} data-testid="nav-logout">
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline-light" onClick={handleLoginClick} data-testid="nav-login">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
      <CartModal show={showCartModal} handleClose={handleCartClose} />
    </>
  );
};

export default AppNavbar;
