import {navbar} from "./Navbar";

export class ProductListPage {
  visit() {
    cy.visit('/');
  }

  addToCart(index: number) {
    cy.get('[data-testid="add-to-cart"]').eq(index).click();
  }

  openCart() {
    navbar.openCart();
  }
}

export const productListPage = new ProductListPage();
