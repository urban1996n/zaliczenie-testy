class Navbar {
    get(){
        return cy.get('.navbar')
    }

    getLoginButton() {
        return this.get().get('[data-testid="nav-login"]')
    }

    getLogoutButton() {
        return this.get().get('[data-testid="nav-logout"]')
    }

    getCartButton() {
        return this.get().get('[data-testid="nav-cart"]')
    }

    openLoginPopup() {
        return this.getLoginButton().should('exist').and('be.visible').click();
    }

    logout() {
        return this.getLogoutButton().should('exist').and('be.visible').click();
    }

    openCart() {
        return this.getCartButton().should('exist').and('be.visible').click();
    }

    getUserInfo() {
        return this.get().get('[data-testid="user-info"]');
    }

    assertUsername(username: string) {
        return this.getUserInfo().should('exist').and('be.visible').and('contain', username);
    }
}

export const navbar = new Navbar;