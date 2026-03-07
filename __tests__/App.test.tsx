import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Mock the nested components
jest.mock('../src/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../src/components/ProductList', () => () => <div data-testid="product-list">ProductList</div>);

describe('App', () => {
  it('should render Navbar and ProductList within providers', () => {
    render(<App />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
