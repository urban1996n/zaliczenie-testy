/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (username: string) => {
  cy.get('[data-testid="nav-login"]').click();
  cy.get('[data-testid="login-username"]').type(username);
  cy.get('[data-testid="login-submit"]').click();
  cy.get('[data-testid="user-info"]').should('contain', username);
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="nav-logout"]').click();
  cy.get('[data-testid="nav-login"]').should('be.visible');
});

export {};
