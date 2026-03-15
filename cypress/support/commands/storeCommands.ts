Cypress.Commands.add('visitStore', () => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.clear();
      win.sessionStorage.clear();
    },
  });
});
