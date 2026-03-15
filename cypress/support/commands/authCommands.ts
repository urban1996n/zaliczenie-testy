import { loginSelectors } from '../../selectors/loginSelectors';
import { navbarSelectors } from '../../selectors/navbarSelectors';

Cypress.Commands.add('login', (username: string) => {
  cy.get(navbarSelectors.loginButton).should('be.visible').click();
  cy.get(loginSelectors.usernameInput).clear().type(username);
  cy.get(loginSelectors.submitButton).click();
  cy.get(navbarSelectors.userInfo).should('contain', username);
});

Cypress.Commands.add('logout', () => {
  cy.get(navbarSelectors.logoutButton).should('be.visible').click();
  cy.get(navbarSelectors.loginButton).should('be.visible');
});
