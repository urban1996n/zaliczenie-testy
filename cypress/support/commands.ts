/// <reference types="cypress" />

import {navbar} from "../page_objects/Navbar";
import {loginPopup} from "../page_objects/LoginPopup";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (username: string) => {
  navbar.openLoginPopup();
  loginPopup.enterUsername(username);
  loginPopup.login();
  navbar.assertUsername(username);
});

Cypress.Commands.add('logout', () => {
  navbar.logout();
  navbar.getLoginButton().should('exist').and('be.visible');
});

export {};
