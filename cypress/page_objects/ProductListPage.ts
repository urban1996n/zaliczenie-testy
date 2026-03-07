export class ProductListPage {
  visit() {
    cy.visit('/');
  }

  getProducts() {
    return cy.get('[data-testid="product-name"]');
  }

  addToCart(index: number) {
    cy.get('[data-testid="add-to-cart"]').eq(index).click();
  }

  openCart() {
    cy.get('[data-testid="nav-cart"]').click();
  }
}

export const productListPage = new ProductListPage();
