describe("Register form testing", () => {
  it("should be able to successfully submit form (e2e)", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("#fullNameInput").type("foobar");
    cy.get("#emailInput").type("foobar@gmail.com");
    cy.get("#passwordInput").type("foobarfoobar");
    cy.get("#confirmPasswordInput").type("foobarfoobar");
  });
});
