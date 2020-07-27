describe("Login", () => {
  beforeEach(() => {
    cy.visit("/campaign/c0dc0d63-e32a-4fdc-b1ac-4f0e8a5c7754")
  })

  it("opens a login modal and fills in credentials", () => {
    cy.get("footer").find("button").contains("Maintenance login").click()
    cy.get("[data-cy=login-form]").should("be.visible")

    const username = Cypress.env("username")
    const password = Cypress.env("password")

    expect(username, "username was set").to.be.a("string").and.not.be.empty
    // the password value should not be shown in the Command Log
    if (typeof password !== "string" || !password) {
      throw new Error(
        "Missing password value, run tests with CYPRESS_password=..."
      )
    }

    cy.get("[name=username]").type(username)
    cy.get("[name=password]")
      .type(password, { log: false })
      .should(el$ => {
        if (el$.val() !== password) {
          throw new Error("Different value of typed password")
        }
      })

    // TODO: stub auth api
    cy.get("[type=Submit]")
      .click()
      .next()
      .should(() => {
        // expect(sessionStorage.getItem("token")).to.exist
      })

    // cy.get("[data-cy=login-form]").should("not.be.visible")
    // cy.get("footer").find("button").contains("Log out")
  })
})
