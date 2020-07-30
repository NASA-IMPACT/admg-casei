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
    cy.get("[data-cy=home-hero]").should("have.length", 5)
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
          cy.get($el).find("label").should("have.text", $el[0].textContent)
        })
    })

    it("navigates to the campaign list with the focus area as filter applied", () => {
      cy.get("[data-cy=focus-area-section]")
        .find("[data-cy=focus-area]")
        .contains("Weather")
        .click()

      cy.url().should("include", "/explore/campaigns")

      cy.get("main")
        .find("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "focus: Weather")

      cy.get("main").find("[data-cy=explore-card]").should("have.length", 7)
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
        .contains(/Mountains/i)
        .should("not.be.visible")

      cy.get("[data-cy=region-text-control]")
        .findByText(/Mountains/i)
        .as("btn")
        .click()

      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .contains(/Mountains/i)
        .should("be.visible")
    })

    it("navigates to the campaign list with the region type as filter applied", () => {
      cy.get("[data-cy=region-text-control]")
        .findByText(/Mountains/i)
        .as("btn")
        .click()

      cy.get("[data-cy=region-type-section]")
        .find("[data-cy=region-type]")
        .contains(/Mountains/i)
        .should("be.visible")

      cy.get(".slide-visible > [data-cy=region-type]").click()

      cy.url().should("include", "/explore/campaigns")

      cy.get("main")
        .find("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "region: mountains")

      cy.get("main").find("[data-cy=explore-card]").should("have.length", 1)
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

      cy.url().should("include", "/explore/campaigns")

      cy.get("main")
        .find("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "geophysical: Biodiversity")

      cy.get("main").find("[data-cy=explore-card]").should("have.length", 0)
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
        .find("[data-cy=instrument]")
        .contains(/Remote/i)
        .should("be.visible")

      cy.get("[data-cy=instrument]")
        .findByText(/Remote/i)
        .as("link")
        .click()

      cy.url().should("include", "/explore/instruments")

      cy.get("main")
        .find("[data-cy=filter-chip]")
        .should("have.length", 1)
        .and("have.text", "type: Remote")

      cy.get("main").find("[data-cy=explore-card]").should("have.length", 0)
    })
  })
})
