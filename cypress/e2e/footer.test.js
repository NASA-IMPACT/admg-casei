/// <reference types="Cypress" />
import { site } from "../../test/__fixtures__"

describe("Footer", () => {
  it("renders on all pages", () => {
    // home
    cy.visit("/")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // explore campaigns
    cy.visit("/explore/campaigns")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // explore platforms
    cy.visit("/explore/platforms")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // explore instruments
    cy.visit("/explore/instruments")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // about
    cy.visit("/about")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // glossary
    cy.visit("/glossary")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // contact
    cy.visit("/contact")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // campaign
    cy.visit("/campaign/SnowEx")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // platform
    cy.visit("/platform/G-III")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // instrument
    cy.visit("/instrument/UAVSAR")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
  })

  it("has content", () => {
    cy.visit("/")
    // header
    cy.get("[data-cy=page-footer]")
      .find("[data-cy=footer-title]")
      .contains(site.siteMetadata.shortname)
    cy.get("[data-cy=page-footer]")
      .find("[data-cy=footer-subtitle]")
      .contains(site.siteMetadata.siteDefinition)
    // Explore links
    cy.get("[data-cy=footer-explore]").find("p").contains("Explore")
    cy.get("[data-cy=footer-campaigns-link]").contains("Campaigns").click()
    cy.url().should("include", "/explore/campaigns")
    cy.get("h1").should("have.text", "Explore campaigns")
    cy.go("back")

    cy.get("[data-cy=footer-platforms-link]").contains("Platforms").click()
    cy.url().should("include", "/explore/platforms")

    cy.get("h1").should("have.text", "Explore platforms")
    cy.go("back")

    cy.get("[data-cy=footer-instruments-link]").contains("Instruments").click()
    cy.url().should("include", "/explore/instruments")

    cy.get("h1").should("have.text", "Explore instruments")
    cy.go("back")
  })
})
