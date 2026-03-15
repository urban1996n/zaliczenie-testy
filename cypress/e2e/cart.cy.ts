import { closeCartModal } from '../utils/modalActions';
import {
  assertUsername,
  getAlert,
  getCartItems,
  getCartTotal,
} from '../utils/storeQueries';
import { getCartModal } from '../utils/modalQueries';
import { addLaptopToCart, addWirelessMouseToCart, loginUser } from '../utils/storeActions';

describe('Cart E2E Tests', () => {
  const username = 'TestUser';
  const login = () => loginUser(username);

  beforeEach(() => {
    cy.visitStore();
  });

  it('should add a product to cart and show confirmation alert', () => {
    login();

    addLaptopToCart();
    getAlert('Laptop Pro added to cart.').should('be.visible');

    cy.openCart();
    getCartItems().should('have.length', 1);
    getCartTotal().should('contain', '$1200.00');
  });

  it('should add multiple products to cart', () => {
    login();

    addLaptopToCart();
    addWirelessMouseToCart();

    cy.openCart();
    getCartItems().should('have.length', 2);
    getCartTotal().should('not.contain', '$0.00');
  });

  it('should close cart modal', () => {
    login();
    addLaptopToCart();

    cy.openCart();
    getCartModal().should('be.visible');

    closeCartModal();
    getCartModal().should('not.exist');
  });

  it('should remove a product from cart and show confirmation alert', () => {
    login();

    addLaptopToCart();
    addWirelessMouseToCart();

    cy.openCart();
    cy.removeCartItem(0);

    getAlert('Laptop Pro removed from cart.').should('be.visible');
    getCartItems().should('have.length', 1);
  });

  it('should clear cart and show confirmation alert', () => {
    login();

    addLaptopToCart();
    addWirelessMouseToCart();

    cy.openCart();
    cy.clearCart();

    getAlert('Cart cleared.').should('be.visible');
    cy.contains('Your cart is empty.').should('be.visible');
  });

  it('should persist cart in session storage', () => {
    login();
    addLaptopToCart();

    cy.reload();

    assertUsername(username);
    cy.openCart();
    getCartItems().should('have.length', 1);
  });
});
