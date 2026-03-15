/// <reference types="cypress" />
import type { Product as AppProduct } from '../../src/types/Product';

type Product = Pick<AppProduct, 'name' | 'description' | 'price' | 'imageUrl'>;

type AddProductToCartArgs = {
  product: Product;
  amount: number;
}


declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string): Chainable<void>;
      logout(): Chainable<void>;
      visitStore(): Chainable<void>;
      openCart(): Chainable<JQuery<HTMLElement>>;
      addProductToCart(args: AddProductToCartArgs): Chainable<JQuery<HTMLElement>>;
      openProductDetails(index: number): Chainable<JQuery<HTMLElement>>;
      removeCartItem(index: number): Chainable<JQuery<HTMLElement>>;
      clearCart(): Chainable<JQuery<HTMLElement>>;
      addProductComment(comment: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export type {Product, AddProductToCartArgs};
