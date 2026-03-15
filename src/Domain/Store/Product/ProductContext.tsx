import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Product, ProductComment } from '../../../types/Product';
import { useNotification } from '../../UI/Notification/NotificationContext';

const PRODUCT_SELECTION_STORAGE_KEY = 'selectedProductId';
const PRODUCT_COMMENTS_STORAGE_KEY = 'productComments';

interface ProductContextType {
  products: Product[];
  error: string | null;
  selectedProduct: Product | null;
  selectedProductComments: ProductComment[];
  selectProduct: (productId: string) => void;
  clearSelectedProduct: () => void;
  addComment: (text: string, author: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const readStoredComments = (): Record<string, ProductComment[]> => {
  const storedComments = localStorage.getItem(PRODUCT_COMMENTS_STORAGE_KEY);
  return storedComments ? JSON.parse(storedComments) : {};
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    return sessionStorage.getItem(PRODUCT_SELECTION_STORAGE_KEY);
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (e: unknown) {
        setError(`Failed to fetch products: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const syncSelectedProduct = () => {
      const hashProductId = window.location.hash.startsWith('#product/')
        ? window.location.hash.replace('#product/', '')
        : null;
      const storedProductId = sessionStorage.getItem(PRODUCT_SELECTION_STORAGE_KEY);

      setSelectedProductId(hashProductId ?? storedProductId);
    };

    syncSelectedProduct();
    window.addEventListener('hashchange', syncSelectedProduct);

    return () => window.removeEventListener('hashchange', syncSelectedProduct);
  }, []);

  const selectProduct = (productId: string) => {
    sessionStorage.setItem(PRODUCT_SELECTION_STORAGE_KEY, productId);
    window.location.hash = `product/${productId}`;
    setSelectedProductId(productId);
  };

  const clearSelectedProduct = () => {
    sessionStorage.removeItem(PRODUCT_SELECTION_STORAGE_KEY);
    window.location.hash = '';
    setSelectedProductId(null);
  };

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? null;
  const selectedProductComments = selectedProduct
    ? readStoredComments()[selectedProduct.id] ?? selectedProduct.comments ?? []
    : [];

  const addComment = (text: string, author: string) => {
    if (!selectedProduct || !text.trim()) {
      return;
    }

    const newComment: ProductComment = {
      id: `${selectedProduct.id}-${Date.now()}`,
      author,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const storedComments = readStoredComments();
    localStorage.setItem(
      PRODUCT_COMMENTS_STORAGE_KEY,
      JSON.stringify({
        ...storedComments,
        [selectedProduct.id]: [...selectedProductComments, newComment],
      }),
    );

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, comments: [...selectedProductComments, newComment] }
          : product,
      ),
    );

    showNotification('Comment saved.', 'success');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        error,
        selectedProduct,
        selectedProductComments,
        selectProduct,
        clearSelectedProduct,
        addComment,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};
