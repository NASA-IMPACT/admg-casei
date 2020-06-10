/// <reference types="Cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("renders correctly", () => {
    cy.get("main").find("h1").contains("Sub-orbital catalog")
    cy.get("main").find("p").contains("airborne, field stationary")
    cy.get("main").find("section").should("have.length", 5)
  })

  describe("focus areas", () => {
    it("renders the correct section header", () => {
      cy.get("[data-cy=focus-area-section]")
        .find("h2")
        .should($h2 => {
          expect($h2).to.have.length(1)
        })
        .then($h2 => {
          expect($h2, "text content").to.have.text("Focus Areas")
        })
    })

    it("renders icon and text per focus area", () => {
      cy.get("[data-cy=focus-area-section]")
        .find("[data-cy=focus-area]")
        .each($el => {
          cy.get($el).find("svg").should("exist")
          cy.get($el).find("div").should("have.text", $el[0].textContent)
        })
    })
  })

  describe("region types", () => {
    it("renders the correct section header", () => {
      cy.get("[data-cy=region-type-section]")
        .find("h2")
        .should($h2 => {
          expect($h2).to.have.length(1)
        })
        .then($h2 => {
          expect($h2, "text content").to.have.text("Region Type")
        })
    })

    beforeEach(() => {
      // alias the $btn.text() as 'text'
      cy.get("[data-cy=region-text-control]")
        .find("button")
        .should("have.length", 17)
        .invoke("text")
        .as("text")
    })

    // Note: it cannot access _this when using arrow function
    it("renders same text in text control and image", function () {
      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .should("have.length", 17)
        .invoke("text")
        .then(text => {
          expect(text).to.equal(this.text)
        })
    })

    it("displays the region that was selected", () => {
      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .contains(/Island/i)
        .should("not.be.visible")

      cy.get("[data-cy=region-text-control]")
        .findByText(/Island/i)
        .as("btn")
        .click()

      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .contains(/Island/i)
        .should("be.visible")
    })
  })
})
