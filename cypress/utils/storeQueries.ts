import { cartSelectors } from '../selectors/cartSelectors';
import { commonSelectors } from '../selectors/commonSelectors';
import { navbarSelectors } from '../selectors/navbarSelectors';
import { productSelectors } from '../selectors/productSelectors';

export const getAlert = (message: string) => cy.contains(commonSelectors.alert, message);

export const getCartItems = () => cy.get(cartSelectors.items);

export const getCartTotal = () => cy.get(cartSelectors.total);

export const assertUsername = (name: string) =>
  cy.get(navbarSelectors.userInfo).should('contain', name);

export const getProductListHeading = () =>
  cy.contains(productSelectors.productListHeading, 'Our Products');

export const getProductDetailsTitle = () => cy.get(productSelectors.productDetailsTitle);

export const getCommentsHeading = () =>
  cy.contains(productSelectors.commentsHeading, 'Comments');

export const getComment = (comment: string) => cy.contains(comment);
