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
    cy.get("[data-cy=focus-hero]").first().find("svg").should("be.visible")

    cy.get("[data-cy=overview-section]").should("exist")

    cy.get("[data-cy=overview-section]")
      .find("h2")
      .should("have.text", "Overview")

    cy.get("[data-cy=description]").should("exist")

    cy.get("[data-cy=focus-link]")
      .should("exist")
      .and("have.text", "NASA SMD Homepage")

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
