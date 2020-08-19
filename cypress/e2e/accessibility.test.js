/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/")

    cy.get("header").injectAxe()
    cy.get("main").injectAxe()
    cy.get("footer").injectAxe()
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y()
  })

  it("Navigates to page /explore and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Explore/i)
      .click()
      .checkA11y()
  })

  it("Navigates to page for a /campaign and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Explore/i)
      .click()
    cy.get("[data-cy=explore-card]").first().click().checkA11y()
  })

  it("Navigates to page /glossary and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Glossary/i)
      .click()
      .checkA11y()
  })

  it("Navigates to page /about and checks for accessibility violations", () => {
    cy.get("nav").findByText(/About/i).click().checkA11y()
  })

  it("Navigates to page /contact and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Contact/i)
      .click()
      .checkA11y()
  })
})
