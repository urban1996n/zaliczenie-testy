import { cartSelectors } from '../../selectors/cartSelectors';
import { navbarSelectors } from '../../selectors/navbarSelectors';

Cypress.Commands.add('openCart', () => {
  return cy.get(navbarSelectors.cartButton).should('be.visible').click();
});

Cypress.Commands.add('removeCartItem', (index: number) => {
  return cy.get(cartSelectors.removeButtons).eq(index).click();
});

Cypress.Commands.add('clearCart', () => {
  return cy.get(cartSelectors.clearButton).click();
});
