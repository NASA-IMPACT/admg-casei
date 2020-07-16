/// <reference types="Cypress" />

describe("Platfrom", () => {
  before(() => {
    cy.visit("/explore/platforms")
    cy.get("main").find("[data-cy=explore-card]").contains("DC-8").click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("[data-cy=platfrom-hero]").first().find("p").contains("DC-8")
    })

    it("displays the long name as title", () => {
      cy.get("[data-cy=platform-hero]")
        .first()
        .find("h1")
        .contains("Douglas DC-8")
    })

    it("displays platform image", () => {
      cy.get("[data-cy=platform-hero]").first().find("img").should("exist")
      cy.get("[data-cy=platform-hero]").first().find("img").should("be.visible")
    })

    it("displays 2 big numbers", () => {
      cy.get("main")
        .find("header")
        .find("[data-cy=stats]")
        .find("dd")
        .should($stat => {
          expect($stat, "2 items").to.have.length(2)
          expect($stat.eq(0), "first item").to.contain("Campaigns")
          expect($stat.eq(1), "second item").to.contain("Flights")
        })
    })
  })

  describe("the overview section", () => {
    it("exists", () => {
      cy.get("[data-cy=platform-overview-section]").should("exist")
    })

    it("displays a description", () => {
      cy.get("[data-cy=platform-overview-section]")
        .first()
        .find("p")
        .should("exist")
    })
  })
})
