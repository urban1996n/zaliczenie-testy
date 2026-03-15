import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductList from '../../src/components/ProductList';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const mockOnSelect = jest.fn();

jest.mock('../../src/components/ProductCard', () => ({ product, onSelect }: { product: Product; onSelect: (productId: string) => void }) => (
  <button data-testid="product-card" onClick={() => onSelect(product.id)}>
    {product.name}
  </button>
));

const mockProducts = [
  { id: '1', name: 'Product 1', description: 'Desc 1', price: 10, imageUrl: 'img1.jpg' },
  { id: '2', name: 'Product 2', description: 'Desc 2', price: 20, imageUrl: 'img2.jpg' },
];

describe('ProductList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render products', () => {
    render(<ProductList products={mockProducts} onSelect={mockOnSelect} />);

    expect(screen.getByText('Our Products')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should call onSelect for the chosen product', () => {
    render(<ProductList products={mockProducts} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getAllByTestId('product-card')[1]);

    expect(mockOnSelect).toHaveBeenCalledWith('2');
  });
});
