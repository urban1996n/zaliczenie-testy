import { modalSelectors } from '../selectors/modalSelectors';

export const getLoginModal = () => cy.get(modalSelectors.loginModal);

export const getCartModal = () => cy.get(modalSelectors.cartModal);
