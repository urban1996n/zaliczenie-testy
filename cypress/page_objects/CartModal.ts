export class CartModal {
  getCartItems() {
    return cy.get('[data-testid^="cart-item-"]');
  }

  removeItem(index: number) {
    cy.get('[data-testid^="remove-from-cart-"]').eq(index).click();
  }

  clearCart() {
    cy.get('[data-testid="clear-cart"]').click();
  }

  close() {
    cy.get('[data-testid="close-cart"]').click();
  }

  getTotal() {
    return cy.get('[data-testid="cart-total"]');
  }
}

export const cartModal = new CartModal();
