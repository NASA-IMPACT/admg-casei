/// <reference types="Cypress" />

describe("Platform", () => {
  before(() => {
    cy.visit("/explore")
    cy.get("[data-cy=tabbar]").contains("button", "Platforms").click()
    cy.get("[data-cy=platforms-card]").contains("DC-8").click()
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
      cy.get("[data-cy=overview-section]").should("exist")
    })

    it("displays a description", () => {
      cy.get("[data-cy=overview-section]").first().find("p").should("exist")
    })
  })

  describe.skip("the data section", () => {
    before(() => {
      cy.visit("/explore")
      cy.get("[data-cy=tabbar]").contains("button", "Platforms").click()
      cy.get("[data-cy=platforms-card]").contains("DC-8").click()
    })

    it("exists", () => {
      cy.get("[data-cy=data-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=data-section]")
        .find("h2")
        .should("have.text", "Data Products")
    })

    it("displays some data products", () => {
      cy.get("[data-cy=data-product]").should($div => {
        expect($div).to.have.length.of.at.least(5)
      })
    })

    it("each data product has a label and a doi", () => {
      cy.get("[data-cy=data-product]")
        .first()
        .find("[data-cy=doi-label]")
        .should("exist")
        .and(
          "have.text",
          "GPM GROUND VALIDATION AIRBORNE SECOND GENERATION PRECIPITATION RADAR (APR-2) GCPEX V1"
        )

      cy.get("[data-cy=data-product]")
        .first()
        .find("[data-cy=doi-link]")
        .should("exist")

      cy.get("[data-cy=data-product-campaigns]")
        .first()
        .find("[data-cy=doi-campaign-label]")
        .should("exist")
        .and("have.text", "Campaigns")

      cy.get("[data-cy=data-product-instruments]")
        .first()
        .find("[data-cy=doi-instrument-label]")
        .should("exist")
        .and("have.text", "Instruments")
    })
  })

  describe.skip("the related campaign section", () => {
    it("exists", () => {
      cy.get("[data-cy=platform-campaigns-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=platform-campaigns-section]")
        .find("h2")
        .should("have.text", "Related Campaigns & Instruments")
    })

    it("displays a carousel", () => {
      cy.get("[data-cy=campaign-carousel]").find(".slider").should("exist")

      cy.get("[data-cy=carousel-campaign-card-link]")
        .should("exist")
        .first()
        .click()
      cy.url().should("include", "campaign")
      cy.go("back")

      cy.get("[data-cy=campaign-carousel]").find(
        ".slider-control-centerright > button"
      )
    })

    it("contains an accordion", () => {
      cy.get("[data-cy=instrument-accordion]")
        .should("exist")
        .find("[data-cy=accordion-button]")
        .first()
        .click()
      cy.get("[data-cy=instrument-accordion-content]")
        .should("exist")
        .find("img")
      cy.get("[data-cy=instrument-accordion-content]").find(
        "[data-cy=instrument-accordion-image-description]"
      )
      cy.get("[data-cy=accordion-measurements-label]").should("exist")
      cy.get("[data-cy=accordion-link]").should("exist").first().click()

      cy.url().should("include", "instrument")
      cy.go("back")
    })
  })
})
