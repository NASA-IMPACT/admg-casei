describe("Campaign Edit", () => {
  // logs in to access edit form
  beforeEach(() => {
    cy.visit("campaign/c0dc0d63-e32a-4fdc-b1ac-4f0e8a5c7754", {
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

    cy.get("footer").find("button").contains("Maintenance login").click()
    cy.get("[data-cy=login-form]")
    const username = Cypress.env("username")
    const password = Cypress.env("password")

    cy.get("[name=username]").type(username)
    cy.get("[name=password]").type(password, { log: false })

    cy.get("[type=Submit]").click()
    cy.get("[data-cy=edit-btn]").click()
  })

  it("displays edit form", () => {
    cy.get("[data-cy=edit-section]")
      .should("be.visible")
      .find("h2")
      .contains("Header Data")
    cy.get("[data-cy=edit-section-form").should("exist")
  })

  it("displays data in form", () => {
    cy.get("[data-cy=edit-input-group]")
    cy.get('input[name="shortname"]').should("have.value", "AirMOSS")
    cy.get('input[name="longname"]').should(
      "have.value",
      "Airborne Microwave Observatory of Subcanopy and Subsurface"
    )
    cy.get('input[name="bounds"]').should(
      "have.value",
      "SRID=4326;POLYGON ((-68 60, -68 8, -125 8, -125 60, -68 60))"
    )
    cy.get('input[name="focusListing"]').should(
      "have.value",
      "Carbon Cycle & Ecosystems, Earth Surface & Interior"
    )
    cy.get('input[name="countDeployments"]').should("have.value", "34")
    cy.get('input[name="countCollectionPeriods"]').should("have.value", "0")
    cy.get('input[name="countDataProducts"]').should("have.value", "0")
  })

  it("submits the form", () => {
    cy.get("[data-cy=edit-section-form]").submit()
  })

  afterEach(() => {
    // ensure token is removed in case of errors
    sessionStorage.removeItem("token")
  })
})
