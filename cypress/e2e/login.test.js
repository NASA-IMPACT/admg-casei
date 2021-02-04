describe("Login", () => {
  beforeEach(() => {
    cy.visit("/campaign/2a5f6d7b-2f5a-4c63-9199-62bebb98d2c4", {
      // using onLoad to overwrite fetch from cypress/support/index.json - is there a better way?
      onLoad: win => {
        win.fetch = () =>
          new Promise(resolve => {
            resolve({
              ok: true,
              json: () => ({
                access_token: "ks2zW9_random-token",
                expires_in: 36000,
                token_type: "Bearer",
                scope: "read write",
                refresh_token: "NSNOHi_random-token",
              }),
            })
          })
      },
    })
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

    cy.get("[type=Submit]")
      .click()
      .should(() => {
        expect(sessionStorage.getItem("token")).to.exist
      })

    cy.get("[data-cy=login-form]").should("not.be.visible")

    cy.get("footer")
      .find("button")
      .contains("Log out")
      .click()
      .next()
      .should(() => {
        expect(sessionStorage.getItem("token")).not.to.exist
      })
  })

  afterEach(() => {
    // ensure token is removed in case of errors
    sessionStorage.removeItem("token")
  })
})
