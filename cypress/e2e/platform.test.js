/// <reference types="Cypress" />

describe("Platform", () => {
  before(() => {
    cy.visit("/explore/platforms")
    cy.wait(0)
    cy.get("[data-cy=platforms-card]")
      .find("big")
      .contains("DC-8")
      .parent()
      .click()
  })

  it("explains the platform", () => {
    cy.get("[data-cy=platform-hero]").first().find("p").contains("Platform")

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
        expect($stat.eq(1), "second item").to.contain("Collection Periods")
      })

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
        expect($anchor.eq(2), "third item").to.contain("Overview")
        expect($anchor.eq(3), "fourth item").to.contain(
          "Related Campaigns & Instruments"
        )
        expect($anchor.eq(4), "fifth item").to.contain("Data")
      })
    // displays overview
    cy.get("[data-cy=overview-section]").should("exist")

    cy.get("[data-cy=overview-section]")
      .find("h2")
      .should("have.text", "Overview")
      .and("not.be.visible")

    cy.get("[data-cy=overview-section]")
      .find("h3")
      .first()
      .should("have.text", "Overview")
      .and("be.visible")

    cy.get("[data-cy=link-list]").find("li").should("have.length.within", 0, 2)

    cy.get("[data-cy=overview-section]").first().find("p").should("exist")

    cy.get("[data-cy=data-section]").should("exist")

    cy.get("[data-cy=data-section]")
      .find("h2")
      .should("have.text", "Data Products")

    // TODO: add back once database is populated again

    // cy.get("[data-cy=data-product]").should($div => {
    //   expect($div).to.have.length.of.at.least(5)
    // })

    // cy.get("[data-cy=data-product]")
    //   .first()
    //   .find("[data-cy=doi-label]")
    //   .should("exist")

    // cy.get("[data-cy=data-product]")
    //   .first()
    //   .find("[data-cy=doi-link]")
    //   .should("exist")

    // cy.get("[data-cy=data-product-campaigns]")
    //   .first()
    //   .find("[data-cy=doi-campaign-label]")
    //   .should("exist")
    //   .and("have.text", "Campaigns")

    // cy.get("[data-cy=data-product-instruments]")
    //   .first()
    //   .find("[data-cy=doi-instrument-label]")
    //   .should("exist")
    //   .and("have.text", "Instruments")

    cy.get("[data-cy=campaigns-instruments-section]").should("exist")

    cy.get("[data-cy=campaigns-instruments-section]")
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
