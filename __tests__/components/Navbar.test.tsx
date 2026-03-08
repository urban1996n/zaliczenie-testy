import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppNavbar from '../../src/components/Navbar';
import { useAuth } from '../../src/Domain/Identity/Auth/AuthContext';
import { useCart } from '../../src/Domain/Store/Cart/CartContext';

jest.mock('../../src/Domain/Identity/Auth/AuthContext');
jest.mock('../../src/Domain/Store/Cart/CartContext');

describe('Navbar', () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
      logout: mockLogout
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show Login button when not logged in', () => {
    render(<AppNavbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should show user info and Logout button when logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: 'testuser',
      logout: mockLogout
    });
    render(<AppNavbar />);
    expect(screen.getByText(/Signed in as:/)).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('should open login modal when Login button is clicked', () => {
    render(<AppNavbar />);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('should call login and close modal when login form is submitted', () => {
    render(<AppNavbar />);
    fireEvent.click(screen.getByText('Login'));
    
    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'newuser' } });
    
    const form = input.closest('form')!;
    fireEvent.submit(form);
    
    expect(mockLogin).toHaveBeenCalledWith('newuser');
  });

  it('should open cart modal when Cart button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: 'testuser',
      logout: mockLogout
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: '1', name: 'Product 1', price: 10, quantity: 1 }],
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });

    render(<AppNavbar />);
    fireEvent.click(screen.getByText('Cart'));
    
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText(/Product 1/)).toBeInTheDocument();
    expect(screen.getByText('Total: $10.00')).toBeInTheDocument();
  });

  it('should call removeFromCart when remove button is clicked in cart modal', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: 'testuser',
      logout: mockLogout
    });
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: '1', name: 'Product 1', price: 10, quantity: 1 }],
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });

    render(<AppNavbar />);
    fireEvent.click(screen.getByText('Cart'));
    
    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });
});
