import { closeLoginModal } from '../utils/modalActions';
import { getAlert } from '../utils/storeQueries';
import { getLoginModal } from '../utils/modalQueries';
import { openLoginModal } from '../utils/storeActions';
import { loginSelectors } from '../selectors/loginSelectors';

describe('Auth E2E Tests', () => {
  const username = 'TestUser';

  beforeEach(() => {
    cy.visitStore();
  });

  it('should login successfully', () => {
    cy.login(username);
    getAlert(`Logged in as ${username}.`).should('be.visible');
  });

  it('should close login modal', () => {
    openLoginModal();
    getLoginModal().should('be.visible');

    closeLoginModal();
    getLoginModal().should('not.exist');
  });

  it('should logout successfully', () => {
    cy.login(username);
    cy.logout();
    getAlert('Logged out successfully.').should('be.visible');
  });

  it('should keep login modal closed after submitting credentials', () => {
    openLoginModal();
    cy.get(loginSelectors.usernameInput).type(username);
    cy.get(loginSelectors.submitButton).click();

    getLoginModal().should('not.exist');
    getAlert(`Logged in as ${username}.`).should('be.visible');
  });
});
