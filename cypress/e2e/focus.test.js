/// <reference types="Cypress" />

describe("Focus Area", () => {
  before(() => {
    cy.visit("/")
    cy.get("[data-cy=focus-area-section]")
      .find("[data-cy=focus-area]")
      .contains("Global Water & Energy Cycle")
      .click()
  })
  it("explains the focus area Global Water & Energy Cycle", () => {
    cy.get("[data-cy=focus-hero]").first().find("p").contains("Focus Area")

    cy.get("[data-cy=focus-hero]")
      .first()
      .find("h1")
      .contains("Global Water & Energy Cycle")

    cy.get("[data-cy=focus-hero]").first().find("svg").should("exist")
    cy.get("[data-cy=focus-hero]")
      .first()
      .find("svg")
      .should("be.visible")
      .then($svg => {
        expect(
          $svg,
          "should not display the fallback exclamation icon (indicated by its viewBox). If this fails, make sure all the id's provided with the focus areas match those in src/icons/utils.js"
        ).to.not.have.attr("viewBox", "0 0 16 16")
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
        expect($anchor.eq(3), "fourth item").to.contain("Related Campaigns")
        expect($anchor.eq(4), "fifth item").to.contain("Focus Areas")
      })

    cy.get("[data-cy=overview-section]").should("exist")

    cy.get("[data-cy=overview-section]")
      .find("h2")
      .should("have.text", "Overview")

    cy.get("[data-cy=description]").should("exist")

    cy.get("[data-cy=focus-link]")
      .should("exist")
      .and("have.attr", "href")
      .and("include", "/water-and-energy-cycle")

    cy.get("[data-cy=focus-areas-section]")
      .find("[data-cy=focus-area]")
      .should("have.length", 6)

    cy.get("[data-cy=focus-areas-section]")
      .find("[data-cy=focus-area]")
      .each($el => {
        cy.get($el).find("svg").should("exist")
        cy.get($el).find("label").should("have.text", $el[0].textContent)
      })

    cy.get("[data-cy=focus-areas-section]")
      .find("[data-cy=focus-area]")
      .contains("Weather")
      .click()

    cy.url().should("include", "/focus/")

    cy.get("h1").should("contain", "Weather")
  })
})
