import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNotification } from '../../UI/Notification/NotificationContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number; imageUrl: string }) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { showNotification } = useNotification();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { id: string; name: string; price: number; imageUrl: string }) => {
    let notificationMessage = `${product.name} added to cart.`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        notificationMessage = `Updated quantity for ${product.name}.`;
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    showNotification(notificationMessage, 'success');
  };

  const removeFromCart = (productId: string) => {
    const removedItem = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (removedItem) {
      showNotification(`${removedItem.name} removed from cart.`, 'warning');
    }
  };

  const clearCart = () => {
    setCart([]);

    if (cart.length > 0) {
      showNotification('Cart cleared.', 'warning');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
