/// <reference types="Cypress" />

describe("Explore", () => {
  beforeEach(() => {
    cy.visit("/explore/campaigns")
  })
  it("renders correctly", () => {
    cy.get("main")
      .find("[data-cy=tabbar]")
      .find("li")
      .should($li => {
        expect($li).to.have.length(3)
      })
      .then($li => {
        expect($li[0], "text content").to.have.text("Campaigns")
        expect($li[1], "text content").to.have.text("Platforms")
        expect($li[2], "text content").to.have.text("Instruments")
      })

    cy.get("main").find("[data-cy=searchbar]")
  })
})
