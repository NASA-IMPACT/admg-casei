/// <reference types="Cypress" />

describe("Resources", () => {
  beforeEach(() => {
    cy.visit("/resources")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("information")
    cy.get("main").find("p").contains("lorem ipsum")
  })
})
