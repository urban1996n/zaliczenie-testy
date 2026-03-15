import { cartSelectors } from '../selectors/cartSelectors';
import { commonSelectors } from '../selectors/commonSelectors';
import { navbarSelectors } from '../selectors/navbarSelectors';
import { productSelectors } from '../selectors/productSelectors';
import type { Product } from '../support/commandTypes';

describe('Store E2E Tests', () => {
  const username = 'TestUser';
  const laptopPro: Product = {
    name: 'Laptop Pro',
    description: 'Powerful laptop for professionals.',
    price: 1200,
    imageUrl: '/images/laptop.jpg',
  };
  const wirelessMouse: Product = {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse.',
    price: 25,
    imageUrl: '/images/mouse.webp',
  };
  const login = () => cy.login(username);
  const addLaptopToCart = (amount = 1) => cy.addProductToCart({ product: laptopPro, amount });
  const addWirelessMouseToCart = (amount = 1) => cy.addProductToCart({ product: wirelessMouse, amount });
  const getAlert = (message: string) => cy.contains(commonSelectors.alert, message);
  const getCartItems = () => cy.get(cartSelectors.items);
  const getCartTotal = () => cy.get(cartSelectors.total);
  const assertUsername = (name: string) => cy.get(navbarSelectors.userInfo).should('contain', name);
  const getProductListHeading = () => cy.contains(productSelectors.productListHeading, 'Our Products');
  const getProductDetailsTitle = () => cy.get(productSelectors.productDetailsTitle);
  const getCommentsHeading = () => cy.contains(productSelectors.commentsHeading, 'Comments');
  const goBackToProducts = () => cy.contains('button', 'Back to products').click();
  const getComment = (comment: string) => cy.contains(comment);

  beforeEach(() => {
    cy.visitStore();
  });

  it('should login successfully', () => {
    login();
    getAlert(`Logged in as ${username}.`).should('be.visible');
  });

  it('should logout successfully', () => {
    login();
    cy.logout();
    getAlert('Logged out successfully.').should('be.visible');
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

  it('should open product details', () => {
    cy.openProductDetails(0);

    getProductDetailsTitle().should('contain', 'Laptop Pro');
    getCommentsHeading().should('be.visible');
  });

  it('should return from product details to the product list', () => {
    cy.openProductDetails(0);

    goBackToProducts();
    getProductListHeading().should('be.visible');
  });

  it('should save a comment and show confirmation alert', () => {
    const comment = `E2E comment ${Date.now()}`;

    login();
    cy.openProductDetails(0);
    cy.addProductComment(comment);

    getAlert('Comment saved.').should('be.visible');
    getComment(comment).should('be.visible');
  });

  it('should persist comments after reload', () => {
    const comment = `E2E comment ${Date.now()}`;

    login();
    cy.openProductDetails(0);
    cy.addProductComment(comment);

    cy.reload();

    getProductDetailsTitle().should('contain', 'Laptop Pro');
    getComment(comment).should('be.visible');
  });
});
