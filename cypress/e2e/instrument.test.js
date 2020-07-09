/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/explore/instruments")
    cy.get("main").find("[data-cy=explore-card]").contains("2D-C/P").click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("main").find("header").find("p").contains("instruments")
    })

    it("displays the short name as title", () => {
      cy.get("main").find("h1").contains("2D-C/P")
    })

    it("displays the long name as subtitle", () => {
      cy.get("main")
        .find("header")
        .find("p")
        .contains("2D-C/P Hydrometeor Imaging Probe")
    })
    it("displays the description", () => {
      cy.get("main").find("header").find("p").should("exist")
    })
  })
})
