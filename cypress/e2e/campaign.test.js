/// <reference types="Cypress" />

describe("Campaign", () => {
  beforeEach(() => {
    cy.visit("/campaign/6d179d67-ebd8-5750-9f5d-dc55c92697b9")
  })
  it("renders correctly", () => {
    cy.get("main").find("header").find("p").contains("ABoVE").should("exist")

    cy.get("main")
      .find("header")
      .find("h1")
      .contains("Arctic-Boreal Vulnerability Experiment")
      .should("exist")

    cy.get("main")
      .find("header")
      .find("p")
      .contains("Carbon Cycle & Ecosystems, Climate Variability & Change")
      .should("exist")

    cy.get("main")
      .find("header")
      .find("[data-cy=stats]")
      .find("dt")
      .should($stat => {
        expect($stat, "3 items").to.have.length(3)
        expect($stat.eq(0), "first item").to.contain("Deployments")
        expect($stat.eq(1), "second item").to.contain("Flights")
        expect($stat.eq(2), "third item").to.contain("Data Products")
      })

    cy.get("main").find("header").find("[data-cy=overview-map]").should("exist")

    cy.get("main").find("nav").should("exist")
    cy.get("main")
      .find("nav")
      .find("a")
      .should($anchor => {
        expect($anchor, "5 items").to.have.length(5)
        expect($anchor.eq(0), "first item").to.contain("Overview")
        expect($anchor.eq(1), "first item").to.contain("Milestones")
        expect($anchor.eq(2), "first item").to.contain(
          "Platforms & Instruments"
        )
        expect($anchor.eq(3), "first item").to.contain("Data")
        expect($anchor.eq(4), "first item").to.contain("Resources")
      })
  })
})
