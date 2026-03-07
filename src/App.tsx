import React from 'react';
import AppNavbar from './components/Navbar';
import ProductList from './components/ProductList';
import { AuthProvider } from './Domain/Identity/Auth/AuthContext';
import { CartProvider } from './Domain/Store/Cart/CartContext';
import { Container } from 'react-bootstrap';
import './App.css'; // Keep existing App.css if it has global styles or remove if not needed

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <AppNavbar />
          <Container className="my-4">
            <ProductList />
          </Container>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
