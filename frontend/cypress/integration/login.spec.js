// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Login form testing", () => {
  it("should be able to successfully submit form (e2e)", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#emailInput").type("foobar@gmail.com");
    cy.get("#passwordInput").type("foobarfoobar");
    cy.get("#signInButton").click();
  });
});
