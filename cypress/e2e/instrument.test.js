/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/explore")
    cy.get("[data-cy=tabbar]").contains("button", "Instruments").click()
    cy.get("[data-cy=instruments-card]").contains("CPL").click()
  })

  it("explains the instrument", () => {
    cy.get("[data-cy=instrument-hero]").first().find("p").contains("Instrument")

    cy.get("[data-cy=instrument-hero]").first().find("h1").contains("CPL")

    cy.get("[data-cy=instrument-hero]")
      .first()
      .find("p")
      .contains("Cloud Physics LIDAR")

    cy.get("[data-cy=instrument-hero]").first().find("p").should("exist")

    cy.get("[data-cy=instrument-hero]").first().find("img").should("exist")
    cy.get("[data-cy=instrument-hero]").first().find("img").should("be.visible")

    cy.get("[data-cy=overview-section]").should("exist")

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

    cy.get("[data-cy=lead-investigator-label]").should("exist")
    cy.get("[data-cy=technical-contact-label]").should("exist")
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
      expect($div).to.have.length.of.at.least(2)
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
        expect($th, "2 items").to.have.length(2)
        expect($th.eq(0), "first item").to.contain("Platform")
        expect($th.eq(1), "second item").to.contain("Campaigns")
      })

    cy.get("[data-cy=related-platform]").find("big").first().should("exist")

    cy.get("[data-cy=related-campaign]").find("big").first().should("exist")
  })
})
