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

  it("Navigates to all /campaign pages and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Explore/i)
      .click()

    cy.url().should("include", "/campaigns")

    // run a11y tests on each campaign page
    // TODO: figure out how each test can be its own 'it', in order to proceed after failure
    cy.get("[data-cy=explore-card]").each(($card, index) => {
      cy.get("[data-cy=explore-card]").eq(index).click().checkA11y()
      cy.go("back")
      cy.url().should("include", "/campaigns")
      cy.get("[data-cy=tabbar]") // ensure we went back to /explore
    })
  })

  it("Navigates to all /platform pages and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Explore/i)
      .click()

    cy.get("[data-cy=tabbar]")
      .findByText(/Platforms/i)
      .click()

    cy.url().should("include", "/platforms")

    // run a11y tests on each platform page
    // TODO: figure out how each test can be its own 'it', in order to proceed after failure
    cy.get("[data-cy=explore-card]").each(($card, i) => {
      cy.get("[data-cy=explore-card]").eq(i).click().checkA11y()
      cy.go("back")
      cy.url().should("include", "/platforms")
      cy.get("[data-cy=tabbar]") // ensure we went back to /explore
    })
  })

  it("Navigates to all /instrument pages and checks for accessibility violations", () => {
    cy.get("nav")
      .findByText(/Explore/i)
      .click()

    cy.get("[data-cy=tabbar]")
      .findByText(/Instruments/i)
      .click()

    cy.url().should("include", "/instruments")

    // run a11y tests on each instrument page
    // TODO: figure out how each test can be its own 'it', in order to proceed after failure
    cy.get("[data-cy=explore-card]").each(($card, i) => {
      cy.get("[data-cy=explore-card]").eq(i).click().checkA11y()
      cy.go("back")
      cy.url().should("include", "/instruments")
      cy.get("[data-cy=tabbar]") // ensure we went back to /explore
    })
  })

  it("Navigates to page /resources and checks for accessibility violations", () => {
    cy.get("[data-cy=nav-select]").select("glossary").checkA11y()
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
