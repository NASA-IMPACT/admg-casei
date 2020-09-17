/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/explore/instruments")
    cy.get("main").find("[data-cy=explore-card]").contains("AMS").click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("[data-cy=instrument-hero]")
        .first()
        .find("p")
        .contains("Instrument")
    })

    it("displays the short name as title", () => {
      cy.get("[data-cy=instrument-hero]").first().find("h1").contains("AMS")
    })

    it("displays the long name as subtitle", () => {
      cy.get("[data-cy=instrument-hero]")
        .first()
        .find("p")
        .contains("Aerosol Mass Spectrometer")
    })

    it("displays the description", () => {
      cy.get("[data-cy=instrument-hero]").first().find("p").should("exist")
    })

    it("displays instrument image", () => {
      cy.get("[data-cy=instrument-hero]").first().find("img").should("exist")
      cy.get("[data-cy=instrument-hero]")
        .first()
        .find("img")
        .should("be.visible")
    })
  })

  describe("the about section", () => {
    it("exists", () => {
      cy.get("[data-cy=about-section]").should("exist")
    })

    it("has a heading", () => {
      cy.get("[data-cy=about-section]")
        .find("h2")
        .should("have.text", "About the Instrument")
    })

    it("displays a definition list", () => {
      cy.get("[data-cy=instrument-definition-list]").should("exist")
    })

    it("displays some facts", () => {
      cy.get("[data-cy=instrument-definition-list]")
        .find("dt")
        .should($dt => {
          expect($dt, "4 items").to.have.length(4)
        })
    })

    describe("the background section", () => {
      it("exists", () => {
        cy.get("[data-cy=instrument-background]").should("exist")
      })

      it("displays instrument details", () => {
        cy.get("[data-cy=instrument-manufacturer-label]").should("exist")
        cy.get("[data-cy=funding-source-label]").should("exist")
      })
    })

    describe("the related entities section", () => {
      it("exists", () => {
        cy.get("[data-cy=entities-section]").should("exist")
      })

      it("has a heading", () => {
        cy.get("[data-cy=entities-section]")
          .find("h2")
          .should("have.text", "Related Entities")
      })

      it("displays a table", () => {
        cy.get("[data-cy=instrument-related-entities-table]")
          .find("th")
          .should($th => {
            expect($th, "2 items").to.have.length(2)
            expect($th.eq(0), "first item").to.contain("Platform")
            expect($th.eq(1), "second item").to.contain("Campaigns")
          })

        cy.get("[data-cy=related-platform]")
          .find("big")
          .first()
          .should("have.text", "P-3")

        cy.get("[data-cy=related-campaign]")
          .find("big")
          .first()
          .should("have.text", "ARCTAS")
      })
    })

    describe("the related information section", () => {
      it("exists", () => {
        cy.get("[data-cy=resources-section]").should("exist")
      })

      it("has a heading", () => {
        cy.get("[data-cy=resources-section]")
          .find("h2")
          .should("have.text", "Related Information")
      })

      it("displays link list", () => {
        cy.get("[data-cy=instrument-resource-link]").should($a => {
          expect($a, "inks").to.have.length.of.at.least(1)
        })
      })
    })
  })
})
