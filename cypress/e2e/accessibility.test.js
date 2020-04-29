/* eslint-disable jest/expect-expect */
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

  it("Navigates to page /resources and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Resources/i)
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
