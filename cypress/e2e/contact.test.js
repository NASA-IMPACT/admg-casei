/// <reference types="Cypress" />

describe("Contact", () => {
  before(() => {
    cy.visit("/contact")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("feedback")
    cy.get("main").find("p").contains("NASA inventory")
  })
})
