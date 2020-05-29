/// <reference types="Cypress" />

describe("Header", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("renders correctly", () => {
    cy.get("header").contains("CARA | NASA")
    cy.get("nav")
      .find("li")
      .should($li => {
        expect($li).to.have.length(4)
      })
      .then($li => {
        expect($li[0], "text content").to.have.text("Explore")
        expect($li[1], "text content").to.have.text("Resources")
        expect($li[2], "text content").to.have.text("About")
        expect($li[3], "text content").to.have.text("Contact")
      })
  })
})
