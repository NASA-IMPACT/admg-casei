/// <reference types="Cypress" />

describe("Glossary", () => {
  before(() => {
    cy.visit("/glossary")
  })
  it("displays the glossary", () => {
    cy.get("[data-cy=main-glossary]").find("h1").contains("Glossary")

    cy.get("[data-cy=glossary-definition-list]").each($el => {
      cy.get($el).find("dl").should("exist")
      cy.get($el)
        .find("dt")
        .should($dt => {
          expect($dt, "16 terms").to.have.length(16)
        })
      cy.get($el)
        .find("dd")
        .should($dd => {
          expect($dd, "16 terms").to.have.length(16)
        })
    })

    cy.get("[data-cy=glossary-definition-options").should($li => {
      expect($li, "list item").to.have.length.of.at.least(1)
    })

    cy.get("[data-cy=glossary-definition-note").should("exist")

    cy.get("[data-cy=glossary-img-definition-list]").each($el => {
      cy.get($el).find("dl").should("exist")
      cy.get($el)
        .find("dt")
        .should($dt => {
          expect($dt, "1 term").to.have.length(1)
        })
      cy.get($el)
        .find("dd")
        .should($dd => {
          expect($dd, "1 term").to.have.length(1)
        })
    })

    cy.get("[data-cy=glossary-img-definition-list]")
      .first()
      .find("img")
      .should("exist")

    cy.get("[data-cy=glossary-img-definition-list]")
      .first()
      .find("img")
      .should("be.visible")
  })
})
