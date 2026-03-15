import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

jest.mock('../src/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../src/components/ProductCatalog', () => () => <div data-testid="product-catalog">ProductCatalog</div>);
jest.mock('../src/components/NotificationCenter', () => () => <div data-testid="notification-center">NotificationCenter</div>);

describe('App', () => {
  it('should render Navbar and ProductCatalog within providers', () => {
    render(<App />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('product-catalog')).toBeInTheDocument();
    expect(screen.getByTestId('notification-center')).toBeInTheDocument();
  });
});
