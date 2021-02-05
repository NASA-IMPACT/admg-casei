/// <reference types="Cypress" />

describe("Platform", () => {
  before(() => {
    cy.visit("/explore")
    cy.get("[data-cy=tabbar]").contains("button", "Platforms").click()
    cy.get("[data-cy=platforms-card]").contains("DC-8").click()
  })

  it("explains the platform", () => {
    cy.get("[data-cy=platform-hero]").first().find("p").contains("DC-8")

    cy.get("[data-cy=platform-hero]")
      .first()
      .find("h1")
      .contains("Douglas DC-8")

    cy.get("[data-cy=platform-hero]").first().find("img").should("exist")
    cy.get("[data-cy=platform-hero]").first().find("img").should("be.visible")

    cy.get("[data-cy=platform-hero]")
      .find("[data-cy=stats]")
      .find("dd")
      .should($stat => {
        expect($stat, "2 items").to.have.length(2)
        expect($stat.eq(0), "first item").to.contain("Campaigns")
        expect($stat.eq(1), "second item").to.contain("Flights")
      })

    cy.get("[data-cy=overview-section]").should("exist")

    cy.get("[data-cy=overview-section]").first().find("p").should("exist")

    cy.get("[data-cy=data-section]").should("exist")

    cy.get("[data-cy=data-section]")
      .find("h2")
      .should("have.text", "Data Products")

    cy.get("[data-cy=data-product]").should($div => {
      expect($div).to.have.length.of.at.least(5)
    })

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

    cy.get("[data-cy=platform-campaigns-section]").should("exist")

    cy.get("[data-cy=platform-campaigns-section]")
      .find("h2")
      .should("have.text", "Related Campaigns & Instruments")

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

    cy.get("[data-cy=instrument-accordion]")
      .should("exist")
      .find("[data-cy=accordion-button]")
      .first()
      .click()
    cy.get("[data-cy=instrument-accordion-content]").should("exist").find("img")
    cy.get("[data-cy=instrument-accordion-content]").find(
      "[data-cy=instrument-accordion-image-description]"
    )
    cy.get("[data-cy=accordion-measurements-label]").should("exist")
    cy.get("[data-cy=accordion-link]").should("exist").first().click()

    cy.url().should("include", "instrument")
    cy.go("back")
  })
})
