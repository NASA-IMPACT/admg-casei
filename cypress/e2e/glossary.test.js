/// <reference types="Cypress" />

describe("Glossary", () => {
  before(() => {
    cy.visit("/glossary")
  })
  it("displays the glossary", () => {
    cy.get("[data-cy=main-glossary]").find("h1").contains("Glossary")
    ;["C", "D", "P"].forEach(letter => {
      cy.get(`[data-cy=${letter}-section]`).each($el => {
        cy.get($el).find("h3").should("exist")
        cy.get($el).find("p").should("exist")
      })
    })

    cy.get("[data-cy=glossary-definition-options")
      .should("exist")
      .and($li => {
        expect($li, "list item").to.have.length.of.at.least(1)
      })

    cy.get("[data-cy=glossary-definition-note")
      .should("exist")
      .and($li => {
        expect($li, "list item").to.have.length.of.at.least(1)
      })

    cy.get("[data-cy=glossary-img-section]").first().find("img").should("exist")

    cy.get("[data-cy=glossary-img-section]")
      .first()
      .find("img")
      .should("be.visible")
  })
})
