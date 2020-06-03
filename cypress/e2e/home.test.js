/// <reference types="Cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("Sub-orbital catalog")
    cy.get("main").find("p").contains("airborne, field stationary")
  })
})
