/// <reference types="Cypress" />

describe("About", () => {
  beforeEach(() => {
    cy.visit("/about")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("About")
    cy.get("main").find("p").contains("airborne inventory")
  })
})
