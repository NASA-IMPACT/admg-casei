/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/instrument/ACAM")
  })

  it("explains the instrument", () => {
    // has a hero
    cy.get("[data-cy=instrument-hero]").first().find("p").should("exist")
    cy.get("[data-cy=instrument-hero]").first().find("p").contains("Instrument")

    cy.get("[data-cy=instrument-hero]")
      .first()
      .find("h1")
      .should("contain", "ACAM")
      .and("contain", "Airborne Compact Atmospheric Mapper")

    cy.get("[data-cy=instrument-hero]").first().find("img").should("exist")
    cy.get("[data-cy=instrument-hero]").first().find("img").should("be.visible")

    // displays an overview section
    cy.get("[data-cy=overview-section]").should("exist")

    // displays inpage nav
    cy.get("[data-cy=inpage-nav]").find("[data-cy=home-link]").should("exist")
    cy.get("[data-cy=home-link]").click()

    cy.url().should("eq", "http://localhost:8000/")
    cy.go("back")

    cy.get("[data-cy=inpage-nav]")
      .find("a")
      .should($anchor => {
        expect($anchor, "5 items").to.have.length(5)
        expect($anchor.eq(0), "first item").to.contain("CASEI Logo")
        expect($anchor.eq(1), "second item").to.exist
        expect($anchor.eq(2), "third item").to.contain("Instrument Details")
        expect($anchor.eq(3), "fourth item").to.contain("Instrument Operation")
        expect($anchor.eq(4), "fifth item").to.contain("Data")
      })

    // describes overview content
    cy.get("[data-cy=overview-section]")
      .find("h2")
      .should("have.text", "Overview")
      .and("not.be.visible")

    cy.get("[data-cy=overview-section]")
      .find("h3")
      .should("have.text", "Instrument Details")

    cy.get("[data-cy=instrument-definition-list]").should("exist")

    cy.get("[data-cy=instrument-definition-list]")
      .find("dt")
      .should($dt => {
        expect($dt, "8 items").to.have.length(8)
      })

    cy.get("[data-cy=instrument-background]").should("exist")

    cy.get("[data-cy=instrument-manufacturer-label]").should("exist")
    cy.get("[data-cy=funding-source-label]").should("exist")
    cy.get("[data-cy=data-locations-label]").should("exist")
    cy.get("[data-cy=repositories-label]").should("exist")
    cy.get("[data-cy=repository-list]")
      .children()
      .should($li => {
        expect($li, "item").to.have.length.of.at.least(1)
      })

    cy.get("[data-cy=data-section]").should("exist")

    cy.get("[data-cy=data-section]")
      .find("h2")
      .should("have.text", "Data Products")

    cy.get("[data-cy=data-product]").should($div => {
      expect($div).to.have.length.of.at.least(1)
    })
    cy.get("[data-cy=data-product]")
      .first()
      .find("[data-cy=doi-label]")
      .should("exist")

    cy.get("[data-cy=data-product]")
      .first()
      .find("[data-cy=doi-link]")
      .should("exist")

    cy.get("[data-cy=data-product-campaigns]")
      .first()
      .find("[data-cy=doi-campaign-label]")
      .should("exist")
      .and("have.text", "Campaigns")

    cy.get("[data-cy=data-product-platforms]")
      .first()
      .find("[data-cy=doi-platform-label]")
      .should("exist")
      .and("have.text", "Platforms")

    cy.get("[data-cy=entities-section]").should("exist")

    cy.get("[data-cy=entities-section]")
      .find("h2")
      .should("have.text", "Instrument Operation")

    cy.get("[data-cy=instrument-related-entities-table]")
      .find("th")
      .should($th => {
        expect($th.eq(0), "first item").to.contain("Platform")
        expect($th.eq(1), "second item").to.contain("Campaigns")
      })

    cy.get("[data-cy=related-platform]").find("big").first().should("exist")

    cy.get("[data-cy=related-campaign]").find("big").first().should("exist")
  })
})
