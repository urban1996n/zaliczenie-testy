import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../../../src/Domain/Store/Cart/CartContext';
import { NotificationProvider } from '../../../../src/Domain/UI/Notification/NotificationContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NotificationProvider>
    <CartProvider>{children}</CartProvider>
  </NotificationProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with empty cart if sessionStorage is empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('should initialize with cart from sessionStorage if available', () => {
    const mockCart = [{ id: '1', name: 'Product 1', price: 10, quantity: 2, imageUrl: 'test.jpg' }];
    sessionStorage.setItem('cart', JSON.stringify(mockCart));
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual(mockCart);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: '1', name: 'Product 1', price: 10, imageUrl: 'test.jpg' };
    act(() => {
      result.current.addToCart(product);
    });
    expect(result.current.cart).toEqual([{ ...product, quantity: 1 }]);
    expect(JSON.parse(sessionStorage.getItem('cart')!)).toEqual([{ ...product, quantity: 1 }]);
  });

  it('should increment quantity if item already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: '1', name: 'Product 1', price: 10, imageUrl: 'test.jpg' };
    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });
    expect(result.current.cart).toEqual([{ ...product, quantity: 2 }]);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: '1', name: 'Product 1', price: 10, imageUrl: 'test.jpg' };
    act(() => {
      result.current.addToCart(product);
    });
    act(() => {
      result.current.removeFromCart('1');
    });
    expect(result.current.cart).toEqual([]);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: '1', name: 'Product 1', price: 10, imageUrl: 'test.jpg' };
    act(() => {
      result.current.addToCart(product);
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toEqual([]);
  });
});
