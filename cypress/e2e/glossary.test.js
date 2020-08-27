/// <reference types="Cypress" />

describe("Glossary", () => {
  beforeEach(() => {
    cy.visit("/glossary")
  })
  describe("the header", () => {
    it("displays the long name as title", () => {
      cy.get("[data-cy=glossary-hero]").first().find("h1").contains("Glossary")
    })

    it("displays glossary chart", () => {
      cy.get("[data-cy=glossary-hero]").first().find("img").should("exist")
      cy.get("[data-cy=glossary-hero]").first().find("img").should("be.visible")
    })
  })
  describe("the glossary table", () => {
    it("should display terms and definitions", () => {
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
    })
    it("should display a list in defintion", () => {
      cy.get("[data-cy=glossary-definition-options").should($li => {
        expect($li, "list item").to.have.length.of.at.least(1)
      })
    })
    it("should display a note", () => {
      cy.get("[data-cy=glossary-definition-note").should("exist")
    })
  })
})
