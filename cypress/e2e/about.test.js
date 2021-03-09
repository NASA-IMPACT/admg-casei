/// <reference types="Cypress" />

describe("About", () => {
  before(() => {
    cy.visit("/about")
  })
  it("renders correctly", () => {
    cy.get("[data-cy=about-hero]").should("exist").and("contain", "About")
    cy.get("[data-cy=about-hero]").find("h1").contains("NASA")

    // inventory section
    cy.get("[data-cy=about-inventory-section]").should("exist")

    cy.get("[data-cy=about-inventory-section]")
      .find("[data-cy=about-inventory-section-header]")
      .should("exist")
      .and("contain", "Airborne Inventory")

    cy.get("[data-cy=about-inventory-label]").should("exist")
    cy.get("[data-cy=about-inventory-objectives]")
      .should("exist")
      .find("div")
      .should($div => {
        expect($div, "3 items").to.have.length(3)
        expect($div.eq(0), "first item").to.contain("Detailed Accounting")
        expect($div.eq(1), "second item").to.contain("Enhanced Metadata")
        expect($div.eq(2), "third item").to.contain("Improve Discovery")
      })

    // image break
    cy.get("[data-cy=about-image-section]").should("exist")

    // motivation section
    cy.get("[data-cy=about-motivation-section]")
      .find("[data-cy=about-motivation-label]")
      .contains("Why it Matters")
    cy.get("[data-cy=about-motivation-section]")
      .find("[data-cy=about-motivation-headline]")
      .contains("A centralized data discovery tool")
    cy.get("[data-cy=about-motivation-text]")
      .should("exist")
      .find("p")
      .should($p => {
        expect($p, "2 items").to.have.length(2)
      })

    // organization section
    cy.get("[data-cy=about-organization-section]")
      .find("[data-cy=about-organization-label]")
      .contains("Responsible Organization")
    cy.get("[data-cy=about-organization-section]")
      .find("[data-cy=about-organization-headline]")
      .contains("ADMG’s primary goal")
    cy.get("[data-cy=about-organization-text]")
      .should("exist")
      .find("p")
      .should($p => {
        expect($p, "1 items").to.have.length(1)
      })
  })
})
