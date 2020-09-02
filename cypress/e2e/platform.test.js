/// <reference types="Cypress" />

describe("Platform", () => {
  before(() => {
    cy.visit("/explore/platforms")
    cy.get("main").find("[data-cy=explore-card]").contains("DC-8").click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("[data-cy=platform-hero]").first().find("p").contains("DC-8")
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
      cy.get("[data-cy=platform-hero]")
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

  describe("the related campaign section", () => {
    it("exists", () => {
      cy.get("[data-cy=platform-related-campaigns-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=platform-related-campaigns-section]")
        .find("h2")
        .should("have.text", "Related Campaigns")
    })

    it("displays a carousel", () => {
      cy.get("[data-cy=related-campaign-carousel]")
        .find(".slider")
        .should("exist")

      cy.get("[data-cy=related-campaign]").within(() => {
        cy.get("[data-cy=explore-card]").should("exist")
      })

      cy.get("[data-cy=related-campaign-carousel]")
        .find(".slider-control-centerright > button")
        .click({ force: true })
    })
  })
})
