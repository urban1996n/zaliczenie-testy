import React from 'react';
import AppNavbar from './components/Navbar';
import ProductCatalog from './components/ProductCatalog';
import { AuthProvider } from './Domain/Identity/Auth/AuthContext';
import { CartProvider } from './Domain/Store/Cart/CartContext';
import { ProductProvider } from './Domain/Store/Product/ProductContext';
import { NotificationProvider } from './Domain/UI/Notification/NotificationContext';
import './App.css';
import NotificationCenter from './components/NotificationCenter';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <div className="App">
              <NotificationCenter />
              <AppNavbar />
              <ProductCatalog />
            </div>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
