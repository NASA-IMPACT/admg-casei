/// <reference types="Cypress" />

import { site } from "../../test/__fixtures__"

describe("Header", () => {
  before(() => {
    cy.visit("/")
  })
  it("renders correctly", () => {
    cy.get("header").contains(site.siteMetadata.shortname)

    cy.get("[data-cy=nasa-logo]").should($img => {
      expect($img).to.have.attr(
        "alt",
        "NASA's red, white and blue insignia, nicknamed the 'meatball'"
      )
    })

    cy.get("nav")
      .find("li")
      .should($li => {
        expect($li).to.have.length(5)
      })
      .then($li => {
        expect($li[0], "text content").to.have.text("Explore")
        expect($li[1], "text content").to.contain("Glossary")
        expect($li[2], "text content").to.have.text("About")
        expect($li[3], "text content").to.have.text("FAQS")
        expect($li[4], "text content").to.have.text("Contact")
      })
  })
})
