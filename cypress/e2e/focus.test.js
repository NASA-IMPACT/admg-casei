/// <reference types="Cypress" />

describe("Focus Area", () => {
  before(() => {
    cy.visit("/focus/Global%20Water%20&%20Energy%20Cycle")
  })
  it("explains the focus area Global Water & Energy Cycle", () => {
    cy.get("[data-cy=focus-hero]").first().find("p").contains("Focus Area")

    cy.get("[data-cy=focus-hero]")
      .first()
      .find("h1")
      .contains("Global Water & Energy Cycle")

    // displays inpage nav
    cy.get("[data-cy=inpage-nav]")
      .find("a")
      .should($anchor => {
        expect($anchor, "4 items").to.have.length(4)
        expect($anchor.eq(0), "first item").to.exist
        expect($anchor.eq(1), "second item").to.contain("Overview")
        expect($anchor.eq(2), "third item").to.contain("Related Campaigns")
        expect($anchor.eq(3), "fourth item").to.contain("Focus Areas")
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
