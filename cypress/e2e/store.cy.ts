import { productListPage } from '../page_objects/ProductListPage';
import { cartModal } from '../page_objects/CartModal';
import {navbar} from "../page_objects/Navbar";

describe('Store E2E Tests', () => {
  const username = 'TestUser';

  beforeEach(() => {
    productListPage.visit();
  });

  it('should login and logout successfully', () => {
    cy.login(username);
    cy.logout();
  });

  it('should add products to cart and manage them', () => {
    cy.login(username);

    productListPage.addToCart(0);
    productListPage.addToCart(1);

    productListPage.openCart();

    cartModal.getCartItems().should('have.length', 2);
    cartModal.getTotal().should('not.contain', '$0.00');

    cartModal.removeItem(0);
    cartModal.getCartItems().should('have.length', 1);

    cartModal.clearCart();
    cy.contains('Your cart is empty.').should('be.visible');

    cartModal.close();
    cy.logout();
  });

  it('should persist cart in session storage', () => {
    cy.login(username);
    productListPage.addToCart(0);
    
    cy.reload();
    
    navbar.assertUsername(username);
    
    productListPage.openCart();
    cartModal.getCartItems().should('have.length', 1);
    
    cartModal.close();
    cy.logout();
  });
});
