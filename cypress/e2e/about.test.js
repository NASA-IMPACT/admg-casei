/// <reference types="Cypress" />

describe("About", () => {
  beforeEach(() => {
    cy.visit("/about")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("NASA airborne campaigns")

    cy.get("main")
      .find("[data-cy=about-hero]")
      .should("exist")
      .and("contain", "About")

    cy.get("main")
      .find("[data-cy=about-inventory-section]")
      .should("exist")
      .and("contain", "Airborne Inventory")

    cy.get("main")
      .find("[data-cy=about-motivation-section]")
      .should("exist")
      .and("contain", "Why it Matters")

    cy.get("main")
      .find("[data-cy=about-organisation-section]")
      .should("exist")
      .and("contain", "Responsible Organisation")

    cy.get("main")
      .find("[data-cy=section-tagline]")
      .should($tagline => {
        expect($tagline, "3 items").to.have.length(3)
        expect($tagline.eq(0), "first item").to.contain("Airborne Inventory")
        expect($tagline.eq(1), "second item").to.contain("Why it Matters")
        expect($tagline.eq(2), "third item").to.contain(
          "Responsible Organisation"
        )
      })
  })
})
