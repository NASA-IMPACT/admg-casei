/// <reference types="Cypress" />

describe("Focus Area", () => {
  before(() => {
    cy.visit("/")
    cy.get("[data-cy=focus-area-section]")
      .find("[data-cy=focus-area]")
      .contains("Global Water & Energy Cycle")
      .click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("[data-cy=focus-hero]").first().find("p").contains("Focus Area")
    })

    it("displays the short name as title", () => {
      cy.get("[data-cy=focus-hero]")
        .first()
        .find("h1")
        .contains("Global Water & Energy Cycle")
    })

    it("displays focus area icon as image", () => {
      cy.get("[data-cy=focus-hero]").first().find("svg").should("exist")
      cy.get("[data-cy=focus-hero]").first().find("svg").should("be.visible")
    })
  })

  describe("the overview section", () => {
    it("exists", () => {
      cy.get("[data-cy=overview-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=overview-section]")
        .find("h2")
        .should("have.text", "Overview")
    })

    it("displays a description", () => {
      cy.get("[data-cy=description]").should("exist")
    })

    it("displays the URL", () => {
      cy.get("[data-cy=focus-link]")
        .should("exist")
        .and("have.text", "NASA SMD Homepage")
    })
  })

  describe("the other focus areas", () => {
    it("renders a focus area gallery with 6 items", () => {
      cy.get("[data-cy=focus-areas-section]")
        .find("[data-cy=focus-area]")
        .should("have.length", 6)
    })

    it("renders icon and text per focus area", () => {
      cy.get("[data-cy=focus-areas-section]")
        .find("[data-cy=focus-area]")
        .each($el => {
          cy.get($el).find("svg").should("exist")
          cy.get($el).find("label").should("have.text", $el[0].textContent)
        })
    })

    it("clicking an item navigates to the focus area page", () => {
      cy.get("[data-cy=focus-areas-section]")
        .find("[data-cy=focus-area]")
        .contains("Weather")
        .click()

      cy.url().should("include", "/focus/")

      cy.get("h1").should("contain", "Weather")
    })
  })
})
