import { modalSelectors } from '../selectors/modalSelectors';

export const closeLoginModal = () =>
  cy.get(modalSelectors.loginModal).find(modalSelectors.bootstrapCloseButton).click();

export const closeCartModal = () => cy.get(modalSelectors.closeCartButton).click();
