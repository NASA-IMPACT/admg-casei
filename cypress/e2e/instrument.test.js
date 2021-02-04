/// <reference types="Cypress" />

describe("Instrument", () => {
  before(() => {
    cy.visit("/explore")
    cy.get("[data-cy=tabbar]").contains("button", "Instruments").click()
    cy.get("[data-cy=instruments-card]").contains("CPL").click()
  })

  describe("the header", () => {
    it("displays the category label", () => {
      cy.get("[data-cy=instrument-hero]")
        .first()
        .find("p")
        .contains("Instrument")
    })

    it("displays the short name as title", () => {
      cy.get("[data-cy=instrument-hero]").first().find("h1").contains("CPL")
    })

    it("displays the long name as subtitle", () => {
      cy.get("[data-cy=instrument-hero]")
        .first()
        .find("p")
        .contains("Cloud Physics LIDAR")
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
        .should("have.text", "Instrument Details")
    })

    it("displays a definition list", () => {
      cy.get("[data-cy=instrument-definition-list]").should("exist")
    })

    it("displays some facts", () => {
      cy.get("[data-cy=instrument-definition-list]")
        .find("dt")
        .should($dt => {
          expect($dt, "8 items").to.have.length(8)
        })
    })

    describe("the background section", () => {
      it("exists", () => {
        cy.get("[data-cy=instrument-background]").should("exist")
      })

      it("displays instrument details", () => {
        cy.get("[data-cy=lead-investigator-label]").should("exist")
        cy.get("[data-cy=technical-contact-label]").should("exist")
        cy.get("[data-cy=instrument-manufacturer-label]").should("exist")
        cy.get("[data-cy=funding-source-label]").should("exist")
        cy.get("[data-cy=data-locations-label]").should("exist")
        cy.get("[data-cy=repository]").should($li => {
          expect($li, "item").to.have.length.of.at.least(1)
        })
      })
    })

    describe("the data section", () => {
      it("exists", () => {
        cy.get("[data-cy=data-section]").should("exist")
      })

      it("has a heading", () => {
        cy.get("[data-cy=data-section]")
          .find("h2")
          .should("have.text", "Data Products")
      })

      it("displays some data products", () => {
        cy.get("[data-cy=data-product]").should($div => {
          expect($div).to.have.length.of.at.least(2)
        })
      })

      it("each data product has a label and a doi", () => {
        cy.get("[data-cy=data-product]")
          .first()
          .find("[data-cy=doi-label]")
          .should("exist")

        cy.get("[data-cy=data-product]")
          .first()
          .find("[data-cy=doi-link]")
          .should("exist")

        cy.get("[data-cy=data-product-campaigns]")
          .first()
          .find("[data-cy=doi-campaign-label]")
          .should("exist")
          .and("have.text", "Campaigns")

        cy.get("[data-cy=data-product-platforms]")
          .first()
          .find("[data-cy=doi-platform-label]")
          .should("exist")
          .and("have.text", "Platforms")
      })
    })

    describe("the related entities section", () => {
      it("exists", () => {
        cy.get("[data-cy=entities-section]").should("exist")
      })

      it("has a heading", () => {
        cy.get("[data-cy=entities-section]")
          .find("h2")
          .should("have.text", "Instrument Operation")
      })

      it("displays a table", () => {
        cy.get("[data-cy=instrument-related-entities-table]")
          .find("th")
          .should($th => {
            expect($th, "2 items").to.have.length(2)
            expect($th.eq(0), "first item").to.contain("Platform")
            expect($th.eq(1), "second item").to.contain("Campaigns")
          })

        cy.get("[data-cy=related-platform]").find("big").first().should("exist")

        cy.get("[data-cy=related-campaign]").find("big").first().should("exist")
      })
    })
  })
})
