import { productListPage } from '../page_objects/ProductListPage';
import { cartModal } from '../page_objects/CartModal';

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

    // Add first two products
    productListPage.addToCart(0);
    productListPage.addToCart(1);

    // Open cart
    productListPage.openCart();

    // Verify items in cart
    cartModal.getCartItems().should('have.length', 2);
    cartModal.getTotal().should('not.contain', '$0.00');

    // Remove first item
    cartModal.removeItem(0);
    cartModal.getCartItems().should('have.length', 1);

    // Clear cart
    cartModal.clearCart();
    cy.contains('Your cart is empty.').should('be.visible');

    cartModal.close();
    cy.logout();
  });

  it('should persist cart in session storage', () => {
    cy.login(username);
    productListPage.addToCart(0);
    
    // Reload page
    cy.reload();
    
    // Check if still logged in (it should be because of session storage in AuthContext)
    cy.get('[data-testid="user-info"]').should('contain', username);
    
    // Open cart and check item
    productListPage.openCart();
    cartModal.getCartItems().should('have.length', 1);
    
    cartModal.close();
    cy.logout();
  });
});
