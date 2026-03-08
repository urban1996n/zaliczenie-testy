class LoginPopup {
    get(){
        return cy.get('[data-testid="login-modal"]');
    }

    enterUsername(username: string) {
        return this
            .get()
            .get('[data-testid="login-username"]')
            .should('exist')
            .and('be.visible')
            .type(username, {delay: 100});
    }

    public login() {
        return this.get()
            .get('[data-testid="login-submit"]')
            .should('exist')
            .and('be.visible')
            .click();
    }
}

export const loginPopup = new LoginPopup();