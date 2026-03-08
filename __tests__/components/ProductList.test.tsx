import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../../src/components/ProductList';
import { useAuth } from '../../src/Domain/Identity/Auth/AuthContext';
import { useCart } from '../../src/Domain/Store/Cart/CartContext';

jest.mock('../../src/Domain/Identity/Auth/AuthContext');
jest.mock('../../src/Domain/Store/Cart/CartContext');

jest.mock('../../src/components/ProductCard', () => ({ product }: any) => (
  <div data-testid="product-card">{product.name}</div>
));

const mockProducts = [
  { id: '1', name: 'Product 1', description: 'Desc 1', price: 10, imageUrl: 'img1.jpg' },
  { id: '2', name: 'Product 2', description: 'Desc 2', price: 20, imageUrl: 'img2.jpg' },
];

describe('ProductList', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    (useCart as jest.Mock).mockReturnValue({ addToCart: jest.fn() });
    
    window.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state and then products', async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductList />);

    expect(screen.getByText('Our Products')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    });
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should show error message if fetch fails', async () => {
    (window.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch products: Fetch failed/i)).toBeInTheDocument();
    });
  });

  it('should show error message if response is not ok', async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch products: HTTP error! status: 404/i)).toBeInTheDocument();
    });
  });
});
