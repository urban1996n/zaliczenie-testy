import { navbarSelectors } from '../selectors/navbarSelectors';
import { productSelectors } from '../selectors/productSelectors';
import { laptopPro, wirelessMouse } from './products';

export const loginUser = (username: string) => cy.login(username);

export const openLoginModal = () => cy.get(navbarSelectors.loginButton).click();

export const addLaptopToCart = (amount = 1) =>
  cy.addProductToCart({ product: laptopPro, amount });

export const addWirelessMouseToCart = (amount = 1) =>
  cy.addProductToCart({ product: wirelessMouse, amount });

export const addProductToCartFromDetails = () => cy.get(productSelectors.detailsAddToCartButton).click();

export const goBackToProducts = () => cy.get(productSelectors.backToProductsButton).click();
