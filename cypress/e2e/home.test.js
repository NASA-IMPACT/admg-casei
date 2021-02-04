/// <reference types="Cypress" />

import { site } from "../../test/__fixtures__"

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("renders correctly", () => {
    cy.get("[data-cy=home-hero]")
      .find("p")
      .contains(site.siteMetadata.shortname)
    cy.get("[data-cy=home-hero]").find("h1").contains(site.siteMetadata.title)
    cy.get("[data-cy=home-hero]")
      .find("p")
      .contains(site.siteMetadata.description)
    cy.get("[data-cy=home-hero]").should("have.length", 1)
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
          cy.get($el)
            .find("svg")
            .should("exist")
            .then($svg => {
              expect(
                $svg,
                "should not display the fallback exclamation icon (indicated by its viewBox). If this fails, make sure all the id's provided with the focus areas match those in src/components/icons/utils.js"
              ).to.not.have.attr("viewBox", "0 0 16 16")
            })

          cy.get($el).find("label").should("have.text", $el[0].textContent)
        })
    })

    it("navigates to the focus area page", () => {
      cy.get("[data-cy=focus-area-section]")
        .find("[data-cy=focus-area]")
        .contains("Weather")
        .click()

      cy.url().should("include", "/focus/")

      cy.get("h1").should("contain", "Weather")
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
        .should("have.length", 16)
        .invoke("text")
        .as("text")
    })

    // Note: it cannot access _this when using arrow function
    it("renders same text in text control and image", function () {
      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .should("have.length", 16)
        .find("[data-cy=region-type-name]")
        .invoke("text")
        .then(text => {
          expect(text).to.equal(this.text)
        })
    })

    it("displays the region that was selected", () => {
      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .contains(/Mountains/i)
        .should("not.be.visible")

      cy.get("[data-cy=region-text-control]")
        .findByText(/Mountains/i)
        .as("btn")
        .click()

      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type-name]")
        .contains(/Mountains/i)
        .should("be.visible")
    })

    it("navigates to the campaign list with the region type as filter applied", () => {
      cy.get("[data-cy=region-text-control]")
        .findByText(/Mountains/i)
        .as("btn")
        .click()

      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type-name]")
        .contains(/Mountains/i)
        .should("be.visible")

      cy.get(".slide-visible > [data-cy=region-type]").click()

      cy.url().should("include", "/explore")

      cy.get("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "region: mountains")

      cy.get("[data-cy=campaigns-card]").should("have.length", 3)
    })
  })
  describe("geophysical concepts", () => {
    it("renders the correct section header", () => {
      cy.get("[data-cy=geophysical-concepts-section]")
        .find("h2")
        .should($h2 => {
          expect($h2).to.have.length(1)
        })
        .then($h2 => {
          expect($h2, "text content").to.have.text("Geophysical Concepts")
        })
    })
    it("renders a box per geophysical concept", () => {
      cy.get("[data-cy=geophysical-concepts-section]")
        .find("[data-cy=geophysical-concept]")
        .each($el => {
          cy.get($el).find("div").should("exist")
          cy.get($el).find("div").should("have.text", $el[0].textContent)
        })
    })

    it("navigates to the campaign list with the geophysical concept as filter applied", () => {
      cy.get("[data-cy=geophysical-concepts-section]")
        .find("[data-cy=geophysical-concept]")
        .contains("Biodiversity")
        .click()

      cy.url().should("include", "/explore")

      cy.get("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "geophysical: Biodiversity")

      cy.get("[data-cy=campaigns-card]").should("have.length", 2)
    })
  })
  describe("platforms", () => {
    it("renders the correct section header", () => {
      cy.get("[data-cy=platforms-section]")
        .find("h2")
        .should($h2 => {
          expect($h2).to.have.length(1)
        })
        .then($h2 => {
          expect($h2, "text content").to.have.text("Platforms")
        })
    })
  })
  describe("instruments", () => {
    it("renders the correct section header", () => {
      cy.get("[data-cy=instruments-section]")
        .find("h2")
        .should($h2 => {
          expect($h2).to.have.length(1)
        })
        .then($h2 => {
          expect($h2, "text content").to.have.text("Instruments")
        })
    })
    it("navigates to the instrument list with the instrument type as filter applied", () => {
      cy.get("[data-cy=instruments-section]")
        .find("[data-cy=instrument-type]")
        .contains("Spectrometer/Radiometer")
        .should("be.visible")

      cy.get("[data-cy=instrument-type]")
        .contains("Spectrometer/Radiometer")
        .click()

      cy.url().should("include", "/explore")
      cy.get("[data-cy=tabbar]").contains("button", "Instruments").click()

      cy.get("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "type: Spectrometer/Radiometer")

      cy.get("[data-cy=instruments-card]").should($div => {
        expect($div, "70 or more instrument cards ").to.have.length.gte(70)
      })
    })
  })
})
