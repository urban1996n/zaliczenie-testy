import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductDetails from '../../src/components/ProductDetails';
import { useAuth } from '../../src/Domain/Identity/Auth/AuthContext';
import { useCart } from '../../src/Domain/Store/Cart/CartContext';

jest.mock('../../src/Domain/Identity/Auth/AuthContext');
jest.mock('../../src/Domain/Store/Cart/CartContext');

const mockAddToCart = jest.fn();
const mockOnBack = jest.fn();
const mockOnAddComment = jest.fn();

const product = {
  id: '1',
  name: 'Laptop Pro',
  description: 'Powerful laptop for professionals.',
  price: 1200,
  imageUrl: '/images/laptop.jpg',
  comments: [
    {
      id: '1-c1',
      author: 'Anna',
      text: 'Excellent performance for work and travel.',
      createdAt: '2026-03-01T10:00:00.000Z',
    },
  ],
};

describe('ProductDetails', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: 'testuser' });
    (useCart as jest.Mock).mockReturnValue({ addToCart: mockAddToCart });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render product details and seeded comments', () => {
    render(<ProductDetails product={product} comments={product.comments} onBack={mockOnBack} onAddComment={mockOnAddComment} />);

    expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    expect(screen.getByText('Excellent performance for work and travel.')).toBeInTheDocument();
  });

  it('should persist new comments in localStorage', () => {
    render(<ProductDetails product={product} comments={product.comments} onBack={mockOnBack} onAddComment={mockOnAddComment} />);

    fireEvent.change(screen.getByLabelText('Add a comment'), {
      target: { value: 'Great battery life.' },
    });
    fireEvent.click(screen.getByText('Save Comment'));

    expect(screen.getByText('Comment added.')).toBeInTheDocument();
    expect(mockOnAddComment).toHaveBeenCalledWith('Great battery life.');
  });
});
