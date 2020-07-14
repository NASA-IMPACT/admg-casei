/// <reference types="Cypress" />

describe("About", () => {
  beforeEach(() => {
    cy.visit("/glossary")
  })
  it("it renders correctly", () => {
    cy.get("main").find("h1").contains("Glossary")
    cy.get("main").find("section").should("have.length", 1)
  })
  describe("the glossary", () => {
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
