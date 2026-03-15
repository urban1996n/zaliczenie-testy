import {
  getAlert,
  getComment,
  getCommentsHeading,
  getProductDetailsTitle,
  getProductListHeading,
} from '../utils/storeQueries';
import { addProductToCartFromDetails, goBackToProducts, loginUser } from '../utils/storeActions';

describe('Product E2E Tests', () => {
  const username = 'TestUser';
  const login = () => loginUser(username);

  beforeEach(() => {
    cy.visitStore();
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

  it('should add a product to cart from the details page', () => {
    login();
    cy.openProductDetails(0);

    addProductToCartFromDetails();
    getAlert('Laptop Pro added to cart.').should('be.visible');
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
