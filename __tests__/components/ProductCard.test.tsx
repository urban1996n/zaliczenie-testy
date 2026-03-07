import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../src/components/ProductCard';
import { useAuth } from '../../src/Domain/Identity/Auth/AuthContext';
import { useCart } from '../../src/Domain/Store/Cart/CartContext';

// Mock the context hooks
jest.mock('../../src/Domain/Identity/Auth/AuthContext');
jest.mock('../../src/Domain/Store/Cart/CartContext');

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  imageUrl: 'test.jpg'
};

describe('ProductCard', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  it('should not show "Add to Cart" button if user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
  });

  it('should show "Add to Cart" button if user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: 'testuser' });
    
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should call addToCart when "Add to Cart" button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: 'testuser' });
    
    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
