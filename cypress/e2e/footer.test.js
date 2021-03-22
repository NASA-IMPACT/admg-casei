/// <reference types="Cypress" />
import { site } from "../../test/__fixtures__"

describe("Footer", () => {
  it("renders on all pages", () => {
    // home
    cy.visit("/")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // explore
    cy.visit("/explore")
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
    cy.visit("/campaign/49678da3-ac4c-44e4-85fe-eb5dec96d788")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // platform
    cy.visit("/platform/dc1af3a8-960e-446f-a872-1d8ef5222cc6")
    cy.get("[data-cy=page]").find("[data-cy=page-footer]")
    // instrument
    cy.visit("/instrument/482c482f-4fcb-456e-815f-4296977c9bf6")
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
    cy.url().should("include", "/explore")
    cy.get("h1").should("have.text", "Explore campaigns")
    cy.go("back")

    cy.get("[data-cy=footer-platforms-link]").contains("Platforms").click()
    cy.url().should("include", "/explore")

    cy.get("h1").should("have.text", "Explore platforms")
    cy.go("back")

    cy.get("[data-cy=footer-instruments-link]").contains("Instruments").click()
    cy.url().should("include", "/explore")

    cy.get("h1").should("have.text", "Explore instruments")
    cy.go("back")
  })
})
