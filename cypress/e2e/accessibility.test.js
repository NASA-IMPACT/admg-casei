/// <reference types="Cypress" />

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      "#": nodes.length,
      nodes: JSON.stringify(nodes.map(node => node.html)),
    })
  )

  cy.task("table", violationData)
}

describe("Accessibility tests", () => {
  it("Has no detectable accessibility violations on load", () => {
    cy.visit("/")

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /explore/campaigns and checks for accessibility violations", () => {
    cy.visit("/explore/campaigns")

    cy.get("h1").should("contain.text", "Explore campaigns")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /explore/platforms and checks for accessibility violations", () => {
    cy.visit("/explore/platforms")

    cy.get("h1").should("contain.text", "Explore platforms")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /explore/instruments and checks for accessibility violations", () => {
    cy.visit("/explore/instruments")

    cy.get("h1").should("contain.text", "Explore instruments")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page for a /campaign and checks for accessibility violations", () => {
    cy.visit("/explore/campaigns")

    cy.get("h1").should("contain.text", "Explore campaigns")

    cy.wait(0)

    cy.get("[data-cy=campaigns-card]").first().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page for a /platform and checks for accessibility violations", () => {
    cy.visit("/explore/platforms")

    cy.get("h1").should("contain.text", "Explore platforms")

    cy.wait(0)

    cy.get("[data-cy=platforms-card]").last().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page for a /instrument and checks for accessibility violations", () => {
    cy.visit("/explore/instruments")

    cy.get("h1").should("contain.text", "Explore instruments")

    cy.wait(0)

    cy.get("[data-cy=instruments-card]").first().click()

    cy.get("h1").should("exist")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /glossary and checks for accessibility violations", () => {
    cy.visit("/glossary")

    cy.get("h1").should("contain.text", "Glossary")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /about and checks for accessibility violations", () => {
    cy.visit("/about")

    cy.get("h1").should("contain.text", "NASA")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })

  it("Navigates to page /contact and checks for accessibility violations", () => {
    cy.visit("/contact")

    cy.get("h1").should("contain.text", "We appreciate your feedback!")

    cy.injectAxe()

    cy.checkA11y(null, null, terminalLog)
  })
})
