import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ProductProvider, useProducts } from '../../../../src/Domain/Store/Product/ProductContext';
import { NotificationProvider } from '../../../../src/Domain/UI/Notification/NotificationContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NotificationProvider>
    <ProductProvider>{children}</ProductProvider>
  </NotificationProvider>
);

const mockProducts = [
  {
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
  },
];

describe('ProductContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.hash = '';
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load products and expose them', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
    });

    expect(result.current.products[0].name).toBe('Laptop Pro');
  });

  it('should persist product selection in sessionStorage', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
    });

    act(() => {
      result.current.selectProduct('1');
    });

    expect(result.current.selectedProduct?.id).toBe('1');
    expect(sessionStorage.getItem('selectedProductId')).toBe('1');
  });

  it('should store comments in localStorage', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
    });

    act(() => {
      result.current.selectProduct('1');
    });

    act(() => {
      result.current.addComment('New comment', 'testuser');
    });

    expect(JSON.parse(localStorage.getItem('productComments') ?? '{}')).toMatchObject({
      '1': expect.arrayContaining([
        expect.objectContaining({ text: 'New comment', author: 'testuser' }),
      ]),
    });
  });

  it('should expose an error when fetching products fails', async () => {
    (window.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch products: Fetch failed');
    });
  });

  it('should expose an error when the response is not ok', async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch products: HTTP error! status: 404');
    });
  });
});
