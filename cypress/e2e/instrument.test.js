/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/explore/instruments")
    cy.get("main").find("[data-cy=explore-card]").contains("2D-C/P").click()
  })

  describe("the header", () => {
    it("displays the short name", () => {
      cy.get("main").find("header").find("p").should("exist")
    })

    it("displays the long name as title", () => {
      cy.get("main").find("h1").should("exist")
      cy.get("h1").should("have.length", 3)
    })

    it("displays the long name as subtitle", () => {
      cy.get("main").find("header").find("p").should("exist")
    })
    it("displays the description", () => {
      cy.get("main").find("header").find("p").should("exist")
    })
  })
})
