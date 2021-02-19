/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  it("Has no detectable accessibility violations on load", () => {
    cy.visit("/")
    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page /explore and checks for accessibility violations", () => {
    cy.visit("/explore")
    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.get("[data-cy=tabbar]").should("exist")

    cy.checkA11y()
  })

  it("Navigates to page for a /campaign and checks for accessibility violations", () => {
    cy.visit("/explore")

    cy.get("[data-cy=tabbar]")
      .findByText(/Campaigns/i)
      .click()

    cy.get("[data-cy=campaigns-card]").first().click()

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page for a /platform and checks for accessibility violations", () => {
    cy.visit("/explore")

    cy.get("[data-cy=tabbar]")
      .findByText(/Platforms/i)
      .click()

    cy.get("[data-cy=platforms-card]").last().click()

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page for a /instrument and checks for accessibility violations", () => {
    cy.visit("/explore")

    cy.get("[data-cy=tabbar]")
      .findByText(/Instruments/i)
      .click()

    cy.get("[data-cy=instruments-card]").first().click()

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page /glossary and checks for accessibility violations", () => {
    cy.visit("/glossary")

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page /about and checks for accessibility violations", () => {
    cy.visit("/about")

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })

  it("Navigates to page /contact and checks for accessibility violations", () => {
    cy.visit("/contact")

    cy.get("h1").should("exist")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()

    cy.checkA11y()
  })
})
